# SPEC: Mission Control UI - Interactive Dashboard (Phase 2)
**Date:** 2026-04-16
**Version:** 1.0
**Status:** Draft
**Requested by:** Pil
**Assigned to:** Pete

---

## Intent
Transform the Mission Control UI from a read-only markdown viewer into a real-time, interactive command center. The goal is to enable Pil to monitor agent activity in real-time, send commands to Kai, and manage the state of missions and tasks directly from the browser, eliminating the need to manually check filesystem logs or use separate chat interfaces for high-level orchestration.

## User Stories
- **As Pil**, I want to see a live "heartbeat" or status indicator for every active agent so I know who is online and what they are currently executing.
- **As Pil**, I want to send a command or update directly from the dashboard to Kai so that I can pivot direction without leaving the UI.
- **As Pil**, I want to click a mission or task and change its status, assign it to a different agent, or add a new sub-task via a UI form.
- **As Pil**, I want a real-time activity feed (log stream) of high-level events so I can feel the "pulse" of the operation.

## Scope
**In:**
- Real-time status synchronization for agents.
- Command submission interface (UI $\rightarrow$ Kai).
- CRUD operations for Missions, Tasks, and Objectives.
- Live activity feed.
- Dashboard UX redesign for "Command Center" aesthetic.

**Out:**
- Full replacement of Scribe's markdown logging (the UI should augment/interface with Scribe, not delete the logs).
- Direct agent-to-agent communication (all commands route through the orchestration layer/Kai).
- Complex user permission levels (assuming Pil/Kai as primary users).

## Functional Requirements

### 1. Real-Time Agent Monitoring
1.1 The system shall display a "Global Agent Status" panel showing: Buster, Pete, Rex, Quill, Scribe.
1.2 Each agent shall have a status indicator: `Idle`, `Working`, `Blocked`, or `Offline`.
1.3 The UI shall display the current `TASK` and `MODE` from each agent's respective `STATUS` file.
1.4 Status updates must be pushed to the UI in real-time (via WebSocket or Server-Sent Events) rather than relying on page refreshes.

### 2. Interactive Messaging (Command Center)
2.1 The UI shall provide a "Command Input" field for sending messages to Kai.
2.2 Submitted commands must be routed to Kai's primary input channel with a prefix indicating they originated from the MC Dashboard.
2.3 The UI shall display a confirmation when a command has been successfully delivered to Kai.

### 3. Actionable Mission Management
3.1 The system shall provide an interactive list of active Missions.
3.2 Users must be able to:
    - Update the status of a mission (e.g., `Pending` $\rightarrow$ `In Progress` $\rightarrow$ `Completed`).
    - Assign/Reassign an agent to a specific task.
    - Add new tasks to an existing mission via a modal form.
3.3 Changes made in the UI must trigger a write to the underlying data store/STATUS files and be reflected across all connected clients.

### 4. Activity Feed
4.1 The UI shall feature a scrolling "Live Feed" of significant events (e.g., "Buster opened DEF-20260416-01", "Pete completed Task X").
4.2 The feed should be filtered to show high-level milestones, not raw debug logs.

## Data Model Changes
To support CRUD and real-time sync, the system should move from pure markdown parsing to a structured data layer (or a hybrid approach):

### Mission/Task Schema
```json
{
  "missionId": "UUID",
  "title": "string",
  "status": "enum(pending, active, completed, blocked)",
  "owner": "agent_id",
  "objectives": [
    {
      "taskId": "UUID",
      "description": "string",
      "status": "enum(todo, in_progress, done)",
      "assignedTo": "agent_id",
      "updatedAt": "timestamp"
    }
  ],
  "updatedAt": "timestamp"
}
```

## API Endpoints Needed
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/agents/status` | `GET` | Returns current state of all agents. |
| `/api/command/send` | `POST` | Sends a message/command to Kai. |
| `/api/missions` | `GET` | Lists all current missions and their nested tasks. |
| `/api/missions/:id` | `PATCH` | Updates mission status or metadata. |
| `/api/tasks/:id` | `PATCH` | Updates task status or assignment. |
| `/api/tasks` | `POST` | Creates a new task under a specific mission. |
| `/api/feed` | `GET` | Stream of recent high-level events (SSE/WS). |

## UI/UX Description
**Theme:** "Dark Mode Command Center" (High contrast, monospace fonts, neon status indicators).

**Layout:**
- **Top Bar:** System clock, Global Health (All systems nominal), and "Quick-Command" input field.
- **Left Sidebar (Agent Rack):** Vertical list of agents. Green dot = Online/Idle, Pulsing Blue = Working, Red = Blocked. Small text below name shows current task.
- **Center Panel (Mission Control):** Kanban-style or Nested List view of Missions. Each mission is a card. Tasks inside are checkboxes/dropdowns for status.
- **Right Sidebar (The Pulse):** A vertical scrolling feed of events. Timestamped entries like `[14:50] Buster: Spec for UI Phase 2 created`.

## Acceptance Criteria
- **AC-01:** Agent status updates in the UI within 2 seconds of the `STATUS` file changing on disk.
- **AC-02:** A message sent via the UI Command Input appears in Kai's channel within 3 seconds.
- **AC-03:** Changing a task status in the UI correctly updates the corresponding data record and reflects on the UI for other users.
- **AC-04:** Adding a new task via the UI is reflected in the mission list without requiring a manual page refresh.
- **AC-05:** The "Live Feed" populates with events as they occur in the background orchestration.
