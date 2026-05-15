import { useWalletStore } from '../../store/walletStore'
import { formatVND } from '../../utils/formatters'
import { Wallet, TrendingUp, AlertTriangle } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function WalletCard() {
  const { wallet } = useWalletStore()
  const usable = wallet.balance + wallet.creditLimit - wallet.frozenAmount
  const pct = wallet.creditLimit > 0 ? (wallet.balance / (wallet.balance + wallet.creditLimit)) * 100 : 100
  const isLow = pct < wallet.alertThreshold

  return (
    <div className={cn('rounded-xl p-5 text-white', isLow ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-vnpay-navy to-vnpay-blue')}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 opacity-80" />
          <span className="text-sm font-medium opacity-80">Số dư khả dụng</span>
        </div>
        {isLow && <AlertTriangle className="w-4 h-4 text-amber-200" />}
      </div>
      <p className="text-2xl font-bold mb-1">{formatVND(wallet.balance)}</p>
      <p className="text-xs opacity-70 mb-4">Khả dụng (bao gồm hạn mức): {formatVND(usable)}</p>
      <div className="space-y-1">
        <div className="flex justify-between text-xs opacity-80">
          <span>Hạn mức tín dụng: {formatVND(wallet.creditLimit)}</span>
          <span>{pct.toFixed(0)}%</span>
        </div>
        <div className="bg-white/20 rounded-full h-1.5">
          <div className="bg-white rounded-full h-1.5 transition-all" style={{ width: `${Math.min(100, pct)}%` }} />
        </div>
      </div>
    </div>
  )
}
