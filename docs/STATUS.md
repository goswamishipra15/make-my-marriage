# Project Status — Make My Marriage

Living progress log for the project. This is the single source of truth for **what is
done, what is verified, and what comes next**. The other docs in `docs/` describe what
the product *should* be; this file describes where the build actually is.

## How to keep this file current

Update this file at the end of every work session that changes code, and before
committing:

1. Tick or add rows in **Phase progress** if a feature moved state.
2. Update **Implemented** / **Not started** if files or modules were added or removed.
3. Re-run the four commands below, record the real results (and the date) in
   **Verification status**. Do not mark something verified that you did not run.
4. Add a dated entry at the top of **Change log** — one short paragraph, what changed
   and why, plus the commit hash once committed.
5. Move anything newly discovered into **Open items and blockers**, and delete items
   that are resolved.

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Keep entries factual and short. If a claim is not verified, say so explicitly.

---

## Snapshot

| | |
| --- | --- |
| Branch | `dev` |
| Last updated | 2026-09-30 |
| Last commit before update | `441cdd9` |
| Current phase | Phase 1 — Foundation (partially complete) |
| Deployed | Not yet |

## Verification status

Recorded 2026-09-30, after the Stitch auth screens change.

| Check | Result | Notes |
| --- | --- | --- |
| `npm run typecheck` | Pass | `tsc --noEmit` clean |
| `npm test` | Pass | Vitest: 4 files, 15 tests |
| `npm run build` | **Unknown** | Last pass was before the auth screen rebuild. Re-run stalled while `npm run dev` was running; the dev server compiles `/signup`, `/onboarding` and `/api/auth/signup` without errors |
| `npm run lint` | **Unknown** | ESLint does not complete on this Windows machine; see Open items |
| Manual auth flow | Partial | Signup → onboarding ran against MongoDB Atlas (dev log); user reports sign in works. Wedding creation → dashboard not yet confirmed |

## Phase progress

Phases follow `docs/PRD.md` §16.

| Phase | Scope | State |
| --- | --- | --- |
| 1. Foundation | Authentication | Working against Atlas (manual check); Stitch-designed screens |
| | Wedding creation | Code complete, not yet confirmed against a live DB |
| | Wedding members | Partial — model only, no invite/remove/role endpoints |
| | Dashboard shell | Complete (static shell, no live data) |
| 2. Planning | Events, Tasks | Not started |
| 3. Guests | Guests, Invitations, RSVP, Email, WhatsApp share | Not started |
| 4. Financial and Vendors | Expenses, My Vendors, Vendor discovery | Not started |
| 5. Wedding Experience | Website, Themes, YouTube livestream | Not started |
| 6. Memories | Gallery, Guest uploads, Albums, Private sharing, QR | Not started |
| 7. Production Readiness | Errors, security review, responsive, perf, tests, analytics, deploy, monitoring | Not started |

Outside the phase plan, a full marketing landing page was built (see Change log).

## Implemented

**API routes** (`src/app/api/`)

- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `POST /api/wedding`, `GET /api/wedding` — transactional wedding + ADMIN membership

**Domain modules** (`src/modules/`)

- `auth/` — `user.model.ts`, `session.model.ts`, `schemas.ts`, `service.ts`, `me.ts`
- `weddings/` — `wedding.model.ts`, `schemas.ts`, `service.ts`, `slug.ts` (+ tests for schemas and slug)
- `members/` — `membership.model.ts` only

**Server infrastructure** (`src/server/`)

- `env.ts` validated environment, `db/mongoose.ts` cached connection
- `auth/` — `session.ts` (HMAC-hashed session tokens), `password.ts` (argon2), `context.ts`, `page-guards.ts`
- `http/` — `handler.ts` (`withHandler`), `errors.ts`, `responses.ts`, `validation.ts`, `origin.ts` (same-origin guard)
- `security/` — `tokens.ts`, `rate-limit.ts` + `rate-limit-rules.ts` (MongoDB-backed, TTL collection)
- `logger.ts`, and `src/proxy.ts` (Next.js 16 replacement for `middleware.ts`)

**UI** (`src/app/`, `src/components/`)

