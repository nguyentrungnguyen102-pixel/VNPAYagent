import { useNavigate, useParams } from 'react-router-dom'
import { mockHotels, mockRooms } from '../../data/hotels'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import { ArrowLeft, Star, MapPin, Users, Check } from 'lucide-react'

export default function HotelDetailPage() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const hotel = mockHotels.find(h => h.id === hotelId) || mockHotels[0]
  const rooms = mockRooms.filter(r => r.hotelId === hotel.id)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
      <div>
        <img src={hotel.imageUrl} alt={hotel.name} className="w-full h-48 object-cover rounded-xl mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{hotel.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex">{Array.from({ length: hotel.stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
          <span className="bg-vnpay-blue text-white text-sm font-bold px-2 py-0.5 rounded">{hotel.rating}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{hotel.reviewCount} đánh giá</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" />{hotel.address}</p>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tiện nghi</h3>
        <div className="flex flex-wrap gap-2">
          {hotel.amenities.map(a => <span key={a} className="flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg"><Check className="w-3 h-3" />{a}</span>)}
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Loại phòng</h2>
        {rooms.map(room => (
          <Card key={room.id} className={room.available ? '' : 'opacity-60'}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{room.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{room.description}</p>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{room.maxGuests} khách</span>
                  <span>{room.bedType} bed</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xl font-bold text-vnpay-blue">{formatVND(room.pricePerNight)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">/đêm</p>
                {room.available ? (
                  <Button size="sm" className="mt-2" onClick={() => navigate(`/hotel/${hotel.id}/book/${room.id}`)}>Đặt phòng</Button>
                ) : (
                  <span className="inline-block mt-2 text-xs text-red-500">Hết phòng</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
