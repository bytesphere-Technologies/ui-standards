import { useState } from "react";
import { Search, LifeBuoy, BookOpen, CreditCard, Shield, Plug, Rocket, ArrowRight, MapPin, Clock, Download, Trash2, FileText, ShieldCheck, Lock, KeyRound, Server, Check, Star, Users } from "lucide-react";
import { Button, Field, Input, Select, Textarea, Checkbox, Switch, Segmented, StatusPill, Card, CardHeader, Banner, Tabs, useToast, cn, type Tone } from "@bytesphere/ui";
import { Accordion, Breadcrumb, DescList, Dropzone } from "@bytesphere/ui";
import { Logo, SuccessTick } from "@bytesphere/ui";
import { SurfaceCard, Backdrop } from "@bytesphere/ui";

const wrap = "mx-auto max-w-6xl px-4 py-12 sm:px-6";
const H1 = ({ children, sub }: { children: React.ReactNode; sub?: string }) => <div className="max-w-2xl"><h1 className="font-display text-[clamp(1.9rem,1.3rem+2vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em]">{children}</h1>{sub && <p className="mt-3 text-[17px] leading-7 text-secondary">{sub}</p>}</div>;

/* Public system status page */
const comps: [string, Tone, string][] = [["Web app", "success", "Operational"], ["API", "success", "Operational"], ["Webhooks", "warning", "Degraded"], ["Scanner sync", "success", "Operational"], ["Email delivery", "success", "Operational"], ["Billing", "success", "Operational"]];
const bars = (seed: number) => Array.from({ length: 90 }, (_, i) => { const r = (i * 37 + seed * 11) % 97; return r === 3 && i % 3 === 0 ? "danger" : r < 3 ? "warning" : "success"; });
export function PublicStatus() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6"><header className="flex items-center justify-between"><Logo height={34} /><Button>Subscribe to updates</Button></header>
      <div className="mt-8"><Banner tone="warning" callout title="Webhook deliveries are delayed">We’re seeing delays of up to 4 minutes. Events are queued and nothing is lost. Updated 14:32 UTC.</Banner></div>
      <section className="mt-8"><h2 className="text-h4 font-semibold">Current status</h2><div className="mt-3 divide-y divide-[var(--color-subtle)] rounded-card border border-subtle bg-surface-raised">{comps.map(([n, t, s], i) => <div key={n} className="p-4"><div className="flex items-center justify-between"><span className="text-body font-medium">{n}</span><StatusPill tone={t}>{s}</StatusPill></div><div className="mt-3 flex h-8 gap-[2px]" role="img" aria-label={`${n}: 90-day history`}>{bars(i + 2).map((b, j) => <span key={j} className={cn("flex-1 rounded-[1px]", b === "success" ? "bg-status-success-fg/70" : b === "warning" ? "bg-status-warning-fg" : "bg-status-danger-fg")} />)}</div><div className="mt-1 flex justify-between text-caption text-tertiary"><span>90 days ago</span><span className="tnum">{i === 2 ? "99.71%" : "99.98%"} uptime</span><span>Today</span></div></div>)}</div></section>
      <section className="mt-10"><h2 className="text-h4 font-semibold">Past incidents</h2>{[["12 Mar", "Elevated API latency", "Resolved in 38 minutes. A database failover took longer than expected.", "warning"], ["2 Mar", "Scanner sync delayed", "Resolved in 12 minutes.", "info"], ["Feb 20 to Mar 1", "No incidents", "", "success"]].map(([d, t, b, tone]) => <div key={d} className="mt-4 border-s-2 border-subtle ps-4"><p className="text-body-sm text-tertiary">{d}</p><p className="text-body font-medium">{t} {tone !== "success" && <StatusPill tone={tone as Tone} dot={false} size="sm">Resolved</StatusPill>}</p>{b && <p className="text-body-sm text-secondary">{b}</p>}</div>)}</section></div>);
}

