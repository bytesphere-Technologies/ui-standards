"use client";
import { Mail } from "lucide-react";
import { Backdrop } from "../backdrop";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Input } from "../input";
import { Logo } from "../logo";

/* ───────── Footers ───────── */
export type FooterVariant = "columns" | "simple" | "minimal" | "newsletter" | "navy" | "app";

const cols: [string, string[]][] = [["Product", ["Overview", "Pricing", "Changelog", "Docs"]], ["Company", ["About", "Contact sales", "Careers", "Press"]], ["Resources", ["Status", "Security", "API", "Community"]], ["Legal", ["Terms", "Privacy", "DPA", "Cookies"]]];

export function SiteFooter({ variant = "columns", className }: { variant?: FooterVariant; className?: string }) {
  const year = "© 2026 ByteSphere Technologies";
  const link = (dark?: boolean) => cn("text-body-sm hover:underline", dark ? "opacity-90 hover:opacity-100" : "text-secondary hover:text-primary");
  if (variant === "app") return <footer className={cn("flex flex-wrap items-center justify-between gap-2 border-t border-subtle bg-surface px-4 py-2 text-caption text-tertiary", className)}><span>{year}</span><span className="flex gap-4"><a href="#" className="hover:text-primary">Status</a><a href="#" className="hover:text-primary">Help</a><span className="font-mono">v4.2.0</span></span></footer>;
  if (variant === "minimal") return <footer className={cn("border-t border-subtle bg-surface", className)}><div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between"><Logo height={24} tagline={false} /><p className="text-caption text-tertiary">{year}</p></div></footer>;
  if (variant === "simple") return <footer className={cn("border-t border-subtle bg-surface", className)}><div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between"><Logo height={30} /><nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">{["Pricing", "Docs", "Status", "Privacy", "Terms"].map((l) => <a key={l} href="#" className={link()}>{l}</a>)}</nav><p className="text-caption text-tertiary">{year}</p></div></footer>;
  if (variant === "newsletter") return (
    <footer className={cn("border-t border-subtle bg-surface-sunken", className)}><div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.2fr_2fr]"><div><Logo height={34} /><h3 className="mt-6 text-h4 font-semibold">Product news, once a month</h3><p className="mt-1 text-body-sm text-secondary">What shipped, what’s next. No marketing filler.</p>
      <form className="mt-4 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}><Input aria-label="Email address" type="email" placeholder="you@company.com" start={<Mail />} /><Button variant="primary">Subscribe</Button></form></div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">{cols.map(([h, l]) => <div key={h}><p className="text-body-sm font-medium">{h}</p><ul className="mt-3 space-y-2">{l.map((x) => <li key={x}><a href="#" className={link()}>{x}</a></li>)}</ul></div>)}</div></div><div className="border-t border-subtle py-4 text-center text-caption text-tertiary">{year}</div></footer>);
  const dark = variant === "navy";
  return (
    <footer className={cn("relative overflow-hidden", dark ? "bg-action-accent text-action-accent-fg" : "border-t border-subtle bg-surface", className)}>{dark && <Backdrop variant="rings" subtle />}
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]"><div><Logo height={34} tone={dark ? "white" : "auto"} /><p className={cn("mt-4 max-w-xs text-body-sm", dark ? "opacity-90" : "text-secondary")}>Renewals, approvals and billing in one workspace.</p></div>
        {cols.map(([h, l]) => <div key={h}><p className="text-body-sm font-medium">{h}</p><ul className="mt-3 space-y-2">{l.map((x) => <li key={x}><a href="#" className={link(dark)}>{x}</a></li>)}</ul></div>)}</div>
      <div className={cn("relative border-t py-4 text-center text-caption", dark ? "border-white/15 opacity-90" : "border-subtle text-tertiary")}>{year}</div></footer>);
}
