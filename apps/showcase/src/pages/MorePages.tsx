import * as React from "react";
import { useState } from "react";
import { Check, Heart, X, Package, ChevronLeft, ChevronRight, Clock, CircleCheck } from "lucide-react";
import { Button, Card, CardHeader, StatusPill, Segmented, Select, Field, Checkbox, Banner, cn, useToast } from "@bytesphere/ui";
import { PageHeader } from "@bytesphere/ui";
import { Logo } from "@bytesphere/ui";

/* ───────── Timeline (Gantt) ───────── */
const weeks = Array.from({ length: 10 }, (_, i) => `W${i + 1}`);
const bars = [
  { n: "Discovery", s: 0, l: 2, p: 100 }, { n: "Design", s: 1, l: 3, p: 80 }, { n: "Build", s: 3, l: 4, p: 40 },
  { n: "QA", s: 6, l: 2, p: 0 }, { n: "Launch", s: 8, l: 1, p: 0 },
];
export function TimelinePage() {
  return (
    <>
      <PageHeader title="Project timeline" desc="Bars show start, length and progress. Each row also states its dates in text." />
      <Card flush><div className="overflow-x-auto" role="region" aria-label="Timeline" tabIndex={0}>
        <div className="min-w-[40rem]">
          <div className="grid grid-cols-[8rem_1fr] border-b border-subtle text-caption text-secondary"><span className="p-3">Task</span>
            <div className="grid" style={{ gridTemplateColumns: `repeat(${weeks.length},1fr)` }}>{weeks.map((w) => <span key={w} className="p-3">{w}</span>)}</div></div>
          {bars.map((b) => (
            <div key={b.n} className="grid grid-cols-[8rem_1fr] items-center border-b border-subtle last:border-0">
              <span className="p-3 text-body">{b.n}</span>
              <div className="grid items-center py-3" style={{ gridTemplateColumns: `repeat(${weeks.length},1fr)` }}>
                <div className="relative h-6 overflow-hidden rounded-control bg-selected" style={{ gridColumn: `${b.s + 1} / span ${b.l}` }} role="img" aria-label={`${b.n}: week ${b.s + 1} to ${b.s + b.l}, ${b.p}% done`}>
                  <div className="h-full bg-action-primary" style={{ width: `${b.p}%` }} />
                </div>
              </div>
            </div>))}
        </div></div></Card>
    </>);
}

/* ───────── Approval workflow ───────── */
export function ApprovalPage() {
  const toast = useToast();
  const [steps, setSteps] = useState([{ who: "Requester", st: "done" }, { who: "Team lead", st: "done" }, { who: "Finance", st: "now" }, { who: "Director", st: "wait" }]);
  const [note, setNote] = useState("");
  const act = (ok: boolean) => {
    const i = steps.findIndex((s) => s.st === "now");
    setSteps(steps.map((s, j) => (j === i ? { ...s, st: ok ? "done" : "no" } : j === i + 1 && ok ? { ...s, st: "now" } : s)));
    toast({ tone: "success", title: ok ? "Approved. Moved to the next step." : "Rejected. The requester is notified." });
  };
  const cur = steps.find((s) => s.st === "now");
  return (
    <>
      <PageHeader title="Purchase request 1042" desc="Laptops for the support team, 6 units, $9,240." meta={<StatusPill tone={cur ? "warning" : steps.some((s) => s.st === "no") ? "danger" : "success"}>{cur ? `Waiting for ${cur.who}` : steps.some((s) => s.st === "no") ? "Rejected" : "Approved"}</StatusPill>} />
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <Card><CardHeader title="Approval chain" />
          <ol className="flex flex-col gap-3">{steps.map((s) => (
            <li key={s.who} className="flex items-center gap-3"><span className={cn("grid size-8 place-items-center rounded-round text-caption", s.st === "done" && "bg-status-success-subtle text-status-success-fg", s.st === "now" && "bg-selected text-primary", s.st === "wait" && "bg-surface-sunken text-secondary", s.st === "no" && "bg-status-danger-subtle text-status-danger-fg")}>{s.st === "done" ? <Check className="size-4" aria-hidden /> : s.st === "no" ? <X className="size-4" aria-hidden /> : <Clock className="size-4" aria-hidden />}</span>
              <span className="text-body">{s.who}</span><span className="text-body-sm text-secondary">{{ done: "Approved", now: "Waiting", wait: "Not started", no: "Rejected" }[s.st]}</span></li>))}</ol></Card>
        <Card><CardHeader title="Your decision" />
          {cur ? <div className="flex flex-col gap-3"><Field id="ap-note" label="Note" optional>{(p) => <textarea {...p} value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="w-full rounded-control border border-control bg-input p-3 text-body" />}</Field>
            <div className="flex gap-2"><Button variant="primary" onClick={() => act(true)}>Approve</Button><Button onClick={() => act(false)}>Reject</Button></div></div>
            : <p className="text-body text-secondary">No decision is waiting on you.</p>}</Card>
      </div>
    </>);
}