/* Help center */
export function HelpCenter() {
  const cats = [["Get started", Rocket, "12 articles"], ["Billing and plans", CreditCard, "9 articles"], ["Security and access", Shield, "14 articles"], ["Integrations", Plug, "18 articles"], ["API and webhooks", BookOpen, "22 articles"], ["Scanning and devices", LifeBuoy, "11 articles"]] as const;
  return (
    <div>
      <div className="relative overflow-hidden bg-[#21346E] px-4 py-16 text-center"><Backdrop variant="rings" subtle className="absolute inset-0" /><div className="relative"><h1 className="font-display text-[clamp(1.9rem,1.3rem+2vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">How can we help?</h1><div className="mx-auto mt-6 max-w-xl"><Input aria-label="Search help" placeholder="Search articles, for example “reset password”" start={<Search />} className="!h-12" /></div></div></div>
      <div className={wrap}><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{cats.map(([t, I, n]) => <a key={t} href="#/help/article" className="group rounded-card border border-subtle bg-surface-raised p-5 transition-colors hover:border-strong"><I className="size-5 text-link" aria-hidden /><p className="mt-3 text-body font-semibold">{t}</p><p className="text-body-sm text-secondary">{n}</p></a>)}</div>
        <h2 className="mt-12 text-h4 font-semibold">Popular articles</h2><ul className="mt-3 divide-y divide-[var(--color-subtle)] rounded-card border border-subtle bg-surface-raised">{["Reset your password", "Invite teammates and set roles", "Connect a barcode scanner", "Understand your invoice", "Set up single sign-on"].map((a) => <li key={a}><a href="#/docs" className="flex items-center justify-between px-4 py-3 text-body hover:bg-action-ghost-hover">{a}<ArrowRight className="size-4 text-tertiary" aria-hidden /></a></li>)}</ul>
        <Card className="mt-10 flex flex-wrap items-center justify-between gap-4"><div><p className="text-body font-semibold">Can’t find it?</p><p className="text-body-sm text-secondary">Our team replies within 2 business days, faster on Business plans.</p></div><Button variant="primary" onClick={() => (location.hash = "/support")}>Contact support</Button></Card></div></div>);
}

/* Contact support (ticket) */
export function ContactSupport() {
  const toast = useToast(); const [sent, setSent] = useState(false); const [sev, setSev] = useState("Normal");
  if (sent) return <div className="mx-auto max-w-lg px-4 py-20 text-center"><div className="mx-auto w-fit"><SuccessTick size={56} /></div><h1 className="mt-4 text-h2 font-semibold">We got your message</h1><p className="mt-1 text-body text-secondary">Ticket <span className="font-mono">SUP-20931</span>. We’ll reply to mia@northwind.example within 2 business days.</p><Button className="mt-6" onClick={() => (location.hash = "/help")}>Back to help center</Button></div>;
  return (
    <div className={cn(wrap, "grid gap-10 lg:grid-cols-[1fr_20rem]")}><div><H1 sub="Tell us what happened. The more detail, the faster the fix.">Contact support</H1>
      <form className="mt-8 flex max-w-xl flex-col gap-5" onSubmit={(e) => { e.preventDefault(); toast({ tone: "success", title: "Ticket created" }); setSent(true); }}>
        <Field id="s-t" label="Topic">{(p) => <Select {...p}><option>Billing</option><option>Sign-in and access</option><option>Bug or error</option><option>Scanning and devices</option><option>Something else</option></Select>}</Field>
        <Field id="s-s" label="Subject">{(p) => <Input {...p} />}</Field>
        <Field id="s-d" label="What happened?" hint="Include steps, what you expected, and any error code or reference.">{(p) => <Textarea {...p} rows={6} />}</Field>
        <div><p className="mb-2 text-body font-medium">Impact</p><Segmented label="Impact" items={["Low", "Normal", "Blocking"]} value={sev} onChange={setSev} /></div>
        <div><p className="mb-2 text-body font-medium">Attachments <span className="font-normal text-tertiary">optional</span></p><Dropzone /></div>
        <div><Button type="submit" variant="primary" size="lg">Send message</Button></div></form></div>
      <aside className="flex flex-col gap-4"><Card><CardHeader title="Response times" /><ul className="mt-3 flex flex-col gap-2 text-body"><li className="flex justify-between"><span className="text-secondary">Team</span><span>2 business days</span></li><li className="flex justify-between"><span className="text-secondary">Business</span><span>8 hours</span></li><li className="flex justify-between"><span className="text-secondary">Enterprise</span><span>1 hour</span></li></ul></Card><Card><p className="text-body font-semibold">Check status first</p><p className="mt-1 text-body-sm text-secondary">If something is down, it’s on the status page.</p><a href="#/status-page" className="mt-2 inline-block text-body-sm text-link underline">Open status page</a></Card></aside></div>);
}

