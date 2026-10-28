# Inputs, fields, and selects

## 1. Purpose
Capture typed, chosen, or toggled values: text, numbers, dates, options, booleans.

## 2. When to use / when not to
Use `Field` (label + control + helper + error) for every form value. Not: a short list of 2–4 mutually exclusive views → segmented control; a command → button; filtering a table by one column → filter chip popover.

## 3. Anatomy
```
Label *  (optional)                      ← 1 label (above, always) · 2 requirement mark
┌──────────────────────────────────┐
│ [prefix] value text   [suffix]   │     ← 3 control: 1px border-control, radius 6px (`radius-control`) · 4 prefix/suffix/unit slots
└──────────────────────────────────┘
Helper text or error message             ← 5 helper slot · 6 error slot (replaces helper) · 7 counter (optional)
```
Label→control 4px; control→helper 4px; field→field 16px (12 compact).

## 4. Variants
| Control | Spec |
|---|---|
| Text, email, url, tel, password | single-line input |
| Textarea | min 3 rows (88px), vertical resize only, auto-grow ≤ 12 rows, counter if limit |
| Search | leading `search` 16px icon, trailing clear (x) when non-empty, `type="search"`, `role="searchbox"` |
| Select (native-styled, ≤ 7 options, no search) | Radix Select |
| Combobox | > 7 options or async; typeahead; React Aria ComboBox / shadcn Combobox (cmdk + Popover) |
| Multi-select | chips (removable tags, 24px) inside control, wrap to max 2 lines then "+N", clear all |
| Checkbox | 16×16, radius 4 (`radius-tag`), 1px border-control; indeterminate supported; label right, 8px gap |
| Radio | 16×16 circle (`radius-round` permitted: radio is a status-dot class element), group in `fieldset/legend` |
| Switch | 32×18 track; immediate-effect settings only; label left, switch right |
| Slider | 4px track, 16px thumb, value label; paired number input when precision matters |
| Date picker | input with mask + calendar popover; typing always works; range = two inputs + one calendar |
| Number stepper | input + − / + buttons 28px, `inputmode="decimal"`, min/max/step enforced on blur |
| OTP | N single-char inputs 40×48, auto-advance, paste fills all, `autocomplete="one-time-code"`, `inputmode="numeric"` |
| Masked (card, phone, IBAN) | mask applied on input, raw value stored; caret never jumps |

## 5. Sizes
| Size | Height | Padding x | Font |
|---|---|---|---|
| sm | 32px | 8px | 13px |
| md | 36px | 12px | 14px (default) |
| lg | 40px | 12px | 14px (16px on touch to prevent iOS zoom) |
Compact: md→32px. Touch: 44px.

## 6. States
| State | Change |
|---|---|
| default | 1px `border-control`, bg `input-bg`, text `text-primary`, placeholder `input-placeholder` |
| hover | border `text-secondary` color |
| focus-visible | border `focus-ring` + 2px ring offset 0 inside (`ring-2 ring-focus`) |
| active | same as focus |
| selected | n/a for text inputs; checkbox/radio/switch checked = fill `action-primary-rest`, check glyph `action-primary-fg` |
| disabled | bg `surface-sunken`, text `text-disabled`, cursor not-allowed; use only for transient states; permanent lock = read-only |
| loading | trailing 16px spinner in the suffix slot; value remains editable unless a blocking validation; `aria-busy` |
| error | border `status-danger-solid`, `aria-invalid="true"`, error text `status-danger-fg` 13px with `circle-x` 16px icon below the field |
| read-only | bg `input-bg-readonly`, no border change on hover, selectable and focusable, `readOnly`; optional lock icon + reason in helper |

## 7. Content rules
Labels: noun phrases, sentence case, ≤ 3 words ideal, ≤ 40 chars ("Work email"). Label always above the field. Helper ≤ 90 chars, states the format or why we ask ("We'll send the invoice here"). **Required vs optional:** when most fields are required, mark the optional ones "(optional)" in `text-tertiary` after the label and mark nothing else; when most are optional, mark required with `*` plus a legend "* required" at the form top. Never mix both. Placeholder: example value only ("name@company.com"), `text-tertiary`, never an instruction or label.

