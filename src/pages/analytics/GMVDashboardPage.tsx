import { useState } from 'react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import GMVLineChart from '../../components/charts/GMVLineChart'
import ServiceDonutChart from '../../components/charts/ServiceDonutChart'
import { projections, historicalGMV } from '../../data/analytics'
import { mockBookings } from '../../data/bookings'
import { formatBillionVND, formatVND } from '../../utils/formatters'
import { useAuthStore } from '../../store/authStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, DollarSign } from 'lucide-react'
import type { ServiceType } from '../../types'

const serviceLabels: Record<ServiceType, string> = {
  flight: 'Máy bay', bus: 'Xe khách', taxi: 'Taxi', movie: 'Phim', hotel: 'Khách sạn',
}

function buildServiceRevenueData() {
  const services: ServiceType[] = ['flight', 'bus', 'taxi', 'movie', 'hotel']
  return services.map(svc => {
    const bks = mockBookings.filter(b => b.serviceType === svc)
    const commission = bks.reduce((s, b) => s + b.commission, 0)
    const markup = bks.reduce((s, b) => s + (b.markup ?? 0), 0)
    const gmv = bks.reduce((s, b) => s + b.totalAmount, 0)
    return { name: serviceLabels[svc], commission, markup, gmv, profit: commission + markup }
  })
}

type Tab = 'monthly' | 'yearly' | 'revenue'

export default function GMVDashboardPage() {
  const [tab, setTab] = useState<Tab>('monthly')
  const user = useAuthStore(s => s.user)
  const isF1 = user?.role === 'F1'

  const serviceData = buildServiceRevenueData()
  const totalCommission = serviceData.reduce((s, d) => s + d.commission, 0)
  const totalMarkup = serviceData.reduce((s, d) => s + d.markup, 0)
  const totalProfit = totalCommission + totalMarkup

  const tabs: { id: Tab; label: string }[] = [
    { id: 'monthly', label: 'Theo tháng' },
    { id: 'yearly', label: 'Theo năm' },
    { id: 'revenue', label: 'Hoa hồng & Markup' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-vnpay-blue" /> GMV Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Tổng giá trị giao dịch — Kế hoạch 2026–2028</p>
        </div>
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 transition-colors ${tab === t.id ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

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

      {tab === 'monthly' && (
        <>
          <Card padding={false}>
            <div className="p-6 pb-2"><CardHeader><CardTitle>GMV hàng tháng 2025 vs 2026</CardTitle></CardHeader></div>
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
          {/* Summary KPIs */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Tổng hoa hồng VNPAY', value: formatVND(totalCommission), color: 'text-green-600 dark:text-green-400', icon: DollarSign },
              { label: isF1 ? 'Tổng markup đại lý' : 'Markup của bạn', value: formatVND(totalMarkup), color: 'text-purple-600 dark:text-purple-400', icon: DollarSign },
              { label: 'Tổng lợi nhuận', value: formatVND(totalProfit), color: 'text-amber-600 dark:text-amber-400', icon: TrendingUp },
            ].map(k => (
              <Card key={k.label}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{k.label}</p>
                    <p className={`text-xl font-bold mt-1 ${k.color}`}>{k.value}</p>
                    <p className="text-xs text-gray-400 mt-1">Tháng 5/2026 (15 ngày)</p>
                  </div>
                  <k.icon className={`w-5 h-5 mt-1 ${k.color}`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Commission by service */}
          <Card padding={false}>
            <div className="p-6 pb-2">
              <CardHeader><CardTitle>Hoa hồng theo dịch vụ (VND)</CardTitle></CardHeader>
            </div>
            <div className="px-4 pb-6">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={serviceData} margin={{ top: 4, right: 16, bottom: 4, left: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : String(v)} />
                  <Tooltip formatter={(v) => [formatVND(Number(v ?? 0)), '']} />
                  <Legend />
                  <Bar dataKey="commission" name="Hoa hồng VNPAY" fill="#10b981" radius={[4, 4, 0, 0]} />
                  {isF1 && <Bar dataKey="markup" name="Markup đại lý" fill="#7c3aed" radius={[4, 4, 0, 0]} />}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Per-service breakdown table */}
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
                    {isF1 && <th className="text-right px-4 py-3 text-purple-600 dark:text-purple-400 font-semibold">Markup</th>}
                    <th className="text-right px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold">Lợi nhuận</th>
                    <th className="text-right px-4 py-3 text-gray-500 dark:text-gray-400 font-semibold">Take Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {serviceData.map(row => (
                    <tr key={row.name} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.name}</td>
                      <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{formatVND(row.gmv)}</td>
                      <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">
                        {row.commission > 0 ? `+${formatVND(row.commission)}` : '—'}
                      </td>
                      {isF1 && (
                        <td className="px-4 py-3 text-right text-purple-600 dark:text-purple-400 font-medium">
                          {row.markup > 0 ? `+${formatVND(row.markup)}` : '—'}
                        </td>
                      )}
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400 font-bold">
                        {row.profit > 0 ? `+${formatVND(row.profit)}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400 text-xs">
                        {row.gmv > 0 ? `${((row.commission / row.gmv) * 100).toFixed(2)}%` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 font-bold">
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Tổng cộng</td>
                    <td className="px-4 py-3 text-right text-gray-900 dark:text-white">{formatVND(serviceData.reduce((s, d) => s + d.gmv, 0))}</td>
                    <td className="px-4 py-3 text-right text-green-600 dark:text-green-400">{totalCommission > 0 ? `+${formatVND(totalCommission)}` : '—'}</td>
                    {isF1 && <td className="px-4 py-3 text-right text-purple-600 dark:text-purple-400">{totalMarkup > 0 ? `+${formatVND(totalMarkup)}` : '—'}</td>}
                    <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">{totalProfit > 0 ? `+${formatVND(totalProfit)}` : '—'}</td>
                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400 text-xs">—</td>
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
