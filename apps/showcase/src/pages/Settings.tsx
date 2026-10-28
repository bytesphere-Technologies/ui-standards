import { useState } from "react";
import { Camera, Download, Smartphone, Laptop, KeyRound, Trash2, Plus, Plug, ShieldCheck, Github, Slack, Mail, Link2, Search, Eye, EyeOff, Globe } from "lucide-react";
import { Button, Field, Input, Select, Switch, Card, CardHeader, StatusPill, Avatar, Progress, Banner, Checkbox, Modal, useToast, Segmented, cn, Tabs, Radio, type Tone } from "@bytesphere/ui";
import { PageHeader, SettingsRow, Hint, CopyButton, Pagination, TagInput } from "@bytesphere/ui";
import { people, invoices, money } from "../data";
import { Art } from "@bytesphere/ui";
import { StatePanel } from "@bytesphere/ui";

const nav = [
  { g: "Account", items: [["profile", "Profile"], ["security", "Security"], ["notifications", "Notifications"], ["appearance", "Appearance"]] },
  { g: "Workspace", items: [["workspace", "General"], ["members", "Members"], ["billing", "Billing"]] },
  { g: "Developers", items: [["integrations", "Integrations"], ["api-keys", "API keys"], ["audit-log", "Audit log"]] },
];
export function SettingsShell({ current, children }: { current: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[13.5rem_1fr]">
      <nav aria-label="Settings" className="lg:sticky lg:top-20 lg:self-start">
        <div className="flex gap-6 overflow-x-auto lg:flex-col lg:gap-5">{nav.map((g) => (<div key={g.g} className="flex shrink-0 flex-col gap-0.5"><p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-tertiary">{g.g}</p>
          {g.items.map(([id, l]) => <a key={id} href={`#/settings/${id}`} aria-current={id === current ? "page" : undefined} className={cn("ring-inset-focus flex h-8 items-center rounded-control px-2 text-body font-medium hover:bg-action-ghost-hover", id === current ? "bg-selected font-semibold text-primary" : "text-secondary")}>{l}</a>)}</div>))}</div>
      </nav>
      <div className="min-w-0 max-w-3xl">{children}</div>
    </div>);
}
const Save = ({ onSave, label = "Save changes" }: { onSave: () => void; label?: string }) => <div className="flex justify-end gap-2 border-t border-subtle pt-4"><Button variant="ghost">Cancel</Button><Button variant="primary" onClick={onSave}>{label}</Button></div>;

export function Profile() {
  const toast = useToast(); const [name, setName] = useState("Mia Moreno");
  return (<>
    <PageHeader title="Profile" desc="How you appear to teammates." />
    <Card className="!px-6 !py-0">
      <SettingsRow title="Photo" desc="Shown next to your comments and in assignments."><div className="flex items-center gap-4"><Avatar id="u1" name={name} size={64} /><div className="flex gap-2"><Button><Camera />Upload</Button><Button variant="ghost">Remove</Button></div></div><Hint>PNG or JPG, at least 256 × 256. Without a photo we show your initials.</Hint></SettingsRow>
      <SettingsRow title="Name"><div className="grid gap-4 sm:grid-cols-2"><Field id="p1" label="Full name">{(p) => <Input {...p} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />}</Field><Field id="p2" label="Job title" optional>{(p) => <Input {...p} defaultValue="Finance operations" />}</Field></div></SettingsRow>
      <SettingsRow title="Email" desc="Used to sign in and for receipts."><Field id="p3" label="Work email" hint="Managed by your organization’s SSO.">{(p) => <Input {...p} readOnly defaultValue="mia@northwind.example" />}</Field></SettingsRow>
      <SettingsRow title="Language and region"><div className="grid gap-4 sm:grid-cols-2"><Field id="p4" label="Language">{(p) => <Select {...p}><option>English (US)</option><option>Deutsch</option><option>Kiswahili</option><option>العربية</option></Select>}</Field><Field id="p5" label="Time zone">{(p) => <Select {...p}><option>(UTC+01:00) Berlin</option><option>(UTC+03:00) Nairobi</option><option>(UTC−05:00) New York</option></Select>}</Field></div></SettingsRow>
      <div className="py-4"><Save onSave={() => toast({ tone: "success", title: "Profile updated" })} /></div>
    </Card>
  </>);
}

