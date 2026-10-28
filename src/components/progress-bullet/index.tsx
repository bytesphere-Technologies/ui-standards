"use client";

export function ProgressBullet({ value, target, bands, label, unit = "" }: { value: number; target: number; bands: [number, number, number]; label: string; unit?: string }) {
  const max = bands[2];
  return <div role="img" aria-label={`${label}: ${value}${unit} against a target of ${target}${unit}`}><div className="relative h-5 overflow-hidden rounded-tag"><div className="absolute inset-y-0 start-0 bg-surface-sunken" style={{ width: `${(bands[2] / max) * 100}%` }} /><div className="absolute inset-y-0 start-0 bg-[var(--color-subtle)]" style={{ width: `${(bands[1] / max) * 100}%` }} /><div className="absolute inset-y-0 start-0 bg-[var(--color-strong)]/60" style={{ width: `${(bands[0] / max) * 100}%` }} /><div className="absolute inset-y-1.5 start-0 rounded-round bg-action-accent" style={{ width: `${(value / max) * 100}%` }} /><div className="absolute inset-y-0.5 w-0.5 bg-[var(--color-primary)]" style={{ insetInlineStart: `${(target / max) * 100}%` }} /></div><div className="tnum mt-1 flex justify-between text-caption text-secondary"><span>{value}{unit}</span><span>Target {target}{unit}</span></div></div>;
}
