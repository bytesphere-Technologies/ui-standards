import { useEffect, useMemo, useState } from "react";
import { Check, ArrowLeft, Search, Mail, Chrome, KeyRound } from "lucide-react";
import { Button, Input, Field, StatusPill, Segmented, Card, StatePanel, cn, useToast, type Tone } from "@bytesphere/ui";
import { Art, Logo } from "@bytesphere/ui";
import { ProgressBar, SurfaceCard } from "@bytesphere/ui";
import { CopyButton, CodeBlock } from "@bytesphere/ui";
import { statuses, statusGroups, type Status } from "../data/status";

const names: Record<string, string> = { "400": "Bad request", "401": "Unauthorized", "402": "Payment required", "403": "Forbidden", "404": "Not found", "405": "Method not allowed", "408": "Request timeout", "409": "Conflict", "410": "Gone", "413": "Payload too large", "414": "URI too long", "415": "Unsupported media type", "422": "Unprocessable", "423": "Locked", "428": "Precondition required", "429": "Too many requests", "451": "Unavailable for legal reasons", "500": "Internal server error", "501": "Not implemented", "502": "Bad gateway", "503": "Service unavailable", "504": "Gateway timeout", "507": "Insufficient storage", "511": "Network auth required", "522": "Origin timed out" };
export const statusName = (s: Status) => (s.code ? names[s.code] : s.title);
const toneOf: Record<Status["tone"], Tone> = { danger: "danger", warning: "warning", info: "info", neutral: "neutral" };
const problem = (s: Status) => JSON.stringify({ type: `https://bytesphere.example/problems/${s.slug}`, title: statusName(s), status: s.code ? +s.code : undefined, detail: s.body.split(". ")[0] + ".", instance: "/v1/deals/D-1033", requestId: "8f21-c9a3", retryAfter: s.dev.retry === "After a delay" ? 30 : undefined }, null, 2);

