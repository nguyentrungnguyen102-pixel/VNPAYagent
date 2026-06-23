# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VNPAYagent is a fully client-side React prototype of a Vietnamese travel agency B2B platform. It has no real backend — all data is mocked. The UI is entirely in Vietnamese and targets F1 (Admin), F2 (Agency), and F3 (Seller/CTV) user roles.

## Commands

```bash
npm run dev       # Start Vite dev server with hot reload
npm run build     # Type-check with tsc, then bundle with Vite → dist/
npm run preview   # Serve the production build locally
```

There are no tests and no linter configured.

## Architecture

### Entry & Routing

`src/main.tsx` → `src/App.tsx` uses `HashRouter` (required for GitHub Pages). All routes under `/` are protected by `PrivateRoute` (redirects to `/login` if unauthenticated). A `RoleGuard` wraps admin and agency sections to enforce F1/F2 access.

### Layout

`AppShell.tsx` composes the full page: `Sidebar` (role-filtered nav links) + `TopBar` (user profile, theme toggle) + a `<Outlet>` for page content. A floating dev scenario panel sits bottom-right for simulating API responses.

### Role System

Three roles govern what nav items and pages are visible:
- **F1** – platform admin: commission config, kill switch per agency, fraud alerts, credit limits, agency ranking
- **F2** – agency operator: markup config per service, manage own users and F3 sellers
- **F3** – seller (CTV): booking-only access

Role is stored in `authStore` and read by `Sidebar` and `RoleGuard`.

### State (Zustand)

All stores persist to `localStorage` via Zustand middleware:
- `authStore` – current user, OTP flow, 3 quick-login mock users
- `themeStore` – light/dark mode (toggles `dark` class on `<html>`)
- `walletStore` – balance, credit limit, frozen amount, transaction list
- `scenarioStore` – active dev scenario (`success | timeout | empty | price_changed | hold_expired`)

### Mock Data

`src/data/` contains static TypeScript files that stand in for API responses. Pages import directly from these files. There is no API client or fetch layer.

### Page Structure

Pages live under `src/pages/<service>/`. Each service follows a multi-step flow pattern:

| Service | Flow |
|---------|------|
| Flight  | Search → Results → Hold → Issue |
| Bus     | Search → Results → Booking |
| Hotel   | Search → Results → Detail → Booking → Approvals |
| Movie   | List → Detail → Seat Selection → Payment |
| Taxi    | Direct Booking |
| MMB     | Booking List → Detail → Refund / Rebook |

### Styling Conventions

- **Tailwind CSS** with dark mode via `class` strategy — always pair light/dark variants: `bg-white dark:bg-gray-800`
- **VNPAY brand colors** defined in `tailwind.config.js`: `vnpay-navy` (#003b73), `vnpay-blue` (#00529c), `vnpay-red` (#e31e24)
- **Status badge colors** also in config: `hold`, `issued`, `cancelled`, `refund`, `pending`, `refunded`
- **Font**: Be Vietnam Pro via Google Fonts preconnect in `index.html`
- Use `cn()` from `src/utils/cn.ts` (clsx + tailwind-merge) for conditional classNames

### Utilities

- `src/utils/formatters.ts` — Vietnamese currency (`formatVND`), date/time (Vietnamese locale), phone/email masking, flight duration formatting. Use these for all display formatting.
- `src/utils/constants.ts` — `APP_VERSION` and other app-wide constants
- `src/types/index.ts` — all shared TypeScript interfaces (`User`, `Booking`, `Flight`, `Hotel`, `WalletTransaction`, etc.). Check here before defining new types.

## Deployment

GitHub Actions (`.github/workflows/pages.yml`) builds on push to `main` and deploys `dist/` to `gh-pages`. The Vite config sets `base: './'` for relative asset paths on GitHub Pages.
