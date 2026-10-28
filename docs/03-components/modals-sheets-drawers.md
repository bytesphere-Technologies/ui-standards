# Modals, sheets, and drawers

Libraries: Radix Dialog (radix-ui.com/primitives/docs/components/dialog) via shadcn `Dialog`/`Sheet`/`AlertDialog`; **vaul** (github.com/emilkowalski/vaul, MIT) for the mobile bottom drawer.

## 1. Purpose
Hold a focused task or decision in a layer above the page.

## 2. When to use / when not to
| Container | Use | Not |
|---|---|---|
| **Modal** (centered) | a short decision, ≤ 3 fields, confirm | long forms, browsing, multi-step flows → page |
| **Alert dialog** | destructive/irreversible confirmation; requires an answer | informational notices → banner/toast |
| **Sheet / drawer** (side, right) | contextual side task: edit a record while seeing the list, filters, details | tasks needing full width |
| **Bottom sheet** (mobile) | any modal/sheet on < 640px | |
| **Full page** | anything long, shareable by URL, or > 3 fields | |
Never: modal inside a modal; modal for long forms; modal that opens automatically on page load (exception: required legal/consent, as a page-level gate).

## 3. Anatomy
```
scrim ─────────────────────────────────────────
   ┌────────────────────────────────────┐
   │ Title (h4/h3)                    ✕ │  1 header (24px padding) · 2 close (36px target)
   │ Description (optional, 14px)       │  3 description (aria-describedby)
   │ ─ body (scroll inside if tall) ─   │  4 body
   │                  [Cancel] [Delete] │  5 footer: Cancel left of primary, right-aligned
   └────────────────────────────────────┘
```

## 4. Variants
| Variant | Width | Height | Radius |
|---|---|---|---|
| Modal sm (confirm) | **400px** | auto | 12 |
| Modal md (form) | **560px** | auto, max `100dvh − 64px` | 12 |
| Modal lg (preview/table) | **720px** | max `100dvh − 64px` | 12 |
| Side sheet | 400 / 560 / 720px, full height | 100dvh | 0 on screen edge side, 12 on inner corners |
| Bottom sheet (< 640px) | 100% | auto ≤ 90dvh, drag handle 36×4 | 12 top |
Padding 24px. Footer separated by 1px `border-subtle` when body scrolls. Z: scrim `z-overlay` 30, panel `z-modal` 40.

## 5. Sizes
Widths 400 / 560 / 720px (modal), 400 / 560 / 720px (side sheet), 100% (bottom sheet); padding 24px; max height `100dvh − 64px`. Full table in §4.

**Behavior (all containers)**

1. **Focus trap**: Tab cycles inside; background `inert`. 2. **Initial focus**: first field; for destructive dialogs focus Cancel; for read-only content focus the title. 3. **Esc** closes (not while a blocking submit runs). 4. **Overlay click** closes only non-destructive, no-unsaved-data dialogs; it never closes alert dialogs or dirty forms. 5. **Return focus** to the trigger. 6. **Scroll lock** on body with `scrollbar-gutter: stable`. 7. Body scrolls inside the panel; header and footer stay. 8. Mobile (< 640px): modals render as bottom sheets via vaul.

## 6. States
default · opening (300ms) · closing (200ms) · loading (skeleton body) · submitting (footer button `loading`, fields `readOnly`) · error (banner inside body top, input preserved) · dirty (closing prompts discard). Hover/active: only buttons. Disabled/selected/read-only: n/a.

## 7. Content rules
Title: states the task or the object ("Invite team member", "Delete 'Q3 report'?"). Confirm button repeats the verb ("Delete report", not "OK"/"Yes"). Description states the consequence and reversibility ("This permanently removes 14 revisions. This can't be undone."). No more than one paragraph. Cancel is always present and named "Cancel" (or "Keep project" when it clarifies).

**Destructive confirmation pattern:** (a) reversible delete → no dialog, undo toast 6s. (b) single irreversible delete → alert dialog naming the object + consequence. (c) irreversible **mass** action (delete > 10 records, delete workspace, revoke all keys) → alert dialog with **typed confirmation**: "Type DELETE ACME to confirm" (the object's name), confirm button disabled until it matches exactly and shows the match state in text, not color alone.

## 8. Keyboard & screen reader behavior
`role="dialog"` (`alertdialog` for destructive) `aria-modal="true"` `aria-labelledby` title `aria-describedby` description. Esc closes; Tab/Shift+Tab wrap; Enter activates the focused button (never auto-confirms destructive on Enter from the typed input unless it matches). Opening announces the title. APG: w3.org/WAI/ARIA/apg/patterns/dialog-modal.

## 9. Tokens used
`component-modal-{width-sm,width-md,width-lg,bg,radius,padding,scrim,shadow,z}` · `color-border-subtle` · `z-overlay` · `z-modal` · `duration-slow` · `easing-enter/exit`.

## 10. Accessibility notes
SC 2.4.3 focus order, 2.1.2 no trap (Esc exits), 4.1.2 name/role, 1.4.10 reflow (modal scrolls, never exceeds viewport at 320px/400% zoom), 2.4.11 focus not obscured. Close button 36px target with `aria-label="Close"`.

## 11. Do / Don't
- Do: 400px dialog "Delete 'Q3 report'?" explaining 14 revisions are removed, buttons Cancel / Delete report. Don't: "Are you sure?" with Yes / No.
- Do: side sheet to edit a row while the table stays visible. Don't: a 12-field form in a centered modal.
- Do: typed confirmation for deleting a workspace. Don't: typed confirmation to archive a draft.
- Do: bottom sheet on a phone. Don't: a centered 560px modal clipped at 320px.

## 12. Code example
```tsx
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@bytesphere/ui/ui/button";

export function DeleteReportDialog({ name, revisions, onConfirm, children }: { name: string; revisions: number; onConfirm: () => Promise<void>; children: React.ReactNode }) {
  const [busy, setBusy] = React.useState(false);
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-overlay bg-overlay-scrim data-[state=open]:animate-in data-[state=open]:fade-in" />
        <AlertDialog.Content className="fixed start-1/2 top-1/2 z-modal w-[min(25rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-modal bg-surface-overlay p-6 shadow-modal">
          <AlertDialog.Title className="text-h4 font-semibold text-primary">Delete “{name}”?</AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-body text-secondary">This removes {revisions} revisions. This can’t be undone.</AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel asChild><Button variant="secondary">Cancel</Button></AlertDialog.Cancel>
            <Button variant="danger" loading={busy} onClick={async () => { setBusy(true); await onConfirm(); }}>Delete report</Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
```

## 13. Anti-patterns
Modal inside modal; modal for long forms; auto-open on load; "Are you sure?" with no consequence; Yes/No buttons; overlay click closing a dirty form; no Cancel; scroll bleed to the page; backdrop blur; modal without focus return; stacked toast over a modal's primary button.

## 14. Responsive & density
< 640px: bottom sheet (vaul), footer buttons full-width stacked, primary first. 640–1023: modals as specified; sheets 400px. ≥ 1024: sheets up to 720px. Density: modal padding stays 24px; controls follow mode.
