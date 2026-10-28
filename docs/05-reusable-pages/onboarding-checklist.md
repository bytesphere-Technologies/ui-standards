# Onboarding checklist

**Purpose:** guide a new workspace to its first value in ≤ 10 minutes without a forced tour. **Reuse when:** every product's first-run. Rules: `04-patterns/auth-and-onboarding.md` §4.

## Wireframe
```
Get started                                        2 of 4 complete  ▓▓▓▓▓░░░░░
Set up your workspace. Skip any step and come back later.
┌────────────────────────────────────────────────────────────────────────┐
│ ✓  Create your first project                         Done               │
├────────────────────────────────────────────────────────────────────────┤
│ ✓  Invite a teammate                                 Done               │
├────────────────────────────────────────────────────────────────────────┤
│ ○  Connect your data source          ≈ 3 min      [Connect]  Skip       │
│    Import records so reports show real numbers.                         │
├────────────────────────────────────────────────────────────────────────┤
│ ○  Set up billing                    ≈ 2 min      [Add payment method]  │
└────────────────────────────────────────────────────────────────────────┘
Need help? Read the guide · Talk to us                      [Dismiss checklist]
```
Variants: full page (first login), dashboard card (persistent, collapsible), sidebar widget (progress ring 20px + "Setup 2/4").

## Required regions
Title + progress (text "2 of 4" + determinate bar) · task rows (status, title, time estimate, one action, skip) · help links · dismiss control.

## Components
`Card`, `Progress`, task row (`li` with `aria-current="step"` on the next task), `Button`, `Checkbox`-like status icon (read-only, `circle-check` / `circle`), `Collapsible`.

## States
not started · in progress (next task emphasized by primary button; others secondary) · task completed (check, strikethrough **not used**, text `text-secondary`) · skipped ("Skipped · Do it now") · task blocked ("Requires an admin") · all done (collapses to "Setup complete" and offers dismiss; toast once; no confetti) · dismissed (reopen from Help menu) · loading (3 skeleton rows) · error saving progress (inline retry).

## Responsive
Always single column; rows stack action under the description on < 640px (full-width button 44px). Sidebar widget hidden < 1024px (replaced by the dashboard card).

## Copy rules
Task titles are verb + object ("Connect your data source"), each with a one-line "why" and a real time estimate. Skip is always present except legally required steps. No gamification (levels, streaks, badges).

## Implementation (shadcn/ui)
`Card`, `Progress`, `Collapsible`, `Button`; progress persisted server-side per user and workspace (`onboarding.task_completed` events); tasks derive "done" from real state (a project exists), not clicks.
