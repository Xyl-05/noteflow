import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/notes', label: '笔记' },
    { path: '/contact', label: '联系我们' },
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#e8ebe5]/80 bg-[#fbfaf7]/90 shadow-[0_4px_24px_-20px_rgba(31,56,38,0.35)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-[76px] items-center justify-between">
          <Link to="/" className="flex items-center gap-3" aria-label="NoteFlow 首页">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#244334] text-white shadow-sm">
              <FileText className="h-[18px] w-[18px]" />
            </div>
            <div>
              <span className="block text-[17px] font-semibold tracking-[-0.04em] text-[#26352c]">NoteFlow</span>
              <span className="-mt-0.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-[#8a958c]">your quiet workspace</span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 hover:text-[#345a40] ${
                  location.pathname === item.path || (item.path === '/notes' && location.pathname.startsWith('/notes/'))
                    ? 'text-[#345a40] after:absolute after:inset-x-0 after:-bottom-[2px] after:h-0.5 after:rounded-full after:bg-[#66866a]'
                    : 'text-[#77827a]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/notes" className="nav-cta">
              开始记录 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            className="rounded-xl p-2 text-[#405a48] transition-colors hover:bg-[#edf1eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66866a] md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="animate-fade-in border-t border-[#e8ebe5] py-4 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                className={`block rounded-xl px-4 py-3 font-medium transition-colors ${
                  location.pathname === item.path || (item.path === '/notes' && location.pathname.startsWith('/notes/'))
                    ? 'bg-[#edf1eb] text-[#345a40]'
                    : 'text-[#77827a] hover:bg-white hover:text-[#345a40]'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/notes"
              className="nav-cta mt-4 flex w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              开始使用
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
