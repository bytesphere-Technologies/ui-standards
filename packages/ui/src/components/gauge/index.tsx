"use client";

/** @component Gauge @category data @use-when one value against a range (CPU, capacity, score). Animated needle arc with thresholds. */
export function Gauge({ value, label, max = 100 }: { value: number; label: string; max?: number }) {
  const p = Math.max(0, Math.min(1, value / max)); const R = 54; const len = Math.PI * R; const tone = p > 0.85 ? "var(--color-status-danger-fg)" : p > 0.65 ? "var(--color-status-warning-fg)" : "var(--color-action-primary)";
  return <div role="img" aria-label={`${label}: ${value} of ${max}`} className="relative w-40"><svg viewBox="0 0 130 74" className="w-full"><path d="M11 65a54 54 0 0 1 108 0" fill="none" stroke="var(--color-subtle)" strokeWidth="10" strokeLinecap="round" /><path d="M11 65a54 54 0 0 1 108 0" fill="none" stroke={tone} strokeWidth="10" strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - p)} style={{ transition: "stroke-dashoffset 600ms var(--ease-enter), stroke 300ms" }} /></svg><div className="absolute inset-x-0 bottom-0 text-center"><p className="tnum text-h3 font-semibold leading-6">{value}</p><p className="text-caption text-secondary">{label}</p></div></div>;
}
