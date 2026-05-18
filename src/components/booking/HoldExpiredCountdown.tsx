import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '../../utils/cn'

interface HoldExpiredCountdownProps {
  expiresAt: string
  onExpired?: () => void
}

export default function HoldExpiredCountdown({ expiresAt, onExpired }: HoldExpiredCountdownProps) {
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    const calc = () => {
      const diff = new Date(expiresAt).getTime() - Date.now()
      setRemaining(Math.max(0, diff))
    }
    calc()
    const t = setInterval(() => {
      calc()
      if (new Date(expiresAt).getTime() <= Date.now()) {
        clearInterval(t)
        onExpired?.()
      }
    }, 1000)
    return () => clearInterval(t)
  }, [expiresAt, onExpired])

  const totalMs = new Date(expiresAt).getTime() - (Date.now() - remaining + remaining)
  const expired = remaining === 0
  const mins = Math.floor(remaining / 60000)
  const secs = Math.floor((remaining % 60000) / 1000)
  const urgent = remaining < 5 * 60 * 1000 && !expired

  return (
    <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium', expired ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : urgent ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300')}>
      <Clock className="w-4 h-4" />
      {expired ? 'Giữ chỗ đã hết hạn' : `Hết hạn sau: ${mins}:${secs.toString().padStart(2, '0')}`}
    </div>
  )
}
