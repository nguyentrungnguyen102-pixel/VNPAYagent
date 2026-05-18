import { useState } from 'react'
import Card, { CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND } from '../../utils/formatters'
import { Sliders, Save } from 'lucide-react'
import type { ServiceType } from '../../types'

const services: { type: ServiceType; label: string; example: number }[] = [
  { type: 'flight', label: 'Vé máy bay nội địa', example: 3_850_000 },
  { type: 'flight', label: 'Vé máy bay quốc tế', example: 15_300_000 },
  { type: 'bus', label: 'Xe khách', example: 320_000 },
  { type: 'taxi', label: 'Taxi', example: 185_000 },
  { type: 'movie', label: 'Vé xem phim', example: 120_000 },
  { type: 'hotel', label: 'Khách sạn', example: 3_200_000 },
]

export default function MarkupConfigPage() {
  const [markups, setMarkups] = useState<Record<string, number>>({
    'Vé máy bay nội địa': 50_000,
    'Vé máy bay quốc tế': 200_000,
    'Xe khách': 10_000,
    'Taxi': 5_000,
    'Vé xem phim': 5_000,
    'Khách sạn': 100_000,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <Sliders className="w-6 h-6 text-vnpay-blue" /> Cấu hình Markup
      </h1>
      {saved && <Alert variant="success">Cấu hình markup đã được lưu thành công!</Alert>}
      <Card>
        <CardHeader><CardTitle>Phụ thu theo dịch vụ</CardTitle></CardHeader>
        <div className="space-y-4">
          {services.map(svc => (
            <div key={svc.label} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{svc.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">VD giá: {formatVND(svc.example)} → khách trả: {formatVND(svc.example + (markups[svc.label] || 0))}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={markups[svc.label] || 0}
                  onChange={e => setMarkups(prev => ({ ...prev, [svc.label]: Number(e.target.value) }))}
                  className="w-32 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-right dark:bg-gray-700 dark:text-white"
                />
                <span className="text-xs text-gray-400">VND</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}><Save className="w-4 h-4" /> Lưu cấu hình</Button>
        </div>
      </Card>
    </div>
  )
}
