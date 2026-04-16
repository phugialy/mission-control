# UI Layout Fix: Mission Control Dashboard

## Problem
The kanban board on the left was being cut off, making columns like "BLOCKED", "REVIEW", and "DONE" invisible. This was caused by the `grid` layout in `page.tsx` not allowing the `KanbanBoard` (which uses `overflow-x: auto`) to properly calculate its boundaries within the grid item.

## Changes
- Modified `/home/pilown/workspaces/mission-control/src/app/page.tsx`:
    - Wrapped the `<KanbanBoard />` component in a `div` with `minWidth: 0`. 
    - In CSS Grid, `grid-template-columns: 1fr ...` defaults to `minmax(auto, 1fr)`. Since the Kanban board has a minimum content width (columns), it was forcing the grid item to expand beyond the viewport rather than shrinking and triggering its internal `overflow-x: auto`.
    - Adding `minWidth: 0` to the wrapper forces the grid item to be able to shrink smaller than its content, allowing the `KanbanBoard` component's own `overflow-x: auto` to function as intended.
    - Added `overflowX: "auto"` to the main grid container as a secondary safety measure for extremely small screens.

## Result
The Kanban board is now scrollable horizontally when the screen width is insufficient to show all columns, while the `ScribeLogViewer` remains pinned to the right at 400px.
