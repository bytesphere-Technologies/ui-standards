"use client";
import { Trophy } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { reduced, BRAND } from "../../lib/lab-shared";

/** Fire confetti from a point. Brand colors, 1.4 s, removed from the DOM after. No-op under reduced motion. */
export function fireConfetti(origin?: { x: number; y: number }, count = 48) {
  if (reduced() || typeof document === "undefined") return;
  const o = origin ?? { x: innerWidth / 2, y: innerHeight / 3 }; const box = document.createElement("div"); box.setAttribute("aria-hidden", "true"); Object.assign(box.style, { position: "fixed", inset: "0", pointerEvents: "none", zIndex: "9999", overflow: "hidden" }); document.body.appendChild(box);
  for (let i = 0; i < count; i++) { const p = document.createElement("span"); const s = 6 + Math.random() * 6; const a = (Math.random() * 140 + 20) * (Math.PI / 180); const v = 160 + Math.random() * 260; Object.assign(p.style, { position: "absolute", left: `${o.x}px`, top: `${o.y}px`, width: `${s}px`, height: `${s * (Math.random() > 0.5 ? 1 : 0.5)}px`, background: BRAND[i % BRAND.length], borderRadius: Math.random() > 0.6 ? "50%" : "1px" }); box.appendChild(p);
    p.animate([{ transform: "translate(0,0) rotate(0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * v * (Math.random() > 0.5 ? 1 : -1)}px, ${-Math.sin(a) * v * 0.7 + 260}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }], { duration: 1100 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" }); }
  setTimeout(() => box.remove(), 1700);
}

/** @component Achievement @category feedback @use-when celebrating a real milestone (first deal, 7-day streak). Rare. Max one per session. */
export function Achievement({ title, body, icon: I = Trophy, onClaim }: { title: string; body: string; icon?: typeof Trophy; onClaim?: () => void }) {
  const [on, setOn] = React.useState(false);
  return <div className={cn("flex items-center gap-4 rounded-card border p-4 transition-colors", on ? "border-status-success-border bg-status-success-bg" : "border-subtle bg-surface-raised")}><span className={cn("grid size-12 shrink-0 place-items-center rounded-round", on ? "m-elastic bg-status-success-fg text-white" : "bg-selected text-link")}><I className="size-6" aria-hidden /></span><div className="min-w-0 flex-1"><p className="text-body font-semibold">{title}</p><p className="text-body-sm text-secondary">{body}</p></div><Button variant={on ? "secondary" : "primary"} disabled={on} onClick={(e) => { setOn(true); fireConfetti({ x: e.clientX, y: e.clientY }); onClaim?.(); }}>{on ? "Claimed" : "Claim"}</Button></div>;
}
