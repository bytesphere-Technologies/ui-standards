import { useState } from "react";
import { Specimen, Input, StatusPill } from "@bytesphere/ui";
import { Search } from "lucide-react";

type Row = { need: string; use: string; why: string; license: string; avoid?: string; cat: string };
const rows: Row[] = [
  { cat: "Foundation", need: "Styling and tokens", use: "Tailwind CSS v4 + Style Dictionary", why: "CSS-first @theme maps straight onto DTCG tokens", license: "MIT · Apache-2.0", avoid: "CSS-in-JS runtimes, Bootstrap, MUI" },
  { cat: "Foundation", need: "Component source", use: "shadcn/ui via internal registry", why: "We own the code; one registry for every product", license: "MIT", avoid: "Forking installed files" },
  { cat: "Foundation", need: "Behavior and a11y", use: "Radix Primitives (React Aria for date and combobox gaps)", why: "Correct focus, keyboard and ARIA without styling", license: "MIT · Apache-2.0", avoid: "Hand-built menus and dialogs" },
  { cat: "Foundation", need: "Variants and class merge", use: "class-variance-authority + tailwind-merge + clsx", why: "Typed variant API, no class conflicts", license: "Apache-2.0 · MIT" },
  { cat: "Foundation", need: "Fonts", use: "Inter (UI) · Poppins (marketing display) · Geist Mono (code)", why: "Self-hosted via Fontsource; tabular figures in Inter", license: "SIL OFL 1.1", avoid: "More than 3 families" },
  { cat: "Foundation", need: "Icons", use: "Lucide", why: "One stroke style at 16/20/24", license: "ISC", avoid: "Emoji, multicolor sets, a second family" },
  { cat: "Data", need: "Data tables", use: "TanStack Table v9 (+ TanStack Virtual past 200 rows)", why: "Headless sorting, selection, virtualization", license: "MIT" },
  { cat: "Data", need: "Server state, caching, optimistic UI", use: "TanStack Query v5", why: "Retries, stale-while-revalidate, rollback", license: "MIT", avoid: "Hand-rolled fetch effects" },
  { cat: "Data", need: "Charts (simple)", use: "Recharts or visx", why: "SVG, small, easy to style with tokens", license: "MIT" },
  { cat: "Data", need: "Charts (large or dense)", use: "Apache ECharts (modular imports)", why: "Canvas, 100k+ points, built-in a11y descriptions", license: "Apache-2.0", avoid: "On the critical path" },
  { cat: "Forms", need: "Forms and validation", use: "React Hook Form + Zod", why: "Uncontrolled performance; one schema for client and server", license: "MIT", avoid: "Two form libraries in one product" },
  { cat: "Forms", need: "Dates and time zones", use: "Intl API + date-fns; react-day-picker for calendars", why: "No moment; locale-correct", license: "MIT" },
  { cat: "Forms", need: "Phone and address", use: "libphonenumber-js", why: "Per-country validation", license: "MIT" },
  { cat: "Forms", need: "File upload", use: "react-dropzone + tus for resumable", why: "Accessible input behind the zone; resumable over 25 MB", license: "MIT" },
  { cat: "Forms", need: "Rich text", use: "Tiptap", why: "Headless, keyboard friendly, markdown I/O", license: "MIT", avoid: "On first paint" },
  { cat: "Interaction", need: "Toasts", use: "Sonner", why: "Queue, promise toasts, a11y live regions", license: "MIT" },
  { cat: "Interaction", need: "Command palette", use: "cmdk", why: "Fast, composable, keyboard first", license: "MIT" },
  { cat: "Interaction", need: "Mobile sheets", use: "vaul", why: "Drag-to-dismiss bottom sheets", license: "MIT" },
  { cat: "Interaction", need: "Drag and drop", use: "dnd-kit", why: "Keyboard sensors; boards and reorder", license: "MIT", avoid: "Drag-only; always add Move up/down" },
  { cat: "Interaction", need: "Animation", use: "CSS first. Motion for layout and exit animations", why: "Recipes in motion.md cover 90%", license: "MIT", avoid: "Lottie, GSAP scroll effects, parallax" },
  { cat: "Interaction", need: "URL state (filters, sort, tab)", use: "nuqs", why: "Typed query state, shareable views", license: "MIT" },
  { cat: "Content", need: "Docs and MDX", use: "Fumadocs or Nextra + Shiki", why: "Search, TOC, versioning", license: "MIT" },
  { cat: "Content", need: "i18n", use: "next-intl (ICU MessageFormat)", why: "Plurals, RTL, server components", license: "MIT" },
  { cat: "Content", need: "Markdown rendering", use: "react-markdown + rehype-sanitize", why: "Safe user content", license: "MIT" },
  { cat: "Platform", need: "Auth", use: "Auth.js or WorkOS/Clerk", why: "Passkeys, SSO, SCIM", license: "ISC · commercial", avoid: "Rolling your own sessions" },
  { cat: "Platform", need: "Payments UI", use: "Stripe Elements (hosted fields)", why: "Card data never touches our DOM", license: "Commercial", avoid: "Custom card inputs" },
  { cat: "Platform", need: "Error tracking and RUM", use: "Sentry + web-vitals", why: "Reference ids and INP/LCP/CLS by route", license: "FSL · Apache-2.0" },
  { cat: "Quality", need: "Component docs and visual contract", use: "Storybook 10", why: "A story per state, theme and density", license: "MIT" },
  { cat: "Quality", need: "E2E and a11y gate", use: "Playwright + @axe-core/playwright", why: "Zero-violation CI gate, screenshots", license: "Apache-2.0 · MPL-2.0" },
  { cat: "Quality", need: "Unit and mocks", use: "Vitest + Testing Library + MSW", why: "Failure states are easy to simulate", license: "MIT" },
];
export function Libraries() {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(rows.map((r) => r.cat)))];
  const f = rows.filter((r) => (cat === "All" || r.cat === cat) && (r.need + r.use + r.why).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3"><div className="w-72"><Input aria-label="Search libraries" placeholder="Search by need or library…" start={<Search />} value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div className="flex flex-wrap gap-1.5">{cats.map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`h-8 rounded-control px-3 text-body-sm font-medium ${cat === c ? "bg-selected text-primary" : "text-secondary hover:bg-action-ghost-hover"}`}>{c}</button>)}</div></div>
      <Specimen title="Which library for which job" note={`${f.length} of ${rows.length}`} doc="06-engineering/stack-and-library-catalog.md" pad={false}>
        <div className="overflow-x-auto"><table className="w-full min-w-[56rem] text-body"><thead><tr className="h-9 border-b border-subtle text-body-sm text-secondary"><th className="ps-5 text-start font-medium">Need</th><th className="text-start font-medium">Use</th><th className="text-start font-medium">Why</th><th className="text-start font-medium">License</th><th className="pe-5 text-start font-medium">Avoid</th></tr></thead>
          <tbody>{f.map((r) => <tr key={r.need} className="border-b border-subtle align-top last:border-0"><td className="ps-5 py-3 pe-3 font-medium">{r.need}<div className="mt-1"><StatusPill size="sm">{r.cat}</StatusPill></div></td><td className="py-3 pe-3">{r.use}</td><td className="py-3 pe-3 text-secondary">{r.why}</td><td className="py-3 pe-3 text-secondary">{r.license}</td><td className="py-3 pe-5 text-secondary">{r.avoid ?? "—"}</td></tr>)}</tbody></table>
          {f.length === 0 && <p className="p-8 text-center text-body text-secondary">Nothing matches “{q}”. A new dependency needs the 7-question review.</p>}</div>
      </Specimen>
    </div>
  );
}
