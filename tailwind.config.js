/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vnpay: {
          navy: '#003b73',
          blue: '#00529c',
          red: '#e31e24',
          'red-dark': '#b91c1c',
          'blue-light': '#eef5ff',
          'blue-mid': '#1e6fbf',
        },
        status: {
          hold: '#f59e0b',
          issued: '#10b981',
          cancelled: '#6b7280',
          refund: '#3b82f6',
          pending: '#8b5cf6',
          refunded: '#059669',
        },
      },
    },
  },
  plugins: [],
}
