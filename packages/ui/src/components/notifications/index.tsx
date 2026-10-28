"use client";
import { Inbox, Bell, Settings2 } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { NotificationItem } from "../notification-item";
import { Notif } from "../../lib/notifications-shared";
import { Popover } from "../popover";
import { Tabs } from "../tabs";

export const notifSeed: Notif[] = [
  { id: 1, kind: "mention", title: "Kenji mentioned you in Wingtip expansion", body: "Can you review the DPA redlines before Thursday?", time: "2 min", unread: true, actor: "Kenji Ito", action: "Reply" },
  { id: 2, kind: "security", title: "New sign-in from Lagos, Nigeria", body: "Chrome on Windows. If this wasn’t you, secure your account.", time: "12 min", unread: true, action: "Review" },
  { id: 3, kind: "billing", title: "Invoice INV-1041 is 12 days past due", body: "Contoso has not paid $48,250.50.", time: "1 h", unread: true, action: "Send reminder" },
  { id: 4, kind: "approval", title: "Amara approved Fabrikam onboarding", time: "Yesterday", unread: false, actor: "Amara Okafor" },
  { id: 5, kind: "scan", title: "Dock 3: 7 exceptions need review", body: "Shipment IN-20418, 1,170 of 1,640 scanned.", time: "Yesterday", unread: false, action: "Open" },
  { id: 6, kind: "system", title: "Pipeline board now supports keyboard moves", body: "Press M on a card.", time: "Mon", unread: false },
];

export function useNotifications(seed: Notif[] = notifSeed) {
  const [list, setList] = React.useState(seed);
  return { list, unread: list.filter((n) => n.unread).length, markRead: (id: number) => setList((l) => l.map((n) => (n.id === id ? { ...n, unread: false } : n))), markAll: () => setList((l) => l.map((n) => ({ ...n, unread: false }))), dismiss: (id: number) => setList((l) => l.filter((n) => n.id !== id)), restore: () => setList(seed) };
}

type Store = ReturnType<typeof useNotifications>;

export function NotificationList({ store, filter = "all", empty }: { store: Store; filter?: string; empty?: React.ReactNode }) {
  const items = store.list.filter((n) => (filter === "all" ? true : filter === "unread" ? n.unread : n.kind === filter));
  if (!items.length) return <div className="px-6 py-12 text-center">{empty ?? <><Inbox className="mx-auto size-8 text-tertiary" aria-hidden /><p className="mt-3 text-body font-medium">You’re all caught up</p><p className="text-body-sm text-secondary">New activity shows up here.</p></>}</div>;
  return <ul className="divide-y divide-[var(--color-subtle)]">{items.map((n) => <NotificationItem key={n.id} n={n} onRead={() => store.markRead(n.id)} onDismiss={() => store.dismiss(n.id)} />)}</ul>;
}

/** Bell with count, opens a 400px panel. Use in TopBar `right`. */
export function NotificationCenter({ store, onViewAll }: { store?: Store; onViewAll?: () => void }) {
  const own = useNotifications(); const s = store ?? own; const [tab, setTab] = React.useState("all");
  return (
    <Popover label={`Notifications, ${s.unread} unread`} width="w-[min(25rem,calc(100vw-1.5rem))] !p-0" badge={s.unread} trigger={<Bell className={cn("size-5", s.unread > 0 && "m-bell")} aria-hidden />}>
      {(close) => (<div className="flex max-h-[70dvh] flex-col"><div className="flex items-center justify-between px-4 pt-3"><h2 className="text-h4 font-semibold">Notifications</h2><Button size="sm" variant="ghost" disabled={!s.unread} onClick={s.markAll}>Mark all read</Button></div>
        <div className="px-2"><Tabs label="Filter" value={tab} onChange={setTab} items={[{ id: "all", label: "All" }, { id: "unread", label: "Unread", count: s.unread }, { id: "mention", label: "Mentions" }]} /></div>
        <div className="min-h-0 flex-1 overflow-y-auto"><NotificationList store={s} filter={tab} /></div>
        <div className="flex items-center justify-between border-t border-subtle px-4 py-2.5"><button type="button" className="text-body-sm font-medium text-link hover:underline" onClick={() => { close(); onViewAll?.(); }}>View all</button><button type="button" aria-label="Notification settings" className="grid size-8 place-items-center rounded-control text-secondary hover:bg-action-ghost-hover" onClick={() => { close(); location.hash = "/notifications/settings"; }}><Settings2 className="size-4" aria-hidden /></button></div></div>)}
    </Popover>);
}
