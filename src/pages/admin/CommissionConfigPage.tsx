import { useState } from 'react'
import { mockCommissionRules } from '../../data/commissions'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import type { CommissionRule, ServiceType } from '../../types'
import { Sliders, Check, X, ToggleLeft, ToggleRight } from 'lucide-react'

const serviceLabels: Record<ServiceType, string> = {
  flight: 'Máy bay', bus: 'Xe khách', taxi: 'Taxi', movie: 'Phim', hotel: 'Khách sạn'
}

export default function CommissionConfigPage() {
  const [rules, setRules] = useState(mockCommissionRules)
  const [editing, setEditing] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<{ netRate: string; agentRate: string }>({ netRate: '', agentRate: '' })
  const [saved, setSaved] = useState<string[]>([])

  const startEdit = (rule: CommissionRule) => {
    setEditing(rule.id)
    setEditValues({ netRate: (rule.netRate * 100).toFixed(3), agentRate: (rule.agentRate * 100).toFixed(3) })
  }

  const saveEdit = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, netRate: Number(editValues.netRate) / 100, agentRate: Number(editValues.agentRate) / 100 } : r))
    setSaved(prev => [...prev, id])
    setEditing(null)
    setTimeout(() => setSaved(prev => prev.filter(s => s !== id)), 2000)
  }

  const toggleActive = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-6 h-6 text-vnpay-blue" /> Cấu hình hoa hồng
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Quản lý tỷ lệ hoa hồng theo dịch vụ và nhà cung cấp</p>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Dịch vụ</th>
                <th className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Nhà cung cấp</th>
                <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Net Rate (%)</th>
                <th className="text-right px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Agent Rate (%)</th>
                <th className="text-center px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Trạng thái</th>
                <th className="text-center px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {rules.map(rule => (
                <tr key={rule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900 dark:text-white">{serviceLabels[rule.serviceType]}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{rule.label}</td>
                  <td className="px-4 py-3 text-right">
                    {editing === rule.id ? (
                      <input
                        type="number"
                        step="0.001"
                        value={editValues.netRate}
                        onChange={e => setEditValues(p => ({ ...p, netRate: e.target.value }))}
                        className="w-20 px-2 py-1 text-right border border-vnpay-blue rounded text-sm dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      <span className={saved.includes(rule.id) ? 'text-green-600 font-bold' : 'font-medium dark:text-white'}>
                        {(rule.netRate * 100).toFixed(3)}%
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {editing === rule.id ? (
                      <input
                        type="number"
                        step="0.001"
                        value={editValues.agentRate}
                        onChange={e => setEditValues(p => ({ ...p, agentRate: e.target.value }))}
                        className="w-20 px-2 py-1 text-right border border-vnpay-blue rounded text-sm dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      <span className="font-medium dark:text-white">{(rule.agentRate * 100).toFixed(3)}%</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleActive(rule.id)}>
                      {rule.isActive ? <ToggleRight className="w-6 h-6 text-green-500 mx-auto" /> : <ToggleLeft className="w-6 h-6 text-gray-400 mx-auto" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {editing === rule.id ? (
                        <>
                          <button onClick={() => saveEdit(rule.id)} className="p-1.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded hover:bg-green-200 transition-colors">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditing(null)} className="p-1.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => startEdit(rule)}>Sửa</Button>
                      )}
                    </div>
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