export function Security() {
  const toast = useToast(); const [pw, setPw] = useState(""); const [show, setShow] = useState(false); const [tf, setTf] = useState(true); const [revoke, setRevoke] = useState(false);
  const len = pw.length >= 12;
  return (<>
    <PageHeader title="Security" desc="Password, two-step verification, and where you’re signed in." />
    <Card className="!px-6 !py-0">
      <SettingsRow title="Password" desc="Last changed 4 months ago."><div className="flex max-w-sm flex-col gap-4"><Field id="cp" label="Current password">{(p) => <Input {...p} type="password" autoComplete="current-password" />}</Field>
        <Field id="np" label="New password" hint={len ? undefined : "At least 12 characters."}>{(p) => <Input {...p} type={show ? "text" : "password"} autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} end={<button type="button" aria-pressed={show} aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)} className="grid size-7 place-items-center rounded-control hover:bg-action-ghost-hover">{show ? <EyeOff /> : <Eye />}</button>} />}</Field>
        <div aria-hidden className="flex gap-1">{[0, 1, 2, 3].map((i) => <span key={i} className={cn("h-1 flex-1 rounded-round", pw.length > i * 4 + 2 ? (pw.length >= 12 ? "bg-status-success-solid" : "bg-status-warning-solid") : "bg-surface-sunken")} />)}</div>
        <div><Button variant="primary" onClick={() => toast({ tone: "success", title: "Password updated", description: "Other sessions were signed out." })}>Update password</Button></div></div></SettingsRow>
      <SettingsRow title="Two-step verification" desc="Ask for a code when you sign in on a new device."><Switch id="tf" label="Authenticator app" hint={tf ? "Enabled on 12 Jan 2026" : "Not enabled"} checked={tf} onChange={setTf} />{tf && <div className="m-rise mt-4 flex flex-wrap items-center gap-3 rounded-control bg-surface-sunken p-3 text-body-sm"><ShieldCheck className="size-4 text-status-success-fg" />8 recovery codes remain.<Button size="sm">View codes</Button><Button size="sm" variant="ghost"><Download />Download</Button></div>}</SettingsRow>
      <SettingsRow title="Passkeys" desc="Sign in with Face ID, Touch ID or a security key."><div className="flex items-center justify-between rounded-control border border-subtle px-3 py-2.5"><span className="flex items-center gap-2 text-body"><KeyRound className="size-4 text-tertiary" />MacBook · added 2 Feb</span><Button size="sm" variant="ghost">Remove</Button></div><Button className="mt-3"><Plus />Add a passkey</Button></SettingsRow>
      <SettingsRow title="Active sessions" desc="Sign out of anything you don’t recognize." last>
        <ul className="divide-y divide-[var(--color-subtle)] rounded-card border border-subtle">{[["Laptop", "Chrome on macOS · Berlin", "This device", true], ["Smartphone", "Safari on iOS · Berlin", "2 hours ago", false], ["Laptop", "Firefox on Windows · Lagos", "11 days ago", false]].map(([ic, a, w, c], i) => <li key={i} className="flex items-center gap-3 px-3 py-2.5">{ic === "Laptop" ? <Laptop className="size-4 text-tertiary" /> : <Smartphone className="size-4 text-tertiary" />}<div className="min-w-0 flex-1"><p className="text-body">{a as string}</p><p className="text-body-sm text-secondary">{w as string}</p></div>{c ? <StatusPill tone="success">Current</StatusPill> : <Button size="sm" variant="ghost" onClick={() => toast({ tone: "info", title: "Session ended" })}>Sign out</Button>}</li>)}</ul>
        <Button className="mt-3" onClick={() => setRevoke(true)}>Sign out everywhere else</Button></SettingsRow>
    </Card>
    <Card className="mt-6 border-status-danger-border"><CardHeader title="Delete account" desc="Permanently removes your profile and personal data. Content you created stays with the workspace." action={<Button variant="danger"><Trash2 />Delete account…</Button>} /></Card>
    <Modal open={revoke} onClose={() => setRevoke(false)} width="sm" danger title="Sign out of 2 other sessions?" description="You’ll stay signed in here. The others need to sign in again." footer={<><Button onClick={() => setRevoke(false)}>Cancel</Button><Button variant="primary" onClick={() => { setRevoke(false); toast({ tone: "success", title: "2 sessions ended" }); }}>Sign out 2 sessions</Button></>} />
  </>);
}

