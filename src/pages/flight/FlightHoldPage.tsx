import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { mockFlights } from '../../data/flights'
import { useScenarioStore } from '../../store/scenarioStore'
import Stepper from '../../components/ui/Stepper'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import FareSummaryCard from '../../components/booking/FareSummaryCard'
import HoldExpiredCountdown from '../../components/booking/HoldExpiredCountdown'
import { formatVND, formatDuration } from '../../utils/formatters'
import { Plane, Plus, Minus } from 'lucide-react'

const STEPS = [
  { label: 'Tìm kiếm' },
  { label: 'Giữ chỗ' },
  { label: 'Thông tin' },
  { label: 'Xuất vé' },
]

const ANCILLARIES = [
  { type: 'luggage' as const, description: 'Hành lý 23kg', price: 250_000 },
  { type: 'luggage' as const, description: 'Hành lý 30kg', price: 400_000 },
  { type: 'meal' as const, description: 'Bữa ăn trên máy bay', price: 85_000 },
  { type: 'seat' as const, description: 'Chọn chỗ ngồi', price: 50_000 },
]

interface PassengerForm {
  firstName: string
  lastName: string
  dob: string
  nationality: string
  idNumber: string
  phone: string
  email: string
  consentGiven: boolean
}

export default function FlightHoldPage() {
  const { offerId } = useParams()
  const [qparams] = useSearchParams()
  const navigate = useNavigate()
  const { scenario } = useScenarioStore()

  const flight = mockFlights.find(f => f.id === offerId) || mockFlights[0]
  const markup = Number(qparams.get('markup') || 0)
  const holdExpiry = scenario === 'hold_expired'
    ? new Date(Date.now() - 1000).toISOString()
    : new Date(Date.now() + 90 * 60 * 1000).toISOString()

  const [passenger, setPassenger] = useState<PassengerForm>({
    firstName: '', lastName: '', dob: '', nationality: 'VN',
    idNumber: '', phone: '', email: '', consentGiven: false,
  })
  const [ancillaries, setAncillaries] = useState<Record<number, number>>({})
  const [expired, setExpired] = useState(scenario === 'hold_expired')

  const seg = flight.segments[0]
  const dep = new Date(seg.departureTime)
  const ancillaryTotal = Object.entries(ancillaries).reduce((s, [i, qty]) => s + ANCILLARIES[Number(i)].price * qty, 0)

  const isValid = passenger.firstName && passenger.lastName && passenger.idNumber && passenger.phone && passenger.email && passenger.consentGiven

  const adjustAncillary = (i: number, delta: number) => {
    setAncillaries(prev => ({ ...prev, [i]: Math.max(0, (prev[i] || 0) + delta) }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Stepper steps={STEPS} currentStep={1} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Điền thông tin hành khách</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{seg.flightNumber} · {seg.originCity} → {seg.destinationCity}</p>
        </div>
        <HoldExpiredCountdown expiresAt={holdExpiry} onExpired={() => setExpired(true)} />
      </div>

      {expired && (
        <Alert variant="error" title="Giữ chỗ đã hết hạn">
          Thời gian giữ chỗ đã hết. Vui lòng quay lại tìm kiếm và chọn chuyến bay mới.
          <Button variant="secondary" size="sm" className="mt-2" onClick={() => navigate('/flight/search')}>Tìm chuyến mới</Button>
        </Alert>
      )}

      {/* Flight Summary */}
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
            <Plane className="w-5 h-5 text-vnpay-blue" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-white">{seg.airline} · {seg.flightNumber}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {dep.toLocaleDateString('vi-VN')} · {dep.getHours().toString().padStart(2,'0')}:{dep.getMinutes().toString().padStart(2,'0')} · {formatDuration(seg.duration)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">{flight.baggageAllowance}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{flight.fareClass}</p>
          </div>
        </div>
      </Card>

      {/* Passenger Form */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Thông tin hành khách</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Họ', key: 'lastName' as const },
            { label: 'Tên', key: 'firstName' as const },
            { label: 'Ngày sinh', key: 'dob' as const, type: 'date' },
            { label: 'Số CCCD/Hộ chiếu', key: 'idNumber' as const },
            { label: 'Điện thoại', key: 'phone' as const, type: 'tel' },
            { label: 'Email', key: 'email' as const, type: 'email' },
          ].map(field => (
            <div key={field.key} className={field.key === 'email' ? 'col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{field.label}</label>
              <input
                type={field.type || 'text'}
                value={passenger[field.key] as string}
                onChange={e => setPassenger(prev => ({ ...prev, [field.key]: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-vnpay-blue dark:bg-gray-700 dark:text-white"
                disabled={expired}
              />
            </div>
          ))}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quốc tịch</label>
            <select
              value={passenger.nationality}
              onChange={e => setPassenger(prev => ({ ...prev, nationality: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-vnpay-blue dark:bg-gray-700 dark:text-white"
            >
              <option value="VN">Việt Nam</option>
              <option value="US">Hoa Kỳ</option>
              <option value="JP">Nhật Bản</option>
              <option value="KR">Hàn Quốc</option>
              <option value="CN">Trung Quốc</option>
            </select>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={passenger.consentGiven}
              onChange={e => setPassenger(prev => ({ ...prev, consentGiven: e.target.checked }))}
              className="mt-0.5 w-4 h-4 accent-vnpay-blue"
              disabled={expired}
            />
            <span className="text-xs text-gray-600 dark:text-gray-300">
              <strong>Đồng ý theo Nghị định 13/2023/NĐ-CP</strong>: Tôi đồng ý cho phép thu thập, xử lý dữ liệu cá nhân để thực hiện giao dịch đặt vé và tuân thủ các quy định pháp luật về bảo vệ dữ liệu cá nhân.
            </span>
          </label>
        </div>
      </Card>

      {/* Ancillaries */}
      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Dịch vụ bổ sung</h3>
        <div className="space-y-3">
          {ANCILLARIES.map((anc, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{anc.description}</p>
                <p className="text-xs text-vnpay-blue">+{formatVND(anc.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => adjustAncillary(i, -1)} disabled={expired} className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-medium dark:text-white">{ancillaries[i] || 0}</span>
                <button onClick={() => adjustAncillary(i, 1)} disabled={expired} className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <FareSummaryCard baseFare={flight.baseFare} tax={flight.tax} markup={markup} ancillaryTotal={ancillaryTotal} />

      <Button
        className="w-full"
        size="lg"
        disabled={!isValid || expired}
        onClick={() => navigate(`/flight/issue/${offerId}?markup=${markup}&ancillary=${ancillaryTotal}`)}
      >
        Tiếp tục xuất vé →
      </Button>
    </div>
  )
}
