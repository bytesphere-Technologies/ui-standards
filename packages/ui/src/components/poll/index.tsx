"use client";
import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component Poll @category feedback @use-when a quick vote. Results animate in after voting; one vote, changeable until closed. */
export function Poll({ question, options }: { question: string; options: [string, number][] }) {
  const [mine, setMine] = React.useState<number | null>(null); const tot = options.reduce((a, o) => a + o[1], 0) + (mine !== null ? 1 : 0);
  return <fieldset className="rounded-card border border-subtle bg-surface-raised p-4"><legend className="px-1 text-body font-semibold">{question}</legend><div className="mt-2 flex flex-col gap-2">{options.map(([t, n], i) => { const c = n + (mine === i ? 1 : 0); const pct = Math.round((c / tot) * 100); return <button key={t} type="button" aria-pressed={mine === i} onClick={() => setMine(mine === i ? null : i)} className={cn("relative h-11 overflow-hidden rounded-control border text-start transition-colors", mine === i ? "border-action-primary" : "border-subtle hover:border-strong")}>{mine !== null && <span className="absolute inset-y-0 start-0 bg-selected transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />}<span className="relative flex h-full items-center justify-between px-3 text-body"><span className="flex items-center gap-2">{mine === i && <Check className="size-4 text-link" aria-hidden />}{t}</span>{mine !== null && <span className="tnum text-secondary">{pct}%</span>}</span></button>; })}</div><p className="mt-2 text-body-sm text-secondary">{mine === null ? "Pick one to see results." : `${tot} votes. Tap again to remove yours.`}</p></fieldset>;
}
