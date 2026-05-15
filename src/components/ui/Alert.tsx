import { cn } from '../../utils/cn'
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react'
import type { ReactNode } from 'react'

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: ReactNode
  className?: string
}

const config = {
  info: { icon: Info, bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-800 dark:text-blue-200', icon_cls: 'text-blue-500' },
  success: { icon: CheckCircle, bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', text: 'text-green-800 dark:text-green-200', icon_cls: 'text-green-500' },
  warning: { icon: AlertCircle, bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-800 dark:text-amber-200', icon_cls: 'text-amber-500' },
  error: { icon: XCircle, bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', text: 'text-red-800 dark:text-red-200', icon_cls: 'text-red-500' },
}

export default function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const c = config[variant]
  const Icon = c.icon
  return (
    <div className={cn('flex gap-3 p-4 rounded-lg border', c.bg, c.border, className)}>
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', c.icon_cls)} />
      <div className={cn('text-sm', c.text)}>
        {title && <p className="font-semibold mb-1">{title}</p>}
        {children}
      </div>
    </div>
  )
}