/* ───────── widgets ───────── */
const pad = (n: number) => String(n).padStart(2, "0");
function Ticker({ seconds, onDone }: { seconds: number; onDone?: () => void }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => { const t = setInterval(() => setLeft((l) => { if (l <= 1) { clearInterval(t); onDone?.(); return 0; } return l - 1; }), 1000); return () => clearInterval(t); }, []);
  const d = Math.floor(left / 86400), h = Math.floor((left % 86400) / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
  const cells: [string, number][] = d ? [["days", d], ["hours", h], ["min", m], ["sec", s]] : [["min", m], ["sec", s]];
  return <div role="timer" aria-label={`Time remaining: ${d ? `${d} days ` : ""}${h} hours ${m} minutes ${s} seconds`} className="flex gap-3">{cells.map(([l, v]) => <div key={l} className="grid min-w-16 place-items-center rounded-card border border-subtle bg-surface-raised px-3 py-3 text-center"><span className="tnum text-[32px] font-semibold leading-9 tracking-[-0.02em]">{pad(v)}</span><span className="text-caption text-tertiary">{l}</span></div>)}</div>;
}
function Components({ degraded }: { degraded: string[] }) {
  const rows = ["Web app", "API", "Webhooks", "Scanning", "Billing"];
  return <SurfaceCard pad="none"><div className="flex items-center justify-between border-b border-subtle px-4 py-3"><p className="text-body font-semibold">Current status</p><span className="text-body-sm text-tertiary">Updated 12:04</span></div><ul>{rows.map((r) => { const bad = degraded.includes(r); return <li key={r} className="flex items-center justify-between border-b border-subtle px-4 py-2.5 last:border-0"><span className="text-body">{r}</span><StatusPill tone={bad ? "warning" : "success"}>{bad ? "Degraded" : "Operational"}</StatusPill></li>; })}</ul></SurfaceCard>;
}
function Steps({ steps }: { steps: string[] }) {
  return <SurfaceCard><ol className="flex flex-col gap-4">{steps.map((t, i) => <li key={t} className="flex gap-3"><span className="tnum grid size-6 shrink-0 place-items-center rounded-round bg-selected text-caption font-semibold text-link">{i + 1}</span><span className="text-body">{t}</span></li>)}</ol></SurfaceCard>;
}
function Resend({ label }: { label: string }) {
  const toast = useToast(); const [cool, setCool] = useState(0); const [sent, setSent] = useState(false);
  const go = () => { setSent(true); setCool(30); toast({ tone: "success", title: "Sent", description: "Check your inbox in a minute." }); const t = setInterval(() => setCool((c) => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; }), 1000); };
  return <SurfaceCard className="flex flex-col gap-3"><Field id="rs" label="Email">{(p) => <Input {...p} type="email" start={<Mail />} defaultValue="mia@northwind.example" autoComplete="email" />}</Field><Button variant="primary" reason={cool ? `You can resend in ${cool}s` : undefined} onClick={go}>{sent ? (cool ? `Resend in ${cool}s` : "Send again") : label}</Button>{sent && <p className="m-fade text-body-sm text-status-success-fg" role="status">We’ve sent it. Check spam if it doesn’t arrive.</p>}</SurfaceCard>;
}
function Widget({ s }: { s: Status }) {
  switch (s.w) {
    case "countdown": return <div className="flex flex-col gap-4"><Ticker seconds={s.slug === "coming-soon" ? 48 * 86400 + 3 * 3600 : 1500} /><p className="text-body-sm text-secondary">{s.slug === "coming-soon" ? "Launching 1 June, 09:00 UTC" : "Estimated return 14:00 UTC"}</p>{s.slug === "coming-soon" && <Resend label="Join the waitlist" />}</div>;
    case "components": return <Components degraded={s.slug === "503" || s.slug === "outage" ? ["API", "Webhooks"] : s.slug === "522" ? ["Web app", "API"] : ["API"]} />;
    case "meter": return <SurfaceCard className="flex flex-col gap-4">{s.slug === "413" ? <><div><div className="mb-1.5 flex justify-between text-body"><span>Your file</span><span className="tnum font-medium text-status-danger-fg">48 MB</span></div><ProgressBar label="Your file" value={48} max={50} tone="danger" /></div><div><div className="mb-1.5 flex justify-between text-body"><span>Limit</span><span className="tnum text-secondary">10 MB</span></div><ProgressBar label="Limit" value={10} max={50} /></div></> : s.slug === "507" ? <div><div className="mb-1.5 flex justify-between text-body"><span>Storage</span><span className="tnum font-medium">100 of 100 GB</span></div><ProgressBar label="Storage" value={100} tone="danger" /><p className="mt-3 text-body-sm text-secondary">Largest folders: Exports 38 GB · Scans 31 GB · Invoices 12 GB</p></div> : <div><div className="mb-1.5 flex justify-between text-body"><span>Seats</span><span className="tnum font-medium">25 of 25</span></div><ProgressBar label="Seats" value={25} max={25} tone="warning" /><p className="mt-3 text-body-sm text-secondary">Adding 5 seats costs $120 per month.</p></div>}</SurfaceCard>;
    case "plans": return <div className="grid gap-3 sm:grid-cols-2">{[["Team", "$24", "Unlimited projects"], ["Business", "$48", "SSO and audit log"]].map(([n, p, f], i) => <SurfaceCard key={n} variant={i ? "tinted" : "outlined"}><p className="text-body font-semibold">{n}</p><p className="tnum mt-1 text-h3 font-semibold">{p}<span className="text-body font-normal text-secondary"> /seat</span></p><p className="mt-1 text-body-sm text-secondary">{f}</p><Button size="sm" variant={i ? "primary" : "secondary"} className="mt-3 w-full">Choose {n}</Button></SurfaceCard>)}</div>;
    case "signin": return <SurfaceCard className="flex flex-col gap-3"><Field id="si-e" label="Email">{(p) => <Input {...p} type="email" defaultValue="mia@northwind.example" autoComplete="email" />}</Field><Field id="si-p" label="Password">{(p) => <Input {...p} type="password" autoComplete="current-password" />}</Field><Button variant="primary">Sign in</Button></SurfaceCard>;
    case "steps": return <Steps steps={s.steps ?? []} />;
    case "browsers": return <SurfaceCard pad="none"><ul>{[["Chrome", "120+"], ["Edge", "120+"], ["Firefox", "121+"], ["Safari", "17+"]].map(([b, v]) => <li key={b} className="flex items-center gap-3 border-b border-subtle px-4 py-3 last:border-0"><Chrome className="size-4 text-tertiary" aria-hidden /><span className="flex-1 text-body font-medium">{b}</span><span className="tnum text-body-sm text-secondary">{v}</span><Check className="size-4 text-status-success-fg" aria-hidden /></li>)}</ul></SurfaceCard>;
    case "resend": return <Resend label={s.slug === "region-unavailable" ? "Notify me" : s.slug === "email-unverified" ? "Resend verification email" : s.slug === "invite-expired" ? "Request a new invite" : "Send a new link"} />;
    case "retry": return <SurfaceCard className="flex flex-col gap-3"><p className="text-body font-semibold">You can try again in</p><Ticker seconds={30} /></SurfaceCard>;
    case "reference": return <SurfaceCard className="flex flex-col items-center gap-4 text-center"><div className="scale-110">{(Art[s.art] ?? Art.cloud)()}</div><div className="w-full rounded-control bg-surface-sunken p-3 text-start"><div className="flex items-center justify-between"><span className="text-body-sm text-secondary">Reference</span><span className="flex items-center gap-1"><code className="font-mono text-body-sm">8f21-c9a3</code><CopyButton value="8f21-c9a3" label="Copy" /></span></div><div className="mt-2 flex justify-between text-body-sm text-tertiary"><span>12:04:41 UTC</span><span className="font-mono">/v1/deals/D-1033</span></div></div></SurfaceCard>;
    default: return <div className="grid place-items-center">{(Art[s.art] ?? Art.cloud)()}</div>;
  }
}

