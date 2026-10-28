import { useState } from "react";
import { Check, Minus, ArrowRight, ShieldCheck, Zap, Table2, FileText, Plug, Bell, Clock, Mail } from "lucide-react";
import { Button, Segmented, StatusPill, Field, Input, Select, Textarea, Card, Avatar, useToast, cn, Banner, Checkbox } from "@bytesphere/ui";
import { Accordion, LineChart, Stat, CodeBlock } from "@bytesphere/ui";
import { BrandMark } from "@bytesphere/ui";
import { revNow, revPrev, months, people, money } from "../data";

const Section = ({ children, className, tone }: { children: React.ReactNode; className?: string; tone?: "sunken" | "navy" }) => (
  <section className={cn(tone === "sunken" && "bg-surface-sunken", tone === "navy" && "bg-action-accent text-action-accent-fg")}><div className={cn("mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20", className)}>{children}</div></section>);

/* Product mock built from the real components, so the hero shows the actual UI */
function ProductShot() {
  return (
    <div className="overflow-hidden rounded-modal border border-subtle bg-surface-sunken shadow-modal" aria-label="Product screenshot: deals overview" role="img">
      <div className="flex h-9 items-center gap-1.5 border-b border-subtle bg-surface px-3"><i className="size-2.5 rounded-round bg-control" /><i className="size-2.5 rounded-round bg-control" /><i className="size-2.5 rounded-round bg-control" /></div>
      <div className="grid grid-cols-[9rem_1fr]"><div className="hidden border-e border-subtle bg-surface p-2 sm:block">{["Overview", "Deals", "Pipeline", "Inbox", "Reports"].map((l, i) => <div key={l} className={cn("flex h-7 items-center rounded-control px-2 text-[12px] font-medium", i === 0 ? "bg-selected text-primary" : "text-secondary")}>{l}</div>)}</div>
        <div className="col-span-2 p-4 sm:col-span-1"><div className="grid grid-cols-3 gap-3">{[["Net revenue", "$46.2K", "▲ 4.2%"], ["Active", "1,284", "▲ 1.1%"], ["Churn", "2.1%", "▲ 0.3 pt"]].map(([a, b, c]) => <div key={a} className="rounded-card border border-subtle bg-surface-raised p-3"><p className="text-[11px] text-secondary">{a}</p><p className="tnum text-[17px] font-semibold leading-6">{b}</p><p className="tnum text-[11px] text-status-success-fg">{c}</p></div>)}</div>
          <div className="mt-3 rounded-card border border-subtle bg-surface-raised p-3"><LineChart labels={months} height={150} yMax={60} yMin={20} unit="K" series={[{ name: "Previous", data: revPrev, color: "var(--color-data-6)", dashed: true }, { name: "This period", data: revNow, color: "var(--color-data-1)" }]} /></div></div></div>
    </div>);
}

