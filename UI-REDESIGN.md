# SPEC: Mission Control UI Redesign
**Date:** 2026-04-16
**Version:** 1.0
**Status:** Draft
**Requested by:** Kai / Pil
**Assigned to:** Pete

---

## Intent
Transform the Mission Control interface from a single-page Kanban view into a full-scale dashboard with proper navigation, improved layout, and expanded views (like an Agents directory) to make it feel like a cohesive "Mission Control" center.

## User Story
As an operator, I want a structured navigation system and polished layout so that I can easily switch between high-level project tracking, agent management, and system settings without losing the context provided by the Scribe sidebar.

## Scope
**In:**
- Overall page layout redesign.
- Implementation of a global navigation system (Sidebar or Top Nav).
- Creation of new views: Dashboard, Missions, Agents, Ideas, Settings.
- Integration of the existing Scribe sidebar into the new layout.
- A dedicated `/agents` page to monitor agent status and current tasks.
- Visual polish (cohesive color palette, typography, and spacing).

**Out:**
- Changes to the underlying Scribe data integration logic (keep existing functionality).
- New backend API endpoints (unless required for the /agents page).
- Redesigning the internal Kanban card logic (focus is on the container/layout).

## Functional Requirements
1. **Global Navigation:** The system shall provide a persistent navigation element (preferably a sidebar) allowing instant switching between views.
2. **Layout Shell:** The system shall maintain a three-column or two-column hybrid layout:
    - Navigation (Left)
    - Main Content Area (Center/Dynamic)
    - Scribe Sidebar (Right - Persistent)
3. **View Routing:** The system shall support the following routes:
    - `/dashboard`: High-level overview of system health and active priorities.
    - `/missions`: The existing Kanban/Task tracking view.
    - `/agents`: A directory of all active agents, their current status (Idle/Busy/Error), and a snippet of their current activity.
    - `/ideas`: A space for backlog/brainstorming items.
    - `/settings`: System and user configuration.
4. **Agent Directory:** The `/agents` page shall display a list of agents with:
    - Agent Name/Role
    - Status Indicator (Color-coded)
    - "Current Task" description
    - Last heartbeat/update time
5. **Cohesive Styling:** The UI shall use a modern, dark-themed "Command Center" aesthetic with consistent padding, borders, and accent colors.

## Edge Cases and States
- **Loading State:** Skeleton screens for the `/agents` list and `/missions` board.
- **Empty State:** "No active missions" or "No agents online" placeholders.
- **Responsive State:** Sidebar should collapse to a rail (icons only) on smaller screens.

## Acceptance Criteria
- **AC-01:** User can navigate between all 5 defined views without a full page reload (SPA behavior).
- **AC-02:** The Scribe sidebar remains visible and functional across all views.
- **AC-03:** The `/agents` page correctly displays the status and current activity of configured agents.
- **AC-04:** UI layout does not break or overlap when the Scribe sidebar is toggled/resized.
- **AC-05:** Visual style is consistent (fonts, colors, spacing) across all new views.

## Dependencies
- Requires existing Scribe integration for the right panel.
- Requires agent status data to be available for the `/agents` page.

## Notes for Pete
- Keep the Scribe panel exactly as it is functionally; just wrap it in the new layout shell.
- For the `/agents` page, if we don't have a dedicated API for "current task," a simple status field from the agent's last heartbeat will suffice for MVP.
- Focus on a "Pro" look—think Linear or Vercel dashboard.
