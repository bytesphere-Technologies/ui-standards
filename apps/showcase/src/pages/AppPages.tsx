import { useMemo, useState } from "react";
import { Search, SearchX, CloudOff, FolderPlus, ArrowUp, ArrowDown, Ellipsis, RefreshCw, Plus, Download, Filter, Pencil, Paperclip, MessageSquare, Check, Archive, Mail, GripVertical, CalendarDays, Bell, AtSign, UserPlus, CircleAlert, Inbox as InboxIcon } from "lucide-react";
import { Button, Input, StatusPill, Avatar, AvatarGroup, Checkbox, Skeleton, StatePanel, FilterTag, Segmented, Menu, Banner, Card, CardHeader, cn, Tooltip, useToast, Tabs, Field, Textarea, Select, Switch, Progress, Modal, type Tone } from "@bytesphere/ui";
import { PageHeader, Stat, LineChart, BarList, Donut, Pagination, DescList, Timeline, Stepper, Dropzone, Combobox, TagInput, CopyButton } from "@bytesphere/ui";
import { Art, TraceLoader } from "@bytesphere/ui";
import { deals, people, months, revNow, revPrev, money, type Deal } from "../data";

const tone: Record<Deal["status"], [Tone, string]> = { active: ["success", "Active"], paused: ["neutral", "Paused"], past_due: ["danger", "Past due"], closed: ["info", "Closed"] };
const who = (id: string) => people.find((p) => p.id === id)!;

