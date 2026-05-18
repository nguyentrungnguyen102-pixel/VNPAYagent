import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vnpay-navy via-vnpay-blue to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <button onClick={() => navigate('/login')} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 mb-6">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quên mật khẩu</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Nhập email đăng ký để nhận link đặt lại mật khẩu.</p>

        {sent ? (
          <Alert variant="success" title="Đã gửi email!">
            Vui lòng kiểm tra hộp thư của <strong>{email}</strong> và làm theo hướng dẫn.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-vnpay-blue focus:border-vnpay-blue dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" loading={loading}>Gửi link đặt lại</Button>
          </form>
        )}
      </div>
    </div>
  )
}
