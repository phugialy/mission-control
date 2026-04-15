# Mission Control Suite - Add Objectives Panel

**Date:** 2026-04-13  
**Status:** In Progress

## Task
Add ability to view and manage Objectives/Tasks when clicking a Mission card.

## Work Plan
- [ ] Update API to include objectives in mission response
- [ ] Create MissionDetail modal/panel component
- [ ] Wire up click handler to show the panel
- [ ] Add ability to create/edit objectives
- [ ] Test and verify

## Changes
- KanbanBoard.tsx: Add click handler → show detail panel
- New: MissionDetail.tsx component for objectives/tasks
