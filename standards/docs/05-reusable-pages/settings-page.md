# Settings page

**Purpose:** let users configure account, workspace, and notifications. **Reuse when:** every product. Archetype C inside a settings shell. Rules: `04-patterns/settings-and-preferences.md`.

## Wireframe
```
Settings
┌ Nav 220px ───────┐ ┌ Content 720px ─────────────────────────────────────┐
│ ACCOUNT          │ │ Profile                                              │
│  ▌Profile        │ │ ┌ Card ────────────────────────────────────────────┐ │
│   Security       │ │ │ Personal information                              │ │
│   Notifications  │ │ │ Full name   [Mia Moreno__________]                │ │
│ WORKSPACE        │ │ │ Work email  mia@acme.com  (managed by SSO 🔒)      │ │
│   General        │ │ │ ─────────────────────────────────────────────     │ │
│   Members        │ │ │                           [Cancel] [Save changes] │ │
│   Billing        │ │ └───────────────────────────────────────────────────┘ │
│ DEVELOPERS       │ │ ┌ Card — Preferences (saves automatically) ─────────┐ │
│   API keys       │ │ │ Theme  [System ▾]    Density [Comfortable ▾]      │ │
│                  │ │ └───────────────────────────────────────────────────┘ │
└──────────────────┘ │ ┌ Danger zone ──────────────────────────────────────┐ │
                     │ │ Delete account — permanently removes…  [Delete…]  │ │
                     │ └───────────────────────────────────────────────────┘ │
```

## Required regions
Secondary nav (groups, ≤ 12 items) · page title (the current section) · section cards (each with heading, description, controls, save model label) · danger zone (last) · status feedback ("Saved").

## Components
`Card`, `Field`, `Input`, `Select`, `Switch`, notification preference `Table` with switches, `Button`, `AlertDialog` (typed confirmation), `Avatar` uploader, API key row with copy/revoke, `Separator`.

## States
loading (card skeletons) · saved (inline "Saved" 2s) · save failed (inline error + Retry; revert for auto-save) · dirty (guard) · read-only/permission-limited ("Only owners can change workspace settings" per card) · plan-locked (feature + "See plans") · SSO-managed fields locked with reason · destructive pending (dialog).

## Responsive
< 768: secondary nav becomes a select-like list page ("Settings" index → drill into a section, back link); cards full-width 16px padding; notification table → per-event card with 3 switches; danger zone buttons full-width. ≥ 768: nav left 220px sticky.

## Copy rules
Section headings nouns ("Notifications"); descriptions state the effect ("Choose how you hear about activity"). Save buttons "Save changes". Auto-save sections label "Changes save automatically". Danger zone copy states what is deleted and whether it can be undone.

## Implementation (shadcn/ui)
shadcn `settings`-style layout from `sidebar-13`/`dialog` blocks is acceptable; build nav with `SettingsNav` (registry) using route segments `/settings/[section]`; `Form` + RHF per card; `Switch` auto-save via debounced mutation with optimistic update; API keys use `Dialog` with one-time reveal.
