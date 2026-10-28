"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component KanbanDnD @category data @use-when cards move between columns. Drag between columns, or use the Move menu on each card (works on touch and keyboard). */
export type KCard = { id: string; title: string; meta?: string };

export function KanbanDnD({ columns, onChange }: { columns: { id: string; title: string; cards: KCard[] }[]; onChange: (c: { id: string; title: string; cards: KCard[] }[]) => void }) {
  const [drag, setDrag] = React.useState<{ id: string; from: string } | null>(null); const [over, setOver] = React.useState<string | null>(null); const [msg, setMsg] = React.useState("");
  const move = (cardId: string, from: string, to: string) => { if (from === to) return; const card = columns.find((c) => c.id === from)!.cards.find((c) => c.id === cardId)!; onChange(columns.map((c) => c.id === from ? { ...c, cards: c.cards.filter((x) => x.id !== cardId) } : c.id === to ? { ...c, cards: [...c.cards, card] } : c)); setMsg(`${card.title} moved to ${columns.find((c) => c.id === to)!.title}`); };
  return <><div className="grid gap-3 md:grid-cols-3">{columns.map((col) => <section key={col.id} aria-label={col.title} onDragOver={(e) => { e.preventDefault(); setOver(col.id); }} onDragLeave={() => setOver(null)} onDrop={() => { if (drag) move(drag.id, drag.from, col.id); setDrag(null); setOver(null); }} className={cn("flex min-h-40 flex-col gap-2 rounded-card border bg-surface-sunken p-2 transition-colors", over === col.id && drag?.from !== col.id ? "border-action-primary bg-selected/40" : "border-subtle")}>
    <h3 className="flex items-center justify-between px-2 pt-1 text-body-sm font-semibold">{col.title}<span className="tnum text-tertiary">{col.cards.length}</span></h3>
    {col.cards.map((c) => <article key={c.id} draggable onDragStart={() => setDrag({ id: c.id, from: col.id })} onDragEnd={() => { setDrag(null); setOver(null); }} className={cn("group cursor-grab rounded-control border border-subtle bg-surface-raised p-3 shadow-raised active:cursor-grabbing", drag?.id === c.id && "opacity-40")}><div className="flex items-start justify-between gap-2"><p className="text-body font-medium">{c.title}</p><label className="sr-only" htmlFor={`m-${c.id}`}>Move {c.title}</label><select id={`m-${c.id}`} value={col.id} onChange={(e) => move(c.id, col.id, e.target.value)} className="h-7 rounded-tag border border-subtle bg-transparent px-1 text-caption text-secondary">{columns.map((x) => <option key={x.id} value={x.id}>{x.title}</option>)}</select></div>{c.meta && <p className="mt-1 text-body-sm text-secondary">{c.meta}</p>}</article>)}
    {!col.cards.length && <p className="grid flex-1 place-items-center text-body-sm text-tertiary">Drop here</p>}</section>)}</div><p className="sr-only" role="status" aria-live="polite">{msg}</p></>;
}
