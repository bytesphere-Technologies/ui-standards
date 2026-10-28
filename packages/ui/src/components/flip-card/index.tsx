"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component FlipCard @category surfaces @use-when a card has a front summary and a back with detail (flashcards, plan features). Tap or Enter flips. */
export function FlipCard({ front, back, className }: { front: React.ReactNode; back: React.ReactNode; className?: string }) {
  const [on, setOn] = React.useState(false);
  return <button type="button" aria-pressed={on} onClick={() => setOn(!on)} data-on={on} className={cn("flip block h-44 w-full text-start", className)}><span className="flip-inner relative block h-full w-full"><span className="flip-face absolute inset-0 rounded-card border border-subtle bg-surface-raised p-5">{front}</span><span className="flip-face flip-back absolute inset-0 rounded-card border border-action-primary bg-selected p-5">{back}</span></span></button>;
}