export function Notifications() {
  const rows = [["Assigned to me", true, true, false], ["Mentions", true, true, true], ["Comments on my deals", false, true, false], ["Weekly summary", true, false, false], ["Billing and security", true, true, false]] as const;
  const [s, setS] = useState(() => rows.map((r) => [r[1], r[2], r[3]]));
  return (<>
    <PageHeader title="Notifications" desc="Choose how you hear about activity. Changes save automatically." />
    <Card flush><table className="w-full text-body"><thead><tr className="h-10 border-b border-subtle text-body-sm text-secondary"><th scope="col" className="ps-5 text-start font-medium">Event</th>{["Email", "In app", "Slack"].map((c) => <th scope="col" key={c} className="w-24 text-center font-medium">{c}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={r[0]} className="h-12 border-b border-subtle last:border-0"><th scope="row" className="ps-5 text-start font-normal">{r[0]}{i === 4 && <span className="block text-body-sm text-tertiary">Required for account safety</span>}</th>{[0, 1, 2].map((c) => <td key={c} className="text-center"><button role="switch" aria-checked={s[i][c]} aria-label={`${["Email", "In app", "Slack"][c]}: ${r[0]}`} disabled={i === 4 && c < 2} onClick={() => setS((p) => p.map((row, ri) => ri === i ? row.map((v, ci) => ci === c ? !v : v) : row))} className={cn("relative h-5 w-9 rounded-round transition-colors duration-150 disabled:opacity-50", s[i][c] ? "bg-action-primary" : "bg-control")}><span className={cn("absolute top-0.5 size-4 rounded-round bg-white shadow-[0_1px_2px_rgb(0_0_0/.25)] transition-all duration-150", s[i][c] ? "start-[1.125rem]" : "start-0.5")} /></button></td>)}</tr>)}</tbody></table></Card>
    <Card className="mt-4"><Switch id="dnd" label="Pause notifications" hint="Mute everything except security alerts until tomorrow, 08:00." checked={false} onChange={() => {}} /></Card>
  </>);
}

