"use client";

export function ProgressBuffer({ played, buffered, label }: { played: number; buffered: number; label: string }) {
  return <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={played} className="relative h-2 overflow-hidden rounded-round bg-surface-sunken"><div className="absolute inset-y-0 start-0 bg-[var(--color-strong)]/50" style={{ width: `${buffered}%` }} /><div className="absolute inset-y-0 start-0 rounded-round bg-action-primary" style={{ width: `${played}%` }} /></div>;
}
