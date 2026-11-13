import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Plus, Save, Tag, X } from 'lucide-react'
import { useNotesStore } from '../store/useNotesStore'

export default function NoteEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { createNote, updateNote, getNoteById, error } = useNotesStore()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [validationError, setValidationError] = useState('')

  const isEditing = Boolean(id)

  useEffect(() => {
    if (!id) return
    const note = getNoteById(id)
    if (!note) return
    setTitle(note.title)
    setContent(note.content)
    setTags(note.tags)
  }, [id, getNoteById])

  const addTag = () => {
    const value = newTag.trim()
    if (value && !tags.includes(value)) setTags((current) => [...current, value])
    setNewTag('')
  }

  const removeTag = (tagToRemove: string) => {
    setTags((current) => current.filter((tag) => tag !== tagToRemove))
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return dateString
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(date)
  }

  const note = id ? getNoteById(id) : undefined

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setValidationError('标题和正文都要写一点，再保存吧。')
      return
    }

    setValidationError('')
    setIsSaving(true)
    try {
      if (id) {
        await updateNote(id, { title: title.trim(), content: content.trim(), tags })
      } else {
        await createNote({ title: title.trim(), content: content.trim(), tags })
      }
      navigate('/notes')
    } catch {
      setValidationError('保存没有成功，请检查连接后重试。')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="page-surface min-h-screen pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-7 flex items-center justify-between">
          <Link to="/notes" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#718077] transition-colors hover:bg-white hover:text-[#345a40]">
            <ArrowLeft className="h-4 w-4" /> 返回笔记
          </Link>
          <button type="button" onClick={() => void handleSave()} disabled={isSaving} className="btn-primary inline-flex items-center gap-2 disabled:cursor-wait disabled:opacity-60">
            {isSaving ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/50 border-t-white" /> : <Save className="h-4 w-4" />}
            {isSaving ? '正在保存' : '保存笔记'}
          </button>
        </div>

        <article className="overflow-hidden rounded-[1.75rem] border border-[#e7ebe4] bg-white/95 shadow-[0_28px_75px_-48px_rgba(30,50,35,0.38)]">
          <div className="border-b border-[#eef0ec] bg-gradient-to-r from-[#f7faf5] via-white to-[#fcfaf6] px-6 py-5 sm:px-10">
            <p className="section-kicker">{isEditing ? 'EDIT YOUR NOTE' : 'A NEW THOUGHT'}</p>
            <p className="mt-2 text-sm text-[#8a958c]">{isEditing ? '慢慢修改，保存后会更新笔记。' : '先把想法写下来，之后还可以继续整理。'}</p>
          </div>

          <div className="px-6 py-7 sm:px-10 sm:py-9">
            <label htmlFor="note-title" className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-[#95a097]">标题</label>
            <input
              id="note-title"
              type="text"
              placeholder="给这条笔记起个名字…"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="note-title-input"
              maxLength={120}
            />

            <div className="my-8 h-px bg-[#eef0ec]" />

            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#95a097]">
              <Tag className="h-4 w-4" /> 标签
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-[#edf2eb] py-1.5 pl-3 pr-2 text-sm text-[#55745d]">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="rounded-full p-0.5 hover:bg-[#dbe7d9]" aria-label={`移除标签 ${tag}`}>
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
              {tags.length === 0 && <span className="py-1.5 text-sm text-[#a0a9a1]">还没有标签</span>}
            </div>
            <div className="mt-3 flex max-w-md gap-2">
              <input
                type="text"
                placeholder="输入标签名称"
                value={newTag}
                onChange={(event) => setNewTag(event.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && (event.preventDefault(), addTag())}
                className="input-field flex-1"
                aria-label="新标签名称"
              />
              <button type="button" onClick={addTag} className="icon-button border border-[#e3e9e0] bg-[#f5f8f3] text-[#55745d] hover:bg-[#e8efe6]" aria-label="添加标签">
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="my-8 h-px bg-[#eef0ec]" />
            <label htmlFor="note-content" className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-[#95a097]">正文</label>
            <textarea
              id="note-content"
              placeholder="从一个句子开始…"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="note-content-input"
            />

            {(validationError || error) && (
              <p role="alert" className="mt-5 rounded-xl bg-[#fbf0ed] px-4 py-3 text-sm text-[#a05248]">
                {validationError || error}
              </p>
            )}

            {note && (
              <div className="mt-8 flex flex-col gap-2 border-t border-[#eef0ec] pt-5 text-xs text-[#929d94] sm:flex-row sm:justify-between">
                <span>创建于 {formatDate(note.createdAt)}</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#66866a]" />最近更新 {formatDate(note.updatedAt)}</span>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}