/* Legal document */
export function LegalDoc() {
  const secs = ["Information we collect", "How we use information", "Sharing and subprocessors", "Retention", "Your rights", "Security", "International transfers", "Changes to this policy", "Contact"];
  return (
    <div className={cn(wrap, "grid gap-10 lg:grid-cols-[14rem_minmax(0,42rem)]")}><nav aria-label="On this page" className="hidden lg:block"><div className="sticky top-24"><p className="mb-2 text-caption font-semibold uppercase tracking-wider text-tertiary">On this page</p><ol className="flex flex-col gap-1.5 border-s border-subtle">{secs.map((s, i) => <li key={s}><a href={`#s${i}`} className="-ms-px block border-s-2 border-transparent ps-3 text-body-sm text-secondary hover:border-strong hover:text-primary">{i + 1}. {s}</a></li>)}</ol></div></nav>
      <article><Breadcrumb items={[{ label: "Legal", href: "#/legal" }, { label: "Privacy policy" }]} /><h1 className="font-display mt-3 text-[clamp(1.9rem,1.3rem+2vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em]">Privacy policy</h1><p className="mt-2 text-body-sm text-secondary">Effective 1 March 2026 · <a href="#/legal" className="text-link underline">View previous version</a></p><div className="mt-6"><Banner tone="info" callout title="The short version">We collect what we need to run the product, we never sell personal data, and you can export or delete yours at any time.</Banner></div>
        {secs.map((s, i) => <section key={s} id={`s${i}`} className="scroll-mt-24"><h2 className="mt-10 text-h3 font-semibold">{i + 1}. {s}</h2><p className="mt-3 text-[16px] leading-7 text-secondary">Sample legal copy. Replace with text approved by counsel. This page demonstrates the layout: a 42rem reading column, numbered headings that match the table of contents, and a sticky contents list that highlights the current section.</p></section>)}</article></div>);
}

/* Cookie preferences */
export function CookiePrefs() {
  const [on, setOn] = useState({ a: true, m: false }); const toast = useToast();
  return (
    <div className="mx-auto max-w-2xl px-4 py-12"><H1 sub="Choose which cookies we may use. Necessary cookies are always on because the site doesn’t work without them.">Cookie preferences</H1>
      <div className="mt-8 flex flex-col gap-3">{[["Necessary", "Sign-in, security, remembering this choice.", true, null], ["Analytics", "Anonymous usage counts so we can fix what’s confusing.", on.a, "a"], ["Marketing", "Measure which campaigns bring people here.", on.m, "m"]].map(([t, d, v, k]) => <Card key={t as string} className="flex items-start justify-between gap-4"><div><p className="text-body font-semibold">{t as string}</p><p className="text-body-sm text-secondary">{d as string}</p></div><Switch id={t as string} hideLabel label={`${t} cookies`} checked={v as boolean} onChange={(x) => k && setOn({ ...on, [k as string]: x })} /></Card>)}</div>
      <div className="mt-6 flex flex-wrap gap-2"><Button variant="primary" onClick={() => toast({ tone: "success", title: "Preferences saved" })}>Save preferences</Button><Button onClick={() => setOn({ a: false, m: false })}>Reject non-essential</Button></div>
      <h2 className="mt-12 text-h4 font-semibold">Banner variants</h2><p className="text-body-sm text-secondary">First visit. Rejecting must be as easy as accepting.</p>
      <div className="mt-4 rounded-card border border-subtle bg-surface-raised p-4 shadow-raised"><p className="text-body">We use cookies to keep you signed in and to understand how the site is used. You choose which.</p><div className="mt-3 flex flex-wrap gap-2"><Button variant="primary" size="sm">Accept all</Button><Button size="sm">Reject non-essential</Button><Button size="sm" variant="ghost">Customize</Button></div></div></div>);
}

/* About */
export function About() {
  return (
    <div><div className={wrap}><H1 sub="We build software that makes field operations, inventory and sales feel as organized as the plan.">Work that moves, made simple</H1></div>
      <div className="border-y border-subtle bg-surface-sunken"><div className={cn(wrap, "grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4")}>{[["2019", "Founded"], ["140", "People in 12 countries"], ["3,200", "Teams use us"], ["99.97%", "Uptime, last 12 months"]].map(([n, l]) => <div key={l}><p className="tnum font-display text-[36px] font-semibold leading-10 tracking-[-0.02em]">{n}</p><p className="text-body text-secondary">{l}</p></div>)}</div></div>
      <div className={wrap}><h2 className="text-h3 font-semibold">What we believe</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{[["Plain over clever", "If a screen needs a manual, we haven’t finished it."], ["Quiet reliability", "The best day is one where nobody thinks about us."], ["Fair by default", "Clear prices, honest cancellation, your data stays yours."]].map(([t, d]) => <Card key={t}><p className="text-body font-semibold">{t}</p><p className="mt-1 text-body text-secondary">{d}</p></Card>)}</div>
        <h2 className="mt-14 text-h3 font-semibold">Leadership</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{["Amina Yusuf|Chief Executive", "Jonas Weber|Chief Technology", "Priya Raman|Product", "Daniel Mwangi|Operations"].map((p) => { const [n, r] = p.split("|"); return <div key={n}><div className="grid aspect-square place-items-center rounded-card bg-selected text-[28px] font-semibold text-link">{n.split(" ").map((x) => x[0]).join("")}</div><p className="mt-2 text-body font-medium">{n}</p><p className="text-body-sm text-secondary">{r}</p></div>; })}</div></div></div>);
}

