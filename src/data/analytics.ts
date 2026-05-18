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

export const agencyMonthlyData: Record<string, MonthlyGMV[]> = {
  ag1: [
    { month: '2026-01', label: 'T1/26', gmv2025: 68,  gmv2026: 89,  flight: 62, bus: 12, taxi: 8, movie: 5, hotel: 2 },
    { month: '2026-02', label: 'T2/26', gmv2025: 54,  gmv2026: 78,  flight: 53, bus: 10, taxi: 7, movie: 5, hotel: 3 },
    { month: '2026-03', label: 'T3/26', gmv2025: 82,  gmv2026: 105, flight: 74, bus: 14, taxi: 9, movie: 5, hotel: 3 },
    { month: '2026-04', label: 'T4/26', gmv2025: 91,  gmv2026: 118, flight: 84, bus: 16, taxi: 10, movie: 5, hotel: 3 },
    { month: '2026-05', label: 'T5/26', gmv2025: 44,  gmv2026: 58,  flight: 40, bus: 7,  taxi: 5,  movie: 4, hotel: 2 },
  ],
  ag2: [
    { month: '2026-01', label: 'T1/26', gmv2025: 52,  gmv2026: 69,  flight: 49, bus: 9,  taxi: 6, movie: 3, hotel: 2 },
    { month: '2026-02', label: 'T2/26', gmv2025: 41,  gmv2026: 58,  flight: 41, bus: 8,  taxi: 5, movie: 3, hotel: 1 },
    { month: '2026-03', label: 'T3/26', gmv2025: 63,  gmv2026: 82,  flight: 59, bus: 11, taxi: 7, movie: 3, hotel: 2 },
    { month: '2026-04', label: 'T4/26', gmv2025: 71,  gmv2026: 94,  flight: 67, bus: 13, taxi: 8, movie: 4, hotel: 2 },
    { month: '2026-05', label: 'T5/26', gmv2025: 35,  gmv2026: 47,  flight: 33, bus: 6,  taxi: 4, movie: 3, hotel: 1 },
  ],
  ag3: [
    { month: '2026-01', label: 'T1/26', gmv2025: 108, gmv2026: 143, flight: 112, bus: 14, taxi: 10, movie: 5, hotel: 2 },
    { month: '2026-02', label: 'T2/26', gmv2025: 92,  gmv2026: 127, flight: 98,  bus: 12, taxi: 9,  movie: 5, hotel: 3 },
    { month: '2026-03', label: 'T3/26', gmv2025: 131, gmv2026: 167, flight: 130, bus: 17, taxi: 11, movie: 6, hotel: 3 },
    { month: '2026-04', label: 'T4/26', gmv2025: 148, gmv2026: 191, flight: 149, bus: 19, taxi: 13, movie: 7, hotel: 3 },
    { month: '2026-05', label: 'T5/26', gmv2025: 75,  gmv2026: 98,  flight: 76,  bus: 10, taxi: 7,  movie: 4, hotel: 1 },
  ],
}

export const serviceBreakdown2026 = [
  { name: 'Vé máy bay', value: 4500, color: '#003b73' },
  { name: 'Vé phim', value: 430, color: '#e31e24' },
  { name: 'Xe khách', value: 380, color: '#f59e0b' },
  { name: 'Taxi', value: 230, color: '#10b981' },
  { name: 'Khách sạn', value: 149, color: '#8b5cf6' },
]
