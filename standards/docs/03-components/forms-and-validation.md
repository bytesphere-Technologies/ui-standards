# Forms and validation

## 1. Purpose
Collect structured input and get it submitted correctly the first time.

## 2. When to use / when not to
Use for any multi-field input. Not: a single-field inline edit → click-to-edit field with Esc/Enter; a toggle that applies instantly → switch with auto-save; a choice that opens a flow → button.

## 3. Anatomy
```
Page/section title
Description (what happens on submit)
[error summary — only after failed submit, > 6 fields or > 1 error]
Field ─ Field ─ Field          ← 1 column, 1 field per row, 16px gap
Group heading (h4) ... 32px above
──────────────────────────────
[Cancel]            [Save changes]   ← action bar, consistent side
```
Parts: 1 header · 2 error summary · 3 fields · 4 group headings · 5 action bar · 6 status line ("Saved 12:04", "Unsaved changes").

## 4. Variants
| Variant | Use |
|---|---|
| Page form | create/edit flow, settings sections |
| Dialog form | ≤ 3 fields, one decision |
| Inline form | filters, rename, add-comment |
| Wizard | > 12 fields or branching; ≤ 5 steps, stepper shows progress, each step saves a draft |

## 5. Sizes
Form column max-width 560px (single), 720px (with side help). Field gap 16px (12 compact). Group gap 32px. Action bar 24px above/below, sticky at bottom for forms taller than the viewport (`sticky bottom-0 bg-surface border-t border-subtle py-3`).

## 6. States
| State | Behavior |
|---|---|
| pristine | no validation messages |
| dirty | status line "Unsaved changes"; navigation guard armed |
| validating | per-field spinner only for async checks (e.g. unique slug), debounced 400ms |
| error | per-field message + (long forms) summary; focus moves to summary or first invalid field |
| submitting | submit button `loading`, other actions disabled, fields `aria-busy`, inputs `readOnly` |
| success | confirmation (toast for in-place save, redirect with banner for create, inline "Saved" for settings) |
| failure (server) | non-field error in a danger banner at form top, input preserved, retry available |
| read-only | all fields read-only with an "Edit" button |
| loading (initial data) | skeleton fields matching heights |
| empty | n/a |

## 7. Content rules
1. **Layout:** single column, one field per row. Exceptions: paired short fields (first/last name, city/postal, start/end date).
2. **Primary action:** exactly one. Position: bottom-right of the form (dialogs, pages) — pick right-aligned and keep it for the whole product; Cancel left of it as secondary/ghost.
3. **Validation timing:** validate **on blur**, re-validate **on change once the field has been touched/errored**, and fully on submit. Never validate on first keystroke. Never block typing or strip characters.
4. **Error message format:** "What went wrong + how to fix." ≤ 100 chars. Good: "Password needs at least 12 characters. Add 4 more." Bad: "Invalid input", "Error", "Required field!!".
5. Required-field missing: "Enter your work email." (verb + noun). Format: "Enter a date as DD/MM/YYYY." Range: "Choose a start date before the end date."
6. **Error summary** (> 6 fields or > 1 error after submit): `role="alert"` region at top, heading "Fix 3 errors to continue", list of links that focus each field. GOV.UK error summary pattern.
7. **Drafts:** long forms autosave to server (create flows) or `localStorage` (anonymous) every 10s of idle and on blur; restore with "Resume your draft?" banner. Status line shows "Draft saved 12:04".
8. **Unsaved-changes guard:** `beforeunload` + router blocker on dirty forms; dialog "Discard changes? You have unsaved edits to 'Project settings'." with "Keep editing" (primary) and "Discard changes".
9. **Double-submit prevention:** disable via `loading` on first submit, ignore subsequent submits, send an idempotency key (`Idempotency-Key: uuid`) on create requests.
10. **Success:** say what happened and where to go: "Project created. View project". Never a bare "Success!".

## 8. Keyboard & screen reader behavior
Enter in a single-line field submits (except in textarea; ⌘/Ctrl+Enter submits there). Tab order = visual order. On failed submit, focus the error summary (>1 error) or the first invalid field. Errors announced via `aria-live="polite"` summary and `aria-describedby` per field. Wizard steps: `aria-current="step"` on stepper, focus moves to the step heading.

## 9. Tokens used
`space-stack-md` (16) · `space-stack-lg` (24) · `color-status-danger-{fg,bg,border}` · `color-border-subtle` · `component-input-*` · `component-button-*` · `typography-h4`.

## 10. Accessibility notes
SC 3.3.1 error identification, 3.3.2 labels, 3.3.3 error suggestion, 3.3.4 prevention for legal/financial, 3.3.7 redundant entry, 3.3.8 accessible authentication, 1.3.5 autocomplete. Don't time out forms without warning (SC 2.2.1). Preserve all input on any failure.

## 11. Do / Don't
- Do: a 560px single column with the Save button bottom-right and a "Draft saved 12:04" note. Don't: two columns of unrelated fields with the buttons floating mid-page.
- Do: an error appears when leaving the field: "Enter a valid email, like name@company.com". Don't: red text flashing after typing the first letter.
- Do: a top summary "Fix 3 errors" with links on a 20-field form. Don't: only red borders far below the fold.
- Do: the form keeps all input after a 500 error with a retry banner. Don't: reset the form.

## 12. Code example (React Hook Form + Zod)
**Decision: React Hook Form + Zod** (ui.shadcn.com/docs/forms/react-hook-form) — it's what the shadcn registry's `Form` primitives wrap. TanStack Form is not used in this codebase; one form library per product.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@bytesphere/ui/ui/button";
import { Field } from "@bytesphere/ui/ui/field";

const schema = z.object({
  name: z.string().min(1, "Enter a project name."),
  slug: z.string().regex(/^[a-z0-9-]{3,40}$/, "Use 3–40 lowercase letters, numbers, or hyphens."),
});
type Values = z.infer<typeof schema>;

export function CreateProjectForm({ onSubmit }: { onSubmit: (v: Values) => Promise<void> }) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } =
    useForm<Values>({ resolver: zodResolver(schema), mode: "onBlur", reValidateMode: "onChange" });
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-[35rem] flex-col gap-4">
      <Field id="name" label="Project name" error={errors.name?.message}>
        {(p) => <input {...p} {...register("name")} className="…input classes…" autoComplete="off" />}
      </Field>
      <Field id="slug" label="URL slug" hint="Lowercase letters, numbers, hyphens" error={errors.slug?.message}>
        {(p) => <input {...p} {...register("slug")} className="…input classes…" autoComplete="off" />}
      </Field>
      <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-subtle bg-surface py-3">
        <span className="text-body-sm text-tertiary" aria-live="polite">{isDirty ? "Unsaved changes" : ""}</span>
        <div className="flex gap-2">
          <Button type="button" variant="secondary">Cancel</Button>
          <Button type="submit" variant="primary" loading={isSubmitting}>Create project</Button>
        </div>
      </div>
    </form>
  );
}
```

## 13. Anti-patterns
Validate-on-keystroke; "Invalid input"; disabled submit with no reason; form reset on error; two primary actions; modals for long forms; placeholder labels; captchas as the only auth path; clearing a password field after a failed login; requiring confirm-email fields (use show-password and paste instead).

## 14. Responsive & density
320px: single column, actions stack full width, primary first (top), sticky bottom bar with 44px buttons. 768px+: paired short fields allowed, actions inline. Compact density only on filter/inline forms.
