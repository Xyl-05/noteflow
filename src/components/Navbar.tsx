import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, FileText } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/notes', label: '笔记' },
    { path: '/contact', label: '联系我们' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">NoteFlow</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200 ${
                  location.pathname === item.path ? 'text-primary-600' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/notes" className="btn-primary">
              开始使用
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-3 px-4 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-colors ${
                  location.pathname === item.path ? 'text-primary-600 bg-primary-50' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/notes"
              className="block mt-4 py-3 text-center btn-primary"
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
