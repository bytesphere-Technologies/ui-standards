"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";

/** @component DateRangePicker @category forms @use-when choosing a start and end date, with presets. */
export function DateRangePicker({ onChange }: { onChange?: (r: { from: number; to: number } | null) => void }) {
  const [a, setA] = React.useState<number | null>(null); const [b, setB] = React.useState<number | null>(null); const [h, setH] = React.useState<number | null>(null);
  const off = 6; const days = Array.from({ length: 42 }, (_, i) => i - off + 1); const lo = a !== null ? Math.min(a, b ?? h ?? a) : null; const hi = a !== null ? Math.max(a, b ?? h ?? a) : null;
  const pick = (d: number) => { if (a === null || b !== null) { setA(d); setB(null); onChange?.(null); } else { setB(d); onChange?.({ from: Math.min(a, d), to: Math.max(a, d) }); } };
  const preset = (f: number, t: number) => { setA(f); setB(t); onChange?.({ from: f, to: t }); };
  return (
    <div className="w-full max-w-xs rounded-card border border-subtle bg-surface-raised p-3">
      <div className="mb-2 flex items-center justify-between"><span className="text-body font-semibold">March 2026</span><span className="flex"><Button size="icon-sm" variant="ghost" aria-label="Previous month"><ChevronLeft /></Button><Button size="icon-sm" variant="ghost" aria-label="Next month"><ChevronRight /></Button></span></div>
      <div className="grid grid-cols-7 text-center text-caption text-tertiary">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="py-1">{d}</span>)}</div>
      <div className="grid grid-cols-7" onMouseLeave={() => setH(null)}>{days.map((d, i) => { const ok = d >= 1 && d <= 31; const inR = ok && lo !== null && hi !== null && d >= lo && d <= hi; const end = d === lo || d === hi; return <button key={i} type="button" disabled={!ok} onMouseEnter={() => ok && setH(d)} onClick={() => pick(d)} aria-pressed={inR} className={cn("tnum h-9 text-body-sm transition-colors duration-100", !ok && "invisible", inR && !end && "bg-selected text-link", end && "rounded-control bg-action-primary font-semibold text-action-primary-fg", !inR && ok && "rounded-control hover:bg-action-ghost-hover")}>{ok ? d : ""}</button>; })}</div>
      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-subtle pt-3">{[["Last 7 days", 12, 18], ["This week", 16, 22], ["Last 30 days", 1, 18]].map(([l, f, t]) => <Button key={l as string} size="sm" onClick={() => preset(f as number, t as number)}>{l as string}</Button>)}</div>
      <p className="mt-2 text-body-sm text-secondary" aria-live="polite">{a !== null && b !== null ? `${Math.min(a, b)} to ${Math.max(a, b)} March · ${Math.abs(b - a) + 1} days` : a !== null ? "Pick an end date" : "Pick a start date"}</p>
    </div>);
}
