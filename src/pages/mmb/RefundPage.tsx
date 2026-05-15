import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockBookings } from '../../data/bookings'
import { useWalletStore } from '../../store/walletStore'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND } from '../../utils/formatters'
import { ArrowLeft, CheckCircle, RotateCcw } from 'lucide-react'

export default function RefundPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { credit } = useWalletStore()
  const booking = mockBookings.find(b => b.id === bookingId) || mockBookings[0]
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const penaltyRate = booking.serviceType === 'flight' ? 0.1 : 0.05
  const penaltyAmount = Math.round(booking.totalAmount * penaltyRate)
  const refundableAmount = booking.totalAmount - penaltyAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    credit(refundableAmount, `Hoàn vé ${booking.id} - ${reason || 'Huỷ vé'}`)
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div className="max-w-md mx-auto text-center py-12 space-y-4">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <CheckCircle className="w-10 h-10 text-vnpay-blue" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Yêu cầu hoàn vé đã gửi!</h2>
      <p className="text-gray-500 dark:text-gray-400">Tiền hoàn {formatVND(refundableAmount)} đã được cộng vào ví.</p>
      <Button onClick={() => navigate('/bookings')}>Xem đặt chỗ</Button>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><RotateCcw className="w-5 h-5 text-red-500" /> Yêu cầu hoàn vé</h1>

      <Card>
        <p className="font-semibold text-gray-900 dark:text-white">{booking.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.id}{booking.pnr ? ` · ${booking.pnr}` : ''}</p>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Chi tiết hoàn vé</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Giá vé gốc</span><span className="dark:text-white">{formatVND(booking.totalAmount)}</span></div>
          <div className="flex justify-between text-red-600 dark:text-red-400"><span>Phí phạt ({(penaltyRate * 100).toFixed(0)}%)</span><span>-{formatVND(penaltyAmount)}</span></div>
          <div className="flex justify-between font-bold text-green-600 dark:text-green-400 border-t border-gray-200 dark:border-gray-700 pt-2">
            <span>Số tiền hoàn lại</span><span>{formatVND(refundableAmount)}</span>
          </div>
        </div>
      </Card>

      <Alert variant="warning">Tiền hoàn sẽ được cộng vào ví trong 1-3 ngày làm việc.</Alert>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lý do hoàn vé</label>
          <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} required placeholder="Nhập lý do hoàn vé..." className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
        </div>
        <Button type="submit" variant="danger" className="w-full" size="lg" loading={loading}>
          Xác nhận hoàn vé
        </Button>
      </form>
    </div>
  )
}
