"use client";
import { TrendingUp, Clock } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { Product, usd } from "../../lib/commerce-shared";
import { ProductArt } from "../product-art";

/* ───────── Typeahead (marketplace search) ───────── */
export function Typeahead({ products, recent = ["wireless headphones", "desk lamp"], categories = ["Electronics", "Home", "Outdoor"], onPick }: { products: Product[]; recent?: string[]; categories?: string[]; onPick?: (q: string) => void }) {
  const [q, setQ] = React.useState(""); const [open, setOpen] = React.useState(false); const [i, setI] = React.useState(-1); const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; document.addEventListener("mousedown", off); return () => document.removeEventListener("mousedown", off); }, []);
  const sugg = q ? ["headphones", "headphones wireless", "headphone stand", "headphones for running"].filter((s) => s.startsWith(q.toLowerCase()) || q.length < 3) : [];
  const prods = q ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 3) : [];
  const rows = q ? sugg : recent;
  return (
    <div ref={ref} className="relative">
      <input role="combobox" aria-expanded={open} aria-controls="ta-list" aria-autocomplete="list" aria-label="Search products" value={q} placeholder="Search products, brands and categories" onFocus={() => setOpen(true)} onChange={(e) => { setQ(e.target.value); setOpen(true); setI(-1); }}
        onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setI((n) => Math.min(rows.length - 1, n + 1)); } if (e.key === "ArrowUp") { e.preventDefault(); setI((n) => Math.max(-1, n - 1)); } if (e.key === "Enter") { onPick?.(i >= 0 ? rows[i] : q); setOpen(false); } if (e.key === "Escape") setOpen(false); }} className="h-11 w-full bg-surface-raised px-3 text-body text-primary outline-none placeholder:text-placeholder" />
      {open && <div id="ta-list" role="listbox" className="m-pop absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-card border border-subtle bg-surface-overlay text-primary shadow-modal">
        <p className="px-3 pt-3 text-caption font-medium text-tertiary">{q ? "Suggestions" : "Recent searches"}</p>
        <ul className="p-1.5">{rows.map((s, n) => <li key={s} role="option" aria-selected={n === i}><button type="button" onMouseDown={(e) => { e.preventDefault(); setQ(s); onPick?.(s); setOpen(false); }} className={cn("flex h-9 w-full items-center gap-2.5 rounded-control px-2 text-start text-body hover:bg-action-ghost-hover", n === i && "bg-action-ghost-hover")}>{q ? <TrendingUp className="size-4 text-tertiary" /> : <Clock className="size-4 text-tertiary" />}<span><b className="font-semibold">{q && s.startsWith(q.toLowerCase()) ? s.slice(0, q.length) : ""}</b>{q && s.startsWith(q.toLowerCase()) ? s.slice(q.length) : s}</span></button></li>)}</ul>
        {q && <><p className="border-t border-subtle px-3 pt-3 text-caption font-medium text-tertiary">In categories</p><ul className="flex flex-wrap gap-1.5 p-3">{categories.map((c) => <li key={c}><button type="button" className="rounded-control border border-subtle px-2.5 py-1 text-body-sm hover:bg-action-ghost-hover">{q} in <b className="font-medium">{c}</b></button></li>)}</ul></>}
        {prods.length > 0 && <><p className="border-t border-subtle px-3 pt-3 text-caption font-medium text-tertiary">Products</p><ul className="p-1.5">{prods.map((p) => <li key={p.id}><a href="#/store/product" className="flex items-center gap-3 rounded-control p-1.5 hover:bg-action-ghost-hover"><ProductArt kind={p.kind} tone={p.tone} className="size-10 rounded-control" /><span className="min-w-0 flex-1 truncate text-body">{p.name}</span><span className="tnum text-body font-medium">{usd.format(p.price)}</span></a></li>)}</ul></>}
      </div>}
    </div>);
}
