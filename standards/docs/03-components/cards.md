# Cards

## 1. Purpose
Group related content about one entity or one metric into a bordered, scannable unit.

## 2. When to use / when not to
Use for: entities in a grid (projects, integrations), KPI tiles, settings sections, dashboard widgets. Not: rows of homogeneous data → table; page sections that need no boundary → plain headed section; a list of 3 text items → list; wrapping another card.

## 3. Anatomy
```
┌─────────────────────────────────┐ 1 container: 1px border-subtle, radius 8, bg surface-raised
│ [media 16:9 / 4:3]  (optional)  │ 2 media (top, radius 8 top corners, no padding)
│ Title (h4, 16/600)       [⋯]    │ 3 header: title + optional action (menu)
│ Meta (13px, text-secondary)     │ 4 meta
│ Body                            │ 5 body (14px)
│ [Action]  [Action]              │ 6 actions (≤ 2)
├─────────────────────────────────┤
│ Footer: timestamp · status      │ 7 footer (optional, border-top subtle)
└─────────────────────────────────┘
```
Padding 20px (16 compact). Region gap 16px (12 compact).

## 4. Variants
| Variant | Use | Difference |
|---|---|---|
| static | KPI, settings section, info | border only, no hover |
| interactive (card-as-link) | entity grids | whole card is one link; hover `shadow-raised` + `border-strong`; one tab stop |
| selectable | pickers (plan, template) | radio/checkbox semantics, selected = `border-strong` + 2px inline-start `selected-bar` + check icon |
| outlined-empty | dropzone / add-new | 1px dashed `border-control`, centered content |

## 5. Sizes
Width is set by the grid (min 280px; 3–4 columns desktop). Min height none; grid rows align via `grid-auto-rows: 1fr` only when titles are clamped to 2 lines. Media ratios 16:9 or 4:3 only.

## 6. States
| State | Change |
|---|---|
| default | border `border-subtle`, no shadow |
| hover (interactive) | `shadow-raised`, border `border-strong`, 100ms |
| focus-visible | 2px ring on the card |
| active | bg `action-ghost-hover` |
| selected | border `border-strong`, `selected-bar` 2px, bg `selected-bg` |
| disabled | `text-disabled`, no hover, `aria-disabled` |
| loading | content-shaped skeleton (same height, regions) |
| error | in-card error line with retry; border unchanged |
| read-only | default |

## 7. Content rules
Title ≤ 60 chars, clamps to 2 lines. Meta one line. Body ≤ 3 lines (clamp). ≤ 2 actions; primary action max one and secondary ghost. Sentence case. No emoji headers.

## 8. Keyboard & screen reader behavior
Card-as-link: **one `<a>` whose pseudo-element stretches over the card** (`after:absolute after:inset-0`); inner action buttons sit above (`relative z-10`) and are separate tab stops. Result: whole card clickable, link name = title, one tab stop for the link. Selectable cards: `role="radio"` group / checkbox with `aria-checked`. Static cards use `<section aria-labelledby>` or `<article>` in lists.

## 9. Tokens used
`component-card-{bg,border,radius,padding,padding-compact,shadow-hover}` · `color-border-strong` · `color-selected-{bg,bar}` · `color-text-{primary,secondary}` · `shadow-raised`.

## 10. Accessibility notes
Focus ring not clipped (container `overflow:visible`). No nested interactive inside a link without z-index layering. Heading level matches page outline. Media has `alt` (SC 1.1.1). Hover-only controls also appear on `focus-within`.

## 11. Do / Don't
- Do: flat 8px-radius card with a 1px light-gray border and 20px padding. Don't: card with large soft shadow on a white page.
- Do: whole project card clickable, with a "⋯" menu as a separate focus stop. Don't: card with an arrow link plus a click handler on the div.
- Do: a KPI card with one big number and a delta. Don't: card inside a card inside a card.
- Do: three cards of the same height and layout. Don't: one gradient-bordered "featured" card among plain ones.

## 12. Code example
```tsx
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const card = cva("relative flex flex-col gap-4 rounded-card border bg-surface-raised p-5 [.compact_&]:p-4", {
  variants: {
    kind: {
      static: "border-subtle",
      interactive: "border-subtle transition-shadow duration-fast hover:border-strong hover:shadow-raised focus-within:ring-2 focus-within:ring-focus",
      selectable: "border-subtle has-[:checked]:border-strong has-[:checked]:bg-selected has-[:checked]:before:absolute has-[:checked]:before:inset-y-0 has-[:checked]:before:start-0 has-[:checked]:before:w-0.5 has-[:checked]:before:bg-selected-bar",
    },
  },
  defaultVariants: { kind: "static" },
});

export function ProjectCard({ href, name, meta, status }: { href: string; name: string; meta: string; status: React.ReactNode }) {
  return (
    <article className={cn(card({ kind: "interactive" }))}>
      <h3 className="text-h4 font-semibold text-primary line-clamp-2">
        <a href={href} className="after:absolute after:inset-0 focus-visible:outline-none">{name}</a>
      </h3>
      <p className="text-body-sm text-secondary">{meta}</p>
      <footer className="mt-auto flex items-center justify-between border-t border-subtle pt-3">{status}</footer>
    </article>
  );
}
```

## 13. Anti-patterns
Gradient-border cards; glass/blur cards; tilted/3D hover; emoji headers; nested cards; drop shadows on flat data cards; icon-in-circle above every title; card used as a container for another card's actions; mixed card styles in one layout; `rounded-2xl`; more than 2 actions.

## 14. Responsive & density
320px: single column, full width, 16px padding. 768px: 2 columns. 1024px+: 3–4 columns, 24px gap. Compact: 16px padding, 12px gap.
