import { useState } from 'react'
import { useWalletStore } from '../../store/walletStore'
import Card from '../../components/ui/Card'
import { formatVND, formatDateTime } from '../../utils/formatters'
import { ArrowUpRight, ArrowDownLeft, ArrowLeft } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useNavigate } from 'react-router-dom'
import type { TransactionType } from '../../types'

const typeLabels: Record<TransactionType, string> = {
  topup: 'Nạp tiền',
  booking_debit: 'Thanh toán',
  commission_credit: 'Hoa hồng',
  refund_credit: 'Hoàn vé',
  adjustment: 'Điều chỉnh',
  penalty_debit: 'Phí phạt',
}

export default function TransactionHistoryPage() {
  const navigate = useNavigate()
  const { transactions } = useWalletStore()
  const [filter, setFilter] = useState<TransactionType | 'all'>('all')
  const [page, setPage] = useState(1)
  const PER_PAGE = 10

  const filtered = transactions.filter(tx => filter === 'all' || tx.type === filter)
  const paginated = filtered.slice(0, page * PER_PAGE)

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700"><ArrowLeft className="w-5 h-5" /></button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lịch sử giao dịch</h1>
      </div>

      <select value={filter} onChange={e => setFilter(e.target.value as TransactionType | 'all')} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
        <option value="all">Tất cả loại</option>
        {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>

      <Card padding={false}>
        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {paginated.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 p-4">
              <div className={cn('p-2 rounded-lg flex-shrink-0', tx.amount > 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30')}>
                {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-green-600 dark:text-green-400" /> : <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{typeLabels[tx.type]}</span>
                  {tx.referenceId && <span className="text-xs text-gray-400 font-mono">{tx.referenceId}</span>}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200 mt-0.5 truncate">{tx.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDateTime(tx.createdAt)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={cn('font-bold text-sm', tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
                  {tx.amount > 0 ? '+' : ''}{formatVND(tx.amount)}
                </p>
                <p className="text-xs text-gray-400">{formatVND(tx.balanceAfter)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {paginated.length < filtered.length && (
        <button onClick={() => setPage(p => p + 1)} className="w-full py-3 text-sm text-vnpay-blue hover:underline">
          Tải thêm ({filtered.length - paginated.length} còn lại)
        </button>
      )}
    </div>
  )
}
