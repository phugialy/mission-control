# UX Agent Brief — Business/Productivity Tool Design

**Date:** 2026-04-15
**Prepared for:** Mission Control — UI/UX Department Agent Planning
**Priority:** Low (future feature)

---

## Executive Context

This brief provides the foundational research for designing a **UI/UX Department Agent** — a specialized AI agent to assist Pete with interface design and user experience decisions for the Mission Control platform and related tools.

Unlike consumer applications (social apps, entertainment), business/productivity tools have distinct UX requirements driven by:
- **Extended session duration** — users spend hours daily in the tool
- **Task-oriented workflows** — efficiency, not delight, is the primary metric
- **Team collaboration** — shared workspaces, permissions, role-based access
- **Data density** — dashboards, tables, and forms are core UI patterns
- **Integration depth** — connections to enterprise stacks (Slack, Salesforce, etc.)
- **Compliance requirements** — accessibility (WCAG), security, audit trails

---

## Core UX Principles for Business Applications

### 1. Efficiency Over Discovery

Consumer apps optimize for first-timeWow. Enterprise apps optimize for returning mastery.

| Consumer Pattern | Enterprise Pattern |
|-----------------|-------------------|
| Onboarding wizards with multiple steps | Progressive disclosure — show basics first, advanced features on demand |
| Big visual gestures, animations | Subtle, skimmable layouts with keyboard shortcuts |
| One-off delight moments | Consistent, predictable behavior |
| Exploration-driven discovery | Search-driven navigation, command palettes |

**Key insight:** Power users in business tools prefer speed over hand-holding. They return daily. Optimize for the 50th visit, not the first.

### 2. Information Density Without Overwhelm

Business tools display more data per screen. The challenge is density without clutter.

- **Collapsible sections** — expand/collapse for detail levels
- **Density controls** — compact/default/comfortable mode toggles
- **Column customizability** — user-selectable table columns
- **Saved views** — user-configurable table/board layouts

### 3. Task Completion as Primary Metric

Every screen should answer: *Can the user complete their task here?*

- Clear primary actions (prominent buttons, hotkeys)
- Minimal navigation away from context
- Inline editing over modal pop-ups where possible
- Breadcrumbs and back-navigation for deep workflows

### 4. Collaboration as First-Class Feature

Business tools are rarely single-user.

