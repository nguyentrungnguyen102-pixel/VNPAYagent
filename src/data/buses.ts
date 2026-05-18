import type { BusRoute } from '../types'

export const mockBuses: BusRoute[] = [
  { id: 'bs001', origin: 'Hà Nội', destination: 'Đà Nẵng', departureTime: '2026-06-01T19:00:00', arrivalTime: '2026-06-02T07:00:00', duration: 720, operator: 'Phương Trang', busType: 'Limousine Giường nằm', price: 320_000, seatsAvailable: 12, amenities: ['WiFi', 'Điều hòa', 'USB sạc', 'Màn hình'] },
  { id: 'bs002', origin: 'Hà Nội', destination: 'Đà Nẵng', departureTime: '2026-06-01T20:00:00', arrivalTime: '2026-06-02T08:30:00', duration: 750, operator: 'Hoàng Long', busType: 'Giường nằm VIP', price: 280_000, seatsAvailable: 5, amenities: ['Điều hòa', 'USB sạc'] },
  { id: 'bs003', origin: 'TP.HCM', destination: 'Đà Lạt', departureTime: '2026-06-01T07:00:00', arrivalTime: '2026-06-01T13:30:00', duration: 390, operator: 'Phương Trang', busType: 'Ghế ngồi VIP', price: 150_000, seatsAvailable: 18, amenities: ['WiFi', 'Điều hòa'] },
  { id: 'bs004', origin: 'TP.HCM', destination: 'Cần Thơ', departureTime: '2026-06-01T06:30:00', arrivalTime: '2026-06-01T09:30:00', duration: 180, operator: 'Kumho Samco', busType: 'Ghế ngồi', price: 90_000, seatsAvailable: 22, amenities: ['Điều hòa'] },
  { id: 'bs005', origin: 'Hà Nội', destination: 'Vinh', departureTime: '2026-06-01T08:00:00', arrivalTime: '2026-06-01T12:30:00', duration: 270, operator: 'Sapa Express', busType: 'Limousine', price: 200_000, seatsAvailable: 7, amenities: ['WiFi', 'Điều hòa', 'Nước uống'] },
]
