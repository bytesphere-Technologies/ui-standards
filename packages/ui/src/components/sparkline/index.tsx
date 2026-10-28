"use client";

/* ───────── Stat tile ───────── */
export function Sparkline({ data, color = "var(--color-data-1)", w = 88, h = 28 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 3 - ((v - min) / (max - min || 1)) * (h - 6)}`).join(" ");
  return <svg aria-hidden width={w} height={h}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" /></svg>;
}
