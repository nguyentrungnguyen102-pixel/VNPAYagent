import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockMovies, mockShowtimes } from '../../data/movies'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import { ArrowLeft, Monitor } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function SeatSelectionPage() {
  const { movieId, showtimeId } = useParams()
  const navigate = useNavigate()
  const movie = mockMovies.find(m => m.id === movieId) || mockMovies[0]
  const showtime = mockShowtimes.find(s => s.id === showtimeId) || mockShowtimes[0]
  const [selected, setSelected] = useState<number[]>([])
  const COLS = 10

  const toggleSeat = (n: number) => {
    if (showtime.seatsTaken.includes(n)) return
    setSelected(prev => prev.includes(n) ? prev.filter(s => s !== n) : [...prev, n])
  }

  const total = selected.length * showtime.price
  const commission = Math.round(total * 0.035)
  const rows = Math.ceil(showtime.seatsTotal / COLS)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{movie.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{showtime.cinema} · {showtime.time} · {showtime.format} · {showtime.date}</p>
      </div>

      {/* Screen */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Monitor className="w-4 h-4 text-gray-400" />
          <div className="w-48 h-2 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-500 rounded-t-full" />
          <Monitor className="w-4 h-4 text-gray-400" />
        </div>
        <p className="text-xs text-gray-400 mb-6">MÀN HÌNH</p>

        <div className="inline-flex flex-col gap-1.5">
          {Array.from({ length: rows }, (_, rowI) => (
            <div key={rowI} className="flex gap-1.5">
              <span className="w-5 text-xs text-gray-400 text-right self-center">{String.fromCharCode(65 + rowI)}</span>
              {Array.from({ length: COLS }, (_, colI) => {
                const seatNum = rowI * COLS + colI + 1
                if (seatNum > showtime.seatsTotal) return <div key={colI} className="w-7 h-7" />
                const isTaken = showtime.seatsTaken.includes(seatNum)
                const isSelected = selected.includes(seatNum)
                return (
                  <button
                    key={colI}
                    onClick={() => toggleSeat(seatNum)}
                    disabled={isTaken}
                    className={cn(
                      'w-7 h-7 rounded text-xs font-medium transition-all',
                      isTaken ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed' :
                      isSelected ? 'bg-vnpay-blue text-white scale-105' :
                      'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-vnpay-blue hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    )}
                  >
                    {seatNum <= 9 ? seatNum : ''}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
        {[
          { color: 'bg-white dark:bg-gray-700 border border-gray-300', label: 'Trống' },
          { color: 'bg-vnpay-blue', label: 'Đã chọn' },
          { color: 'bg-gray-300 dark:bg-gray-600', label: 'Đã đặt' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={cn('w-4 h-4 rounded', l.color)} />
            <span>{l.label}</span>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Ghế: {selected.join(', ')}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{selected.length} vé · {formatVND(showtime.price)}/vé</p>
              <p className="text-xs text-green-600 dark:text-green-400">Hoa hồng: +{formatVND(commission)}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-vnpay-blue">{formatVND(total)}</p>
              <Button size="sm" className="mt-2" onClick={() => navigate('/movie/payment', { state: { seats: selected, showtimeId, movieId, total, commission } })}>
                Tiếp tục
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