export function Landing() {
  return (<>
    <Section className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_1.15fr]">
      <div><StatusPill tone="info" dot={false}>New: approvals inbox</StatusPill>
        <h1 className="font-display mt-5 text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-semibold leading-[1.12] tracking-[-0.025em]">Run renewals from one place</h1>
        <p className="mt-4 max-w-[46ch] text-[17px] leading-7 text-secondary">Track every deal, route approvals to the right person, and see what is late before the customer does.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Button size="lg" variant="primary" onClick={() => (location.hash = "/sign-up")}>Start free trial<ArrowRight /></Button><Button size="lg" onClick={() => (location.hash = "/contact-sales")}>Book a demo</Button></div>
        <p className="mt-3 text-body-sm text-tertiary">14 days free. No card required.</p></div>
      <ProductShot />
    </Section>
    <Section tone="sunken"><div className="grid gap-px overflow-hidden rounded-card bg-[var(--color-subtle)] sm:grid-cols-3">{[["Median approval time", "4.2 h", "Sample figure, replace with sourced data"], ["Deals tracked per workspace", "1,284", "Sample figure"], ["Import from CSV or CRM", "2 min", "Sample figure"]].map(([a, b, c]) => <div key={a} className="bg-surface-raised p-6"><p className="text-body-sm text-secondary">{a}</p><p className="tnum mt-1 text-[32px] font-semibold leading-10 tracking-[-0.02em]">{b}</p><p className="mt-1 text-caption text-tertiary">{c}</p></div>)}</div></Section>
    {[{ t: "See what is late, not just what exists", d: "The overview leads with past-due invoices and stalled deals, ranked by value. Every item has the next action beside it.", i: Table2, rev: false }, { t: "Approvals that don’t get lost", d: "Send an approval to a person or a role. They get one notification, can answer from the inbox, and everything is logged.", i: Bell, rev: true }].map((f) => (
      <Section key={f.t} className="grid items-center gap-12 py-12 sm:py-14 lg:grid-cols-2"><div className={f.rev ? "lg:order-2" : undefined}><f.i className="size-5 text-link" aria-hidden /><h2 className="font-display mt-4 text-h1 font-semibold tracking-[-0.02em]">{f.t}</h2><p className="mt-3 max-w-[48ch] text-body-lg text-secondary" style={{ fontSize: 16, lineHeight: "26px" }}>{f.d}</p><a href="#/changelog" className="mt-5 inline-flex items-center gap-1 font-medium text-link hover:underline">What’s new<ArrowRight className="size-4" /></a></div>
        <Card className="p-6">{f.rev ? <div className="flex flex-col gap-3">{people.slice(0, 3).map((p, i) => <div key={p.id} className="flex items-center gap-3 rounded-control border border-subtle p-3"><Avatar id={p.id} name={p.name} /><div className="flex-1 text-body"><p className="font-medium">{["Approve PO for Litware", "Review DPA redlines", "Sign off Contoso credit"][i]}</p><p className="text-body-sm text-secondary">Requested by {p.name}</p></div><Button size="sm" variant={i === 0 ? "primary" : "secondary"}>Approve</Button></div>)}</div> : <div className="grid grid-cols-2 gap-3"><Stat label="Past due" value="37" delta="6" good={false} period="vs. last 30 days" /><Stat label="Stalled deals" value="12" delta="2" good period="vs. last 30 days" /></div>}</Card></Section>))}
    <Section tone="sunken"><div className="grid gap-10 md:grid-cols-3">{[[ShieldCheck, "Security", "SSO, passkeys, audit log, 12-month retention. Report available on request."], [Plug, "Connects to what you use", "Slack, Gmail, GitHub, webhooks and a documented REST API."], [Clock, "Fast where it counts", "Typing and filtering respond in under 100 ms on a 50,000-row workspace."]].map(([I, t, d]) => { const Ic = I as typeof Zap; return <div key={t as string}><Ic className="size-5 text-link" aria-hidden /><h3 className="mt-3 text-h4 font-semibold">{t as string}</h3><p className="mt-1 text-body text-secondary">{d as string}</p></div>; })}</div></Section>
    <Section tone="navy" className="py-14 text-center"><h2 className="font-display text-h1 font-semibold tracking-[-0.02em]">See it with your own data</h2><p className="mx-auto mt-2 max-w-md text-body-lg" style={{ fontSize: 16 }}>Import a CSV and have a working overview in about two minutes.</p><div className="mt-6 flex justify-center gap-3"><Button size="lg" onClick={() => (location.hash = "/sign-up")}>Start free trial</Button><Button size="lg" variant="ghost" className="!text-action-accent-fg hover:!bg-white/10" onClick={() => (location.hash = "/contact-sales")}>Talk to sales</Button></div></Section>
  </>);
}

