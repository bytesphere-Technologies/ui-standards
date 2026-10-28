# Company site pages

Fourteen pages most products need beyond marketing and app screens. Showcase group "Company site". All use the shared tokens and `site` or `bare` layouts.

| Page | Route | Layout | Required regions |
|---|---|---|---|
| Public status page | `status-page` | bare | Current-incident banner; per-component status pill; 90-day bar history; uptime %; past incidents; subscribe |
| Help center | `help` | site | Search; 6 categories; popular articles; contact-support fallback |
| Contact support | `support` | site | Topic, subject, description, impact, attachments; response times by plan; link to status |
| Legal document | `legal` | site | Title, effective date, previous versions, plain summary, numbered sections, sticky contents |
| Cookie preferences | `cookies` | site | Necessary (locked on), analytics, marketing; save, reject non-essential; banner variant |
| About | `about` | site | Mission, 4 numbers, 3 values, leadership |
| Careers | `careers` | site | Department filter; role, location, type; empty state |
| Blog index and article | `blog`, `blog/post` | site | Featured post, grid; 42rem reading column, author, quote, subscribe |
| Trust center | `trust` | site | Certifications, downloadable documents with access level, FAQ |
| Integrations directory | `integrations` | site | Search, categories, connect or connected |
| Feedback survey | `feedback` | bare | 0 to 10 score, one conditional follow-up, thank-you |
| Your data | `privacy-center` | bare | Export request, account deletion with grace period, consent history |
| Email preferences | `unsubscribe` | bare | Per-topic switches, unsubscribe from all, note on transactional mail |

## Rules

1. **Legal copy in the showcase is placeholder.** Real text comes from counsel; the layout rules are the standard.
2. **Reading width** for articles and legal text: 42rem max, 16 to 17px, line-height 28 to 32px.
3. **Consent is symmetric.** Reject non-essential has the same size and prominence as Accept all.
4. **Unsubscribe works without sign-in** and in one click. Transactional email (receipts, security) is stated as separate.
5. **Status page is standalone,** hosted away from the app so it works when the app is down. No app navigation, no JavaScript dependency for the current state.
6. **Deleting an account** states the grace period, what is removed, and what must be transferred first.
7. **Survey follow-up changes with the score:** 9 to 10 asks what they like; 0 to 8 asks what to improve. Always optional.
