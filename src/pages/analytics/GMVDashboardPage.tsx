import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import GMVLineChart from '../../components/charts/GMVLineChart'
import ServiceDonutChart from '../../components/charts/ServiceDonutChart'
import { projections, historicalGMV, agencyMonthlyData } from '../../data/analytics'
import { mockBookings } from '../../data/bookings'
import { mockAgencies } from '../../data/agencies'
import { formatBillionVND, formatVND, formatDate } from '../../utils/formatters'
import { useAuthStore } from '../../store/authStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, DollarSign, Users2, ShoppingBag, Plane, Bus, Car, Film, Hotel, ExternalLink } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { ServiceType } from '../../types'

const serviceLabels: Record<ServiceType, string> = {
  flight: 'Máy bay', bus: 'Xe khách', taxi: 'Taxi', movie: 'Phim', hotel: 'Khách sạn',
}
const serviceIcons: Record<ServiceType, React.ElementType> = {
  flight: Plane, bus: Bus, taxi: Car, movie: Film, hotel: Hotel,
}

function buildServiceRevenue(bookings: typeof mockBookings) {
  const services: ServiceType[] = ['flight', 'bus', 'taxi', 'movie', 'hotel']
  return services.map(svc => {
    const bks = bookings.filter(b => b.serviceType === svc)
    const commission = bks.reduce((s, b) => s + b.commission, 0)
    const markup = bks.reduce((s, b) => s + (b.markup ?? 0), 0)
    const gmv = bks.reduce((s, b) => s + b.totalAmount, 0)
    return { name: serviceLabels[svc], commission, markup, gmv, profit: commission + markup }
  })
}

type Tab = 'monthly' | 'yearly' | 'revenue'