/* ───────── one status screen ───────── */
export function StatusScreen({ s, embedded }: { s: Status; embedded?: boolean }) {
  const [wait, setWait] = useState(s.w === "retry" ? 30 : 0);
  useEffect(() => { if (!wait) return; const t = setTimeout(() => setWait(wait - 1), 1000); return () => clearTimeout(t); }, [wait]);
  return (
    <div className={cn("flex flex-col bg-surface", !embedded && "min-h-[calc(100dvh-2.75rem)]")}>
      <header className="flex h-16 items-center justify-between px-6"><a href="#/home" aria-label="ByteSphere Technologies, home"><Logo height={34} /></a><nav aria-label="Support" className="flex gap-4 text-body font-medium text-secondary"><a href="#/status" className="hover:text-primary">System status</a><a href="#/help" className="hover:text-primary">Help</a></nav></header>
      <main id="main" tabIndex={-1} className="mx-auto grid w-full max-w-5xl flex-1 items-center gap-12 px-6 py-12 outline-none lg:grid-cols-[1.1fr_minmax(0,24rem)] lg:py-16">
        <div>
          <div className="flex items-center gap-3">{s.code && <span className="font-mono text-[15px] font-medium tracking-wide text-tertiary">{s.code}</span>}<StatusPill tone={toneOf[s.tone]} dot={false}>{s.code ? statusName(s) : s.group}</StatusPill></div>
          <h1 className="font-display mt-4 text-[clamp(1.9rem,1.3rem+2.2vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.025em]">{s.title}</h1>
          <p className="mt-4 max-w-[48ch] text-[17px] leading-7 text-secondary">{s.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3"><Button size="lg" variant="primary" reason={wait ? `Available in ${wait}s` : undefined} onClick={() => history.back()}>{wait ? `${s.primary} (${wait}s)` : s.primary}</Button>{s.secondary && <Button size="lg">{s.secondary}</Button>}</div>
          {s.w !== "reference" && <p className="mt-6 text-body-sm text-tertiary">Reference <code className="font-mono">8f21-c9a3</code> · 12:04 UTC · quote it if you contact support.</p>}
          <p className="mt-6 flex items-center gap-1.5 text-body-sm"><ArrowLeft className="size-4 text-tertiary" aria-hidden /><a href="#/dashboard" className="font-medium text-link hover:underline">Back to overview</a></p>
        </div>
        <div className="m-rise"><Widget s={s} /></div>
      </main>
      <footer className="border-t border-subtle px-6 py-4 text-center text-caption text-tertiary">© 2026 ByteSphere Technologies · <a href="#/status" className="hover:underline">Status</a> · <a href="#/legal/privacy" className="hover:underline">Privacy</a></footer>
      <section className="border-t border-subtle bg-surface-sunken px-6 py-10"><div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] [&>*]:min-w-0">
        <div><p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-tertiary">For developers · not shown to users</p><h2 className="mt-1 text-h4 font-semibold">{s.code ? `${s.code} ${statusName(s)}` : s.title}</h2>
          <dl className="mt-4 grid gap-3 break-words text-body"><div><dt className="text-body-sm font-medium text-secondary">When to use</dt><dd>{s.dev.use}</dd></div><div className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-3"><dt className="text-body-sm font-medium text-secondary">Retry</dt><dd>{s.dev.retry}</dd>{s.dev.headers && <><dt className="text-body-sm font-medium text-secondary">Headers</dt><dd className="break-all font-mono text-[13px]">{s.dev.headers}</dd></>}<dt className="text-body-sm font-medium text-secondary">Logging</dt><dd>{s.dev.log}</dd></div></dl></div>
        <div><p className="mb-2 text-body-sm font-medium text-secondary">Response body (RFC 9457 problem details)</p><CodeBlock lang="json" code={problem(s)} /></div></div></section>
    </div>);
}
export const makeStatusPage = (slug: string) => function StatusRoute() { return <StatusScreen s={statuses.find((x) => x.slug === slug)!} />; };

