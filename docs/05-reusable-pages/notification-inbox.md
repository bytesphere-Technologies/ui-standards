# Notification inbox

**Purpose:** a persistent, triageable history of events that concern the user. **Reuse when:** products with mentions, assignments, approvals, system events. Pattern F (list + detail). Toasts are transient; this is the record.

## Wireframe
```
Notifications                                          [Mark all as read] [Preferences]
[All] [Unread (4)] [Mentions] [Assigned]                     [🔍 Search]
┌ List 400px ──────────────────────────────┐ ┌ Detail (fluid) ───────────────────┐
│ ● (KI) Ken mentioned you in Apollo        │ │ Ken Ito mentioned you             │
│   “Can you review the budget…” · 2 min    │ │ in Apollo › Budget                │
│ ○ Invoice INV-1042 paid · 1 Mar           │ │ ┌ quoted comment ──────────────┐  │
│ ○ Deploy failed: api-prod · Yesterday     │ │ │ Can you review the budget…   │  │
│  Earlier this week                        │ │ └──────────────────────────────┘  │
│ ...                                       │ │ [Open in Apollo]  [Mark unread]    │
└───────────────────────────────────────────┘ └────────────────────────────────────┘
```
Also a topbar bell popover (360px): 5 latest + "View all".

## Required regions
Header with bulk actions · filter tabs (≤ 5) · list grouped by date (Today, Yesterday, Earlier this week, Older) · detail pane · empty state · preferences link.

## Components
`Tabs`, list items (`role="listbox"` option rows, 64px high comfortable), unread dot (8px, `action-primary-rest` + visually hidden "Unread"), `Avatar`, relative time, `Button`, `DropdownMenu` (row ⋯: Mark read/unread, Archive, Mute thread), `ScrollArea`, resizable split (`react-resizable-panels`).

## States
loading (skeleton rows) · empty "You're all caught up. New notifications appear here." (no confetti) · filtered empty · error with Retry · new items arriving (a "3 new notifications — Show" bar at top; never auto-insert under the cursor) · item selected · bulk selection · offline (cached list + banner) · deleted/inaccessible target ("You no longer have access to Apollo").

## Responsive
< 1024: list-only; selecting an item opens detail as a full page with back; bell popover becomes full-screen sheet. ≥ 1024: split pane list 400px / detail fluid. Keyboard: J/K move, Enter open, E archive, U mark unread, Shift+U mark all read (listed in `?`).

## Copy rules
Titles are sentences with actor + verb + object ("Ken mentioned you in Apollo"); no emoji; relative time with absolute title; counts capped `99+`; actions "Mark as read", "Archive", "Mute thread".

## Implementation (shadcn/ui)
`ResizablePanelGroup`, `Tabs`, `ScrollArea`, `Popover` for the bell, `Badge`; real-time via SSE/WebSocket with a polite live region "1 new notification"; pagination by cursor; mark-read optimistic.
