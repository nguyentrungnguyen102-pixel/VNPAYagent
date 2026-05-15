import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { mockBookings } from '../../data/bookings'
import { formatVND } from '../../utils/formatters'
import { Receipt } from 'lucide-react'

export default function InvoiceRequestPage() {
  const navigate = useNavigate()
  const [taxCode, setTaxCode] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [selectedBooking, setSelectedBooking] = useState('')
  const issuedBookings = mockBookings.filter(b => b.status === 'Issued')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/invoices/INV001')
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"><Receipt className="w-6 h-6 text-vnpay-blue" /> Yêu cầu xuất hóa đơn</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Chọn đơn hàng</label>
            <select value={selectedBooking} onChange={e => setSelectedBooking(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" required>
              <option value="">-- Chọn đơn --</option>
              {issuedBookings.map(b => <option key={b.id} value={b.id}>{b.id} - {b.description} ({formatVND(b.totalAmount)})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mã số thuế</label>
            <input value={taxCode} onChange={e => setTaxCode(e.target.value)} required placeholder="0123456789" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên công ty</label>
            <input value={company} onChange={e => setCompany(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Địa chỉ</label>
            <input value={address} onChange={e => setAddress(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <Button type="submit" className="w-full" size="lg">Xuất hóa đơn</Button>
        </form>
      </Card>
    </div>
  )
}
