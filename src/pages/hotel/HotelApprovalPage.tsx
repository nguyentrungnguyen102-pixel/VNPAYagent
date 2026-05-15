import { useState } from 'react'
import { mockBookings } from '../../data/bookings'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { formatVND, formatDateTime } from '../../utils/formatters'
import { useWalletStore } from '../../store/walletStore'
import { Hotel, CheckCircle, XCircle } from 'lucide-react'
import type { Booking } from '../../types'

export default function HotelApprovalPage() {
  const { debit } = useWalletStore()
  const [pendingItems, setPendingItems] = useState(
    mockBookings.filter(b => b.status === 'PendingApproval')
  )
  const [processed, setProcessed] = useState<{ bk: Booking; action: 'approved' | 'rejected' }[]>([])

  const handleAction = (bk: Booking, action: 'approved' | 'rejected') => {
    if (action === 'approved') debit(bk.totalAmount, `Duyệt phòng ${bk.description}`)
    setPendingItems(prev => prev.filter(b => b.id !== bk.id))
    setProcessed(prev => [...prev, { bk, action }])
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Hotel className="w-6 h-6 text-vnpay-blue" /> Duyệt đặt phòng
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{pendingItems.length} yêu cầu chờ duyệt</p>
      </div>

      {pendingItems.length === 0 && processed.length === 0 && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Không có yêu cầu nào chờ duyệt</p>
        </Card>
      )}

      {pendingItems.map(bk => (
        <Card key={bk.id}>
          <CardHeader>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{bk.description}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{bk.id} · {formatDateTime(bk.createdAt)}</p>
            </div>
            <Badge status={bk.status} />
          </CardHeader>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-vnpay-blue">{formatVND(bk.totalAmount)}</p>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" onClick={() => handleAction(bk, 'rejected')}>
                <XCircle className="w-4 h-4" /> Từ chối
              </Button>
              <Button size="sm" onClick={() => handleAction(bk, 'approved')}>
                <CheckCircle className="w-4 h-4" /> Duyệt & Thanh toán
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {processed.length > 0 && (
        <Card>
          <CardTitle className="mb-3">Đã xử lý</CardTitle>
          <div className="space-y-2">
            {processed.map(({ bk, action }) => (
              <div key={bk.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">{bk.description}</span>
                <span className={action === 'approved' ? 'text-green-600 dark:text-green-400 flex items-center gap-1' : 'text-red-500 dark:text-red-400 flex items-center gap-1'}>
                  {action === 'approved' ? <><CheckCircle className="w-4 h-4" /> Đã duyệt</> : <><XCircle className="w-4 h-4" /> Đã từ chối</>}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