/* Careers */
const jobs = [["Senior Frontend Engineer", "Engineering", "Remote, Europe", "Full-time"], ["Product Designer", "Design", "Berlin", "Full-time"], ["Customer Success Manager", "Customer", "Nairobi", "Full-time"], ["Solutions Engineer", "Sales", "Remote, Americas", "Full-time"], ["Technical Writer", "Product", "Remote", "Contract"]];
export function Careers() {
  const [dept, setDept] = useState("All"); const list = jobs.filter((j) => dept === "All" || j[1] === dept);
  return (
    <div className={wrap}><H1 sub="Small teams, clear ownership, no heroics. We hire in the open and pay in the open.">Join us</H1>
      <div className="mt-8"><Segmented label="Department" items={["All", "Engineering", "Design", "Customer", "Sales", "Product"]} value={dept} onChange={setDept} /></div>
      <ul className="mt-6 divide-y divide-[var(--color-subtle)] rounded-card border border-subtle bg-surface-raised">{list.map(([t, d, l, ty]) => <li key={t}><a href="#/careers" className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-action-ghost-hover"><div><p className="text-body font-semibold">{t}</p><p className="text-body-sm text-secondary">{d}</p></div><div className="flex items-center gap-4 text-body-sm text-secondary"><span className="flex items-center gap-1"><MapPin className="size-4" aria-hidden />{l}</span><span className="flex items-center gap-1"><Clock className="size-4" aria-hidden />{ty}</span><ArrowRight className="size-4 text-tertiary" aria-hidden /></div></a></li>)}</ul>
      {!list.length && <p className="mt-6 text-body text-secondary">No open roles in {dept} right now. Send us a note and we’ll keep it on file.</p>}</div>);
}

/* Blog */
const posts = [["Product", "How offline scanning works", "Queues, conflict rules and what happens when two devices disagree.", "12 Mar"], ["Engineering", "Moving to a single design system", "What we deleted, what we kept and what broke.", "4 Mar"], ["Company", "Our 2025 transparency report", "Uptime, incidents, and every data request we received.", "20 Feb"], ["Product", "Invoices you can actually read", "A redesign driven by support tickets.", "9 Feb"]];
export function BlogIndex() {
  return (
    <div className={wrap}><H1>Notes from the team</H1>
      <a href="#/blog/post" className="mt-8 grid overflow-hidden rounded-card border border-subtle bg-surface-raised md:grid-cols-2"><div className="relative min-h-48 overflow-hidden bg-[#21346E]"><Backdrop variant="rings" subtle className="absolute inset-0" /></div><div className="p-6"><StatusPill tone="info" dot={false}>Featured</StatusPill><h2 className="mt-3 text-h2 font-semibold">{posts[0][1]}</h2><p className="mt-2 text-body text-secondary">{posts[0][2]}</p><p className="mt-4 text-body-sm text-tertiary">{posts[0][3]} · 8 min read</p></div></a>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{posts.slice(1).map(([c, t, d, dt]) => <a key={t} href="#/blog/post" className="rounded-card border border-subtle bg-surface-raised p-5 transition-colors hover:border-strong"><p className="text-caption font-semibold uppercase tracking-wider text-link">{c}</p><h3 className="mt-2 text-h4 font-semibold">{t}</h3><p className="mt-1 text-body-sm text-secondary">{d}</p><p className="mt-4 text-caption text-tertiary">{dt}</p></a>)}</div></div>);
}
export function BlogPost() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12"><Breadcrumb items={[{ label: "Blog", href: "#/blog" }, { label: "Product" }]} /><h1 className="font-display mt-3 text-[clamp(2rem,1.4rem+2.2vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.025em]">How offline scanning works</h1><div className="mt-4 flex items-center gap-3 text-body-sm text-secondary"><span className="grid size-8 place-items-center rounded-round bg-selected text-caption font-semibold text-link">JW</span>Jonas Weber · 12 Mar 2026 · 8 min read</div>
      {["A scanner in a warehouse loses signal every few minutes. We treat that as the normal case, not the exception.", "Every scan is written to a local queue first, stamped with the device clock and a monotonic counter. Sync is a separate process that drains the queue when it can."].map((p) => <p key={p} className="mt-6 text-[17px] leading-8 text-secondary">{p}</p>)}
      <h2 className="mt-10 text-h3 font-semibold">When two devices disagree</h2><p className="mt-3 text-[17px] leading-8 text-secondary">We apply last-writer-wins per field, except quantities, which merge as deltas.</p><blockquote className="my-8 border-s-4 border-action-primary ps-5 text-[20px] font-medium leading-8">Sync should be boring. Boring means nobody loses a scan.</blockquote>
      <Card className="mt-10 flex items-center justify-between gap-4"><div><p className="text-body font-semibold">Get new posts by email</p><p className="text-body-sm text-secondary">One a month. Unsubscribe in one click.</p></div><Button>Subscribe</Button></Card></article>);
}