export function Appearance() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme === "dark" ? "dark" : "light"); const [dens, setDens] = useState(document.documentElement.dataset.density ?? "comfortable");
  const set = (t: string) => { setTheme(t); document.documentElement.dataset.theme = t === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : t; try { localStorage.setItem("ui.theme", document.documentElement.dataset.theme!); localStorage.setItem("ui.themePref", t); } catch { /* */ } };
  return (<>
    <PageHeader title="Appearance" desc="Applies to this browser. Changes are instant." />
    <Card className="!px-6 !py-0">
      <SettingsRow title="Theme"><div className="grid max-w-md grid-cols-3 gap-3">{[["light", "Light"], ["dark", "Dark"], ["system", "System"]].map(([id, l]) => <button key={id} aria-pressed={theme === id} onClick={() => set(id)} className={cn("rounded-card border p-2 text-start", theme === id ? "border-action-primary ring-1 ring-action-primary" : "border-subtle hover:border-strong")}><span className={cn("block h-14 rounded-control border border-subtle", id === "dark" ? "bg-[#0A121C]" : id === "light" ? "bg-white" : "bg-[linear-gradient(90deg,#fff_50%,#0A121C_50%)]")} /><span className="mt-2 block text-body-sm font-medium">{l}</span></button>)}</div></SettingsRow>
      <SettingsRow title="Density" desc="Compact fits more rows. Touch devices stay comfortable." last><div className="flex flex-col gap-3"><Radio name="dn" value="comfortable" label="Comfortable" hint="40px rows, 36px controls" checked={dens === "comfortable"} onChange={(v) => { setDens(v); document.documentElement.dataset.density = v; }} /><Radio name="dn" value="compact" label="Compact" hint="32px rows, 32px controls" checked={dens === "compact"} onChange={(v) => { setDens(v); document.documentElement.dataset.density = v; }} /></div></SettingsRow>
    </Card></>);
}

export function WorkspaceGeneral() {
  const toast = useToast(); const [del, setDel] = useState(false); const [confirm, setConfirm] = useState("");
  return (<>
    <PageHeader title="Workspace" desc="Settings for Northwind Traders." />
    <Card className="!px-6 !py-0">
      <SettingsRow title="Name and URL"><div className="grid gap-4 sm:grid-cols-2"><Field id="w1" label="Workspace name">{(p) => <Input {...p} defaultValue="Northwind Traders" />}</Field><Field id="w2" label="URL" hint="Letters, numbers and hyphens.">{(p) => <Input {...p} defaultValue="northwind" start={<Globe />} className="ps-9" />}</Field></div></SettingsRow>
      <SettingsRow title="Logo"><div className="flex items-center gap-4"><Avatar id="org1" name="Northwind Traders" size={64} square /><Button><Camera />Change logo</Button></div></SettingsRow>
      <SettingsRow title="Domain sign-up" desc="Anyone with a matching email can join."><div className="flex flex-col gap-3"><Switch id="dom" label="Allow @northwind.example" hint="New people join as Members." checked onChange={() => {}} /></div></SettingsRow>
      <div className="py-4"><Save onSave={() => toast({ tone: "success", title: "Workspace updated" })} /></div>
    </Card>
    <Card className="mt-6 border-status-danger-border"><CardHeader title="Delete workspace" desc="Removes all deals, files and members after a 14-day grace period. Export your data first." action={<Button variant="danger" onClick={() => setDel(true)}>Delete workspace…</Button>} /></Card>
    <Modal open={del} onClose={() => setDel(false)} danger width="sm" title="Delete Northwind Traders?" description="This removes 1,284 deals, 312 files and 18 members. You can restore it within 14 days."
      footer={<><Button onClick={() => setDel(false)}>Cancel</Button><Button variant="danger" reason={confirm !== "northwind" ? "Type the workspace URL to confirm" : undefined} onClick={() => { setDel(false); toast({ tone: "info", title: "Workspace scheduled for deletion" }); }}>Delete workspace</Button></>}><Field id="cf" label="Type “northwind” to confirm">{(p) => <Input {...p} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />}</Field></Modal>
  </>);
}

