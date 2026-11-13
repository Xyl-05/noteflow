import { Link } from 'react-router-dom'
import { ArrowRight, Check, FileText, Search, Sparkles } from 'lucide-react'

const previewNotes = [
  { title: '把想法先记下来', detail: '灵感不必等到完整，先留下一个开头。', tone: 'bg-[#f4eadc]', label: '灵感' },
  { title: '本周要完成的事', detail: '整理资料 · 完成页面 · 复盘进度', tone: 'bg-[#e8efe7]', label: '计划' },
  { title: 'React 学习摘记', detail: '把零散知识收进自己的笔记库。', tone: 'bg-[#ece9f4]', label: '学习' },
]

export default function Hero() {
  return (
    <section className="hero-surface relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-36">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-12">
        <div className="animate-slide-up">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d7e1d6] bg-white/75 px-4 py-2 text-sm font-medium text-[#506c58] shadow-[0_8px_24px_-18px_rgba(36,67,52,0.5)] backdrop-blur">
            <Sparkles className="h-4 w-4" />
            给灵感一个安静的位置
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.06em] text-[#1d2b25] sm:text-6xl lg:text-[4.35rem]">
            想到的，<br />
            <span className="font-serif italic font-medium text-[#557b61]">就先记下来。</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#68756d] sm:text-lg">
            NoteFlow 是一款轻量的个人笔记应用。快速写下想法，用标签整理，再通过搜索把它们找回来。
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/notes" className="btn-primary inline-flex items-center justify-center gap-2">
              打开我的笔记
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-secondary inline-flex items-center justify-center">
              了解项目
            </Link>
          </div>

          <div className="mt-11 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#dfe5dc] pt-6 text-sm text-[#647168]">
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#557b61]" />灵感随手记录</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#557b61]" />标签分类，搜索直达</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#557b61]" />电脑手机都适配</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-fade-in">
          <div className="absolute -left-5 top-14 h-32 w-32 rounded-full bg-[#dce8d9]/70 blur-2xl" aria-hidden="true" />
          <div className="absolute -right-4 bottom-9 h-40 w-40 rounded-full bg-[#f0dfc8]/70 blur-2xl" aria-hidden="true" />
          <div className="relative rounded-[2rem] border border-white/90 bg-white/80 p-3 shadow-[0_34px_90px_-38px_rgba(42,66,50,0.36)] backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#f8f8f4] p-5 sm:p-7">
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#244334] text-white">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#26352c]">今天的灵感</p>
                    <p className="mt-0.5 text-xs text-[#8a958c]">3 条最近笔记</p>
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e6df] bg-white text-[#7b887e]">
                  <Search className="h-4 w-4" />
                </div>
              </div>

              <div className="space-y-3">
                {previewNotes.map((note) => (
                  <article key={note.title} className={`${note.tone} rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5 sm:p-5`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#2c3930]">{note.title}</p>
                        <p className="mt-2 text-sm leading-6 text-[#69766d]">{note.detail}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white/75 px-3 py-1 text-xs font-medium text-[#647168]">{note.label}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#88938a]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#77917a]" />
                      示例笔记 · 预览
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-dashed border-[#cbd6ca] px-4 py-3 text-sm text-[#718075]">
                <span>每个想法，都有自己的位置</span>
                <span className="font-serif text-lg italic text-[#557b61]">nº 01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
