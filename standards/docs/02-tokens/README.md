# Tokens

Source of truth for every visual value. Format: W3C Design Tokens (DTCG) draft shape — `$value`, `$type`, `$description`, `$extensions`. Built with **Style Dictionary v4** (Amazon, styledictionary.com) into CSS variables, a Tailwind v4 `@theme` file, and TypeScript types.

## Three tiers

| Tier | File | Contains | Who may reference it |
|---|---|---|---|
| 1. Primitive | `tokens.primitive.json` | raw values: ramps, scale steps, font sizes, durations | only `tokens.semantic.json` |
| 2. Semantic | `tokens.semantic.json` | role-based: `color.surface.raised`, `color.text.secondary`, `radius.card`. Light value in `$value`, dark in `$extensions.mode.dark` | components, product code, Tailwind theme |
| 3. Component | `tokens.component.json` | scoped: `component.button.height.md`, `component.badge.success.bg` | the matching component only |

**Rule: no component (and no product code) may reference a primitive token directly.** ESLint `acme/no-primitive-token` fails the build on `var(--color-neutral-*)`, `var(--color-primary-*)`, `bg-neutral-*`, `text-primary-700`, etc. Primitive CSS variables are emitted to `primitives.css`, which is imported only by `tokens.css`.

Current contents: 484 tokens, 0 dangling references (validated at build).

## Naming convention

`{category}-{role}-{variant}-{state}` → CSS variable `--color-action-primary-hover`.

| Segment | Meaning | Examples |
|---|---|---|
| category | token type | `color`, `space`, `radius`, `shadow`, `z`, `typography`, `duration`, `easing`, `size` |
| role | job in the UI | `surface`, `text`, `border`, `action`, `status`, `focus`, `selected`, `overlay` |
| variant | which one of the role | `primary`, `secondary`, `danger`, `raised`, `subtle` |
| state | interaction state | `rest`, `hover`, `active`, `selected`, `disabled`, `fg`, `border`, `dot` |

Rules:
1. Lowercase kebab-case. No numbers in semantic names except scale steps (`space-16` in primitives only).
2. Names describe **role, not value** (`color-text-secondary`, not `color-gray-700`).
3. Omit a segment rather than invent a filler ("default" is the only allowed filler: `color-surface-default`).
4. Token names are public API (see `00-governance/versioning-and-deprecation.md`).
5. Dark mode is never a separate token name. It is `$extensions.mode.dark` on the same token.
6. No arbitrary z-index. Use `z-base 0 · z-sticky 10 · z-dropdown 20 · z-overlay 30 · z-modal 40 · z-toast 50 · z-tooltip 60`.

## Coverage

| Group | Where | Notes |
|---|---|---|
| color | primitive (7 ramps + white/black/night/series), semantic (surface, overlay, border, text, focus, action × 6 variants, selected, input, status × 5, data × 6, avatar × 6) | focus-ring, disabled and overlay tokens included |
| dimension: space | primitive `space.*` (0,2,4,6,8,12,16,20,24,32,40,48,64,80,96), semantic `space.inline/stack/inset/gap` | |
| dimension: radius, border-width, size | primitive + semantic `radius.tag(4)/control(6)/card(8)/modal(12)/round`; `color.brand.mark-a/mark-b` (logo mark, themed); `font.family.display` (Poppins, marketing only) | |
| typography | primitive `font.*`, semantic `typography.*` composite (display … code) + `typography.numeric` | |
| shadow | primitive `shadow.0–3, dark-2, dark-3`, semantic `shadow.raised/dropdown/modal` | every shadow includes a 1px ring |
| z-index | primitive + semantic ladder | |
| duration / easing | primitive + semantic `motion.*` | |

## Build

`package.json`:
```json
{
  "scripts": {
    "tokens:build": "node build.mjs",
    "tokens:check": "node build.mjs --check && tsx scripts/contrast-check.ts"
  },
  "devDependencies": { "style-dictionary": "^4.0.0" }
}
```

