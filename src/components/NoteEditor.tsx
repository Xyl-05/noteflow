import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Tag, Plus, X } from 'lucide-react'
import { useNotesStore } from '../store/useNotesStore'

export default function NoteEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { createNote, updateNote, getNoteById } = useNotesStore()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const isEditing = !!id

  useEffect(() => {
    if (isEditing && id) {
      const note = getNoteById(id)
      if (note) {
        setTitle(note.title)
        setContent(note.content)
        setTags(note.tags)
      }
    }
  }, [id, isEditing, getNoteById])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('标题和内容不能为空')
      return
    }

    setIsSaving(true)
    try {
      if (isEditing && id) {
        await updateNote(id, { title: title.trim(), content: content.trim(), tags })
      } else {
        await createNote({ title: title.trim(), content: content.trim(), tags })
      }
      navigate('/notes')
    } catch (err) {
      alert('保存失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const note = isEditing && id ? getNoteById(id) : undefined

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/notes')}
            className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回列表
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaving ? '保存中...' : '保存笔记'}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <input
            type="text"
            placeholder="输入笔记标题..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold text-gray-900 border-none outline-none placeholder-gray-400 mb-6"
          />

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">标签</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-primary-800 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="添加标签..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="input-field flex-1"
              />
              <button
                onClick={handleAddTag}
                className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <textarea
            placeholder="开始编写你的笔记..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 text-gray-700 border-none outline-none resize-none placeholder-gray-400 leading-relaxed"
          />

          {note && (
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-400">
              <span>创建于 {formatDate(note.createdAt)}</span>
              <span>更新于 {formatDate(note.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
