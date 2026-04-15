# LESSONS.md — Mission Control
_Append-only. Written on failure or error. Read before starting any task in a known problem domain._

---

## 2026-04-13 — Next.js path alias missing
- **What failed:** `@/lib/db` import error on startup, exec killed with SIGKILL
- **What was tried:** Running dev server without fixing tsconfig paths
- **What worked:** Added `@/*` path alias to tsconfig.json, created missing Prisma client at `lib/db.ts`

## 2026-04-13 — Two dev servers conflict
- **What failed:** `Another next dev server is already running` on port 3001
- **What was tried:** Starting server without checking existing processes
- **What worked:** Kill existing process first with `pkill -f "next dev"` then restart

## 2026-04-13 — globals.css import breaking build
- **What failed:** SIGTERM on globals.css import during build
- **What was tried:** Leaving import as-is
- **What worked:** Ensure globals.css exists at correct path before running dev server

---
_New lessons appended below by heartbeat on error detection._
