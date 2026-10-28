"use client";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { Button } from "../button";

/** @component SplitButton @category forms @use-when one default action plus a few alternatives (Save, Save and close). */
export function SplitButton({ label, onClick, options }: { label: string; onClick?: () => void; options: { label: string; onSelect?: () => void }[] }) {
  const [open, setOpen] = React.useState(false); const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { if (!open) return; const f = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false); document.addEventListener("mousedown", f); document.addEventListener("keydown", k); return () => { document.removeEventListener("mousedown", f); document.removeEventListener("keydown", k); }; }, [open]);
  return <div ref={ref} className="relative inline-flex"><Button variant="primary" className="rounded-e-none" onClick={onClick}>{label}</Button><Button variant="primary" className="rounded-s-none border-s border-white/25" aria-label="More options" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}><ChevronDown /></Button>{open && <ul role="menu" className="m-pop absolute end-0 top-full z-40 mt-1 min-w-44 rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown">{options.map((o) => <li key={o.label}><button role="menuitem" type="button" className="flex h-9 w-full items-center rounded-control px-3 text-start text-body hover:bg-action-ghost-hover" onClick={() => { o.onSelect?.(); setOpen(false); }}>{o.label}</button></li>)}</ul>}</div>;
}
