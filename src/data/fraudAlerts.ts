import type { FraudAlert } from '../types'

export const mockFraudAlerts: FraudAlert[] = [
  { id: 'fr001', agencyId: 'ag5', agencyName: 'Da Nang Wings', alertType: 'bulk_issue', description: '47 vé được xuất trong 18 phút từ 1 IP (171.248.x.x)', transactionCount: 47, timeWindowMinutes: 18, detectedAt: '2026-05-15T06:30:00Z', status: 'New' },
  { id: 'fr002', agencyId: 'ag4', agencyName: 'Mekong Tour', alertType: 'bulk_refund', description: '23 yêu cầu hoàn vé liên tiếp trong 25 phút', transactionCount: 23, timeWindowMinutes: 25, detectedAt: '2026-05-14T14:15:00Z', status: 'Investigating' },
  { id: 'fr003', agencyId: 'ag2', agencyName: 'Hoàng Long Travel', alertType: 'rapid_fire', description: '15 giao dịch từ thiết bị mới chưa xác thực', transactionCount: 15, timeWindowMinutes: 10, detectedAt: '2026-05-13T09:00:00Z', status: 'Resolved' },
  { id: 'fr004', agencyId: 'ag3', agencyName: 'Saigon Express Travel', alertType: 'single_ip', description: 'Đăng nhập từ 8 thiết bị khác nhau trong 1 giờ', transactionCount: 8, timeWindowMinutes: 60, detectedAt: '2026-05-12T18:00:00Z', status: 'Dismissed' },
]