/* Trust center */
export function TrustCenter() {
  return (
    <div className={wrap}><H1 sub="How we protect your data, and the evidence to check it.">Trust center</H1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["SOC 2 Type II", "Audited 2025", ShieldCheck], ["ISO 27001", "Certified", Lock], ["GDPR", "DPA available", FileText], ["Encryption", "AES-256, TLS 1.3", KeyRound]].map(([t, d, I]) => { const Ic = I as typeof Lock; return <Card key={t as string}><Ic className="size-5 text-link" aria-hidden /><p className="mt-3 text-body font-semibold">{t as string}</p><p className="text-body-sm text-secondary">{d as string}</p></Card>; })}</div>
      <h2 className="mt-12 text-h3 font-semibold">Documents</h2><ul className="mt-4 divide-y divide-[var(--color-subtle)] rounded-card border border-subtle bg-surface-raised">{[["SOC 2 Type II report", "Requires NDA"], ["Penetration test summary", "Public"], ["Data processing agreement", "Public"], ["Subprocessor list", "Public"]].map(([n, a]) => <li key={n} className="flex items-center justify-between px-5 py-3.5"><span className="flex items-center gap-3 text-body"><FileText className="size-4 text-tertiary" aria-hidden />{n}</span><span className="flex items-center gap-3 text-body-sm text-secondary">{a}<Button size="sm"><Download />{a === "Public" ? "Download" : "Request"}</Button></span></li>)}</ul>
      <h2 className="mt-12 text-h3 font-semibold">Common questions</h2><div className="mt-4"><Accordion items={[{ q: "Where is my data stored?", a: "In the region you choose at signup: US or EU. It never leaves that region." }, { q: "Do you use my data to train models?", a: "No. Customer content is never used for training." }, { q: "How do I report a vulnerability?", a: "Email security@bytesphere.example. We acknowledge within one business day." }]} /></div></div>);
}

/* Integrations directory */
const ints = [["Slack", "Communication", true], ["Gmail", "Communication", true], ["Google Sheets", "Data", false], ["Zapier", "Automation", false], ["QuickBooks", "Finance", false], ["Stripe", "Finance", true], ["Okta", "Security", false], ["Zendesk", "Support", false], ["Shopify", "Commerce", false]] as const;
export function IntegrationsDirectory() {
  const [cat, setCat] = useState("All"); const [q, setQ] = useState(""); const list = ints.filter(([n, c]) => (cat === "All" || c === cat) && n.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className={wrap}><H1 sub="Connect the tools your team already uses.">Integrations</H1>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3"><Segmented label="Category" items={["All", "Communication", "Finance", "Data", "Automation", "Security"]} value={cat} onChange={setCat} /><div className="w-full sm:w-64"><Input aria-label="Search integrations" placeholder="Search" start={<Search />} value={q} onChange={(e) => setQ(e.target.value)} /></div></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map(([n, c, on]) => <Card key={n} className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-card border border-subtle bg-surface-sunken text-body font-semibold text-link">{n[0]}</span><div className="min-w-0 flex-1"><p className="text-body font-semibold">{n}</p><p className="text-body-sm text-secondary">{c}</p></div>{on ? <StatusPill tone="success">Connected</StatusPill> : <Button size="sm">Connect</Button>}</Card>)}</div>
      {!list.length && <p className="mt-8 text-body text-secondary">Nothing matches “{q}”. Don’t see yours? <a href="#/support" className="text-link underline">Request an integration</a>.</p>}</div>);
}

