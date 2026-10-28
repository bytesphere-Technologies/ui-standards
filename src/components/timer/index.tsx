"use client";
import { Pause, Play, RotateCcw } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";

/** @component Timer @category data @use-when a stopwatch or countdown (shift timer, session limit, OTP resend). Start, pause, reset; announces only at the end. */
export function Timer({ from = 90, countdown = true }: { from?: number; countdown?: boolean }) {
  const [t, setT] = React.useState(countdown ? from : 0); const [on, setOn] = React.useState(false);
  React.useEffect(() => { if (!on) return; const i = setInterval(() => setT((x) => (countdown ? Math.max(0, x - 1) : x + 1)), 1000); return () => clearInterval(i); }, [on, countdown]);
  React.useEffect(() => { if (countdown && t === 0) setOn(false); }, [t, countdown]);
  const mm = String(Math.floor(t / 60)).padStart(2, "0"); const ss = String(t % 60).padStart(2, "0"); const done = countdown && t === 0;
  return <div className="inline-flex items-center gap-4 rounded-card border border-subtle bg-surface-raised p-4"><span className={cn("tnum font-mono text-[32px] font-semibold leading-10", done && "text-status-danger-fg")} role="timer" aria-label={`${mm} minutes ${ss} seconds`}>{mm}:{ss}</span><div className="flex gap-1.5"><Button size="icon" aria-label={on ? "Pause" : "Start"} variant="primary" disabled={done} onClick={() => setOn(!on)}>{on ? <Pause /> : <Play />}</Button><Button size="icon" aria-label="Reset" onClick={() => { setOn(false); setT(countdown ? from : 0); }}><RotateCcw /></Button></div><span className="sr-only" role="status">{done ? "Time is up" : ""}</span></div>;
}
