"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { reduced } from "../../lib/lab-shared";

/** @component Carousel @category layout @use-when 3 to 8 slides of equal weight; scroll-snap, arrows, dots. Never auto-advance. */
export function Carousel({ slides, label = "Carousel" }: { slides: React.ReactNode[]; label?: string }) {
  const ref = React.useRef<HTMLDivElement>(null); const [i, setI] = React.useState(0);
  const go = (n: number) => { const el = ref.current; if (!el) return; const k = Math.max(0, Math.min(slides.length - 1, n)); el.scrollTo({ left: k * el.clientWidth, behavior: reduced() ? "auto" : "smooth" }); setI(k); };
  return <section aria-roledescription="carousel" aria-label={label} className="relative"><div ref={ref} tabIndex={0} aria-label="Slides" onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))} className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none]">{slides.map((s, k) => <div key={k} role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${slides.length}`} className="w-full shrink-0 snap-center">{s}</div>)}</div>
    <div className="mt-3 flex items-center justify-between"><div className="flex gap-1.5">{slides.map((_, k) => <button key={k} type="button" aria-label={`Slide ${k + 1}`} aria-current={k === i} onClick={() => go(k)} className="grid h-6 w-5 place-items-center"><span className={cn("h-1.5 rounded-round transition-all duration-200", k === i ? "w-5 bg-action-primary" : "w-1.5 bg-[var(--color-strong)]")} /></button>)}</div><div className="flex gap-1"><Button size="icon-sm" aria-label="Previous slide" disabled={i === 0} onClick={() => go(i - 1)}><ChevronLeft /></Button><Button size="icon-sm" aria-label="Next slide" disabled={i === slides.length - 1} onClick={() => go(i + 1)}><ChevronRight /></Button></div></div></section>;
}
