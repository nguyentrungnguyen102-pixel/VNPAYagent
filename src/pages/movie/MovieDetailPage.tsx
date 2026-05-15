import { useNavigate, useParams } from 'react-router-dom'
import { mockMovies, mockShowtimes } from '../../data/movies'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { formatVND } from '../../utils/formatters'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'

export default function MovieDetailPage() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const movie = mockMovies.find(m => m.id === movieId) || mockMovies[0]
  const showtimes = mockShowtimes.filter(s => s.movieId === movie.id)
  const cinemas = [...new Set(showtimes.map(s => s.cinema))]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
      <div className="flex gap-6">
        <img src={movie.posterUrl} alt={movie.title} className="w-36 h-52 rounded-xl object-cover flex-shrink-0" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{movie.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{movie.genre}</p>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{movie.duration} phút</span>
            <span className="bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-medium">{movie.rating}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{movie.description}</p>
        </div>
      </div>

      {cinemas.map(cinema => (
        <Card key={cinema}>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-vnpay-blue" /> {cinema}
          </h3>
          <div className="flex flex-wrap gap-2">
            {showtimes.filter(s => s.cinema === cinema).map(st => {
              const available = st.seatsTotal - st.seatsTaken.length
              return (
                <button
                  key={st.id}
                  onClick={() => navigate(`/movie/${movie.id}/seats/${st.id}`)}
                  className="flex flex-col items-center px-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 hover:border-vnpay-blue rounded-xl transition-all group"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-vnpay-blue">{st.time}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{st.format}</span>
                  <span className="text-xs text-vnpay-blue mt-0.5">{formatVND(st.price)}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{available} ghế</span>
                </button>
              )
            })}
          </div>
        </Card>
      ))}
    </div>
  )
}
