import type { FlightOffer } from '../types'

export const mockFlights: FlightOffer[] = [
  {
    id: 'fl001',
    segments: [{
      flightNumber: 'VN123', airline: 'Vietnam Airlines', airlineCode: 'VN',
      origin: 'HAN', originCity: 'Hà Nội', destination: 'SGN', destinationCity: 'TP.HCM',
      departureTime: '2026-06-01T06:00:00', arrivalTime: '2026-06-01T08:10:00',
      duration: 130, aircraft: 'A321', cabinClass: 'Economy',
    }],
    baseFare: 3_200_000, tax: 650_000, totalFare: 3_850_000,
    seatsAvailable: 8, fareClass: 'Y', isInternational: false,
    baggageAllowance: '23kg', refundable: true,
  },
  {
    id: 'fl002',
    segments: [{
      flightNumber: 'VJ201', airline: 'VietJet Air', airlineCode: 'VJ',
      origin: 'HAN', originCity: 'Hà Nội', destination: 'SGN', destinationCity: 'TP.HCM',
      departureTime: '2026-06-01T08:30:00', arrivalTime: '2026-06-01T10:45:00',
      duration: 135, aircraft: 'A320', cabinClass: 'Economy',
    }],
    baseFare: 2_100_000, tax: 580_000, totalFare: 2_680_000,
    seatsAvailable: 15, fareClass: 'K', isInternational: false,
    baggageAllowance: '7kg', refundable: false,
  },
  {
    id: 'fl003',
    segments: [{
      flightNumber: 'QH801', airline: 'Bamboo Airways', airlineCode: 'QH',
      origin: 'HAN', originCity: 'Hà Nội', destination: 'SGN', destinationCity: 'TP.HCM',
      departureTime: '2026-06-01T11:15:00', arrivalTime: '2026-06-01T13:25:00',
      duration: 130, aircraft: 'E190', cabinClass: 'Economy',
    }],
    baseFare: 2_800_000, tax: 620_000, totalFare: 3_420_000,
    seatsAvailable: 4, fareClass: 'M', isInternational: false,
    baggageAllowance: '23kg', refundable: true,
  },
  {
    id: 'fl004',
    segments: [{
      flightNumber: 'VN552', airline: 'Vietnam Airlines', airlineCode: 'VN',
      origin: 'SGN', originCity: 'TP.HCM', destination: 'NRT', destinationCity: 'Tokyo',
      departureTime: '2026-06-02T00:30:00', arrivalTime: '2026-06-02T08:30:00',
      duration: 360, aircraft: 'B787', cabinClass: 'Economy',
    }],
    baseFare: 12_500_000, tax: 2_800_000, totalFare: 15_300_000,
    seatsAvailable: 6, fareClass: 'Y', isInternational: true,
    baggageAllowance: '23kg', refundable: true,
  },
  {
    id: 'fl005',
    segments: [{
      flightNumber: 'VN212', airline: 'Vietnam Airlines', airlineCode: 'VN',
      origin: 'SGN', originCity: 'TP.HCM', destination: 'HAN', destinationCity: 'Hà Nội',
      departureTime: '2026-06-01T14:00:00', arrivalTime: '2026-06-01T16:15:00',
      duration: 135, aircraft: 'A321', cabinClass: 'Economy',
    }],
    baseFare: 3_100_000, tax: 650_000, totalFare: 3_750_000,
    seatsAvailable: 12, fareClass: 'Y', isInternational: false,
    baggageAllowance: '23kg', refundable: true,
  },
  {
    id: 'fl006',
    segments: [{
      flightNumber: 'VN136', airline: 'Vietnam Airlines', airlineCode: 'VN',
      origin: 'HAN', originCity: 'Hà Nội', destination: 'DAD', destinationCity: 'Đà Nẵng',
      departureTime: '2026-06-01T07:00:00', arrivalTime: '2026-06-01T08:15:00',
      duration: 75, aircraft: 'A320', cabinClass: 'Economy',
    }],
    baseFare: 1_800_000, tax: 450_000, totalFare: 2_250_000,
    seatsAvailable: 20, fareClass: 'N', isInternational: false,
    baggageAllowance: '23kg', refundable: false,
  },
  {
    id: 'fl007',
    segments: [{
      flightNumber: 'VJ301', airline: 'VietJet Air', airlineCode: 'VJ',
      origin: 'SGN', originCity: 'TP.HCM', destination: 'BKK', destinationCity: 'Bangkok',
      departureTime: '2026-06-03T09:00:00', arrivalTime: '2026-06-03T10:30:00',
      duration: 90, aircraft: 'A320', cabinClass: 'Economy',
    }],
    baseFare: 4_200_000, tax: 980_000, totalFare: 5_180_000,
    seatsAvailable: 9, fareClass: 'S', isInternational: true,
    baggageAllowance: '20kg', refundable: false,
  },
]