`build.mjs` registers the hooks the config names:
```js
import StyleDictionary from "style-dictionary";
import { readFileSync } from "node:fs";

const modeOf = (t) => t.$extensions?.mode?.dark ?? t.original?.$extensions?.mode?.dark;
const isPrimitive = (t) => t.filePath.endsWith("tokens.primitive.json");

StyleDictionary.registerFilter({ name: "ui/only-primitive", filter: isPrimitive });
StyleDictionary.registerFilter({ name: "ui/not-primitive", filter: (t) => !isPrimitive(t) });

// color.surface.default -> surface-default under category "color"; keep category prefix
StyleDictionary.registerTransform({
  name: "ui/name-strip", type: "name",
  transform: (t) => t.path.join("-"),
});

StyleDictionary.registerFormat({
  name: "ui/css-modes",
  format: ({ dictionary, options }) => {
    const light = dictionary.allTokens.map((t) => `  --${t.name}: ${t.$value};`).join("\n");
    const dark = dictionary.allTokens.filter(modeOf)
      .map((t) => `  --${t.name}: ${resolve(modeOf(t), dictionary)};`).join("\n");
    return `@import "./primitives.css";\n${options.lightSelector} {\n${light}\n}\n` +
      `@media ${options.darkMedia} {\n  ${options.darkMediaScope} {\n${dark}\n  }\n}\n` +
      `${options.darkSelector} {\n${dark}\n}\n`;
  },
});
function resolve(ref, dictionary) {
  const m = /^\{(.+)\}$/.exec(ref); if (!m) return ref;
  const t = dictionary.allTokens.find((x) => x.path.join(".") === m[1]);
  return t ? `var(--${t.name})` : ref;
}

StyleDictionary.registerFormat({
  name: "ui/ts-types",
  format: ({ dictionary }) =>
    `export type TokenName =\n${dictionary.allTokens.map((t) => `  | "${t.name}"`).join("\n")};\n`,
});

StyleDictionary.registerFormat({
  name: "ui/tailwind-theme",
  format: ({ dictionary }) => `@theme {\n${dictionary.allTokens
    .filter((t) => ["color", "radius", "shadow", "space"].includes(t.path[0]))
    .map((t) => `  --${t.name}: var(--${t.name});`).join("\n")}\n}\n`,
});

const sd = new StyleDictionary(JSON.parse(readFileSync("./style-dictionary.config.json", "utf8")));
await sd.buildAllPlatforms();
```

Output: `dist/css/tokens.css` (light `:root`, dark under `[data-theme="dark"]` and under `prefers-color-scheme` unless `data-theme="light"`), `dist/css/primitives.css`, `dist/tailwind/theme.css`, `dist/ts/tokens.ts`, `dist/ts/tokens.d.ts`.

## Using tokens

CSS: `background: var(--color-surface-raised); border: 1px solid var(--color-border-subtle);`
Tailwind v4 (`@import "./dist/tailwind/theme.css";`): `bg-surface-raised border-border-subtle text-text-secondary rounded-card shadow-dropdown`.
TypeScript: `import type { TokenName } from "@acme/tokens"`.

## Change process
1. Edit JSON, run `npm run tokens:build`; the build fails on dangling references or duplicate names.
2. Add or change a color pairing → update the contrast table in `01-foundations/color.md` and run `tokens:check` (fails < 4.5:1 text, < 3:1 UI).
3. Open a PR; visual + a11y reviewers sign off (`00-governance/contribution-and-review.md`); version per semver rules.
4. Rebrand = change primary/accent seeds and regenerate ramps per `color.md` §2; semantic names do not change.

## Seed status
Brand seeds come from the ByteSphere Technologies brand guidelines: Azure Blue `#116CB3` (primary, step 600), Corporate Navy `#21346E` (accent, step 800), Pale Blue `#DBE7F7` (primary-100), Rich Black `#000913` (neutral-950, `night-0`). Replacing seeds regenerates every ramp.
