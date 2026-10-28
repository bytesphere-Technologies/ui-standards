# Imagery, photography, and assets

## 1. Image structures

| Ratio | Name | Use | `aspect-*` |
|---|---|---|---|
| 1:1 | square | avatars, app icons, product thumbnails, grid tiles | `aspect-square` |
| 4:3 | standard | card media, docs figures | `aspect-[4/3]` |
| 16:9 | wide | hero, video poster, OG preview, feature screenshots | `aspect-video` |
| 3:2 | photo | editorial / blog photography | `aspect-[3/2]` |
| 2:3 | portrait | people portraits, mobile screenshots | `aspect-[2/3]` |

Only these five. One ratio per grid.

### Fit and crop
1. `object-fit: cover` for photography and avatars; `contain` for logos, screenshots, and diagrams (never crop a screenshot).
2. Focal point: store `focalX/focalY` (0–100) per image in the CMS; render with `object-position: {x}% {y}%`. Default 50% 35% for portraits (faces sit high).
3. Set explicit `width`/`height` attributes on every `<img>` (and `aspect-ratio` in CSS) to prevent layout shift. Target CLS contribution 0.
4. Card media radius = card radius (8px) on top corners only (`rounded-t-card`); full-bleed images have radius 0.
5. Never stretch, never apply `filter` for style, never overlay text on a busy photo without a flat 56% scrim that keeps 4.5:1.

## 2. Avatars

Sizes **24 / 32 / 40 / 64** (px). Round (`radius-round`). 32px in the topbar. Initials fallback: first letter of first and last name, uppercase, weight 600, font-size = 40% of the box (24→10px is below floor, so 24px shows one initial at 11px).

Fallback color derivation (deterministic, from tokens — not random): `hash(userId) % 6` selects one of six tinted pairs built from the neutral/status/data ramps: bg = `color-data-{n}` @ 16% alpha over surface, text = step 800 of that hue (dark: 300). Measure: all six pairs ≥ 4.5:1. See `03-components/avatars-and-identity.md`.

## 3. Illustration style brief (one style only)

| Property | Spec |
|---|---|
| Line weight | 1.5px uniform stroke at 240px artboard, round caps and joins |
| Palette | neutral ramp + primary-600/200 + one status hue max. No gradients, no shadows |
| Perspective | flat orthographic; no 3D, no isometric |
| Fill | flat tints (step 100/200) with 1.5px step-700 outlines |
| Subjects | product concepts (a table, a key, a document), never people or mascots |
| Size | empty states 160×120; marketing 480×320 max |
| Format | SVG with `currentColor`/CSS variables so dark mode recolors |

Illustration is used only in empty states, onboarding, and marketing. Never in dense product chrome.

## 4. Photography direction
1. Real product, real people, real workspaces. Customer-approved photos or staff photography.
2. Natural light, documentary framing, no posed stock.
3. Banned: handshakes, fist-bumps, people pointing at laptops, headset smiles, glowing-brain/digital-hand imagery, 3D abstract renders, AI-generated people.
4. Product screenshots are real, current, and show believable data (see `ai-slop-detector.md` #9, #10). Refresh at every MAJOR visual change.
5. Photos carry a caption decision (§8).

## 5. Logo usage

Brand files (ByteSphere Technologies), copied to `apps/showcase/public/brand/`:
| File | Use |
|---|---|
| `logo-horizontal.svg` | default lockup: topbar (≥ 768px), docs, email headers, marketing nav |
| `logo-vertical.svg` | auth brand panel, splash, print, social avatars on wide formats |
| `logo-icon.png` (icon-only mark) | favicon source, app icon, topbar below 768px, avatars of the org |
Mark colors are exactly Corporate Navy `#21346E` and Azure Blue `#116CB3`; the wordmark is Rich Black `#000913` set in Poppins Bold. On dark surfaces the wordmark must be white and the mark keeps its two colors only if both pass 3:1 against the surface (Navy does not on `#0A121C`: use the single-color white mark). A dark-mode logo variant is required before dark marketing pages ship.
1. Clear space = height of the logomark "x" (the mark's height ÷ 2) on all sides.
2. Min size: 24px mark height / 96px wordmark width.
3. Versions: full-color, mono-dark, mono-light. Use mono-light on dark surfaces and photos.
4. Never recolor outside those versions, rotate, outline, add shadow/glow, or place on a busy background.
5. Customer logo walls: grayscale `neutral-600`, uniform height 24–32px, only real customers with permission, static (no marquee).

## 6. Favicon and app-icon set

| File | Size | Note |
|---|---|---|
| `favicon.svg` | vector | primary, supports `prefers-color-scheme` via CSS inside SVG |
| `favicon.ico` | 32×32 | legacy fallback |
| `apple-touch-icon.png` | 180×180 | opaque background, 20px safe padding |
| `icon-192.png`, `icon-512.png` | 192, 512 | PWA manifest |
| `icon-maskable-512.png` | 512 | 80% safe zone |
| `safari-pinned-tab.svg` | vector | mono |

## 7. OG / social image template
1200×630 (1.91:1). Layout: 64px padding; logo top-left (height 40px); title 64px/72px Inter 600, max 2 lines, sentence case; 24px supporting line `text-secondary`; solid `surface-default` background (light) with one 8px `primary-700` bar at the bottom edge. No gradient, no stock imagery. Generated at build time (`@vercel/og` or Satori); `og:image:alt` always set. File ≤ 300 kB.

## 8. Alt text and captions (hard rule)
**No image ships without alt text and a caption decision.**
1. Informative image: `alt` describes the information, ≤ 125 chars, no "image of".
2. Decorative: `alt=""` (and not used in product chrome at all).
3. Functional (inside a link/button): `alt` states the action.
4. Complex (chart, diagram): short `alt` + adjacent text/table alternative.
5. Caption decision recorded in the CMS field `captionDecision: "none" | "caption" | "credit"`; user photos need credit; screenshots get a caption when the point is not obvious.

## 9. Naming and export
1. Names: `kebab-case`, `<area>-<subject>-<variant>.<ext>`: `onboarding-empty-projects-light.svg`.
2. SVG first. Optimize with SVGO / SVGOMG (jakearchibald.github.io/svgomg): keep `viewBox`, remove dimensions, ids, metadata; ≤ 8 kB per icon/illustration.
3. Raster: export @1x and @2x; serve AVIF, then WebP, then JPEG/PNG fallback via `<picture>` or the framework image component. Quality: AVIF 55, WebP 75, JPEG 80.
4. Max dimensions: hero 2400px wide, content 1600px, card 800px, thumbnail 400px.
5. Budgets: hero ≤ 200 kB, content image ≤ 120 kB, card ≤ 60 kB, avatar ≤ 10 kB.

## 10. Loading strategy
1. Placeholder: BlurHash (blurha.sh) or 24px LQIP data URI, ≤ 1 kB, stored with the asset record. No grey boxes with spinners.
2. `loading="lazy"` + `decoding="async"` below the fold; `fetchpriority="high"` and no lazy on the LCP image only.
3. `srcset` + `sizes` on every responsive image.
4. Reserve space with `width`/`height`; reveal the loaded image with a 150ms opacity fade (not a slide or zoom).
5. Broken image: show `surface-sunken` box at the same ratio with the alt text and a `image-off` 20px icon.
