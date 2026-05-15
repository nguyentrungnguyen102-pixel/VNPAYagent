import type { SupportTicket } from '../types'

export const mockTickets: SupportTicket[] = [
  { id: 'TK001', bookingId: 'BK001', pnr: 'VNABCD', subject: 'Yêu cầu đổi giờ bay VN123', issueType: 'flight_time_change', description: 'Khách muốn đổi chuyến bay từ 6:00 sang 12:00 cùng ngày 01/06/2026.', status: 'InProgress', createdAt: '2026-05-14T11:00:00Z', updatedAt: '2026-05-15T08:00:00Z', createdBy: 'u3', agencyId: 'ag1' },
  { id: 'TK002', bookingId: 'BK008', pnr: 'VN5521', subject: 'Sửa tên hành khách quốc tế', issueType: 'wrong_name', description: 'Tên hành khách bị nhập sai: "Nguyen Van A" cần sửa thành "Nguyen Van An"', status: 'Open', createdAt: '2026-05-15T07:30:00Z', updatedAt: '2026-05-15T07:30:00Z', createdBy: 'u2', agencyId: 'ag1' },
  { id: 'TK003', bookingId: 'BK003', pnr: 'VNIJKL', subject: 'Chưa nhận tiền hoàn BK003', issueType: 'refund_error', description: 'Đơn hoàn đã được duyệt nhưng tiền chưa vào ví sau 3 ngày.', status: 'Resolved', createdAt: '2026-05-12T15:00:00Z', updatedAt: '2026-05-13T10:00:00Z', createdBy: 'u3', agencyId: 'ag1' },
  { id: 'TK004', bookingId: 'BK007', subject: 'Thanh toán khách sạn bị lỗi', issueType: 'payment_issue', description: 'Booking khách sạn đang ở trạng thái PendingApproval quá 24h, cần xác nhận.', status: 'Open', createdAt: '2026-05-15T08:00:00Z', updatedAt: '2026-05-15T08:00:00Z', createdBy: 'u2', agencyId: 'ag1' },
]
