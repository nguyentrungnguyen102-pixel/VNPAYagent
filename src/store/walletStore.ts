import { create } from 'zustand'
import type { Wallet, Transaction } from '../types'
import { mockWallet, mockTransactions } from '../data/wallet'

interface WalletState {
  wallet: Wallet
  transactions: Transaction[]
  debit: (amount: number, description: string, refId?: string) => void
  credit: (amount: number, description: string, refId?: string) => void
  topup: (amount: number, description: string) => void
}

export const useWalletStore = create<WalletState>()((set, get) => ({
  wallet: { ...mockWallet },
  transactions: [...mockTransactions],
  debit: (amount, description, refId) => {
    const w = get().wallet
    const newBalance = w.balance - amount
    const tx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'booking_debit',
      amount: -amount,
      balanceAfter: newBalance,
      description,
      referenceId: refId,
      createdAt: new Date().toISOString(),
    }
    set({ wallet: { ...w, balance: newBalance }, transactions: [tx, ...get().transactions] })
  },
  credit: (amount, description, refId) => {
    const w = get().wallet
    const newBalance = w.balance + amount
    const tx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'commission_credit',
      amount,
      balanceAfter: newBalance,
      description,
      referenceId: refId,
      createdAt: new Date().toISOString(),
    }
    set({ wallet: { ...w, balance: newBalance }, transactions: [tx, ...get().transactions] })
  },
  topup: (amount, description) => {
    const w = get().wallet
    const newBalance = w.balance + amount
    const tx: Transaction = {
      id: 'tx-' + Date.now(),
      type: 'topup',
      amount,
      balanceAfter: newBalance,
      description,
      createdAt: new Date().toISOString(),
    }
    set({ wallet: { ...w, balance: newBalance }, transactions: [tx, ...get().transactions] })
  },
}))
