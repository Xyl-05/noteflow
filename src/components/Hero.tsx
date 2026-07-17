import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              创意笔记管理平台
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              记录你的
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">
                {' '}创意灵感{' '}
              </span>
              <br />
              让想法自由流动
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              NoteFlow 是一款简洁优雅的个人笔记管理工具，帮助你高效记录、整理和管理日常笔记。
              支持标签分类、搜索过滤、实时编辑，让你的灵感永不丢失。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/notes" className="btn-primary inline-flex items-center justify-center">
                开始使用
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center">
                联系我们
              </Link>
            </div>
            
            <div className="flex items-center gap-8 mt-12">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">10,000+</p>
                <p className="text-sm text-gray-500">用户信赖使用</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-fade-in lg:animate-float">
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <span className="text-sm text-gray-500">我的笔记</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: '项目开发计划', tags: ['工作', '计划'], color: 'bg-blue-50' },
                    { title: '学习笔记：React Hooks', tags: ['学习', 'React'], color: 'bg-green-50' },
                    { title: '今日待办事项', tags: ['生活'], color: 'bg-purple-50' },
                  ].map((note, index) => (
                    <div
                      key={index}
                      className={`${note.color} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}
                    >
                      <h4 className="font-semibold text-gray-800 mb-2">{note.title}</h4>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-white/70 rounded-full text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-bounce">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-gray-700">快速创建</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold text-gray-700">数据安全</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
