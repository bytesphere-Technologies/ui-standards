# Versioning and deprecation

## Semver for a design system

The registry package `@acme/ui` and the token package `@acme/tokens` are versioned independently with semver 2.0.0 (semver.org). `@acme` is a stand-in npm scope; swap it for ByteSphere's real scope (e.g. `@bytesphere`) when publishing.

| Change | Bump | Examples |
|---|---|---|
| Visual or behavioral change a user could perceive as different | **MAJOR** | Button radius 6→8px; focus ring color change; changing a keyboard shortcut; removing a prop |
| New component, new variant, new prop, new token | **MINOR** | `Badge` gets `tone="neutral"`; new `color.status.neutral.*` |
| Bug fix with no visual change | **PATCH** | Fix aria-label wiring; fix SSR hydration warning |
| Token value tweak under 1 step (e.g. one hex nudged for contrast) | **MINOR** if it fixes AA, **MAJOR** otherwise | `text.tertiary` darkened to pass 4.5:1 |

Rules:
1. Token **names** are API. Renaming a token is MAJOR. Changing a primitive value that no semantic token uses is PATCH.
2. Pre-release channels: `-next.N` from `main`, `-rc.N` one week before a MAJOR.
3. Products pin exact versions (`"@acme/ui": "4.2.1"`, no caret). Renovate opens the bump PR weekly.
4. MAJOR releases ship at most once per quarter.

## Deprecation window

| Phase | Duration | What happens |
|---|---|---|
| Announce | Day 0 | Changelog entry `Deprecated`, JSDoc `@deprecated Use X. Removal in v5.0.0`, dev-only `console.warn` once per session, ESLint rule `acme/no-deprecated` set to `warn` |
| Migrate | ≥ 90 days and ≥ 1 MINOR | Codemod published. Both APIs work. Office hours weekly |
| Enforce | Day 90 | ESLint rule goes to `error` in CI |
| Remove | Next MAJOR after day 120 | Code deleted. Changelog entry `Removed` with link to codemod |

Nothing is removed in a MINOR or PATCH. Nothing is deprecated without a replacement and a codemod.

## Codemods

- Written with jscodeshift (github.com/facebook/jscodeshift) or ts-morph; live in `packages/codemods/<from>-to-<to>.ts`.
- Each codemod ships a fixture test: input file, expected output file, idempotency check (running twice changes nothing).
- Invocation: `npx @acme/codemods button-v3-to-v4 ./src`.
- Codemods that cannot safely transform add `// TODO(acme-migrate): <reason>` and exit non-zero.

## Changelog format

Keep a Changelog 1.1.0 (keepachangelog.com), one file per package, newest on top.

```
## [4.2.0] - 2026-03-18
### Added
- `Badge`: `tone="neutral"` (#412)
### Changed
- `Table`: sticky header offset now reads `--size-topbar` (#418)
### Deprecated
- `Button` prop `isLoading`. Use `loading`. Codemod: `button-isloading-to-loading`. Removal in 5.0.0
### Fixed
- `Select`: Home/End keys now move to first/last option (#421)
### Removed
### Security
```

Every entry links a PR and lists the affected tokens by name. MAJOR releases get a `MIGRATION.md` section with before/after code and the codemod command.
