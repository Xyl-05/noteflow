export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export interface NotesData {
  notes: Note[]
  contacts: Contact[]
}
