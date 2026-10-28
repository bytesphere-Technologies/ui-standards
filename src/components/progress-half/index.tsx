"use client";

export function ProgressHalf({ value, label, size = 160, caption }: { value: number; label: string; size?: number; caption?: string }) {
  const r = size / 2 - 10, c = Math.PI * r;
  return <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} className="relative" style={{ width: size, height: size / 2 + 12 }}><svg width={size} height={size / 2 + 10} aria-hidden><path d={`M10 ${size / 2} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2}`} fill="none" stroke="var(--color-surface-sunken)" strokeWidth="12" strokeLinecap="round" /><path d={`M10 ${size / 2} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2}`} fill="none" stroke="var(--color-action-primary)" strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} style={{ transition: "stroke-dashoffset 400ms cubic-bezier(.2,0,0,1)" }} /></svg><div className="absolute inset-x-0 bottom-0 text-center"><p className="tnum text-h3 font-semibold leading-6">{value}%</p>{caption && <p className="text-caption text-secondary">{caption}</p>}</div></div>;
}