/* ───────── Dashboard ───────── */
export function Dashboard() {
  const [loading, setLoading] = useState(false); const [failed, setFailed] = useState(false); const [period, setPeriod] = useState("30 days");
  const reload = () => { setLoading(true); setTimeout(() => setLoading(false), 1500); };
  return (
    <>
      <PageHeader title="Overview" desc="How the workspace is doing right now." actions={<><Button onClick={reload}><RefreshCw />Refresh</Button><Button variant="primary"><Plus />New deal</Button></>} meta={<span>Updated 12:04</span>} />
      <div className="mb-5 flex flex-wrap items-center gap-3"><Segmented label="Period" items={["7 days", "30 days", "90 days"]} value={period} onChange={(v) => { setPeriod(v); reload(); }} /><span className="text-body-sm text-tertiary">vs. the previous {period}</span>
        <button onClick={() => setFailed(!failed)} className="ms-auto text-body-sm font-medium text-link hover:underline">{failed ? "Recover revenue widget" : "Simulate a widget failure"}</button></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat loading={loading} label="Net revenue" value="$46.2K" delta="4.2%" good period={`vs. ${period}`} data={revNow} />
        <Stat loading={loading} label="Active accounts" value="1,284" delta="1.1%" good period={`vs. ${period}`} data={[3, 4, 4, 5, 5, 6, 6, 7, 8, 8]} />
        <Stat loading={loading} label="Churn" value="2.1%" delta="0.3 pt" good period={`vs. ${period}`} data={[9, 8, 8, 7, 7, 6, 6, 5, 5, 4]} />
        <Stat loading={loading} label="Past-due invoices" value="37" delta="6" good={false} period={`vs. ${period}`} data={[2, 3, 3, 4, 5, 5, 6, 8, 9, 9]} />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardHeader title="Revenue" desc={`USD thousands · last ${period}`} action={<div className="flex gap-3 text-body-sm text-secondary"><span className="flex items-center gap-1.5"><i className="size-2 rounded-round bg-data-1" />This period</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-round bg-data-6" />Previous</span></div>} />
          <div className="mt-4">{loading ? <Skeleton className="h-60 w-full" shimmer /> : failed ? <StatePanel tone="error" art={<Art.cloud />} title="Couldn’t load revenue" description="Only this widget failed. The rest of the page is fine." action={<Button onClick={() => setFailed(false)}><RefreshCw />Try again</Button>} compact /> :
            <LineChart labels={months} yMax={60} yMin={20} unit="K" series={[{ name: "Previous", data: revPrev, color: "var(--color-data-6)", dashed: true }, { name: "This period", data: revNow, color: "var(--color-data-1)" }].reverse()} />}</div></Card>
        <Card><CardHeader title="Revenue by plan" desc={`USD thousands · ${period}`} /><div className="mt-5">{loading ? <div className="space-y-3">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-5 w-full" />)}</div> : <BarList max={20} fmt={(v) => `$${v}K`} items={[["Team", 18.4], ["Business", 15.2], ["Free", 7.1], ["Enterprise", 5.5]]} />}</div><div className="mt-6 border-t border-subtle pt-4"><p className="mb-3 text-body-sm font-medium text-secondary">Top accounts</p><ul className="flex flex-col gap-2.5">{[["Wingtip", "$103.9K", "u5"], ["Contoso", "$48.3K", "u2"], ["Proseware", "$18.6K", "u2"]].map(([n, v, u]) => <li key={n} className="flex items-center gap-2.5 text-body"><Avatar id={u} name={n} size={24} /><span className="flex-1">{n}</span><span className="tnum text-secondary">{v}</span></li>)}</ul></div></Card>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card flush className="lg:col-span-2"><div className="px-5 pt-4"><CardHeader title="Needs attention" desc="Past-due deals, oldest first" action={<a href="#/deals" className="text-body font-medium text-link hover:underline">View all</a>} /></div>
          <ul className="mt-3">{deals.filter((d) => d.status === "past_due").map((d) => (<li key={d.id} className="flex items-center gap-3 border-t border-subtle px-5 py-3"><Avatar id={who(d.owner).id} name={who(d.owner).name} /><div className="min-w-0 flex-1"><p className="truncate font-medium">{d.name}</p><p className="text-body-sm text-secondary">{who(d.owner).name} · due {d.updated}</p></div><span className="tnum hidden w-28 text-end sm:block">{money.format(d.amount)}</span><Button size="sm">Send reminder</Button></li>))}</ul></Card>
        <Card><CardHeader title="Pipeline" desc="Deals by stage" /><div className="mt-4"><Donut parts={[{ label: "Proposal", value: 14, color: "var(--color-data-1)" }, { label: "Negotiation", value: 9, color: "var(--color-data-2)" }, { label: "Closed won", value: 22, color: "var(--color-data-3)" }, { label: "Stalled", value: 5, color: "var(--color-data-6)" }]} /></div></Card>
      </div>
    </>
  );
}

/* ───────── Deals list ───────── */
type View = "ready" | "loading" | "empty" | "no-results" | "error" | "stale";
export function DealsList() {
  const toast = useToast();
  const [view, setView] = useState<View>("ready"); const [q, setQ] = useState(""); const [status, setStatus] = useState<string | null>(null);
  const [sort, setSort] = useState<{ k: "name" | "amount"; dir: 1 | -1 }>({ k: "name", dir: 1 }); const [sel, setSel] = useState<Set<string>>(new Set()); const [dense, setDense] = useState(false); const [page, setPage] = useState(1);
  const rows = useMemo(() => [...deals.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()) && (!status || d.status === status))].sort((a, b) => (sort.k === "name" ? a.name.localeCompare(b.name) : a.amount - b.amount) * sort.dir), [q, status, sort]);
  const shown = view === "empty" || view === "no-results" ? [] : rows; const allSel = shown.length > 0 && shown.every((d) => sel.has(d.id));
  const th = (k: "name" | "amount", label: string, right?: boolean) => (
    <th scope="col" aria-sort={sort.k === k ? (sort.dir === 1 ? "ascending" : "descending") : undefined} className={cn("px-3 font-medium", right ? "text-end" : "text-start")}>
      <button className={cn("ring-inset-focus inline-flex items-center gap-1 hover:text-primary", right && "flex-row-reverse")} onClick={() => setSort((s) => (s.k === k ? { k, dir: (s.dir * -1) as 1 | -1 } : { k, dir: 1 }))}>{label}{sort.k === k ? (sort.dir === 1 ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />) : <span className="size-3.5" />}</button></th>);
  const rowH = dense ? "h-8 text-body-sm" : "h-10";
  return (
    <>
      <PageHeader title="Deals" desc="Renewals and expansions across the workspace." actions={<><Button><Download />Export</Button><Button variant="primary"><Plus />New deal</Button></>} />
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-card border border-dashed border-control bg-surface-raised px-3 py-2"><span className="text-body-sm text-secondary">Preview state</span><Segmented size="sm" label="Table state" value={view} onChange={(v) => { setView(v as View); setSel(new Set()); }} items={["ready", "loading", "empty", "no-results", "error", "stale"]} /></div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="w-full sm:w-72"><Input aria-label="Search deals" placeholder="Search deals" start={<Search />} value={q} onChange={(e) => setQ(e.target.value)} /></div>
        {(["active", "past_due"] as const).map((s) => <Button key={s} size="md" variant={status === s ? "subtle" : "secondary"} aria-pressed={status === s} onClick={() => setStatus(status === s ? null : s)}>{tone[s][1]}</Button>)}
        <Button variant="ghost"><Filter />More filters</Button><div className="ms-auto"><Segmented size="sm" label="Density" value={dense ? "Compact" : "Comfortable"} onChange={(v) => setDense(v === "Compact")} items={["Comfortable", "Compact"]} /></div></div>
      {(status || q) && <div className="mb-3 flex flex-wrap items-center gap-2">{status && <FilterTag k="Status" v={tone[status as Deal["status"]][1]} onRemove={() => setStatus(null)} />}{q && <FilterTag k="Search" v={q} onRemove={() => setQ("")} />}<button className="text-body-sm font-medium text-link hover:underline" onClick={() => { setStatus(null); setQ(""); }}>Clear all</button><span className="tnum ms-auto text-body-sm text-secondary">{rows.length} results</span></div>}
      {view === "stale" && <div className="mb-3"><Banner tone="warning" callout action={<Button size="sm" onClick={() => setView("ready")}><RefreshCw />Refresh</Button>}>Showing data from 12 minutes ago. The last refresh failed.</Banner></div>}
      <div className="overflow-hidden rounded-card border border-subtle bg-surface-raised">
        {sel.size > 0 && <div className="m-fade flex h-11 items-center gap-3 border-b border-subtle bg-selected px-4"><span className="tnum text-body font-medium">{sel.size} selected</span><Button size="sm" onClick={() => { toast({ tone: "success", title: `${sel.size} deals archived`, action: { label: "Undo", onClick: () => {} } }); setSel(new Set()); }}><Archive />Archive</Button><Button size="sm" variant="ghost" onClick={() => setSel(new Set())}>Clear</Button></div>}
        {view === "error" ? <StatePanel tone="error" art={<Art.cloud />} title="Couldn’t load deals" description="Check your connection and try again. Reference 8f21-c9a3." action={<Button variant="primary" onClick={() => setView("loading")}>Try again</Button>} />
          : view === "empty" ? <StatePanel art={<Art.folder />} title="No deals yet" description="Add your first deal, or import a CSV from your CRM." action={<><Button variant="primary"><Plus />New deal</Button><Button>Import CSV</Button></>} />
          : view === "no-results" ? <StatePanel art={<Art.search />} title="No deals match your filters" description="Try a different spelling, or remove a filter." action={<Button onClick={() => setView("ready")}>Clear filters</Button>} />
          : (<div className="overflow-x-auto"><table className="w-full min-w-[46rem] border-collapse text-body"><caption className="sr-only">Deals</caption>
            <thead className="bg-surface-sunken text-body-sm text-secondary"><tr className={cn("border-b border-subtle", dense ? "h-8" : "h-10")}>
              <th scope="col" className="w-10 ps-4"><Checkbox id="all" label="" checked={allSel} indeterminate={sel.size > 0 && !allSel} onChange={(v) => setSel(v ? new Set(shown.map((d) => d.id)) : new Set())} /></th>
              {th("name", "Deal")}<th scope="col" className="px-3 text-start font-medium">Status</th><th scope="col" className="px-3 text-start font-medium">Owner</th>{th("amount", "Amount (USD)", true)}<th scope="col" className="px-3 text-start font-medium">Updated</th><th scope="col" className="w-12 pe-3"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody aria-busy={view === "loading"}>{view === "loading" ? Array.from({ length: 8 }, (_, i) => (
              <tr key={i} className={cn("border-b border-subtle last:border-0", rowH)}><td className="ps-4"><Skeleton className="size-4" /></td><td className="px-3"><Skeleton className={cn("h-3.5", i % 2 ? "w-40" : "w-56")} /></td><td className="px-3"><Skeleton className="h-[22px] w-16" /></td><td className="px-3"><div className="flex items-center gap-2"><Skeleton className="size-6 rounded-round" /><Skeleton className="h-3.5 w-24" /></div></td><td className="px-3"><Skeleton className="ms-auto h-3.5 w-20" /></td><td className="px-3"><Skeleton className="h-3.5 w-16" /></td><td /></tr>))
              : shown.map((d) => { const o = who(d.owner); const [t, l] = tone[d.status]; const on = sel.has(d.id); return (
                <tr key={d.id} aria-selected={on || undefined} className={cn("border-b border-subtle last:border-0 hover:bg-action-ghost-hover aria-selected:bg-selected", rowH)}>
                  <td className="ps-4"><Checkbox id={d.id} label="" checked={on} onChange={(v) => setSel((s) => { const n = new Set(s); v ? n.add(d.id) : n.delete(d.id); return n; })} /></td>
                  <td className="max-w-96 px-3"><div className="flex items-baseline gap-2"><a href="#/deals/D-1033" className="truncate font-medium text-primary hover:text-link" title={d.name}>{d.name}</a><span className="shrink-0 font-mono text-caption text-tertiary">{d.id}</span></div></td>
                  <td className="px-3"><StatusPill tone={t}>{l}</StatusPill></td><td className="px-3"><span className="flex items-center gap-2"><Avatar id={o.id} name={o.name} size={24} /><span className="truncate">{o.name}</span></span></td>
                  <td className="tnum px-3 text-end">{d.amount === 0 ? <span className="text-tertiary">—</span> : money.format(d.amount)}</td><td className="px-3 text-secondary">{d.updated}</td>
                  <td className="pe-3"><Menu label={`Actions for ${d.name}`} trigger={<span className="grid size-8 place-items-center rounded-control text-tertiary hover:bg-action-ghost-active hover:text-primary"><Ellipsis className="size-4" aria-hidden /></span>} items={[{ label: "Open", icon: Pencil }, { label: "Duplicate", shortcut: "⌘D" }, "sep", { label: "Delete…", danger: true }]} /></td></tr>); })}</tbody></table></div>)}
        {(view === "ready" || view === "stale" || view === "loading") && <Pagination page={page} pages={26} total={1284} size={50} onPage={setPage} onSize={() => {}} />}
      </div>
    </>
  );
}

