import { useState } from 'react'
import { useScenarioStore } from '../../store/scenarioStore'
import type { Scenario } from '../../types'
import { cn } from '../../utils/cn'
import { FlaskConical, X } from 'lucide-react'

const scenarios: { value: Scenario; label: string; color: string }[] = [
  { value: 'success', label: 'Thành công', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
  { value: 'timeout', label: 'Timeout', color: 'bg-red-100 text-red-800 hover:bg-red-200' },
  { value: 'empty', label: 'Không có KQ', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
  { value: 'price_changed', label: 'Giá thay đổi', color: 'bg-amber-100 text-amber-800 hover:bg-amber-200' },
  { value: 'hold_expired', label: 'Hết giờ giữ', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200' },
]

export default function ScenarioDevPanel() {
  const [open, setOpen] = useState(false)
  const { scenario, setScenario } = useScenarioStore()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-52">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Demo Scenario</span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-1.5">
            {scenarios.map(s => (
              <button
                key={s.value}
                onClick={() => setScenario(s.value)}
                className={cn('w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all', s.color, scenario === s.value && 'ring-2 ring-offset-1 ring-blue-500')}
              >
                {scenario === s.value ? '✓ ' : ''}{s.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-gray-800 dark:bg-gray-700 text-white px-3 py-2 rounded-full shadow-lg text-xs font-medium hover:bg-gray-700 transition-all"
        >
          <FlaskConical className="w-3.5 h-3.5" />
          Demo
        </button>
      )}
    </div>
  )
}
