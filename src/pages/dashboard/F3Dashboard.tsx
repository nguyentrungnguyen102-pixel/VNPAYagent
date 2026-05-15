import { useNavigate } from 'react-router-dom'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { mockBookings } from '../../data/bookings'
import { formatVND, formatDateTime } from '../../utils/formatters'
import { Plane, Bus, Car, Film, Hotel, ArrowRight, TrendingUp, Star } from 'lucide-react'

const serviceIcons: Record<string, React.ElementType> = { flight: Plane, bus: Bus, taxi: Car, movie: Film, hotel: Hotel }

export default function F3Dashboard() {
  const navigate = useNavigate()
  const myBookings = mockBookings.filter(b => b.agentId === 'u3')
  const totalCommission = myBookings.reduce((s, b) => s + b.commission, 0)
  const issuedCount = myBookings.filter(b => b.status === 'Issued').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard CTV</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Lê Văn Seller — TravelCo Hà Nội</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-green-100 dark:bg-green-900/30 rounded-xl">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Hoa hồng tháng này</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{formatVND(totalCommission)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Star className="w-5 h-5 text-vnpay-blue" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Đơn thành công</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{issuedCount}</p>
            </div>
          </div>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Đặt vé nhanh</p>
          <div className="flex gap-2">
            {[
              { path: '/flight/search', icon: Plane },
              { path: '/bus/search', icon: Bus },
              { path: '/taxi', icon: Car },
              { path: '/movie', icon: Film },
            ].map(item => (
              <button key={item.path} onClick={() => navigate(item.path)} className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-vnpay-blue rounded-lg hover:bg-blue-100 transition-colors">
                <item.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đặt chỗ của tôi</CardTitle>
          <button onClick={() => navigate('/bookings')} className="text-xs text-vnpay-blue hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight className="w-3 h-3" />
          </button>
        </CardHeader>
        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {myBookings.slice(0, 6).map(bk => {
            const Icon = serviceIcons[bk.serviceType] || Plane
            return (
              <div key={bk.id} onClick={() => navigate(`/bookings/${bk.id}`)} className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-lg px-2 -mx-2 transition-colors">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Icon className="w-4 h-4 text-vnpay-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{bk.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDateTime(bk.createdAt)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatVND(bk.totalAmount)}</p>
                  <Badge status={bk.status} />
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
