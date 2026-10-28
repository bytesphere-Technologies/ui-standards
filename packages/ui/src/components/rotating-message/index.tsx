"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/** Rotating status copy: makes a long wait feel like progress. */
export function RotatingMessage({ messages, every = 2200, className }: { messages: string[]; every?: number; className?: string }) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % messages.length), every); return () => clearInterval(t); }, [messages.length, every]);
  return <span key={i} role="status" aria-live="polite" className={cn("m-fade inline-block text-body text-secondary", className)}>{messages[i]}</span>;
}