/* Feedback / NPS */
export function Feedback() {
  const [score, setScore] = useState<number | null>(null); const [done, setDone] = useState(false);
  if (done) return <div className="mx-auto max-w-md px-4 py-24 text-center"><div className="mx-auto w-fit"><SuccessTick size={56} /></div><h1 className="mt-4 text-h2 font-semibold">Thank you</h1><p className="mt-1 text-body text-secondary">We read every response.</p></div>;
  return (
    <div className="mx-auto max-w-xl px-4 py-14"><Logo height={34} /><h1 className="mt-8 text-h2 font-semibold">How likely are you to recommend us to a colleague?</h1>
      <div role="radiogroup" aria-label="Score from 0 to 10" className="mt-6 grid grid-cols-11 gap-1">{Array.from({ length: 11 }, (_, i) => <button key={i} role="radio" aria-checked={score === i} onClick={() => setScore(i)} className={cn("tnum aspect-square rounded-control border text-body font-medium transition-colors", score === i ? "border-action-primary bg-action-primary text-action-primary-fg" : "border-subtle bg-surface-raised hover:border-strong")}>{i}</button>)}</div><div className="mt-1 flex justify-between text-caption text-tertiary"><span>Not likely</span><span>Very likely</span></div>
      {score !== null && <div className="m-rise mt-6 flex flex-col gap-4"><Field id="fb" label={score >= 9 ? "What do you like most?" : "What should we do better?"} optional>{(p) => <Textarea {...p} rows={4} />}</Field><div><Button variant="primary" onClick={() => setDone(true)}>Send feedback</Button></div></div>}</div>);
}

/* Privacy center */
export function PrivacyCenter() {
  const toast = useToast();
  return (
    <div className="mx-auto max-w-3xl px-4 py-12"><H1 sub="Download or delete the data we hold about you.">Your data</H1>
      <div className="mt-8 flex flex-col gap-4"><Card className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-body font-semibold">Export your data</p><p className="text-body-sm text-secondary">A ZIP of your profile, activity and files. We email a link within 24 hours. It expires after 7 days.</p></div><Button onClick={() => toast({ tone: "info", title: "Export requested", description: "We’ll email you when it’s ready." })}><Download />Request export</Button></Card>
        <Card className="border-status-danger-border"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-body font-semibold">Delete your account</p><p className="text-body-sm text-secondary">Removes your profile and personal data after a 30-day grace period. Workspaces you own must be transferred first.</p></div><Button variant="danger"><Trash2 />Delete account</Button></div></Card>
        <Card><CardHeader title="Consent history" desc="What you agreed to, and when." /><div className="mt-4"><DescList items={[["Terms of Service", "v4.2 · 1 Mar 2026"], ["Privacy policy", "v3.1 · 1 Mar 2026"], ["Marketing email", "Opted out · 14 Jan 2026"]]} /></div></Card></div></div>);
}

/* Unsubscribe / email preferences */
export function Unsubscribe() {
  const [s, setS] = useState({ product: true, news: false, tips: true }); const [out, setOut] = useState(false);
  return (
    <div className="mx-auto max-w-lg px-4 py-20"><Logo height={34} /><h1 className="mt-8 text-h2 font-semibold">Email preferences</h1><p className="mt-1 text-body text-secondary">For mia@northwind.example</p>
      <div className="mt-6 flex flex-col gap-3">{[["product", "Product updates", "New features, once or twice a month."], ["news", "Company news", "Rare."], ["tips", "Tips and guides", "Short how-tos."]].map(([k, t, d]) => <Card key={k} className="flex items-start justify-between gap-4"><div><p className="text-body font-medium">{t}</p><p className="text-body-sm text-secondary">{d}</p></div><Switch id={k} label={t} checked={!out && s[k as "tips"]} onChange={(v) => setS({ ...s, [k]: v })} /></Card>)}</div>
      <div className="mt-6 flex flex-wrap gap-2"><Button variant="primary">Save</Button><Button onClick={() => setOut(true)}>Unsubscribe from all</Button></div>{out && <p className="m-fade mt-4 text-body text-secondary">You’re unsubscribed. We’ll still send account and billing emails, because you need them.</p>}</div>);
}

void [Check, Star, Users, Server, Tabs, Checkbox, SurfaceCard, LifeBuoy];
