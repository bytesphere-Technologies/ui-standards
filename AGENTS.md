# AGENTS.md: read this first

This repo is the ByteSphere Technologies UI standard. Build UI by **reusing `@bytesphere/ui`**, not by writing new markup.

## Where things are
| Need | Open |
|---|---|
| Which component do I use? | `packages/ui/catalog/AI-INDEX.md` ("I need… → use…") |
| Props, variants, usage snippet | `packages/ui/catalog/COMPONENTS.md` (or `catalog.json`) |
| Component source | `packages/ui/src/components/<kebab-name>/` (e.g. `button/`): `index.tsx` code + `README.md` usage |
| What a page type should contain | `docs/05-reusable-pages/` |
| Rules (color, type, spacing, motion, mobile) | `docs/01-foundations/`, `docs/03-components/`, `docs/04-patterns/` |
| Live examples of everything | `apps/showcase` (`npm run dev`, then open `#/`) |
| Rules in checklist form | `docs/08-checklists/`, `docs/07-antipatterns/ai-slop-detector.md` |

## Rules (non-negotiable)
1. **Import only from `@bytesphere/ui`.** If a component exists, use it. Do not copy markup from a page.
2. **Tokens only.** No hex or `rgb()`. No default Tailwind palette (`bg-blue-500`, `text-gray-600`). No arbitrary px (`p-[13px]`). Use semantic classes: `bg-surface-raised`, `text-secondary`, `border-subtle`, `bg-action-primary`, `rounded-card`.
3. **Company name and logo: `<Logo>`.** Never type the name in a font.
4. **Dark mode, corner style, navigation style and density are user choices** set through `useAppearance()`. Never hardcode them.
5. **One primary button per view.** Every async surface needs loading, empty, error and stale states (`SkeletonKit`, `StatePanel`).
6. **Icons:** `lucide-react` only. No emoji in UI.
7. **A missing component:** add it to `packages/ui/src`, add its entry to `packages/ui/catalog/catalog.data.ts`, run `npm run catalog`. Never inline a one-off copy in an app.
8. **Accessibility is part of done:** visible focus, labels on every control, contrast from token pairs (`bg-action-accent` with `text-action-accent-fg`).

## Typical task: "build a <page>"
1. Find the page type in `docs/05-reusable-pages/` and read its blueprint.
2. Look up each piece in `AI-INDEX.md`; read its entry in `COMPONENTS.md`.
3. Compose with `@bytesphere/ui` components. Write only layout and copy yourself.
4. Run the checks below.

## Use in a project
In a Next.js project: install the package from the release file, then run `npx bytesphere-ui init`. It edits `next.config`, `globals.css` and `app/layout.tsx`, copies the standard to `ui-standards/`, and adds a pointer to the project's `CLAUDE.md` / `AGENTS.md`. Components are client components already; use them from server or client files.

## Checks
```
npm run typecheck     # types
npm test              # Playwright: every page renders, axe accessibility, 360px mobile fit, key flows
npm run lint          # the standard as lint rules (raw colors, palette, raw <button>)
npm run catalog       # regenerate the component index after changing components
```
