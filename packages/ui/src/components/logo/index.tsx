"use client";
import { TEXT_BOX, MARK_NAVY, MARK_AZURE, WORD_D, TECH_D } from "../../lib/mark";
import * as React from "react";
import { cn } from "../../lib/cn";

export type LogoVariant = "horizontal" | "stacked" | "mark" | "wordmark";

export type LogoTone = "auto" | "navy" | "white" | "black" | "on-brand";

/**
 * @component Logo
 * @category brand
 * @use-when any place the company name or mark appears. Never type the name in a font instead.
 * Fully outlined SVG (no font needed). `height` is the rendered height in px of the whole lockup.
 * tone "auto" follows the theme (navy/azure mark, wordmark = current text color); "white" and "on-brand" for dark or azure/navy fills.
 */
export function Logo({ variant = "horizontal", tone = "auto", height = 32, tagline: taglineProp = true, className, label = "ByteSphere Technologies" }: { variant?: LogoVariant; tone?: LogoTone; height?: number; tagline?: boolean; className?: string; label?: string }) {
  const M = 250.1, gap = 32.5, tw = TEXT_BOX.w, th = TEXT_BOX.h, ms = 228.4, mark = 201.56;
  const [a, b, tx, op2] = ({ auto: ["var(--t-color-brand-mark-a)", "var(--t-color-brand-mark-b)", "currentColor", 1], navy: ["#21346E", "#116CB3", "#000913", 1], black: ["#000913", "#000913", "#000913", 0.6], white: ["#fff", "#fff", "#fff", 0.6], "on-brand": ["#fff", "#fff", "#fff", 0.6] } as const)[tone];
  const markG = (x: number, y: number, size: number) => { const s = size / 202.15; return <g transform={`translate(${x} ${y}) scale(${s}) translate(${-2611.3} ${-883.64})`}><path d={MARK_NAVY} fill={a} /><path d={MARK_AZURE} fill={b} opacity={op2} /></g>; };
  const text = (x: number, y: number, tag: boolean) => <g transform={`translate(${x - TEXT_BOX.x} ${y - TEXT_BOX.y})`} fill={tx}><path d={WORD_D} /> {tag && <path d={TECH_D} />}</g>;
  // The tagline is only drawn when it renders at 8px or taller, otherwise it turns to noise.
  let tagline = taglineProp; const tagOk = tagline && (variant === "stacked" ? height >= 78 : variant === "wordmark" ? height >= 31 : variant === "horizontal" ? height >= 43 : false);
  tagline = tagOk;
  let vb: string, w: number, h: number, body: React.ReactNode;
  if (variant === "mark") { vb = `0 0 ${M} ${M}`; w = M; h = M; body = markG(0, 0, M); }
  else if (variant === "wordmark") { h = tagline ? th : TEXT_BOX.wordH; w = tw; vb = `0 0 ${w} ${h}`; body = text(0, 0, tagline); }
  else if (variant === "stacked") { w = tw; h = ms + 43.2 + (tagline ? th : TEXT_BOX.wordH); vb = `0 0 ${w} ${h}`; body = <>{markG((tw - ms) / 2, 0, ms)}{text(0, ms + 43.2, tagline)}</>; }
  else { w = M + gap + tw; h = M; vb = `0 0 ${w} ${h}`; body = <>{markG(0, 0, M)}{text(M + gap, tagline ? (M - th) / 2 : (M - TEXT_BOX.wordH) / 2, tagline)}</>; }
  void mark;
  return <svg viewBox={vb} height={height} width={(height * w) / h} role="img" aria-label={label} className={cn("shrink-0", className)} style={{ color: tone === "auto" ? "var(--t-color-text-primary)" : undefined }}>{body}</svg>;
}
