"use client";
import * as React from "react";

/* ───────── Illustrations: one style. 1.5px strokes, neutral lines, one azure tint. 160×120 ───────── */
const ill = (children: React.ReactNode) => (
  <svg width="160" height="120" viewBox="0 0 160 120" fill="none" aria-hidden className="text-control" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{children}</svg>);

const tint = "var(--color-selected)";

export const Art = {
  folder: () => ill(<><rect x="24" y="34" width="112" height="68" rx="8" fill="var(--color-surface-raised)" /><path d="M24 46V30a6 6 0 0 1 6-6h28l10 10h62a6 6 0 0 1 6 6v6" fill={tint} /><path d="M70 68h20M80 58v20" stroke="var(--t-color-brand-mark-b)" /></>),
  search: () => ill(<><circle cx="72" cy="56" r="28" fill={tint} /><path d="M92 76l24 24" strokeWidth="3" stroke="var(--t-color-brand-mark-b)" /><path d="M60 52h24M60 62h14" /></>),
  inbox: () => ill(<><path d="M26 70l16-34h76l16 34v26a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6z" fill="var(--color-surface-raised)" /><path d="M26 70h36l6 12h24l6-12h36" fill={tint} /></>),
  cloud: () => ill(<><path d="M46 92a22 22 0 0 1 2-44 30 30 0 0 1 58 6 19 19 0 0 1-2 38z" fill={tint} /><path d="M66 62l28 28M94 62L66 90" stroke="var(--t-color-brand-mark-b)" /></>),
  lock: () => ill(<><rect x="44" y="52" width="72" height="52" rx="8" fill={tint} /><path d="M58 52V40a22 22 0 0 1 44 0v12" /><circle cx="80" cy="78" r="5" stroke="var(--t-color-brand-mark-b)" /><path d="M80 83v8" stroke="var(--t-color-brand-mark-b)" /></>),
  chart: () => ill(<><rect x="26" y="24" width="108" height="76" rx="8" fill="var(--color-surface-raised)" /><path d="M42 84V68M62 84V52M82 84V60M102 84V40M122 84V56" stroke="var(--t-color-brand-mark-b)" strokeWidth="5" /><path d="M36 90h96" /></>),
  plug: () => ill(<><rect x="52" y="44" width="56" height="40" rx="8" fill={tint} /><path d="M68 44V28M92 44V28M80 84v14" /><path d="M80 98c0 10-16 6-16 16" stroke="var(--t-color-brand-mark-b)" /></>),
};
