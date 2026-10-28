# Button

## 1. Purpose
Trigger an action (submit, create, delete, open a dialog). Navigation is a link.

## 2. When to use / when not to
Use: actions that change data or UI state in place. Not: moving to another page → `<a>` styled via `buttonVariants` (link semantics); toggling a view → segmented control; picking from a list → menu / select.

## 3. Anatomy
```
[ ◻ icon-start ]  Label  [ ◻ icon-end ]      ← 1 container · 2 icon · 3 label · 4 spinner (replaces icon-start while loading)
```
1 container (radius-button 6px) · 2 optional icon 16px · 3 label (14px/500) · 4 spinner 16px · 5 focus ring (2px + 2px offset).

## 4. Variants
| Variant | Use | Fill | Border | Label |
|---|---|---|---|---|
| primary | the one main action of a view | `action-primary-rest` | none | `action-primary-fg` |
| secondary (outline) | other significant actions | `action-secondary-rest` | 1px `action-secondary-border` | `action-secondary-fg` |
| ghost | toolbar actions, icon buttons, low emphasis | transparent | none | `action-ghost-fg` |
| subtle | tinted emphasis, e.g. "Upgrade" prompt inside a card | `action-subtle-rest` | none | `action-subtle-fg` |
| danger | destructive action | `action-danger-rest` | none | `action-danger-fg` |

Rule: **one primary per view** (page or dialog). Two primaries on screen is a review failure; the second becomes secondary. The primary is rightmost in dialogs/forms and top-right in page headers. Danger buttons never sit next to a primary in the same row without a divider/space ≥ 16px.

## 5. Sizes
| Size | Height | Padding x | Font | Icon | Use |
|---|---|---|---|---|---|
| sm | 32px | 12px | 13px/500 | 16 | dense toolbars, table rows, compact mode |
| md | 36px | 16px | 14px/500 | 16 | **default** |
| lg | 40px | 20px | 14px/500 | 16 | page-level primary on forms, auth |
| touch | ≥ 44px | 20px | 16px/500 | 20 | all buttons < 768px viewport |
| icon-only | 32/36/40 square | — | — | 16/20 | needs `aria-label` + tooltip |

Min height 36px in product, 44px on touch. Compact density: sm→28px, md→32px (hit-area padded to 24px min).

## 6. States
| State | Change |
|---|---|
| default | per variant |
| hover | `-hover` token, 100ms; cursor default (not pointer) for buttons |
| focus-visible | 2px `focus-ring`, 2px offset |
| active | `-active` token; no translate or scale |
| selected (toggle buttons) | `aria-pressed="true"`, `action-*-selected` fill |
| disabled | fill `action-primary-disabled`, label `action-primary-fg-disabled`, `disabled` attr; **prefer read-only-with-reason (below)** |
| loading | spinner replaces icon-start (or is prepended if none); label preserved; `aria-busy="true"` + `aria-disabled="true"`; width does not change; click ignored |
| error | n/a — errors belong to the form/field, not the button |
| read-only | n/a for buttons; use disabled-with-reason |

**Disabled vs read-only-with-reason:** do not disable primary submit buttons; leave enabled and surface validation on click. When an action is unavailable for a reason the user can act on (missing permission, plan limit, prerequisite), render `aria-disabled="true"` (focusable) with a tooltip or adjacent text stating the reason ("Only admins can invite members"). Native `disabled` is for transient states (in-flight request) only.

## 7. Content rules
Verb-first, sentence case, 1–3 words, ≤ 24 chars: "Save changes", "Invite member", "Export CSV". No terminal punctuation. No "Click here", "Submit", "OK" alone, or "Yes/No" (use the verbs: "Delete project" / "Keep project"). Destructive labels name the object ("Delete 3 invoices").

## 8. Keyboard & screen reader behavior
| Key | Behavior |
|---|---|
| Tab | focus |
| Enter, Space | activate (Space on keyup) |
APG Button pattern (w3.org/WAI/ARIA/apg/patterns/button). Role `button`, accessible name from label or `aria-label`. Loading announces via the button's `aria-busy` plus a polite status "Saving…" in the page's live region. Toggle buttons use `aria-pressed`. Menu triggers use `aria-haspopup="menu"` + `aria-expanded`.

