"use client";
import { type LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { ProgressBar } from "../progress-bar";
import { ProgressRing } from "../progress-ring";
import { Sparkline } from "../sparkline";

/**
 * DATA KIT
 * @category data
 * StatTile       8 styles: plain · spark · icon · bar · delta-badge · split · ring · inverse
 * Progress*      linear (4 sizes) · segmented · steps · stacked · ring · half-ring · bullet · goal · buffer · indeterminate
 * SkeletonKit    12 shapes x 4 animations (pulse · wave · static · mark)
 * Heatmap / Funnel / StackedBars / ColumnBars    chart extras
 */

/* ───────── Stat tiles ───────── */
export type StatStyle = "plain" | "spark" | "icon" | "bar" | "delta" | "split" | "ring" | "inverse";

export function StatTile({ style = "plain", label, value, delta, good = true, period = "vs. last 30 days", icon: I, data, pct, target, className }: { style?: StatStyle; label: string; value: string; delta?: string; good?: boolean; period?: string; icon?: LucideIcon; data?: number[]; pct?: number; target?: string; className?: string }) {
  const Delta = () => delta ? <span className={cn("tnum inline-flex items-center gap-0.5 text-body-sm font-medium", good ? "text-status-success-fg" : "text-status-danger-fg")}>{good ? <ArrowUpRight className="size-3.5" aria-hidden /> : <ArrowDownRight className="size-3.5" aria-hidden />}{delta}</span> : null;
  const base = cn("rounded-card border p-5", style === "inverse" ? "border-white/10 bg-action-accent text-action-accent-fg" : "border-subtle bg-surface-raised", className);
  if (style === "icon") return <div className={cn(base, "flex items-start gap-4")}>{I && <span className="grid size-11 shrink-0 place-items-center rounded-control bg-selected text-link"><I className="size-5" aria-hidden /></span>}<div><p className="text-body-sm text-secondary">{label}</p><p className="tnum text-[24px] font-semibold leading-8 tracking-[-0.02em]">{value}</p><p className="mt-0.5 flex items-center gap-1.5"><Delta /><span className="text-caption text-tertiary">{period}</span></p></div></div>;
  if (style === "spark") return <div className={base}><p className="text-body-sm text-secondary">{label}</p><div className="mt-1 flex items-end justify-between gap-3"><p className="tnum text-[28px] font-semibold leading-9 tracking-[-0.02em]">{value}</p>{data && <Sparkline data={data} />}</div><p className="mt-2 flex items-center gap-1.5"><Delta /><span className="text-caption text-tertiary">{period}</span></p></div>;
  if (style === "bar") return <div className={base}><div className="flex items-baseline justify-between"><p className="text-body-sm text-secondary">{label}</p><p className="tnum text-body-sm text-tertiary">{target}</p></div><p className="tnum mt-1 text-[28px] font-semibold leading-9 tracking-[-0.02em]">{value}</p><div className="mt-3"><ProgressBar value={pct ?? 60} label={label} size="sm" /></div></div>;
  if (style === "delta") return <div className={base}><div className="flex items-center justify-between"><p className="text-body-sm text-secondary">{label}</p>{delta && <span className={cn("tnum rounded-tag px-1.5 py-0.5 text-caption font-semibold", good ? "bg-status-success-bg text-status-success-fg" : "bg-status-danger-bg text-status-danger-fg")}>{good ? "+" : "−"}{delta}</span>}</div><p className="tnum mt-2 text-[32px] font-semibold leading-10 tracking-[-0.02em]">{value}</p><p className="text-caption text-tertiary">{period}</p></div>;
  if (style === "split") return <div className={cn(base, "grid grid-cols-2 divide-x divide-[var(--color-subtle)] !p-0")}><div className="p-5"><p className="text-body-sm text-secondary">{label}</p><p className="tnum text-[24px] font-semibold leading-8">{value}</p></div><div className="p-5"><p className="text-body-sm text-secondary">Change</p><p className="mt-1"><Delta /></p><p className="text-caption text-tertiary">{period}</p></div></div>;
  if (style === "ring") return <div className={cn(base, "flex items-center gap-4")}><ProgressRing value={pct ?? 70} size={64} label={label} /><div><p className="text-body-sm text-secondary">{label}</p><p className="tnum text-[24px] font-semibold leading-8">{value}</p><p className="text-caption text-tertiary">{period}</p></div></div>;
  if (style === "inverse") return <div className={base}><p className="text-body-sm opacity-90">{label}</p><p className="tnum mt-1 text-[32px] font-semibold leading-10 tracking-[-0.02em]">{value}</p><p className="mt-1 text-body-sm opacity-90">{delta && <span className="font-medium">{good ? "▲" : "▼"} {delta}</span>} {period}</p></div>;
  return <div className={base}><p className="text-body-sm text-secondary">{label}</p><p className="tnum mt-1 text-[28px] font-semibold leading-9 tracking-[-0.02em]">{value}</p><p className="mt-1 flex items-center gap-1.5"><Delta /><span className="text-caption text-tertiary">{period}</span></p></div>;
}
