import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Bus, Calendar, Users } from 'lucide-react'

const CITIES = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Đà Lạt', 'Cần Thơ', 'Huế', 'Vinh', 'Nha Trang']

export default function BusSearchPage() {
  const navigate = useNavigate()
  const [origin, setOrigin] = useState('Hà Nội')
  const [destination, setDestination] = useState('Đà Nẵng')
  const [date, setDate] = useState('2026-06-01')
  const [passengers, setPassengers] = useState(1)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bus className="w-6 h-6 text-vnpay-blue" /> Tìm kiếm xe khách
        </h1>
      </div>
      <Card>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Từ</label>
            <select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Đến</label>
            <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><Calendar className="inline w-3.5 h-3.5 mr-1" />Ngày đi</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} min="2026-05-15" className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><Users className="inline w-3.5 h-3.5 mr-1" />Số khách</label>
            <input type="number" min={1} max={40} value={passengers} onChange={e => setPassengers(Number(e.target.value))} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
        <Button className="w-full" onClick={() => navigate('/bus/results')}>
          <Bus className="w-4 h-4" /> Tìm xe khách
        </Button>
      </Card>
    </div>
  )
}
