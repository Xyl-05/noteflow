import { Clock3, Database, LayoutGrid, PenLine, Search, Tags } from 'lucide-react'

const features = [
  {
    icon: PenLine,
    number: '01',
    title: '先写下来',
    description: '用轻量编辑器记录标题、正文和标签，不需要复杂的设置就能开始。',
    tone: 'bg-[#e7eee5] text-[#55745d]',
  },
  {
    icon: Tags,
    number: '02',
    title: '用标签归档',
    description: '给笔记添加自己的标签，在列表中快速筛选相关内容。',
    tone: 'bg-[#f2e9dc] text-[#9a7043]',
  },
  {
    icon: Search,
    number: '03',
    title: '随时找回来',
    description: '同时搜索标题和正文，快速定位已经记录的想法。',
    tone: 'bg-[#e9e7f0] text-[#746b90]',
  },
  {
    icon: Clock3,
    number: '04',
    title: '保留修改时间',
    description: '记录笔记的创建与更新时间，回看内容变化更清楚。',
    tone: 'bg-[#e4edf0] text-[#587b85]',
  },
  {
    icon: Database,
    number: '05',
    title: '灵活保存',
    description: '支持 PHP API 与 SQLite；API 不可用时可使用浏览器本地存储。',
    tone: 'bg-[#e8eee7] text-[#59745d]',
  },
  {
    icon: LayoutGrid,
    number: '06',
    title: '不同屏幕都好用',
    description: '使用响应式布局，让桌面和手机上的记录体验都保持清晰。',
    tone: 'bg-[#f0e8e8] text-[#936d70]',
  },
]

export default function Features() {
  return (
    <section className="relative overflow-hidden border-t border-white/70 bg-[#fbfaf7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:mb-16 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">A CALMER WAY TO CAPTURE</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-[#1d2b25] sm:text-4xl">
              简单记录，轻松整理。
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-[#748078]">
            从一条笔记开始。清楚的结构和恰到好处的工具，让想法更容易留下来。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, number, title, description, tone }) => (
            <article key={number} className="feature-card group">
              <div className="mb-10 flex items-start justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-serif text-sm italic text-[#a2aaa1]">{number}</span>
              </div>
              <h3 className="text-lg font-semibold text-[#2b3930]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#77827a]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
