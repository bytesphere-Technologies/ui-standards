# Navigation: topbar, sidebar, tabs, breadcrumb

## 1. Purpose
Tell users where they are and let them go anywhere in ≤ 2 actions. Building blocks are defined here; which shell to use per product type is in `04-patterns/navigation-per-product-type.md`.

## 2. When to use / when not to
| Block | Use | Not |
|---|---|---|
| **Top bar** (global) | brand, global search, org switcher, notifications, account | primary page navigation in apps with a sidebar |
| **Sidebar** (primary) | the app's top-level destinations, ≤ ~7 items + groups | content filters (use filter rail), page-level tabs |
| **Secondary rail** | sub-navigation within one section (Settings pages) | a second global nav |
| **Tabs** (in-page) | peer views of the same object (Overview / Activity / Settings) | steps in a flow (stepper), page-to-page nav |
| **Breadcrumb** | hierarchy ≥ 3 levels deep | flat apps; as a history trail |
| **Segmented control** | switching a view of the same data (List / Board) | navigation |
| **In-page anchors** | long docs: right TOC | app navigation |

## 3. Anatomy
```
┌ Topbar 56px: [☰ mobile] [Logo] [Org ▾]   [ Search ⌘K ........ ]   [Help] [🔔 3] [Avatar] ┐
├─Sidebar 240px────┬─Page────────────────────────────────────────────────────────────────────┤
│ ▌Dashboard       │ Breadcrumb: Projects › Apollo › Settings                                  │
│  Projects        │ Page title (24px)                            [Secondary] [Primary]        │
│  Reports         │ Tabs: Overview | Activity | Members | Settings                            │
│  ── Admin ──     │ ...                                                                       │
│  Members         │                                                                           │
│  [« collapse]    │                                                                           │
└──────────────────┴───────────────────────────────────────────────────────────────────────────┘
```

## 4. Variants
| Block | Variants |
|---|---|
| Sidebar | expanded 240 · wide 280 (tree nav) · collapsed rail 64 (icons + tooltips) · mobile drawer |
| Tabs | underline (default), contained (segmented-like, avoided) |
| Breadcrumb | full (≤ 4 levels) · truncated (ellipsis menu in the middle) |
| Nav item | link · link with count badge · group header (collapsible) |

## 5. Sizes
| Element | Spec |
|---|---|
| Top bar height | **56px** product (64px marketing) |
| Sidebar item height | **36px** comfortable / **32px** compact; padding 0×8; icon 20 (16 compact); gap 8 |
| Sidebar widths | 64 / 240 / 280 |
| Sidebar group label | overline 11px, 16px top margin |
| Tab height | 40px (32 compact); padding 0×12; gap 4 |
| Breadcrumb | 13px, item gap 8, chevron 16 |
| Mobile topbar | 56px, hamburger 44px target |

## 6. States
**Active-item spec — pick one, never both:** this system uses **tinted background + semibold label**: active item bg `selected-bg`, label `text-primary` weight 600, icon `action-primary-rest`, `aria-current="page"`. (The alternative, a 2–3px left indicator bar, is not used in this system; adding a bar to a tinted item is a review failure.)
| State | Nav item |
|---|---|
| default | label `text-secondary` 500, icon `text-tertiary` |
| hover | bg `action-ghost-hover` |
| focus-visible | 2px inset ring |
| active/current | as above |
| disabled | `text-disabled`, `aria-disabled`, tooltip reason |
| loading | skeleton item (label block) |
| badge | count badge on the right, max `99+` |
Tabs: current = `text-primary` 600 + 2px bottom border `action-primary-rest`; hover = `text-primary`; underline is the tab's indicator (tabs use bar, items use tint: different components).

## 7. Content rules
Labels: nouns, sentence case, 1–2 words, ≤ 20 chars, no icons-only items at 240px. Max **~7 primary items** (hard cap 9); group beyond that under labelled sections. Max depth 3 (section › page › tab). No horizontal overflow of tabs on desktop; on mobile tabs scroll with edge fade-less snap. Breadcrumb: max **4 levels** — beyond, collapse middle levels into "…" (menu). Last crumb is current page, not a link, `aria-current="page"`. Tabs: ≤ 7, no nested tabs, deep-linkable (`?tab=activity` or path).