## 8. Keyboard & screen reader behavior
| Control | Keys |
|---|---|
| Input | typing; Esc clears search only |
| Select (APG listbox) | Enter/Space/↓ open; ↑↓ move; Home/End; type-ahead; Enter selects; Esc closes |
| Combobox (APG combobox) | ↓ opens; typing filters; ↑↓ navigate; Enter selects; Esc closes then clears |
| Multi-select | Backspace on empty input removes last chip; chips are buttons with `aria-label="Remove {name}"` |
| Checkbox / switch | Space toggles |
| Radio group | Tab to group, arrows move+select |
| Slider | arrows ±step, PageUp/Down ±10%, Home/End |
| Date | typing, arrows in grid, PageUp/Down month, Shift+PageUp/Down year, Esc |
Screen reader: `<label for>`; helper and error via `aria-describedby`; `aria-invalid`; `aria-required`; groups in `fieldset` + `legend`; switch is `role="switch"` + `aria-checked`.

**Attributes (mandatory):**
| Field | type | inputmode | autocomplete |
|---|---|---|---|
| Email | `email` | `email` | `email` |
| Phone | `tel` | `tel` | `tel` |
| Name | `text` | — | `name` / `given-name` / `family-name` |
| Password | `password` | — | `current-password` / `new-password` |
| OTP | `text` | `numeric` | `one-time-code` |
| Postal code | `text` | `numeric` (if numeric locale) | `postal-code` |
| Amount | `text` | `decimal` | `off` |
| Card number | `text` | `numeric` | `cc-number` |
| Search | `search` | `search` | `off` |
Set `enterkeyhint` (`search`, `send`, `next`, `done`). Disable `spellcheck` and `autocapitalize` on email, username, codes.

## 9. Tokens used
`component-input-{height,radius,bg,bg-readonly,border-rest,border-hover,border-focus,border-error,fg,placeholder,padding-x}` · `color-text-{primary,secondary,tertiary,disabled}` · `color-status-danger-{fg,solid}` · `color-focus-ring` · `color-action-primary-{rest,fg}`.

## 10. Accessibility notes
Control boundary 3.75:1 (SC 1.4.11). Placeholder 5.40:1. Error ≠ color only (icon + text). Autocomplete tokens (SC 1.3.5). Label in name (SC 2.5.3). Switch target 32×24+ with a full-row label click area. Don't use `maxlength` to silently truncate; show a counter and error.

## 11. Do / Don't
- Do: "Work email" label above a 36px field, helper "We'll send invoices here" under it. Don't: the word "Email" only inside the field as placeholder.
- Do: error "Enter a date after 1 Mar 2026" in red with an icon under the field. Don't: red border alone, or "Invalid input".
- Do: switch for "Email notifications" that saves instantly. Don't: switch inside a form that needs a Save button.
- Do: select for 5 options; combobox for 200. Don't: a 200-item native dropdown.

## 12. Code example
```tsx
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const input = cva(
  "flex w-full rounded-control border border-control bg-input text-body text-primary placeholder:text-input-placeholder " +
  "px-3 transition-colors duration-instant hover:border-text-secondary " +
  "focus-visible:outline-none focus-visible:border-focus focus-visible:ring-2 focus-visible:ring-focus " +
  "aria-[invalid=true]:border-status-danger-solid read-only:bg-input-readonly disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-disabled",
  { variants: { size: { sm: "h-8 text-body-sm", md: "h-(--control-md)", lg: "h-10" } }, defaultVariants: { size: "md" } },
);

export function Field({ id, label, hint, error, optional, children }: {
  id: string; label: string; hint?: string; error?: string; optional?: boolean; children: (p: React.AriaAttributes & { id: string }) => React.ReactNode;
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-body font-medium text-primary">
        {label}{optional && <span className="ms-1 font-normal text-tertiary">(optional)</span>}
      </label>
      {children({ id, "aria-describedby": describedBy, "aria-invalid": !!error || undefined })}
      {hint && !error && <p id={`${id}-hint`} className="text-body-sm text-secondary">{hint}</p>}
      {error && <p id={`${id}-err`} className="flex items-center gap-1 text-body-sm text-status-danger-fg"><CircleX className="size-4" aria-hidden />{error}</p>}
    </div>
  );
}
// <Field id="email" label="Work email" hint="We'll send invoices here">{(p) => <input {...p} type="email" autoComplete="email" inputMode="email" className={cn(input())} />}</Field>
```

## 13. Anti-patterns
Placeholder as label; floating labels; labels left of fields in forms; red border only; disabled fields that hide why; `maxlength` truncation; custom dropdowns without keyboard; native `<select>` for 200 options; auto-focus stealing on load (except auth and search); clearing the field on error; input masks that fight paste.

## 14. Responsive & density
320px: single column, 44px controls, 16px font to prevent iOS zoom. 768px: two-column forms only for short paired fields (first/last name, city/zip). 1440px: form column max 560px. Compact: 32px controls, 12px gaps.
