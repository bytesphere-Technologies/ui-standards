# Tooltips, popovers, and menus

Libraries: Radix Tooltip / Popover / DropdownMenu / ContextMenu (radix-ui.com/primitives) via shadcn/ui; **cmdk** (github.com/pacocoursey/cmdk, MIT) for command palettes; **vaul** (MIT) for drawers (see `modals-sheets-drawers.md`).

## 1. Purpose
Reveal secondary information (tooltip), rich contextual content (popover), or a list of actions (menu) anchored to a trigger.

## 2. When to use / when not to
| Need | Use | Not |
|---|---|---|
| Name of an icon-only control, or a one-sentence hint | **Tooltip** | essential info, links, forms, anything on touch-only |
| Rich content: a filter form, a date picker, user card, ≤ 1 screen | **Popover** | long tasks → sheet/modal |
| List of actions on an object | **Menu** (dropdown) | navigation between pages → nav; choosing a form value → select |
| Right-click actions | **Context menu** (always duplicated in a visible menu) | sole access to an action |
| Search + run commands | **Command palette** | |

## 3. Anatomy
Tooltip: 1 bubble (surface `text-primary` inverted: bg `neutral-900`/dark `neutral-50`) · 2 label · arrow optional (none by default).
Menu: 1 panel (radius 8, 1px border, `shadow-dropdown`, padding 4) · 2 group label (overline) · 3 items (36px; 32 compact) with [icon 16] label … [shortcut] · 4 divider · 5 destructive item last · 6 submenu chevron.

## 4. Variants
| Part | Spec |
|---|---|
| Tooltip | max-width 240px; padding 6×8; 13px/500; radius 4; offset 8px |
| Popover | width 240–480px (default 320); padding 16; radius 8; offset 8px |
| Menu | min-width 192px, max 320px; item height **36px** (32 compact); item padding 0×8; item radius 6; icon↔label 8px |
| Menu item types | action · checkbox item · radio item · submenu · label |
| Destructive item | last, separated by a 1px divider, `status-danger-fg` text, icon `trash-2`; confirm via dialog |
| Shortcut hint | right-aligned, 12px mono, `text-tertiary`, e.g. `⌘K`, `⇧⌘P` |

## 5. Sizes
Tooltip max-width 240px, padding 6×8, 13px/500, radius 4, offset 8px. Popover 240–480px (default 320), padding 16, radius 8. Menu min-width 192px, max 320px, item height 36px (32 compact), item padding 0×8, radius 6. Spec table in §4.

## 6. States
| State | Tooltip | Menu item |
|---|---|---|
| default | hidden | `text-primary` |
| hover | opens after **500ms** (0ms if another tooltip is open); stays open while pointer is on bubble | bg `action-ghost-hover` |
| focus-visible | opens immediately on keyboard focus | same bg + ring inset |
| active | — | bg `action-ghost-active` |
| selected | — | check icon 16px at end (checkbox/radio items) |
| disabled | — | `text-disabled`, `aria-disabled`, skipped by type-ahead, reason in item description if actionable |
| loading | — | trailing spinner 16px, item `aria-busy` |
| error / read-only | n/a | n/a |

## 7. Content rules
Tooltip: **one short sentence fragment, ≤ 80 chars**, no period for fragments, never the only place information lives, never interactive content. Name tooltips use the same text as `aria-label`. Menu items: verb-first, sentence case, ≤ 28 chars ("Duplicate", "Move to folder…"; ellipsis when the item opens a dialog for more input). Max 7 items per group, 12 per menu; beyond that, group with labels or use a popover with search.

