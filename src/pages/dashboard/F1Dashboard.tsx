import { useNavigate } from 'react-router-dom'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import GMVLineChart from '../../components/charts/GMVLineChart'
import ServiceDonutChart from '../../components/charts/ServiceDonutChart'
import Badge from '../../components/ui/Badge'
import { projections, historicalGMV } from '../../data/analytics'
import { mockAgencies } from '../../data/agencies'
import { mockFraudAlerts } from '../../data/fraudAlerts'
import { formatBillionVND, formatVND } from '../../utils/formatters'
import { TrendingUp, TrendingDown, AlertOctagon, Building2, Target, DollarSign, BarChart3, ArrowRight, ShieldAlert } from 'lucide-react'
import { cn } from '../../utils/cn'

interface KPICardProps {
  title: string
  value: string
  sub?: string
  badge?: string
  badgeColor?: 'green' | 'blue' | 'yellow' | 'red' | 'gray'
  icon: React.ElementType
  iconColor: string
  trend?: number
}

function KPICard({ title, value, sub, badge, badgeColor, icon: Icon, iconColor, trend }: KPICardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white truncate">{value}</p>
          {sub && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sub}</p>}
          {badge && (
            <span className={cn('inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-full',
              badgeColor === 'green' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
              badgeColor === 'blue' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
              badgeColor === 'yellow' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
              'bg-gray-100 text-gray-700'
            )}>{badge}</span>
          )}
        </div>
        <div className={cn('p-3 rounded-xl ml-4', iconColor)}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend !== undefined && (
        <div className={cn('flex items-center gap-1 mt-3 text-xs font-medium', trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
          {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {trend >= 0 ? '+' : ''}{trend}% so với cùng kỳ 2025
        </div>
      )}
    </Card>
  )
}

