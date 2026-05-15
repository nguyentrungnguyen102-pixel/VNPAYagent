import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Plane, ArrowLeftRight, Users, Calendar } from 'lucide-react'

const AIRPORTS = [
  { code: 'HAN', city: 'Hà Nội', name: 'Nội Bài' },
  { code: 'SGN', city: 'TP.HCM', name: 'Tân Sơn Nhất' },
  { code: 'DAD', city: 'Đà Nẵng', name: 'Đà Nẵng' },
  { code: 'CXR', city: 'Nha Trang', name: 'Cam Ranh' },
  { code: 'VCA', city: 'Cần Thơ', name: 'Cần Thơ' },
  { code: 'PQC', city: 'Phú Quốc', name: 'Phú Quốc' },
  { code: 'HUI', city: 'Huế', name: 'Phú Bài' },
  { code: 'VII', city: 'Vinh', name: 'Vinh' },
  { code: 'NRT', city: 'Tokyo', name: 'Narita' },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi' },
  { code: 'SIN', city: 'Singapore', name: 'Changi' },
]

export default function FlightSearchPage() {
  const navigate = useNavigate()
  const [origin, setOrigin] = useState('HAN')
  const [destination, setDestination] = useState('SGN')
  const [date, setDate] = useState('2026-06-01')
  const [passengers, setPassengers] = useState(1)
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway')

  const swap = () => {
    const tmp = origin
    setOrigin(destination)
    setDestination(tmp)
  }

  const handleSearch = () => {
    navigate(`/flight/results?from=${origin}&to=${destination}&date=${date}&pax=${passengers}`)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Plane className="w-6 h-6 text-vnpay-blue" /> Tìm kiếm vé máy bay
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Nội địa và quốc tế</p>
      </div>

      <Card>
        <div className="flex gap-4 mb-6">
          {(['oneway', 'roundtrip'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTripType(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tripType === t ? 'bg-vnpay-blue text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
            >
              {t === 'oneway' ? 'Một chiều' : 'Khứ hồi'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-2 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Từ</label>
            <select
              value={origin}
              onChange={e => setOrigin(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-vnpay-blue dark:bg-gray-700 dark:text-white"
            >
              {AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.code} – {a.city}</option>)}
            </select>
          </div>
          <button onClick={swap} className="mb-0.5 p-2.5 text-vnpay-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
            <ArrowLeftRight className="w-5 h-5" />
          </button>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Đến</label>
            <select
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-vnpay-blue dark:bg-gray-700 dark:text-white"
            >
              {AIRPORTS.map(a => <option key={a.code} value={a.code}>{a.code} – {a.city}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Ngày đi</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              min="2026-05-15"
              className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-vnpay-blue dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Hành khách</span>
            </label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <button onClick={() => setPassengers(p => Math.max(1, p - 1))} className="px-3 py-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 text-lg leading-none">−</button>
              <span className="flex-1 text-center text-sm font-medium dark:text-white">{passengers}</span>
              <button onClick={() => setPassengers(p => Math.min(9, p + 1))} className="px-3 py-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 text-lg leading-none">+</button>
            </div>
          </div>
        </div>

        <Button onClick={handleSearch} className="w-full" size="lg">
          <Plane className="w-4 h-4" /> Tìm chuyến bay
        </Button>
      </Card>

      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { label: 'Nội địa', desc: 'Hoa hồng 0.2%' },
          { label: 'Quốc tế', desc: 'Hoa hồng 0.1%' },
          { label: 'Giữ chỗ', desc: 'Tối đa 24h' },
        ].map(item => (
          <div key={item.label} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
            <p className="text-sm font-semibold text-vnpay-blue">{item.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