/* ───────── Wishlist ───────── */
const items = [{ id: 1, n: "Canvas tote", p: 28, st: true }, { id: 2, n: "Steel bottle", p: 24, st: false }, { id: 3, n: "Desk lamp", p: 59, st: true }];
export function WishlistPage() {
  const toast = useToast(); const [list, setList] = useState(items);
  return (
    <>
      <PageHeader title="Wishlist" desc={`${list.length} saved items`} />
      {list.length === 0 ? <Card><p className="text-body text-secondary">Nothing saved yet. Tap the heart on any product.</p></Card> :
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((i) => (
          <li key={i.id}><Card><div className="grid h-28 place-items-center rounded-card bg-surface-sunken text-tertiary"><Package className="size-8" aria-hidden /></div>
            <h2 className="mt-3 text-body font-medium">{i.n}</h2><p className="tnum text-body text-secondary">${i.p}</p>
            <p className="mt-1 text-body-sm">{i.st ? <span className="text-status-success-fg">In stock</span> : <span className="text-status-warning-fg">Back soon</span>}</p>
            <div className="mt-3 flex gap-2"><Button variant="primary" size="sm" reason={i.st ? undefined : "Out of stock"} onClick={() => toast({ tone: "success", title: "Added to cart" })}>Add to cart</Button>
              <Button size="sm" variant="ghost" onClick={() => { setList(list.filter((x) => x.id !== i.id)); toast({ tone: "success", title: `${i.n} removed` }); }}><Heart className="fill-current" aria-hidden /><span className="sr-only">Remove {i.n} from wishlist</span></Button></div></Card></li>))}</ul>}
    </>);
}

/* ───────── Compare ───────── */
const plans = [{ n: "Basic", p: 9, r: [true, false, false] }, { n: "Plus", p: 19, r: [true, true, false] }, { n: "Pro", p: 39, r: [true, true, true] }];
const feats = ["Unlimited projects", "Priority support", "Single sign-on"];
export function ComparePage() {
  const [diff, setDiff] = useState(false);
  const rows = feats.map((f, i) => ({ f, i })).filter(({ i }) => !diff || new Set(plans.map((p) => p.r[i])).size > 1);
  return (
    <>
      <PageHeader title="Compare plans" desc="Side by side. Hide shared rows to see only the differences." />
      <div className="mb-4"><Checkbox id="cmp-diff" checked={diff} onChange={setDiff} label="Differences only" /></div>
      <Card flush><div className="overflow-x-auto" role="region" aria-label="Plan comparison" tabIndex={0}>
        <table className="w-full min-w-[32rem] text-body"><caption className="sr-only">Plan comparison</caption>
          <thead><tr className="border-b border-subtle"><th scope="col" className="p-3 text-start text-secondary">Feature</th>{plans.map((p) => <th key={p.n} scope="col" className="p-3 text-start"><span className="block font-semibold">{p.n}</span><span className="tnum text-body-sm font-normal text-secondary">${p.p}/mo</span></th>)}</tr></thead>
          <tbody>{rows.map(({ f, i }) => <tr key={f} className="border-b border-subtle last:border-0"><th scope="row" className="p-3 text-start font-normal">{f}</th>{plans.map((p) => <td key={p.n} className="p-3">{p.r[i] ? <><Check className="size-4 text-status-success-fg" aria-hidden /><span className="sr-only">Included</span></> : <span className="text-secondary"><span aria-hidden>–</span><span className="sr-only">Not included</span></span>}</td>)}</tr>)}</tbody></table></div></Card>
    </>);
}

/* ───────── Order confirmation ───────── */
export function OrderConfirmation() {
  return (
    <>
      <div className="mx-auto max-w-xl text-center"><span className="mx-auto grid size-14 place-items-center rounded-round bg-status-success-subtle text-status-success-fg"><CircleCheck className="size-8" aria-hidden /></span>
        <h1 className="mt-4 text-h2 font-semibold">Thank you. Your order is placed.</h1>
        <p className="mt-2 text-body text-secondary">Order <span className="tnum font-medium text-primary">#48213</span>. A receipt is on its way to you@company.com.</p></div>
      <Card className="mx-auto mt-6 max-w-xl"><CardHeader title="What happens next" />
        <ol className="flex flex-col gap-2 text-body"><li>1. We pack your items. Usually within a day.</li><li>2. You get a tracking link by email.</li><li>3. Delivery in 3 to 5 working days.</li></ol>
        <div className="mt-4 flex flex-wrap gap-2"><Button variant="primary">Track order</Button><Button>Keep shopping</Button></div></Card>
    </>);
}