export function Members() {
  const toast = useToast(); const [inv, setInv] = useState(false); const [emails, setEmails] = useState<string[]>([]); const [tab, setTab] = useState("members");
  const roles = ["Owner", "Admin", "Member", "Viewer"]; const st: [Tone, string][] = [["success", "Active"], ["success", "Active"], ["info", "Invited"], ["success", "Active"], ["neutral", "Suspended"], ["success", "Active"]];
  return (<>
    <PageHeader title="Members" desc="18 of 25 seats used." actions={<Button variant="primary" onClick={() => setInv(true)}><Plus />Invite people</Button>} />
    <Tabs label="Members" value={tab} onChange={setTab} items={[{ id: "members", label: "Members", count: 18 }, { id: "pending", label: "Pending invites", count: 1 }, { id: "roles", label: "Roles" }]} />
    <div className="mt-4">{tab === "roles" ? <Card flush><table className="w-full text-body"><thead><tr className="h-10 border-b border-subtle text-body-sm text-secondary"><th className="ps-5 text-start font-medium">Can</th>{roles.map((r) => <th key={r} className="text-center font-medium">{r}</th>)}</tr></thead><tbody>{[["View content", 1, 1, 1, 1], ["Create and edit", 1, 1, 1, 0], ["Delete content", 1, 1, 0, 0], ["Manage members", 1, 1, 0, 0], ["Manage billing", 1, 0, 0, 0], ["Delete workspace", 1, 0, 0, 0]].map((r) => <tr key={r[0] as string} className="h-11 border-b border-subtle last:border-0"><td className="ps-5">{r[0]}</td>{(r.slice(1) as number[]).map((v, i) => <td key={i} className="text-center">{v ? <><span aria-hidden className="text-status-success-fg">✓</span><span className="sr-only">Allowed</span></> : <><span aria-hidden className="text-tertiary">—</span><span className="sr-only">Not allowed</span></>}</td>)}</tr>)}</tbody></table></Card> :
      <Card flush><div className="p-3"><Input aria-label="Search members" start={<Search />} placeholder="Search by name or email" className="max-w-xs" /></div><table className="w-full text-body"><thead className="bg-surface-sunken text-body-sm text-secondary"><tr className="h-9 border-y border-subtle"><th className="ps-5 text-start font-medium">Member</th><th className="text-start font-medium">Role</th><th className="hidden text-start font-medium sm:table-cell">Status</th><th className="hidden text-start font-medium md:table-cell">Last active</th><th className="w-12" /></tr></thead>
        <tbody>{people.filter((_, i) => tab === "pending" ? i === 2 : true).map((p, i) => <tr key={p.id} className="h-14 border-b border-subtle last:border-0 hover:bg-action-ghost-hover"><td className="ps-3 sm:ps-5"><div className="flex min-w-[9rem] items-center gap-3"><Avatar id={p.id} name={p.name} /><div className="min-w-0"><p className="truncate font-medium">{p.name}</p><p className="truncate text-body-sm text-secondary">{p.email}</p></div></div></td><td>{i === 0 ? <span className="text-secondary">Owner</span> : <Select aria-label={`Role for ${p.name}`} defaultValue={roles[Math.min(i, 3)]} className="h-8 w-28 min-w-[7rem] text-body-sm">{roles.slice(1).map((r) => <option key={r}>{r}</option>)}</Select>}</td><td className="hidden sm:table-cell"><StatusPill tone={st[i][0]}>{st[i][1]}</StatusPill></td><td className="hidden text-secondary md:table-cell">{["2 min ago", "Yesterday", "—", "3 days ago", "6 weeks ago", "Today"][i]}</td><td className="pe-3"><Button size="icon-sm" variant="ghost" aria-label={`Actions for ${p.name}`}><Plug className="rotate-90" /></Button></td></tr>)}</tbody></table>
        <Pagination page={1} pages={3} total={18} size={6} onPage={() => {}} /></Card>}</div>
    <Modal open={inv} onClose={() => setInv(false)} title="Invite people" description="They’ll get an email that expires in 7 days." footer={<><Button onClick={() => setInv(false)}>Cancel</Button><Button variant="primary" reason={emails.length === 0 ? "Add at least one email address" : undefined} onClick={() => { setInv(false); toast({ tone: "success", title: `${emails.length} invitation${emails.length > 1 ? "s" : ""} sent` }); setEmails([]); }}>Send invites</Button></>}>
      <div className="flex flex-col gap-4"><Field id="ie" label="Email addresses" hint="You have 7 seats left.">{(p) => <TagInput id={p.id} label="Email addresses" value={emails} onChange={setEmails} />}</Field><Field id="ir" label="Role" hint="Members can edit. Viewers can only read.">{(p) => <Select {...p}><option>Member</option><option>Admin</option><option>Viewer</option></Select>}</Field></div></Modal>
  </>);
}