/* ───────── Deal detail ───────── */
export function DealDetail() {
  const [tab, setTab] = useState("overview"); const toast = useToast(); const [edit, setEdit] = useState(false);
  return (
    <>
      <PageHeader crumbs={[{ label: "Deals", href: "#/deals" }, { label: "Wingtip expansion" }]} title="Wingtip expansion" desc="Seat expansion across EMEA offices, phase 2 of 3."
        meta={<><StatusPill tone="info">Negotiation</StatusPill><span className="flex items-center gap-1.5"><Avatar id="u5" name="Priya Raghavan" size={20} />Priya Raghavan</span><span>Updated 3 days ago</span></>}
        actions={<><Button onClick={() => toast({ tone: "info", title: "Link copied" })}>Share</Button><Button variant="primary" onClick={() => setEdit(true)}><Pencil />Edit</Button><Menu label="More actions" trigger={<span className="grid size-(--control-md) place-items-center rounded-control border border-action-secondary-border hover:bg-action-secondary-hover"><Ellipsis className="size-4" /></span>} items={[{ label: "Duplicate" }, { label: "Archive", icon: Archive }, "sep", { label: "Delete…", danger: true }]} /></>} />
      <Tabs label="Deal sections" value={tab} onChange={setTab} items={[{ id: "overview", label: "Overview" }, { id: "activity", label: "Activity", count: 12 }, { id: "files", label: "Files", count: 4 }, { id: "contacts", label: "Contacts" }]} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="flex min-w-0 flex-col gap-4">
          {tab === "overview" && <><Card><CardHeader title="Summary" /><p className="mt-2 max-w-[62ch] text-body text-secondary">Wingtip is adding 25 seats in Berlin and Lisbon. Legal asked for a data-processing addendum; security review finished on 6 March. Pricing is agreed, signature is pending.</p></Card>
            <Card><CardHeader title="Milestones" desc="3 of 5 complete" /><div className="mt-4 flex flex-col gap-3">{[["Security review", true], ["Pricing agreed", true], ["DPA redlines", true], ["Signature", false], ["Provisioning", false]].map(([n, d]) => <div key={n as string} className="flex items-center gap-3 text-body"><span className={cn("grid size-5 place-items-center rounded-round", d ? "bg-action-primary text-action-primary-fg" : "border border-control")}>{d ? <Check className="size-3" strokeWidth={3} /> : null}</span><span className={d ? "text-secondary" : "font-medium"}>{n as string}</span></div>)}</div><div className="mt-4"><Progress label="Milestones" value={3} max={5} valueText="3 of 5" /></div></Card></>}
          {tab === "activity" && <Card><CardHeader title="Activity" /><div className="mt-5"><Timeline items={[{ who: "Priya", what: "moved the deal to Negotiation", when: "Today, 09:14" }, { who: "Kenji", what: "attached Wingtip_MSA_v3.pdf", when: "Yesterday, 16:40", icon: <Paperclip /> }, { who: "Amara", what: "commented “DPA redlines look fine to me”", when: "Yesterday, 11:02", icon: <MessageSquare /> }, { who: "System", what: "sent a renewal reminder", when: "6 Mar, 08:00", icon: <Mail /> }]} /></div></Card>}
          {tab === "files" && <Card><CardHeader title="Files" desc="4 files · 18.2 MB" /><div className="mt-4"><Dropzone /></div></Card>}
          {tab === "contacts" && <Card flush>{people.slice(0, 3).map((p) => <div key={p.id} className="flex items-center gap-3 border-b border-subtle px-5 py-3 last:border-0"><Avatar id={p.id} name={p.name} /><div className="flex-1"><p className="font-medium">{p.name}</p><p className="text-body-sm text-secondary">{p.email}</p></div><Button size="sm" variant="ghost">Message</Button></div>)}</Card>}
        </div>
        <aside className="flex flex-col gap-4"><Card><CardHeader title="Details" /><div className="mt-4"><DescList items={[["Amount", <span className="tnum">$103,920.00</span>], ["Close date", "28 Mar 2026"], ["Region", "EMEA"], ["Plan", "Business"], ["Deal ID", <span className="inline-flex items-center gap-2 font-mono text-[13px]">D-1033<CopyButton value="D-1033" label="Copy" /></span>]]} /></div></Card>
          <Card><CardHeader title="Team" /><div className="mt-3 flex items-center justify-between"><AvatarGroup people={people} max={4} /><Button size="sm" variant="ghost"><UserPlus />Add</Button></div></Card></aside>
      </div>
      <Modal open={edit} onClose={() => setEdit(false)} title="Edit deal" footer={<><Button onClick={() => setEdit(false)}>Cancel</Button><Button variant="primary" onClick={() => { setEdit(false); toast({ tone: "success", title: "Deal updated" }); }}>Save changes</Button></>}><div className="flex flex-col gap-4"><Field id="e1" label="Deal name">{(p) => <Input {...p} defaultValue="Wingtip expansion" />}</Field><Field id="e2" label="Stage">{(p) => <Select {...p}><option>Negotiation</option><option>Proposal</option></Select>}</Field></div></Modal>
    </>
  );
}

