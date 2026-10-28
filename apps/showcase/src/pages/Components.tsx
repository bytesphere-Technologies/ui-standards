import { useState } from "react";
import { Plus, Trash2, Download, Pencil, Copy, Archive, Ellipsis, ArrowRight, Mail, Lock, CircleHelp, Link2, Share2 } from "lucide-react";
import { Button, Field, Input, Textarea, Select, Checkbox, Switch, Radio, StatusPill, Count, FilterTag, Card, CardHeader, Banner, Skeleton, Progress, StatePanel, Avatar, AvatarGroup, Modal, Drawer, useToast, Tabs, Segmented, Tooltip, Menu, Specimen, Label, Kbd, type Tone } from "@bytesphere/ui";
import { Pagination, Stepper, Accordion, DescList, CopyButton, CodeBlock, Slider, Stat, Timeline, Dropzone, Combobox, TagInput, Breadcrumb } from "@bytesphere/ui";
import { Art } from "@bytesphere/ui";
import { people } from "../data";

export function Components() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("mia@northwind");
  const [c1, setC1] = useState(true); const [c2, setC2] = useState(false); const [sw, setSw] = useState(true); const [rad, setRad] = useState("monthly");
  const [tab, setTab] = useState("overview"); const [seg, setSeg] = useState("List");
  const [modal, setModal] = useState<null | "confirm" | "form">(null); const [drawer, setDrawer] = useState(false);
  const [tags, setTags] = useState([["Status", "Past due"], ["Owner", "Kenji Ito"]]);
  const [banner, setBanner] = useState(true); const [page, setPage] = useState(3); const [step, setStep] = useState(1);
  const [vol, setVol] = useState(40); const [country, setCountry] = useState("Kenya"); const [emails, setEmails] = useState(["amara@northwind.example"]);
  const emailErr = !/^\S+@\S+\.\S+$/.test(email) ? "Enter an address like name@company.com." : undefined;

  return (
    <div className="flex flex-col gap-10">
      <Specimen title="Buttons" note="One primary per view." doc="03-components/button.md">
        <div className="flex flex-col gap-5">
          <div><Label>Variants</Label><div className="flex flex-wrap items-center gap-2.5"><Button variant="primary">Create project</Button><Button>Import</Button><Button variant="ghost">Cancel</Button><Button variant="subtle">Upgrade plan</Button><Button variant="accent">Book a demo</Button><Button variant="danger">Delete report</Button></div></div>
          <div><Label>Sizes · icon · trailing</Label><div className="flex flex-wrap items-center gap-2.5"><Button size="sm" variant="primary">Small</Button><Button variant="primary">Medium</Button><Button size="lg" variant="primary">Large</Button>
            <Tooltip text="Delete invoice"><Button size="icon" variant="ghost" aria-label="Delete invoice"><Trash2 /></Button></Tooltip><Button><Download />Export CSV</Button><Button variant="primary">Continue<ArrowRight /></Button></div></div>
          <div><Label>States</Label><div className="flex flex-wrap items-center gap-2.5">
            <Button variant="primary" loading={loading} onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); toast({ tone: "success", title: "Changes saved" }); }, 1600); }}>{loading ? "Saving" : "Save changes"}</Button>
            <Button variant="primary" reason="Only admins can invite members">Invite member</Button><Button disabled>Disabled</Button>
            <span className="text-body-sm text-tertiary">Try “Save changes”, then hover “Invite member”.</span></div></div>
        </div>
      </Specimen>

      <Specimen title="Fields" note="Label above, validated on blur." doc="03-components/inputs-fields-and-selects.md">
        <div className="grid gap-x-10 gap-y-5 md:grid-cols-2">
          <Field id="f-name" label="Project name" hint="Appears in the sidebar and in reports.">{(p) => <Input {...p} placeholder="Northwind renewal" autoComplete="off" />}</Field>
          <Field id="f-email" label="Work email" error={emailErr} hint="Invoices go here.">{(p) => <Input {...p} type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} start={<Mail />} />}</Field>
          <Field id="f-country" label="Country">{(p) => <Combobox id={p.id} options={["Kenya", "Germany", "Netherlands", "Nigeria", "Norway", "United Kingdom", "United States", "Uganda", "Ukraine"]} value={country} onChange={setCountry} />}</Field>
          <Field id="f-role" label="Role">{(p) => <Select {...p} defaultValue="member"><option value="owner">Owner</option><option value="admin">Admin</option><option value="member">Member</option><option value="viewer">Viewer</option></Select>}</Field>
          <Field id="f-note" label="Note" optional className="md:col-span-2">{(p) => <Textarea {...p} placeholder="Anything the team should know before the renewal call" />}</Field>
          <Field id="f-ro" label="Workspace ID" hint="Managed by SSO. Read-only.">{(p) => <Input {...p} readOnly defaultValue="ws_8f21c9a3" end={<Lock />} />}</Field>
          <Field id="f-dis" label="Region">{(p) => <Input {...p} disabled defaultValue="EU (Frankfurt)" />}</Field>
          <Field id="f-inv" label="Invite by email" className="md:col-span-2">{(p) => <TagInput id={p.id} label="Invite by email" value={emails} onChange={setEmails} />}</Field>
          <div className="md:col-span-2"><Slider id="f-vol" label="Digest frequency" value={vol} onChange={setVol} unit="%" /></div>
        </div>
        <div className="mt-6 grid gap-6 border-t border-subtle pt-5 md:grid-cols-3">
          <div className="flex flex-col gap-3"><Label>Checkboxes</Label><Checkbox id="c1" label="Weekly summary" hint="Sent every Monday, 08:00" checked={c1} onChange={setC1} /><Checkbox id="c2" label="Share with workspace" checked={c2} onChange={setC2} /><Checkbox id="c3" label="Select all" checked={false} indeterminate onChange={() => {}} /></div>
          <fieldset className="flex flex-col gap-3"><legend className="mb-2 text-caption font-medium text-tertiary">Radio group</legend><Radio name="bp" value="monthly" label="Monthly" hint="$24 per seat" checked={rad === "monthly"} onChange={setRad} /><Radio name="bp" value="annual" label="Annual" hint="$19 per seat, billed yearly" checked={rad === "annual"} onChange={setRad} /></fieldset>
          <div className="flex flex-col gap-3"><Label>Switch · saves instantly</Label><Switch id="sw" label="Email notifications" hint="Mentions and assignments" checked={sw} onChange={setSw} /></div>
        </div>
      </Specimen>

      <Specimen title="Status, counts, tags" note="Three different things." doc="03-components/pills-badges-tags.md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">{([["success", "Active"], ["warning", "Pending review"], ["danger", "Past due"], ["info", "Invited"], ["neutral", "Archived"]] as [Tone, string][]).map(([t, l]) => <StatusPill key={l} tone={t}>{l}</StatusPill>)}</div>
          <div className="flex flex-wrap items-center gap-5 text-body"><span className="flex items-center gap-2">Inbox <Count n={4} /></span><span className="flex items-center gap-2">Failed jobs <Count n={12} tone="danger" /></span><span className="flex items-center gap-2">Members <Count n={128} tone="neutral" /></span><span className="flex items-center gap-2">Alerts <Count n={240} /></span></div>
          <div className="flex flex-wrap items-center gap-2">{tags.map(([k, v]) => <FilterTag key={k} k={k} v={v} onRemove={() => setTags((t) => t.filter((x) => x[0] !== k))} />)}{tags.length ? <Button size="sm" variant="ghost" onClick={() => setTags([])}>Clear all</Button> : <Button size="sm" variant="ghost" onClick={() => setTags([["Status", "Past due"], ["Owner", "Kenji Ito"]])}>Reset</Button>}</div>
        </div>
      </Specimen>

      <Specimen title="Cards" note="Flat. Shadow only on hover, only if the card is a link." doc="03-components/cards.md">
        <div className="grid gap-4 md:grid-cols-3">
          <Card><CardHeader title="Billing contact" desc="Where invoices are sent" /><div className="mt-4 flex items-center gap-3"><Avatar id="u1" name="Mia Moreno" size={40} /><div><p className="text-body font-medium">Mia Moreno</p><p className="text-body-sm text-secondary">finance@northwind.example</p></div></div></Card>
          <Card interactive><h3 className="text-h4 font-semibold"><a href="#/components" className="after:absolute after:inset-0 focus-visible:shadow-none">Wingtip expansion</a></h3><p className="mt-0.5 text-body-sm text-secondary">Phase 2 of 3 · EMEA</p><div className="mt-4"><Progress label="Phase progress" value={62} valueText="62 percent" /></div>
            <div className="relative z-10 mt-4 flex items-center justify-between"><AvatarGroup people={people} size={24} max={3} /><Menu label="Card actions" trigger={<span className="grid size-8 place-items-center rounded-control hover:bg-action-ghost-hover"><Ellipsis className="size-4" /></span>} items={[{ label: "Edit", icon: Pencil }, { label: "Duplicate", icon: Copy, shortcut: "⌘D" }, "sep", { label: "Delete…", icon: Trash2, danger: true }]} /></div></Card>
          <Stat label="Net revenue" value="$46.2K" delta="4.2%" good period="vs. prior 30 days" data={[31, 33, 32, 36, 35, 38, 41, 40, 43, 46]} />
        </div>
      </Specimen>

      <Specimen title="Banners and callouts" note="One banner at a time." doc="03-components/banners-alerts-and-inline-callouts.md">
        <div className="flex flex-col gap-3">
          {banner && <div className="overflow-hidden rounded-card border border-subtle"><Banner tone="warning" onDismiss={() => setBanner(false)} action={<Button size="sm">Update card</Button>}>Your card ending 4242 was declined. Update it by 14 Mar to keep access.</Banner></div>}
          <Banner tone="info" callout title="Deleting a workspace is permanent">All 14 revision histories are removed with it. Export first if you need a copy.</Banner>
          <Banner tone="success" callout>Import finished. 1,284 records added, none skipped.</Banner>
          <Banner tone="danger" callout title="2 of 5 sources failed to sync">Reference 8f21-c9a3. We’ll retry in 10 minutes, or you can retry now.</Banner>
          {!banner && <div><Button size="sm" variant="ghost" onClick={() => setBanner(true)}>Show dismissed banner</Button></div>}
        </div>
      </Specimen>

      <Specimen title="Overlays and feedback" note="Dialogs trap focus. Toasts never ask for a decision." doc="modals-sheets-drawers.md · toasts-and-notifications.md">
        <div className="flex flex-wrap items-center gap-2.5">
          <Button onClick={() => toast({ tone: "success", title: "Invoice sent", description: "to billing@northwind.example" })}>Success toast</Button>
          <Button onClick={() => toast({ tone: "error", title: "Export failed", description: "The connection dropped at 62%.", action: { label: "Retry", onClick: () => toast({ tone: "info", title: "Retrying export" }) } })}>Error toast</Button>
          <Button onClick={() => setModal("form")}>Invite dialog</Button><Button onClick={() => setDrawer(true)}>Side drawer</Button><Button variant="danger" onClick={() => setModal("confirm")}>Delete report…</Button>
          <Menu label="Row actions" trigger={<span className="inline-flex h-(--control-md) items-center gap-2 rounded-control border border-action-secondary-border px-3 text-body font-medium hover:bg-action-secondary-hover">Actions<Ellipsis className="size-4" /></span>} items={[{ label: "Edit", icon: Pencil }, { label: "Copy link", icon: Link2 }, { label: "Share", icon: Share2, shortcut: "⌘S" }, { label: "Archive", icon: Archive }, "sep", { label: "Delete…", icon: Trash2, danger: true }]} />
          <Tooltip text="Opens the shortcut sheet"><Button variant="ghost" size="icon" aria-label="Keyboard shortcuts"><CircleHelp /></Button></Tooltip><span className="flex items-center gap-1 text-body-sm text-tertiary">or press <Kbd>?</Kbd></span>
        </div>
        <Modal open={modal === "confirm"} onClose={() => setModal(null)} width="sm" danger title="Delete “Q3 report”?" description="This removes the report and its 14 revisions. It can’t be undone."
          footer={<><Button onClick={() => setModal(null)}>Cancel</Button><Button variant="danger" onClick={() => { setModal(null); toast({ tone: "success", title: "Report deleted", action: { label: "Undo", onClick: () => {} } }); }}>Delete report</Button></>} />
        <Modal open={modal === "form"} onClose={() => setModal(null)} title="Invite people" description="Invites expire after 7 days."
          footer={<><Button onClick={() => setModal(null)}>Cancel</Button><Button variant="primary" onClick={() => { setModal(null); toast({ tone: "success", title: "2 invitations sent" }); }}>Send invites</Button></>}>
          <div className="flex flex-col gap-4"><Field id="m-mail" label="Email addresses" hint="Paste a list, separated by commas.">{(p) => <Input {...p} placeholder="kenji@northwind.example, priya@…" autoComplete="off" />}</Field><Field id="m-role" label="Role">{(p) => <Select {...p}><option>Member</option><option>Admin</option><option>Viewer</option></Select>}</Field></div>
        </Modal>
        <Drawer open={drawer} onClose={() => setDrawer(false)} title="Edit deal" description="D-1033 · Wingtip expansion" footer={<><Button onClick={() => setDrawer(false)}>Cancel</Button><Button variant="primary" onClick={() => { setDrawer(false); toast({ tone: "success", title: "Deal updated" }); }}>Save changes</Button></>}>
          <div className="flex flex-col gap-4"><Field id="d-n" label="Deal name">{(p) => <Input {...p} defaultValue="Wingtip expansion" />}</Field><Field id="d-a" label="Amount (USD)">{(p) => <Input {...p} className="tnum" defaultValue="103,920.00" inputMode="decimal" />}</Field><Field id="d-s" label="Stage">{(p) => <Select {...p}><option>Negotiation</option><option>Proposal</option><option>Closed won</option></Select>}</Field></div>
        </Drawer>
      </Specimen>

      <Specimen title="Navigation parts" note="Tabs, segmented, breadcrumb, steps, pagination." doc="pagination-tabs-and-segmented-controls.md">
        <div className="flex flex-col gap-6">
          <Breadcrumb items={[{ label: "Deals", href: "#/deals" }, { label: "Wingtip expansion", href: "#/deal" }, { label: "Activity" }]} />
          <Tabs label="Deal sections" value={tab} onChange={setTab} items={[{ id: "overview", label: "Overview" }, { id: "activity", label: "Activity", count: 12 }, { id: "files", label: "Files", count: 4 }, { id: "settings", label: "Settings" }]} />
          <div className="flex flex-wrap items-center gap-6"><Segmented label="View" items={["List", "Board", "Calendar"]} value={seg} onChange={setSeg} /><Segmented label="Density" size="sm" items={["Comfortable", "Compact"]} value="Comfortable" onChange={() => {}} /></div>
          <div className="max-w-xl"><Stepper steps={["Basics", "Team", "Review"]} current={step} /><div className="mt-3 flex gap-2"><Button size="sm" onClick={() => setStep(Math.max(0, step - 1))}>Back</Button><Button size="sm" variant="primary" onClick={() => setStep(Math.min(3, step + 1))}>Next</Button></div></div>
          <div className="overflow-hidden rounded-card border border-subtle"><Pagination page={page} pages={26} total={1284} size={50} onPage={setPage} onSize={() => {}} /></div>
        </div>
      </Specimen>

      <Specimen title="People" note="Initials, derived colors, presence." doc="03-components/avatars-and-identity.md">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          <div className="flex items-end gap-3">{([24, 32, 40, 64] as const).map((s) => <Avatar key={s} id="u3" name="Amara Okafor" size={s} />)}</div>
          <div className="flex items-center gap-3">{(["online", "away", "busy", "offline"] as const).map((p, i) => <Avatar key={p} id={people[i].id} name={people[i].name} size={40} presence={p} />)}</div>
          <AvatarGroup people={people} max={4} /><div className="flex items-center gap-3"><Avatar id="org1" name="Northwind Traders" size={40} square /><div><p className="text-body font-medium">Northwind Traders</p><p className="text-body-sm text-secondary">Organization · Team plan</p></div></div>
        </div>
      </Specimen>

      <Specimen title="Detail and activity" note="Description list, timeline, copyable values." doc="">
        <div className="grid gap-10 md:grid-cols-2">
          <DescList items={[["Owner", <span className="flex items-center gap-2"><Avatar id="u5" name="Priya Raghavan" size={20} />Priya Raghavan</span>], ["Stage", <StatusPill tone="info">Negotiation</StatusPill>], ["Amount", <span className="tnum">$103,920.00</span>], ["Close date", "28 Mar 2026"], ["Deal ID", <span className="inline-flex items-center gap-2 font-mono text-[13px]">D-1033<CopyButton value="D-1033" label="Copy" /></span>]]} />
          <Timeline items={[{ who: "Priya", what: "moved the deal to Negotiation", when: "Today, 09:14" }, { who: "Kenji", what: "attached Wingtip_MSA_v3.pdf", when: "Yesterday, 16:40" }, { who: "System", what: "sent a renewal reminder", when: "6 Mar, 08:00" }]} />
        </div>
      </Specimen>

      <Specimen title="Files and code" note="Pick or drop files. Limits are stated up front." doc="03-components/upload-dropzone-and-file-preview.md">
        <div className="grid gap-6 md:grid-cols-2"><Dropzone /><CodeBlock lang="bash" code={`curl https://api.bytesphere.example/v1/deals \\\n  -H "Authorization: Bearer $BYTESPHERE_KEY" \\\n  -d status=past_due`} /></div>
      </Specimen>

      <Specimen title="Accordion" note="Real questions only." doc="">
        <Accordion items={[{ q: "Can I change plans mid-cycle?", a: "Yes. Upgrades apply immediately and are prorated; downgrades take effect at the end of the current period." }, { q: "What happens to my data if I cancel?", a: "You keep read-only access for 30 days and can export everything as CSV or JSON. After that it is deleted." }, { q: "Do you offer invoices in other currencies?", a: "We bill in USD, EUR and GBP. Switch currency in Billing before your next renewal." }]} />
      </Specimen>

      <Specimen title="Empty, error, and loading" note="Each data surface designs these." doc="empty-loading-error-and-partial-states.md">
        <div className="grid gap-4 md:grid-cols-3">
          <Card flush><StatePanel art={<Art.folder />} title="No projects yet" description="Create a project to start tracking deals." action={<Button variant="primary"><Plus />Create project</Button>} /></Card>
          <Card flush><StatePanel tone="error" art={<Art.cloud />} title="Couldn’t load invoices" description="Check your connection and try again. Reference 8f21-c9a3." action={<Button>Try again</Button>} /></Card>
          <Card className="flex flex-col gap-3"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-3.5 w-full" /><Skeleton className="h-3.5 w-4/5" /><div className="mt-2 flex gap-2"><Skeleton className="h-[22px] w-16" /><Skeleton className="h-[22px] w-20" /></div></Card>
        </div>
      </Specimen>
    </div>
  );
}