export function Billing() {
  const toast = useToast(); const [dun, setDun] = useState(true); const [plan, setPlan] = useState(false);
  return (<>
    <PageHeader title="Billing" desc="Plan, usage, and invoices." />
    {dun && <div className="mb-5"><Banner tone="warning" callout title="We couldn’t charge your card ending 4242" onDismiss={() => setDun(false)} action={<Button size="sm">Update card</Button>}>Update it by 14 Mar to avoid interruption. Your data is safe.</Banner></div>}
    <div className="grid gap-4 md:grid-cols-2">
      <Card><div className="flex items-start justify-between"><div><p className="text-body-sm text-secondary">Current plan</p><p className="mt-1 text-h3 font-semibold">Team</p><p className="tnum text-body text-secondary">$24 per seat / month, billed annually</p></div><StatusPill tone="success">Active</StatusPill></div><p className="mt-4 text-body text-secondary">18 seats · renews <b className="font-medium text-primary">1 Apr 2026</b> · <span className="tnum">$432.00</span></p><div className="mt-4 flex gap-2"><Button onClick={() => setPlan(true)}>Change plan</Button><Button variant="ghost">Cancel plan</Button></div></Card>
      <Card><CardHeader title="Payment method" /><div className="mt-4 flex items-center gap-3"><span className="grid h-8 w-12 place-items-center rounded-tag border border-subtle bg-surface-sunken text-caption font-bold tracking-wide text-secondary">VISA</span><div><p className="font-mono text-body">•••• 4242</p><p className="text-body-sm text-secondary">Expires 08/27</p></div><Button className="ms-auto" size="sm">Update</Button></div><div className="mt-4 border-t border-subtle pt-3 text-body-sm text-secondary">Billing email <span className="text-primary">finance@northwind.example</span></div></Card>
    </div>
    <Card className="mt-4"><CardHeader title="Usage" desc="Resets 1 Apr" /><div className="mt-5 flex flex-col gap-5">{([["Seats", 18, 25, "18 of 25", "primary"], ["API calls", 92400, 100000, "92,400 of 100,000", "warning"], ["Storage", 41, 100, "41 of 100 GB", "primary"]] as const).map(([n, v, m, t, tn]) => <div key={n}><div className="mb-1.5 flex justify-between text-body"><span>{n}</span><span className="tnum text-secondary">{t}{tn === "warning" && <span className="ms-2 font-medium text-status-warning-fg">Approaching limit</span>}</span></div><Progress label={n} value={v} max={m} valueText={t} tone={tn} /></div>)}</div></Card>
    <Card flush className="mt-4"><div className="px-5 pt-4"><CardHeader title="Invoices" action={<Button size="sm" variant="ghost"><Download />Download all</Button>} /></div><table className="mt-3 w-full text-body"><thead className="bg-surface-sunken text-body-sm text-secondary"><tr className="h-9 border-y border-subtle"><th className="ps-5 text-start font-medium">Invoice</th><th className="hidden text-start font-medium sm:table-cell">Date</th><th className="hidden text-start font-medium md:table-cell">Description</th><th className="text-end font-medium">Amount (USD)</th><th className="ps-4 text-start font-medium">Status</th><th className="w-12" /></tr></thead>
      <tbody>{invoices.map((v) => <tr key={v.id} className="h-11 border-b border-subtle last:border-0 hover:bg-action-ghost-hover"><td className="ps-5 font-mono text-[13px]">{v.id}</td><td className="hidden text-secondary sm:table-cell">{v.date}</td><td className="hidden text-secondary md:table-cell">{v.desc}</td><td className="tnum text-end">{money.format(v.amount)}</td><td className="ps-4"><StatusPill tone={v.status === "paid" ? "success" : "neutral"}>{v.status === "paid" ? "Paid" : "Refunded"}</StatusPill></td><td className="pe-3"><Button size="icon-sm" variant="ghost" aria-label={`Download invoice ${v.id}`} onClick={() => toast({ tone: "info", title: `Downloading ${v.id}` })}><Download /></Button></td></tr>)}</tbody></table></Card>
    <Modal open={plan} onClose={() => setPlan(false)} width="lg" title="Change plan" description="Upgrades apply today and are prorated." footer={<><Button onClick={() => setPlan(false)}>Not now</Button><Button variant="primary" onClick={() => { setPlan(false); toast({ tone: "success", title: "Upgraded to Business", description: "You were charged $186.40 today." }); }}>Upgrade to Business · $186.40 today</Button></>}>
      <div className="grid gap-3 sm:grid-cols-2">{[["Team", "$24", "Current", false], ["Business", "$48", "Recommended for 92% API use", true]].map(([n, p, d, hl]) => <div key={n as string} className={cn("rounded-card border p-4", hl ? "border-action-primary ring-1 ring-action-primary" : "border-subtle")}><p className="font-medium">{n as string}</p><p className="tnum mt-1 text-h3 font-semibold">{p as string}<span className="text-body font-normal text-secondary"> / seat / mo</span></p><p className="mt-2 text-body-sm text-secondary">{d as string}</p></div>)}</div></Modal>
  </>);
}

