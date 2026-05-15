import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockBuses } from '../../data/buses'
import { useScenarioStore } from '../../store/scenarioStore'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { LoadingPage } from '../../components/ui/Spinner'
import { formatVND, formatDuration } from '../../utils/formatters'
import { Bus, Clock, Wifi, Thermometer, ArrowLeft } from 'lucide-react'

export default function BusResultsPage() {
  const navigate = useNavigate()
  const { scenario } = useScenarioStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  if (loading) return <LoadingPage />
  if (scenario === 'empty') return <EmptyState icon={<Bus className="w-16 h-16" />} title="Không tìm thấy chuyến xe" action={<Button onClick={() => navigate(-1)} variant="secondary">Tìm lại</Button>} />

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Kết quả tìm xe</h1>
      </div>
      {mockBuses.map(bus => {
        const dep = new Date(bus.departureTime)
        const arr = new Date(bus.arrivalTime)
        return (
          <Card key={bus.id} className="hover:border-vnpay-blue transition-colors cursor-pointer" onClick={() => navigate(`/bus/book/${bus.id}`)}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white">{bus.operator}</span>
                  <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-vnpay-blue px-2 py-0.5 rounded-full">{bus.busType}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{dep.getHours().toString().padStart(2,'0')}:{dep.getMinutes().toString().padStart(2,'0')}</span>
                  <span className="text-gray-400">—</span>
                  <span className="text-xs flex items-center gap-1 text-gray-500"><Clock className="w-3 h-3" />{formatDuration(bus.duration)}</span>
                  <span className="text-gray-400">—</span>
                  <span className="font-medium">{arr.getHours().toString().padStart(2,'0')}:{arr.getMinutes().toString().padStart(2,'0')}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{bus.origin} → {bus.destination}</p>
                <div className="flex gap-2 mt-2">
                  {bus.amenities.map(a => (
                    <span key={a} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold text-vnpay-blue">{formatVND(bus.price)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Còn {bus.seatsAvailable} chỗ</p>
                <Button size="sm" className="mt-2">Đặt ngay</Button>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
