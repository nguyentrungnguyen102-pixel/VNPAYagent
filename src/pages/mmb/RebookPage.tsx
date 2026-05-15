import { useNavigate, useParams } from 'react-router-dom'
import { mockBookings } from '../../data/bookings'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND } from '../../utils/formatters'
import { ArrowLeft, RefreshCw } from 'lucide-react'

export default function RebookPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const booking = mockBookings.find(b => b.id === bookingId) || mockBookings[0]

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><RefreshCw className="w-5 h-5 text-vnpay-blue" /> Đặt lại vé</h1>
      <Card>
        <p className="font-semibold text-gray-900 dark:text-white">{booking.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Giá cũ: {formatVND(booking.totalAmount)}</p>
      </Card>
      <Alert variant="info">Để đặt lại, vui lòng tìm kiếm chuyến bay/dịch vụ mới. Phần chênh lệch giá sẽ được tính thêm.</Alert>
      <div className="flex gap-3">
        <Button className="flex-1" onClick={() => navigate('/flight/search')}>Tìm vé máy bay mới</Button>
        <Button variant="secondary" className="flex-1" onClick={() => navigate('/bookings')}>Quay lại</Button>
      </div>
    </div>
  )
}
