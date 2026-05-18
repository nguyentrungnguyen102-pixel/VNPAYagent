import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Hotel } from 'lucide-react'

const CITIES = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Đà Lạt', 'Hội An', 'Nha Trang', 'Phú Quốc']

export default function HotelSearchPage() {
  const navigate = useNavigate()
  const [city, setCity] = useState('Hà Nội')
  const [checkin, setCheckin] = useState('2026-06-01')
  const [checkout, setCheckout] = useState('2026-06-03')
  const [guests, setGuests] = useState(2)

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Hotel className="w-6 h-6 text-vnpay-blue" /> Tìm kiếm khách sạn
      </h1>
      <Card>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Thành phố</label>
            <select value={city} onChange={e => setCity(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nhận phòng</label>
            <input type="date" value={checkin} onChange={e => setCheckin(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trả phòng</label>
            <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Số khách</label>
            <input type="number" min={1} max={10} value={guests} onChange={e => setGuests(Number(e.target.value))} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Số đêm</label>
            <input readOnly value={Math.max(1, Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / 86400000))} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
        <Button className="w-full mt-4" onClick={() => navigate('/hotel/results')}>
          <Hotel className="w-4 h-4" /> Tìm khách sạn
        </Button>
      </Card>
    </div>
  )
}
