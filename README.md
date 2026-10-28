# ByteSphere UI standard

Version 1.0.0 · Owner: Design systems team · Brand colors: Azure Blue `#116CB3` (primary), Corporate Navy `#21346E`, Pale Blue `#DBE7F7`, Rich Black `#000913`

One standard for every interface we ship. It has two parts that work together:

| Part | What it is | Where it ends up in your project |
|---|---|---|
| **Components** | `@bytesphere/ui`: 188 ready React components, themes and styles | Installed as a package (lives in `node_modules`) |
| **The written standard** | Rules, page blueprints, a component index, instructions for AI agents | Copied into a `ui-standards/` folder in your project |

The goal: you (or your AI) build screens by **reusing components and following the rules**, so two people building two screens produce one product.

---

## 1. Start here (5 minutes)

**You need:** a Next.js project (App Router) with **Tailwind CSS v4**. New or already started, both work.

In the root of your project:

```bash
npm i github:bytesphere-Technologies/ui-standards#v1.0.0
npx bytesphere-ui init
```

(`bytesphere-Technologies` is our GitHub organization. Add `--dry-run` to `init` to preview what it will change.)

`init` does five things, and only what is missing, so it is safe to run again:

1. `next.config`: adds `transpilePackages: ["@bytesphere/ui"]`.
2. `app/globals.css`: adds `@import "@bytesphere/ui/styles.css";` (Tailwind, fonts, tokens, dark modes, animations).
3. `app/layout.tsx`: adds `<AppearanceScript />` and `suppressHydrationWarning` so the saved theme shows before the page paints (no flash).
4. Copies the standard to `ui-standards/` (do not edit it; it is overwritten on update).
5. Adds a short pointer to your `CLAUDE.md` / `AGENTS.md` (creates them if missing) so AI tools read the standard first.

At the end it lists anything you must do by hand (for example, upgrading Tailwind).

Then use a component anywhere, in server or client files:

```tsx
import { Button, Card, CardHeader, Field, Input, StatusPill } from "@bytesphere/ui";

export default function Page() {
  return (
    <Card>
      <CardHeader title="Profile" action={<StatusPill tone="success">Active</StatusPill>} />
      <Field id="name" label="Name"><Input /></Field>
      <Button variant="primary">Save</Button>
    </Card>
  );
}
```

---

## 2. Working with an AI agent

You do not need to explain the standard to the AI. After `init`, just ask:

> Build the billing settings page following ui-standards.

> Add a members table with search, sort and an invite modal, following ui-standards.

> Review this page against ui-standards and fix what breaks the rules.

The AI reads `ui-standards/AGENTS.md`, finds the right component in `ui-standards/AI-INDEX.md`, reads that component's usage, and imports it from `@bytesphere/ui`. If a result looks off, say "check it against ui-standards/docs/07-antipatterns/ai-slop-detector.md".

---

## 3. What is in `ui-standards/` (and where to look)

| Folder or file | Use it when |
|---|---|
| `AGENTS.md` | The one page of rules the AI must follow. Read it yourself too, it is short. |
| `AI-INDEX.md` | "I need a date picker / empty state / data table" → which component. |
| `COMPONENTS.md` | Every component: props, variants, example, accessibility notes. |
| `docs/05-reusable-pages/` | Blueprints for whole pages: settings, pricing, login, error pages (50 system pages), admin, company site. |
| `docs/04-patterns/` | How things combine: forms and validation, dashboards, tables, charts, checkout. |
| `docs/03-components/` | The detailed spec for each kind of component. |
| `docs/01-foundations/` | Color, type, spacing, motion, dark modes, mobile, accessibility, language and right-to-left. |
| `docs/07-antipatterns/` | What gets rejected in review. |
| `docs/08-checklists/` | Check before you open a pull request. |

Each component's own code and usage notes are in `node_modules/@bytesphere/ui/src/components/<name>/` (for example `button/`: `index.tsx` and `README.md`).

---

## 4. The rules in one minute

1. **Use `@bytesphere/ui` components.** Do not rebuild a button, modal or table.
2. **Tokens only.** No hex colors, no Tailwind default colors (`bg-blue-500`, `text-white`), no arbitrary sizes (`p-[13px]`). Use classes such as `bg-surface-raised`, `text-secondary`, `border-subtle`, `bg-action-primary`, `rounded-card`.
3. **One primary button per view.**
4. **Every screen that loads data has four states:** loading, empty, error, partly loaded.
5. **Labels are always visible.** A placeholder is never a label.
6. **Color never carries meaning alone.** Pair it with text or an icon.
7. **Keyboard works everywhere,** with a visible focus ring.
8. **`<Logo>` for the company name,** icons from `lucide-react` only, no emoji in the interface.
9. **Dark mode, corner style, navigation style and density belong to the user** (`useAppearance()`). Never hard-code them.
10. **Accessibility (WCAG 2.2 AA) is part of done.**

