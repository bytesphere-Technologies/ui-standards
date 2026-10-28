# Audit log page

**Purpose:** a trustworthy record of who did what, when. **Reuse when:** any product with roles, billing or admin actions. Route `/settings/audit-log`.

## Wireframe
```
Audit log                                           [Export]
[Search events] [All events ▾]
 (MM) Mia Moreno signed in                          2 min ago
      Berlin · Chrome
 (KI) Kenji Ito changed Priya's role to Admin       1 h ago
      Workspace
 …                                    1–25 of 287   ‹ 1 2 … 12 ›
```

## Rules
1. Append-only; entries are never editable or deletable from the UI.
2. Every entry has actor, verb phrase, object, place, and an absolute timestamp on hover (relative shown).
3. Retention is stated in the description ("kept for 12 months").
4. System actors use a neutral icon tile, not an avatar.
5. Export is CSV or JSON of the current filter and writes its own audit entry.
6. Filters: actor, event type, date range; URL-synced.

## States
loading (8 skeleton rows) · empty after filter ("No events match. Widen the date range.") · error with retry · permission-denied (403 page with who can grant access).

## Responsive
Rows stay as a list; the timestamp moves under the text below 640px.

## Implementation
Cursor pagination (feeds, not totals) for large logs; TanStack Query with `keepPreviousData`; filters via nuqs.
