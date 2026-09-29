<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Make My Marriage — Agent Guide

Collaborative wedding-management web app for Indian weddings. Read `docs/` before
changing behaviour; they are the source of truth:

- `docs/PRD.md` — product scope, user roles (Admin, Manager, Guest), V1 non-goals
- `docs/SYSTEM_DESIGN.md` — architecture (modular monolith on Next.js + Vercel)
- `docs/DATABASE_DESIGN.md` — MongoDB collections, indexes, tenant rules
- `docs/API_DESIGN.md` — REST endpoints, error format, pagination, rate limits

## Stack (exact versions pinned in package.json)

Next.js 16 (App Router, Route Handlers, Turbopack) · React 19 · TypeScript (strict,
`noUncheckedIndexedAccess`) · MongoDB Atlas + Mongoose 9 · Zod 4 · Tailwind CSS 4 ·
Vitest 5 · ESLint 9 + Prettier. Node.js 24 LTS (minimum 20.9).

Next.js 16 specifics already applied:
- `src/proxy.ts` replaces `middleware.ts` (exports `proxy`).
- Route `params` and `cookies()` are async: `const { id } = await params`.

## Commands

```bash
npm install
cp .env.example .env.local   # set MONGODB_URI, SESSION_SECRET, NEXT_PUBLIC_APP_URL
npm run dev                  # http://localhost:3000
npm run typecheck
npm run lint
npm test                     # vitest run (single pass)
npm run build
```

## Structure

```text
src/app/          Pages + /api route handlers. Handlers stay thin.
src/modules/      Domain modules: schemas.ts (Zod), *.model.ts (Mongoose), service.ts
src/server/       Server-only: env, db, auth (sessions/guards), http (errors, handler), security, logger
src/components/   React components (ui/, layout/, feature folders)
src/lib/          Client-safe helpers (money, dates, api-client). Must not import src/server or mongoose.
```

Private API flow: `withHandler` → `requireMember()` / `requireAdmin()` → Zod parse → service → Mongoose.

## Non-negotiable rules (from docs)

1. **Wedding is the tenant.** Every wedding-owned query includes `weddingId`, derived from
   Session → User → WeddingMembership. Never trust a client-supplied `weddingId`.
2. Cross-wedding or missing resources return `404 NOT_FOUND`, not 403.
3. Only member management (invite, remove, change role) is ADMIN-only; everything else is ADMIN + MANAGER.
4. Money is integer paise (`amountPaise`). Wedding date is a `YYYY-MM-DD` string; event times are
   UTC instants rendered in `Wedding.timeZone`.
5. Sessions, password resets and member invitations store only an HMAC-SHA-256 token hash.
   Guest invitation and gallery tokens are stable raw 32-byte base64url secrets (`select: false`),
   per API_DESIGN §44/§108. Never log tokens, passwords or signed URLs.
6. Validate every body/query with Zod (`z.strictObject`) and every ObjectId param before querying.
7. Mutations require a same-origin `Origin` header (`src/server/http/origin.ts`).
8. Events and Vendors are archived (`archivedAt`); Weddings soft-deleted (`deletedAt`);
   Tasks, Guests and Expenses hard-deleted.

## Current status (branch `dev`)

Phase 1 foundation code exists but is **not yet verified**:
- Implemented: signup, login, logout, `GET /api/auth/me`, `POST/GET /api/wedding`
  (transactional wedding + ADMIN membership), onboarding page, dashboard shell,
  MongoDB-backed rate limiting.
- Empty module folders (`.gitkeep`): events, tasks, guests, invitations, expenses, vendors,
  website, photos, livestream, dashboard, email-jobs; server/storage, email, places.
- The last `tsc` run reported errors in `src/modules/weddings/service.ts` and two `LayoutProps`
  usages. Fixes were applied afterwards, but typecheck, lint, tests and `npm run build` have
  **not** been re-run. First task in a new session: run those four commands and fix failures.
- Signup/login need a real MongoDB Atlas URI (transactions require a replica set).

Next phases (PRD §16): Events + Tasks → Guests/Invitations/RSVP → Expenses/Vendors →
Website/Livestream → Gallery/Photos (Cloudflare R2) → production readiness.

## Doc inconsistencies and decisions taken

- Gallery token stored raw (API §108), not hashed as DATABASE_DESIGN §19/§98 suggests.
- Token hashing uses HMAC-SHA-256 keyed with `SESSION_SECRET` (API §44), not plain SHA-256.
- Slug rule: `brideName-groomName-DDMMYYYY` (SYSTEM_DESIGN §27).
- Extra `rate_limits` collection (TTL) beyond the 13 listed in DATABASE_DESIGN §112.

## Local environment notes (Windows)

- An old global npm 9.4.1 in `%APPDATA%\npm` can shadow Node 24's npm 11.
  If `npm -v` shows 9.x, run `npm install -g npm@11` or remove `%APPDATA%\npm\npm*`.
- PowerShell may block `npm.ps1`/`npx.ps1`; use `npm.cmd` / `npx.cmd` or cmd.exe.
- Network is slow; installs can take several minutes.
