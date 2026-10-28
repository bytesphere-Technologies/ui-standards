"use client";
import { Pause, Play, ArrowLeftRight } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { StatusPill } from "../status-pill";

/** @component LiveChart @category data @use-when a metric streaming in (requests per second, scans per minute). Rolling 40-point window, pause button, last value announced politely every 10 s. */
export function LiveChart({ label = "Requests per second", base = 60 }: { label?: string; base?: number }) {
  const [pts, setPts] = React.useState(() => Array.from({ length: 40 }, (_, i) => base + Math.sin(i / 3) * 12)); const [on, setOn] = React.useState(true);
  React.useEffect(() => { if (!on) return; const t = setInterval(() => setPts((p) => [...p.slice(1), Math.max(8, p[p.length - 1] + (Math.random() - 0.5) * 16)]), 700); return () => clearInterval(t); }, [on]);
  const mx = Math.max(...pts) + 6; const mn = Math.min(...pts) - 6; const d = pts.map((v, i) => `${i ? "L" : "M"}${(i / 39) * 300},${60 - ((v - mn) / (mx - mn)) * 56}`).join("");
  return <div className="rounded-card border border-subtle bg-surface-raised p-4"><div className="flex items-start justify-between"><div><p className="text-body-sm text-secondary">{label}</p><p className="tnum text-h3 font-semibold">{Math.round(pts[39])}</p></div><Button size="sm" onClick={() => setOn(!on)}>{on ? <><Pause />Pause</> : <><Play />Resume</>}</Button></div><svg viewBox="0 0 300 64" role="img" aria-label={`${label}, latest ${Math.round(pts[39])}`} className="mt-2 h-16 w-full"><path d={`${d}L300,64L0,64Z`} fill="var(--color-action-primary)" opacity=".1" /><path d={d} fill="none" stroke="var(--color-action-primary)" strokeWidth="2" strokeLinejoin="round" /><circle cx="300" cy={60 - ((pts[39] - mn) / (mx - mn)) * 56} r="3.5" fill="var(--color-action-primary)" /></svg></div>;
}

export const _lab2 = { StatusPill, ArrowLeftRight };
