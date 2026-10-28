# @bytesphere/ui

ByteSphere Technologies components, design tokens and styles. React 18, Tailwind CSS v4, TypeScript.

## Install (Next.js)
The package ships TypeScript source (Next compiles it through `transpilePackages`).

```bash
# from a GitHub release asset (recommended, pinned version)
npm i https://github.com/bytesphere-Technologies/ui-standards/releases/download/v1.0.0/bytesphere-ui-1.0.0.tgz
```
Peer dependencies: `react` 18 or 19, `react-dom`, `tailwindcss` v4 (`@tailwindcss/postcss` for Next, `@tailwindcss/vite` for Vite).

## Use in Next.js (App Router)
```bash
npm i <release .tgz url>
npx bytesphere-ui init            # add --dry-run to preview
```
`init` is safe to run again. It does these things, each only if not already done:
1. `next.config`: adds `transpilePackages: ["@bytesphere/ui"]` (the package ships TypeScript source).
2. `app/globals.css`: adds `@import "@bytesphere/ui/styles.css";` (Tailwind, fonts, tokens, themes, motion).
3. `app/layout.tsx`: adds `suppressHydrationWarning` on `<html>` and `<AppearanceScript />` in `<head>` (theme applied before first paint).
4. Copies the standard to `ui-standards/` (docs, `AI-INDEX.md`, `COMPONENTS.md`, `AGENTS.md`). Overwritten on each run, so do not edit it.
5. Adds a pointer to the project's `CLAUDE.md` / `AGENTS.md` (creates them if missing).

It checks Tailwind v4 and tells you what to do by hand if something is missing. Then:
```tsx
import { Button, Card, Field, Input, Logo } from "@bytesphere/ui";   // server or client files
```
Components already carry `"use client"`.

Doing it by hand: the same five things; see `bin/init.mjs`.

## Enforce the standard
```js
// eslint.config.js
import ui from "@bytesphere/ui/eslint-plugin";
export default [{ files: ["src/**/*.{ts,tsx}"], plugins: { ui }, rules: {
  "ui/no-raw-color": "error", "ui/no-tailwind-palette": "error",
  "ui/no-arbitrary-size": "error", "ui/use-ui-components": "error" } }];
```
(needs `typescript-eslint` as the parser for TSX; a full example is at the end of `ui-standards/AGENTS.md` after `init`).

## Find the right component
- `src/components/<name>/`: one folder per component. `index.tsx` is the code, `README.md` is its usage (props, variants, snippet, accessibility).
- `catalog/AI-INDEX.md`: "I need… → use…"
- `catalog/COMPONENTS.md`: props, variants, snippet, accessibility notes
- `@bytesphere/ui/catalog`: the same data as a typed module (`catalog`, `categories`)

## Release (maintainers)
```bash
npm version <x.y.z> -w packages/ui
npm pack -w packages/ui         # creates bytesphere-ui-<x.y.z>.tgz
# attach the .tgz to a GitHub release tagged v<x.y.z>
```
