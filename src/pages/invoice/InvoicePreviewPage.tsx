import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import { ArrowLeft, Printer } from 'lucide-react'

export default function InvoicePreviewPage() {
  const navigate = useNavigate()
  const invoiceData = {
    invoiceNo: 'VNPAY-2026-001234',
    date: '15/05/2026',
    company: 'TravelCo Hà Nội',
    taxCode: '0123456789',
    address: '123 Nguyễn Trãi, Hà Nội',
    description: 'Dịch vụ đặt vé máy bay VN123 HAN-SGN',
    amount: 3_850_000,
    vatRate: 10,
  }
  const vat = Math.round(invoiceData.amount * invoiceData.vatRate / 100)
  const total = invoiceData.amount + vat

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          <Printer className="w-4 h-4" /> In hóa đơn
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 space-y-6">
        <div className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 bg-vnpay-red rounded-lg flex items-center justify-center font-bold text-white">VP</div>
            <span className="text-xl font-bold text-vnpay-navy dark:text-white">VNPAY</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">HÓA ĐƠN DỊCH VỤ</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Số: {invoiceData.invoiceNo}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ngày: {invoiceData.date}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Bên bán:</p>
            <p className="font-bold text-gray-900 dark:text-white">Công ty TNHH VNPAY</p>
            <p className="text-gray-500 dark:text-gray-400">MST: 0106869079</p>
            <p className="text-gray-500 dark:text-gray-400">22 Láng Hạ, Ba Đình, Hà Nội</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Bên mua:</p>
            <p className="font-bold text-gray-900 dark:text-white">{invoiceData.company}</p>
            <p className="text-gray-500 dark:text-gray-400">MST: {invoiceData.taxCode}</p>
            <p className="text-gray-500 dark:text-gray-400">{invoiceData.address}</p>
          </div>
        </div>

        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="text-left px-3 py-2 text-gray-600 dark:text-gray-300">Mô tả dịch vụ</th>
              <th className="text-right px-3 py-2 text-gray-600 dark:text-gray-300">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-3 text-gray-900 dark:text-white">{invoiceData.description}</td>
              <td className="px-3 py-3 text-right text-gray-900 dark:text-white">{formatVND(invoiceData.amount)}</td>
            </tr>
          </tbody>
          <tfoot className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <tr>
              <td className="px-3 py-2 text-gray-600 dark:text-gray-300">Thuế VAT ({invoiceData.vatRate}%)</td>
              <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">{formatVND(vat)}</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-bold text-gray-900 dark:text-white">TỔNG THANH TOÁN</td>
              <td className="px-3 py-2 text-right font-bold text-vnpay-blue text-lg">{formatVND(total)}</td>
            </tr>
          </tfoot>
        </table>

        <p className="text-xs text-gray-400 text-center">Hóa đơn điện tử theo Nghị định 123/2020/NĐ-CP</p>
      </div>
    </div>
  )
}
