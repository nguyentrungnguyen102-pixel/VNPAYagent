import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { monthlyData, type MonthlyGMV } from '../../data/analytics'

interface TooltipPayload {
  color?: string
  name?: string
  value?: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg text-xs">
        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {p.value} tỷ</p>
        ))}
      </div>
    )
  }
  return null
}

export default function GMVLineChart({ data }: { data?: MonthlyGMV[] }) {
  const chartData = data ?? monthlyData
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${v}tỷ`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="gmv2025" name="GMV 2025" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
        <Line type="monotone" dataKey="gmv2026" name="GMV 2026" stroke="#003b73" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
