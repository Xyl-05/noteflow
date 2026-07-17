import { PenTool, Tags, Search, Clock, Cloud, Lock } from 'lucide-react'

const features = [
  {
    icon: PenTool,
    title: '富文本编辑',
    description: '支持多种格式的文本编辑，让你的笔记更加丰富多样。',
    color: 'bg-blue-500',
  },
  {
    icon: Tags,
    title: '标签分类',
    description: '智能标签系统，轻松组织和管理你的笔记内容。',
    color: 'bg-green-500',
  },
  {
    icon: Search,
    title: '快速搜索',
    description: '实时搜索过滤，秒速找到你需要的笔记。',
    color: 'bg-purple-500',
  },
  {
    icon: Clock,
    title: '时间管理',
    description: '自动记录创建和更新时间，追踪笔记演变过程。',
    color: 'bg-orange-500',
  },
  {
    icon: Cloud,
    title: '云端同步',
    description: '数据安全存储，随时随地访问你的笔记。',
    color: 'bg-cyan-500',
  },
  {
    icon: Lock,
    title: '隐私保护',
    description: '端到端加密，保护你的隐私数据安全。',
    color: 'bg-pink-500',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            核心功能
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我们提供一系列强大的功能，帮助你更好地管理和组织笔记内容
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
