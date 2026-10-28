"use client";
import { Card } from "../card";
import { cn } from "../../lib/cn";
import { Sparkline } from "../sparkline";

export function Stat({ label, value, delta, good, period, data, loading }: { label: string; value: string; delta: string; good: boolean; period: string; data?: number[]; loading?: boolean }) {
  if (loading) return <Card><div className="h-3.5 w-24 rounded-tag bg-surface-sunken m-pulse" /><div className="mt-3 h-8 w-32 rounded-tag bg-surface-sunken m-pulse" /><div className="mt-3 h-3.5 w-40 rounded-tag bg-surface-sunken m-pulse" /></Card>;
  return (
    <Card>
      <p className="text-body-sm text-secondary">{label}</p>
      <div className="mt-1.5 flex items-end justify-between gap-3"><p className="tnum text-[28px] font-semibold leading-9 tracking-[-0.02em]">{value}</p>{data && <Sparkline data={data} />}</div>
      <p className="mt-2 flex items-center gap-1.5 text-body-sm"><span className={cn("tnum font-medium", good ? "text-status-success-fg" : "text-status-danger-fg")}>{good ? "▲" : "▼"} {delta}</span><span className="text-tertiary">{period}</span></p>
    </Card>);
}
