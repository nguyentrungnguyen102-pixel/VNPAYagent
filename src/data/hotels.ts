import type { Hotel, RoomType } from '../types'

export const mockHotels: Hotel[] = [
  { id: 'ht001', name: 'Sofitel Legend Metropole Hanoi', city: 'Hà Nội', address: '15 Ngô Quyền, Hoàn Kiếm', stars: 5, rating: 9.4, reviewCount: 3241, imageUrl: 'https://placehold.co/400x250/003b73/ffffff?text=Metropole', amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Bar', 'Gym', 'WiFi'] },
  { id: 'ht002', name: 'InterContinental Hanoi Landmark72', city: 'Hà Nội', address: 'Tầng 32-38, Keangnam, Cầu Giấy', stars: 5, rating: 9.1, reviewCount: 1876, imageUrl: 'https://placehold.co/400x250/1e6fbf/ffffff?text=Landmark72', amenities: ['Hồ bơi vô cực', 'Spa', 'Gym', 'Bar trên cao', 'WiFi'] },
  { id: 'ht003', name: 'Melia Hanoi Hotel', city: 'Hà Nội', address: '44B Lý Thường Kiệt, Hoàn Kiếm', stars: 5, rating: 8.9, reviewCount: 2103, imageUrl: 'https://placehold.co/400x250/00529c/ffffff?text=Melia', amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'WiFi'] },
  { id: 'ht004', name: 'Caravelle Saigon', city: 'TP.HCM', address: '19-23 Công Trường Lam Sơn, Bến Nghé', stars: 5, rating: 9.0, reviewCount: 2567, imageUrl: 'https://placehold.co/400x250/003b73/ffffff?text=Caravelle', amenities: ['Hồ bơi', 'Spa', 'Rooftop bar', 'Nhà hàng', 'WiFi'] },
  { id: 'ht005', name: 'Park Hyatt Saigon', city: 'TP.HCM', address: '2 Công Trường Lam Sơn, Bến Nghé', stars: 5, rating: 9.5, reviewCount: 4120, imageUrl: 'https://placehold.co/400x250/1e6fbf/ffffff?text=ParkHyatt', amenities: ['Hồ bơi', 'Spa', 'Nhà hàng Pháp', 'Bar', 'WiFi'] },
]

export const mockRooms: RoomType[] = [
  { id: 'rm001', hotelId: 'ht001', name: 'Superior Room', description: 'Phòng Superior với view thành phố, diện tích 32m²', pricePerNight: 3_200_000, maxGuests: 2, bedType: 'King', available: true },
  { id: 'rm002', hotelId: 'ht001', name: 'Deluxe Room Garden View', description: 'Phòng Deluxe nhìn ra khu vườn xanh, 38m²', pricePerNight: 4_500_000, maxGuests: 2, bedType: 'King', available: true },
  { id: 'rm003', hotelId: 'ht001', name: 'Suite', description: 'Suite sang trọng với phòng khách riêng, 65m²', pricePerNight: 8_500_000, maxGuests: 3, bedType: 'King', available: false },
  { id: 'rm004', hotelId: 'ht002', name: 'Deluxe City View', description: 'Phòng Deluxe tầng cao view toàn thành phố', pricePerNight: 3_800_000, maxGuests: 2, bedType: 'King', available: true },
  { id: 'rm005', hotelId: 'ht004', name: 'Superior Room', description: 'Phòng Superior view Nhà hát lớn TP.HCM', pricePerNight: 2_900_000, maxGuests: 2, bedType: 'Queen', available: true },
  { id: 'rm006', hotelId: 'ht005', name: 'Park Room', description: 'Phòng tiêu chuẩn với nội thất sang trọng, 35m²', pricePerNight: 5_200_000, maxGuests: 2, bedType: 'King', available: true },
]
