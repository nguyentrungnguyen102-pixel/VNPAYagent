import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useWalletStore } from '../../store/walletStore'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND } from '../../utils/formatters'
import { CheckCircle, Film } from 'lucide-react'

export default function MoviePaymentPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { wallet, debit, credit } = useWalletStore()
  const state = location.state as { seats: number[]; total: number; commission: number } | null
  const total = state?.total || 360_000
  const commission = state?.commission || 12_600
  const seats = state?.seats || [12, 13, 14]
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePay = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    debit(total, 'Vé xem phim CGV')
    credit(commission, 'Hoa hồng vé phim CGV')
    setPaid(true)
    setLoading(false)
  }

  if (paid) return (
    <div className="max-w-md mx-auto text-center py-12 space-y-4">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Đặt vé thành công!</h2>
      <p className="text-gray-500 dark:text-gray-400">Ghế: {seats.join(', ')}</p>
      <p className="text-green-600 dark:text-green-400 text-sm">Hoa hồng: +{formatVND(commission)}</p>
      <Button onClick={() => navigate('/bookings')}>Xem đặt chỗ</Button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Film className="w-5 h-5 text-vnpay-blue" /> Xác nhận thanh toán</h1>
      <Card>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Ghế đã chọn</span><span className="font-medium dark:text-white">{seats.join(', ')}</span></div>
          <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Số vé</span><span className="dark:text-white">{seats.length}</span></div>
          <div className="flex justify-between font-bold text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-700 pt-2">
            <span>Tổng cộng</span><span className="text-vnpay-blue">{formatVND(total)}</span>
          </div>
          <div className="flex justify-between text-green-600 dark:text-green-400 text-xs">
            <span>Hoa hồng dự kiến</span><span>+{formatVND(commission)}</span>
          </div>
        </div>
      </Card>
      <Alert variant="info">Số dư ví: <strong>{formatVND(wallet.balance)}</strong></Alert>
      <Button className="w-full" size="lg" loading={loading} onClick={handlePay}>Thanh toán {formatVND(total)}</Button>
    </div>
  )
}
