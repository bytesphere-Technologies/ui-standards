"use client";
import { GripVertical } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component SortableList @category data @use-when the user orders items by hand. Drag handle plus Alt+Arrow keys, and an announcement for screen readers. */
export function SortableList<T extends { id: string | number }>({ items, onChange, render }: { items: T[]; onChange: (n: T[]) => void; render: (t: T, i: number) => React.ReactNode }) {
  const [drag, setDrag] = React.useState<number | null>(null); const [over, setOver] = React.useState<number | null>(null); const [msg, setMsg] = React.useState("");
  const move = (from: number, to: number) => { if (to < 0 || to >= items.length || from === to) return; const a = [...items]; const [x] = a.splice(from, 1); a.splice(to, 0, x); onChange(a); setMsg(`Moved to position ${to + 1} of ${items.length}`); };
  return <><ul className="divide-y divide-[var(--color-subtle)] rounded-card border border-subtle bg-surface-raised">{items.map((t, i) => <li key={t.id} draggable onDragStart={() => setDrag(i)} onDragOver={(e) => { e.preventDefault(); setOver(i); }} onDragEnd={() => { if (drag !== null && over !== null) move(drag, over); setDrag(null); setOver(null); }} className={cn("flex items-center gap-3 px-3 py-2.5 transition-colors", drag === i && "opacity-40", over === i && drag !== null && drag !== i && "bg-selected")}>
    <button type="button" aria-label="Reorder. Alt plus arrow keys to move" onKeyDown={(e) => { if (e.altKey && e.key === "ArrowUp") { e.preventDefault(); move(i, i - 1); } if (e.altKey && e.key === "ArrowDown") { e.preventDefault(); move(i, i + 1); } }} className="grid size-8 cursor-grab place-items-center rounded-control text-tertiary hover:bg-action-ghost-hover active:cursor-grabbing"><GripVertical className="size-4" aria-hidden /></button><div className="min-w-0 flex-1">{render(t, i)}</div></li>)}</ul><p className="sr-only" role="status" aria-live="polite">{msg}</p></>;
}
