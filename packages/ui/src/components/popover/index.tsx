"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { Count } from "../count";

/**
 * HEAVY NAVIGATION KIT (large sites, marketplaces, platforms)
 * @category navigation
 * GlobalBar           slim bar, full-width flyouts, dimmed page, staggered links (Apple-style). Marketing and brand sites with 5 to 9 sections.
 * MarketplaceHeader   utility row + big search with typeahead + department strip + drill-down drawer (Amazon / Walmart style). Catalogs with 1,000+ categories.
 * DepartmentDrawer    2-level drill-down panel; also the mobile menu for any large site.
 * PlatformBar         logo + search pill + icon tabs + app launcher + messages + notifications + account panel (Meta style). Social, workspace and suite products.
 * AppLauncher, AccountPanel, Popover, CategoryTree, Typeahead
 * All of them read --nav-* variables (data-nav) and use recipes M-13 underline, M-14 flyout, M-09 stagger, M-20 drill.
 */

/* ───────── shared popover ───────── */
export function Popover({ trigger, label, children, width = "w-80", align = "end", badge }: { trigger: React.ReactNode; label: string; children: React.ReactNode | ((close: () => void) => React.ReactNode); width?: string; align?: "start" | "end"; badge?: number }) {
  const [open, setOpen] = React.useState(false); const ref = React.useRef<HTMLDivElement>(null); const btn = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); }; const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("mousedown", off); document.addEventListener("keydown", esc); return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button ref={btn} type="button" aria-label={label} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)} className={cn("relative grid size-10 place-items-center rounded-round transition-colors duration-100", open ? "bg-selected text-link" : "bg-surface-sunken text-primary hover:bg-action-ghost-active")}>{trigger}{badge ? <span className="absolute -end-0.5 -top-0.5"><Count n={badge} tone="danger" /></span> : null}</button>
      {open && <div role="dialog" aria-label={label} className={cn("m-pop absolute top-full z-50 mt-2 rounded-card border border-subtle bg-surface-overlay p-3 text-primary shadow-modal", width, align === "end" ? "end-0" : "start-0")}>{typeof children === "function" ? children(() => setOpen(false)) : children}</div>}
    </div>);
}
