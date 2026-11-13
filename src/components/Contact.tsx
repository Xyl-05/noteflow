import { useState } from 'react'
import { Send, MessageCircle, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('请填写所有字段')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert('请输入有效的邮箱地址')
      return
    }

    setIsSubmitting(true)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 3000)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      const data = await response.json()
      if (data.success) {
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        alert(data.error || '提交失败')
      }
    } catch (err) {
      // 降级到 localStorage
      try {
        const stored = localStorage.getItem('noteflow_contacts')
        const contacts = stored ? JSON.parse(stored) : []
        contacts.push({ ...formData, createdAt: new Date().toISOString() })
        localStorage.setItem('noteflow_contacts', JSON.stringify(contacts))
        setSubmitSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitSuccess(false), 5000)
      } catch {
        alert('提交失败，请重试')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-surface min-h-screen pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mb-12 text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#6e876f]">Say hello</p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[#26352c] sm:text-4xl">
            联系我们
          </h1>
          <p className="text-base text-[#718075] sm:text-lg">
            有任何问题或建议？我们很乐意听取您的意见
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-[#e3e7df] bg-white/90 p-7 shadow-[0_18px_50px_-38px_rgba(42,66,50,0.35)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8efe7] text-[#557b61]">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#2d3c32]">项目反馈</h3>
                <p className="leading-7 text-[#718075]">
                  这是一个个人练习项目。欢迎通过表单提交使用建议或发现的问题。
                </p>
              </div>
            <div className="rounded-[1.75rem] bg-gradient-to-br from-[#244334] to-[#355a42] p-7 text-white shadow-[0_22px_55px_-35px_rgba(36,67,52,0.65)]">
              <h3 className="mb-2 text-xl font-semibold">简单、清晰、好找</h3>
              <p className="mb-4 leading-7 text-[#d5e0d5]">
                NoteFlow 聚焦个人笔记的记录、标签整理与快速搜索。
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#c3d6b8]" />
                <span className="text-sm text-[#e5ede2]">持续打磨体验</span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#e3e7df] bg-white/95 p-6 shadow-[0_20px_55px_-40px_rgba(42,66,50,0.4)] sm:p-8">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e8efe7]">
                  <CheckCircle className="h-8 w-8 text-[#557b61]" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-[#26352c]">
                  提交成功！
                </h3>
                <p className="text-[#718075]">
                  感谢您的反馈，我们会尽快回复您。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#435247]">
                    您的姓名 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="请输入您的姓名"
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#435247]">
                    电子邮箱 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="请输入您的电子邮箱"
                    className="input-field"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#435247]">
                    您的需求或建议 <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="请输入您的需求或建议..."
                    rows={5}
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center justify-center w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? '发送中...' : '发送留言'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
