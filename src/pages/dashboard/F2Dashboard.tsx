import { useNavigate } from 'react-router-dom'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import WalletCard from '../../components/wallet/WalletCard'
import Badge from '../../components/ui/Badge'
import { mockBookings } from '../../data/bookings'
import { mockAgencies } from '../../data/agencies'
import { formatVND, formatDateTime } from '../../utils/formatters'
import { Plane, Bus, Car, Film, Hotel, ArrowRight, TrendingUp } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const serviceIcons: Record<string, React.ElementType> = { flight: Plane, bus: Bus, taxi: Car, movie: Film, hotel: Hotel }

export default function F2Dashboard() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const myAgency = mockAgencies.find(a => a.id === user?.agencyId)
  const recentBookings = mockBookings.slice(0, 5)
  const myF3s = mockAgencies.filter(a => a.parentId === user?.agencyId)
  const thisMonthGMV = 478

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Đại lý</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{myAgency?.name} — {myAgency?.code}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WalletCard />
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">GMV Tháng 4/2026</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{thisMonthGMV} tỷ</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-green-600 dark:text-green-400">
            <TrendingUp className="w-3.5 h-3.5" />+34% vs T4/2025 (357 tỷ)
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{myAgency?.bookingCount} đơn tổng cộng</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Đội ngũ CTV</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{myF3s.length} CTV</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            GMV CTV: {formatVND(myF3s.reduce((s, a) => s + a.gmv, 0) / 1e6)}tr
          </p>
          <button onClick={() => navigate('/agency/sellers')} className="mt-2 text-xs text-vnpay-blue hover:underline flex items-center gap-1">
            Quản lý CTV <ArrowRight className="w-3 h-3" />
          </button>
        </Card>
      </div>

      {/* Quick Booking */}
      <Card>
        <CardHeader>
          <CardTitle>Đặt vé nhanh</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {[
            { label: 'Máy bay', path: '/flight/search', icon: Plane, color: 'text-vnpay-blue bg-blue-50 dark:bg-blue-900/20' },
            { label: 'Xe khách', path: '/bus/search', icon: Bus, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
            { label: 'Taxi', path: '/taxi', icon: Car, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
            { label: 'Phim', path: '/movie', icon: Film, color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
            { label: 'Khách sạn', path: '/hotel/search', icon: Hotel, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
          ].map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-vnpay-blue hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all"
            >
              <div className={`p-3 rounded-xl ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Đặt chỗ gần đây</CardTitle>
          <button onClick={() => navigate('/bookings')} className="text-xs text-vnpay-blue hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight className="w-3 h-3" />
          </button>
        </CardHeader>
        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {recentBookings.map(bk => {
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
