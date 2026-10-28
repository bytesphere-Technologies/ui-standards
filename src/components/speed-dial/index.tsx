"use client";
import { Plus } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component SpeedDial @category navigation @use-when one floating action expands into 3 to 5 related actions (mobile create menu). */
export function SpeedDial({ actions }: { actions: { label: string; icon: typeof Plus; onSelect?: () => void }[] }) {
  const [open, setOpen] = React.useState(false);
  return <div className="relative inline-flex flex-col items-end gap-3">{open && <ul className="flex flex-col items-end gap-2">{actions.map((a, i) => <li key={a.label} className="m-rise flex items-center gap-2" style={{ animationDelay: `${(actions.length - i) * 40}ms` }}><span className="rounded-tag bg-surface-raised px-2 py-1 text-body-sm shadow-dropdown">{a.label}</span><button type="button" aria-label={a.label} onClick={() => { a.onSelect?.(); setOpen(false); }} className="press grid size-11 place-items-center rounded-round border border-subtle bg-surface-raised text-link shadow-dropdown"><a.icon className="size-5" aria-hidden /></button></li>)}</ul>}
    <button type="button" aria-expanded={open} aria-label={open ? "Close actions" : "Open actions"} onClick={() => setOpen(!open)} className="press grid size-14 place-items-center rounded-round bg-action-primary text-action-primary-fg shadow-dropdown"><Plus className={cn("size-6 transition-transform duration-200", open && "rotate-45")} aria-hidden /></button></div>;
}
