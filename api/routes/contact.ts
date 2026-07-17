import express from 'express'
import { Contact } from '../types'
import { readData, writeData } from '../data/fileData'

const router = express.Router()

router.post('/', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  const data = await readData()
  const newContact: Contact = {
    id: Date.now().toString(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  }

  data.contacts.push(newContact)
  await writeData(data)
  res.json({ success: true, message: 'Message received!' })
})

export default router
