"use client";
import { EyeOff, Eye, Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component PasswordField @category forms @use-when creating a password. Show/hide, strength meter, live rule checklist. Never block paste. */
export function scorePassword(p: string) { const rules = [["8 or more characters", p.length >= 8], ["A number", /\d/.test(p)], ["Upper and lower case", /[a-z]/.test(p) && /[A-Z]/.test(p)], ["A symbol", /[^A-Za-z0-9]/.test(p)]] as [string, boolean][]; const n = rules.filter((r) => r[1]).length + (p.length >= 14 ? 1 : 0); return { rules, score: p ? Math.min(4, Math.max(1, n - (p.length < 8 ? 1 : 0))) : 0 }; }

export function PasswordField({ label = "Password" }: { label?: string }) {
  const [p, setP] = React.useState(""); const [show, setShow] = React.useState(false); const { rules, score } = scorePassword(p); const id = React.useId();
  const names = ["", "Weak", "Fair", "Good", "Strong"]; const colors = ["", "bg-status-danger-fg", "bg-status-warning-fg", "bg-action-primary", "bg-status-success-fg"];
  return <div><label htmlFor={id} className="mb-1.5 block text-body font-medium">{label}</label><div className="relative"><input id={id} type={show ? "text" : "password"} autoComplete="new-password" value={p} onChange={(e) => setP(e.target.value)} aria-describedby={`${id}s`} className="h-(--control-md) w-full rounded-control border border-control bg-input pe-11 ps-3 focus:border-action-primary" /><button type="button" aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} onClick={() => setShow(!show)} className="absolute end-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-control text-secondary hover:bg-action-ghost-hover">{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div>
    <div className="mt-2 flex gap-1" aria-hidden>{[1, 2, 3, 4].map((i) => <span key={i} className={cn("h-1.5 flex-1 rounded-round transition-colors duration-200", i <= score ? colors[score] : "bg-surface-sunken")} />)}</div>
    <p id={`${id}s`} className="mt-1 h-5 text-body-sm text-secondary" aria-live="polite">{score ? `Strength: ${names[score]}` : "Use at least 8 characters."}</p>
    <ul className="mt-1 grid gap-1 sm:grid-cols-2">{rules.map(([t, ok]) => <li key={t} className={cn("flex items-center gap-2 text-body-sm", ok ? "text-status-success-fg" : "text-tertiary")}><Check className={cn("size-3.5 transition-opacity", ok ? "opacity-100" : "opacity-30")} aria-hidden />{t}<span className="sr-only">{ok ? "met" : "not met"}</span></li>)}</ul></div>;
}
