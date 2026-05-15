import { useNavigate } from 'react-router-dom'
import { useWalletStore } from '../../store/walletStore'
import WalletCard from '../../components/wallet/WalletCard'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatVND, formatDateTime } from '../../utils/formatters'
import { PlusCircle, History, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function WalletPage() {
  const navigate = useNavigate()
  const { transactions } = useWalletStore()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ví điện tử</h1>

      <WalletCard />

      <div className="grid grid-cols-2 gap-4">
        <Button size="lg" onClick={() => navigate('/wallet/topup')} className="flex items-center gap-2 justify-center">
          <PlusCircle className="w-5 h-5" /> Nạp tiền
        </Button>
        <Button size="lg" variant="secondary" onClick={() => navigate('/wallet/history')} className="flex items-center gap-2 justify-center">
          <History className="w-5 h-5" /> Lịch sử
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Giao dịch gần đây</CardTitle>
          <button onClick={() => navigate('/wallet/history')} className="text-xs text-vnpay-blue hover:underline">Xem tất cả</button>
        </CardHeader>
        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {transactions.slice(0, 5).map(tx => (
            <div key={tx.id} className="flex items-center gap-3 py-3">
              <div className={cn('p-2 rounded-lg', tx.amount > 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30')}>
                {tx.amount > 0 ? <ArrowDownLeft className="w-4 h-4 text-green-600 dark:text-green-400" /> : <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{tx.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatDateTime(tx.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className={cn('font-semibold text-sm', tx.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
                  {tx.amount > 0 ? '+' : ''}{formatVND(tx.amount)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatVND(tx.balanceAfter)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
