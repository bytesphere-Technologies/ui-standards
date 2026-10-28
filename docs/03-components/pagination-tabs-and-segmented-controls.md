# Pagination, tabs, and segmented controls

## 1. Purpose
Move through large sets (pagination), switch peer sections of one object (tabs), or switch the view of the same data (segmented control).

## 2. When to use / when not to
| Control | Use | Not |
|---|---|---|
| **Pagination** (numbered) | tables and result lists the user addresses, compares, or exports | feeds read in order |
| **Cursor "Load more"** | feeds, logs, activity streams | needing page numbers or totals |
| **Tabs** | 2–7 peer sections of one record or page | flow steps; filters; navigation between pages (use nav) |
| **Segmented control** | 2–4 mutually exclusive views of the same data (List / Board / Calendar; Day / Week / Month) | actions, > 4 options (use select), navigation |
Infinite auto-scroll is not used.

## 3. Anatomy
```
Pagination:  1–50 of 1,284     Rows per page [50 ▾]        ‹ Prev  1 2 [3] 4 … 26  Next ›
Tabs:        Overview │ Activity │ Members │ Settings        ← underline tabs; 2px current bar
             ▔▔▔▔▔▔▔▔
Segmented:   ┌ List │ Board │ Calendar ┐                      ← one 1px border, current = raised fill
```

## 4. Variants
| Control | Variants |
|---|---|
| Pagination | full (numbered + size selector + count) · compact (Prev/Next + "Page 3 of 26", mobile) · cursor ("Load more", shows loaded count) |
| Tabs | underline (default) · with count badge · with icon (16px, optional) |
| Segmented | text only · icon-only (each with tooltip + `aria-label`) · icon+text |

## 5. Sizes
| Control | Spec |
|---|---|
| Pagination buttons | 32px square (36 comfortable pages), radius 6, gap 4; page-size select 32px high; text 13px |
| Page size options | **25 / 50 / 100** (default 50); persisted per table |
| Tabs | height 40px (32 compact), padding 0×12, label 14/500, bar 2px |
| Segmented | height 32px (sm) / 36px (md); item padding 0×12; radius 6 outer, 4 inner; container padding 2px |
Max visible page buttons: 7 (first, last, current ± 1, ellipses).

## 6. States
| State | Pagination | Tabs | Segmented |
|---|---|---|---|
| default | ghost buttons | `text-secondary` | `surface-sunken` track |
| hover | `action-ghost-hover` | `text-primary` | item `action-ghost-hover` |
| focus-visible | 2px ring | 2px ring inset | 2px ring |
| active/current | filled `selected-bg` + semibold + `aria-current="page"` | `text-primary` 600 + 2px `action-primary-rest` bar | `surface-raised` + 1px `border-subtle` + `text-primary` 600 |
| disabled | Prev on page 1, Next on last: `aria-disabled` | `aria-disabled` + tooltip reason | same |
| loading | keep controls, dim results; page changing shows top progress bar | tab panel skeleton | panel skeleton |
| error | message + retry in results area; controls remain | panel error state | same |
Selected/read-only: n/a.

## 7. Content rules
Result count always shown: "1–50 of 1,284" (use "50+ results" for estimated totals). Tab labels: nouns, 1–2 words, ≤ 16 chars, sentence case. **Max 7 tabs, no nested tabs, deep-linkable** (URL path or `?tab=`; browser back works). Segmented: 2–4 items, labels ≤ 10 chars. Page + size are URL-synced (`?page=3&size=50`); changing size resets page to 1; filter/sort change resets page to 1.

## 8. Keyboard & screen reader behavior
Pagination: `<nav aria-label="Pagination">`; buttons `aria-label="Page 3"`, current `aria-current="page"`; Prev/Next labeled. After navigating, focus moves to the results heading and count is announced politely ("Showing 101–150 of 1,284").
Tabs (APG tabs): `role=tablist`, ←/→ move (wrap), Home/End, Tab enters panel; automatic activation when panels are instant, manual (Enter/Space) when panels fetch data. `aria-selected`, `aria-controls`; panel `tabindex="0"` if no focusable content.
Segmented: `role="radiogroup"` with `role="radio"` items (or `aria-pressed` buttons), ←/→ select, one tab stop.

## 9. Tokens used
`color-selected-bg` · `color-action-primary-rest` · `color-action-ghost-{hover,active}` · `color-surface-{sunken,raised}` · `color-border-subtle` · `radius-button` · `radius-control` · `typography-body|body-sm` · `component-table-*`.

## 10. Accessibility notes
Current not color-only (weight + `aria-current`/`aria-selected`). Targets ≥ 32px. Tab bar contrast Azure Blue `#116CB3` on white 5.50:1. Icon-only segmented items have names. Don't use tabs for a form wizard (SC 3.2.x predictability).

## 11. Do / Don't
- Do: "1–50 of 1,284 · Rows per page 50" under the table. Don't: pagination with no total.
- Do: URL-synced tabs where Back returns to the previous tab. Don't: tabs stored only in component state.
- Do: segmented control for List/Board. Don't: segmented control with 7 items.
- Do: "Load more (loaded 100)" for a log. Don't: auto-infinite scroll that hides the footer.

## 12. Code example
```tsx
import * as Tabs from "@radix-ui/react-tabs";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export function PageTabs({ value, onValueChange, items }: { value: string; onValueChange: (v: string) => void; items: { id: string; label: string; count?: number }[] }) {
  return (
    <Tabs.Root value={value} onValueChange={onValueChange}>
      <Tabs.List aria-label="Project sections" className="flex h-10 gap-1 border-b border-subtle">
        {items.map((i) => (
          <Tabs.Trigger key={i.id} value={i.id} className="relative px-3 text-body font-medium text-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus data-[state=active]:font-semibold data-[state=active]:text-primary data-[state=active]:after:absolute data-[state=active]:after:inset-x-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-0.5 data-[state=active]:after:bg-action-primary">
            {i.label}{i.count != null && <span className="ms-2 rounded-round bg-surface-sunken px-1.5 text-caption tabular-nums">{i.count}</span>}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}

export const ViewToggle = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <ToggleGroup.Root type="single" value={value} onValueChange={(v) => v && onChange(v)} aria-label="View" className="inline-flex h-8 rounded-button bg-surface-sunken p-0.5">
    {["List", "Board", "Calendar"].map((v) => (
      <ToggleGroup.Item key={v} value={v.toLowerCase()} className="rounded-control px-3 text-body-sm font-medium text-secondary focus-visible:ring-2 focus-visible:ring-focus data-[state=on]:bg-surface-raised data-[state=on]:font-semibold data-[state=on]:text-primary data-[state=on]:shadow-[0_0_0_1px_var(--color-border-subtle)]">{v}</ToggleGroup.Item>
    ))}
  </ToggleGroup.Root>
);
```
Pagination: shadcn/ui `Pagination` component + URL state via `nuqs` or router search params.

## 13. Anti-patterns
Tabs inside tabs; > 7 tabs; tabs that don't change the URL; pagination without count; page size resetting on every navigation; infinite auto-scroll; segmented control as navigation; segmented with 6+ items; pill-shaped segmented tracks; tab underline in a different color than the current-nav color.

## 14. Responsive & density
320px: pagination compact ("‹ Page 3 of 26 ›", 44px buttons), tabs scroll horizontally with the current tab scrolled into view, segmented control fills width. 768+: full pagination. Compact: 32px tabs, 28px segmented.
