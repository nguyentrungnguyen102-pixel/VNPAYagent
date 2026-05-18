import { useNavigate } from 'react-router-dom'
import { mockMovies } from '../../data/movies'
import { Film, Star, Clock } from 'lucide-react'

export default function MovieListPage() {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Film className="w-6 h-6 text-vnpay-blue" /> Vé xem phim
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Đang chiếu — CGV · Lotte · BHD Star</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mockMovies.map(movie => (
          <div key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)} className="group cursor-pointer">
            <div className="relative rounded-xl overflow-hidden mb-3 aspect-[2/3] bg-gray-100 dark:bg-gray-800">
              <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 right-2">
                <span className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-medium">{movie.rating}</span>
              </div>
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 truncate group-hover:text-vnpay-blue transition-colors">{movie.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{movie.genre}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{movie.duration}p</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
