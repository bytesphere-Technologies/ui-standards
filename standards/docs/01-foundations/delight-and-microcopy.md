# Delight and microcopy

Enjoyable does not mean noisy. A product is enjoyable when it is fast, clear, and occasionally surprising. Delight has a budget.

## Delight budget

| Surface | Allowed | Not allowed |
|---|---|---|
| Core workflows (tables, forms, billing) | Fast feedback, subtle press, count-up on first load | Confetti, bouncing, jokes |
| Milestones (first deal, 7-day streak, setup complete) | `Achievement`, `fireConfetti` once, elastic badge | More than one per session |
| Empty states and 404 | Light humor, `m-float` illustration | Humor on 5xx, billing, security |
| Onboarding | `Tour`, `m-glow` hint, checklist progress | Auto-playing modals |
| Marketing | Tilt, spotlight, marquee, reveal | Motion that delays reading |
| Loading | `RotatingMessage` with real steps | Fake progress |

Rules: delight never blocks the task; every effect has a reduced-motion fallback; humor never appears when the user lost money, data or access; one delight moment per screen.

## Microcopy

| Moment | Pattern | Example |
|---|---|---|
| Button | Verb + object | "Send invoice", not "Submit" |
| Loading label | Present participle | "Saving", "Sending" |
| Success | Outcome, no exclamation | "Invoice sent" |
| Error | What happened + what to do | "Couldn’t save. You’re offline. We’ll retry." |
| Empty | What goes here + how to start | "No deals yet. Create one to start your pipeline." |
| Destructive | Name the thing | "Delete 3 files" |
| Placeholder | Example, not label | "name@company.com" |
| Time | Relative under a week | "2 min ago", "Yesterday", then "12 Mar" |

Voice: plain, warm, short. Second person. No "Oops", no "Please", no all caps, no emoji (use icons).

## Light moments that are allowed

- 404: "We can’t find that page" plus a search box. A single dry line is fine ("It may have moved, or never existed.").
- Empty inbox: "You’re all caught up."
- Setup complete: confetti once, "You’re ready."
- Greeting by time of day on the dashboard header ("Good morning, Mia").
- Easter egg: pressing `?` shows shortcuts. Hidden extras are fine if they cost nothing and never alter data.

## Rotating loading messages

Three to five lines that describe real steps in order ("Reading your file", "Matching 1,640 items", "Almost there"). Never invent progress.
