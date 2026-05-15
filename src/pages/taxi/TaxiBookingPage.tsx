import { useState } from 'react'
import { useWalletStore } from '../../store/walletStore'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import { cn } from '../../utils/cn'
import { Car, MapPin, Navigation, CheckCircle, Star } from 'lucide-react'

const PROVIDERS = [
  { id: 'sm', name: 'Xanh SM', commission: 0.030, fare: 185_000, eta: '3 phút', color: 'bg-green-500' },
  { id: 'ml', name: 'Mai Linh', commission: 0.028, fare: 170_000, eta: '5 phút', color: 'bg-green-700' },
  { id: 'be', name: 'Be', commission: 0.026, fare: 155_000, eta: '4 phút', color: 'bg-amber-500' },
]

type Stage = 'search' | 'finding' | 'found' | 'completed'

export default function TaxiBookingPage() {
  const { wallet, debit, credit } = useWalletStore()
  const [pickup, setPickup] = useState('Sân bay Nội Bài, Hà Nội')
  const [dropoff, setDropoff] = useState('Khách sạn Melia, Hà Nội')
  const [provider, setProvider] = useState('sm')
  const [stage, setStage] = useState<Stage>('search')
  const [commission, setCommission] = useState(0)

  const selectedProv = PROVIDERS.find(p => p.id === provider)!

  const handleBook = async () => {
    setStage('finding')
    await new Promise(r => setTimeout(r, 2000))
    setStage('found')
  }

  const handleComplete = () => {
    const comm = Math.round(selectedProv.fare * selectedProv.commission)
    debit(selectedProv.fare, `Taxi ${selectedProv.name} - ${pickup} → ${dropoff}`)
    credit(comm, `Hoa hồng taxi ${selectedProv.name}`)
    setCommission(comm)
    setStage('completed')
  }

  if (stage === 'completed') return (
    <div className="max-w-md mx-auto text-center py-12 space-y-4">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chuyến đi hoàn thành!</h2>
      <p className="text-gray-500 dark:text-gray-400">{selectedProv.name} · {pickup} → {dropoff}</p>
      <Card>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Cước phí</span><span className="font-semibold dark:text-white">{formatVND(selectedProv.fare)}</span></div>
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> Hoa hồng cashback</span>
            <span className="font-bold">+{formatVND(commission)}</span>
          </div>
        </div>
      </Card>
      <Button onClick={() => setStage('search')}>Đặt xe mới</Button>
    </div>
  )

  if (stage === 'found') return (
    <div className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tài xế đã được tìm thấy</h2>
      <Card>
        <div className="flex items-center gap-4">
          <div className={cn('w-12 h-12 rounded-full flex items-center justify-center text-white font-bold', selectedProv.color)}>
            <Car className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-white">Nguyễn Văn Tài Xế</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedProv.name} · 51A-123.45</p>
            <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5">
              {'★★★★☆'} <span className="text-gray-500 dark:text-gray-400 ml-1">4.8 (312 chuyến)</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-vnpay-blue font-bold">{selectedProv.eta}</p>
            <p className="text-xs text-gray-500">đến nơi</p>
          </div>
        </div>
      </Card>
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={() => setStage('search')}>Huỷ</Button>
        <Button className="flex-1" onClick={handleComplete}>Hoàn thành chuyến</Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Car className="w-6 h-6 text-vnpay-blue" /> Đặt taxi
        </h1>
      </div>

      <Card>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Navigation className="inline w-3.5 h-3.5 mr-1 text-green-500" /> Điểm đón
            </label>
            <input value={pickup} onChange={e => setPickup(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <MapPin className="inline w-3.5 h-3.5 mr-1 text-red-500" /> Điểm đến
            </label>
            <input value={dropoff} onChange={e => setDropoff(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Chọn nhà cung cấp</h3>
        <div className="space-y-2">
          {PROVIDERS.map(p => (
            <button
              key={p.id}
              onClick={() => setProvider(p.id)}
              className={cn('w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all', provider === p.id ? 'border-vnpay-blue bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300')}
            >
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold', p.color)}>
                  {p.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Hoa hồng {(p.commission * 100).toFixed(1)}% · ETA {p.eta}</p>
                </div>
              </div>
              <span className="text-vnpay-blue font-bold">{formatVND(p.fare)}</span>
            </button>
          ))}
        </div>
      </Card>

      {stage === 'finding' ? (
        <Card className="text-center py-6">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <Car className="w-12 h-12 text-vnpay-blue" />
            <p className="font-semibold text-gray-900 dark:text-white">Đang tìm tài xế...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Vui lòng chờ</p>
          </div>
        </Card>
      ) : (
        <Button className="w-full" size="lg" onClick={handleBook}>
          Đặt {selectedProv.name} — {formatVND(selectedProv.fare)}
        </Button>
      )}
    </div>
  )
}
