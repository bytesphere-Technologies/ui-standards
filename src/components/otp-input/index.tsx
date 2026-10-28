"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component OtpInput @category forms @use-when verification codes (email, SMS, 2FA). Paste fills all boxes; Backspace moves back. */
export function OtpInput({ length = 6, onComplete, error }: { length?: number; onComplete?: (code: string) => void; error?: boolean }) {
  const [v, setV] = React.useState<string[]>(Array(length).fill("")); const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const set = (next: string[]) => { setV(next); if (next.every(Boolean)) onComplete?.(next.join("")); };
  return (
    <div role="group" aria-label="Verification code" className={cn("flex gap-1.5 sm:gap-2", error && "m-shake")}>
      {v.map((c, i) => <input key={i} ref={(el) => { refs.current[i] = el; }} value={c} inputMode="numeric" autoComplete={i === 0 ? "one-time-code" : "off"} aria-label={`Digit ${i + 1}`} maxLength={1} aria-invalid={error}
        onChange={(e) => { const d = e.target.value.replace(/\D/g, "").slice(-1); const n = [...v]; n[i] = d; set(n); if (d && i < length - 1) refs.current[i + 1]?.focus(); }}
        onKeyDown={(e) => { if (e.key === "Backspace" && !v[i] && i > 0) refs.current[i - 1]?.focus(); if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus(); if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus(); }}
        onPaste={(e) => { const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length); if (!t) return; e.preventDefault(); const n = Array.from({ length }, (_, k) => t[k] ?? ""); set(n); refs.current[Math.min(t.length, length - 1)]?.focus(); }}
        className={cn("tnum h-(--control-lg) w-full min-w-0 max-w-11 flex-1 rounded-control border bg-input text-center text-h4 font-semibold transition-colors duration-100 focus:border-action-primary", error ? "border-status-danger-border text-status-danger-fg" : c ? "border-strong" : "border-control")} />)}
    </div>);
}
