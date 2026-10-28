"use client";
import * as React from "react";
import { PTone } from "../../lib/data-kit-shared";

export function ProgressRing({ value, size = 72, stroke = 7, label, tone = "primary", center }: { value: number; size?: number; stroke?: number; label: string; tone?: PTone; center?: React.ReactNode }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r; const col = { primary: "var(--color-action-primary)", success: "var(--color-status-success-solid)", warning: "var(--color-status-warning-solid)", danger: "var(--color-status-danger-solid)", navy: "var(--color-mark-a)" }[tone];
  return <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} className="relative inline-grid place-items-center" style={{ width: size, height: size }}><svg width={size} height={size} className="-rotate-90" aria-hidden><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-surface-sunken)" strokeWidth={stroke} /><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} style={{ transition: "stroke-dashoffset 400ms cubic-bezier(.2,0,0,1)" }} /></svg><span className="tnum absolute text-body-sm font-semibold">{center ?? `${Math.round(value)}%`}</span></div>;
}
