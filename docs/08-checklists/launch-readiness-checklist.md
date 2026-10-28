# Launch readiness checklist

Gate for shipping a feature, product area, or marketing page to production. Owner signs each section; any unchecked item blocks launch unless waived in writing with an expiry date.

## 1. Accessibility
- [ ] WCAG 2.2 AA: axe zero violations on all launch pages (light + dark)
- [ ] Keyboard-only pass on every flow in scope
- [ ] VoiceOver (Safari) and NVDA (Firefox) pass on top 5 flows, recorded
- [ ] 200% zoom and 320px reflow verified
- [ ] Color contrast table updated; color-blind emulation checked
- [ ] Accessibility statement/contact updated if scope changed

## 2. Performance
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 on Lighthouse mobile (throttled) for each key route
- [ ] JS and CSS within route budgets (`size-limit` green)
- [ ] Fonts: ≤ 2 families, preloaded, `font-display: swap`
- [ ] Images: AVIF/WebP, sized, lazy, LCP preloaded
- [ ] Caching headers + Brotli verified; RUM (web-vitals) reporting live

## 3. SEO and meta (public pages)
- [ ] Unique `<title>` (≤ 60 chars) and meta description (≤ 160)
- [ ] One h1; semantic headings; descriptive link text
- [ ] Canonical URL; `hreflang` for locales; sitemap and robots correct (`noindex` on app/auth/maintenance)
- [ ] Open Graph + Twitter images (1200×630) with alt; favicon/app-icon set present
- [ ] Structured data where relevant (Organization, Product/Offer, FAQ) validated
- [ ] 404/301 map for changed URLs

## 4. Analytics and measurement
- [ ] Events from the tracking plan implemented, named `object.action`, schema-validated
- [ ] No PII in payloads (checked in debug overlay + network tab)
- [ ] Consent/GPC respected; opt-out works
- [ ] Adoption dashboard exists: eligible users, activation event, retention event
- [ ] Error tracking (Sentry or equivalent) live with release tagging

## 5. States and resilience
- [ ] Every async surface has loading / empty / error / partial states, designed and reviewed
- [ ] Error boundaries per route and widget; reference ids surfaced
- [ ] Offline/slow-network behavior tested (throttling, `setOffline`)
- [ ] Idempotent submits; double-click safe; rollback of optimistic updates tested
- [ ] 403/404/500/maintenance pages in place; status page linked
- [ ] Feature flag + kill switch; staged rollout plan; rollback tested

## 6. Content and copy review
- [ ] Copy reviewed by content owner: sentence case, verb-first buttons, plain language
- [ ] No "Supercharge/Seamlessly/Unlock…" language; no exclamation marks; no emoji
- [ ] Every claim has a source; every metric has a period; logos/quotes have written permission
- [ ] Error messages "what went wrong + how to fix"
- [ ] Legal: terms, privacy, cookie notice, pricing/taxes statement accurate
- [ ] Localization: strings externalized, translations complete for release locales, RTL checked
- [ ] No lorem ipsum, placeholder names, test data, `TODO`s

## 7. Visual and system compliance
- [ ] Tokens only; no raw values (CI green)
- [ ] `07-antipatterns/ai-slop-detector.md` clean; positive test passed by design lead
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge (latest 2); iOS Safari, Android Chrome
- [ ] Visual regression baselines approved

## 8. Security and privacy (UI-facing)
- [ ] Permission-denied states shown; server enforces permissions
- [ ] Sensitive values masked; API keys shown once; no secrets in client bundles
- [ ] CSP, X-Frame-Options/frame-ancestors, Referrer-Policy set; third-party scripts reviewed
- [ ] Data export/delete paths work (if user data involved)

## 9. Operations
- [ ] Support and docs updated; help links resolve
- [ ] Runbook and on-call owner named
- [ ] Release notes / changelog entry written
- [ ] Sign-offs: design lead, a11y champion, engineering lead, content owner, product owner
