import type { AgencyUser } from '../types'

const FULL_PERMS = { canBook: true, canRefund: true, canTopup: true, canViewReports: true, canManageUsers: true, canConfigMarkup: true }
const MANAGER_PERMS = { canBook: true, canRefund: true, canTopup: false, canViewReports: true, canManageUsers: false, canConfigMarkup: false }
const OPERATOR_PERMS = { canBook: true, canRefund: false, canTopup: false, canViewReports: false, canManageUsers: false, canConfigMarkup: false }
const VIEWER_PERMS = { canBook: false, canRefund: false, canTopup: false, canViewReports: true, canManageUsers: false, canConfigMarkup: false }

export const mockAgencyUsers: AgencyUser[] = [
  // TravelCo Hà Nội (ag1)
  { id: 'au01', agencyId: 'ag1', name: 'Trần Thị Agency', email: 'agency@travelco.vn', phone: '0912000002', agencyRole: 'AgencyAdmin', permissions: FULL_PERMS, status: 'Active', createdAt: '2025-01-10T08:00:00Z', lastLoginAt: '2026-05-15T07:30:00Z' },
  { id: 'au02', agencyId: 'ag1', name: 'Lê Văn Seller', email: 'seller@travelco.vn', phone: '0912000003', agencyRole: 'Operator', permissions: OPERATOR_PERMS, status: 'Active', createdAt: '2025-02-01T09:00:00Z', lastLoginAt: '2026-05-15T08:00:00Z' },
  { id: 'au03', agencyId: 'ag1', name: 'Vũ Thị Hoa', email: 'vuhoactv@gmail.com', phone: '0912000020', agencyRole: 'Operator', permissions: OPERATOR_PERMS, status: 'Active', createdAt: '2025-03-15T10:00:00Z', lastLoginAt: '2026-05-14T16:00:00Z' },
  { id: 'au04', agencyId: 'ag1', name: 'Phạm Minh Tuấn', email: 'tuan.pm@travelco.vn', phone: '0912000021', agencyRole: 'Manager', permissions: MANAGER_PERMS, status: 'Active', createdAt: '2025-04-01T09:00:00Z', lastLoginAt: '2026-05-13T09:00:00Z' },
  { id: 'au05', agencyId: 'ag1', name: 'Hoàng Thu Hương', email: 'huong.ht@travelco.vn', phone: '0912000022', agencyRole: 'Viewer', permissions: VIEWER_PERMS, status: 'Inactive', createdAt: '2025-06-01T09:00:00Z', lastLoginAt: '2026-03-01T10:00:00Z' },

  // Saigon Express Travel (ag3)
  { id: 'au06', agencyId: 'ag3', name: 'Nguyễn Thị Minh', email: 'saigonexpress@gmail.com', phone: '0912000011', agencyRole: 'AgencyAdmin', permissions: FULL_PERMS, status: 'Active', createdAt: '2024-12-01T08:00:00Z', lastLoginAt: '2026-05-15T09:00:00Z' },
  { id: 'au07', agencyId: 'ag3', name: 'Trần Công Nam', email: 'nam.tc@saigonexpress.vn', phone: '0912000030', agencyRole: 'Manager', permissions: MANAGER_PERMS, status: 'Active', createdAt: '2025-01-15T09:00:00Z', lastLoginAt: '2026-05-15T08:30:00Z' },
  { id: 'au08', agencyId: 'ag3', name: 'Lý Thị Thu', email: 'thu.lt@saigonexpress.vn', phone: '0912000031', agencyRole: 'Operator', permissions: OPERATOR_PERMS, status: 'Active', createdAt: '2025-02-10T09:00:00Z', lastLoginAt: '2026-05-14T17:00:00Z' },
  { id: 'au09', agencyId: 'ag3', name: 'Đặng Văn Hùng', email: 'hung.dv@saigonexpress.vn', phone: '0912000032', agencyRole: 'Operator', permissions: OPERATOR_PERMS, status: 'Suspended', createdAt: '2025-03-01T09:00:00Z', lastLoginAt: '2026-04-20T10:00:00Z' },

  // Hoàng Long Travel (ag2)
  { id: 'au10', agencyId: 'ag2', name: 'Phạm Văn Hoàng', email: 'hoanglongtravel@gmail.com', phone: '0912000010', agencyRole: 'AgencyAdmin', permissions: FULL_PERMS, status: 'Active', createdAt: '2025-01-05T08:00:00Z', lastLoginAt: '2026-05-14T14:00:00Z' },
  { id: 'au11', agencyId: 'ag2', name: 'Ngô Thị Lan', email: 'lan.nt@hoanglong.vn', phone: '0912000040', agencyRole: 'Manager', permissions: MANAGER_PERMS, status: 'Active', createdAt: '2025-05-01T09:00:00Z', lastLoginAt: '2026-05-12T11:00:00Z' },
  { id: 'au12', agencyId: 'ag2', name: 'Bùi Văn Dũng', email: 'dung.bv@hoanglong.vn', phone: '0912000041', agencyRole: 'Operator', permissions: OPERATOR_PERMS, status: 'Active', createdAt: '2025-06-15T09:00:00Z', lastLoginAt: '2026-05-10T09:00:00Z' },
]
