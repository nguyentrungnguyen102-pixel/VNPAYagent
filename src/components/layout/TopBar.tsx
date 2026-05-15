import { Menu, Sun, Moon, LogOut, Wallet, AlertTriangle } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'
import { useWalletStore } from '../../store/walletStore'
import { formatVND } from '../../utils/formatters'
import { cn } from '../../utils/cn'
import { useNavigate } from 'react-router-dom'

interface TopBarProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

const roleConfig = {
  F1: { label: 'Admin', color: 'bg-vnpay-blue text-white' },
  F2: { label: 'Đại lý', color: 'bg-emerald-600 text-white' },
  F3: { label: 'CTV', color: 'bg-orange-500 text-white' },
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const { theme, toggle } = useThemeStore()
  const { wallet } = useWalletStore()
  const navigate = useNavigate()

  const pct = wallet.creditLimit > 0 ? (wallet.balance / (wallet.balance + wallet.creditLimit)) * 100 : 100
  const isLow = pct < wallet.alertThreshold

  const roleCfg = user ? roleConfig[user.role] : null

  return (
    <header className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-3 flex-shrink-0">
      <button onClick={onMenuClick} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1" />

      {isLow && (
        <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg px-3 py-1.5 text-xs text-amber-700 dark:text-amber-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          Số dư ví thấp
        </div>
      )}

      <button
        onClick={() => navigate('/wallet')}
        className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-vnpay-blue dark:hover:text-blue-400 transition-colors"
      >
        <Wallet className="w-4 h-4" />
        <span className="font-medium">{formatVND(wallet.balance)}</span>
      </button>

      <button
        onClick={toggle}
        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {roleCfg && user && (
        <span className={cn('hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold', roleCfg.color)}>
          {roleCfg.label}
        </span>
      )}

      {user && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-vnpay-blue flex items-center justify-center text-sm font-bold text-white">
            {user.name.charAt(0)}
          </div>
          <button
            onClick={() => { logout(); navigate('/login') }}
            className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  )
}