- Marketing landing page: `site-header`, `hero`, `pillars`, `family-roles`, `comparison`, `testimonial`, `cta`, `site-footer`, `wordmark`. Family and stories sections use photos from `public/marketing/`
- Auth (Stitch "Sign In & Sign Up" design): `/login`, `/signup` under a shared `(auth)` layout — `auth-shell`, `auth-card` (sign in / sign up switcher), `auth-field`, `password-field` (reveal toggle), `auth-submit`, `login-form`, `signup-form`
- Onboarding: `/onboarding` with `create-wedding-form`, inside the same auth shell
- App shell: `/app` layout, `app-nav`, `logout-button`, `/app/dashboard` with `panel` and `stat-card`
- Primitives: `ui/button`, `ui/text-field`, `ui/form-alert`, `ui/icon`; design tokens in `app/globals.css`

**Client-safe helpers** (`src/lib/`)

- `money.ts` (integer paise), `dates.ts`, `api-client.ts`, `email.ts` (+ tests for money and dates)

## Not started

Placeholder folders exist with `.gitkeep` and no code:

- `src/modules/`: `events`, `tasks`, `guests`, `invitations`, `expenses`, `vendors`,
  `website`, `photos`, `livestream`, `dashboard`, `email-jobs`
- `src/server/`: `storage`, `email`, `places`
- `src/components/themes`

## Open items and blockers

1. **Build not re-run since the auth rebuild.** Stop `npm run dev` first; the build
   stalls while the dev server is running.
2. **Lint is unverified.** `eslint` hangs on this Windows machine (no output, no exit
   after several minutes). Worth trying from cmd.exe, or with `--cache` / a narrower path.
3. **Wedding creation → dashboard not confirmed** against Atlas. It uses a transaction,
   so the cluster must be a replica set (Atlas clusters are).
4. **Phase 1 is not closed.** Member management (invite, remove, change role) has a
   model but no endpoints. Per `AGENTS.md`, these are the only ADMIN-only routes.
5. **Dashboard shows static placeholders**, not real wedding data.
6. **Testimonial is placeholder content** with a generated photo. Replace with a real,
   consented customer story before launch, or remove the section.
7. **Leftover sample names.** A few examples in `docs/PRD.md` and
   `docs/DATABASE_DESIGN.md` may still read Akshay/Princi; switch them to Shipra/Himanshu.

## Next up

1. Stop the dev server, run `npm run build`, and get `npm run lint` to complete.
2. Create a wedding through onboarding and confirm the dashboard loads.
3. Build member management endpoints to finish Phase 1.
4. Wire the dashboard to real data.
5. Start Phase 2 — Events, then Tasks.

## Change log

Newest first.

### 2026-09-30 — Stitch auth screens, marketing photos, status log

Rebuilt `/login` and `/signup` to the Stitch "Sign In & Sign Up" design: a shared
`(auth)` layout, a gold-accent card with a sign in / sign up switcher, icon inputs and a
password reveal toggle; onboarding reuses the same shell. Hid Edge's built-in password
reveal eye on those fields so only one toggle shows. The family and stories sections now
use the Stitch photos via `next/image`. Swapped the Akshay/Princi sample names for
Shipra/Himanshu in the UI, tests and docs. Added this status log and pointed `AGENTS.md`
and `CLAUDE.md` at it. Removed the "Family Sync Active" hero indicator. Verified with
`tsc --noEmit` (clean) and Vitest (15 tests pass); build and lint not re-run.

### 2026-09-30 — Marketing landing page and dashboard redesign (`441cdd9`)

Added nine marketing section components and a shared `ui/icon` primitive, rebuilt the
dashboard with `panel` and `stat-card`, refreshed the design tokens in `globals.css`,
and updated the root and app layouts plus the nav to match. Also gitignored local tool
output (`gitstat.txt`, `tsc-out.txt`, `verify.txt`, `lint-run.log`) and unstaged those
scratch files. Verified with `tsc --noEmit` (clean) and Vitest (15 tests pass); lint
still unverified.

### 2026-09-30 — Project guides for AI assistants (`1554abc`)

Added `AGENTS.md` and `CLAUDE.md` capturing the stack, structure, tenant rules and
local environment quirks.

### 2026-09-30 — README expansion (`d097d01`)

Filled out features, architecture, setup and roadmap.

### 2026-09-30 — Initial scaffold (`ea16754`)

Next.js 16 + MongoDB scaffold with `docs/PRD.md`, `docs/SYSTEM_DESIGN.md`,
`docs/DATABASE_DESIGN.md` and `docs/API_DESIGN.md`. Phase 1 foundation code: auth,
wedding creation, session handling, rate limiting, onboarding and dashboard shell.
