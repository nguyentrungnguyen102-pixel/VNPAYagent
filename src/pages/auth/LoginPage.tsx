import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Button from '../../components/ui/Button'
import type { Role } from '../../types'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

const quickLogins: { role: Role; label: string; email: string; color: string }[] = [
  { role: 'F1', label: 'F1 – VNPAY Admin', email: 'admin@vnpay.vn', color: 'bg-vnpay-navy hover:bg-vnpay-blue' },
  { role: 'F2', label: 'F2 – Đại lý', email: 'agency@travelco.vn', color: 'bg-emerald-600 hover:bg-emerald-700' },
  { role: 'F3', label: 'F3 – CTV/Seller', email: 'seller@travelco.vn', color: 'bg-orange-500 hover:bg-orange-600' },
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, quickLogin } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/otp')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi đăng nhập')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickLogin = (role: Role) => {
    quickLogin(role)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vnpay-navy via-vnpay-blue to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <span className="text-2xl font-black text-vnpay-red">VP</span>
          </div>
          <h1 className="text-2xl font-bold text-white">VNPAYAgent OS</h1>
          <p className="text-blue-200 mt-1 text-sm">Nền tảng quản lý đại lý du lịch</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-vnpay-blue focus:border-vnpay-blue dark:bg-gray-700 dark:text-white"
                  required
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

            <div className="flex justify-end">
              <a href="#/forgot-password" className="text-sm text-vnpay-blue hover:underline">Quên mật khẩu?</a>
            </div>

            <Button type="submit" className="w-full" loading={loading}>Đăng nhập</Button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs text-gray-500 bg-white dark:bg-gray-800 px-3">
              Đăng nhập nhanh (Demo)
            </div>
          </div>

          <div className="space-y-2">
            {quickLogins.map(q => (
              <button
                key={q.role}
                onClick={() => handleQuickLogin(q.role)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors ${q.color}`}
              >
                <span>{q.label}</span>
                <span className="text-xs opacity-75">{q.email}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
