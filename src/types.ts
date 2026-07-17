export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
}
