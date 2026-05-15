import type { Agency } from '../types'

export const mockAgencies: Agency[] = [
  { id: 'ag1', name: 'TravelCo Hà Nội', code: 'TC-HN01', ownerName: 'Trần Thị Agency', phone: '0912000002', email: 'agency@travelco.vn', city: 'Hà Nội', gmv: 1_250_000_000, bookingCount: 842, balance: 285_000_000, creditLimit: 50_000_000, loginBlocked: false, walletBlocked: false, role: 'F2' },
  { id: 'ag2', name: 'Hoàng Long Travel', code: 'HL-HN02', ownerName: 'Phạm Văn Hoàng', phone: '0912000010', email: 'hoanglongtravel@gmail.com', city: 'Hà Nội', gmv: 980_000_000, bookingCount: 654, balance: 125_000_000, creditLimit: 30_000_000, loginBlocked: false, walletBlocked: false, role: 'F2' },
  { id: 'ag3', name: 'Saigon Express Travel', code: 'SE-HCM01', ownerName: 'Nguyễn Thị Minh', phone: '0912000011', email: 'saigonexpress@gmail.com', city: 'TP.HCM', gmv: 2_100_000_000, bookingCount: 1423, balance: 450_000_000, creditLimit: 100_000_000, loginBlocked: false, walletBlocked: false, role: 'F2' },
  { id: 'ag4', name: 'Mekong Tour', code: 'MT-CT01', ownerName: 'Lê Minh Tuan', phone: '0912000012', email: 'mekongtour@gmail.com', city: 'Cần Thơ', gmv: 650_000_000, bookingCount: 421, balance: 85_000_000, creditLimit: 20_000_000, loginBlocked: false, walletBlocked: false, role: 'F2' },
  { id: 'ag5', name: 'Da Nang Wings', code: 'DW-DN01', ownerName: 'Trần Văn Đà', phone: '0912000013', email: 'danangwings@gmail.com', city: 'Đà Nẵng', gmv: 890_000_000, bookingCount: 597, balance: 160_000_000, creditLimit: 40_000_000, loginBlocked: true, walletBlocked: true, role: 'F2' },
  { id: 'ag6', name: 'Lê Văn Seller', code: 'F3-TC01', ownerName: 'Lê Văn Seller', phone: '0912000003', email: 'seller@travelco.vn', city: 'Hà Nội', gmv: 125_000_000, bookingCount: 87, balance: 15_000_000, creditLimit: 0, loginBlocked: false, walletBlocked: false, parentId: 'ag1', role: 'F3' },
  { id: 'ag7', name: 'Vũ Thị Hoa', code: 'F3-TC02', ownerName: 'Vũ Thị Hoa', phone: '0912000020', email: 'vuhoactv@gmail.com', city: 'Hà Nội', gmv: 98_000_000, bookingCount: 65, balance: 8_500_000, creditLimit: 0, loginBlocked: false, walletBlocked: false, parentId: 'ag1', role: 'F3' },
]
