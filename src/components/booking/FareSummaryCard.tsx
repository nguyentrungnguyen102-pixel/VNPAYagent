import Card from '../ui/Card'
import { formatVND } from '../../utils/formatters'

interface FareSummaryCardProps {
  baseFare: number
  tax: number
  markup?: number
  ancillaryTotal?: number
  label?: string
}

export default function FareSummaryCard({ baseFare, tax, markup = 0, ancillaryTotal = 0, label = 'Chi phí vé' }: FareSummaryCardProps) {
  const total = baseFare + tax + markup + ancillaryTotal
  return (
    <Card>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{label}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Giá vé cơ bản</span>
          <span>{formatVND(baseFare)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Thuế + Phí</span>
          <span>{formatVND(tax)}</span>
        </div>
        {markup > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Phụ thu đại lý</span>
            <span>{formatVND(markup)}</span>
          </div>
        )}
        {ancillaryTotal > 0 && (
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Dịch vụ bổ sung</span>
            <span>{formatVND(ancillaryTotal)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between font-semibold text-gray-900 dark:text-white">
          <span>Tổng cộng</span>
          <span className="text-vnpay-blue">{formatVND(total)}</span>
        </div>
      </div>
    </Card>
  )
}
