import { useNavigate, useParams } from 'react-router-dom'
import { mockBookings } from '../../data/bookings'
import { useAuthStore } from '../../store/authStore'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND, formatDateTime, maskPhone, maskEmail } from '../../utils/formatters'
import { ArrowLeft, Plane, Bus, Car, Film, Hotel, User, RefreshCw, RotateCcw, TicketCheck } from 'lucide-react'
import type { ServiceType } from '../../types'

const serviceIcons: Record<ServiceType, React.ElementType> = { flight: Plane, bus: Bus, taxi: Car, movie: Film, hotel: Hotel }

export default function BookingDetailPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const booking = mockBookings.find(b => b.id === bookingId)

  if (!booking) return (
    <div className="text-center py-12">
      <p className="text-gray-500 dark:text-gray-400">Không tìm thấy đơn đặt chỗ</p>
      <Button variant="secondary" onClick={() => navigate('/bookings')} className="mt-4">Quay lại</Button>
    </div>
  )

  const Icon = serviceIcons[booking.serviceType]
  const canRefund = booking.status === 'Issued'
  const canRebook = booking.status === 'Issued' || booking.status === 'Refunded'
  const shouldMask = user?.role === 'F2' && booking.agentId === 'u3'

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Chi tiết đặt chỗ</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{booking.id}</p>
        </div>
        <div className="ml-auto"><Badge status={booking.status} /></div>
      </div>

      <Card>
        <div className="flex items-start gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Icon className="w-6 h-6 text-vnpay-blue" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900 dark:text-white">{booking.description}</h2>
            {booking.pnr && <p className="text-sm font-mono text-vnpay-blue mt-1">{booking.pnr}</p>}
            <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
              <div>
                <p className="text-xs text-gray-400">Ngày tạo</p>
                <p className="font-medium dark:text-white">{formatDateTime(booking.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Cập nhật</p>
                <p className="font-medium dark:text-white">{formatDateTime(booking.updatedAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Tổng tiền</p>
                <p className="font-bold text-vnpay-blue">{formatVND(booking.totalAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Hoa hồng</p>
                <p className="font-medium text-green-600 dark:text-green-400">+{formatVND(booking.commission)}</p>
              </div>
              {booking.markup && booking.markup > 0 && (
                <div>
                  <p className="text-xs text-gray-400">Markup</p>
                  <p className="font-medium dark:text-white">{formatVND(booking.markup)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {booking.passengers && booking.passengers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hành khách</CardTitle>
            {shouldMask && <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded">Đã ẩn (ND13)</span>}
          </CardHeader>
          {booking.passengers.map((pax, i) => (
            <div key={i} className="flex items-start gap-3">
              <User className="w-4 h-4 text-gray-400 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-medium text-gray-900 dark:text-white">{pax.lastName} {pax.firstName}</p>
                <p className="text-gray-500 dark:text-gray-400">CCCD: {shouldMask ? '079*****234' : pax.idNumber}</p>
                <p className="text-gray-500 dark:text-gray-400">SĐT: {shouldMask ? maskPhone(pax.phone) : pax.phone}</p>
                <p className="text-gray-500 dark:text-gray-400">Email: {shouldMask ? maskEmail(pax.email) : pax.email}</p>
              </div>
            </div>
          ))}
        </Card>
      )}

      {booking.refundInfo && (
        <Card>
          <CardHeader><CardTitle>Thông tin hoàn vé</CardTitle></CardHeader>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Lý do</span><span className="dark:text-white">{booking.refundInfo.reason}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Phí phạt</span><span className="text-red-600 dark:text-red-400">-{formatVND(booking.refundInfo.penaltyAmount)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Hoàn lại</span><span className="text-green-600 dark:text-green-400">+{formatVND(booking.refundInfo.refundableAmount)}</span></div>
          </div>
        </Card>
      )}

      {booking.holdExpiresAt && (
        <Alert variant="warning" title="Giữ chỗ">Hết hạn: {formatDateTime(booking.holdExpiresAt)}</Alert>
      )}

      <div className="flex flex-wrap gap-3">
        {canRefund && (
          <Button variant="danger" onClick={() => navigate(`/bookings/${booking.id}/refund`)}>
            <RotateCcw className="w-4 h-4" /> Yêu cầu hoàn vé
          </Button>
        )}
        {canRebook && (
          <Button variant="secondary" onClick={() => navigate(`/bookings/${booking.id}/rebook`)}>
            <RefreshCw className="w-4 h-4" /> Đặt lại
          </Button>
        )}
        <Button variant="outline" onClick={() => navigate('/support/create', { state: { bookingId: booking.id } })}>
          <TicketCheck className="w-4 h-4" /> Tạo ticket hỗ trợ
        </Button>
      </div>
    </div>
  )
}
