import { useState } from 'react'
import { useWalletStore } from '../../store/walletStore'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'
import { formatVND } from '../../utils/formatters'
import { CheckCircle, QrCode, Building2 } from 'lucide-react'

const PRESET_AMOUNTS = [10_000_000, 20_000_000, 50_000_000, 100_000_000]

export default function TopUpPage() {
  const { topup } = useWalletStore()
  const [tab, setTab] = useState<'qr' | 'va'>('qr')
  const [amount, setAmount] = useState(10_000_000)
  const [bank, setBank] = useState('VCB')
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    topup(amount, `Nạp ví qua ${bank} - QR`)
    setConfirmed(true)
    setLoading(false)
  }

  if (confirmed) return (
    <div className="max-w-md mx-auto text-center py-12 space-y-4">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nạp tiền thành công!</h2>
      <p className="text-gray-500 dark:text-gray-400">Đã cộng <strong className="text-vnpay-blue">{formatVND(amount)}</strong> vào ví</p>
      <Button onClick={() => { setConfirmed(false); setAmount(10_000_000) }}>Nạp thêm</Button>
    </div>
  )

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nạp tiền vào ví</h1>

      <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {[{ id: 'qr', label: 'QR Code', icon: QrCode }, { id: 'va', label: 'Tài khoản ảo', icon: Building2 }].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as 'qr' | 'va')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${tab === t.id ? 'bg-vnpay-blue text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <Card>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Số tiền nạp</label>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {PRESET_AMOUNTS.map(a => (
              <button key={a} onClick={() => setAmount(a)} className={`py-2 rounded-lg text-sm font-medium border-2 transition-all ${amount === a ? 'border-vnpay-blue bg-blue-50 dark:bg-blue-900/20 text-vnpay-blue' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300'}`}>
                {formatVND(a)}
              </button>
            ))}
          </div>
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} step={1000000} min={100000} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ngân hàng</label>
          <select value={bank} onChange={e => setBank(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white">
            <option value="VCB">Vietcombank</option>
            <option value="MB">MB Bank</option>
            <option value="TCB">Techcombank</option>
            <option value="VTB">VietinBank</option>
            <option value="BIDV">BIDV</option>
          </select>
        </div>

        {tab === 'qr' && (
          <div className="text-center mb-4">
            <div className="inline-flex flex-col items-center bg-white border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <div className="w-40 h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                <QrCode className="w-24 h-24 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Quét mã QR để nạp {formatVND(amount)}</p>
              <p className="text-xs text-gray-400 mt-1">Mã giao dịch: VP{Date.now().toString().slice(-8)}</p>
            </div>
          </div>
        )}

        {tab === 'va' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Ngân hàng</span><span className="font-semibold dark:text-white">{bank}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Số tài khoản ảo</span><span className="font-mono font-bold text-vnpay-blue">1234.5678.9012</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Số tiền</span><span className="font-bold text-vnpay-blue">{formatVND(amount)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Nội dung</span><span className="font-medium dark:text-white">NAP VP{Date.now().toString().slice(-6)}</span></div>
          </div>
        )}

        <Alert variant="info" className="mb-4">Demo: Nhấn "Xác nhận đã chuyển" để mô phỏng nạp tiền thành công.</Alert>

        <Button className="w-full" size="lg" loading={loading} onClick={handleConfirm}>
          Xác nhận đã chuyển {formatVND(amount)}
        </Button>
      </Card>
    </div>
  )
}
