import type { Movie, Showtime } from '../types'

export const mockMovies: Movie[] = [
  { id: 'mv001', title: 'Avengers: Secret Wars', genre: 'Hành động / Viễn tưởng', duration: 149, rating: '16+', posterUrl: 'https://placehold.co/200x300/003b73/ffffff?text=Avengers', description: 'Cuộc chiến cuối cùng giữa các siêu anh hùng và thế giới bí ẩn.', releaseDate: '2026-05-01' },
  { id: 'mv002', title: 'Inside Out 3', genre: 'Hoạt hình / Gia đình', duration: 102, rating: 'P', posterUrl: 'https://placehold.co/200x300/e31e24/ffffff?text=Inside+Out+3', description: 'Riley trưởng thành hơn với những cảm xúc mới.', releaseDate: '2026-04-15' },
  { id: 'mv003', title: 'Lật Mặt 9', genre: 'Hài / Hành động', duration: 135, rating: '13+', posterUrl: 'https://placehold.co/200x300/1e6fbf/ffffff?text=Lat+Mat+9', description: 'Phần tiếp theo của loạt phim hài hành động đình đám Việt Nam.', releaseDate: '2026-05-10' },
  { id: 'mv004', title: 'Dune: Awakening', genre: 'Khoa học viễn tưởng', duration: 165, rating: '18+', posterUrl: 'https://placehold.co/200x300/92400e/ffffff?text=Dune', description: 'Tiếp tục hành trình sử thi trên hành tinh Arrakis.', releaseDate: '2026-03-20' },
  { id: 'mv005', title: 'Kẻ Trộm Mặt Trăng 2', genre: 'Hoạt hình / Hài', duration: 95, rating: 'P', posterUrl: 'https://placehold.co/200x300/059669/ffffff?text=Minions', description: 'Gru và những minions trở lại với nhiệm vụ mới.', releaseDate: '2026-05-05' },
]

export const mockShowtimes: Showtime[] = [
  { id: 'st001', movieId: 'mv001', cinema: 'CGV Vincom Bà Triệu', date: '2026-05-16', time: '10:00', format: '2D', price: 120_000, seatsTotal: 80, seatsTaken: [1,2,3,10,11,12,25,26,30,31,45,46,47,60,61] },
  { id: 'st002', movieId: 'mv001', cinema: 'CGV Vincom Bà Triệu', date: '2026-05-16', time: '13:30', format: '3D', price: 150_000, seatsTotal: 80, seatsTaken: [5,6,7,20,21,35,36,50,51,52,65,66] },
  { id: 'st003', movieId: 'mv001', cinema: 'Lotte Cinema Hà Nội', date: '2026-05-16', time: '15:00', format: '2D', price: 110_000, seatsTotal: 80, seatsTaken: [3,4,15,16,27,28,42,43,58,59,70,71] },
  { id: 'st004', movieId: 'mv002', cinema: 'CGV Vincom Bà Triệu', date: '2026-05-16', time: '09:30', format: '2D', price: 100_000, seatsTotal: 60, seatsTaken: [1,2,10,11,20,21,30,31] },
  { id: 'st005', movieId: 'mv003', cinema: 'BHD Star Phạm Ngọc Thạch', date: '2026-05-16', time: '19:00', format: '2D', price: 130_000, seatsTotal: 100, seatsTaken: [5,6,7,8,15,16,17,25,26,27,40,41,42,55,56,70,71,72,80,81] },
  { id: 'st006', movieId: 'mv004', cinema: 'CGV Vincom Bà Triệu', date: '2026-05-16', time: '20:00', format: 'IMAX', price: 200_000, seatsTotal: 80, seatsTaken: [1,2,3,10,11,12,20,21,22,30,31,32,40,41,42,50,51] },
]
