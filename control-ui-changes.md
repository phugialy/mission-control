# Control UI Changes — 2026-04-15

## What Was Built

A **Mission Control Dashboard** that shows real-time Scribe logging data alongside the existing Kanban board.

### Files Created/Modified

1. **`src/app/api/scribe/route.ts`** (new)
   - API endpoint that reads Scribe's workspace files
   - Parses EXECUTION-BOARD.md for active missions and agent status
   - Parses MEMORY.md for consolidated memory entries
   - Parses daily logs from `memory/` directory
   - Returns structured JSON data

2. **`src/components/scribe/ScribeLogViewer.tsx`** (new)
   - React component that fetches and displays Scribe data
   - Three tabs: Overview, Daily Logs, Agents
   - Auto-refreshes every 5 seconds (toggleable)
   - Shows active missions with status indicators
   - Shows agent status (active/idle/blocked)
   - Shows daily work logs and blockers

3. **`src/app/page.tsx`** (modified)
   - Added ScribeLogViewer to the dashboard layout
   - Side-by-side layout: Kanban board + Scribe logging panel

### How It Works

1. **Data Flow:**
   - Scribe writes to files in `~/workspaces/scribe/`
   - UI fetches from `/api/scribe` endpoint
   - Endpoint parses markdown files and returns JSON
   - Component auto-refreshes to show updates

2. **Data Sources:**
   - `EXECUTION-BOARD.md` → Active missions, agent status, parked items, ideas
   - `MEMORY.md` → Consolidated long-term memory entries
   - `memory/YYYY-MM-DD.md` → Daily logs with requests, work done, blockers

3. **Real-time Updates:**
   - Component polls `/api/scribe` every 5 seconds
   - Auto-refresh toggle to enable/disable polling
   - Last updated timestamp displayed

### Features

| Feature | Description |
|---------|-------------|
| Active Missions | Shows mission name, owner, status, last update, blockers |
| Agent Status | Shows agent name, current task, status (active/idle), last signal |
| Daily Logs | Shows historical daily logs with requests, work done, blockers |
| Auto-refresh | Toggle to enable/disable 5-second polling |
| Tab Navigation | Overview / Daily Logs / Agents views |

### Testing

The server is running at `http://localhost:3000`. The dashboard should now display:

- Real Scribe data instead of placeholder data
- Active missions from EXECUTION-BOARD.md
- Agent status from EXECUTION-BOARD.md
- Daily logs from memory/ directory
- Updates appear automatically on refresh

### Notes

- API endpoint reads directly from Scribe's workspace files
- Uses file system (fs) module - server-side only
- Parsing is robust to markdown table format changes
- Error handling for missing files or parse failures