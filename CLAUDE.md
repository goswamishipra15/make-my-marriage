# CLAUDE.md

Project instructions for AI coding assistants live in **AGENTS.md** (single source of truth,
so the two files never drift apart). Claude Code loads it through the import below.

@AGENTS.md

Quick summary if imports are not supported by your tool:
- Read `docs/` (PRD, SYSTEM_DESIGN, DATABASE_DESIGN, API_DESIGN) before changing behaviour.
- Stack: Next.js 16 + React 19 + TypeScript, MongoDB Atlas + Mongoose 9, Zod 4, Tailwind 4, Vitest 5.
- Wedding is the tenant: always scope queries by `weddingId` from the session's membership.
- Phase 1 code is unverified: run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` first.
