import { useState } from 'react'
import { mockAgencies } from '../../data/agencies'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import type { Agency } from '../../types'
import { Users, Plus, TrendingUp, ToggleLeft, ToggleRight } from 'lucide-react'

export default function F3ManagementPage() {
  const [sellers, setSellers] = useState(mockAgencies.filter(a => a.role === 'F3'))
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const handleCreate = () => {
    const newSeller: Agency = {
      id: 'ag' + Date.now(),
      name: newName,
      code: 'F3-NEW' + Date.now().toString().slice(-3),
      ownerName: newName,
      phone: newPhone,
      email: newEmail,
      city: 'Hà Nội',
      gmv: 0,
      bookingCount: 0,
      balance: 0,
      creditLimit: 0,
      loginBlocked: false,
      walletBlocked: false,
      parentId: 'ag1',
      role: 'F3',
    }
    setSellers(prev => [...prev, newSeller])
    setShowCreate(false)
    setNewName(''); setNewPhone(''); setNewEmail('')
  }

  const toggleBlock = (id: string) => {
    setSellers(prev => prev.map(a => a.id === id ? { ...a, loginBlocked: !a.loginBlocked } : a))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-vnpay-blue" /> Quản lý CTV / F3
        </h1>
        <Button onClick={() => setShowCreate(true)}>
          <Plus className="w-4 h-4" /> Thêm CTV
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sellers.map(seller => (
          <Card key={seller.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center font-bold text-orange-600 dark:text-orange-400">
                  {seller.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{seller.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{seller.email}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{seller.phone}</p>
                </div>
              </div>
              <button onClick={() => toggleBlock(seller.id)}>
                {seller.loginBlocked ? <ToggleLeft className="w-8 h-8 text-gray-400" /> : <ToggleRight className="w-8 h-8 text-green-500" />}
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                <p className="text-gray-400">GMV</p>
                <p className="font-semibold text-vnpay-blue">{formatVND(seller.gmv / 1e6)}tr</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2">
                <p className="text-gray-400">Đơn hàng</p>
                <p className="font-semibold dark:text-white">{seller.bookingCount}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Thêm CTV mới"
        footer={<>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>Huỷ</Button>
          <Button onClick={handleCreate} disabled={!newName || !newPhone || !newEmail}>Tạo</Button>
        </>}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Họ tên CTV</label>
            <input value={newName} onChange={e => setNewName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Điện thoại</label>
            <input value={newPhone} onChange={e => setNewPhone(e.target.value)} type="tel" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
      </Modal>
    </div>
  )
}
