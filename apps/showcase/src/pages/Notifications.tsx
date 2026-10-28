import { useState } from "react";
import { CheckCheck } from "lucide-react";
import { Button, Tabs, Card, CardHeader, Banner, useToast, Specimen, StatusPill, Segmented } from "@bytesphere/ui";
import { PageHeader } from "@bytesphere/ui";
import { useNotifications, NotificationList, NotificationCenter, NotificationPrefs, PushPreview, EmailPreview, NotificationItem, notifSeed, kindMeta, type NotifKind } from "@bytesphere/ui";

export function NotificationsPage() {
  const s = useNotifications(); const [tab, setTab] = useState("all");
  const kinds = Object.keys(kindMeta) as NotifKind[];
  return (
    <>
      <PageHeader title="Notifications" desc={s.unread ? `${s.unread} unread` : "You’re all caught up"} actions={<><Button onClick={s.restore}>Restore samples</Button><Button disabled={!s.unread} onClick={s.markAll}><CheckCheck />Mark all read</Button></>} />
      <Tabs label="Filter" value={tab} onChange={setTab} items={[{ id: "all", label: "All" }, { id: "unread", label: "Unread", count: s.unread }, ...kinds.map((k) => ({ id: k, label: kindMeta[k].label }))]} />
      <div className="mt-4 overflow-hidden rounded-card border border-subtle bg-surface-raised"><NotificationList store={s} filter={tab} /></div>
    </>);
}
export function NotificationSettings() {
  const toast = useToast();
  return (
    <>
      <PageHeader back={{ label: "Notifications", href: "#/notifications" }} title="Notification settings" desc="Choose how you hear about each kind of activity." />
      <Card><NotificationPrefs /></Card>
      <Card className="mt-4"><CardHeader title="Quiet hours" desc="Push and email wait until the end. Security alerts always come through." /><div className="mt-4 flex flex-wrap items-center gap-3 text-body"><span>From</span><input aria-label="From" type="time" defaultValue="20:00" className="h-(--control-md) rounded-control border border-control bg-input px-3" /><span>to</span><input aria-label="To" type="time" defaultValue="07:30" className="h-(--control-md) rounded-control border border-control bg-input px-3" /></div></Card>
      <div className="mt-4"><Button variant="primary" onClick={() => toast({ tone: "success", title: "Preferences saved" })}>Save</Button></div>
    </>);
}

export function NotificationsStandard() {
  const toast = useToast(); const s = useNotifications(); const [pos, setPos] = useState("Bottom right");
  return (
    <>
      <PageHeader title="Notification system" desc="Seven channels, one rule: the more urgent, the more interruptive. Try each one." />
      <div className="flex flex-col gap-10">
        <Specimen title="1. Choose the channel" doc="03-components/notifications.md"><div className="overflow-x-auto"><table className="w-full min-w-[40rem] text-body"><thead><tr className="border-b border-subtle text-body-sm text-secondary">{["Channel", "Use for", "Interrupts?", "Lifetime"].map((h) => <th key={h} className="py-2 pe-4 text-start font-medium">{h}</th>)}</tr></thead><tbody>{[["Inline message", "Validation, field help", "No", "Until fixed"], ["Toast", "Result of what the user just did", "Briefly", "5 s, errors stay"], ["Banner", "Page or account state (past due, maintenance)", "No", "Until resolved or dismissed"], ["Badge / dot", "Something new, count only", "No", "Until seen"], ["Notification center", "Activity by others, assignments, alerts", "No", "30 days, then archive"], ["Email", "Needs action later or leaves the app", "Yes", "Permanent"], ["Push", "Time-sensitive: security, mentions, scan exceptions", "Yes", "Until dismissed"]].map((r) => <tr key={r[0]} className="border-b border-subtle last:border-0 align-top">{r.map((c, i) => <td key={i} className={i === 0 ? "py-2.5 pe-4 font-medium" : "py-2.5 pe-4 text-secondary"}>{c}</td>)}</tr>)}</tbody></table></div></Specimen>
        <Specimen title="2. Toast" note="Triggered by the user’s own action"><div className="flex flex-wrap gap-2"><Button onClick={() => toast({ tone: "success", title: "Invoice sent", description: "INV-1043 went to finance@northwind.example." })}>Success</Button><Button onClick={() => toast({ tone: "info", title: "Task deleted", action: { label: "Undo", onClick: () => toast({ tone: "success", title: "Restored" }) } })}>With undo</Button><Button onClick={() => toast({ tone: "error", title: "Couldn’t save changes", description: "You’re offline. We’ll retry when you’re back.", action: { label: "Retry", onClick: () => {} } })}>Error (stays)</Button></div><div className="mt-3"><Segmented label="Position" items={["Bottom right", "Top center"]} value={pos} onChange={setPos} /><p className="mt-2 text-body-sm text-secondary">Desktop: bottom right. Mobile: bottom above the tab bar. Max 3 stacked; newest on top.</p></div></Specimen>
        <Specimen title="3. Banner" note="Page-level state"><div className="flex flex-col gap-3"><Banner tone="warning" title="Payment failed" action={<Button size="sm">Update card</Button>}>Update by 14 March to avoid read-only mode.</Banner><Banner tone="info" title="Scheduled maintenance" onDismiss={() => {}}>Saturday 02:00 to 02:30 UTC. Scanning keeps working offline.</Banner></div></Specimen>
        <Specimen title="4. Notification center" note="Bell in the top bar"><div className="flex min-h-[28rem] justify-end"><NotificationCenter store={s} onViewAll={() => (location.hash = "/notifications")} /></div></Specimen>
        <Specimen title="5. Item anatomy" note="Actor or icon · title · optional body · time · one action · read state"><ul className="divide-y divide-[var(--color-subtle)] overflow-hidden rounded-card border border-subtle">{notifSeed.slice(0, 3).map((n) => <NotificationItem key={n.id} n={n} />)}</ul></Specimen>
        <Specimen title="6. Push and email" note="Same event, two shapes"><div className="grid gap-6 lg:grid-cols-2"><div className="flex flex-col gap-3"><PushPreview title="New sign-in from Lagos" body="Chrome on Windows. Tap if this wasn’t you." /><PushPreview title="Dock 3: 7 exceptions" body="IN-20418 needs review before shift ends." time="5 min" /></div><EmailPreview subject="Invoice INV-1041 is past due" preheader="Contoso has not paid $48,250.50."><p className="font-semibold">Invoice INV-1041 is 12 days past due</p><p className="mt-2 text-[#4A555E]">Contoso Ltd has not paid $48,250.50. A reminder was sent on 4 March.</p><p className="mt-4"><span className="inline-block rounded-control bg-[#116CB3] px-4 py-2 font-medium text-white">Send another reminder</span></p></EmailPreview></div></Specimen>
        <Specimen title="7. Status vocabulary"><div className="flex flex-wrap gap-2">{(Object.keys(kindMeta) as NotifKind[]).map((k) => <StatusPill key={k} tone={kindMeta[k].tone}>{kindMeta[k].label}</StatusPill>)}</div></Specimen>
      </div>
    </>);
}
