import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockHotels, mockRooms } from '../../data/hotels'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND } from '../../utils/formatters'
import { CheckCircle, Hotel } from 'lucide-react'

export default function HotelBookingPage() {
  const { hotelId, roomId } = useParams()
  const navigate = useNavigate()
  const hotel = mockHotels.find(h => h.id === hotelId) || mockHotels[0]
  const room = mockRooms.find(r => r.id === roomId) || mockRooms[0]
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [nights] = useState(3)
  const [submitted, setSubmitted] = useState(false)
  const total = room.pricePerNight * nights

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="max-w-md mx-auto text-center py-12 space-y-4">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full">
        <CheckCircle className="w-10 h-10 text-purple-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Yêu cầu đã được gửi!</h2>
      <p className="text-gray-500 dark:text-gray-400">Đặt phòng đang chờ xác nhận từ Admin/Đại lý</p>
      <Alert variant="warning">Trạng thái: <strong>Chờ duyệt (PendingApproval)</strong>. Bạn sẽ nhận thông báo khi được xác nhận.</Alert>
      <Button onClick={() => navigate('/hotel/approvals')}>Xem hàng chờ duyệt</Button>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Hotel className="w-5 h-5 text-vnpay-blue" /> Đặt phòng khách sạn</h1>
      <Card>
        <p className="font-semibold text-gray-900 dark:text-white">{hotel.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{room.name} · {nights} đêm</p>
        <p className="text-lg font-bold text-vnpay-blue mt-1">{formatVND(total)}</p>
      </Card>
      <Alert variant="info" title="Lưu ý">
        Đặt phòng khách sạn yêu cầu xác nhận thủ công. Yêu cầu sẽ được gửi lên Admin/Đại lý duyệt.
      </Alert>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên khách</label>
            <input value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Điện thoại</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <Button type="submit" className="w-full" size="lg">Gửi yêu cầu đặt phòng</Button>
        </form>
      </Card>
    </div>
  )
}
