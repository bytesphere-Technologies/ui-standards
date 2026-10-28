"use client";
import * as React from "react";
import { reduced } from "../../lib/lab-shared";

/** @component Typewriter @category feedback @use-when an assistant or hero line types itself once. Screen readers get the full text immediately. */
export function Typewriter({ text, speed = 28, className }: { text: string; speed?: number; className?: string }) {
  const [i, setI] = React.useState(reduced() ? text.length : 0);
  React.useEffect(() => { if (i >= text.length) return; const t = setTimeout(() => setI(i + 1), speed); return () => clearTimeout(t); }, [i, text, speed]);
  return <span className={className}><span className="sr-only">{text}</span><span aria-hidden>{text.slice(0, i)}{i < text.length && <span className="m-caret ms-px inline-block h-[1em] w-[2px] translate-y-[2px] bg-current" />}</span></span>;
}
