# Vibe-coding guide: telling an AI agent to follow this standard

Paste the master prompt at the start of a session. The agent then finds components, tokens and page blueprints without further help.

## Master prompt

```
Follow the corporate UI standard in /ui-standards.
1. Read ui-standards/09-agent-rules/AGENTS.md and ui-standards/packages/ui/catalog/AI-INDEX.md first.
2. Import every UI piece from "@bytesphere/ui". Search AI-INDEX.md by intent ("otp input", "bottom sheet", "404 page") before writing markup.
3. Use token classes only (bg-surface, text-secondary, rounded-card). Never write hex, px radii or font names.
4. Build from the blueprint in ui-standards/05-reusable-pages/ for the page type. Use data/status.ts for any error or system page.
5. Mobile first: follow ui-standards/01-foundations/mobile.md (44px targets, 16px fields, bottom sheets, bottom tabs for 2 to 5 destinations).
6. Every list has loading, empty, error and stale states. One primary button per view.
7. Notifications: choose the channel by urgency per 03-components/notifications.md.
8. Motion: only recipes in 01-foundations/motion.md; respect prefers-reduced-motion.
9. Before finishing, run through 08-checklists/ and ui-standards/07-antipatterns/ai-slop-detector.md and fix every miss.
```

## Where to look, in order

| Question | Open |
|---|---|
| Which component? | `packages/ui/catalog/AI-INDEX.md` (search by intent), then `COMPONENTS.md` |
| Which page layout? | `05-reusable-pages/` and the showcase page list (`#/explorer`) |
| Which color, size, radius? | `02-tokens/`, `01-foundations/shape-and-type-spec.md` |
| Mobile behaviour? | `01-foundations/mobile.md`, `#/mobile` |
| Which loader, notification, animation? | `03-components/interactive-components.md`, `notifications.md`, `01-foundations/motion.md` |
| Tone of copy? | `01-foundations/delight-and-microcopy.md` |
| What not to do? | `07-antipatterns/ai-slop-detector.md` |

## Short prompts that work

- "Build the billing page. Use the Billing blueprint and `Card`, `ProgressBar`, `StatusPill` from @bytesphere/ui."
- "Add a notification bell to the top bar with `NotificationCenter`; send mentions to push and email too, per the notifications standard."
- "Add a 6-digit code step to sign-in using `OtpInput`; show `status/mfa-required` rules for errors."
- "Make this table a list of rows on mobile per mobile.md."
- "Use `DeterminateRing` for the upload and `RotatingMessage` after 5 seconds."

## Agent self-check (answer yes to all)

1. Every import comes from `@bytesphere/ui`, `@/data` or `@/data/status`.
2. No hex, no raw px colors or radii, no custom font-family.
3. The logo is `<Logo>`.
4. Works at 360 px with no horizontal page scroll; targets are 44 px.
5. Loading, empty, error states exist for each async region.
6. Animations are existing recipes and have reduced-motion behaviour.
7. Copy follows the microcopy patterns; no exclamation marks, no emoji.
