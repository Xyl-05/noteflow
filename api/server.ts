import express from 'express'
import cors from 'cors'
import notesRouter from './routes/notes'
import contactRouter from './routes/contact'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/contact', contactRouter)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NoteFlow API is running!' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
