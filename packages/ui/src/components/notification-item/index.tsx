"use client";
import { type LucideIcon, AtSign, CheckCheck, CreditCard, ShieldAlert, ScanLine, Megaphone, X } from "lucide-react";
import { Avatar } from "../avatar";
import { cn } from "../../lib/cn";
import { NotifKind, Notif } from "../../lib/notifications-shared";
import { Tone } from "../status-pill";

export const kindMeta: Record<NotifKind, { icon: LucideIcon; tone: Tone; label: string }> = {
  mention: { icon: AtSign, tone: "info", label: "Mentions" }, approval: { icon: CheckCheck, tone: "success", label: "Approvals" }, billing: { icon: CreditCard, tone: "warning", label: "Billing" },
  security: { icon: ShieldAlert, tone: "danger", label: "Security" }, scan: { icon: ScanLine, tone: "info", label: "Scanning" }, system: { icon: Megaphone, tone: "neutral", label: "Product updates" },
};

export function NotificationItem({ n, onRead, onDismiss, dense }: { n: Notif; onRead?: () => void; onDismiss?: () => void; dense?: boolean }) {
  const m = kindMeta[n.kind]; const I = m.icon;
  return (
    <li className={cn("m-notif-in group relative flex gap-3 px-4 py-3", n.unread && "bg-selected/50")}>
      {n.unread && <><span className="absolute start-1.5 top-5 size-2 rounded-round bg-action-primary" aria-hidden /><span className="sr-only">Unread</span></>}
      {n.actor ? <Avatar id={n.actor} name={n.actor} size={32} /> : <span className={cn("grid size-8 shrink-0 place-items-center rounded-round", m.tone === "danger" ? "bg-status-danger-bg text-status-danger-fg" : m.tone === "warning" ? "bg-status-warning-bg text-status-warning-fg" : m.tone === "success" ? "bg-status-success-bg text-status-success-fg" : m.tone === "info" ? "bg-status-info-bg text-status-info-fg" : "bg-surface-sunken text-secondary")}><I className="size-4" aria-hidden /></span>}
      <div className="min-w-0 flex-1"><p className="text-body font-medium leading-5">{n.title}</p>{n.body && !dense && <p className="mt-0.5 text-body-sm text-secondary">{n.body}</p>}
        <div className="mt-1.5 flex items-center gap-3 text-body-sm text-tertiary"><span>{n.time}</span>{n.action && <button type="button" onClick={onRead} className="font-medium text-link hover:underline">{n.action}</button>}{n.unread && <button type="button" onClick={onRead} className="hover:text-primary">Mark read</button>}</div></div>
      {onDismiss && <button type="button" aria-label="Dismiss" onClick={onDismiss} className="grid size-8 shrink-0 place-items-center rounded-control text-tertiary opacity-0 hover:bg-action-ghost-hover focus-visible:opacity-100 group-hover:opacity-100 max-sm:opacity-100"><X className="size-4" aria-hidden /></button>}
    </li>);
}
