"use client";
import { cn } from "../../lib/cn";

export function ColumnBars({ data, labels, height = 140, highlight }: { data: number[]; labels: string[]; height?: number; highlight?: number }) {
  const max = Math.max(...data);
  return <div className="flex items-end gap-2" style={{ height: height + 22 }} role="img" aria-label={labels.map((l, i) => `${l} ${data[i]}`).join(", ")}>{data.map((v, i) => <div key={i} className="flex h-full flex-1 flex-col items-center gap-1.5"><div className="flex w-full flex-1 items-end"><div className={cn("w-full rounded-t-tag transition-[height] duration-300", i === highlight ? "bg-action-primary" : "bg-action-primary/30")} style={{ height: `${(v / max) * 100}%` }} /></div><span className="text-caption text-tertiary">{labels[i]}</span></div>)}</div>;
}
