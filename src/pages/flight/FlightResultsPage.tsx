import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { mockFlights } from '../../data/flights'
import { useScenarioStore } from '../../store/scenarioStore'
import { useAuthStore } from '../../store/authStore'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import EmptyState from '../../components/ui/EmptyState'
import { LoadingPage } from '../../components/ui/Spinner'
import { formatVND, formatDuration } from '../../utils/formatters'
import { cn } from '../../utils/cn'
import { Plane, Clock, Luggage, RefreshCw, ArrowLeft, TrendingUp } from 'lucide-react'
import type { FlightOffer } from '../../types'

export default function FlightResultsPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { scenario } = useScenarioStore()
  const user = useAuthStore(s => s.user)
  const [loading, setLoading] = useState(true)
  const [markup, setMarkup] = useState(0)
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price')
  const [filterAirline, setFilterAirline] = useState('all')

  const from = params.get('from') || 'HAN'
  const to = params.get('to') || 'SGN'

  useEffect(() => {
    const delay = scenario === 'timeout' ? 30000 : 1200
    const t = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(t)
  }, [scenario])

  if (loading) return <LoadingPage />
  if (scenario === 'empty') return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Quay lại
      </button>
      <EmptyState icon={<Plane className="w-16 h-16" />} title="Không tìm thấy chuyến bay" description={`Không có chuyến bay ${from} → ${to} vào ngày được chọn.`} action={<Button onClick={() => navigate(-1)} variant="secondary">Tìm lại</Button>} />
    </div>
  )

  const priceMultiplier = scenario === 'price_changed' ? 1.15 : 1
  const relevantFlights = mockFlights.filter(f => {
    const seg = f.segments[0]
    return (seg.origin === from && seg.destination === to) || true
  })

  const airlines = [...new Set(relevantFlights.map(f => f.segments[0].airline))]
  let filtered = filterAirline === 'all' ? relevantFlights : relevantFlights.filter(f => f.segments[0].airline === filterAirline)
  filtered = [...filtered].sort((a, b) => sortBy === 'price' ? a.totalFare - b.totalFare : a.segments[0].duration - b.segments[0].duration)

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{from} → {to}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} chuyến bay</p>
        </div>
      </div>

      {scenario === 'price_changed' && (
        <Alert variant="warning" title="Giá vé đã thay đổi">
          Giá vé đã tăng +15% so với lần tìm kiếm trước. Vui lòng kiểm tra lại trước khi đặt.
        </Alert>
      )}

      {(user?.role === 'F2' || user?.role === 'F3') && (
        <Card>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-vnpay-blue" />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phụ thu đại lý / khách:</label>
            <input
              type="number"
              min={0}
              step={10000}
              value={markup}
              onChange={e => setMarkup(Number(e.target.value))}
              className="w-32 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-xs text-gray-500">VND</span>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Sắp xếp:</span>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-xs">
            {(['price', 'duration'] as const).map(s => (
              <button key={s} onClick={() => setSortBy(s)} className={cn('px-3 py-1.5 transition-colors', sortBy === s ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700')}>
                {s === 'price' ? 'Giá' : 'Thời gian'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">Hãng:</span>
          <select value={filterAirline} onChange={e => setFilterAirline(e.target.value)} className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 dark:bg-gray-700 dark:text-white">
            <option value="all">Tất cả</option>
            {airlines.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Flight List */}
      <div className="space-y-3">
        {filtered.map(flight => {
          const seg = flight.segments[0]
          const finalFare = Math.round(flight.totalFare * priceMultiplier)
          const totalWithMarkup = finalFare + markup
          const dep = new Date(seg.departureTime)
          const arr = new Date(seg.arrivalTime)

          return (
            <Card key={flight.id} padding={false} className="hover:border-vnpay-blue transition-colors cursor-pointer" onClick={() => navigate(`/flight/hold/${flight.id}?markup=${markup}`)}>
              <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <span className="text-xs font-bold text-vnpay-blue">{seg.airlineCode}</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{seg.airline}</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{seg.flightNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-1 justify-center">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{dep.getHours().toString().padStart(2,'0')}:{dep.getMinutes().toString().padStart(2,'0')}</p>
                      <p className="text-xs text-gray-500">{seg.origin}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-400">{formatDuration(seg.duration)}</span>
                      <div className="flex items-center gap-1 my-0.5">
                        <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
                        <Plane className="w-3 h-3 text-gray-400 rotate-90" />
                        <div className="w-12 h-px bg-gray-300 dark:bg-gray-600" />
                      </div>
                      <span className="text-xs text-gray-400">Thẳng</span>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{arr.getHours().toString().padStart(2,'0')}:{arr.getMinutes().toString().padStart(2,'0')}</p>
                      <p className="text-xs text-gray-500">{seg.destination}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold text-vnpay-blue">{formatVND(totalWithMarkup)}</p>
                    {markup > 0 && <p className="text-xs text-gray-500 line-through">{formatVND(finalFare)}</p>}
                    <div className="flex items-center gap-1 justify-end mt-1">
                      <Luggage className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{flight.baggageAllowance}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{seg.aircraft}</span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className={cn('text-xs font-medium', flight.seatsAvailable <= 5 ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400')}>
                    Còn {flight.seatsAvailable} chỗ
                  </span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-500">{flight.fareClass}</span>
                  {flight.refundable && <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">Hoàn được</span>}
                  {flight.isInternational && <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">Quốc tế</span>}
                  <div className="flex-1" />
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/flight/hold/${flight.id}?markup=${markup}`) }}>
                    Giữ chỗ
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