const plans = [
  { n: "Free", p: [0, 0], d: "For trying it out", cta: "Start free", f: ["3 projects", "1 GB storage", "Community support"] },
  { n: "Team", p: [24, 19], d: "For growing teams", cta: "Start free trial", hl: true, f: ["Unlimited projects", "100 GB storage", "Slack and Gmail", "Email support, 2 business days"] },
  { n: "Business", p: [48, 38], d: "For larger organizations", cta: "Choose Business", f: ["Everything in Team", "1 TB storage", "SSO and audit log", "Support within 8 hours"] },
];
const rowsT: [string, (string | boolean)[]][] = [["Projects", ["3", "Unlimited", "Unlimited"]], ["Storage", ["1 GB", "100 GB", "1 TB"]], ["Integrations", [false, true, true]], ["API access", [false, true, true]], ["SSO (SAML)", [false, false, true]], ["Audit log retention", [false, "30 days", "12 months"]], ["Support response", ["Community", "2 business days", "8 hours"]]];
export function Pricing() {
  const [annual, setAnnual] = useState("Annual"); const yr = annual === "Annual";
  return (<>
    <Section className="pb-8 text-center sm:pb-10"><h1 className="font-display text-[clamp(2rem,1.4rem+2.6vw,3rem)] font-semibold leading-[1.12] tracking-[-0.025em]">Pricing that grows with your team</h1><p className="mx-auto mt-4 max-w-xl text-[17px] leading-7 text-secondary">Pay per seat. Change plan or cancel any time from Billing.</p>
      <div className="mt-8 flex items-center justify-center gap-3"><Segmented label="Billing period" items={["Monthly", "Annual"]} value={annual} onChange={setAnnual} /><span className="text-body-sm font-medium text-status-success-fg" aria-live="polite">{yr ? "Save about 20%" : ""}</span></div></Section>
    <Section className="pt-0 sm:pt-0"><div className="grid gap-4 lg:grid-cols-3">{plans.map((pl) => (
      <div key={pl.n} className={cn("relative flex flex-col rounded-card border bg-surface-raised p-6", pl.hl ? "border-action-primary shadow-raised ring-1 ring-action-primary" : "border-subtle")}>
        {pl.hl && <span className="absolute -top-3 start-5 rounded-tag bg-surface-raised"><StatusPill tone="info" dot={false}>Most popular</StatusPill></span>}
        <h2 className="text-h4 font-semibold">{pl.n}</h2><p className="text-body text-secondary">{pl.d}</p>
        <p className="mt-5 flex items-baseline gap-1"><span className="tnum font-display text-[40px] font-semibold leading-none tracking-[-0.03em]" aria-live="polite">${pl.p[yr ? 1 : 0]}</span><span className="text-body text-secondary">{pl.p[0] ? "per seat / month" : "forever"}</span></p>
        <p className="mt-1 h-5 text-body-sm text-tertiary">{pl.p[0] ? (yr ? `Billed annually · $${pl.p[1] * 12} per seat` : "Billed monthly") : ""}</p>
        <Button size="lg" variant={pl.hl ? "primary" : "secondary"} className="mt-5 w-full" onClick={() => (location.hash = "/sign-up")}>{pl.cta}</Button>
        <ul className="mt-6 flex flex-col gap-2.5 border-t border-subtle pt-5">{pl.f.map((x) => <li key={x} className="flex gap-2.5 text-body"><Check className="mt-0.5 size-4 shrink-0 text-link" aria-hidden />{x}</li>)}</ul></div>))}</div>
      <Card className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><div><h2 className="text-h4 font-semibold">Enterprise</h2><p className="text-body text-secondary">Volume pricing, security review, custom contract and DPA. We reply within one business day.</p></div><Button onClick={() => (location.hash = "/contact-sales")}>Contact sales</Button></Card></Section>
    <Section className="pt-4 sm:pt-4"><h2 className="font-display mb-5 text-h2 font-semibold tracking-[-0.02em]">Compare plans</h2>
      <div className="overflow-x-auto rounded-card border border-subtle bg-surface-raised"><table className="w-full min-w-[40rem] text-body"><thead><tr className="h-12 border-b border-subtle text-start"><th scope="col" className="ps-5 text-start font-medium text-secondary"><span className="sr-only">Feature</span></th>{["Free", "Team", "Business"].map((p) => <th scope="col" key={p} className="text-start font-semibold">{p}</th>)}</tr></thead>
        <tbody>{rowsT.map(([k, v]) => <tr key={k} className="h-12 border-b border-subtle last:border-0"><th scope="row" className="ps-5 text-start font-normal text-secondary">{k}</th>{v.map((c, i) => <td key={i}>{c === true ? <><Check className="size-4 text-link" aria-hidden /><span className="sr-only">Included</span></> : c === false ? <><Minus className="size-4 text-tertiary" aria-hidden /><span className="sr-only">Not included</span></> : <span className="tnum">{c}</span>}</td>)}</tr>)}</tbody></table></div>
      <p className="mt-3 text-body-sm text-tertiary">Prices in USD, excluding tax. Annual plans are billed once per year.</p></Section>
    <Section tone="sunken"><div className="mx-auto max-w-3xl"><h2 className="font-display mb-5 text-h2 font-semibold tracking-[-0.02em]">Questions we get a lot</h2><Accordion items={[{ q: "Can I change plans mid-cycle?", a: "Yes. Upgrades apply immediately and are prorated. Downgrades take effect at the end of the billing period." }, { q: "How do I cancel?", a: "Billing → Cancel plan. It takes effect at the end of the period and you keep read-only access for 30 days." }, { q: "Do you offer refunds?", a: "Annual plans are refundable within 14 days of purchase or renewal. Write to billing and we’ll process it." }, { q: "Where is my data stored?", a: "In the EU or the US, your choice at signup. A data-processing addendum is available for every paid plan." }]} /></div></Section>
  </>);
}

