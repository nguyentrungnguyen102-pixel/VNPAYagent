export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount)
}

export function formatVNDShort(amount: number): string {
  if (amount >= 1_000_000_000_000) return (amount / 1_000_000_000_000).toFixed(1) + ' nghìn tỷ'
  if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(0) + ' tỷ'
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(0) + ' tr'
  return formatVND(amount)
}

export function formatBillionVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' tỷ'
}

export function maskPhone(phone: string): string {
  if (phone.length < 5) return '***'
  return phone.slice(0, 3) + '*'.repeat(Math.max(0, phone.length - 5)) + phone.slice(-2)
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return '***'
  return local.slice(0, 2) + '***@' + domain
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}g${m > 0 ? m + 'p' : ''}` : `${m}p`
}
