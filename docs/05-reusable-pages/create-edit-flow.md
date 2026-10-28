# Create / edit flow

**Purpose:** create or modify a record with validated input. **Reuse when:** any form longer than 3 fields (shorter → modal). Archetype C. Rules: `03-components/forms-and-validation.md`.

## Wireframe
```
‹ Projects
Create project                                         (no header primary; actions live at the bottom)
Set up the basics. You can change these later.
┌ Form column 560px ───────────────────────────┐
│ Project name                                  │
│ [___________________________________]         │
│ URL slug                                      │
│ [acme.app/][_______________]  Lowercase, 3–40 │
│ ── Settings ─────────────────────────────     │
│ Visibility   (•) Private  ( ) Workspace       │
│ Budget (USD) [__________]                     │
└───────────────────────────────────────────────┘
─────────────────────────────────────────────────
Draft saved 12:04                     [Cancel] [Create project]    ← sticky action bar
```
Wizard variant: stepper at top (≤ 5 steps) `1 Basics — 2 Team — 3 Review`; Back/Next in the action bar; final step "Review" lists all values with Edit links.

## Required regions
Back link · title · one-sentence description · form column · group headings · sticky action bar with status text · error summary (when failed) · unsaved-changes guard.

## Components
`Field`, `Input`, `Textarea`, `Select`/`Combobox`, `RadioGroup`, `Switch`, `DatePicker`, `FileUpload`, `Button` (primary right), `Banner` (server error), `AlertDialog` (discard), React Hook Form + Zod.

## States
pristine · dirty ("Unsaved changes") · validating (async field spinner) · invalid (per-field + summary) · submitting (button loading, fields read-only) · server error (banner, input kept) · success (redirect to the new record with toast "Project created" / stay with "Saved") · draft restored (banner "Resume your draft? [Discard]") · conflict on edit ("Updated by Ken 1 min ago. [Review changes] [Overwrite]") · loading existing record (field skeletons) · forbidden (read-only view).

## Responsive
≥ 1024: form column 560px left-aligned (or centered if no aside); optional help aside 280px. < 768: full width, 16px padding, action bar full-width stacked (primary first), 44px controls; stepper becomes "Step 2 of 3" text + bar.

## Copy rules
Title "Create {noun}" / "Edit {noun}". Primary button repeats it ("Create project", "Save changes"). Cancel → "Cancel". Helper text states format or reason. Errors "what + how to fix". No "Submit".

## Implementation (shadcn/ui)
shadcn `Form` primitives with React Hook Form (ui.shadcn.com/docs/forms/react-hook-form), `Field` from registry, `Stepper` custom (not in shadcn) built with `Progress` + list; draft autosave to `/api/drafts/:type` every 10s idle; `useBlocker` (router) + `beforeunload` for the guard; idempotency key on create.
