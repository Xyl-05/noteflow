import { create } from 'zustand'
import { Note } from '../types'

interface NotesState {
  notes: Note[]
  loading: boolean
  error: string | null
  fetchNotes: () => Promise<void>
  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateNote: (id: string, note: Partial<Note>) => Promise<void>
  deleteNote: (id: string) => Promise<void>
  getNoteById: (id: string) => Note | undefined
}

const API_URL = '/api/notes'
const HEALTH_URL = '/api/health'
const STORAGE_KEY = 'noteflow_notes'
const REQUEST_TIMEOUT_MS = 5000

interface ApiResponse<T> {
  notes?: T[]
  note?: T
  error?: string
}

type ApiNote = Record<string, unknown>

const normalizeNote = (value: ApiNote): Note => {
  const now = new Date().toISOString()
  const rawTags = value.tags
  const tags = Array.isArray(rawTags)
    ? rawTags.map(String)
    : typeof rawTags === 'string'
      ? (() => {
          try {
            const parsed: unknown = JSON.parse(rawTags)
            return Array.isArray(parsed) ? parsed.map(String) : []
          } catch {
            return []
          }
        })()
      : []

  return {
    id: String(value.id ?? ''),
    title: String(value.title ?? ''),
    content: String(value.content ?? ''),
    tags,
    createdAt: String(value.createdAt ?? value.created_at ?? now).replace(' ', 'T'),
    updatedAt: String(value.updatedAt ?? value.updated_at ?? now).replace(' ', 'T'),
  }
}

const requestJson = async <T,>(url: string, init: RequestInit = {}): Promise<T> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const headers = new Headers(init.headers)
    if (init.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    const response = await fetch(url, {
      ...init,
      headers,
      signal: controller.signal,
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const message = typeof data.error === 'string' ? data.error : `Request failed (${response.status})`
      throw new Error(message)
    }

    return data as T
  } finally {
    clearTimeout(timeout)
  }
}

// 默认笔记数据
const defaultNotes: Note[] = [
  {
    id: '1',
    title: '欢迎使用 NoteFlow',
    content: '这是你的第一条笔记，开始记录你的想法吧！NoteFlow 帮助你高效管理和整理笔记内容。',
    tags: ['入门', '指南'],
    createdAt: '2024-01-01 00:00:00',
    updatedAt: '2024-01-01 00:00:00',
  },
  {
    id: '2',
    title: '项目开发计划',
    content: '本周任务：\n1. 完成前端组件开发\n2. 实现后端 API\n3. 编写测试用例\n4. 部署上线',
    tags: ['工作', '计划'],
    createdAt: '2024-01-02 10:30:00',
    updatedAt: '2024-01-02 10:30:00',
  },
  {
    id: '3',
    title: '学习笔记：React Hooks',
    content: 'useState：用于在函数组件中添加状态\nuseEffect：用于处理副作用\nuseContext：用于跨组件传递数据\nuseReducer：用于复杂状态管理',
    tags: ['学习', 'React'],
    createdAt: '2024-01-03 14:20:00',
    updatedAt: '2024-01-03 14:20:00',
  },
  {
    id: '4',
    title: '今日待办事项',
    content: '- 完成项目报告\n- 回复邮件\n- 整理文档\n- 代码审查',
    tags: ['日常', '待办'],
    createdAt: '2024-01-04 09:00:00',
    updatedAt: '2024-01-04 09:00:00',
  },
]

// localStorage 工具函数
const loadFromStorage = (): Note[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed: unknown = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed.map(normalizeNote)
    }
    // 首次使用，初始化默认数据
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNotes))
    return defaultNotes
  } catch {
    return defaultNotes
  }
}

const saveToStorage = (notes: Note[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // ignore
  }
}

// 生成新 ID
const generateId = (): string => {
  return Date.now().toString()
}

// 检查是否有可用的后端 API
const isApiAvailable = async (): Promise<boolean> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(HEALTH_URL, { signal: controller.signal })
    return response.ok
  } catch {
    return false
  } finally {
    clearTimeout(timeout)
  }
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null })
    try {
      if (await isApiAvailable()) {
        const data = await requestJson<ApiResponse<ApiNote>>(API_URL)
        set({ notes: (data.notes ?? []).map(normalizeNote), loading: false })
      } else {
        // 使用 localStorage
        const notes = loadFromStorage()
        set({ notes, loading: false })
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to load notes', loading: false })
    }
  },

  createNote: async (note) => {
    try {
      if (await isApiAvailable()) {
        const data = await requestJson<ApiResponse<ApiNote>>(API_URL, {
          method: 'POST',
          body: JSON.stringify(note),
        })
        if (!data.note) throw new Error('The API did not return the created note')
        const createdNote = normalizeNote(data.note)
        set((state) => ({ notes: [createdNote, ...state.notes], error: null }))
      } else {
        // 使用 localStorage
        const newNote: Note = {
          ...note,
          id: generateId(),
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
          updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        }
        set((state) => {
          const notes = [newNote, ...state.notes]
          saveToStorage(notes)
          return { notes }
        })
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to create note' })
      throw err
    }
  },

  updateNote: async (id, note) => {
    try {
      if (await isApiAvailable()) {
        const data = await requestJson<ApiResponse<ApiNote>>(`${API_URL}/${encodeURIComponent(id)}`, {
          method: 'PUT',
          body: JSON.stringify(note),
        })
        if (!data.note) throw new Error('The API did not return the updated note')
        const updatedNote = normalizeNote(data.note)
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? updatedNote : n)),
          error: null,
        }))
      } else {
        // 使用 localStorage
        set((state) => {
          const notes = state.notes.map((n) =>
            n.id === id
              ? { ...n, ...note, updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) }
              : n
          )
          saveToStorage(notes)
          return { notes }
        })
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to update note' })
      throw err
    }
  },

  deleteNote: async (id) => {
    try {
      if (await isApiAvailable()) {
        await requestJson<ApiResponse<never>>(`${API_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id), error: null }))
      } else {
        // 使用 localStorage
        set((state) => {
          const notes = state.notes.filter((n) => n.id !== id)
          saveToStorage(notes)
          return { notes }
        })
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to delete note' })
      throw err
    }
  },

  getNoteById: (id) => {
    return get().notes.find((n) => n.id === id)
  },
}))
