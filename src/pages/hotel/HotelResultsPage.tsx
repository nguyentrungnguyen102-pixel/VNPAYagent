import { useNavigate } from 'react-router-dom'
import { mockHotels } from '../../data/hotels'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import { ArrowLeft, Star, MapPin } from 'lucide-react'

export default function HotelResultsPage() {
  const navigate = useNavigate()
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Khách sạn ({mockHotels.length})</h1>
      </div>
      {mockHotels.map(hotel => (
        <Card key={hotel.id} padding={false} className="overflow-hidden hover:border-vnpay-blue transition-colors cursor-pointer" onClick={() => navigate(`/hotel/${hotel.id}`)}>
          <div className="flex">
            <img src={hotel.imageUrl} alt={hotel.name} className="w-36 h-28 object-cover flex-shrink-0" />
            <div className="p-4 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{hotel.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />{hotel.address}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: hotel.stars }).map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="bg-vnpay-blue text-white text-sm font-bold px-2 py-1 rounded">{hotel.rating}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{hotel.reviewCount} đánh giá</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map(a => <span key={a} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">{a}</span>)}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Từ</p>
                  <p className="text-lg font-bold text-vnpay-blue">{formatVND(3_200_000)}<span className="text-xs font-normal text-gray-500">/đêm</span></p>
                  <Button size="sm" className="mt-1" onClick={e => { e.stopPropagation(); navigate(`/hotel/${hotel.id}`) }}>Xem phòng</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
