# Performance budget

Budgets are CI gates (Lighthouse CI + `size-limit` + web-vitals RUM). A regression > 10% fails the PR.

## 1. Core Web Vitals targets (p75 field, mobile)
| Metric | Target | Fail |
|---|---|---|
| LCP | ≤ 2.5 s (product pages ≤ 2.0 s) | > 4.0 s |
| INP | ≤ 200 ms (target ≤ 150 ms) | > 500 ms |
| CLS | ≤ 0.1 (target ≤ 0.05) | > 0.25 |
| TTFB | ≤ 800 ms | > 1.8 s |
Lab (Lighthouse mobile, throttled): Performance ≥ 90 marketing, ≥ 85 product; Accessibility 100.

## 2. JS budget per route (gzip, initial load)
| Route type | Budget |
|---|---|
| Marketing / landing | ≤ 170 kB total JS, ≤ 50 kB CSS |
| Auth | ≤ 120 kB |
| App shell (shared across routes) | ≤ 110 kB |
| Product route (shell + route chunk) | ≤ 250 kB; route chunk ≤ 140 kB |
| Data-heavy route (grid/editor) | ≤ 350 kB with lazy chunks after interaction |
Third-party scripts count toward the budget; loaded `async`/after `load`; a tag manager is not allowed to add > 30 kB.

## 3. Fonts
1. Max **2 families per route**: product = Inter + Geist Mono; marketing = Inter + Poppins (600/700 only). Mono loads only on routes that render code. Self-host with Fontsource (`@fontsource-variable/inter`, `@fontsource/poppins`).
2. Self-host **WOFF2**, subset to the required Unicode ranges (Latin + Latin-Ext default); use Inter variable (roman only; italic not shipped).
3. `font-display: swap`; **preload** the roman variable file (`<link rel="preload" as="font" type="font/woff2" crossorigin>`).
4. Metric-compatible fallback with `size-adjust`/`ascent-override` (Next.js `next/font` does this) to keep CLS ≈ 0.
5. Total font payload ≤ 100 kB per page.

## 4. Images
LCP image preloaded with `fetchpriority="high"`, never lazy. Budgets: hero ≤ 200 kB, content ≤ 120 kB, card ≤ 60 kB, avatar ≤ 10 kB. AVIF/WebP, `srcset`, explicit dimensions, BlurHash ≤ 1 kB. Max total image weight above the fold ≤ 400 kB. SVGs inline only if ≤ 2 kB, otherwise sprite/file.

## 5. Bundle rules
1. **No chart library, animation library, rich-text editor, date-picker, or map on the critical path**: `dynamic()` import after first paint/interaction (`ssr:false` where appropriate).
2. Tree-shaken imports only: `lucide-react` named icons, `date-fns/format`, ECharts modular `echarts/core`.
3. No whole-package lodash/moment; no polyfills for evergreen browsers (target: last 2 versions of Chrome, Edge, Firefox, Safari).
4. Code-split by route; prefetch on intent.
5. React Server Components for static regions; client components only for interactivity.
6. CSS: Tailwind v4 output ≤ 50 kB gzip; no unused component CSS.
7. `size-limit` config per route enforces §2; PR comment shows delta.
8. Third-party embeds use facades (video, chat widget loaded on click).

## 6. Runtime rules
1. Interaction handlers return in ≤ 50 ms; long tasks > 50 ms split with `scheduler.yield()`/`startTransition`.
2. Lists > 200 rows virtualized; images in lists lazy.
3. No layout thrash in scroll handlers; use `IntersectionObserver`/CSS `position: sticky`.
4. Cache: static assets `immutable, max-age=31536000`; HTML `s-maxage` + stale-while-revalidate where safe; API ETags.
5. Compression: Brotli.
6. HTTP/2+; `preconnect` only to critical origins (≤ 2).

## 7. Measurement
`web-vitals` library sends LCP/INP/CLS to analytics with route + device class (no PII). Dashboards per route; alerts when p75 exceeds targets for 3 days. Lighthouse CI on every PR for 5 key routes (marketing home, sign-in, dashboard, list page, detail page).
