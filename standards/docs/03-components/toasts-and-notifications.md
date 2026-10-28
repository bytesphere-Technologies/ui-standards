# Toasts and notifications

Library: **Sonner** (sonner.emilkowalski.com · npm `sonner`, MIT) via the shadcn/ui `Sonner` wrapper.

## 1. Purpose
Confirm a completed action or report a background result without interrupting the user.

## 2. When to use / when not to
Use for: "Saved", "Link copied", "Export ready", background failure with retry, undo of a reversible action. Not: something that needs a decision → modal or banner; validation errors → inline; system-wide state (outage, trial ending) → banner; persistent history → notification inbox.

### Decision table
| Need | Component | Persistence | Interrupts focus? |
|---|---|---|---|
| Result of a user action, no decision | **Toast** | 4–6s (errors persist) | no |
| Field or form error | **Inline error** | until fixed | no |
| Page-level status the user should keep seeing | **Banner** | until dismissed/resolved | no |
| Contextual hint inside content | **Inline callout** | persistent | no |
| Requires confirm/choice, destructive, or blocks work | **Modal** | until answered | yes (traps focus) |
| History of events to review later | **Notification inbox** | persistent | no |

## 3. Anatomy
```
┌──────────────────────────────────────┐
│ ✓  Invoice sent                    ✕ │  1 status icon 16/20 · 2 title (14/600, 1 line) · 3 close (24px target)
│    to billing@acme.com        [Undo] │  4 description (13px, 1 line) · 5 action (≤ 1, ghost)
└──────────────────────────────────────┘
```
Width 320–380px (default 360). Padding 12×16. Radius 8. Surface `surface-overlay`, 1px `border-subtle`, `shadow-dropdown`. Gap 8px between stacked toasts.

## 4. Variants
| Variant | Icon | Duration | ARIA |
|---|---|---|---|
| success | `circle-check` (status-success-solid) | 5s | `role="status"` polite |
| info | `info` | 5s | polite |
| warning | `triangle-alert` | 6s | polite |
| error | `circle-x` | **persistent** + Retry | `role="alert"` assertive |
| loading/promise | spinner 16 → resolves into success/error | until resolved | polite |
| undo | none | 6s with visible countdown-free action | polite |

## 5. Sizes
One size. Position: bottom-right on desktop (offset 16px), top-center on mobile (< 640px, full width minus 16px). Max **3 visible**; further toasts queue (FIFO) and enter when one leaves. Same message within 3s is deduplicated (`id`).

## 6. States
default · hover (pauses the timer) · focus-within (pauses) · swipe-to-dismiss on touch · exit (200ms fade+slide). Disabled/read-only/selected: n/a. Loading: promise toast. Error: persistent variant.

## 7. Content rules
Title: 1 line, ≤ 40 chars, past-tense result ("Invoice sent", "Export failed"). Description: 1 line, ≤ 80 chars, the object or the fix ("Check your connection and retry"). Action: verb ("Retry", "Undo", "View"). No exclamation marks, no emoji, no images, no confetti, no "Oops!". Never toast a validation error.

## 8. Keyboard & screen reader behavior
| Key | Behavior |
|---|---|
| F6 / hotkey `Alt+T` | jump to the toast region |
| Tab | into toast actions (toasts do not steal focus on appear) |
| Esc | dismiss focused toast |
Region `role="region" aria-label="Notifications (F6)"`, `aria-live` regions exist before content. Polite for success/info; assertive only for errors. Timer pauses on hover and focus (SC 2.2.1). Never place the only copy of important info in a toast: it must also exist in the page (status line, inbox, row state).

## 9. Tokens used
`component-toast-{width,bg,border,radius,shadow,z}` · `color-status-{success,warning,danger,info}-solid` · `color-text-{primary,secondary}` · `z-toast` (50) · `duration-base`.

## 10. Accessibility notes
SC 4.1.3 status messages. Auto-dismiss ≥ 5s and pausable (SC 2.2.1). Close control 24×24+. Contrast: title 13.70:1, description 7.63:1. Toasts must not cover the primary action or focused element: when a sticky action bar is present, set the Toaster `offset` to the bar height plus 16px (`--sticky-bar-height`).

## 11. Do / Don't
- Do: bottom-right, one-line "Export ready" with "Download". Don't: centered toast covering the Save button.
- Do: persistent red toast "Sync failed" with Retry. Don't: error toast gone in 3 seconds.
- Do: undo toast after archive. Don't: confirm dialog for every reversible action.
- Do: max three stacked. Don't: a tower of eight.

## 12. Code example
```tsx
// app/providers.tsx
import { Toaster } from "@bytesphere/ui/ui/sonner"; // shadcn wrapper around sonner
<Toaster position="bottom-right" visibleToasts={3} closeButton expand={false} toastOptions={{ duration: 5000, classNames: {
  toast: "w-[22.5rem] rounded-card border border-subtle bg-surface-overlay text-primary shadow-dropdown p-3 ps-4",
  title: "text-body font-semibold", description: "text-body-sm text-secondary", actionButton: "text-body-sm font-medium text-link",
}}} />

// usage
import { toast } from "sonner";
toast.success("Invoice sent", { description: "to billing@acme.com", id: "invoice-sent" });
toast.error("Export failed", { description: "Check your connection and retry.", duration: Infinity, action: { label: "Retry", onClick: retry } });
toast.promise(save(), { loading: "Saving…", success: "Changes saved", error: "Couldn't save changes" });
```
Mobile: `<Toaster position={isMobile ? "top-center" : "bottom-right"} />`.

## 13. Anti-patterns
Toasts for validation errors; stacked towers; images, emojis, confetti; toasts covering primary actions; toast that requires a decision; error toasts that auto-dismiss; toast as the only record of a result; toast on every autosave (use the status line); "Success!" with no object.

## 14. Responsive & density
320px: top-center, width `calc(100vw - 32px)`, swipe up to dismiss. 768px+: bottom-right 360px. Density unaffected.
