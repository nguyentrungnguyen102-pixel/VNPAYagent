import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Role } from '../types'

const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Nguyễn Văn Admin', email: 'admin@vnpay.vn', phone: '0912000001', role: 'F1' },
  { id: 'u2', name: 'Trần Thị Agency', email: 'agency@travelco.vn', phone: '0912000002', role: 'F2', agencyId: 'ag1' },
  { id: 'u3', name: 'Lê Văn Seller', email: 'seller@travelco.vn', phone: '0912000003', role: 'F3', agencyId: 'ag2', parentAgencyId: 'ag1' },
]

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  otpEmail: string | null
  login: (email: string, _password: string) => Promise<{ requiresOTP: boolean }>
  verifyOTP: (_code: string) => Promise<void>
  logout: () => void
  quickLogin: (role: Role) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      otpEmail: null,
      login: async (email: string, _password: string) => {
        await new Promise(r => setTimeout(r, 800))
        const found = MOCK_USERS.find(u => u.email === email)
        if (!found) throw new Error('Email không tồn tại')
        set({ otpEmail: email })
        return { requiresOTP: true }
      },
      verifyOTP: async (_code: string) => {
        await new Promise(r => setTimeout(r, 600))
        const email = get().otpEmail
        const user = MOCK_USERS.find(u => u.email === email)
        if (!user) throw new Error('Phiên hết hạn')
        set({ user, isAuthenticated: true, otpEmail: null })
      },
      logout: () => set({ user: null, isAuthenticated: false, otpEmail: null }),
      quickLogin: (role: Role) => {
        const user = MOCK_USERS.find(u => u.role === role)
        if (user) set({ user, isAuthenticated: true })
      },
    }),
    { name: 'vnpay-auth', partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }) }
  )
)
