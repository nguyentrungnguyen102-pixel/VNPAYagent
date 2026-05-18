import { cn } from '../../utils/cn'
import type { BookingStatus } from '../../types'

interface BadgeProps {
  status?: BookingStatus
  label?: string
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray' | 'purple' | 'teal'
  className?: string
}

const statusConfig: Record<BookingStatus, { label: string; color: string }> = {
  Hold: { label: 'Giữ chỗ', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  Issued: { label: 'Đã xuất vé', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
  Cancelled: { label: 'Đã huỷ', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' },
  RefundPending: { label: 'Chờ hoàn', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  Refunded: { label: 'Đã hoàn', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300' },
  PendingApproval: { label: 'Chờ duyệt', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
}

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  yellow: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  gray: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
}

export default function Badge({ status, label, color, className }: BadgeProps) {
  if (status) {
    const cfg = statusConfig[status]
    return (
      <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', cfg.color, className)}>
        {cfg.label}
      </span>
    )
  }
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', color ? colorMap[color] : colorMap.blue, className)}>
      {label}
    </span>
  )
}
