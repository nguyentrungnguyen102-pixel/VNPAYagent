import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockTickets } from '../../data/supportTickets'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatDateTime } from '../../utils/formatters'
import { Ticket, Plus } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { SupportTicket } from '../../types'

const statusConfig: Record<SupportTicket['status'], { label: string; color: string }> = {
  Open: { label: 'Mở', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  InProgress: { label: 'Đang xử lý', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  Resolved: { label: 'Đã giải quyết', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
  Closed: { label: 'Đã đóng', color: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' },
}

const issueTypeLabels = {
  flight_time_change: 'Thay đổi giờ bay',
  wrong_name: 'Sai tên',
  refund_error: 'Lỗi hoàn vé',
  payment_issue: 'Lỗi thanh toán',
  other: 'Khác',
}

export default function TicketListPage() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<SupportTicket['status'] | 'all'>('all')

  const filtered = mockTickets.filter(t => statusFilter === 'all' || t.status === statusFilter)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Ticket className="w-6 h-6 text-vnpay-blue" /> Ticket hỗ trợ
        </h1>
        <Button onClick={() => navigate('/support/create')}>
          <Plus className="w-4 h-4" /> Tạo ticket
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'Open', 'InProgress', 'Resolved', 'Closed'] as const).map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', statusFilter === s ? 'bg-vnpay-blue text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600')}
          >
            {s === 'all' ? 'Tất cả' : statusConfig[s as SupportTicket['status']].label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(ticket => {
          const st = statusConfig[ticket.status]
          return (
            <Card key={ticket.id} padding={false} className="hover:border-vnpay-blue transition-colors cursor-pointer" onClick={() => navigate(`/support/${ticket.id}`)}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">{issueTypeLabels[ticket.issueType]}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{ticket.subject}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">{ticket.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDateTime(ticket.createdAt)}</p>
                  </div>
                  <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0', st.color)}>{st.label}</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
