import { useState } from 'react'
import { mockAgencies } from '../../data/agencies'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import { formatVND } from '../../utils/formatters'
import { BarChart2, TrendingUp, Trophy } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function AgencyRankingPage() {
  const [sortBy, setSortBy] = useState<'gmv' | 'bookingCount'>('gmv')
  const agencies = [...mockAgencies].filter(a => a.role === 'F2').sort((a, b) => b[sortBy] - a[sortBy])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-vnpay-blue" /> Xếp hạng đại lý
        </h1>
        <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden text-sm">
          <button onClick={() => setSortBy('gmv')} className={`px-3 py-2 ${sortBy === 'gmv' ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300'}`}>GMV</button>
          <button onClick={() => setSortBy('bookingCount')} className={`px-3 py-2 ${sortBy === 'bookingCount' ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300'}`}>Số đơn</button>
        </div>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Hạng</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Đại lý</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Thành phố</th>
                <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">GMV</th>
                <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Số đơn</th>
                <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Số dư ví</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {agencies.map((ag, i) => (
                <tr key={ag.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <span className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white',
                      i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    )}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">{ag.name}</p>
                    <p className="text-xs text-gray-400">{ag.code}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{ag.city}</td>
                  <td className="px-4 py-3 text-right font-semibold text-vnpay-blue">{formatVND(ag.gmv / 1e6)}tr</td>
                  <td className="px-4 py-3 text-right dark:text-white">{ag.bookingCount}</td>
                  <td className="px-4 py-3 text-right dark:text-white">{formatVND(ag.balance)}</td>
                  <td className="px-4 py-3">
                    {ag.loginBlocked ? (
                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full">Bị chặn</span>
                    ) : (
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">Hoạt động</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