export default function F1Dashboard() {
  const navigate = useNavigate()
  const newFraudAlerts = mockFraudAlerts.filter(a => a.status === 'New')
  const top3Agencies = [...mockAgencies].filter(a => a.role === 'F2').sort((a, b) => b.gmv - a.gmv).slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Tổng quan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">VNPAY Admin — Cập nhật: 15/05/2026</p>
        </div>
        {newFraudAlerts.length > 0 && (
          <button onClick={() => navigate('/admin/fraud')} className="flex items-center gap-2 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
            <AlertOctagon className="w-4 h-4" />
            {newFraudAlerts.length} cảnh báo gian lận mới
          </button>
        )}
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="GMV 2026 KPI"
          value={formatBillionVND(projections.kpi2026.gmv)}
          sub="Mục tiêu cả năm"
          icon={Target}
          iconColor="bg-vnpay-blue/10 text-vnpay-blue"
        />
        <KPICard
          title="GMV YTD (Jan–May 15)"
          value={formatBillionVND(projections.ytdActual)}
          sub="Thực tế tích lũy"
          badge={`+${projections.yoyGrowth}% YoY`}
          badgeColor="green"
          trend={projections.yoyGrowth}
          icon={TrendingUp}
          iconColor="bg-green-100 text-green-600"
        />
        <KPICard
          title="Dự báo cả năm 2026"
          value={formatBillionVND(projections.projectedYearEnd)}
          sub="Tại tốc độ hiện tại"
          badge={`${projections.kpiAchievementPct}% KPI`}
          badgeColor="blue"
          icon={BarChart3}
          iconColor="bg-purple-100 text-purple-600"
        />
        <KPICard
          title="Lợi nhuận gộp 2026 KPI"
          value={formatBillionVND(projections.kpi2026.grossProfit)}
          sub={`Doanh thu thuần: ${formatBillionVND(projections.kpi2026.netRevenue)}`}
          icon={DollarSign}
          iconColor="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Monthly KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tháng 5 dự kiến</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{formatBillionVND(projections.projectedMonthEnd)}</p>
          <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3"/>+8.2% vs T4 ({formatBillionVND(478)})</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tốc độ tháng 5</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{projections.monthlyPace} tỷ/ngày</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">251 tỷ / 15 ngày</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Take Rate 2026</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{projections.kpi2026.takeRate}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Chi agent: {formatBillionVND(projections.kpi2026.agentPayout)}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Số đại lý hoạt động</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{mockAgencies.filter(a => a.role === 'F2').length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{mockAgencies.filter(a => a.loginBlocked).length} bị khóa</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2" padding={false}>
          <div className="p-6 pb-2">
            <CardHeader>
              <CardTitle>GMV hàng tháng 2025 vs 2026</CardTitle>
            </CardHeader>
          </div>
          <div className="px-4 pb-4">
            <GMVLineChart />
          </div>
        </Card>

        <Card padding={false}>
          <div className="p-6 pb-2">
            <CardHeader>
              <CardTitle>Cơ cấu GMV 2026 (dự báo)</CardTitle>
            </CardHeader>
          </div>
          <div className="px-4 pb-4">
            <ServiceDonutChart />
          </div>
        </Card>
      </div>

      {/* Projection Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kế hoạch tài chính 3 năm</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">Chỉ tiêu</th>
                <th className="text-right py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">2026 KPI</th>
                <th className="text-right py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">2027 KPI</th>
                <th className="text-right py-2 px-3 text-gray-500 dark:text-gray-400 font-medium">2028 KPI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {[
                ['GMV (tỷ)', projections.kpi2026.gmv, projections.kpi2027.gmv, projections.kpi2028.gmv],
                ['Doanh thu thuần (tỷ)', projections.kpi2026.netRevenue, projections.kpi2027.netRevenue, projections.kpi2028.netRevenue],
                ['Chi agent (tỷ)', projections.kpi2026.agentPayout, projections.kpi2027.agentPayout, projections.kpi2028.agentPayout],
                ['Lợi nhuận gộp (tỷ)', projections.kpi2026.grossProfit, projections.kpi2027.grossProfit, projections.kpi2028.grossProfit],
                ['Take Rate (%)', projections.kpi2026.takeRate, projections.kpi2027.takeRate, projections.kpi2028.takeRate],
              ].map(([label, v26, v27, v28]) => (
                <tr key={String(label)} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="py-2.5 px-3 font-medium text-gray-900 dark:text-white">{label}</td>
                  <td className="py-2.5 px-3 text-right text-vnpay-blue font-semibold">{v26}</td>
                  <td className="py-2.5 px-3 text-right text-gray-700 dark:text-gray-300">{v27}</td>
                  <td className="py-2.5 px-3 text-right text-gray-700 dark:text-gray-300">{v28}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top Agencies + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top đại lý theo GMV</CardTitle>
            <button onClick={() => navigate('/analytics/ranking')} className="text-xs text-vnpay-blue hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3 h-3" />
            </button>
          </CardHeader>
          <div className="space-y-3">
            {top3Agencies.map((ag, i) => (
              <div key={ag.id} className="flex items-center gap-3">
                <span className={cn('w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0',
                  i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-gray-400' : 'bg-orange-600'
                )}>{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{ag.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ag.city} · {ag.bookingCount} đơn</p>
                </div>
                <span className="text-sm font-semibold text-vnpay-blue">{formatVND(ag.gmv / 1e6)}tr</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Truy cập nhanh Admin</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Cấu hình hoa hồng', path: '/admin/commission', icon: DollarSign, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' },
              { label: 'Kill Switch', path: '/admin/kill-switch', icon: ShieldAlert, color: 'text-red-600 bg-red-50 dark:bg-red-900/20' },
              { label: 'Hạn mức tín dụng', path: '/admin/credit', icon: Building2, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
              { label: 'Phát hiện gian lận', path: '/admin/fraud', icon: AlertOctagon, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
            ].map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-vnpay-blue hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all text-left"
              >
                <div className={cn('p-2 rounded-lg', item.color)}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
