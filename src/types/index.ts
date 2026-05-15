export type Role = 'F1' | 'F2' | 'F3'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: Role
  agencyId?: string
  parentAgencyId?: string
  avatar?: string
}

export type BookingStatus = 'Hold' | 'Issued' | 'Cancelled' | 'RefundPending' | 'Refunded' | 'PendingApproval'
export type ServiceType = 'flight' | 'bus' | 'taxi' | 'movie' | 'hotel'
export type TransactionType = 'topup' | 'booking_debit' | 'commission_credit' | 'refund_credit' | 'adjustment' | 'penalty_debit'

export interface Passenger {
  firstName: string
  lastName: string
  dob: string
  nationality: string
  idNumber: string
  phone: string
  email: string
  consentGiven: boolean
}

export interface Ancillary {
  type: 'luggage' | 'meal' | 'seat'
  description: string
  price: number
  quantity: number
}

export interface RefundInfo {
  requestedAt: string
  reason: string
  penaltyAmount: number
  refundableAmount: number
  approvedAt?: string
  approvedBy?: string
}

export interface Booking {
  id: string
  pnr?: string
  serviceType: ServiceType
  status: BookingStatus
  totalAmount: number
  commission: number
  markup?: number
  createdAt: string
  updatedAt: string
  agentId: string
  agencyId?: string
  description: string
  passengers?: Passenger[]
  ancillaries?: Ancillary[]
  refundInfo?: RefundInfo
  holdExpiresAt?: string
}

export interface FlightSegment {
  flightNumber: string
  airline: string
  airlineCode: string
  origin: string
  originCity: string
  destination: string
  destinationCity: string
  departureTime: string
  arrivalTime: string
  duration: number
  aircraft: string
  cabinClass: 'Economy' | 'Business'
}

export interface FlightOffer {
  id: string
  segments: FlightSegment[]
  baseFare: number
  tax: number
  totalFare: number
  seatsAvailable: number
  fareClass: string
  isInternational: boolean
  baggageAllowance: string
  refundable: boolean
}

export interface BusRoute {
  id: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: number
  operator: string
  busType: string
  price: number
  seatsAvailable: number
  amenities: string[]
}

export interface Movie {
  id: string
  title: string
  genre: string
  duration: number
  rating: string
  posterUrl: string
  description: string
  releaseDate: string
}

export interface Showtime {
  id: string
  movieId: string
  cinema: string
  date: string
  time: string
  format: string
  price: number
  seatsTotal: number
  seatsTaken: number[]
}

export interface Hotel {
  id: string
  name: string
  city: string
  address: string
  stars: number
  rating: number
  reviewCount: number
  imageUrl: string
  amenities: string[]
}

export interface RoomType {
  id: string
  hotelId: string
  name: string
  description: string
  pricePerNight: number
  maxGuests: number
  bedType: string
  available: boolean
}

export interface Wallet {
  id: string
  agentId: string
  balance: number
  creditLimit: number
  alertThreshold: number
  frozenAmount: number
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  balanceAfter: number
  description: string
  referenceId?: string
  createdAt: string
}

export interface CommissionRule {
  id: string
  serviceType: ServiceType
  provider?: string
  netRate: number
  agentRate: number
  isActive: boolean
  label: string
}

export interface Agency {
  id: string
  name: string
  code: string
  ownerName: string
  phone: string
  email: string
  city: string
  gmv: number
  bookingCount: number
  balance: number
  creditLimit: number
  loginBlocked: boolean
  walletBlocked: boolean
  parentId?: string
  role: Role
}

export interface FraudAlert {
  id: string
  agencyId: string
  agencyName: string
  alertType: 'bulk_issue' | 'bulk_refund' | 'single_ip' | 'rapid_fire'
  description: string
  transactionCount: number
  timeWindowMinutes: number
  detectedAt: string
  status: 'New' | 'Investigating' | 'Resolved' | 'Dismissed'
}

export interface SupportTicket {
  id: string
  bookingId: string
  pnr?: string
  subject: string
  issueType: 'flight_time_change' | 'wrong_name' | 'refund_error' | 'payment_issue' | 'other'
  description: string
  status: 'Open' | 'InProgress' | 'Resolved' | 'Closed'
  createdAt: string
  updatedAt: string
  createdBy: string
  agencyId: string
}

export type Scenario = 'success' | 'timeout' | 'empty' | 'price_changed' | 'hold_expired'