- Real-time presence indicators (who's viewing)
- Comments and annotations inline
- Activity feeds with contextual links
- @mentions and notifications integrated with enterprise tools
- Shared views and team-level permissions

---

## Key UI Patterns for Business/Productivity

### A. Dashboards

| Element | Best Practice |
|---------|---------------|
| Widgets | Drag-and-drop placement, resize handles |
| Refresh | Auto-refresh with visual indicator, manual override |
| Date ranges | Global selector + per-widget override |
| Filters | Persistent, saved filter presets |
| Quick actions | Click-through to drill-down, no dead-ends |

### B. Data Tables

The most critical enterprise UI component.

- **Sorting** — click headers, multi-column sort support
- **Filtering** — column-level filters, global search, filter presets
- **Pagination** — infinite scroll option for large datasets
- **Column management** — show/hide, reorder, resize, lock
- **Inline actions** — row-level actions without navigation
- **Bulk selection** — checkboxes, select all on page/filtered
- **Export** — CSV/Excel with current view columns
- **Frozen columns** �� sticky first column(s) for wide tables

### C. Forms

Business forms are data-entry workloads.

| Pattern | Application |
|---------|------------|
| Progressive fields | Show required first, optional on expand |
| Auto-save | Draft state, don't lose work |
| Validation | Inline, real-time, not just on submit |
| Multi-step wizards | Progress indicator, save state between steps |
| Grouped fields | Logical sections, collapsible |
| Help text | Contextual, not just placeholder hints |

### D. Navigation

Complex apps need scalable navigation.

- **Global nav** — primary sections always visible
- **Command palette** — Cmd+K / Ctrl+K for power users (search actions)
- **Recent/Starred** — quick access to frequent items
- **Contextual nav** — page-specific sub-navigation
- **Breadcrumbs** — clear location in deep hierarchies
- **Back button** — meaningful back navigation, not just browser back

### E. Command Patterns

Power users expect CLI-like efficiency in GUI.

- Global search (Cmd+K)
- Keyboard shortcuts (customizable)
- Slash commands (/add, /assign)
- URL deep-linking (shareable state)
- Undo/redo as default

---

## Role-Based UX Considerations

Business tools serve diverse roles with different needs.

| User Type | UX Priorities |
|----------|----------------|
| Admin | Security, permissions, audit, user management |
| Manager | Reporting, team visibility, approvals |
| Contributor | Task completion, collaboration |
| Viewer (read-only) | Search, filtering, export |

**Key principle:** Role-based UI that shows/hides features by permission, not just disable them.

---

## Accessibility Requirements (Enterprise Baseline)

Business tools often legally require accessibility compliance.

### WCAG 2.1 AA Minimum

- **Color contrast** — 4.5:1 for text, 3:1 for large text/UI components
- **Keyboard navigation** — all functionality keyboard-accessible
- **Focus indicators** — visible, high-contrast focus rings
- **Screen reader support** — proper ARIA labels, landmark regions
- **Forms** — labels, error messages, clear IDs
- **Timing** — adjustable timeouts, no time-limited actions without warning

### Enterprise Accessibility Additional

- **Audit trails** — who did what, when (not just for compliance, but trust)
- **Permissions UI** — clear permission UIs for admins
- **Locale/date formats** — internationalization support
- **High contrast mode** — for low-vision users

---

## UX Agent Capability Specification

### What the UX Agent Should Know

1. **Component Library Patterns**
   - When to use tables vs. boards vs. calendars
   - Form validation strategies
   - Modal vs. inline patterns
   - Toast/notification conventions

2. **Design System Conventions**
   - Spacing and layout grids
   - Typography scales
   - Color meaning (semantic colors — success/warning/error)
   - Icon usage and accessibility

3. **Interaction Patterns**
   - Drag-and-drop semantics
   - Multi-select patterns
   - Filtering and search UX
   - Loading and skeleton states

4. **Responsive/Adaptive Patterns**
   - Desktop-first for productivity (most business use)
   - Mobile considerations for basic views
   - Sidebar collapse behaviors

### What the UX Agent Should Do

1. **Prompt Analysis**
   - Interpret feature requests into UI components
   - Identify edge cases (empty states, loading, errors)

2. **Component Selection**
   - Recommend appropriate patterns given data complexity
   - Choose form types (inline vs. modal vs. page)

3. **Accessibility Review**
   - Flag missing ARIA labels
   - Check contrast requirements
   - Validate keyboard navigation paths

4. **Consistency Checking**
   - Ensure component alignment with existing patterns
   - Verify language/tone consistency
   - Check shortcut conflicts

### Tools/References the UX Agent Should Access

- Existing component library (Mission Control design system)
- Style guides
- Accessibility checklist
- Keyboard shortcut map
- User role/permission matrix

---

## Recommendations for Implementation

### Phase 1: Foundation (MVP)

1. **Component pattern library** — Document common business UI patterns (tables, forms, dashboards)
2. **Accessibility baseline** — WCAG 2.1 AA compliance checklist
3. **Design tokens** — Consistent spacing, colors, typography

### Phase 2: Advanced

4. **Command palette pattern** — Global search + actions (Cmd+K)
5. **Role-based UI** — Feature visibility by permission
6. **Keyboard shortcuts** — Customizable hotkeys

### Phase 3: Differentiation

7. **Collaboration UI** — Presence, commenting, activity
8. **Onboarding flows** — Progressive disclosure
9. **Analytics integration** — Usage patterns to inform UX

---

## Summary

A UI/UX Agent for business/productivity tools should specialize in:

- **Efficiency-first design** — Optimize for repeated daily use
- **Data-dense UI patterns** — Tables, forms, dashboards at scale
- **Role-based features** — Permissions and permissions UI
- **Accessibility compliance** — WCAG as baseline
- **Integration patterns** — Enterprise stack connections
- **Command patterns** — Keyboard-centric power user features

The UX Agent's value is not just styling — it's advising on *which pattern solves the user's task*, not just how it looks.

---

*Brief prepared for Mission Control UI/UX Agent planning. Priority: Low. See Scribe for feature tracking.*