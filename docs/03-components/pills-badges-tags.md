# Pills, badges, tags

This is a **no-AI-pill** file. There are three different things; never mix their looks.

| Kind | Purpose | Interactive | Shape |
|---|---|---|---|
| **Status pill** | state of a record (Active, Failed, Overdue) | no | 4px radius rectangle, tinted |
| **Count badge** | a number (unread 12) | no | 16–20px, `radius-round` (count dot only) |
| **Filter tag / chip** | an applied filter or selected value, removable | yes (remove) | 4px radius, neutral, with X |

## 1. Purpose
Communicate record state, quantity, or applied selection in one glance.

## 2. When to use / when not to
Use a status pill when a record has an enumerated lifecycle that users scan or filter by. Not: for every attribute (plan name, role, category all as colored pills); for actions (that's a button); for labels that never vary (just write text); inside sentences.

## 3. Anatomy
```
[● Active]     status pill: 1 optional 6px dot · 2 label (12px/600) · container: 22px high, 8px x-padding, 6px dot gap, 4px radius
 (12)          count badge: number, min-width 16px, 4px x-padding
[Region: EU ✕] filter tag: 1 key (optional, secondary) · 2 value · 3 remove button 16px icon in 20px hit area
```

## 4. Variants
| Status | Tokens (bg / border / text / dot) | Light bg alpha | Text contrast |
|---|---|---|---|
| success | `status-success-{bg,border,fg,dot}` | 14% of success-500 + 1px border success-600 @ 35% | **6.64:1** |
| warning | `status-warning-*` | 14% warning-500 | **6.70:1** |
| danger | `status-danger-*` | 14% danger-500 | **9.80:1** |
| info | `status-info-*` | 14% info-500 | **7.93:1** |
| neutral | `status-neutral-*` | 14% neutral-500 | **9.06:1** |
Dark: bg 18% alpha; text step 300: 8.42 / 8.51 / 7.12 / 7.85. Pill text must hit **4.5:1 against its own tinted background** — verify with the table, not by eye.
The spec uses 10–20% alpha: 14% is the standard. Do not vary.

Count badge: **solid primary** (`action-primary` + `action-primary-fg`, 5.50:1) for unread and notification counts; solid danger (`action-danger`) only when the number is a count of failures; neutral `surface-sunken` + `text-secondary` for plain totals. Never red by default: red means something is wrong.

## 5. Sizes
| Kind | Height | Padding x | Font | Radius |
|---|---|---|---|---|
| Status pill md | 22px | 8px | 12px/600 | 4px |
| Status pill sm (dense tables) | 20px | 6px | 11px/600 | 4px |
| Status pill lg | 24px | 10px | 12px/600 | 4px |
| Count badge | 16px (≤ 99) / 20px | 4–6px | 11px/600 | full (dot class) |
| Filter tag | 24px | 8px (start) / 4px (end) | 12px/500 | 4px |
Label case: sentence case ("Past due") by default; uppercase 11px with +0.06em tracking is allowed for sm table pills only; pick one per product.

## 6. States
| State | Status pill | Count badge | Filter tag |
|---|---|---|---|
| default | tinted | solid/neutral | `surface-sunken` + `border-subtle` |
| hover | none (not interactive) | none | remove X gets `action-ghost-hover` |
| focus-visible | n/a | n/a | ring on X button |
| active | n/a | n/a | X `action-ghost-active` |
| selected | n/a | n/a | n/a |
| disabled | n/a | n/a | `text-disabled`, X removed |
| loading | skeleton 64×22 | skeleton | n/a |
| error | = danger variant | = danger | n/a |
| read-only | default | default | no X |

## 7. Content rules
Status pill: one or two words from a closed vocabulary, shared across the product ("Active", "Paused", "Failed", "Past due"). Never "Awesome", never user-defined free text colors. Count: `99+` over 99. Filter tag: "Status: Failed" (key secondary weight, value primary).

## 8. Keyboard & screen reader behavior
Status pill: static text; includes dot `aria-hidden`; label read as is. Never rely on color: label text is mandatory. Count badge: `aria-label="12 unread"` on the parent control, badge `aria-hidden` when label covers it. Filter tag: remove is a `<button aria-label="Remove filter Status: Failed">`; Backspace/Delete on focused tag removes; focus moves to next tag or the filter button. Tag groups: `role="list"`.

## 9. Tokens used
`component-badge-{height,radius,padding-x,font}` · `component-badge-{success,warning,danger,info,neutral}-{bg,border,fg,dot}` · `color-status-danger-solid` · `color-text-inverse` · `color-border-subtle` · `color-surface-sunken`.

## 10. Accessibility notes
SC 1.4.1 (color not sole cue → label text), 1.4.3 (4.5:1 against tint), 2.5.8 (tag remove hit area ≥ 24px: 20px icon + 4px padding), 4.1.2 (name on remove). Count updates announced via the container's live region, not the badge.

## 11. Do / Don't
- Do: one pill column in a table with five statuses, each a different tint and a word. Don't: a rainbow of tags in every cell.
- Do: 4px-radius rectangle, 1px matching border, 12px semibold text. Don't: fully rounded capsule with gradient fill.
- Do: "Past due" in a light red tint with a dot. Don't: "🔥 Hot lead".
- Do: filter tag "Region: EU" with an X labeled "Remove filter Region: EU". Don't: an X with no label.

## 12. Code example
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const pill = cva(
  "inline-flex h-[22px] items-center gap-1.5 rounded-control border px-2 text-caption font-semibold whitespace-nowrap",
  {
    variants: {
      tone: {
        success: "bg-status-success-bg border-status-success-border text-status-success-fg",
        warning: "bg-status-warning-bg border-status-warning-border text-status-warning-fg",
        danger: "bg-status-danger-bg border-status-danger-border text-status-danger-fg",
        info: "bg-status-info-bg border-status-info-border text-status-info-fg",
        neutral: "bg-status-neutral-bg border-status-neutral-border text-status-neutral-fg",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);
const dot = { success: "bg-status-success-dot", warning: "bg-status-warning-dot", danger: "bg-status-danger-dot", info: "bg-status-info-dot", neutral: "bg-status-neutral-dot" };

export function StatusPill({ tone = "neutral", dot: showDot = true, children }: VariantProps<typeof pill> & { dot?: boolean; children: React.ReactNode }) {
  return (
    <span className={pill({ tone })}>
      {showDot && <span aria-hidden className={`size-1.5 rounded-round ${dot[tone ?? "neutral"]}`} />}
      {children}
    </span>
  );
}
```

## 13. Anti-patterns
Max 2 pill colors per row; no rainbow tag clouds (category tags are neutral); never a pill for everything; no pill-shaped buttons; no pill with an emoji; no gradient or glass pills; no pill whose text fails 4.5:1; no 3+ pills stacked in a table cell (show first + "+N"); no status pill that is clickable (use a button).

## 14. Responsive & density
Pills never wrap; truncate the label at 24ch with title. At 320px, table→card layout puts the pill beside the title. Compact: use sm (20px).
