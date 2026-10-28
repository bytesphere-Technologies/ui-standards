"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Small pieces ───────── */
export function DescList({ items, cols = 1 }: { items: [string, React.ReactNode][]; cols?: 1 | 2 }) {
  return <dl className={cn("grid gap-x-8 gap-y-3 text-body", cols === 2 ? "sm:grid-cols-2" : "")}>{items.map(([k, v]) => <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-3"><dt className="text-secondary">{k}</dt><dd className="min-w-0 text-primary">{v}</dd></div>)}</dl>;
}