// ─── F1 Platform-wide view ────────────────────────────────────────────────────
function PlatformView() {
  const [tab, setTab] = useState<Tab>('monthly')
  const allServiceData = buildServiceRevenue(mockBookings)
  const totalCommission = allServiceData.reduce((s, d) => s + d.commission, 0)
  const totalMarkup = allServiceData.reduce((s, d) => s + d.markup, 0)
  const totalProfit = totalCommission + totalMarkup

  const tabs: { id: Tab; label: string }[] = [
    { id: 'monthly', label: 'Theo tháng' },
    { id: 'yearly', label: 'Theo năm' },
    { id: 'revenue', label: 'Hoa hồng & Markup' },
  ]

  return (
    <div className="space-y-6">
      {/* Projection KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { year: '2026', data: projections.kpi2026, color: 'text-vnpay-blue' },
          { year: '2027', data: projections.kpi2027, color: 'text-purple-600 dark:text-purple-400' },
          { year: '2028', data: projections.kpi2028, color: 'text-green-600 dark:text-green-400' },
        ].map(item => (
          <Card key={item.year}>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">{item.year} KPI</p>
            <p className={`text-2xl font-bold mt-1 ${item.color}`}>{formatBillionVND(item.data.gmv)}</p>
            <div className="space-y-1 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex justify-between"><span>Doanh thu thuần</span><span>{formatBillionVND(item.data.netRevenue)}</span></div>
              <div className="flex justify-between"><span>Lợi nhuận gộp</span><span>{formatBillionVND(item.data.grossProfit)}</span></div>
              <div className="flex justify-between"><span>Take Rate</span><span>{item.data.takeRate}%</span></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 transition-colors ${tab === t.id ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'monthly' && (
        <>
          <Card padding={false}>
            <div className="p-6 pb-2"><CardHeader><CardTitle>GMV hàng tháng 2025 vs 2026 — Toàn mạng</CardTitle></CardHeader></div>
            <div className="px-4 pb-4"><GMVLineChart /></div>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card padding={false}>
              <div className="p-6 pb-2"><CardHeader><CardTitle>Cơ cấu dịch vụ 2026</CardTitle></CardHeader></div>
              <div className="px-4 pb-4"><ServiceDonutChart /></div>
            </Card>
            <Card>
              <CardHeader><CardTitle>Tóm tắt tháng 5</CardTitle></CardHeader>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">GMV đã thực hiện (15 ngày)</span><span className="font-bold dark:text-white">251 tỷ</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Tốc độ hàng ngày</span><span className="font-bold dark:text-white">16.7 tỷ/ngày</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Dự báo cuối tháng</span><span className="font-bold text-vnpay-blue">517 tỷ</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">So với tháng 4</span><span className="font-bold text-green-600">+8.2%</span></div>
                <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">YoY (vs T5/2025)</span><span className="font-bold text-green-600">+175%</span></div>
              </div>
            </Card>
          </div>
        </>
      )}

      {tab === 'yearly' && (
        <Card padding={false}>
          <div className="p-6 pb-2"><CardHeader><CardTitle>GMV lịch sử & kế hoạch (tỷ VND)</CardTitle></CardHeader></div>
          <div className="px-4 pb-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={historicalGMV}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${v}tỷ`} />
                <Tooltip formatter={(v) => [`${v} tỷ`, 'GMV']} />
                <Bar dataKey="gmv" fill="#003b73" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {tab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Tổng hoa hồng VNPAY', value: formatVND(totalCommission), color: 'text-green-600 dark:text-green-400' },
              { label: 'Tổng markup đại lý', value: formatVND(totalMarkup), color: 'text-purple-600 dark:text-purple-400' },
              { label: 'Tổng lợi nhuận', value: formatVND(totalProfit), color: 'text-amber-600 dark:text-amber-400' },
            ].map(k => (
              <Card key={k.label}>
                <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
                <p className={`text-xl font-bold mt-1 ${k.color}`}>{k.value}</p>
                <p className="text-xs text-gray-400 mt-1">Tháng 5/2026 (15 ngày)</p>
              </Card>
            ))}
          </div>
          <Card padding={false}>
            <div className="p-6 pb-2"><CardHeader><CardTitle>Hoa hồng & Markup theo dịch vụ</CardTitle></CardHeader></div>
            <div className="px-4 pb-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={allServiceData} margin={{ top: 4, right: 16, bottom: 4, left: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)} />
                  <Tooltip formatter={(v) => [formatVND(Number(v ?? 0)), '']} />
                  <Legend />
                  <Bar dataKey="commission" name="Hoa hồng VNPAY" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="markup" name="Markup đại lý" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card padding={false}>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Chi tiết theo dịch vụ</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Dịch vụ</th>
                    <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">GMV</th>
                    <th className="text-right px-4 py-3 text-green-600 dark:text-green-400 font-semibold">Hoa hồng</th>
                    <th className="text-right px-4 py-3 text-purple-600 dark:text-purple-400 font-semibold">Markup</th>
                    <th className="text-right px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold">Lợi nhuận</th>
                    <th className="text-right px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold">Take Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {allServiceData.map(row => (
                    <tr key={row.name} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.name}</td>
                      <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{formatVND(row.gmv)}</td>
                      <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">{row.commission > 0 ? `+${formatVND(row.commission)}` : '—'}</td>
                      <td className="px-4 py-3 text-right text-purple-600 dark:text-purple-400 font-medium">{row.markup > 0 ? `+${formatVND(row.markup)}` : '—'}</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400 font-bold">{row.profit > 0 ? `+${formatVND(row.profit)}` : '—'}</td>
                      <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400 text-xs">{row.gmv > 0 ? `${((row.commission / row.gmv) * 100).toFixed(2)}%` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 font-bold">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Tổng cộng</td>
                    <td className="px-4 py-3 text-right text-gray-900 dark:text-white">{formatVND(allServiceData.reduce((s, d) => s + d.gmv, 0))}</td>
                    <td className="px-4 py-3 text-right text-green-600 dark:text-green-400">{totalCommission > 0 ? `+${formatVND(totalCommission)}` : '—'}</td>
                    <td className="px-4 py-3 text-right text-purple-600 dark:text-purple-400">{totalMarkup > 0 ? `+${formatVND(totalMarkup)}` : '—'}</td>
                    <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">{totalProfit > 0 ? `+${formatVND(totalProfit)}` : '—'}</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// ─── F2 Agency view ───────────────────────────────────────────────────────────
function AgencyView({ agencyId }: { agencyId: string }) {
  const [tab, setTab] = useState<Tab>('monthly')
  const agency = mockAgencies.find(a => a.id === agencyId)
  const subAgencies = mockAgencies.filter(a => a.parentId === agencyId)
  const myBookings = mockBookings.filter(b => b.agencyId === agencyId)
  const myMonthlyData = agencyMonthlyData[agencyId]

  const myCommission = myBookings.reduce((s, b) => s + b.commission, 0)
  const myMarkup = myBookings.reduce((s, b) => s + (b.markup ?? 0), 0)
  const myProfit = myCommission + myMarkup
  const serviceData = buildServiceRevenue(myBookings)

  const tabs: { id: Tab; label: string }[] = [
    { id: 'monthly', label: 'Theo tháng' },
    { id: 'revenue', label: 'Hoa hồng & Markup' },
  ]

  return (
    <div className="space-y-6">
      {/* Agency KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Tổng GMV đại lý', value: formatVND(agency?.gmv ?? 0), color: 'text-vnpay-blue', icon: TrendingUp },
          { label: 'Hoa hồng & Markup', value: formatVND(myProfit), color: 'text-green-600 dark:text-green-400', icon: DollarSign },
          { label: 'Số CTV/F3', value: String(subAgencies.length), color: 'text-purple-600 dark:text-purple-400', icon: Users2 },
          { label: 'Tổng đơn đặt', value: String(agency?.bookingCount ?? 0), color: 'text-amber-600 dark:text-amber-400', icon: ShoppingBag },
        ].map(k => (
          <Card key={k.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
                <p className={cn('text-xl font-bold mt-1', k.color)}>{k.value}</p>
                <p className="text-xs text-gray-400 mt-1">T5/2026</p>
              </div>
              <k.icon className={cn('w-5 h-5 mt-1', k.color)} />
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 transition-colors ${tab === t.id ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'monthly' && myMonthlyData && (
        <Card padding={false}>
          <div className="p-6 pb-2">
            <CardHeader><CardTitle>GMV tháng — {agency?.name}</CardTitle></CardHeader>
          </div>
          <div className="px-4 pb-4">
            <GMVLineChart data={myMonthlyData} />
          </div>
        </Card>
      )}

      {tab === 'revenue' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Hoa hồng tháng 5', value: formatVND(myCommission), color: 'text-green-600 dark:text-green-400' },
              { label: 'Markup thu từ KH', value: formatVND(myMarkup), color: 'text-purple-600 dark:text-purple-400' },
              { label: 'Tổng lợi nhuận', value: formatVND(myProfit), color: 'text-amber-600 dark:text-amber-400' },
            ].map(k => (
              <Card key={k.label}>
                <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
                <p className={cn('text-xl font-bold mt-1', k.color)}>{k.value}</p>
              </Card>
            ))}
          </div>
          <Card padding={false}>
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Hoa hồng theo dịch vụ</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Dịch vụ</th>
                    <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">GMV</th>
                    <th className="text-right px-4 py-3 text-green-600 dark:text-green-400 font-semibold">Hoa hồng</th>
                    <th className="text-right px-4 py-3 text-purple-600 dark:text-purple-400 font-semibold">Markup</th>
                    <th className="text-right px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold">Lợi nhuận</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {serviceData.filter(r => r.gmv > 0).map(row => (
                    <tr key={row.name} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.name}</td>
                      <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{formatVND(row.gmv)}</td>
                      <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">{row.commission > 0 ? `+${formatVND(row.commission)}` : '—'}</td>
                      <td className="px-4 py-3 text-right text-purple-600 dark:text-purple-400 font-medium">{row.markup > 0 ? `+${formatVND(row.markup)}` : '—'}</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400 font-bold">{row.profit > 0 ? `+${formatVND(row.profit)}` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Sub-agents section */}
      {subAgencies.length > 0 && (
        <Card padding={false}>
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
            <Users2 className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">CTV/F3 của tôi ({subAgencies.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Tên CTV</th>
                  <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Thành phố</th>
                  <th className="text-right px-4 py-3 text-vnpay-blue font-semibold">GMV</th>
                  <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Số đơn</th>
                  <th className="text-right px-4 py-3 text-green-600 dark:text-green-400 font-semibold">Hoa hồng ước tính</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {subAgencies.map(sa => (
                  <tr key={sa.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white">{sa.name}</p>
                      <p className="text-xs text-gray-400">{sa.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">{sa.city}</td>
                    <td className="px-4 py-3 text-right font-semibold text-vnpay-blue">{formatVND(sa.gmv)}</td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{sa.bookingCount}</td>
                    <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">
                      +{formatVND(Math.round(sa.gmv * 0.003))}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 font-bold">
                  <td colSpan={2} className="px-4 py-3 text-gray-700 dark:text-gray-200">Tổng CTV</td>
                  <td className="px-4 py-3 text-right text-vnpay-blue">{formatVND(subAgencies.reduce((s, a) => s + a.gmv, 0))}</td>
                  <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{subAgencies.reduce((s, a) => s + a.bookingCount, 0)}</td>
                  <td className="px-4 py-3 text-right text-green-600 dark:text-green-400">
                    +{formatVND(subAgencies.reduce((s, a) => s + Math.round(a.gmv * 0.003), 0))}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── F3 Seller view ───────────────────────────────────────────────────────────
function SellerView({ agentId }: { agentId: string }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState<'bookings' | 'revenue'>('bookings')
  const myBookings = mockBookings.filter(b => b.agentId === agentId)

  const myGMV = myBookings.reduce((s, b) => s + b.totalAmount, 0)
  const myCommission = myBookings.reduce((s, b) => s + b.commission, 0)
  const serviceData = buildServiceRevenue(myBookings)

  const tabs = [
    { id: 'bookings' as const, label: 'Đặt chỗ của tôi' },
    { id: 'revenue' as const, label: 'Hoa hồng' },
  ]

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'GMV cá nhân', value: formatVND(myGMV), color: 'text-vnpay-blue', icon: TrendingUp },
          { label: 'Hoa hồng kiếm được', value: formatVND(myCommission), color: 'text-green-600 dark:text-green-400', icon: DollarSign },
          { label: 'Số đơn đặt', value: String(myBookings.length), color: 'text-amber-600 dark:text-amber-400', icon: ShoppingBag },
        ].map(k => (
          <Card key={k.label}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
                <p className={cn('text-xl font-bold mt-1', k.color)}>{k.value}</p>
                <p className="text-xs text-gray-400 mt-1">T5/2026</p>
              </div>
              <k.icon className={cn('w-5 h-5 mt-1', k.color)} />
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 transition-colors ${tab === t.id ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'bookings' && (
        <Card padding={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Dịch vụ</th>
                  <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Mô tả</th>
                  <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Ngày</th>
                  <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Trạng thái</th>
                  <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Tổng tiền</th>
                  <th className="text-right px-4 py-3 text-green-600 dark:text-green-400 font-semibold">Hoa hồng</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {myBookings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">Chưa có đặt chỗ nào</td>
                  </tr>
                )}
                {myBookings.map(bk => {
                  const Icon = serviceIcons[bk.serviceType]
                  return (
                    <tr key={bk.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Icon className="w-4 h-4 text-vnpay-blue" />
                          <span className="text-gray-700 dark:text-gray-300">{serviceLabels[bk.serviceType]}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-52">
                        <p className="text-gray-600 dark:text-gray-400 truncate">{bk.description}</p>
                        {bk.pnr && <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded">{bk.pnr}</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">{formatDate(bk.createdAt)}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><Badge status={bk.status} /></td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white whitespace-nowrap">{formatVND(bk.totalAmount)}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {bk.commission > 0
                          ? <span className="text-green-600 dark:text-green-400 font-medium">+{formatVND(bk.commission)}</span>
                          : <span className="text-gray-300 dark:text-gray-600">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => navigate(`/bookings/${bk.id}`)}
                          className="p-1.5 text-gray-400 hover:text-vnpay-blue rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              {myBookings.length > 0 && (
                <tfoot>
                  <tr className="border-t-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 font-bold">
                    <td colSpan={4} className="px-4 py-3 text-gray-700 dark:text-gray-200">Tổng ({myBookings.length} đơn)</td>
                    <td className="px-4 py-3 text-right text-gray-900 dark:text-white">{formatVND(myGMV)}</td>
                    <td className="px-4 py-3 text-right text-green-600 dark:text-green-400">{myCommission > 0 ? `+${formatVND(myCommission)}` : '—'}</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </Card>
      )}

      {tab === 'revenue' && (
        <Card padding={false}>
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Hoa hồng theo dịch vụ</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Dịch vụ</th>
                  <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Số đơn</th>
                  <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">GMV</th>
                  <th className="text-right px-4 py-3 text-green-600 dark:text-green-400 font-semibold">Hoa hồng</th>
                  <th className="text-right px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold">Tỷ lệ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {serviceData.filter(r => r.gmv > 0).map(row => {
                  const count = myBookings.filter(b => serviceLabels[b.serviceType] === row.name).length
                  return (
                    <tr key={row.name} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.name}</td>
                      <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{count}</td>
                      <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{formatVND(row.gmv)}</td>
                      <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">{row.commission > 0 ? `+${formatVND(row.commission)}` : '—'}</td>
                      <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400 text-xs">{row.gmv > 0 ? `${((row.commission / row.gmv) * 100).toFixed(2)}%` : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function GMVDashboardPage() {
  const user = useAuthStore(s => s.user)

  const title = user?.role === 'F1'
    ? 'GMV Dashboard — Toàn mạng'
    : user?.role === 'F2'
    ? 'GMV Dashboard — Đại lý của tôi'
    : 'Thống kê cá nhân'

  const subtitle = user?.role === 'F1'
    ? 'Tổng giá trị giao dịch — Kế hoạch 2026–2028'
    : user?.role === 'F2'
    ? 'Doanh số và hoa hồng đại lý + CTV bên dưới'
    : 'Hoa hồng và đơn đặt của bạn'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-vnpay-blue" /> {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
      </div>

      {user?.role === 'F1' && <PlatformView />}
      {user?.role === 'F2' && <AgencyView agencyId={user.agencyId ?? 'ag1'} />}
      {user?.role === 'F3' && <SellerView agentId={user.id} />}
    </div>
  )
}
