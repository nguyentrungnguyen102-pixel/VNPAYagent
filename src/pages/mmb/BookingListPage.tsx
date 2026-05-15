import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockBookings } from '../../data/bookings'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { formatVND, formatDateTime } from '../../utils/formatters'
import { useAuthStore } from '../../store/authStore'
import { Plane, Bus, Car, Film, Hotel, Search, Filter } from 'lucide-react'
import type { BookingStatus, ServiceType } from '../../types'

const serviceIcons: Record<ServiceType, React.ElementType> = { flight: Plane, bus: Bus, taxi: Car, movie: Film, hotel: Hotel }
const serviceLabels: Record<ServiceType, string> = { flight: 'Máy bay', bus: 'Xe khách', taxi: 'Taxi', movie: 'Phim', hotel: 'Khách sạn' }

export default function BookingListPage() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
  const [serviceFilter, setServiceFilter] = useState<ServiceType | 'all'>('all')

  const filtered = mockBookings.filter(bk => {
    if (user?.role === 'F3' && bk.agentId !== user.id) return false
    if (statusFilter !== 'all' && bk.status !== statusFilter) return false
    if (serviceFilter !== 'all' && bk.serviceType !== serviceFilter) return false
    if (search && !bk.id.toLowerCase().includes(search.toLowerCase()) && !bk.description.toLowerCase().includes(search.toLowerCase()) && !(bk.pnr?.toLowerCase().includes(search.toLowerCase()))) return false
    return true
  })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Đặt chỗ của tôi</h1>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo PNR, mô tả..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-vnpay-blue"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as BookingStatus | 'all')} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
          <option value="all">Tất cả trạng thái</option>
          <option value="Hold">Giữ chỗ</option>
          <option value="Issued">Đã xuất vé</option>
          <option value="PendingApproval">Chờ duyệt</option>
          <option value="RefundPending">Chờ hoàn</option>
          <option value="Refunded">Đã hoàn</option>
          <option value="Cancelled">Đã huỷ</option>
        </select>
        <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value as ServiceType | 'all')} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
          <option value="all">Tất cả dịch vụ</option>
          <option value="flight">Máy bay</option>
          <option value="bus">Xe khách</option>
          <option value="taxi">Taxi</option>
          <option value="movie">Phim</option>
          <option value="hotel">Khách sạn</option>
        </select>
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} đơn</div>

      <div className="space-y-2">
        {filtered.map(bk => {
          const Icon = serviceIcons[bk.serviceType]
          return (
            <Card key={bk.id} padding={false} className="hover:border-vnpay-blue transition-colors cursor-pointer" onClick={() => navigate(`/bookings/${bk.id}`)}>
              <div className="flex items-center gap-3 p-4">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex-shrink-0">
                  <Icon className="w-5 h-5 text-vnpay-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{bk.id}</span>
                    {bk.pnr && <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">{bk.pnr}</span>}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{bk.description}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{serviceLabels[bk.serviceType]} · {formatDateTime(bk.createdAt)}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900 dark:text-white">{formatVND(bk.totalAmount)}</p>
                  <Badge status={bk.status} className="mt-1" />
                  {bk.commission > 0 && <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">+{formatVND(bk.commission)}</p>}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
