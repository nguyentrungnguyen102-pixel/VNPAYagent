import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'
import { useAuthStore } from '../../store/authStore'
import { APP_VERSION } from '../../utils/constants'
import {
  LayoutDashboard, Plane, Bus, Car, Film, Hotel, BookOpen,
  Wallet, Receipt, BarChart2, ShieldAlert, CreditCard,
  Users, Sliders, Ticket, X, TrendingUp, AlertOctagon, Users2
} from 'lucide-react'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

interface NavItem {
  to: string
  icon: React.ElementType
  label: string
}

interface NavSection {
  title: string
  items: NavItem[]
  roles?: ('F1' | 'F2' | 'F3')[]
}

const navSections: NavSection[] = [
  {
    title: 'Tổng quan',
    items: [{ to: '/', icon: LayoutDashboard, label: 'Dashboard' }],
  },
  {
    title: 'Đặt vé',
    items: [
      { to: '/flight/search', icon: Plane, label: 'Vé máy bay' },
      { to: '/bus/search', icon: Bus, label: 'Xe khách' },
      { to: '/taxi', icon: Car, label: 'Taxi' },
      { to: '/movie', icon: Film, label: 'Vé xem phim' },
      { to: '/hotel/search', icon: Hotel, label: 'Khách sạn' },
    ],
  },
  {
    title: 'Quản lý',
    items: [
      { to: '/bookings', icon: BookOpen, label: 'Đặt chỗ của tôi' },
      { to: '/wallet', icon: Wallet, label: 'Ví điện tử' },
      { to: '/invoices/request', icon: Receipt, label: 'Hóa đơn' },
    ],
  },
  {
    title: 'Báo cáo',
    items: [
      { to: '/analytics/gmv', icon: TrendingUp, label: 'GMV Dashboard' },
    ],
  },
  {
    title: 'Admin',
    roles: ['F1'],
    items: [
      { to: '/admin/users', icon: Users2, label: 'Quản lý người dùng' },
      { to: '/admin/commission', icon: Sliders, label: 'Cấu hình hoa hồng' },
      { to: '/analytics/ranking', icon: BarChart2, label: 'Xếp hạng đại lý' },
      { to: '/admin/kill-switch', icon: ShieldAlert, label: 'Kill Switch' },
      { to: '/admin/credit', icon: CreditCard, label: 'Hạn mức tín dụng' },
      { to: '/admin/fraud', icon: AlertOctagon, label: 'Phát hiện gian lận' },
    ],
  },
  {
    title: 'Đại lý',
    roles: ['F2'],
    items: [
      { to: '/agency/users', icon: Users2, label: 'Người dùng' },
      { to: '/agency/markup', icon: Sliders, label: 'Cấu hình markup' },
      { to: '/agency/sellers', icon: Users, label: 'Quản lý CTV' },
    ],
  },
  {
    title: 'Hỗ trợ',
    items: [{ to: '/support', icon: Ticket, label: 'Ticket hỗ trợ' }],
  },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const user = useAuthStore(s => s.user)
  const role = user?.role

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        'fixed lg:relative z-30 flex flex-col w-64 h-full bg-vnpay-navy dark:bg-gray-900 text-white transition-transform duration-300',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden'
      )}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src="./vnpay-logo.png"
              alt="VNPAY"
              className="h-9 w-auto object-contain flex-shrink-0"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-xs font-semibold text-blue-200/70 whitespace-nowrap">Agent OS</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/60 hover:text-white flex-shrink-0 ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin py-3">
          {navSections.map((section) => {
            if (section.roles && role && !section.roles.includes(role)) return null
            return (
              <div key={section.title} className="mb-1">
                <p className="px-4 py-2 text-xs font-semibold text-blue-200/50 uppercase tracking-wider">{section.title}</p>
                {section.items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => cn(
                      'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors rounded-lg mx-2',
                      isActive ? 'bg-white/15 text-white font-medium' : 'text-blue-100/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )
          })}
        </nav>

        {user && (
          <div className="px-4 py-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-vnpay-blue flex items-center justify-center text-sm font-bold flex-shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-blue-200/60 truncate">{user.email}</p>
              </div>
            </div>
            <p className="text-xs text-white/25 text-center mt-2">{APP_VERSION}</p>
          </div>
        )}
      </aside>
    </>
  )
}