export function Integrations() {
  const toast = useToast(); const [on, setOn] = useState<Record<string, boolean>>({ Slack: true, GitHub: false, Gmail: true });
  const list = [["Slack", Slack, "Post deal updates to channels."], ["GitHub", Github, "Link pull requests to deals."], ["Gmail", Mail, "Log customer emails automatically."], ["Webhooks", Link2, "Send events to your own endpoint."]] as const;
  return (<>
    <PageHeader title="Integrations" desc="Connect the tools your team already uses." />
    <div className="grid gap-4 sm:grid-cols-2">{list.map(([n, I, d]) => <Card key={n} className="flex flex-col gap-4"><div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-control bg-surface-sunken"><I className="size-5 text-secondary" /></span><div className="flex-1"><p className="font-medium">{n}</p><p className="text-body-sm text-secondary">{d}</p></div>{on[n] && <StatusPill tone="success">Connected</StatusPill>}</div>
      <div className="flex gap-2">{on[n] ? <><Button size="sm">Configure</Button><Button size="sm" variant="ghost" onClick={() => { setOn({ ...on, [n]: false }); toast({ tone: "info", title: `${n} disconnected` }); }}>Disconnect</Button></> : <Button size="sm" variant="primary" onClick={() => { setOn({ ...on, [n]: true }); toast({ tone: "success", title: `${n} connected` }); }}>Connect</Button>}</div></Card>)}</div></>);
}

