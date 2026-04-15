# OpenClaw Control UI - Project Spec

## Overview
A web dashboard to manage OpenClaw agent missions with Kanban-style workflow.

## Tech Stack
- **Frontend:** Next.js 16 (App Router)
- **Database:** SQLite + Prisma
- **Styling:** Tailwind CSS (v4)

## Data Models

### Mission
- id, title, description
- status: inbox | planned | in_progress | blocked | review | done | archived
- priority: low | medium | high | urgent
- createdAt, updatedAt, createdBy, approvedBy

### Objective (belongs to Mission)
- id, title, status, order
- Belongs to Mission

### Task (belongs to Objective)
- id, title, status, assignee, order
- Belongs to Objective

### Activity (logging)
- id, type, message, agentId, missionId, createdAt

## Pages

### / (Dashboard)
- Mission count by status (7 columns)
- Quick stats

### /missions
- Full Kanban board with drag-drop
- Create/Edit mission modal
- Filter by status/priority

### /missions/[id]
- Mission detail view
- Objectives list with expandable tasks
- Activity log

### /schedule
- Calendar view of scheduled missions

## API Endpoints
- `GET /api/missions` - List missions
- `POST /api/missions` - Create mission
- `GET /api/missions/[id]` - Get mission
- `PUT /api/missions/[id]` - Update mission
- `DELETE /api/missions/[id]` - Delete mission

## Phase Plan

### Phase 1: Core (Done ✅)
- [x] Project setup (Next.js + Prisma)
- [x] Database schema
- [x] GET/POST/PUT/DELETE missions API
- [x] Dashboard with status counts
- [x] Run dev server on localhost:3000
- [x] globals.css theme variables

### Phase 2: Kanban UI (Done ✅)
- [x] Full Kanban board with 7 columns
- [x] Drag-drop between columns
- [x] Create mission form (modal)
- [x] Priority color coding
- [x] Click to view mission details

### Phase 3: Mission Details (Done ✅)
- [x] Mission detail page (/missions/[id])
- [x] Edit title/description
- [x] Quick status change buttons
- [x] Delete mission
- [ ] Objectives/Tasks CRUD (coming soon)

### Phase 3: Mission Details
- [ ] Mission detail page
- [ ] Objectives CRUD
- [ ] Tasks CRUD
- [ ] Activity feed

### Phase 4: Polish
- [ ] Schedule page (calendar)
- [ ] Styling improvements
- [ ] Build for production
