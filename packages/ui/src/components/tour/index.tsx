"use client";
import { X, Pencil, Trash2, Share2, Copy } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { reduced } from "../../lib/lab-shared";
import { StatusPill } from "../status-pill";

/** @component Tour @category overlays @use-when a first-run walkthrough of 3 to 5 stops. Anchors to elements by CSS selector, dims the page, skippable, resumable. */
export function Tour({ steps, open, onClose }: { steps: { target: string; title: string; body: string }[]; open: boolean; onClose: () => void }) {
  const [i, setI] = React.useState(0); const [r, setR] = React.useState<DOMRect | null>(null);
  React.useEffect(() => { if (!open) { setI(0); return; } const el = document.querySelector(steps[i].target); if (!el) { setR(null); return; } el.scrollIntoView({ block: "center", behavior: reduced() ? "auto" : "smooth" }); const f = () => setR(el.getBoundingClientRect()); const t = setTimeout(f, reduced() ? 0 : 320); addEventListener("resize", f); addEventListener("scroll", f, true); return () => { clearTimeout(t); removeEventListener("resize", f); removeEventListener("scroll", f, true); }; }, [open, i, steps]);
  React.useEffect(() => { if (!open) return; const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight" && i < steps.length - 1) setI(i + 1); if (e.key === "ArrowLeft" && i > 0) setI(i - 1); }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [open, i, steps.length, onClose]);
  if (!open) return null; const s = steps[i]; const below = r ? r.bottom + 220 < innerHeight : true;
  return <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Product tour"><div className="absolute inset-0" onClick={onClose} />
    {r && <div aria-hidden className="pointer-events-none absolute rounded-card ring-2 ring-action-primary transition-all duration-300" style={{ left: r.left - 6, top: r.top - 6, width: r.width + 12, height: r.height + 12, boxShadow: "0 0 0 9999px rgba(0,9,19,.55)" }} />}
    <div className="m-pop absolute w-[min(20rem,calc(100vw-2rem))] rounded-card border border-subtle bg-surface-overlay p-4 shadow-modal" style={r ? { left: Math.max(16, Math.min(r.left, innerWidth - 336)), top: below ? r.bottom + 14 : Math.max(16, r.top - 14 - 190) } : { left: "50%", top: "40%", transform: "translateX(-50%)" }}>
      <div className="flex items-start justify-between gap-3"><p className="text-body font-semibold">{s.title}</p><button type="button" aria-label="Skip tour" onClick={onClose} className="-me-1 -mt-1 grid size-8 place-items-center rounded-control text-tertiary hover:bg-action-ghost-hover"><X className="size-4" aria-hidden /></button></div><p className="mt-1 text-body text-secondary">{s.body}</p>
      <div className="mt-4 flex items-center justify-between"><span className="tnum text-body-sm text-tertiary">{i + 1} of {steps.length}</span><div className="flex gap-2">{i > 0 && <Button size="sm" onClick={() => setI(i - 1)}>Back</Button>}<Button size="sm" variant="primary" onClick={() => (i < steps.length - 1 ? setI(i + 1) : onClose())}>{i < steps.length - 1 ? "Next" : "Done"}</Button></div></div></div></div>;
}

export const _labIcons = { Pencil, Trash2, Share2, Copy, StatusPill };
