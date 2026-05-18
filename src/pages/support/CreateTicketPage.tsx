import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { mockBookings } from '../../data/bookings'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { CheckCircle, Ticket } from 'lucide-react'

const ISSUE_TYPES = [
  { value: 'flight_time_change', label: 'Thay đổi giờ bay' },
  { value: 'wrong_name', label: 'Sai tên hành khách' },
  { value: 'refund_error', label: 'Lỗi hoàn vé' },
  { value: 'payment_issue', label: 'Lỗi thanh toán' },
  { value: 'other', label: 'Khác' },
]

export default function CreateTicketPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const preselectedBookingId = (location.state as { bookingId?: string } | null)?.bookingId || ''
  const [bookingId, setBookingId] = useState(preselectedBookingId)
  const [issueType, setIssueType] = useState('flight_time_change')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div className="max-w-md mx-auto text-center py-12 space-y-4">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <CheckCircle className="w-10 h-10 text-vnpay-blue" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ticket đã được tạo!</h2>
      <p className="text-gray-500 dark:text-gray-400">Nhóm hỗ trợ sẽ phản hồi trong vòng 2-4 giờ làm việc.</p>
      <div className="flex gap-3 justify-center">
        <Button variant="secondary" onClick={() => navigate('/support')}>Xem danh sách</Button>
        <Button onClick={() => navigate('/support/TK00' + Date.now().toString().slice(-1))}>Xem ticket</Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Ticket className="w-6 h-6 text-vnpay-blue" /> Tạo Ticket hỗ trợ</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Đơn đặt chỗ liên quan</label>
            <select value={bookingId} onChange={e => setBookingId(e.target.value)} required className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
              <option value="">-- Chọn đơn --</option>
              {mockBookings.map(b => <option key={b.id} value={b.id}>{b.id} - {b.description}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loại vấn đề</label>
            <select value={issueType} onChange={e => setIssueType(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
              {ISSUE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiêu đề</label>
            <input value={subject} onChange={e => setSubject(e.target.value)} required placeholder="Mô tả ngắn vấn đề..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mô tả chi tiết</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} placeholder="Mô tả chi tiết vấn đề..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <Button type="submit" className="w-full" loading={loading}>Gửi ticket</Button>
        </form>
      </Card>
    </div>
  )
}