**Button vs link:** if it changes the URL → link (`<a href>`, opens in new tab with middle-click). If it changes data/state → `<button type="button|submit">`. Never `<a href="#" onClick>`; never `<div onClick>`. Link-styled-as-button is allowed for navigation CTAs (`asChild`).

**Destructive confirmation rule:** danger buttons that delete data open a confirm dialog that names the object and consequence ("Delete 'Q3 report'? This removes 14 revisions and cannot be undone."). Confirm button repeats the verb ("Delete report"). Typed confirmation only for irreversible mass actions (see `modals-sheets-drawers.md`). Reversible deletes use undo toast instead of a dialog.

## 9. Tokens used
`color-action-{primary,secondary,ghost,subtle,danger}-{rest,hover,active,selected,disabled,fg,border}` · `component-button-height-{sm,md,lg}` · `radius-button` · `component-button-padding-x-*` · `component-button-gap` · `color-focus-ring` · `duration-instant`.

## 10. Accessibility notes
Primary label/fill 5.50:1 (light, Azure Blue), 8.08:1 (dark). Danger 6.39:1. Target ≥ 32px (SC 2.5.8). Visible focus (SC 2.4.7, 2.4.11). Accessible name contains visible label (SC 2.5.3). Spinner is `aria-hidden`; busy state is exposed on the button.

## 11. Do / Don't
- Do: a page header with one filled blue "Create project" at top-right and a gray outline "Import" to its left. Don't: three filled blue buttons in a row.
- Do: "Delete report" in red inside a confirm dialog beside a neutral "Cancel". Don't: a red "Yes" next to a red "No".
- Do: "Save changes" shows an in-button spinner with the label intact while saving. Don't: button text replaced by "..." and width shrinking.
- Do: tooltip on an icon-only trash button reading "Delete invoice". Don't: unlabeled icon.

## 12. Code example
```tsx
// components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-button text-body font-medium " +
  "transition-colors duration-instant ease-standard " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focus-offset " +
  "aria-disabled:cursor-not-allowed disabled:cursor-not-allowed [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-action-primary text-action-primary-fg hover:bg-action-primary-hover active:bg-action-primary-active aria-disabled:bg-action-primary-disabled aria-disabled:text-action-primary-fg-disabled",
        secondary: "bg-action-secondary text-action-secondary-fg border border-action-secondary-border hover:bg-action-secondary-hover active:bg-action-secondary-active aria-disabled:bg-action-secondary-disabled aria-disabled:text-disabled",
        ghost: "text-action-ghost-fg hover:bg-action-ghost-hover active:bg-action-ghost-active aria-disabled:text-disabled",
        subtle: "bg-action-subtle text-action-subtle-fg hover:bg-action-subtle-hover active:bg-action-subtle-active",
        danger: "bg-action-danger text-action-danger-fg hover:bg-action-danger-hover active:bg-action-danger-active aria-disabled:bg-action-danger-disabled aria-disabled:text-disabled",
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-(--control-md) px-4",
        lg: "h-10 px-5",
        icon: "size-(--control-md) p-0",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, disabled, children, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const inert = loading || disabled;
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        aria-busy={loading || undefined}
        aria-disabled={inert || undefined}
        onClick={inert ? (e: React.MouseEvent) => e.preventDefault() : onClick}
        {...props}
      >
        {loading && <Loader2 className="animate-spin" aria-hidden />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";
```
Usage: `<Button variant="primary" loading={isPending}>Save changes</Button>` · `<Button size="icon" variant="ghost" aria-label="Delete invoice"><Trash2 /></Button>` wrapped in `<Tooltip>`.

## 13. Anti-patterns
1. Pill-shaped (`rounded-full`) buttons. 2. Gradient or glow fills. 3. Two primaries per view. 4. Disabled submit with no reason. 5. Loading state that swaps the label for a spinner only. 6. Uppercase labels. 7. Icon-only without name. 8. Hover lift/translate. 9. Button used as a link. 10. Emoji in a label.

## 14. Responsive & density
320px: buttons in a footer stack full-width, primary on top; touch height 44px. 768px: inline right-aligned. 1440px: unchanged. Compact: sm 28px / md 32px; never shrink hit area under 24px.
