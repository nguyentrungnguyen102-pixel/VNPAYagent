import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockBookings } from '../../data/bookings'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { formatVND, formatDate } from '../../utils/formatters'
import { useAuthStore } from '../../store/authStore'
import { Plane, Bus, Car, Film, Hotel, Search, ExternalLink } from 'lucide-react'
import type { BookingStatus, ServiceType } from '../../types'
import { cn } from '../../utils/cn'
import { mockAgencies } from '../../data/agencies'

const serviceIcons: Record<ServiceType, React.ElementType> = { flight: Plane, bus: Bus, taxi: Car, movie: Film, hotel: Hotel }
const serviceLabels: Record<ServiceType, string> = { flight: 'Máy bay', bus: 'Xe khách', taxi: 'Taxi', movie: 'Phim', hotel: 'Khách sạn' }

export default function BookingListPage() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const isF1 = user?.role === 'F1'
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
  const [serviceFilter, setServiceFilter] = useState<ServiceType | 'all'>('all')

  const filtered = mockBookings.filter(bk => {
    if (user?.role === 'F3' && bk.agentId !== user.id) return false
    if (statusFilter !== 'all' && bk.status !== statusFilter) return false
    if (serviceFilter !== 'all' && bk.serviceType !== serviceFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!bk.id.toLowerCase().includes(q) && !bk.description.toLowerCase().includes(q) && !(bk.pnr?.toLowerCase().includes(q))) return false
    }
    return true
  })

  const totalMarkup = filtered.reduce((s, b) => s + (b.markup ?? 0), 0)
  const totalCommission = filtered.reduce((s, b) => s + b.commission, 0)
  const totalProfit = totalMarkup + totalCommission
  const totalGMV = filtered.reduce((s, b) => s + b.totalAmount, 0)

  const getAgencyName = (agencyId?: string) => {
    if (!agencyId) return '—'
    return mockAgencies.find(a => a.id === agencyId)?.name ?? agencyId
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản lý đặt chỗ</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} đơn</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo PNR, mô tả..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-vnpay-blue focus:outline-none"
          />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as BookingStatus | 'all')} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:outline-none">
          <option value="all">Tất cả trạng thái</option>
          <option value="Hold">Giữ chỗ</option>
          <option value="Issued">Đã xuất vé</option>
          <option value="PendingApproval">Chờ duyệt</option>
          <option value="RefundPending">Chờ hoàn</option>
          <option value="Refunded">Đã hoàn</option>
          <option value="Cancelled">Đã huỷ</option>
        </select>
        <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value as ServiceType | 'all')} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:outline-none">
          <option value="all">Tất cả dịch vụ</option>
          <option value="flight">Máy bay</option>
          <option value="bus">Xe khách</option>
          <option value="taxi">Taxi</option>
          <option value="movie">Phim</option>
          <option value="hotel">Khách sạn</option>
        </select>
      </div>

      {/* Summary KPI bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tổng GMV', value: formatVND(totalGMV), color: 'text-vnpay-blue' },
          { label: 'Tổng Markup', value: formatVND(totalMarkup), color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Tổng Hoa hồng', value: formatVND(totalCommission), color: 'text-green-600 dark:text-green-400' },
          { label: 'Tổng lợi nhuận', value: formatVND(totalProfit), color: 'text-amber-600 dark:text-amber-400' },
        ].map(k => (
          <Card key={k.label} className="py-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
            <p className={cn('text-lg font-bold mt-0.5', k.color)}>{k.value}</p>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">#</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap">Mã đặt / PNR</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap">Dịch vụ</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Mô tả</th>
                {isF1 && <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap">Đại lý</th>}
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap">Ngày tạo</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap">Trạng thái</th>
                <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap">Tổng tiền</th>
                <th className="text-right px-4 py-3 text-purple-600 dark:text-purple-400 font-semibold whitespace-nowrap">Markup</th>
                <th className="text-right px-4 py-3 text-green-600 dark:text-green-400 font-semibold whitespace-nowrap">Hoa hồng</th>
                <th className="text-right px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold whitespace-nowrap">Lợi nhuận</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filtered.map((bk, idx) => {
                const Icon = serviceIcons[bk.serviceType]
                const profit = (bk.markup ?? 0) + bk.commission
                return (
                  <tr key={bk.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-900/10 transition-colors">
                    <td className="px-4 py-3 text-gray-400 dark:text-gray-500 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <p className="font-semibold text-gray-900 dark:text-white">{bk.id}</p>
                      {bk.pnr && <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded mt-0.5 inline-block">{bk.pnr}</span>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Icon className="w-4 h-4 text-vnpay-blue flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{serviceLabels[bk.serviceType]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-52">
                      <p className="text-gray-600 dark:text-gray-400 truncate">{bk.description}</p>
                    </td>
                    {isF1 && <td className="px-4 py-3 whitespace-nowrap text-gray-600 dark:text-gray-400 text-xs">{getAgencyName(bk.agencyId)}</td>}
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">{formatDate(bk.createdAt)}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><Badge status={bk.status} /></td>
                    <td className="px-4 py-3 text-right whitespace-nowrap font-semibold text-gray-900 dark:text-white">{formatVND(bk.totalAmount)}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {(bk.markup ?? 0) > 0
                        ? <span className="text-purple-600 dark:text-purple-400 font-medium">+{formatVND(bk.markup!)}</span>
                        : <span className="text-gray-300 dark:text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {bk.commission > 0
                        ? <span className="text-green-600 dark:text-green-400 font-medium">+{formatVND(bk.commission)}</span>
                        : <span className="text-gray-300 dark:text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {profit > 0
                        ? <span className="text-amber-600 dark:text-amber-400 font-bold">+{formatVND(profit)}</span>
                        : <span className="text-gray-300 dark:text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/bookings/${bk.id}`)}
                        className="p-1.5 text-gray-400 hover:text-vnpay-blue rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 font-bold">
                <td colSpan={isF1 ? 7 : 6} className="px-4 py-3 text-gray-700 dark:text-gray-200 text-sm">
                  Tổng cộng ({filtered.length} đơn)
                </td>
                <td className="px-4 py-3 text-right text-gray-900 dark:text-white whitespace-nowrap">{formatVND(totalGMV)}</td>
                <td className="px-4 py-3 text-right text-purple-600 dark:text-purple-400 whitespace-nowrap">{totalMarkup > 0 ? `+${formatVND(totalMarkup)}` : '—'}</td>
                <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 whitespace-nowrap">{totalCommission > 0 ? `+${formatVND(totalCommission)}` : '—'}</td>
                <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400 whitespace-nowrap">{totalProfit > 0 ? `+${formatVND(totalProfit)}` : '—'}</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  )
}
