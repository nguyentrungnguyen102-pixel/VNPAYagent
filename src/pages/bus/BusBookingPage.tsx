import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockBuses } from '../../data/buses'
import { useWalletStore } from '../../store/walletStore'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND } from '../../utils/formatters'
import { CheckCircle, Bus } from 'lucide-react'

export default function BusBookingPage() {
  const { routeId } = useParams()
  const navigate = useNavigate()
  const { wallet, debit, credit } = useWalletStore()
  const bus = mockBuses.find(b => b.id === routeId) || mockBuses[0]
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [seat, setSeat] = useState<number | null>(null)
  const [booked, setBooked] = useState(false)
  const [loading, setLoading] = useState(false)
  const commission = Math.round(bus.price * 0.025)

  const handleBook = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    debit(bus.price, `Xe khách ${bus.operator} ${bus.origin}→${bus.destination}`)
    credit(commission, `Hoa hồng xe khách`)
    setBooked(true)
    setLoading(false)
  }

  if (booked) return (
    <div className="max-w-md mx-auto text-center py-12 space-y-4">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Đặt vé thành công!</h2>
      <p className="text-gray-500 dark:text-gray-400">{bus.operator} · Ghế {seat || 'A1'} · {bus.origin} → {bus.destination}</p>
      <p className="text-green-600 dark:text-green-400 text-sm">Hoa hồng: +{formatVND(commission)}</p>
      <Button onClick={() => navigate('/bookings')}>Xem đặt chỗ</Button>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Bus className="w-6 h-6 text-vnpay-blue" />
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Đặt vé xe khách</h1>
      </div>
      <Card>
        <p className="font-semibold text-gray-900 dark:text-white">{bus.operator} · {bus.busType}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{bus.origin} → {bus.destination}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Ngày 01/06/2026 · {new Date(bus.departureTime).getHours()}:{new Date(bus.departureTime).getMinutes().toString().padStart(2,'0')}</p>
      </Card>
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Thông tin hành khách</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Họ tên</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Điện thoại</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
      </Card>
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Chọn ghế</h3>
        <div className="grid grid-cols-8 gap-1.5">
          {Array.from({ length: 40 }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setSeat(n)} className={`h-8 rounded text-xs font-medium transition-colors ${seat === n ? 'bg-vnpay-blue text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}>{n}</button>
          ))}
        </div>
        {seat && <p className="text-sm text-vnpay-blue mt-2">Đã chọn ghế: {seat}</p>}
      </Card>
      <Alert variant="info">Thanh toán từ ví: <strong>{formatVND(wallet.balance)}</strong> → sau khi đặt: {formatVND(wallet.balance - bus.price)}</Alert>
      <Button className="w-full" size="lg" loading={loading} disabled={!name || !phone || !seat} onClick={handleBook}>
        Thanh toán {formatVND(bus.price)}
      </Button>
    </div>
  )
}
