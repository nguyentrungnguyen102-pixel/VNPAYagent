import type { Wallet, Transaction } from '../types'

export const mockWallet: Wallet = {
  id: 'w1',
  agentId: 'u2',
  balance: 285_000_000,
  creditLimit: 50_000_000,
  alertThreshold: 10,
  frozenAmount: 0,
}

export const mockTransactions: Transaction[] = [
  { id: 'tx001', type: 'topup', amount: 100_000_000, balanceAfter: 385_000_000, description: 'Nạp ví qua VietcomBank', createdAt: '2026-05-14T09:00:00Z' },
  { id: 'tx002', type: 'booking_debit', amount: -3_850_000, balanceAfter: 381_150_000, description: 'Vé máy bay VN123 HAN-SGN', referenceId: 'BK001', createdAt: '2026-05-14T10:30:00Z' },
  { id: 'tx003', type: 'commission_credit', amount: 7_700, balanceAfter: 381_157_700, description: 'Hoa hồng vé VN123', referenceId: 'BK001', createdAt: '2026-05-14T10:31:00Z' },
  { id: 'tx004', type: 'booking_debit', amount: -1_200_000, balanceAfter: 379_957_700, description: 'Vé xem phim CGV - Avengers', referenceId: 'BK005', createdAt: '2026-05-13T15:00:00Z' },
  { id: 'tx005', type: 'commission_credit', amount: 42_000, balanceAfter: 379_999_700, description: 'Hoa hồng vé phim CGV', referenceId: 'BK005', createdAt: '2026-05-13T15:01:00Z' },
  { id: 'tx006', type: 'booking_debit', amount: -2_500_000, balanceAfter: 377_499_700, description: 'Xe khách Hà Nội - Đà Nẵng', referenceId: 'BK008', createdAt: '2026-05-12T08:00:00Z' },
  { id: 'tx007', type: 'refund_credit', amount: 3_200_000, balanceAfter: 380_699_700, description: 'Hoàn tiền BK003 - khấu trừ phí', referenceId: 'BK003', createdAt: '2026-05-11T14:00:00Z' },
  { id: 'tx008', type: 'topup', amount: 50_000_000, balanceAfter: 430_699_700, description: 'Nạp ví qua MB Bank', createdAt: '2026-05-10T11:00:00Z' },
  { id: 'tx009', type: 'booking_debit', amount: -145_000_000, balanceAfter: 285_000_000, description: 'Vé máy bay VN552 SGN-NRT (quốc tế)', referenceId: 'BK012', createdAt: '2026-05-09T09:00:00Z' },
  { id: 'tx010', type: 'commission_credit', amount: 145_000, balanceAfter: 285_145_000, description: 'Hoa hồng vé quốc tế VN552', referenceId: 'BK012', createdAt: '2026-05-09T09:01:00Z' },
]
