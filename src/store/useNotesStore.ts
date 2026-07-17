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

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      set({ notes: data.notes, loading: false })
    } catch (err) {
      set({ error: 'Failed to fetch notes', loading: false })
    }
  },

  createNote: async (note) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      })
      const data = await response.json()
      set((state) => ({ notes: [data.note, ...state.notes] }))
    } catch (err) {
      set({ error: 'Failed to create note' })
    }
  },

  updateNote: async (id, note) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      })
      const data = await response.json()
      set((state) => ({
        notes: state.notes.map((n) => (n.id === id ? data.note : n)),
      }))
    } catch (err) {
      set({ error: 'Failed to update note' })
    }
  },

  deleteNote: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      set((state) => ({ notes: state.notes.filter((n) => n.id !== id) }))
    } catch (err) {
      set({ error: 'Failed to delete note' })
    }
  },

  getNoteById: (id) => {
    return get().notes.find((n) => n.id === id)
  },
}))