export function ApiKeys() {
  const toast = useToast(); const [keys, setKeys] = useState([{ n: "Production", k: "sk_live_••••••••4f2a", c: "12 Jan 2026", u: "2 min ago" }, { n: "CI pipeline", k: "sk_live_••••••••9b10", c: "3 Feb 2026", u: "Yesterday" }]); const [made, setMade] = useState<string | null>(null);
  return (<>
    <PageHeader title="API keys" desc="Keys act as you. Treat them like passwords." actions={<Button variant="primary" onClick={() => setMade("sk_live_51Nq8x2eZvKYlo2C0Hh7wR4f2a")}><Plus />Create key</Button>} />
    {keys.length === 0 ? <Card flush><StatePanel art={<Art.plug />} title="No API keys" description="Create a key to call the API from your own code." action={<Button variant="primary" onClick={() => setMade("sk_live_51Nq8x2eZvKYlo2C0Hh7wR4f2a")}>Create key</Button>} /></Card> :
      <Card flush><table className="w-full text-body"><thead className="bg-surface-sunken text-body-sm text-secondary"><tr className="h-9 border-b border-subtle"><th className="ps-5 text-start font-medium">Name</th><th className="text-start font-medium">Key</th><th className="hidden text-start font-medium sm:table-cell">Last used</th><th className="w-24" /></tr></thead><tbody>{keys.map((k) => <tr key={k.n} className="h-12 border-b border-subtle last:border-0"><td className="ps-5 font-medium">{k.n}<span className="block text-body-sm font-normal text-tertiary">Created {k.c}</span></td><td className="font-mono text-[13px] text-secondary">{k.k}</td><td className="hidden text-secondary sm:table-cell">{k.u}</td><td className="pe-4 text-end"><Button size="sm" variant="ghost" onClick={() => { setKeys(keys.filter((x) => x.n !== k.n)); toast({ tone: "info", title: `Revoked ${k.n}` }); }}>Revoke</Button></td></tr>)}</tbody></table></Card>}
    <Modal open={!!made} onClose={() => setMade(null)} title="Copy your new key" description="This is the only time we’ll show it in full." footer={<Button variant="primary" onClick={() => { setKeys([...keys, { n: "New key", k: "sk_live_••••••••4f2a", c: "Today", u: "Never" }]); setMade(null); }}>I’ve saved it</Button>}><div className="flex items-center gap-2 rounded-control bg-surface-sunken p-3"><code className="min-w-0 flex-1 break-all font-mono text-[13px]">{made}</code><CopyButton value={made ?? ""} /></div></Modal>
  </>);
}

export function AuditLog() {
  const [page, setPage] = useState(1); const [ev, setEv] = useState("All events");
  const rows = [["Mia Moreno", "u1", "signed in", "Berlin · Chrome", "2 min ago"], ["Kenji Ito", "u2", "changed Priya’s role to Admin", "Workspace", "1 h ago"], ["Priya Raghavan", "u5", "created API key “CI pipeline”", "API keys", "Yesterday, 14:22"], ["System", "sys", "retried a failed webhook (3 of 3)", "Integrations", "Yesterday, 09:00"], ["Amara Okafor", "u3", "exported 1,284 deals as CSV", "Deals", "9 Mar, 16:40"], ["Mia Moreno", "u1", "updated payment method", "Billing", "6 Mar, 11:02"]];
  return (<>
    <PageHeader title="Audit log" desc="Every security and admin event, kept for 12 months." actions={<Button><Download />Export</Button>} />
    <div className="mb-3 flex flex-wrap items-center gap-2"><div className="w-64"><Input aria-label="Search events" start={<Search />} placeholder="Search events" /></div><Select aria-label="Event type" className="w-44" value={ev} onChange={(e) => setEv(e.target.value)}><option>All events</option><option>Sign-ins</option><option>Permissions</option><option>Billing</option></Select></div>
    <Card flush><ul>{rows.map((r, i) => <li key={i} className="flex items-center gap-3 border-b border-subtle px-5 py-3 last:border-0">{r[1] === "sys" ? <span className="grid size-8 place-items-center rounded-round bg-surface-sunken text-tertiary"><Plug className="size-4" /></span> : <Avatar id={r[1]} name={r[0]} />}<div className="min-w-0 flex-1"><p className="text-body"><b className="font-medium">{r[0]}</b> <span className="text-secondary">{r[2]}</span></p><p className="text-body-sm text-tertiary">{r[3]}</p></div><span className="tnum shrink-0 text-body-sm text-secondary">{r[4]}</span></li>)}</ul><Pagination page={page} pages={12} total={287} size={25} onPage={setPage} /></Card></>);
}