/* ───────── gallery and developer reference ───────── */
export function StatusGallery() {
  const [q, setQ] = useState(""); const [g, setG] = useState("All"); const [view, setView] = useState("Gallery");
  const list = useMemo(() => statuses.filter((s) => (g === "All" || s.group === g) && ((s.code ?? "") + " " + s.title + " " + statusName(s) + " " + s.slug).toLowerCase().includes(q.toLowerCase())), [q, g]);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3"><div className="w-full sm:w-72"><Input aria-label="Search status pages" start={<Search />} placeholder="Search by code or name, e.g. 404" value={q} onChange={(e) => setQ(e.target.value)} /></div><Segmented label="View" items={["Gallery", "Developer reference"]} value={view} onChange={setView} /></div>
      <div className="flex flex-wrap gap-1">{["All", ...statusGroups].map((x) => <button key={x} aria-pressed={g === x} onClick={() => setG(x)} className={cn("h-8 rounded-control px-3 text-body font-medium", g === x ? "bg-selected text-primary" : "text-secondary hover:bg-action-ghost-hover")}>{x}{x !== "All" && <span className="tnum ms-1.5 text-caption text-tertiary">{statuses.filter((s) => s.group === x).length}</span>}</button>)}</div>
      <p className="text-body-sm text-secondary">{list.length} of {statuses.length} pages. Every page has the user view, the developer notes and an RFC 9457 sample body. Screens are data in <code className="font-mono">src/data/status.ts</code>; one component renders all of them.</p>
      {list.length === 0 ? <Card><StatePanel art={<Art.search />} title={`No status page for “${q}”`} description="Try a code like 404 or 503, or a word like “session”." action={<Button onClick={() => setQ("")}>Clear search</Button>} /></Card>
        : view === "Gallery" ? statusGroups.filter((x) => list.some((s) => s.group === x)).map((grp) => (
          <section key={grp}><h2 className="mb-3 text-h4 font-semibold">{grp} <span className="tnum text-body-sm font-normal text-tertiary">{list.filter((s) => s.group === grp).length}</span></h2>
            <ul className="m-stagger grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{list.filter((s) => s.group === grp).map((s, i) => <li key={s.slug} style={{ "--i": i } as React.CSSProperties}><a href={`#/status/${s.slug}`} className="group flex h-full gap-3 rounded-card border border-subtle bg-surface-raised p-4 transition-[border-color,box-shadow] duration-150 hover:border-strong hover:shadow-raised"><span className="grid h-10 min-w-12 place-items-center rounded-control bg-surface-sunken px-2 font-mono text-body font-semibold text-secondary group-hover:bg-selected group-hover:text-link">{s.code ?? <KeyRound className="size-4" />}</span><span className="min-w-0"><span className="block text-body font-medium">{statusName(s)}</span><span className="mt-0.5 line-clamp-2 block text-body-sm text-secondary">{s.title}</span></span></a></li>)}</ul></section>))
        : <Card flush className="overflow-x-auto"><table className="w-full min-w-[60rem] text-body"><thead><tr className="h-9 border-b border-subtle bg-surface-sunken text-body-sm text-secondary"><th className="ps-4 text-start font-medium">Code</th><th className="text-start font-medium">Name</th><th className="text-start font-medium">When to use</th><th className="text-start font-medium">Retry</th><th className="pe-4 text-start font-medium">Headers</th></tr></thead>
          <tbody>{list.map((s) => <tr key={s.slug} className="border-b border-subtle align-top last:border-0"><td className="ps-4 py-3 font-mono text-body font-semibold"><a href={`#/status/${s.slug}`} className="text-link hover:underline">{s.code ?? s.slug}</a></td><td className="py-3 pe-3">{statusName(s)}<div className="text-caption text-tertiary">{s.group}</div></td><td className="max-w-md py-3 pe-3 text-secondary">{s.dev.use}</td><td className="py-3 pe-3 whitespace-nowrap">{s.dev.retry}</td><td className="py-3 pe-4 font-mono text-[12px] text-secondary">{s.dev.headers ?? "—"}</td></tr>)}</tbody></table></Card>}
      <div className="grid gap-4 md:grid-cols-3"><SurfaceCard variant="tinted"><p className="text-body font-semibold">Four rules for every status page</p><ul className="mt-2 list-disc space-y-1 ps-5 text-body text-secondary"><li>Say what happened and what to do</li><li>Keep the URL and the user’s place</li><li>Give a reference id they can quote</li><li>One primary action, never a dead end</li></ul></SurfaceCard><SurfaceCard><p className="text-body font-semibold">Tone</p><p className="mt-1 text-body text-secondary">Plain and calm. No “Oops”, no jokes on 5xx, no blame on 4xx. A joke on a 404 is fine only if the next action is just as clear.</p></SurfaceCard><SurfaceCard><p className="text-body font-semibold">Where it renders</p><p className="mt-1 text-body text-secondary">Inside the app shell when only the content failed; as a full page (as shown here) when the shell cannot be trusted; as a static HTML file from the edge for 502, 503, 504 and maintenance.</p></SurfaceCard></div>
    </div>);
}
