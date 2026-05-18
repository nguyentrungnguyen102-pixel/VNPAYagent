import { useState } from 'react'
import Card from '../../components/ui/Card'
import { mockAgencyUsers } from '../../data/agencyUsers'
import { mockAgencies } from '../../data/agencies'
import { formatDateTime } from '../../utils/formatters'
import { Users2, Search, CheckCircle, XCircle, Shield, Eye } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { AgencyUserRole } from '../../types'

const roleConfig: Record<AgencyUserRole, { label: string; color: string }> = {
  AgencyAdmin: { label: 'Admin ĐL', color: 'bg-vnpay-blue/10 text-vnpay-blue' },
  Manager:     { label: 'Quản lý', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  Operator:    { label: 'Nhân viên', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  Viewer:      { label: 'Xem', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300' },
}

const statusConfig = {
  Active:    { label: 'Hoạt động', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
  Inactive:  { label: 'Không hoạt động', icon: XCircle, color: 'text-gray-400' },
  Suspended: { label: 'Tạm khóa', icon: Shield, color: 'text-red-600 dark:text-red-400' },
}

const permLabels: Record<string, string> = {
  canBook: 'Đặt vé', canRefund: 'Hoàn vé', canTopup: 'Nạp ví',
  canViewReports: 'Xem BC', canManageUsers: 'QL user', canConfigMarkup: 'Markup',
}

export default function UserManagementPage() {
  const [agencyFilter, setAgencyFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const f2agencies = mockAgencies.filter(a => a.role === 'F2')
  const filtered = mockAgencyUsers.filter(u => {
    if (agencyFilter !== 'all' && u.agencyId !== agencyFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false
    }
    return true
  })

  const getAgencyName = (id: string) => f2agencies.find(a => a.id === id)?.name ?? id

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users2 className="w-6 h-6 text-vnpay-blue" /> Quản lý người dùng toàn mạng
        </h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} người dùng</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tổng người dùng', value: mockAgencyUsers.length },
          { label: 'Đang hoạt động', value: mockAgencyUsers.filter(u => u.status === 'Active').length, color: 'text-green-600' },
          { label: 'Tạm khóa', value: mockAgencyUsers.filter(u => u.status === 'Suspended').length, color: 'text-red-600' },
          { label: 'Đại lý F2', value: f2agencies.length, color: 'text-vnpay-blue' },
        ].map(s => (
          <Card key={s.label} className="py-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className={cn('text-2xl font-bold mt-1', s.color ?? 'text-gray-900 dark:text-white')}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm theo tên, email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-vnpay-blue" />
        </div>
        <select value={agencyFilter} onChange={e => setAgencyFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:outline-none">
          <option value="all">Tất cả đại lý</option>
          {f2agencies.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Người dùng</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Đại lý</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Vai trò</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Quyền hạn</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Trạng thái</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap">Đăng nhập cuối</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {filtered.map(u => {
                const statusCfg = statusConfig[u.status]
                const StatusIcon = statusCfg.icon
                const roleCfg = roleConfig[u.agencyRole]
                const activePerms = Object.entries(u.permissions).filter(([, v]) => v).map(([k]) => permLabels[k] ?? k)
                const isExpanded = expandedId === u.id
                return (
                  <tr key={u.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                      <p className="text-xs text-gray-400">{u.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs whitespace-nowrap">{getAgencyName(u.agencyId)}</td>
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', roleCfg.color)}>
                        {roleCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-48">
                        {activePerms.map(p => (
                          <span key={p} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">{p}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={cn('flex items-center gap-1.5 text-xs', statusCfg.color)}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusCfg.label}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {u.lastLoginAt ? formatDateTime(u.lastLoginAt) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setExpandedId(isExpanded ? null : u.id)}
                        className="p-1.5 text-gray-400 hover:text-vnpay-blue rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
