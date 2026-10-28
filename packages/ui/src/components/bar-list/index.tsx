"use client";

export function BarList({ items, max, fmt = (v: number) => String(v) }: { items: [string, number][]; max: number; fmt?: (v: number) => string }) {
  return (
    <ul className="flex flex-col gap-3">{items.map(([n, v]) => (
      <li key={n} className="grid grid-cols-[6rem_1fr_3.5rem] items-center gap-3 text-body"><span className="truncate text-secondary">{n}</span><span className="h-2 overflow-hidden rounded-round bg-surface-sunken"><span className="block h-full rounded-round bg-data-1" style={{ width: `${(v / max) * 100}%` }} /></span><span className="tnum text-end font-medium">{fmt(v)}</span></li>))}</ul>);
}
