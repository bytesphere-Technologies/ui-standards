"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../button";
import { cn } from "../../lib/cn";

/* ───────── Pagination ───────── */
export function Pagination({ page, pages, total, size, onPage, onSize }: { page: number; pages: number; total: number; size: number; onPage: (p: number) => void; onSize?: (s: number) => void }) {
  const list: (number | "…")[] = []; for (let i = 1; i <= pages; i++) if (i === 1 || i === pages || Math.abs(i - page) <= 1) list.push(i); else if (list[list.length - 1] !== "…") list.push("…");
  const from = (page - 1) * size + 1, to = Math.min(total, page * size);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-subtle px-4 py-2.5 text-body-sm text-secondary">
      <span className="tnum">{from}–{to} of {total.toLocaleString("en-US")}</span>
      <div className="flex items-center gap-4">
        {onSize && <label className="flex items-center gap-2">Rows<select value={size} onChange={(e) => onSize(+e.target.value)} className="h-7 rounded-control border border-control bg-input px-1.5 text-body-sm text-primary">{[25, 50, 100].map((s) => <option key={s}>{s}</option>)}</select></label>}
        <nav aria-label="Pagination" className="flex items-center gap-0.5">
          <Button size="icon-sm" variant="ghost" aria-label="Previous page" reason={page === 1 ? "You're on the first page" : undefined} onClick={() => onPage(page - 1)}><ChevronLeft /></Button>
          {list.map((p, i) => p === "…" ? <span key={`e${i}`} className="px-1 text-tertiary">…</span> : <button key={`n${p}`} aria-label={`Page ${p}`} aria-current={p === page ? "page" : undefined} onClick={() => onPage(p)} className={cn("tnum size-8 rounded-control text-body-sm font-medium hover:bg-action-ghost-hover", p === page && "bg-selected text-primary")}>{p}</button>)}
          <Button size="icon-sm" variant="ghost" aria-label="Next page" reason={page === pages ? "You're on the last page" : undefined} onClick={() => onPage(page + 1)}><ChevronRight /></Button>
        </nav>
      </div>
    </div>);
}
