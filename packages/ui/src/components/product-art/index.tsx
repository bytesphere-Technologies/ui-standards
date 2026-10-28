"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export type ArtKind = "bottle" | "headphones" | "chair" | "lamp" | "bag" | "watch";

export type ArtTone = "tint" | "navy" | "azure" | "sunken";

const tones: Record<ArtTone, { bg: string; a: string; b: string; c: string }> = {
  tint: { bg: "var(--color-selected)", a: "var(--t-color-brand-mark-a)", b: "var(--t-color-brand-mark-b)", c: "var(--color-surface-raised)" },
  navy: { bg: "#21346E", a: "#FFFFFF", b: "#65ABE2", c: "#A6B4DD" },
  azure: { bg: "#116CB3", a: "#FFFFFF", b: "#DBE7F7", c: "#21346E" },
  sunken: { bg: "var(--color-surface-sunken)", a: "var(--color-control)", b: "var(--t-color-brand-mark-b)", c: "var(--color-surface-raised)" },
};

export function ProductArt({ kind, tone = "tint", className, label }: { kind: ArtKind; tone?: ArtTone; className?: string; label?: string }) {
  const t = tones[tone];
  const g: Record<ArtKind, React.ReactNode> = {
    bottle: <><rect x="78" y="18" width="24" height="16" rx="4" fill={t.a} /><path d="M72 36h36v14c14 8 18 22 18 38v44a10 10 0 0 1-10 10H64a10 10 0 0 1-10-10V88c0-16 4-30 18-38z" fill={t.b} /><rect x="64" y="88" width="52" height="30" rx="4" fill={t.c} /></>,
    headphones: <><path d="M52 98V86a38 38 0 0 1 76 0v12" fill="none" stroke={t.a} strokeWidth="9" strokeLinecap="round" /><rect x="40" y="94" width="26" height="42" rx="10" fill={t.b} /><rect x="114" y="94" width="26" height="42" rx="10" fill={t.b} /><rect x="48" y="104" width="10" height="22" rx="5" fill={t.c} /><rect x="122" y="104" width="10" height="22" rx="5" fill={t.c} /></>,
    chair: <><rect x="56" y="30" width="68" height="56" rx="10" fill={t.b} /><rect x="48" y="86" width="84" height="22" rx="8" fill={t.a} /><path d="M60 108l-8 36M120 108l8 36M90 108v36" stroke={t.a} strokeWidth="8" strokeLinecap="round" /><rect x="64" y="40" width="52" height="8" rx="4" fill={t.c} /></>,
    lamp: <><path d="M64 28h52l16 56H48z" fill={t.b} /><rect x="86" y="84" width="8" height="52" fill={t.a} /><ellipse cx="90" cy="142" rx="30" ry="7" fill={t.a} /><path d="M72 40h36" stroke={t.c} strokeWidth="6" strokeLinecap="round" /></>,
    bag: <><path d="M64 56c0-18 6-30 26-30s26 12 26 30" fill="none" stroke={t.a} strokeWidth="8" strokeLinecap="round" /><path d="M46 56h88l8 82a8 8 0 0 1-8 9H46a8 8 0 0 1-8-9z" fill={t.b} /><rect x="62" y="86" width="56" height="14" rx="7" fill={t.c} /></>,
    watch: <><rect x="70" y="14" width="40" height="34" rx="6" fill={t.a} /><rect x="70" y="132" width="40" height="34" rx="6" fill={t.a} /><circle cx="90" cy="90" r="44" fill={t.b} /><circle cx="90" cy="90" r="34" fill={t.c} /><path d="M90 90V68M90 90l16 8" stroke={t.a} strokeWidth="5" strokeLinecap="round" /></>,
  };
  return <div className={cn("relative grid place-items-center overflow-hidden", className)} style={{ background: t.bg }} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}><svg viewBox="0 0 180 180" className="size-[72%]">{g[kind]}</svg></div>;
}
