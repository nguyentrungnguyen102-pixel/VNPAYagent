import { useAuthStore } from '../../store/authStore'
import F1Dashboard from './F1Dashboard'
import F2Dashboard from './F2Dashboard'
import F3Dashboard from './F3Dashboard'

export default function DashboardPage() {
  const user = useAuthStore(s => s.user)
  if (!user) return null
  if (user.role === 'F1') return <F1Dashboard />
  if (user.role === 'F2') return <F2Dashboard />
  return <F3Dashboard />
}
