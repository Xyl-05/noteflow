import express from 'express'
import { Note, NotesData } from '../types'
import { readData, writeData } from '../data/fileData'

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await readData()
  res.json({ notes: data.notes })
})

router.get('/:id', async (req, res) => {
  const data = await readData()
  const note = data.notes.find(n => n.id === req.params.id)
  if (note) {
    res.json({ note })
  } else {
    res.status(404).json({ error: 'Note not found' })
  }
})

router.post('/', async (req, res) => {
  const { title, content, tags } = req.body
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' })
  }

  const data = await readData()
  const newNote: Note = {
    id: Date.now().toString(),
    title,
    content,
    tags: tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  data.notes.unshift(newNote)
  await writeData(data)
  res.json({ note: newNote })
})

router.put('/:id', async (req, res) => {
  const { title, content, tags } = req.body
  const data = await readData()
  const index = data.notes.findIndex(n => n.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' })
  }

  data.notes[index] = {
    ...data.notes[index],
    title: title || data.notes[index].title,
    content: content || data.notes[index].content,
    tags: tags !== undefined ? tags : data.notes[index].tags,
    updatedAt: new Date().toISOString(),
  }

  await writeData(data)
  res.json({ note: data.notes[index] })
})

router.delete('/:id', async (req, res) => {
  const data = await readData()
  const initialLength = data.notes.length
  data.notes = data.notes.filter(n => n.id !== req.params.id)

  if (data.notes.length === initialLength) {
    return res.status(404).json({ error: 'Note not found' })
  }

  await writeData(data)
  res.json({ success: true })
})

export default router
