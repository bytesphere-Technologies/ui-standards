"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export function DeterminateRing({ value, size = 64, stroke = 6, label, className, name = "Progress" }: { name?: string; value: number; size?: number; stroke?: number; label?: React.ReactNode; className?: string }) {
  const r = (size - stroke) / 2; const len = 2 * Math.PI * r;
  return (<span role="progressbar" aria-label={name} aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100} className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
    <svg width={size} height={size} className="-rotate-90"><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-subtle)" strokeWidth={stroke} /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-action-primary)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - value / 100)} style={{ transition: "stroke-dashoffset 400ms var(--ease-enter)" }} /></svg>
    <span className="tnum absolute text-body-sm font-semibold">{label ?? `${Math.round(value)}%`}</span></span>);
}
