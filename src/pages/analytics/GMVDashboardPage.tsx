import { useState } from 'react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import GMVLineChart from '../../components/charts/GMVLineChart'
import ServiceDonutChart from '../../components/charts/ServiceDonutChart'
import { projections, historicalGMV } from '../../data/analytics'
import { formatBillionVND } from '../../utils/formatters'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

export default function GMVDashboardPage() {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly')

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
          {(['monthly', 'yearly'] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 transition-colors ${period === p ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              {p === 'monthly' ? 'Theo tháng' : 'Theo năm'}
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

      {period === 'monthly' ? (
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
      ) : (
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
    </div>
  )
}
