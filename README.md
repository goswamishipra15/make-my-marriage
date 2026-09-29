# Make My Marriage

A collaborative wedding-management web app for Indian weddings. See `docs/` for the
PRD, system design, database design and API design.

## Stack

Next.js 16 (App Router + Route Handlers) · TypeScript · MongoDB Atlas + Mongoose ·
Zod · Tailwind CSS · Vitest. Deployed on Vercel.

## Getting started

Requires Node.js 20.9+ (24 LTS recommended).

```bash
npm install
cp .env.example .env.local   # then fill in MONGODB_URI and SESSION_SECRET
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | Purpose                  |
| ------------------- | ------------------------ |
| `npm run dev`       | Start the dev server     |
| `npm run build`     | Production build         |
| `npm run lint`      | ESLint                   |
| `npm run typecheck` | TypeScript, no emit      |
| `npm test`          | Unit tests (Vitest, run) |

## Structure

```text
src/
├── app/            Routes: pages and /api route handlers (thin)
├── modules/        Domain modules: schemas, models, services
├── server/         Server-only infrastructure: env, db, auth, http, security, logger
├── components/     React components (ui, layout, feature components)
├── lib/            Client-safe helpers (money, dates, API client)
└── proxy.ts        Optimistic auth redirect (Next.js 16 "proxy")
```

Request flow for private APIs:
`route handler → withHandler → requireMember/requireAdmin → Zod → service → Mongoose`.
The wedding is always derived from the session's membership, never from client input.

## Status

Phase 1 (Foundation): signup, login, logout, `/api/auth/me`, wedding creation and the
dashboard shell. Remaining modules have empty folders and appear as "Soon" in the nav.
