import { useState } from 'react'
import { mockAgencies } from '../../data/agencies'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import { CreditCard, Save } from 'lucide-react'
import type { Agency } from '../../types'

export default function CreditManagementPage() {
  const [agencies, setAgencies] = useState(mockAgencies.filter(a => a.role === 'F2'))
  const [editing, setEditing] = useState<string | null>(null)
  const [editVal, setEditVal] = useState('')
  const [saved, setSaved] = useState<string[]>([])

  const startEdit = (ag: Agency) => {
    setEditing(ag.id)
    setEditVal(String(ag.creditLimit / 1_000_000))
  }

  const saveEdit = (id: string) => {
    setAgencies(prev => prev.map(a => a.id === id ? { ...a, creditLimit: Number(editVal) * 1_000_000 } : a))
    setSaved(prev => [...prev, id])
    setEditing(null)
    setTimeout(() => setSaved(prev => prev.filter(s => s !== id)), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <CreditCard className="w-6 h-6 text-vnpay-blue" /> Quản lý hạn mức tín dụng
      </h1>
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Đại lý</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Số dư hiện tại</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Hạn mức tín dụng (triệu VND)</th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {agencies.map(ag => (
                <tr key={ag.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">{ag.name}</p>
                    <p className="text-xs text-gray-400">{ag.code} · {ag.city}</p>
                  </td>
                  <td className="px-4 py-3 text-right font-medium dark:text-white">{formatVND(ag.balance)}</td>
                  <td className="px-4 py-3 text-right">
                    {editing === ag.id ? (
                      <input
                        type="number"
                        value={editVal}
                        onChange={e => setEditVal(e.target.value)}
                        className="w-28 px-2 py-1 text-right border border-vnpay-blue rounded text-sm dark:bg-gray-700 dark:text-white"
                        min={0}
                        step={10}
                      />
                    ) : (
                      <span className={saved.includes(ag.id) ? 'text-green-600 font-bold' : 'font-medium dark:text-white'}>
                        {formatVND(ag.creditLimit)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {editing === ag.id ? (
                      <Button size="sm" onClick={() => saveEdit(ag.id)}>
                        <Save className="w-3.5 h-3.5" /> Lưu
                      </Button>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => startEdit(ag)}>Sửa</Button>
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
