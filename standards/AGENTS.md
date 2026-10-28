# ui-standards: instructions for AI coding agents

This folder is the company UI standard (ByteSphere Technologies). Build all UI by **reusing `@bytesphere/ui`**, and follow the written rules. Do not invent your own components, colors or spacing.

## Where things are
| Need | Open |
|---|---|
| Which component do I use? ("I need… → use…") | `ui-standards/AI-INDEX.md` |
| Props, variants, snippet, accessibility of every component | `ui-standards/COMPONENTS.md` |
| One component's code and usage | `node_modules/@bytesphere/ui/src/components/<kebab-name>/` (`index.tsx` + `README.md`, e.g. `button/`) |
| What a page type should contain (settings, pricing, login, tables, error pages…) | `ui-standards/docs/05-reusable-pages/` |
| Rules: color, type, spacing, motion, mobile, forms, charts | `ui-standards/docs/01-foundations/`, `03-components/`, `04-patterns/` |
| What to never do | `ui-standards/docs/07-antipatterns/ai-slop-detector.md` |
| Review checklists | `ui-standards/docs/08-checklists/` |

(Docs may mention `apps/showcase` or `packages/ui`: those are paths in the source repo, which you do not need.)

## Rules (non-negotiable)
1. **Import only from `@bytesphere/ui`.** If a component exists, use it. Do not copy markup from elsewhere or write a one-off version.
2. **Tokens only.** No hex or `rgb()`. No default Tailwind palette (`bg-blue-500`, `text-gray-600`, `text-white`). No arbitrary px (`p-[13px]`). Use semantic classes: `bg-surface-raised`, `text-secondary`, `border-subtle`, `bg-action-primary`, `rounded-card`.
3. **Company name and logo: `<Logo>`.** Never type the name in a font.
4. **Dark mode, corner style, navigation style and density are user choices** through `useAppearance()`. Never hardcode them.
5. **One primary button per view.** Every async surface needs loading, empty, error and stale states (`SkeletonKit`, `StatePanel`).
6. **Icons:** `lucide-react` only. No emoji in UI.
7. **Forms:** wrap controls in `<Field id label>`: `<Field id="email" label="Email"><Input type="email" /></Field>`. Validate on blur, show a message that says how to fix it.
8. **Accessibility is part of done:** visible focus, a label on every control, contrast from token pairs (`bg-action-accent` with `text-action-accent-fg`), keyboard operable.
9. **Next.js:** components are client components already (`"use client"` is inside them) and work from server or client files. Keep `<AppearanceScript />` and `suppressHydrationWarning` in the root layout.
10. **A component you need does not exist:** say so and build it from existing ones. Do not paste raw markup that duplicates a component.

## Typical task: "build a <page>"
1. Find the page type in `ui-standards/docs/05-reusable-pages/`; read its blueprint.
2. Look up each piece in `AI-INDEX.md`; read its entry in `COMPONENTS.md` or its folder README.
3. Compose with `@bytesphere/ui`. Write only layout and copy yourself.
4. Check: typecheck, view the page in light and dark and at 360px wide, tab through it with the keyboard.

## Optional: enforce with lint
```js
// eslint.config.mjs  (needs typescript-eslint)
import tseslint from "typescript-eslint";
import ui from "@bytesphere/ui/eslint-plugin";
export default [{
  files: ["**/*.{ts,tsx}"], languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } }, plugins: { ui },
  rules: { "ui/no-raw-color": "warn", "ui/no-tailwind-palette": "warn", "ui/no-arbitrary-size": "warn", "ui/use-ui-components": "warn" },
}];
```
Use `"warn"` while migrating old code, `"error"` for new code.

Updating: `npm i <new release url>` then `npx bytesphere-ui init` (refreshes this folder). Do not edit files in `ui-standards/`; they are overwritten.
