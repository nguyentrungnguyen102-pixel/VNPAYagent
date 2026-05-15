import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from './store/themeStore'
import { useAuthStore } from './store/authStore'
import AppShell from './components/layout/AppShell'
import LoginPage from './pages/auth/LoginPage'
import OTPPage from './pages/auth/OTPPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import FlightSearchPage from './pages/flight/FlightSearchPage'
import FlightResultsPage from './pages/flight/FlightResultsPage'
import FlightHoldPage from './pages/flight/FlightHoldPage'
import FlightIssuePage from './pages/flight/FlightIssuePage'
import BusSearchPage from './pages/bus/BusSearchPage'
import BusResultsPage from './pages/bus/BusResultsPage'
import BusBookingPage from './pages/bus/BusBookingPage'
import TaxiBookingPage from './pages/taxi/TaxiBookingPage'
import MovieListPage from './pages/movie/MovieListPage'
import MovieDetailPage from './pages/movie/MovieDetailPage'
import SeatSelectionPage from './pages/movie/SeatSelectionPage'
import MoviePaymentPage from './pages/movie/MoviePaymentPage'
import HotelSearchPage from './pages/hotel/HotelSearchPage'
import HotelResultsPage from './pages/hotel/HotelResultsPage'
import HotelDetailPage from './pages/hotel/HotelDetailPage'
import HotelBookingPage from './pages/hotel/HotelBookingPage'
import HotelApprovalPage from './pages/hotel/HotelApprovalPage'
import BookingListPage from './pages/mmb/BookingListPage'
import BookingDetailPage from './pages/mmb/BookingDetailPage'
import RefundPage from './pages/mmb/RefundPage'
import RebookPage from './pages/mmb/RebookPage'
import WalletPage from './pages/wallet/WalletPage'
import TopUpPage from './pages/wallet/TopUpPage'
import TransactionHistoryPage from './pages/wallet/TransactionHistoryPage'
import InvoiceRequestPage from './pages/invoice/InvoiceRequestPage'
import InvoicePreviewPage from './pages/invoice/InvoicePreviewPage'
import CommissionConfigPage from './pages/admin/CommissionConfigPage'
import KillSwitchPage from './pages/admin/KillSwitchPage'
import CreditManagementPage from './pages/admin/CreditManagementPage'
import FraudDetectionPage from './pages/admin/FraudDetectionPage'
import UserManagementPage from './pages/admin/UserManagementPage'
import MarkupConfigPage from './pages/agency/MarkupConfigPage'
import F3ManagementPage from './pages/agency/F3ManagementPage'
import AgencyUserPage from './pages/agency/AgencyUserPage'
import GMVDashboardPage from './pages/analytics/GMVDashboardPage'
import AgencyRankingPage from './pages/analytics/AgencyRankingPage'
import TicketListPage from './pages/support/TicketListPage'
import CreateTicketPage from './pages/support/CreateTicketPage'
import TicketDetailPage from './pages/support/TicketDetailPage'
import type { Role } from './types'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

function RoleGuard({ roles, children }: { roles: Role[]; children: React.ReactNode }) {
  const user = useAuthStore(s => s.user)
  if (!user || !roles.includes(user.role)) return <Navigate to="/" replace />
  return <>{children}</>
}

export default function App() {
  const theme = useThemeStore(s => s.theme)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<PrivateRoute><AppShell /></PrivateRoute>}>
          <Route index element={<DashboardPage />} />
          <Route path="flight/search" element={<FlightSearchPage />} />
          <Route path="flight/results" element={<FlightResultsPage />} />
          <Route path="flight/hold/:offerId" element={<FlightHoldPage />} />
          <Route path="flight/issue/:pnr" element={<FlightIssuePage />} />
          <Route path="bus/search" element={<BusSearchPage />} />
          <Route path="bus/results" element={<BusResultsPage />} />
          <Route path="bus/book/:routeId" element={<BusBookingPage />} />
          <Route path="taxi" element={<TaxiBookingPage />} />
          <Route path="movie" element={<MovieListPage />} />
          <Route path="movie/:movieId" element={<MovieDetailPage />} />
          <Route path="movie/:movieId/seats/:showtimeId" element={<SeatSelectionPage />} />
          <Route path="movie/payment" element={<MoviePaymentPage />} />
          <Route path="hotel/search" element={<HotelSearchPage />} />
          <Route path="hotel/results" element={<HotelResultsPage />} />
          <Route path="hotel/:hotelId" element={<HotelDetailPage />} />
          <Route path="hotel/:hotelId/book/:roomId" element={<HotelBookingPage />} />
          <Route path="hotel/approvals" element={<HotelApprovalPage />} />
          <Route path="bookings" element={<BookingListPage />} />
          <Route path="bookings/:bookingId" element={<BookingDetailPage />} />
          <Route path="bookings/:bookingId/refund" element={<RefundPage />} />
          <Route path="bookings/:bookingId/rebook" element={<RebookPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="wallet/topup" element={<TopUpPage />} />
          <Route path="wallet/history" element={<TransactionHistoryPage />} />
          <Route path="invoices/request" element={<InvoiceRequestPage />} />
          <Route path="invoices/:invoiceId" element={<InvoicePreviewPage />} />

          {/* F1 only */}
          <Route path="admin/users" element={<RoleGuard roles={['F1']}><UserManagementPage /></RoleGuard>} />
          <Route path="admin/commission" element={<RoleGuard roles={['F1']}><CommissionConfigPage /></RoleGuard>} />
          <Route path="admin/kill-switch" element={<RoleGuard roles={['F1']}><KillSwitchPage /></RoleGuard>} />
          <Route path="admin/credit" element={<RoleGuard roles={['F1']}><CreditManagementPage /></RoleGuard>} />
          <Route path="admin/fraud" element={<RoleGuard roles={['F1']}><FraudDetectionPage /></RoleGuard>} />
          <Route path="analytics/ranking" element={<RoleGuard roles={['F1']}><AgencyRankingPage /></RoleGuard>} />

          {/* F2 only */}
          <Route path="agency/users" element={<RoleGuard roles={['F2']}><AgencyUserPage /></RoleGuard>} />
          <Route path="agency/markup" element={<RoleGuard roles={['F1', 'F2']}><MarkupConfigPage /></RoleGuard>} />
          <Route path="agency/sellers" element={<RoleGuard roles={['F1', 'F2']}><F3ManagementPage /></RoleGuard>} />

          {/* Analytics */}
          <Route path="analytics/gmv" element={<GMVDashboardPage />} />

          {/* Support */}
          <Route path="support" element={<TicketListPage />} />
          <Route path="support/create" element={<CreateTicketPage />} />
          <Route path="support/:ticketId" element={<TicketDetailPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
