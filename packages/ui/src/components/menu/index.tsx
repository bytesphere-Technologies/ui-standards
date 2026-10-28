"use client";
import { type LucideIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Menu ───────── */
export type MenuItem = { label: string; icon?: LucideIcon; shortcut?: string; danger?: boolean; onSelect?: () => void; href?: string } | "sep";

export function Menu({ trigger, items, label, align = "end", width = "min-w-52" }: { trigger: React.ReactNode; label: string; items: MenuItem[]; align?: "start" | "end"; width?: string }) {
  const [open, setOpen] = React.useState(false); const ref = React.useRef<HTMLDivElement>(null); const btn = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", off); ref.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    return () => document.removeEventListener("mousedown", off);
  }, [open]);
  const onKey = (e: React.KeyboardEvent) => {
    const els = Array.from(ref.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? []); const i = els.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") { e.preventDefault(); els[(i + 1) % els.length]?.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); els[(i - 1 + els.length) % els.length]?.focus(); }
    if (e.key === "Home") { e.preventDefault(); els[0]?.focus(); }
    if (e.key === "End") { e.preventDefault(); els[els.length - 1]?.focus(); }
    if (e.key === "Escape" || e.key === "Tab") { setOpen(false); btn.current?.focus(); }
  };
  return (
    <div ref={ref} className="relative inline-block" onKeyDown={onKey}>
      <button ref={btn} type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="inline-flex rounded-control max-sm:min-h-10 max-sm:min-w-10 max-sm:items-center max-sm:justify-center">{trigger}</button>
      {open && (
        <div role="menu" aria-label={label} className={cn("m-pop absolute top-full z-20 mt-1.5 rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown", width, align === "end" ? "end-0" : "start-0")}>
          {items.map((it, i) => it === "sep" ? <div key={i} role="separator" className="my-1 h-px bg-[var(--color-subtle)]" /> : (
            <button key={it.label} role="menuitem" tabIndex={-1} onClick={() => { it.onSelect?.(); setOpen(false); btn.current?.focus(); }}
              className={cn("ring-inset-focus flex h-8 w-full items-center gap-2.5 rounded-[var(--corner-inner)] px-2 text-start text-body hover:bg-action-ghost-hover focus:bg-action-ghost-hover", it.danger ? "text-status-danger-fg" : "text-primary")}>
              {it.icon && <it.icon className={cn("size-4", it.danger ? "" : "text-tertiary")} aria-hidden />}{it.label}{it.shortcut && <span className="ms-auto font-mono text-caption text-tertiary">{it.shortcut}</span>}</button>))}
        </div>)}
    </div>);
}