/* ───────── Create deal (wizard) ───────── */
export function CreateDeal() {
  const toast = useToast(); const [step, setStep] = useState(0); const [busy, setBusy] = useState(false); const [name, setName] = useState(""); const [touched, setTouched] = useState(false); const [owner, setOwner] = useState("Priya Raghavan"); const [emails, setEmails] = useState<string[]>([]);
  const err = touched && !name.trim() ? "Enter a deal name, like “Northwind renewal”." : undefined;
  const next = () => { if (step === 0 && !name.trim()) { setTouched(true); return; } if (step === 2) { setBusy(true); setTimeout(() => { setBusy(false); toast({ tone: "success", title: "Deal created", description: name }); location.hash = "/deals/D-1033"; }, 1400); return; } setStep(step + 1); };
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader back={{ label: "Deals", href: "#/deals" }} title="New deal" desc="Three short steps. You can edit everything later." />
      <div className="mb-8"><Stepper steps={["Basics", "Team", "Review"]} current={step} /></div>
      <Card>
        {step === 0 && <div className="flex flex-col gap-5 m-fade"><Field id="n" label="Deal name" error={err} hint="Use the customer and what the deal is for.">{(p) => <Input {...p} value={name} onBlur={() => setTouched(true)} onChange={(e) => setName(e.target.value)} placeholder="Northwind renewal" autoComplete="off" />}</Field>
          <div className="grid gap-5 sm:grid-cols-2"><Field id="amt" label="Amount (USD)">{(p) => <Input {...p} className="tnum" inputMode="decimal" placeholder="0.00" />}</Field><Field id="cd" label="Expected close">{(p) => <Input {...p} type="date" />}</Field></div>
          <Field id="note" label="Note" optional>{(p) => <Textarea {...p} placeholder="Context for whoever picks this up next" />}</Field></div>}
        {step === 1 && <div className="flex flex-col gap-5 m-fade"><Field id="own" label="Owner">{(p) => <Combobox id={p.id} options={people.map((x) => x.name)} value={owner} onChange={setOwner} />}</Field><Field id="inv" label="Notify teammates" hint="They get an email with a link. Press Enter after each address.">{(p) => <TagInput id={p.id} label="Notify teammates" value={emails} onChange={setEmails} />}</Field><Switch id="priv" label="Private deal" hint="Only people you notify can see it." checked={false} onChange={() => {}} /></div>}
        {step === 2 && <div className="m-fade"><h2 className="text-h4 font-semibold">Review</h2><div className="mt-4"><DescList items={[["Deal", name || "—"], ["Owner", owner], ["Notify", emails.length ? emails.join(", ") : "Nobody"], ["Visibility", "Workspace"]]} /></div></div>}
        <div className="mt-8 flex items-center justify-between border-t border-subtle pt-4"><span className="text-body-sm text-tertiary">Draft saved 12:04</span><div className="flex gap-2"><Button onClick={() => (step ? setStep(step - 1) : (location.hash = "/deals"))}>{step ? "Back" : "Cancel"}</Button><Button variant="primary" loading={busy} onClick={next}>{step === 2 ? (busy ? "Creating" : "Create deal") : "Continue"}</Button></div></div>
      </Card>
    </div>
  );
}

