# Iconography

## 1. Sets

| Role | Set | License | URL | Status |
|---|---|---|---|---|
| **Primary (only set in product chrome)** | Lucide | ISC | lucide.dev | Required |
| Secondary, when weight variants are needed (e.g. filled active-nav state) | Phosphor | MIT | phosphoricons.com | Approved per product, replaces Lucide entirely in that product |
| Approved alternates | Heroicons (MIT, heroicons.com) · Tabler Icons (MIT, tabler.io/icons) | | | Only if Lucide lacks a glyph and no equivalent exists; add as a custom SVG in the registry, not as a dependency |

**Never mix two sets in product surfaces.** A product picks Lucide (default) or Phosphor. Custom glyphs follow the Lucide grid and stroke.

Import per icon, never the barrel: `import { Search } from "lucide-react"` with a bundler that tree-shakes (verified by bundle report) or `lucide-react/dynamic` forbidden on critical path.

## 2. Sizes and stroke

| Size | Token | Use | Stroke |
|---|---|---|---|
| 16px | `size-icon-sm` | inside buttons sm/md, table cells, inputs, menu items, pills, breadcrumbs | 1.75px |
| 20px | `size-icon-md` | sidebar nav, standalone icon buttons, banners, toasts, empty-state inline | 1.75px |
| 24px | `size-icon-lg` | topbar actions on touch, empty-state header, onboarding steps | 1.5px |

Rules:
1. Stroke 1.5–1.75px, constant across the product. `stroke-width` is set once via a wrapper (`<Icon strokeWidth={1.75}>`), never per instance.
2. Only three sizes. No 14px, 18px, 28px icons.
3. Icon color = adjacent text color (`currentColor`). Standalone icons use `text-secondary`; hover `text-primary`.
4. Icons sit on the text's optical center: `inline-flex items-center`, `shrink-0`, and the icon box height equals the line-height box (16px icon with 20px line-height).
5. Icon↔text gap: 8px (buttons, menus, nav), 6px (pills), 4px (inline meta).
6. Directional icons (chevrons, arrows, back/forward, send) flip in RTL via `rtl:-scale-x-100`. Non-directional (search, trash, check, play) never flip.

## 3. Meaning and accessibility

1. **Icons are never the only signal.** Pair with visible text, or provide `aria-label` + tooltip.
2. Decorative icon next to text: `aria-hidden="true"`.
3. **Icon-only button** requires: `aria-label` (verb phrase: "Delete invoice"), tooltip on hover **and** focus, 32px minimum hit area (36px default; 24px absolute floor in dense table rows with 8px spacing to neighbors).
4. Status icons (check-circle, alert-triangle, x-circle, info) are paired with the status word in the same element.
5. Canonical mapping — one icon per concept across the product:

| Concept | Icon | Concept | Icon |
|---|---|---|---|
| Add / create | `plus` | Delete | `trash-2` |
| Edit | `pencil` | Duplicate | `copy` |
| Search | `search` | Filter | `list-filter` |
| Settings | `settings` | Help | `circle-help` |
| Success | `circle-check` | Warning | `triangle-alert` |
| Error | `circle-x` | Info | `info` |
| More actions | `ellipsis` (horizontal) | Close | `x` |
| Expand/collapse | `chevron-down`/`chevron-right` | External link | `external-link` |
| Download | `download` | Upload | `upload` |
| Notifications | `bell` | Account | avatar, not an icon |

## 4. When to use which size

| Context | Size |
|---|---|
| Inside a 32 or 36px control | 16 |
| Sidebar nav item, topbar icon button (desktop) | 20 |
| Topbar icon button (touch), empty state hero | 24 |
| Table cell | 16 |
| Inside body text | 16 (matches 14px text + 2px optical) |

## 5. Banned
1. Emoji as icons or status markers (🚀 ✅ ⚠️ in UI or copy).
2. Multicolor / duotone icon sets in product chrome.
3. Icons as decoration in dense tables (a leading file-icon on every row of a 10,000-row table). Allowed only when the icon encodes type that users filter by, and then it is 16px `text-tertiary`.
4. Icon-in-a-circle or rounded-square tile above every heading.
5. Mixed stroke weights, filled+outline mixes (except Phosphor active-state fill, per product).
6. Animated icons that loop.
7. Custom-drawn icons that do not match the 24px grid / 2px padding.
8. Hamburger-icon without label as the only desktop navigation.

## 6. Code

```tsx
// registry/ui/icon.tsx
import { type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const icon = cva("shrink-0", {
  variants: { size: { sm: "size-4", md: "size-5", lg: "size-6" } },
  defaultVariants: { size: "sm" },
});

export function Icon({ as: As, size, className, label, ...p }:
  { as: LucideIcon; label?: string; className?: string } & VariantProps<typeof icon>) {
  return <As strokeWidth={size === "lg" ? 1.5 : 1.75} className={icon({ size, className })}
    aria-hidden={label ? undefined : true} aria-label={label} role={label ? "img" : undefined} {...p} />;
}
```
