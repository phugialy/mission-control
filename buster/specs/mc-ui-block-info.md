# SPEC: Mission Control UI - Block Info on Cards

## Intent
When a mission or task is blocked, show clear visual indication + reason so Pil can see what's stuck and why.

## UI Changes

### 1. Blocked Card Visual
- In kanban: if status = "blocked", show red left border + red badge
- Badge text: "BLOCKED"
- Hover reveals: "Waiting on: [agent name] - [reason]"

### 2. Block Info Panel
- Click blocked card → opens detail modal
- Shows:
  - Blocked by (agent)
  - Blocked since (timestamp)
  - Reason (from DEF file or STATUS)
  - "Unblock" action (manual override)

### 3. Agent Status Connection
- When agent status = "blocked", their card shows red
- Clicking agent shows what they're blocked on

## Data Requirements
- Read STATUS files for "blocked" state + reason
- Read DEF files for defect info
- Store block history in database for audit

## Acceptance Criteria
- [ ] Blocked missions have red visual indicator in kanban
- [ ] Hovering shows block reason without clicking
- [ ] Blocked agents show red status dot
- [ ] Block info shows in mission detail view
- [ ] Clear "waiting on X" messaging

---
*Spec: 2026-04-16*   
*For: Mission Control UI Phase 2.1*
