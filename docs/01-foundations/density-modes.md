# Density modes

Two modes. Set once at the shell via `data-density="comfortable|compact"` on `<html>`; components read CSS variables. Users may toggle per surface where the spec says so (tables).

## 1. Specification

| Property | Comfortable (default) | Compact |
|---|---|---|
| Control height md (button, input, select) | 36px | 32px |
| Control height sm | 32px | 28px (never below; 24px target floor still met by hit-area padding) |
| Table row height | 40px | 32px |
| Table header height | 40px | 32px |
| Cell x-padding | 12px | 12px |
| Body font | 14px / 20px | 13px / 18px (table cells only; chrome stays 14px) |
| Form field gap | 16px | 12px |
| Card padding | 20px | 16px |
| Sidebar item height | 36px | 32px |
| Menu item height | 36px | 32px |
| Section gap | 24 / 40px | 16 / 24px |
| Toolbar height | 48px | 40px |
| Icon size | 16/20 | 16 (nav 16) |
| Tab height | 40px | 32px |

Not affected by density: topbar (56px), focus ring (2px), touch layouts (always comfortable; min target 44px), typography of headings, modal padding (24px).

## 2. Which screens

| Screen type | Mode | Toggle |
|---|---|---|
| Settings, billing, onboarding, create/edit flows, auth, marketing | Comfortable | none |
| Dashboards | Comfortable | none |
| List/index pages with tables ≥ 7 columns or ≥ 50 rows/page | Compact default | user toggle in table toolbar, persisted |
| Data grids, logs, audit trails, query results | Compact | user toggle |
| Inbox / queue (list + detail) | Compact list, comfortable detail | none |
| Mobile (< 768px) | Comfortable only | none |

## 3. Tokens

```css
:root                      { --control-md: 2.25rem; --row: 2.5rem;  --field-gap: 1rem;    --card-pad: 1.25rem; }
:root[data-density="compact"] { --control-md: 2rem;    --row: 2rem;    --field-gap: 0.75rem; --card-pad: 1rem; }
```
Tailwind usage: `h-(--control-md)`, `min-h-(--row)`. Components never hardcode `h-9` for density-sensitive heights.

## 4. Rules
1. Persist the user's table density in `localStorage` key `ui.density.<surface-id>` and server-side profile when signed in.
2. Compact never shrinks hit areas below 24×24 CSS px (WCAG 2.5.8); add `before:absolute before:-inset-1` hit-area expansion.
3. Compact never shrinks text below 12px.
4. Don't mix modes inside one table.
5. Every component story renders both modes.