/* ───────── Board ───────── */
const cols = [{ id: "proposal", name: "Proposal", tone: "info" as Tone }, { id: "negotiation", name: "Negotiation", tone: "warning" as Tone }, { id: "won", name: "Closed won", tone: "success" as Tone }];
export function Board() {
  const [items, setItems] = useState(deals.slice(0, 6).map((d, i) => ({ ...d, col: cols[i % 3].id }))); const toast = useToast();
  const move = (id: string, dir: 1 | -1) => setItems((l) => l.map((d) => { if (d.id !== id) return d; const i = cols.findIndex((c) => c.id === d.col) + dir; if (i < 0 || i >= cols.length) return d; toast({ tone: "info", title: `Moved to ${cols[i].name}` }); return { ...d, col: cols[i].id }; }));
  return (
    <>
      <PageHeader title="Pipeline" desc="Move deals between stages. Drag, or use the arrow buttons." actions={<Button variant="primary"><Plus />New deal</Button>} />
      <div className="grid gap-4 lg:grid-cols-3">{cols.map((c) => { const list = items.filter((d) => d.col === c.id); return (
        <section key={c.id} aria-label={c.name} className="rounded-card bg-surface-sunken p-2 ring-1 ring-inset ring-[var(--color-subtle)]"><h2 className="flex items-center gap-2 px-2 py-1.5 text-body font-medium">{c.name}<span className="tnum text-body-sm text-tertiary">{list.length}</span><span className="tnum ms-auto text-body-sm text-secondary">{money.format(list.reduce((a, d) => a + d.amount, 0))}</span></h2>
          <ul className="m-stagger flex min-h-24 flex-col gap-2">{list.map((d, i) => (<li key={d.id} style={{ "--i": i } as React.CSSProperties}><Card className="group p-3"><div className="flex items-start gap-2"><GripVertical className="mt-0.5 size-4 shrink-0 text-tertiary" aria-hidden /><div className="min-w-0 flex-1"><p className="truncate text-body font-medium">{d.name}</p><p className="tnum text-body-sm text-secondary">{money.format(d.amount)}</p></div></div>
            <div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2"><Avatar id={who(d.owner).id} name={who(d.owner).name} size={24} /><span className="flex items-center gap-1 text-caption text-tertiary"><CalendarDays className="size-3.5" />{d.updated}</span></div><div className="flex"><Tooltip text="Move left"><Button size="icon-sm" variant="ghost" aria-label={`Move ${d.name} to previous stage`} onClick={() => move(d.id, -1)}><ArrowUp className="-rotate-90" /></Button></Tooltip><Tooltip text="Move right"><Button size="icon-sm" variant="ghost" aria-label={`Move ${d.name} to next stage`} onClick={() => move(d.id, 1)}><ArrowUp className="rotate-90" /></Button></Tooltip></div></div></Card></li>))}
            {list.length === 0 && <li className="grid h-24 place-items-center text-body-sm text-tertiary">No deals in this stage</li>}</ul></section>); })}</div>
    </>
  );
}

/* ───────── Inbox ───────── */
const msgs = [
  { id: 1, who: "u2", icon: AtSign, title: "Kenji mentioned you in Wingtip expansion", body: "“Can you review the DPA redlines before Thursday? Legal is waiting on us.”", when: "2 min", unread: true, tab: "mentions" },
  { id: 2, who: "u1", icon: CircleAlert, title: "Invoice INV-1041 is 12 days past due", body: "Contoso has not paid $48,250.50. A reminder was sent on 4 Mar.", when: "1 h", unread: true, tab: "alerts" },
  { id: 3, who: "u3", icon: UserPlus, title: "Amara assigned Fabrikam onboarding to you", body: "Phase 2 of 3. Kick-off is on 21 Mar.", when: "Yesterday", unread: true, tab: "assigned" },
  { id: 4, who: "u4", icon: Bell, title: "Weekly summary is ready", body: "4 deals closed, $38K new revenue, churn down 0.3 pt.", when: "Mon", unread: false, tab: "all" },
  { id: 5, who: "u5", icon: AtSign, title: "Priya replied in Litware seats +25", body: "“Approved on our side. Sending the PO today.”", when: "Mon", unread: false, tab: "mentions" },
];
export function InboxPage() {
  const [tab, setTab] = useState("all"); const [sel, setSel] = useState(1); const [read, setRead] = useState<Set<number>>(new Set()); const list = msgs.filter((m) => tab === "all" || m.tab === tab); const cur = msgs.find((m) => m.id === sel);
  return (
    <>
      <PageHeader title="Inbox" desc="Mentions, assignments, and alerts." actions={<><Button variant="ghost" onClick={() => setRead(new Set(msgs.map((m) => m.id)))}>Mark all as read</Button><Button>Preferences</Button></>} />
      <div className="grid overflow-hidden rounded-card border border-subtle bg-surface-raised lg:grid-cols-[22rem_1fr]">
        <div className="border-b border-subtle lg:border-b-0 lg:border-e"><div className="px-4 pt-1"><Tabs label="Inbox filters" value={tab} onChange={setTab} items={[{ id: "all", label: "All" }, { id: "mentions", label: "Mentions" }, { id: "assigned", label: "Assigned" }, { id: "alerts", label: "Alerts" }]} /></div>
          {list.length === 0 ? <StatePanel compact art={<Art.inbox />} title="You’re all caught up" description="New notifications show up here." /> : <ul>{list.map((m) => { const u = m.unread && !read.has(m.id); return (
            <li key={m.id}><button onClick={() => { setSel(m.id); setRead((r) => new Set(r).add(m.id)); }} aria-current={sel === m.id} className={cn("ring-inset-focus flex w-full gap-3 border-b border-subtle px-4 py-3 text-start hover:bg-action-ghost-hover", sel === m.id && "bg-selected hover:bg-selected")}>
              <span className="mt-1.5 size-2 shrink-0 rounded-round" style={{ background: u ? "var(--color-action-primary)" : "transparent" }} aria-hidden /><div className="min-w-0"><p className={cn("text-body", u ? "font-semibold" : "font-medium text-secondary")}>{m.title}{u && <span className="sr-only"> (unread)</span>}</p><p className="mt-0.5 line-clamp-2 text-body-sm text-secondary">{m.body}</p><p className="mt-1 text-caption text-secondary">{m.when}</p></div></button></li>); })}</ul>}</div>
        <div className="hidden min-h-96 p-6 lg:block">{cur ? <article className="m-fade max-w-xl"><div className="flex items-center gap-3"><Avatar id={who(cur.who).id} name={who(cur.who).name} size={40} /><div><p className="font-medium">{who(cur.who).name}</p><p className="text-body-sm text-secondary">{cur.when} ago</p></div></div><h2 className="mt-5 text-h4 font-semibold">{cur.title}</h2><blockquote className="mt-3 rounded-control bg-surface-sunken p-4 text-body text-secondary">{cur.body}</blockquote><div className="mt-5 flex gap-2"><Button variant="primary" onClick={() => (location.hash = "/deals/D-1033")}>Open deal</Button><Button>Mark as unread</Button><Button variant="ghost"><Archive />Archive</Button></div></article> : <StatePanel art={<Art.inbox />} title="Nothing selected" />}</div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-caption text-tertiary"><InboxIcon className="size-3.5" />Keyboard: J / K to move, E to archive, U to mark unread.</p>
    </>
  );
}

/* ───────── Search results ───────── */
export function SearchResults() {
  const [q, setQ] = useState("wing"); const [loading, setLoading] = useState(false);
  const res = [...deals.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())).map((d) => ({ t: d.name, k: "Deal", s: `${d.id} · ${who(d.owner).name}` })), ...people.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).map((p) => ({ t: p.name, k: "Person", s: p.email }))];
  const hl = (s: string) => { const i = s.toLowerCase().indexOf(q.toLowerCase()); return q && i >= 0 ? <>{s.slice(0, i)}<b className="font-semibold text-primary underline decoration-[var(--color-strong)] underline-offset-2">{s.slice(i, i + q.length)}</b>{s.slice(i + q.length)}</> : s; };
  return (
    <>
      <PageHeader title="Search" />
      <div className="mb-6 flex gap-2"><div className="max-w-xl flex-1"><Input aria-label="Search" start={<Search />} end={loading ? <TraceLoader size={16} /> : undefined} value={q} onChange={(e) => { setQ(e.target.value); setLoading(true); setTimeout(() => setLoading(false), 400); }} /></div></div>
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <aside className="flex flex-col gap-4"><p className="text-body-sm font-medium">Type</p>{["Deals", "People", "Files"].map((t, i) => <Checkbox key={t} id={`ty${i}`} label={t} checked={i < 2} onChange={() => {}} />)}</aside>
        <div className={cn("transition-opacity duration-150", loading && "opacity-60")}>{res.length === 0 ? <StatePanel art={<Art.search />} title={`No results for “${q}”`} description="Check the spelling, or search fewer words." action={<Button onClick={() => setQ("")}>Clear search</Button>} /> : <><p className="mb-3 text-body-sm text-secondary" aria-live="polite">{res.length} results</p><ul className="divide-y divide-[var(--color-subtle)] rounded-card border border-subtle bg-surface-raised">{res.map((r) => <li key={r.t}><a href="#/deals/D-1033" className="ring-inset-focus flex items-center gap-3 px-4 py-3 hover:bg-action-ghost-hover"><div className="min-w-0 flex-1"><p className="truncate text-body text-secondary">{hl(r.t)}</p><p className="text-body-sm text-tertiary">{r.s}</p></div><StatusPill size="sm">{r.k}</StatusPill></a></li>)}</ul></>}</div>
      </div>
    </>
  );
}
