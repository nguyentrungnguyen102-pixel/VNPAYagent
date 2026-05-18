import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockTickets } from '../../data/supportTickets'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatDateTime } from '../../utils/formatters'
import { ArrowLeft, MessageCircle, CheckCircle, Clock } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { SupportTicket } from '../../types'

const statusConfig: Record<SupportTicket['status'], { label: string; color: string }> = {
  Open: { label: 'Mở', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  InProgress: { label: 'Đang xử lý', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  Resolved: { label: 'Đã giải quyết', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
  Closed: { label: 'Đã đóng', color: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' },
}

const MOCK_THREAD = [
  { from: 'agent', message: 'Khách hàng yêu cầu hỗ trợ khẩn cấp. Vui lòng xử lý sớm.', time: '2026-05-14T11:00:00Z' },
  { from: 'support', message: 'Đã tiếp nhận. Đang kiểm tra với hãng bay. Sẽ phản hồi trong 1-2h.', time: '2026-05-14T12:30:00Z' },
  { from: 'support', message: 'Đã liên hệ Vietnam Airlines. Hãng xác nhận có thể đổi chuyến với phụ phí 350.000 VND. Anh/chị xác nhận không?', time: '2026-05-14T14:00:00Z' },
]

export default function TicketDetailPage() {
  const { ticketId } = useParams()
  const navigate = useNavigate()
  const ticket = mockTickets.find(t => t.id === ticketId) || mockTickets[0]
  const [reply, setReply] = useState('')
  const [thread, setThread] = useState(MOCK_THREAD)
  const statusCfg = statusConfig[ticket.status]

  const handleReply = () => {
    if (!reply.trim()) return
    setThread(prev => [...prev, { from: 'agent', message: reply, time: new Date().toISOString() }])
    setReply('')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700"><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{ticket.subject}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-mono text-gray-400">{ticket.id}</span>
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', statusCfg.color)}>{statusCfg.label}</span>
          </div>
        </div>
      </div>

      <Card>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Đơn hàng</span><span className="font-medium dark:text-white">{ticket.bookingId}{ticket.pnr ? ` · ${ticket.pnr}` : ''}</span></div>
          <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Tạo lúc</span><span className="dark:text-white">{formatDateTime(ticket.createdAt)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Cập nhật</span><span className="dark:text-white">{formatDateTime(ticket.updatedAt)}</span></div>
        </div>
        <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-700 dark:text-gray-300">
          {ticket.description}
        </div>
      </Card>

      <Card>
        <CardHeader><CardTitle><span className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> Trao đổi</span></CardTitle></CardHeader>
        <div className="space-y-4">
          {thread.map((msg, i) => (
            <div key={i} className={cn('flex', msg.from === 'agent' ? 'justify-start' : 'justify-end')}>
              <div className={cn('max-w-xs rounded-xl p-3 text-sm', msg.from === 'agent' ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' : 'bg-vnpay-blue text-white')}>
                <p>{msg.message}</p>
                <p className={cn('text-xs mt-1', msg.from === 'agent' ? 'text-gray-400' : 'text-blue-200')}>
                  {msg.from === 'support' ? 'VNPAY Support' : 'Đại lý'} · {new Date(msg.time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            onKeyDown={e => e.key === 'Enter' && handleReply()}
          />
          <Button size="sm" onClick={handleReply}>Gửi</Button>
        </div>
      </Card>

      {(ticket.status === 'Open' || ticket.status === 'InProgress') && (
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>Quay lại</Button>
          <Button onClick={() => {}}>
            <CheckCircle className="w-4 h-4" /> Đánh dấu đã giải quyết
          </Button>
        </div>
      )}
    </div>
  )
}
