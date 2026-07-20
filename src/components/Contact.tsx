import { useState } from 'react'
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react'

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

  const contactInfo = [
    {
      icon: Mail,
      title: '电子邮箱',
      content: 'support@noteflow.com',
    },
    {
      icon: Phone,
      title: '联系电话',
      content: '400-123-4567',
    },
    {
      icon: MapPin,
      title: '公司地址',
      content: '北京市朝阳区科技园区',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            联系我们
          </h1>
          <p className="text-lg text-gray-600">
            有任何问题或建议？我们很乐意听取您的意见
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {info.title}
                  </h3>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">欢迎反馈</h3>
              <p className="text-primary-100 mb-4">
                我们重视每一位用户的反馈，您的建议将帮助我们不断改进产品。
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent-400" />
                <span className="text-sm">24小时内回复</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {submitSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  提交成功！
                </h3>
                <p className="text-gray-600">
                  感谢您的反馈，我们会尽快回复您。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    您的姓名 <span className="text-red-500">*</span>
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    电子邮箱 <span className="text-red-500">*</span>
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    您的需求或建议 <span className="text-red-500">*</span>
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
