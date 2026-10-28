"use client";
import { type LucideIcon, Search, LayoutGrid, MessageCircle, Bell } from "lucide-react";
import { AccountPanel } from "../account-panel";
import { LauncherApp, AppLauncher } from "../app-launcher";
import { Avatar } from "../avatar";
import { BrandMark } from "../brand-mark";
import { cn } from "../../lib/cn";
import { Count } from "../count";
import { Popover } from "../popover";

export function PlatformBar({ tabs, current, onTab, apps, create, onCustomize }: { tabs: { id: string; label: string; icon: LucideIcon; badge?: number }[]; current: string; onTab: (id: string) => void; apps: LauncherApp[]; create: { label: string; icon: LucideIcon }[]; onCustomize?: () => void }) {
  return (
    <header className="sticky top-11 z-30 border-b border-subtle bg-surface"><div className="mx-auto grid h-14 max-w-[100rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-3 lg:grid-cols-[minmax(0,20rem)_1fr_minmax(0,20rem)]">
      <div className="flex items-center gap-2"><a href="#/home" aria-label="ByteSphere home" className="grid size-10 place-items-center rounded-round hover:bg-action-ghost-hover"><BrandMark size={30} /></a><label className="hidden items-center gap-2 rounded-round bg-surface-sunken px-3 sm:flex"><Search className="size-4 text-tertiary" aria-hidden /><input aria-label="Search" placeholder="Search ByteSphere" className="h-10 w-44 bg-transparent text-body outline-none placeholder:text-placeholder" /></label></div>
      <nav aria-label="Primary" className="hidden justify-center md:flex"><ul className="flex items-center gap-1">{tabs.map((t) => { const on = t.id === current; return <li key={t.id}><button type="button" aria-current={on ? "page" : undefined} onClick={() => onTab(t.id)} className={cn("relative grid h-14 w-16 place-items-center rounded-control lg:w-28", !on && "hover:bg-action-ghost-hover")}><span className="sr-only">{t.label}</span><span className="relative"><t.icon className={cn("size-6", on ? "text-link" : "text-secondary")} aria-hidden />{t.badge ? <span className="absolute -end-2.5 -top-2"><Count n={t.badge} tone="danger" /></span> : null}</span>{on && <span className="m-grow absolute inset-x-1 bottom-0 h-[3px] origin-center rounded-t-round bg-action-primary" aria-hidden />}</button></li>; })}</ul></nav>
      <div className="flex items-center justify-end gap-2"><Popover label="Menu" trigger={<LayoutGrid className="size-5" />} width="w-[min(34rem,92vw)]"><AppLauncher apps={apps} create={create} /></Popover><Popover label="Messages, 2 unread" trigger={<MessageCircle className="size-5" />} badge={2}><p className="px-1 pb-2 text-h3 font-semibold">Chats</p><ul>{["Kenji Ito", "Amara Okafor"].map((n, i) => <li key={n}><a href="#" className="flex items-center gap-3 rounded-control p-2 hover:bg-action-ghost-hover"><Avatar id={`u${i + 2}`} name={n} size={40} /><span><span className="block text-body font-semibold">{n}</span><span className="block text-body-sm text-secondary">Can you review the DPA redlines…</span></span></a></li>)}</ul></Popover>
        <Popover label="Notifications, 4 unread" trigger={<Bell className="size-5" />} badge={4}><p className="px-1 pb-2 text-h3 font-semibold">Notifications</p><ul>{["Priya approved the Q2 plan", "Invoice INV-1041 is 12 days late", "New sign-in from Berlin"].map((n) => <li key={n}><a href="#" className="flex items-center gap-3 rounded-control p-2 hover:bg-action-ghost-hover"><span className="size-2 shrink-0 rounded-round bg-action-primary" /><span className="text-body">{n}</span></a></li>)}</ul></Popover>
        <Popover label="Account" width="w-[22rem]" trigger={<Avatar id="u1" name="Mia Moreno" size={40} />}>{() => <AccountPanel name="Mia Moreno" role="Finance operations" onCustomize={onCustomize} />}</Popover></div>
    </div></header>);
}
