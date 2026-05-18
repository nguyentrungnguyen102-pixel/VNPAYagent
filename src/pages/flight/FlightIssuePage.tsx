import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { mockFlights } from '../../data/flights'
import { useWalletStore } from '../../store/walletStore'
import Stepper from '../../components/ui/Stepper'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND, formatDuration } from '../../utils/formatters'
import { CheckCircle, Plane, Ticket } from 'lucide-react'

const STEPS = [
  { label: 'Tìm kiếm' },
  { label: 'Giữ chỗ' },
  { label: 'Thông tin' },
  { label: 'Xuất vé' },
]

export default function FlightIssuePage() {
  const { pnr } = useParams()
  const [qparams] = useSearchParams()
  const navigate = useNavigate()
  const { wallet, debit, credit } = useWalletStore()

  const flight = mockFlights.find(f => f.id === pnr) || mockFlights[0]
  const markup = Number(qparams.get('markup') || 0)
  const ancillaryTotal = Number(qparams.get('ancillary') || 0)
  const total = flight.totalFare + markup + ancillaryTotal
  const commission = Math.round(flight.totalFare * (flight.isInternational ? 0.001 : 0.002))

  const [issued, setIssued] = useState(false)
  const [issuing, setIssuing] = useState(false)
  const [fakePNR] = useState(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    return 'VN' + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  })

  const seg = flight.segments[0]
  const dep = new Date(seg.departureTime)

  const handleIssue = async () => {
    setIssuing(true)
    await new Promise(r => setTimeout(r, 1500))
    debit(total, `Vé máy bay ${seg.flightNumber} ${seg.origin}-${seg.destination}`, fakePNR)
    credit(commission, `Hoa hồng vé ${seg.flightNumber}`, fakePNR)
    setIssued(true)
    setIssuing(false)
  }

  if (issued) {
    return (
      <div className="max-w-md mx-auto text-center py-12 space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Xuất vé thành công!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Vé đã được gửi qua email hành khách</p>
        </div>
        <Card>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-center gap-2 text-vnpay-blue">
              <Ticket className="w-5 h-5" />
              <span className="text-xl font-mono font-bold">{fakePNR}</span>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Chuyến bay</span>
                <span className="font-medium dark:text-white">{seg.flightNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Hành trình</span>
                <span className="font-medium dark:text-white">{seg.origin} → {seg.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Ngày bay</span>
                <span className="font-medium dark:text-white">{dep.toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Tổng thanh toán</span>
                <span className="font-bold text-vnpay-blue">{formatVND(total)}</span>
              </div>
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Hoa hồng nhận được</span>
                <span className="font-medium">+{formatVND(commission)}</span>
              </div>
            </div>
          </div>
        </Card>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => navigate('/bookings')} className="flex-1">Xem đặt chỗ</Button>
          <Button onClick={() => navigate('/flight/search')} className="flex-1">Tìm vé mới</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Stepper steps={STEPS} currentStep={3} />
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Xác nhận & Xuất vé</h1>

      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
            <Plane className="w-5 h-5 text-vnpay-blue" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{seg.airline} · {seg.flightNumber}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {dep.toLocaleDateString('vi-VN')} · {dep.getHours().toString().padStart(2,'0')}:{dep.getMinutes().toString().padStart(2,'0')} · {formatDuration(seg.duration)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{seg.originCity} ({seg.origin}) → {seg.destinationCity} ({seg.destination})</p>
          </div>
        </div>
        <div className="space-y-2 text-sm border-t border-gray-100 dark:border-gray-700 pt-3">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Giá vé</span><span>{formatVND(flight.baseFare)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Thuế + Phí</span><span>{formatVND(flight.tax)}</span>
          </div>
          {markup > 0 && <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Phụ thu</span><span>{formatVND(markup)}</span></div>}
          {ancillaryTotal > 0 && <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Dịch vụ bổ sung</span><span>{formatVND(ancillaryTotal)}</span></div>}
          <div className="flex justify-between font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2">
            <span>Tổng cộng</span><span className="text-vnpay-blue">{formatVND(total)}</span>
          </div>
          <div className="flex justify-between text-green-600 dark:text-green-400 text-xs">
            <span>Hoa hồng dự kiến</span><span>+{formatVND(commission)}</span>
          </div>
        </div>
      </Card>

      <Alert variant="info" title="Thanh toán từ ví">
        Số dư hiện tại: <strong>{formatVND(wallet.balance)}</strong>
        {wallet.balance < total ? <span className="text-red-600 dark:text-red-400"> ← Không đủ số dư!</span> : <span className="text-green-600 dark:text-green-400"> ✓ Đủ số dư</span>}
      </Alert>

      {wallet.balance < total && (
        <Alert variant="error" title="Không đủ số dư">
          Vui lòng nạp thêm ít nhất {formatVND(total - wallet.balance)} để tiếp tục.
        </Alert>
      )}

      <Button className="w-full" size="lg" loading={issuing} disabled={wallet.balance < total} onClick={handleIssue}>
        Xuất vé & Thanh toán {formatVND(total)}
      </Button>
    </div>
  )
}
