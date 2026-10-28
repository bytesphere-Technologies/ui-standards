"use client";
import { type LucideIcon, Search } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── PlatformBar (Meta-style) + AppLauncher + AccountPanel ───────── */
export type LauncherApp = { id: string; label: string; icon: LucideIcon; tone: "azure" | "navy" | "tint" | "ink" };

const tile = { azure: "bg-action-primary text-action-primary-fg", navy: "bg-action-accent text-action-accent-fg", tint: "bg-selected text-link", ink: "bg-[#000913] text-white" };

export function AppLauncher({ apps, create }: { apps: LauncherApp[]; create: { label: string; icon: LucideIcon }[] }) {
  const [q, setQ] = React.useState(""); const list = apps.filter((a) => a.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="p-1"><h2 className="px-1 pb-2 text-h3 font-semibold">Menu</h2>
      <div className="grid gap-3 sm:grid-cols-[1fr_9rem]"><div className="rounded-card bg-surface-sunken p-3"><label className="flex items-center gap-2 rounded-round bg-surface-raised px-3"><Search className="size-4 text-tertiary" aria-hidden /><input aria-label="Search menu" placeholder="Search menu" value={q} onChange={(e) => setQ(e.target.value)} className="h-9 flex-1 bg-transparent text-body outline-none placeholder:text-placeholder" /></label>
        <p className="mt-3 px-1 text-body font-semibold">Products</p>{list.length === 0 ? <p className="px-1 py-6 text-center text-body-sm text-secondary">No product named “{q}”.</p> : <ul className="mt-2 grid grid-cols-3 gap-2">{list.map((a) => <li key={a.id}><a href="#" className="flex flex-col items-center gap-1.5 rounded-control p-2 text-center hover:bg-action-ghost-hover"><span className={cn("grid size-11 place-items-center rounded-control", tile[a.tone])}><a.icon className="size-5" aria-hidden /></span><span className="text-body-sm font-medium leading-tight">{a.label}</span></a></li>)}</ul>}</div>
        <div><p className="px-1 pb-2 text-body font-semibold">Create</p><ul>{create.map((c) => <li key={c.label}><a href="#" className="flex h-10 items-center gap-2.5 rounded-control px-2 text-body hover:bg-action-ghost-hover"><span className="grid size-8 place-items-center rounded-round bg-surface-sunken"><c.icon className="size-4" aria-hidden /></span>{c.label}</a></li>)}</ul></div></div></div>);
}
