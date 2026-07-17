import fs from 'fs'
import path from 'path'
import { NotesData } from '../types'

const DATA_FILE = path.join(__dirname, 'data.json')

const initialData: NotesData = {
  notes: [
    {
      id: '1',
      title: '欢迎使用 NoteFlow',
      content: '这是你的第一条笔记，开始记录你的想法吧！NoteFlow 帮助你高效管理和整理笔记内容。',
      tags: ['欢迎', '入门'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      title: '项目开发计划',
      content: '本周任务：\n1. 完成前端组件开发\n2. 实现后端 API\n3. 编写测试用例\n4. 部署上线',
      tags: ['工作', '计划'],
      createdAt: '2024-01-02T10:30:00Z',
      updatedAt: '2024-01-02T10:30:00Z',
    },
    {
      id: '3',
      title: '学习笔记：React Hooks',
      content: 'useState：用于在函数组件中添加状态\nuseEffect：用于处理副作用\nuseContext：用于跨组件传递数据\nuseReducer：用于复杂状态管理',
      tags: ['学习', 'React'],
      createdAt: '2024-01-03T14:20:00Z',
      updatedAt: '2024-01-03T14:20:00Z',
    },
  ],
  contacts: [],
}

export async function readData(): Promise<NotesData> {
  if (!fs.existsSync(DATA_FILE)) {
    await writeData(initialData)
    return initialData
  }
  
  const data = await fs.promises.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(data)
}

export async function writeData(data: NotesData): Promise<void> {
  await fs.promises.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
}
