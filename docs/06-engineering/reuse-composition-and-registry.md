# Reuse, composition, and the internal registry

## 1. Model
We own our components. The design systems team maintains an **internal shadcn registry** (ui.shadcn.com/docs/registry) that every product consumes, so all products share one implementation of `Button`, `Field`, `Table`, etc.

```
ui-registry/                       (repo: acme/ui-registry)
├── registry.json                  registry index (name, items)
├── registry/
│   ├── ui/button.tsx              component source files
│   ├── ui/field.tsx
│   ├── blocks/list-page/…         page blocks from 05-reusable-pages
│   ├── hooks/use-density.ts
│   └── styles/tokens.css          built from @acme/tokens
└── public/r/button.json           built registry items (shadcn build)
```
Published to `https://ui.acme.example/r/{name}.json` (stand-in host; replace with the real registry URL) behind authentication.

## 2. Consumption
```bash
# products/<app>/components.json  →  "registries": { "@acme": "https://ui.acme.example/r/{name}.json" }
npx shadcn@latest add @acme/button @acme/field @acme/data-table
```
Files land in `components/ui/` of the product. The product owns the *installed copy*, but see rule 1.

## 3. Rules
1. **No local forks.** Do not edit installed registry components in a product repo. Changes go upstream to the registry via PR (`contribution-and-review.md`). CI runs `registry diff` and fails if an installed file's hash differs from the pinned registry version (`components.lock.json`).
2. **Extend without forking**: 
   - composition: wrap the component in a product component (`ProjectStatusPill` uses `StatusPill`);
   - `className` for layout-only adjustments (width, margin by parent) — never to override tokens (lint blocks color/radius utilities in `className` on registry components);
   - slots and `asChild`;
   - variants added upstream via `cva` when ≥ 2 products need them.
3. **Product-specific components** live in `components/app/` (not `components/ui/`) and use only registry components + tokens.
4. **Version pinning**: `components.lock.json` records `{ name, registryVersion, hash }`. Update with `npx shadcn@latest add @acme/button --overwrite` in a dedicated PR; the PR description links the registry changelog. Products may lag by at most one MAJOR; security fixes are backported to the previous MAJOR for 90 days.
5. **Blocks** (pages from `05-reusable-pages/`) are installed the same way and *are* meant to be edited — they are templates, not shared logic. Mark edited blocks with `// @acme-block-edited` so they're excluded from the fork check.
6. **Tokens** come from `@acme/tokens` (npm). Products never define colors locally.
7. **Dependencies** of registry items are declared in `registry.json` (`dependencies`, `registryDependencies`); the install adds them.
8. **Deprecations** follow `00-governance/versioning-and-deprecation.md`: registry items carry `@deprecated` and a codemod.

## 4. Publishing
1. Merge to `main` → CI builds (`npx shadcn@latest build`), runs Storybook tests, axe, visual regression.
2. `changesets` versions the registry; tag `registry-vX.Y.Z`; deploy `public/r/*` to the registry host; publish `@acme/tokens`.
3. Renovate-style bot opens "Update @acme registry" PRs in products weekly.

## 5. Reuse decision tree
1. Does a registry component do it? → use it.
2. Does it need a variant/slot? → propose upstream (RFC).
3. Is it product-specific composition? → `components/app/`.
4. Is it a page layout? → clone the block from `05-reusable-pages/`.
5. Still nothing? → RFC for a new component; build locally in `components/app/` only as a labelled prototype with an expiry date of ≤ 1 quarter.

## 6. Ownership
Registry code owners: design systems team (`CODEOWNERS`: `/registry/ui/ @acme/design-systems`). Each component lists a named maintainer in its spec header. Orphaned components (no maintainer for 2 releases) are deprecated.