**Collapsible sidebar:** toggle at the bottom (`PanelLeftClose` 20px) and shortcut `[`; state persisted in `localStorage` (`ui.sidebar`) and user profile; collapsed rail shows tooltips (500ms) with the label; remembers per user, not per page. Auto-collapse to rail 1024–1279px unless user pinned open.

**Mobile pattern:** < 768px: topbar with hamburger → left drawer (vaul/Radix Sheet, 280px) containing the same sidebar; ≤ 5 destinations use a bottom tab bar (see navigation matrix); tabs become a horizontally scrolling list (no wrapping).

## 8. Keyboard & screen reader behavior
`<nav aria-label="Primary">`, `<nav aria-label="Breadcrumb">` with `<ol>`, `aria-current="page"`. Sidebar: Tab through items (each a link); groups are disclosure buttons (`aria-expanded`). Tabs follow APG (roving tabindex, ←/→ move, Home/End, activation automatic for instant panels, manual for loaded panels; `role=tablist/tab/tabpanel`, `aria-selected`, `aria-controls`). Skip link jumps past topbar + sidebar. `g` then letter shortcuts (e.g. `g p` Projects) optional, listed in `?` sheet.

## 9. Tokens used
`size-topbar` · `size-sidebar` · `size-sidebar-rail` · `size-sidebar-wide` · `color-selected-bg` · `color-action-ghost-hover` · `color-action-primary-rest` · `color-border-subtle` · `color-text-{primary,secondary,tertiary}` · `z-sticky`.

## 10. Accessibility notes
Current page not conveyed by color alone: weight 600 + `aria-current`. Contrast: `text-primary` on `selected-bg` 10.95:1 (`#292E33` on Pale Blue `#DBE7F7`). Targets ≥ 32px. Focus visible inside overflow containers via `ring-inset`. SC 2.4.5 (multiple ways: nav + search), 3.2.3 consistent navigation, 3.2.4 consistent identification, 2.4.8 location (breadcrumb).

## 11. Do / Don't
- Do: one tinted, semibold current item. Don't: tint + left bar + bold + icon color change.
- Do: group 12 destinations under 3 labelled sections. Don't: a flat list of 14 items.
- Do: "Projects › Apollo › Settings" with the last crumb plain. Don't: breadcrumb on a top-level page.
- Do: tabs deep-linked via URL. Don't: tabs within tabs.

## 12. Code example
```tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavItem({ href, icon: Icon, children, count }: { href: string; icon: LucideIcon; children: React.ReactNode; count?: number }) {
  const current = usePathname().startsWith(href);
  return (
    <Link href={href} aria-current={current ? "page" : undefined}
      className={cn("flex h-(--row-nav,2.25rem) items-center gap-2 rounded-button px-2 text-body font-medium text-secondary transition-colors duration-instant",
        "hover:bg-action-ghost-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus",
        current && "bg-selected font-semibold text-primary")}>
      <Icon className={cn("size-5 shrink-0 text-tertiary", current && "text-action-primary")} aria-hidden />
      <span className="truncate">{children}</span>
      {count ? <span className="ms-auto rounded-round bg-surface-sunken px-1.5 text-caption font-semibold tabular-nums text-secondary" aria-label={`${count} items`}>{count > 99 ? "99+" : count}</span> : null}
    </Link>
  );
}

export const Sidebar = ({ children }: { children: React.ReactNode }) => (
  <nav aria-label="Primary" className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 flex-col gap-1 overflow-y-auto border-e border-subtle bg-surface p-2 md:flex">{children}</nav>
);
```
Use shadcn/ui `Sidebar` block (ui.shadcn.com/docs/components/sidebar) as the base; override active styling to the spec above.

## 13. Anti-patterns
Hamburger as the only desktop nav; mystery-meat icon-only nav at 240px; > 9 primary items; nested tabs; breadcrumb as history; active state with both bar and tint; mega-menus in apps; sidebar items that reorder; horizontally overflowing top nav; nav that changes per page; "New" badges that never expire.

## 14. Responsive & density
320: topbar + drawer; tabs scroll; breadcrumb collapses to "‹ Parent". 768: sidebar as rail 64px or drawer. 1024: rail by default, expandable. 1280+: expanded 240. 1440: unchanged (content max 1280/1440). Compact: items 32px.
