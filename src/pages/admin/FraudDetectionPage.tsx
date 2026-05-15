import { useState } from 'react'
import { mockFraudAlerts } from '../../data/fraudAlerts'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatDateTime } from '../../utils/formatters'
import type { FraudAlert } from '../../types'
import { AlertOctagon, Shield, Eye, X, Clock } from 'lucide-react'
import { cn } from '../../utils/cn'

const alertTypeLabels = {
  bulk_issue: 'Xuất vé hàng loạt',
  bulk_refund: 'Hoàn vé hàng loạt',
  single_ip: 'IP bất thường',
  rapid_fire: 'Giao dịch dồn dập',
}

const statusConfig = {
  New: { label: 'Mới', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
  Investigating: { label: 'Điều tra', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  Resolved: { label: 'Đã xử lý', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
  Dismissed: { label: 'Bỏ qua', color: 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' },
}

export default function FraudDetectionPage() {
  const [alerts, setAlerts] = useState(mockFraudAlerts)

  const updateStatus = (id: string, status: FraudAlert['status']) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status } : a))
  }

  const newCount = alerts.filter(a => a.status === 'New').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-vnpay-red" /> Phát hiện gian lận
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Giám sát hành vi bất thường theo thời gian thực</p>
        </div>
        {newCount > 0 && (
          <span className="inline-flex items-center gap-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-lg text-sm font-semibold">
            <AlertOctagon className="w-4 h-4" /> {newCount} cảnh báo mới
          </span>
        )}
      </div>

      <div className="space-y-4">
        {alerts.map(alert => {
          const statusCfg = statusConfig[alert.status]
          return (
            <Card key={alert.id} className={cn(alert.status === 'New' ? 'border-red-300 dark:border-red-800' : '')}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={cn('p-2.5 rounded-xl flex-shrink-0', alert.status === 'New' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-gray-100 dark:bg-gray-700')}>
                    <AlertOctagon className={cn('w-5 h-5', alert.status === 'New' ? 'text-red-600 dark:text-red-400' : 'text-gray-500')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', statusCfg.color)}>{statusCfg.label}</span>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">{alertTypeLabels[alert.alertType]}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{alert.agencyName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">{alert.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDateTime(alert.detectedAt)}</span>
                      <span>{alert.transactionCount} giao dịch / {alert.timeWindowMinutes} phút</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-shrink-0">
                  {alert.status === 'New' && (
                    <Button size="sm" onClick={() => updateStatus(alert.id, 'Investigating')}>
                      <Eye className="w-3.5 h-3.5" /> Điều tra
                    </Button>
                  )}
                  {(alert.status === 'New' || alert.status === 'Investigating') && (
                    <>
                      <Button size="sm" variant="danger" onClick={() => updateStatus(alert.id, 'Resolved')}>
                        <Shield className="w-3.5 h-3.5" /> Chặn đại lý
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => updateStatus(alert.id, 'Dismissed')}>
                        <X className="w-3.5 h-3.5" /> Bỏ qua
                      </Button>
                    </>
                  )}
                  {(alert.status === 'Resolved' || alert.status === 'Dismissed') && (
                    <span className="text-xs text-gray-400">Đã xử lý</span>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