## 8. Keyboard & screen reader behavior
| Component | Keys |
|---|---|
| Tooltip | opens on focus; Esc closes; hoverable and persistent (SC 1.4.13) |
| Menu (APG menu button) | Enter/Space/↓ open (first item), ↑ opens (last item); ↑↓ move; Home/End; type-ahead; →/← open/close submenu; Enter/Space activate; Esc close + return focus to trigger; Tab closes |
| Popover | Enter/Space toggles; focus moves into it if interactive; Esc closes + returns focus; Tab leaves it by closing when at the end (non-modal) |
| Command palette | ⌘K / Ctrl+K opens; typing filters; ↑↓ move; Enter run; Esc close; ⌘Backspace clear |
Roles: tooltip `role="tooltip"` linked by `aria-describedby`; menu `role="menu"`/`menuitem*`; trigger `aria-haspopup="menu" aria-expanded`.

## 9. Tokens used
`component-menu-{item-height,radius,bg,item-hover,shadow,z}` · `color-surface-overlay` · `color-border-subtle` · `color-text-{primary,secondary,tertiary,inverse}` · `color-status-danger-fg` · `z-dropdown` (20) · `z-tooltip` (60) · `duration-fast`/`instant`.

## 10. Accessibility notes
Tooltip contrast: `text-inverse` on `neutral-900` = 13.70:1 (light), Rich Black `#000913` on `#F7F7F8` (dark) ≥ 17:1. Menu item target 36px. Touch: tooltips don't exist; use visible labels or a popover on tap. Do not use `title` as the sole accessible name.

## 11. Do / Don't
- Do: "Delete invoice" tooltip on the trash icon button. Don't: a paragraph with a link inside a tooltip.
- Do: menu with Edit, Duplicate, Archive, divider, Delete in red. Don't: Delete first, no divider.
- Do: `⌘D` hint right-aligned on Duplicate. Don't: shortcuts that exist but are not shown anywhere.
- Do: popover with a filter form and Apply button. Don't: popover with nested popovers.

## 12. Code example
```tsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Ellipsis, Pencil, Copy, Archive, Trash2 } from "lucide-react";
import { Button } from "@bytesphere/ui/ui/button";

const item = "flex h-(--row-menu,2.25rem) cursor-default select-none items-center gap-2 rounded-button px-2 text-body text-primary outline-none data-[highlighted]:bg-action-ghost-hover data-[disabled]:text-disabled";

export function RowMenu({ name }: { name: string }) {
  return (
    <DropdownMenu.Root>
      <Tooltip.Root delayDuration={500}>
        <Tooltip.Trigger asChild>
          <DropdownMenu.Trigger asChild><Button variant="ghost" size="icon" aria-label={`Actions for ${name}`}><Ellipsis /></Button></DropdownMenu.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Portal><Tooltip.Content sideOffset={8} className="z-tooltip max-w-60 rounded-control bg-[--color-text-primary] px-2 py-1.5 text-body-sm font-medium text-inverse">Actions</Tooltip.Content></Tooltip.Portal>
      </Tooltip.Root>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={8} className="z-dropdown min-w-48 rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown">
          <DropdownMenu.Item className={item}><Pencil className="size-4" aria-hidden />Edit</DropdownMenu.Item>
          <DropdownMenu.Item className={item}><Copy className="size-4" aria-hidden />Duplicate<span className="ms-auto font-mono text-caption text-tertiary">⌘D</span></DropdownMenu.Item>
          <DropdownMenu.Item className={item}><Archive className="size-4" aria-hidden />Archive</DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-[--color-border-subtle]" />
          <DropdownMenu.Item className={`${item} text-status-danger-fg`}><Trash2 className="size-4" aria-hidden />Delete…</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
```
(Wrap the app in `<Tooltip.Provider skipDelayDuration={300}>`.)

## 13. Anti-patterns
Tooltip as the only place info lives; tooltips with links/buttons; hover-only menus; menus > 12 items ungrouped; destructive item first or unseparated; popover inside popover; menu opening on hover; custom `title` attribute tooltips; context menu without a visible equivalent.

## 14. Responsive & density
Touch: tooltips are replaced by visible labels; menus become bottom sheets (vaul) < 640px with 44px items. Compact: items 32px.

