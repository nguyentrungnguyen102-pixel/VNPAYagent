import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Button from '../../components/ui/Button'
import { ShieldCheck } from 'lucide-react'

export default function OTPPage() {
  const navigate = useNavigate()
  const { verifyOTP, otpEmail } = useAuthStore()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(60)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!otpEmail) navigate('/login')
  }, [otpEmail, navigate])

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  const handleChange = (i: number, v: string) => {
    if (!/^\d*$/.test(v)) return
    const next = [...otp]
    next[i] = v.slice(-1)
    setOtp(next)
    if (v && i < 5) refs.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) { setError('Vui lòng nhập đủ 6 số'); return }
    setLoading(true)
    setError('')
    try {
      await verifyOTP(code)
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'OTP không hợp lệ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vnpay-navy via-vnpay-blue to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-3">
            <ShieldCheck className="w-7 h-7 text-vnpay-blue" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Xác thực OTP</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Mã OTP đã gửi tới <strong>{otpEmail}</strong>
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">(Gợi ý demo: nhập 123456)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => { refs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className="w-11 h-12 text-center text-lg font-bold border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-vnpay-blue focus:border-vnpay-blue dark:bg-gray-700 dark:text-white transition-colors"
              />
            ))}
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}

          <Button type="submit" className="w-full" loading={loading}>Xác nhận</Button>

          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">Gửi lại sau {countdown}s</p>
            ) : (
              <button type="button" onClick={() => setCountdown(60)} className="text-sm text-vnpay-blue hover:underline">
                Gửi lại mã OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
