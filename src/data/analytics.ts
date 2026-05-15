export interface MonthlyGMV {
  month: string
  label: string
  gmv2025: number
  gmv2026: number
  flight: number
  bus: number
  taxi: number
  movie: number
  hotel: number
}

export const monthlyData: MonthlyGMV[] = [
  { month: '2026-01', label: 'T1/26', gmv2025: 308, gmv2026: 412, flight: 318, bus: 35, taxi: 28, movie: 22, hotel: 9 },
  { month: '2026-02', label: 'T2/26', gmv2025: 291, gmv2026: 389, flight: 299, bus: 33, taxi: 26, movie: 21, hotel: 10 },
  { month: '2026-03', label: 'T3/26', gmv2025: 330, gmv2026: 441, flight: 341, bus: 38, taxi: 30, movie: 23, hotel: 9 },
  { month: '2026-04', label: 'T4/26', gmv2025: 357, gmv2026: 478, flight: 370, bus: 41, taxi: 33, movie: 24, hotel: 10 },
  { month: '2026-05', label: 'T5/26', gmv2025: 188, gmv2026: 251, flight: 194, bus: 22, taxi: 18, movie: 12, hotel: 5 },
]

export const projections = {
  kpi2026: { gmv: 5689, netRevenue: 183, agentPayout: 44, grossProfit: 139, takeRate: 2.45 },
  kpi2027: { gmv: 7460, netRevenue: 241, agentPayout: 59, grossProfit: 182, takeRate: 2.43 },
  kpi2028: { gmv: 9814, netRevenue: 319, agentPayout: 80, grossProfit: 238, takeRate: 2.43 },
  ytdActual: 1971,
  monthlyPace: 16.7,
  projectedMonthEnd: 517,
  projectedYearEnd: 6028,
  kpiAchievementPct: 106,
  yoyGrowth: 37,
}

export const historicalGMV = [
  { year: '2024', gmv: 3200 },
  { year: '2025', gmv: 4400 },
  { year: '2026 KPI', gmv: 5689 },
  { year: '2026 Dự báo', gmv: 6028 },
]

export const serviceBreakdown2026 = [
  { name: 'Vé máy bay', value: 4500, color: '#003b73' },
  { name: 'Vé phim', value: 430, color: '#e31e24' },
  { name: 'Xe khách', value: 380, color: '#f59e0b' },
  { name: 'Taxi', value: 230, color: '#10b981' },
  { name: 'Khách sạn', value: 149, color: '#8b5cf6' },
]