/* ───────── Returns ───────── */
export function ReturnsPage() {
  const toast = useToast(); const [sel, setSel] = useState<number[]>([]); const [why, setWhy] = useState("");
  return (
    <>
      <PageHeader title="Start a return" desc="Order #48213. Returns are free within 30 days." />
      <Card><CardHeader title="Choose items" />
        <ul className="flex flex-col gap-2">{items.map((i) => <li key={i.id}><Checkbox id={`rt-${i.id}`} checked={sel.includes(i.id)} onChange={(c) => setSel(c ? [...sel, i.id] : sel.filter((x) => x !== i.id))} label={`${i.n} · $${i.p}`} /></li>)}</ul>
        <div className="mt-4 max-w-sm"><Field id="rt-why" label="Reason">{(p) => <Select {...p} value={why} onChange={(e) => setWhy(e.target.value)}><option value="">Choose a reason</option><option>Too small</option><option>Not as described</option><option>Changed my mind</option></Select>}</Field></div>
        <div className="mt-4"><Button variant="primary" reason={sel.length && why ? undefined : "Choose an item and a reason"} onClick={() => toast({ tone: "success", title: "Return label sent to your email" })}>Get return label</Button></div></Card>
    </>);
}

/* ───────── Case study ───────── */
export function CaseStudyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-body-sm font-medium text-action-accent">Case study</p>
      <h1 className="mt-2 text-h1 font-semibold">How a regional clinic cut check-in time by 60%</h1>
      <p className="mt-4 text-body-lg text-secondary">Greenfield Health moved paper forms to self check-in and gave front-desk staff their mornings back.</p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-3">{[["60%", "Faster check-in"], ["4 hrs", "Saved per day"], ["98%", "Forms complete"]].map(([n, l]) => <Card key={l}><dd className="tnum text-h2 font-semibold">{n}</dd><dt className="text-body-sm text-secondary">{l}</dt></Card>)}</dl>
      <h2 className="mt-10 text-h3 font-semibold">The problem</h2><p className="mt-2 text-body text-secondary">Patients filled the same form at every visit. Staff retyped it by hand.</p>
      <blockquote className="mt-8 border-s-4 border-action-primary ps-4 text-body-lg">"Mornings used to be a queue. Now they are calm."<footer className="mt-2 text-body-sm text-secondary">Office manager, Greenfield Health</footer></blockquote>
    </article>);
}

/* ───────── Public roadmap ───────── */
const road = { Now: ["Dark mode for mobile", "Faster search"], Next: ["Shared dashboards", "Scheduled exports"], Later: ["Offline mode", "Public API v2"] };
export function RoadmapPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12"><h1 className="text-h1 font-semibold">Roadmap</h1><p className="mt-2 text-body-lg text-secondary">What we are working on. Plans can change.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">{Object.entries(road).map(([k, v]) => <Card key={k}><h2 className="text-h4 font-semibold">{k}</h2><ul className="mt-3 flex flex-col gap-2">{v.map((x) => <li key={x} className="rounded-control border border-subtle p-3 text-body">{x}</li>)}</ul></Card>)}</div></div>);
}

/* ───────── Mobile onboarding carousel ───────── */
const slides = [["Scan in seconds", "Point the camera at any code."], ["Work offline", "Everything syncs when you are back online."], ["Stay in the loop", "Choose which alerts you want."]];
export function OnboardingCarousel() {
  const [i, setI] = useState(0); const last = i === slides.length - 1;
  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col items-center justify-between p-6 pb-safe text-center">
      <div className="flex w-full justify-between"><Logo className="h-6" /><Button variant="ghost" size="sm" onClick={() => setI(slides.length - 1)}>Skip</Button></div>
      <div role="group" aria-roledescription="carousel" aria-label="Welcome"><div className="mx-auto grid size-40 place-items-center rounded-round bg-selected text-h1 font-semibold" aria-hidden>{i + 1}</div>
        <h1 className="mt-8 text-h2 font-semibold" aria-live="polite">{slides[i][0]}</h1><p className="mt-2 text-body text-secondary">{slides[i][1]}</p></div>
      <div className="flex w-full flex-col items-center gap-4"><div className="flex gap-2" aria-hidden>{slides.map((_, j) => <span key={j} className={cn("size-2 rounded-round", j === i ? "bg-action-primary" : "bg-border-strong")} />)}</div>
        <p className="sr-only">Step {i + 1} of {slides.length}</p>
        <div className="flex w-full gap-2"><Button className="flex-1" onClick={() => setI(Math.max(0, i - 1))} reason={i === 0 ? "This is the first step" : undefined}><ChevronLeft aria-hidden />Back</Button>
          <Button variant="primary" className="flex-1" onClick={() => (last ? (location.hash = "#/dashboard") : setI(i + 1))}>{last ? "Get started" : "Next"}{!last && <ChevronRight aria-hidden />}</Button></div></div>
    </main>);
}