export function ContactSales() {
  const toast = useToast(); const [sent, setSent] = useState(false); const [busy, setBusy] = useState(false);
  return (
    <Section className="grid gap-12 lg:grid-cols-[1fr_1.1fr]"><div><h1 className="font-display text-h1 font-semibold tracking-[-0.02em]">Talk to our team</h1><p className="mt-3 max-w-[44ch] text-body-lg text-secondary" style={{ fontSize: 16, lineHeight: "26px" }}>Tell us about your team and what you want to replace. We reply within one business day, usually sooner.</p>
      <ul className="mt-8 flex flex-col gap-3 text-body">{["A 30-minute walkthrough with your own data", "Security questionnaire and DPA on request", "Volume pricing above 100 seats"].map((x) => <li key={x} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-link" aria-hidden />{x}</li>)}</ul></div>
      <Card className="p-6 sm:p-8">{sent ? <div className="m-fade py-8 text-center"><div className="mx-auto w-fit"><BrandMark size={48} /></div><h2 className="mt-4 text-h3 font-semibold">Thanks, we’ve got it</h2><p className="mt-1 text-body text-secondary">Expect a reply from a real person within one business day.</p></div> :
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setBusy(true); setTimeout(() => { setBusy(false); setSent(true); toast({ tone: "success", title: "Message sent" }); }, 1000); }}><div className="grid gap-4 sm:grid-cols-2"><Field id="c1" label="First name">{(p) => <Input {...p} autoComplete="given-name" />}</Field><Field id="c2" label="Last name">{(p) => <Input {...p} autoComplete="family-name" />}</Field></div>
          <Field id="c3" label="Work email">{(p) => <Input {...p} type="email" autoComplete="email" />}</Field><div className="grid gap-4 sm:grid-cols-2"><Field id="c4" label="Company">{(p) => <Input {...p} autoComplete="organization" />}</Field><Field id="c5" label="Team size">{(p) => <Select {...p}><option>1–10</option><option>11–50</option><option>51–200</option><option>200+</option></Select>}</Field></div>
          <Field id="c6" label="What are you hoping to solve?" optional>{(p) => <Textarea {...p} />}</Field><Checkbox id="c7" label="Send me product news" hint="Optional. One email a month, unsubscribe any time." checked={false} onChange={() => {}} /><Button type="submit" size="lg" variant="primary" loading={busy}>{busy ? "Sending" : "Send message"}</Button></form>}</Card></Section>);
}

export function Changelog() {
  const items = [["14 Mar 2026", "v4.2", "Approvals inbox", ["Send an approval to a person or role.", "Answer from the inbox with J / K navigation.", "Every decision is written to the audit log."], "info", "New"], ["27 Feb 2026", "v4.1", "Faster tables", ["Virtualized rows past 200 records.", "Compact density remembers your choice per table."], "success", "Improved"], ["9 Feb 2026", "v4.0", "New sign-in", ["Passkeys on every plan.", "Sign-in no longer asks for a password when SSO is required."], "neutral", "Major"]] as const;
  return (<Section className="max-w-3xl"><h1 className="font-display text-h1 font-semibold tracking-[-0.02em]">What’s new</h1><p className="mt-2 text-body-lg text-secondary" style={{ fontSize: 16 }}>Product updates, newest first.</p>
    <ol className="mt-10 flex flex-col gap-10 border-s border-subtle ps-8">{items.map(([d, v, t, ls, tone, tag]) => <li key={v} className="relative"><span className="absolute -start-[2.4rem] top-1.5 size-2.5 rounded-round bg-action-primary ring-4 ring-[var(--color-surface)]" aria-hidden /><div className="flex flex-wrap items-center gap-2 text-body-sm text-secondary"><time>{d}</time><span>·</span><span className="font-mono">{v}</span><StatusPill tone={tone as "info"} dot={false} size="sm">{tag}</StatusPill></div><h2 className="mt-1.5 text-h3 font-semibold">{t}</h2><ul className="mt-2 list-disc space-y-1 ps-5 text-body text-secondary marker:text-tertiary">{ls.map((l) => <li key={l}>{l}</li>)}</ul></li>)}</ol></Section>);
}

