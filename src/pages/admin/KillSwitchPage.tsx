import { useState } from 'react'
import { mockAgencies } from '../../data/agencies'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import type { Agency } from '../../types'
import { ShieldAlert, Building2, AlertTriangle, Lock, Unlock } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function KillSwitchPage() {
  const [agencies, setAgencies] = useState(mockAgencies.filter(a => a.role === 'F2'))
  const [confirmModal, setConfirmModal] = useState<{ agency: Agency; field: 'loginBlocked' | 'walletBlocked'; newVal: boolean } | null>(null)

  const handleToggle = (agency: Agency, field: 'loginBlocked' | 'walletBlocked') => {
    const newVal = !agency[field]
    setConfirmModal({ agency, field, newVal })
  }

  const confirmToggle = () => {
    if (!confirmModal) return
    setAgencies(prev => prev.map(a => a.id === confirmModal.agency.id ? { ...a, [confirmModal.field]: confirmModal.newVal } : a))
    setConfirmModal(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-vnpay-red" /> Kill Switch
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Chặn đăng nhập / giao dịch ví theo đại lý</p>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Đại lý</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Thành phố</th>
                <th className="text-center px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Chặn Đăng nhập</th>
                <th className="text-center px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Chặn Ví</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {agencies.map(agency => (
                <tr key={agency.id} className={cn('hover:bg-gray-50 dark:hover:bg-gray-700/30', (agency.loginBlocked || agency.walletBlocked) && 'bg-red-50/50 dark:bg-red-900/10')}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{agency.name}</p>
                        <p className="text-xs text-gray-400">{agency.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{agency.city}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(agency, 'loginBlocked')}
                      className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all', agency.loginBlocked ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200')}
                    >
                      {agency.loginBlocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      {agency.loginBlocked ? 'Đang chặn' : 'Bình thường'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(agency, 'walletBlocked')}
                      className={cn('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all', agency.walletBlocked ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200')}
                    >
                      {agency.walletBlocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                      {agency.walletBlocked ? 'Đang chặn' : 'Bình thường'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        title="Xác nhận thao tác"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmModal(null)}>Huỷ</Button>
            <Button variant="danger" onClick={confirmToggle}>Xác nhận</Button>
          </>
        }
      >
        {confirmModal && (
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white mb-1">
                {confirmModal.newVal ? 'Chặn' : 'Bỏ chặn'} {confirmModal.field === 'loginBlocked' ? 'đăng nhập' : 'giao dịch ví'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Đại lý: <strong>{confirmModal.agency.name}</strong>
              </p>
              {confirmModal.newVal && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  ⚠️ Thao tác này sẽ ảnh hưởng ngay lập tức đến hoạt động của đại lý.
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
