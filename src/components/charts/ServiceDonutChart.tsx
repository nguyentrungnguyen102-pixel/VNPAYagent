import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { serviceBreakdown2026 } from '../../data/analytics'

interface TooltipPayload {
  name?: string
  value?: number
  payload?: { color?: string }
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg text-xs">
        <p className="font-semibold" style={{ color: payload[0]?.payload?.color }}>{payload[0]?.name}</p>
        <p className="text-gray-600 dark:text-gray-300">{payload[0]?.value} tỷ</p>
      </div>
    )
  }
  return null
}

export default function ServiceDonutChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={serviceBreakdown2026} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
          {serviceBreakdown2026.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
