import type { CommissionRule } from '../types'

export const mockCommissionRules: CommissionRule[] = [
  { id: 'cr001', serviceType: 'flight', label: 'Hàng không nội địa', netRate: 0.027, agentRate: 0.002, isActive: true },
  { id: 'cr002', serviceType: 'flight', provider: 'Quốc tế', label: 'Hàng không quốc tế', netRate: 0.0079, agentRate: 0.001, isActive: true },
  { id: 'cr003', serviceType: 'movie', provider: 'CGV', label: 'CGV Cinema', netRate: 0.074, agentRate: 0.035, isActive: true },
  { id: 'cr004', serviceType: 'movie', provider: 'Lotte', label: 'Lotte Cinema', netRate: 0.074, agentRate: 0.032, isActive: true },
  { id: 'cr005', serviceType: 'movie', provider: 'BHD', label: 'BHD Star Cinema', netRate: 0.074, agentRate: 0.030, isActive: true },
  { id: 'cr006', serviceType: 'bus', label: 'Xe khách', netRate: 0.043, agentRate: 0.025, isActive: true },
  { id: 'cr007', serviceType: 'taxi', provider: 'Xanh SM', label: 'Taxi Xanh SM', netRate: 0.048, agentRate: 0.030, isActive: true },
  { id: 'cr008', serviceType: 'taxi', provider: 'Mai Linh', label: 'Taxi Mai Linh', netRate: 0.045, agentRate: 0.028, isActive: true },
  { id: 'cr009', serviceType: 'hotel', label: 'Khách sạn', netRate: 0.08, agentRate: 0.05, isActive: true },
]
