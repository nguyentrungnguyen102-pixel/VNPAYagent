import { useState } from 'react'
import Card from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import { mockAgencyUsers } from '../../data/agencyUsers'
import { useAuthStore } from '../../store/authStore'
import { formatDateTime } from '../../utils/formatters'
import { Users2, Plus, CheckCircle, XCircle, Shield, Lock, Unlock, Edit2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { AgencyUser, AgencyUserRole, AgencyUserPermission } from '../../types'

const roleConfig: Record<AgencyUserRole, { label: string; color: string; perms: AgencyUserPermission }> = {
  AgencyAdmin: {
    label: 'Admin Đại lý', color: 'bg-vnpay-blue/10 text-vnpay-blue',
    perms: { canBook: true, canRefund: true, canTopup: true, canViewReports: true, canManageUsers: true, canConfigMarkup: true },
  },
  Manager: {
    label: 'Quản lý', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    perms: { canBook: true, canRefund: true, canTopup: false, canViewReports: true, canManageUsers: false, canConfigMarkup: false },
  },
  Operator: {
    label: 'Nhân viên', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    perms: { canBook: true, canRefund: false, canTopup: false, canViewReports: false, canManageUsers: false, canConfigMarkup: false },
  },
  Viewer: {
    label: 'Chỉ xem', color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    perms: { canBook: false, canRefund: false, canTopup: false, canViewReports: true, canManageUsers: false, canConfigMarkup: false },
  },
}

const permLabels: { key: keyof AgencyUserPermission; label: string; desc: string }[] = [
  { key: 'canBook', label: 'Đặt vé', desc: 'Tạo và quản lý đặt chỗ' },
  { key: 'canRefund', label: 'Hoàn vé', desc: 'Yêu cầu hoàn tiền' },
  { key: 'canTopup', label: 'Nạp ví', desc: 'Nạp tiền vào ví điện tử' },
  { key: 'canViewReports', label: 'Xem báo cáo', desc: 'Xem GMV và thống kê' },
  { key: 'canManageUsers', label: 'QL người dùng', desc: 'Thêm/sửa/khóa user' },
  { key: 'canConfigMarkup', label: 'Cấu hình markup', desc: 'Đặt phí dịch vụ' },
]

export default function AgencyUserPage() {
  const user = useAuthStore(s => s.user)
  const agencyId = user?.agencyId ?? 'ag1'
  const [users, setUsers] = useState<AgencyUser[]>(mockAgencyUsers.filter(u => u.agencyId === agencyId))
  const [editTarget, setEditTarget] = useState<AgencyUser | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newRole, setNewRole] = useState<AgencyUserRole>('Operator')

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id
      ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
      : u
    ))
  }

  const saveEdit = (updated: AgencyUser) => {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
    setEditTarget(null)
  }

  const addUser = () => {
    if (!newName || !newEmail) return
    const newUser: AgencyUser = {
      id: 'au-' + Date.now(),
      agencyId,
      name: newName,
      email: newEmail,
      phone: newPhone,
      agencyRole: newRole,
      permissions: roleConfig[newRole].perms,
      status: 'Active',
      createdAt: new Date().toISOString(),
    }
    setUsers(prev => [...prev, newUser])
    setNewName(''); setNewEmail(''); setNewPhone(''); setNewRole('Operator')
    setAddOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users2 className="w-6 h-6 text-vnpay-blue" /> Quản lý người dùng
        </h1>
        <button onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 bg-vnpay-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-vnpay-navy transition-colors">
          <Plus className="w-4 h-4" /> Thêm người dùng
        </button>
      </div>

      {/* Role guide */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(Object.entries(roleConfig) as [AgencyUserRole, typeof roleConfig[AgencyUserRole]][]).map(([role, cfg]) => (
          <Card key={role} className="py-3">
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', cfg.color)}>{cfg.label}</span>
            <div className="mt-2 space-y-0.5">
              {permLabels.map(p => (
                <p key={p.key} className={cn('text-xs', cfg.perms[p.key] ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600 line-through')}>
                  {p.label}
                </p>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* User list */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Người dùng</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Vai trò</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Quyền hạn</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold">Trạng thái</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-semibold whitespace-nowrap">Đăng nhập cuối</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {users.map(u => {
                const roleCfg = roleConfig[u.agencyRole]
                const activePerms = permLabels.filter(p => u.permissions[p.key])
                return (
                  <tr key={u.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                      <p className="text-xs text-gray-400">{u.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', roleCfg.color)}>
                        {roleCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-48">
                        {activePerms.map(p => (
                          <span key={p.key} className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded">{p.label}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {u.status === 'Active' && <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400"><CheckCircle className="w-3.5 h-3.5" />Hoạt động</div>}
                      {u.status === 'Inactive' && <div className="flex items-center gap-1.5 text-xs text-gray-400"><XCircle className="w-3.5 h-3.5" />Không HĐ</div>}
                      {u.status === 'Suspended' && <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400"><Shield className="w-3.5 h-3.5" />Tạm khóa</div>}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {u.lastLoginAt ? formatDateTime(u.lastLoginAt) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button onClick={() => setEditTarget({ ...u })}
                          className="p-1.5 text-gray-400 hover:text-vnpay-blue rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" title="Chỉnh sửa">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleStatus(u.id)}
                          className={cn('p-1.5 rounded-lg transition-colors', u.status === 'Active' ? 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : 'text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20')}
                          title={u.status === 'Active' ? 'Tạm khóa' : 'Kích hoạt'}>
                          {u.status === 'Active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Thêm người dùng mới">
        <div className="space-y-4">
          {[
            { label: 'Họ tên *', value: newName, set: setNewName, placeholder: 'Nguyễn Văn A' },
            { label: 'Email *', value: newEmail, set: setNewEmail, placeholder: 'email@agency.vn' },
            { label: 'Số điện thoại', value: newPhone, set: setNewPhone, placeholder: '0912345678' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
              <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-vnpay-blue" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vai trò</label>
            <select value={newRole} onChange={e => setNewRole(e.target.value as AgencyUserRole)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:outline-none">
              {(Object.entries(roleConfig) as [AgencyUserRole, typeof roleConfig[AgencyUserRole]][]).map(([r, c]) => (
                <option key={r} value={r}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setAddOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Huỷ</button>
            <button onClick={addUser} className="flex-1 px-4 py-2 bg-vnpay-blue text-white rounded-lg text-sm font-medium hover:bg-vnpay-navy transition-colors">Thêm</button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      {editTarget && (
        <Modal open={!!editTarget} onClose={() => setEditTarget(null)} title={`Chỉnh sửa: ${editTarget.name}`}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vai trò</label>
              <select
                value={editTarget.agencyRole}
                onChange={e => {
                  const r = e.target.value as AgencyUserRole
                  setEditTarget({ ...editTarget, agencyRole: r, permissions: roleConfig[r].perms })
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white focus:outline-none">
                {(Object.entries(roleConfig) as [AgencyUserRole, typeof roleConfig[AgencyUserRole]][]).map(([r, c]) => (
                  <option key={r} value={r}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quyền hạn chi tiết</p>
              <div className="space-y-2">
                {permLabels.map(p => (
                  <label key={p.key} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{p.label}</p>
                      <p className="text-xs text-gray-400">{p.desc}</p>
                    </div>
                    <input type="checkbox"
                      checked={editTarget.permissions[p.key]}
                      onChange={e => setEditTarget({ ...editTarget, permissions: { ...editTarget.permissions, [p.key]: e.target.checked } })}
                      className="w-4 h-4 accent-vnpay-blue" />
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setEditTarget(null)} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300">Huỷ</button>
              <button onClick={() => saveEdit(editTarget)} className="flex-1 px-4 py-2 bg-vnpay-blue text-white rounded-lg text-sm font-medium hover:bg-vnpay-navy transition-colors">Lưu</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
