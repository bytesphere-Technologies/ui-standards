"use client";
import { Search, Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { Input } from "../input";

/* ───────── Combobox (filterable listbox) ───────── */
export function Combobox({ id, options, value, onChange, placeholder = "Search…" }: { id: string; options: string[]; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [q, setQ] = React.useState(""); const [open, setOpen] = React.useState(false); const [i, setI] = React.useState(0); const ref = React.useRef<HTMLDivElement>(null);
  const res = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  React.useEffect(() => { const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", off); return () => document.removeEventListener("mousedown", off); }, []);
  return (
    <div ref={ref} className="relative">
      <Input id={id} role="combobox" aria-expanded={open} aria-controls={`${id}-l`} aria-autocomplete="list" aria-activedescendant={open && res[i] ? `${id}-o${i}` : undefined} start={<Search />} placeholder={placeholder} value={open ? q : value} autoComplete="off"
        onFocus={() => { setOpen(true); setQ(""); }} onChange={(e) => { setQ(e.target.value); setI(0); setOpen(true); }}
        onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setI((n) => Math.min(res.length - 1, n + 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setI((n) => Math.max(0, n - 1)); } if (e.key === "Enter" && res[i]) { e.preventDefault(); onChange(res[i]); setOpen(false); } if (e.key === "Escape") setOpen(false); }} />
      {open && <ul id={`${id}-l`} role="listbox" className="m-pop absolute z-20 mt-1.5 max-h-56 w-full overflow-y-auto rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown">
        {res.length === 0 && <li className="px-3 py-3 text-body text-secondary">No match for “{q}”.</li>}
        {res.map((o, n) => <li key={o} id={`${id}-o${n}`} role="option" aria-selected={o === value} onMouseDown={(e) => { e.preventDefault(); onChange(o); setOpen(false); }} className={cn("flex h-8 items-center justify-between rounded-[5px] px-2 text-body", n === i && "bg-action-ghost-hover")}>{o}{o === value && <Check className="size-4 text-link" aria-hidden />}</li>)}</ul>}
    </div>);
}
