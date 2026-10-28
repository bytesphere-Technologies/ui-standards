"use client";
import { ThumbsUp, Heart, PartyPopper } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component ReactionBar @category forms @use-when lightweight feedback on a post or comment. Icons, not emoji. Count pops on toggle. */
export function ReactionBar({ initial = { like: 12, love: 3, cheer: 5 } }: { initial?: Record<string, number> }) {
  const defs = [["like", ThumbsUp, "Like"], ["love", Heart, "Love"], ["cheer", PartyPopper, "Celebrate"]] as const; const [mine, setMine] = React.useState<Record<string, boolean>>({}); const [c, setC] = React.useState(initial);
  return <div className="inline-flex gap-1.5">{defs.map(([k, I, l]) => <button key={k} type="button" aria-pressed={!!mine[k]} aria-label={`${l}, ${c[k]}`} onClick={() => { setMine({ ...mine, [k]: !mine[k] }); setC({ ...c, [k]: c[k] + (mine[k] ? -1 : 1) }); }} className={cn("press inline-flex h-8 items-center gap-1.5 rounded-round border px-3 text-body-sm transition-colors", mine[k] ? "border-action-primary bg-selected text-link" : "border-subtle hover:border-strong")}><I className={cn("size-4", mine[k] && "m-heartbeat")} aria-hidden /><span key={c[k]} className="tnum m-count-pop">{c[k]}</span></button>)}</div>;
}
