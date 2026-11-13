import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, FileText, Plus, Search, Tag, Trash2 } from 'lucide-react'
import { useNotesStore } from '../store/useNotesStore'

export default function NotesList() {
  const { notes, loading, error, fetchNotes, deleteNote } = useNotesStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    void fetchNotes()
  }, [fetchNotes])

  const allTags = [...new Set(notes.flatMap((note) => note.tags))]
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase()
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLocaleLowerCase().includes(normalizedSearch) ||
      note.content.toLocaleLowerCase().includes(normalizedSearch)
    return matchesSearch && (!selectedTag || note.tags.includes(selectedTag))
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return '刚刚更新'
    return new Intl.DateTimeFormat('zh-CN', { month: 'short', day: 'numeric' }).format(date)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('确定要删除这条笔记吗？')) return
    try {
      await deleteNote(id)
    } catch {
      // The store keeps the request error visible above the note list.
    }
  }

  return (
    <section className="page-surface min-h-screen pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">YOUR PERSONAL LIBRARY</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h1 className="text-3xl font-semibold tracking-[-0.045em] text-[#1d2b25] sm:text-4xl">我的笔记</h1>
              <span className="rounded-full border border-[#dce4da] bg-white/80 px-3 py-1 text-sm font-medium text-[#6d7c70] shadow-sm">
                {filteredNotes.length} 条
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#7a857d]">把想法收进来，之后也能轻松找到。</p>
          </div>
          <Link to="/notes/new" className="btn-primary inline-flex items-center justify-center gap-2 self-start sm:self-auto">
            <Plus className="h-4 w-4" /> 新建笔记
          </Link>
        </header>

        <div className="mb-7 rounded-[1.5rem] border border-[#e7ebe4] bg-white/90 p-4 shadow-[0_16px_40px_-30px_rgba(30,50,35,0.34)] backdrop-blur sm:p-5">
          <label className="search-field">
            <Search className="h-[18px] w-[18px] shrink-0 text-[#87948a]" aria-hidden="true" />
            <span className="sr-only">搜索笔记标题或内容</span>
            <input
              type="search"
              placeholder="搜索标题或内容…"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <span className="hidden rounded-md border border-[#e6e9e4] bg-white px-2 py-1 text-[11px] text-[#9aa39b] sm:inline" aria-hidden="true">⌕</span>
          </label>

          {allTags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#f0f2ee] pt-4">
              <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[#9aa39b]">
                <Tag className="h-3.5 w-3.5" /> 标签
              </span>
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                aria-pressed={!selectedTag}
                className={`tag-chip ${!selectedTag ? 'tag-chip-active' : ''}`}
              >全部</button>
              {allTags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  aria-pressed={selectedTag === tag}
                  className={`tag-chip ${selectedTag === tag ? 'tag-chip-active' : ''}`}
                >{tag}</button>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div role="alert" className="mb-6 rounded-2xl border border-[#ead8c9] bg-[#fbf3eb] px-5 py-4 text-sm leading-6 text-[#805f43]">
            暂时无法同步笔记：{error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-4 text-[#7a857d]" role="status">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#dce5da] border-t-[#557b61]" />
            <span className="text-sm">正在整理你的笔记…</span>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="rounded-[1.75rem] border border-dashed border-[#d9e1d7] bg-white/65 px-6 py-16 text-center shadow-[0_18px_40px_-36px_rgba(30,50,35,0.35)] sm:py-20">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8efe6] text-[#557b61]">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-[#2d3a31]">
              {normalizedSearch || selectedTag ? '没有找到匹配的笔记' : '这里还空着'}
            </h2>
            <p className="mt-2 text-sm text-[#7d887f]">
              {normalizedSearch || selectedTag ? '试试其他关键词或标签。' : '写下第一条笔记，让想法有个起点。'}
            </p>
            {!normalizedSearch && !selectedTag && (
              <Link to="/notes/new" className="btn-primary mt-6 inline-flex items-center gap-2">
                <Plus className="h-4 w-4" /> 创建第一条笔记
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note, index) => (
              <article key={note.id} className={`note-card note-card-tone-${index % 3}`}>
                <div className="flex items-start justify-between gap-3">
                  <Link to={`/notes/${note.id}`} className="min-w-0 flex-1 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#66866a]">
                    <h2 className="line-clamp-2 text-lg font-semibold leading-7 tracking-[-0.02em] text-[#2c3930] transition-colors hover:text-[#557b61]">
                      {note.title || '未命名笔记'}
                    </h2>
                  </Link>
                  <button
                    type="button"
                    onClick={() => void handleDelete(note.id)}
                    className="icon-button text-[#98a199] hover:bg-[#f8e9e7] hover:text-[#a34f45]"
                    aria-label={`删除笔记：${note.title || '未命名笔记'}`}
                    title="删除笔记"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-3 min-h-[4.5rem] whitespace-pre-line break-words text-sm leading-6 text-[#77827a] line-clamp-3">
                  {note.content || '这条笔记还没有内容。'}
                </p>
                <div className="mt-5 flex min-h-6 flex-wrap gap-1.5">
                  {note.tags.slice(0, 3).map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className="rounded-full bg-white/75 px-2.5 py-1 text-xs font-medium text-[#667c68] transition-colors hover:bg-[#e5eee3]"
                      aria-label={`筛选标签 ${tag}`}
                    >{tag}</button>
                  ))}
                  {note.tags.length > 3 && <span className="rounded-full bg-white/75 px-2.5 py-1 text-xs text-[#7c887e]">+{note.tags.length - 3}</span>}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#e9ece6]/80 pt-4 text-xs text-[#8c978e]">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />更新于 {formatDate(note.updatedAt)}</span>
                  <Link to={`/notes/${note.id}`} className="font-medium text-[#557b61] hover:text-[#345a40]">查看笔记 ↗</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
