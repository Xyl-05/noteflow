import { Link } from 'react-router-dom'
import { ArrowUpRight, FileText } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#e3e7df] bg-gradient-to-b from-[#f5f6f0] to-[#eef1e9] text-[#34443a]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="NoteFlow 首页">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#244334] text-white">
                <FileText className="h-5 w-5" />
              </span>
              <span className="text-xl font-semibold tracking-tight">NoteFlow</span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-[#718075]">
              把想法轻轻放好。用标签整理笔记，再用搜索找回值得留下的内容。
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#647168]" aria-label="页脚导航">
            <Link to="/" className="transition-colors hover:text-[#244334]">产品介绍</Link>
            <Link to="/notes" className="transition-colors hover:text-[#244334]">我的笔记</Link>
            <Link to="/contact" className="transition-colors hover:text-[#244334]">联系</Link>
            <a href="https://github.com/Xyl-05/noteflow" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-[#244334]">
              GitHub <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-[#e0e5dc] pt-5 text-xs text-[#879187] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} NoteFlow</span>
          <span>用心记录，慢慢整理。</span>
        </div>
      </div>
    </footer>
  )
}