export function DocsShell() {
  const [act, setAct] = useState("verify");
  const toc = ["Overview", "Create an endpoint", "Verify signatures", "Retries"];
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
      <nav aria-label="Docs" className="text-body lg:sticky lg:top-20 lg:self-start">{[["Getting started", ["Quickstart", "Authentication"]], ["Guides", ["Webhooks", "Pagination", "Errors"]], ["API reference", ["Deals", "Invoices", "Members"]]].map(([g, l]) => <div key={g as string} className="mb-5"><p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-tertiary">{g as string}</p>{(l as string[]).map((x) => <a key={x} href="#/docs" aria-current={x === "Webhooks" ? "page" : undefined} className={cn("ring-inset-focus flex h-8 items-center rounded-control px-2 hover:bg-action-ghost-hover", x === "Webhooks" ? "bg-selected font-semibold text-primary" : "text-secondary")}>{x}</a>)}</div>)}</nav>
      <article className="min-w-0 max-w-[46rem]"><nav aria-label="Breadcrumb" className="mb-3 text-body-sm text-secondary">Docs › Guides › <span className="text-primary">Webhooks</span></nav>
        <h1 className="text-[32px] font-semibold leading-10 tracking-[-0.02em]">Webhooks</h1><p className="mt-1 text-body-sm text-tertiary">Updated 12 Mar 2026 · 6 min read</p>
        <p className="mt-5 text-[16px] leading-7 text-secondary">Webhooks send an HTTPS POST to your server whenever something changes. Use them to keep your own systems in sync without polling.</p>
        <h2 id="create" className="mt-10 text-h3 font-semibold">Create an endpoint</h2><p className="mt-2 text-[16px] leading-7 text-secondary">Add a URL under Settings → Integrations → Webhooks. We send a test event right away so you can confirm it works.</p>
        <div className="mt-4"><CodeBlock lang="json" code={`{\n  "id": "evt_1Nq8x2",\n  "type": "deal.updated",\n  "created": "2026-03-12T09:14:00Z",\n  "data": { "id": "D-1033", "stage": "negotiation" }\n}`} /></div>
        <div className="mt-6"><Banner tone="warning" callout title="Always verify the signature">Reject requests without a valid <code className="font-mono text-[13px]">Signature</code> header. Anyone can post to a public URL.</Banner></div>
        <h2 id="verify" className="mt-10 text-h3 font-semibold">Verify signatures</h2><p className="mt-2 text-[16px] leading-7 text-secondary">Compute an HMAC-SHA256 of the raw body with your signing secret and compare it to the header in constant time.</p>
        <div className="mt-8 flex items-center gap-4 border-t border-subtle pt-5 text-body-sm"><span className="text-secondary">Was this helpful?</span><Button size="sm">Yes</Button><Button size="sm">No</Button></div></article>
      <aside aria-label="On this page" className="hidden xl:block"><div className="sticky top-20"><p className="mb-2 text-body-sm font-medium">On this page</p><ul className="border-s border-subtle">{toc.map((t) => <li key={t}><a href="#/docs" onClick={() => setAct(t)} className={cn("-ms-px block border-s py-1 ps-3 text-body-sm", (act === t || (act === "verify" && t === "Verify signatures")) ? "border-action-primary font-medium text-primary" : "border-transparent text-secondary hover:text-primary")}>{t}</a></li>)}</ul></div></aside>
    </div>);
}
