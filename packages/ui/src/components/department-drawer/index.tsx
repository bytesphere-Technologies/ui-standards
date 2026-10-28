"use client";
import { type LucideIcon, User, X, ChevronRight, ChevronLeft, CircleHelp } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── DepartmentDrawer (drill-down) ───────── */
export type Department = { id: string; label: string; icon: LucideIcon; groups: { heading: string; links: string[] }[] };

export function DepartmentDrawer({ open, onClose, departments, trending = ["Best sellers", "New releases", "Movers and shakers"], greeting = "Hello, Mia" }: { open: boolean; onClose: () => void; departments: Department[]; trending?: string[]; greeting?: string }) {
  const [dep, setDep] = React.useState<string | null>(null); const [dir, setDir] = React.useState<"in" | "back">("in"); const first = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => { if (open) { setDep(null); setTimeout(() => first.current?.focus(), 50); const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k); } }, [open]);
  if (!open) return null; const d = departments.find((x) => x.id === dep);
  return (
    <div className="fixed inset-0 z-[60]"><div className="m-fade absolute inset-0 bg-scrim" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" aria-label="Shop by department" className="m-sheet-right absolute inset-y-0 start-0 flex w-[min(22rem,100vw)] flex-col bg-surface-overlay text-primary shadow-modal [animation-name:none]">
        <div className="flex h-14 shrink-0 items-center justify-between bg-[#21346E] px-4 text-white"><span className="flex items-center gap-2.5 text-body font-semibold"><span className="grid size-7 place-items-center rounded-round bg-white/15"><User className="size-4" /></span>{greeting}</span><button ref={first} type="button" aria-label="Close menu" onClick={onClose} className="grid size-9 place-items-center rounded-control hover:bg-white/10"><X className="size-5" /></button></div>
        <div key={dep ?? "root"} className={cn("min-h-0 flex-1 overflow-y-auto", dir === "in" ? "m-drill-in" : "m-drill-back")}>
          {!d ? <><p className="px-5 pt-5 pb-1 text-h4 font-semibold">Trending</p><ul>{trending.map((t) => <li key={t}><a href="#/store" className="flex h-11 items-center px-5 text-body hover:bg-action-ghost-hover">{t}</a></li>)}</ul>
            <p className="border-t border-subtle px-5 pt-5 pb-1 mt-2 text-h4 font-semibold">Shop by department</p><ul>{departments.map((x) => <li key={x.id}><button type="button" onClick={() => { setDir("in"); setDep(x.id); }} className="flex h-11 w-full items-center gap-3 px-5 text-start text-body hover:bg-action-ghost-hover"><x.icon className="size-[18px] text-tertiary" aria-hidden /><span className="flex-1">{x.label}</span><ChevronRight className="size-4 text-tertiary" aria-hidden /></button></li>)}</ul></>
            : <><button type="button" onClick={() => { setDir("back"); setDep(null); }} className="flex h-12 w-full items-center gap-2 border-b border-subtle px-5 text-start text-body font-medium hover:bg-action-ghost-hover"><ChevronLeft className="size-4" />Main menu</button><p className="px-5 pt-4 text-h3 font-semibold">{d.label}</p>
              {d.groups.map((g) => <div key={g.heading} className="mt-3"><p className="px-5 pb-1 text-body font-semibold">{g.heading}</p><ul>{g.links.map((l) => <li key={l}><a href="#/store" className="flex h-10 items-center px-5 text-body text-secondary hover:bg-action-ghost-hover hover:text-primary">{l}</a></li>)}</ul></div>)}<a href="#/store" className="m-4 mt-5 flex h-10 items-center justify-center rounded-control border border-action-secondary-border text-body font-medium hover:bg-action-secondary-hover">See all in {d.label}</a></>}
        </div>
        <div className="shrink-0 border-t border-subtle p-2"><a href="#" className="flex h-10 items-center gap-3 rounded-control px-3 text-body text-secondary hover:bg-action-ghost-hover"><CircleHelp className="size-4" />Help and settings</a></div>
      </div></div>);
}