Flat, bordered, dense and quiet is the house style: surfaces are separated by 1px borders, shadows only on floating layers, brand color only for the main action and the current item. Full list and reasons: `docs/00-governance/principles.md`.

---

## 5. Enforce it automatically (optional but recommended)

The package ships ESLint rules that fail on the most common mistakes: raw colors, default Tailwind palette, arbitrary sizes, and raw `<button>` / `<input>` instead of the components. The setup is at the end of `ui-standards/AGENTS.md`. Use `"warn"` while migrating old code and `"error"` for new code. Add `npm run lint` to your project's checks.

---

## 6. Updating

When a new version is released:

```bash
npm i github:bytesphere-Technologies/ui-standards#v1.1.0
npx bytesphere-ui init        # refreshes ui-standards/
```

Components are not copied into your project, so a fix reaches everyone by updating the version.

---

## 7. Common questions

**Can I change a component for my project?** Not inside your project. Propose the change in this repo (pull request to `packages/ui`) so every project stays consistent. If you need something that does not exist, compose it from existing components first; if that is not possible, ask for a new component.

**Tailwind v3?** Not supported. Upgrade to v4 first (Tailwind has an upgrade tool). `init` tells you if this applies.

**Pages Router instead of App Router?** `init` cannot edit your layout automatically. Add `<AppearanceScript />` to `<head>` and `suppressHydrationWarning` to `<html>` in `_document` yourself; everything else is the same.

**My CSS already has `@import "tailwindcss"`.** `init` keeps it and tells you it can be deleted, because `styles.css` includes Tailwind.

**Does it work with Vite or other React setups?** The components do (React 18 or 19). `init` is built for Next.js; for others, add the CSS import by hand (see `packages/ui/README.md`).

**Where is the live example of everything?** Run the showcase (section 8): every component and 141 pages, in light and dark.

---

## 8. For maintainers of this repo

```bash
npm install
npm run dev          # showcase at http://localhost:5173 (141 pages, all components, themes)
npm run check        # typecheck + lint + lint-rule tests + catalog + build (run before every release)
npm test             # Playwright: every page renders, accessibility (axe), 360px mobile fit, key flows
npm run test:ssr     # every component loads on the server, as Next.js does
npm run catalog      # regenerate the component index, per-component READMEs and the package exports
```

```
ui-standards/
├── AGENTS.md · CLAUDE.md     rules for AI working on this repo
├── docs/                     the written standard (00 governance … 09 agent rules)
├── packages/ui/              @bytesphere/ui
│   ├── src/components/<name>/   one folder per component: index.tsx + README.md
│   ├── src/lib/                 small shared helpers
│   ├── src/styles/              tokens, themes, animations (styles.css)
│   ├── catalog/                 catalog.data.ts (source of truth) → AI-INDEX.md, COMPONENTS.md, catalog.json
│   ├── eslint-plugin/           the lint rules
│   └── bin/init.mjs             the init command
└── apps/showcase/            runnable demo and the automated tests
```

**Add a component:** create `packages/ui/src/components/<kebab-name>/index.tsx` (start with `"use client";`, use tokens, include loading/empty/error states where it fetches), add an entry in `packages/ui/catalog/catalog.data.ts` (summary, what people ask for, props, snippet), add a preview in `apps/showcase/src/catalog/previews.tsx`, then run `npm run catalog` and `npm run check`. The export, the README and the AI index update by themselves.

**Release a version** (no CI, no registry, no tokens):
```bash
npm run release -- 1.1.0
```
This bundles the docs into the package, commits just the package as its own root, and pushes it as the git tag `v1.1.0` on this repo. Teams install it with `npm i github:bytesphere-Technologies/ui-standards#v1.1.0`. Commit the version bump it makes in `packages/ui/package.json` afterwards. Run `npm run check` and `npm test` yourself before releasing.

**Rebrand:** change the brand seeds in `docs/02-tokens`, regenerate the ramps (`docs/01-foundations/color.md` §2), re-run the contrast table, rebuild tokens. Nothing else changes.
