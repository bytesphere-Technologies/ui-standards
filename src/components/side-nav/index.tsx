"use client";
import { type LucideIcon, ChevronDown, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { Count } from "../count";
import { Tooltip } from "../tooltip";

/**
 * NAVIGATION KIT
 * @category navigation
 * Every navigation component reads the --nav-* CSS variables from themes.css, so one `data-nav` value restyles all of them
 * (surface · tint · navy · ink). Pick by product type, see the Navigation page.
 *
 * SideNav        app sidebar. variants: full 240 · compact 208 · rail 64 · floating
 * TopBar         app top bar slot layout (brand · search · actions)
 * SiteHeader     marketing header with optional mega menu and mobile drawer
 * EcomHeader     store header: announcement bar, search, account, wishlist, cart, category row with mega menu
 * MegaMenu       multi-column panel with an optional featured card
 * BottomTabs     mobile bar for 3 to 5 destinations
 * VerticalTabs   side tabs for settings-like sections
 * PillTabs       low-emphasis switcher for filters and categories
 * SubNav         secondary rail inside a page
 */
export type NavItem = { id: string; label: string; icon?: LucideIcon; href?: string; badge?: number | string; children?: NavItem[]; onSelect?: () => void };

export type NavGroup = { label?: string; items: NavItem[]; collapsible?: boolean };

const dark = (nav?: string) => nav === "navy" || nav === "ink";

export const navTone = () => (typeof document !== "undefined" && dark(document.documentElement.dataset.nav) ? "white" : "auto") as "white" | "auto";

/* ───────── SideNav ───────── */
export function SideNav({ groups, current, collapsed = false, onToggle, brand, footer, variant = "full", className, onNavigate }: {
  groups: NavGroup[]; current: string; collapsed?: boolean; onToggle?: () => void; brand?: React.ReactNode; footer?: React.ReactNode; variant?: "full" | "compact" | "floating"; className?: string; onNavigate?: (id: string) => void;
}) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});
  const [gopen, setGopen] = React.useState<Record<string, boolean>>(() => { try { return JSON.parse(localStorage.getItem("ui.navgroups") || "{}"); } catch { return {}; } });
  const setG = (k: string, v: boolean) => { const n2 = { ...gopen, [k]: v }; setGopen(n2); try { localStorage.setItem("ui.navgroups", JSON.stringify(n2)); } catch { /* ignore */ } };
  const hasCurrent = (g: NavGroup) => g.items.some((i) => i.id === current || i.children?.some((c) => c.id === current));
  const dense = variant === "compact";
  const row = dense ? "h-8" : "h-(--row-nav)";
  const renderItem = (it: NavItem, depth = 0) => {
    const kids = it.children?.length; const on = current === it.id || (kids && it.children!.some((c) => c.id === current)); const exp = open[it.id] ?? on;
    const inner = (
      <>
        {it.icon ? <it.icon className={cn("size-5 shrink-0", on ? "text-[var(--nav-active-icon)]" : "text-[var(--nav-muted)]", dense && "size-4")} aria-hidden /> : <span className="size-5 shrink-0" />}
        {!collapsed && <span className="min-w-0 flex-1 truncate">{it.label}</span>}
        {!collapsed && it.badge != null && <Count n={typeof it.badge === "number" ? it.badge : 0} tone="neutral" />}
        {!collapsed && kids ? <ChevronDown className={cn("size-4 shrink-0 text-[var(--nav-muted)] transition-transform duration-150", exp && "rotate-180")} aria-hidden /> : null}
      </>
    );
    const cls = cn("ring-inset-focus flex w-full items-center gap-2.5 rounded-control px-2 text-start text-body font-medium transition-colors duration-100 hover:bg-[var(--nav-hover)]", row, collapsed && "justify-center", depth > 0 && "ps-9", on && !kids ? "bg-[var(--nav-active-bg)] font-semibold text-[var(--nav-active-fg)]" : "text-[var(--nav-fg)]");
    const el = kids ? <button type="button" aria-expanded={exp} aria-label={collapsed ? it.label : undefined} onClick={() => setOpen({ ...open, [it.id]: !exp })} className={cls}>{inner}</button>
      : <a href={it.href ?? `#/${it.id}`} aria-current={on ? "page" : undefined} aria-label={collapsed ? it.label : undefined} onClick={() => onNavigate?.(it.id)} className={cls}>{inner}</a>;
    return (
      <li key={it.id}>
        {collapsed ? <Tooltip text={it.label}>{el}</Tooltip> : el}
        {kids && !collapsed && <div className="grid transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: exp ? "1fr" : "0fr" }}><ul className="overflow-hidden">{it.children!.map((c) => renderItem(c, 1))}</ul></div>}
      </li>);
  };
  return (
    <aside className={cn("flex shrink-0 flex-col bg-[var(--nav-bg)] text-[var(--nav-fg)] transition-[width] duration-300", variant === "floating" ? "m-2 rounded-card border border-[var(--nav-border)] shadow-dropdown" : "border-e border-[var(--nav-border)]", collapsed ? "w-16" : dense ? "w-52" : "w-60", className)}>
      {brand && <div className={cn("flex h-14 shrink-0 items-center border-b border-[var(--nav-border)]", collapsed ? "justify-center px-2" : "px-4")}>{brand}</div>}
      <nav aria-label="Primary" className="flex-1 overflow-y-auto p-2">
        {groups.map((g, gi) => (
          <div key={gi} className={gi > 0 ? (g.collapsible && !collapsed ? "mt-1" : "mt-4") : undefined}>
            {(() => { const isOpen = !g.collapsible || collapsed || (gopen[g.label ?? ""] ?? hasCurrent(g)); return (<>
              {g.label && (collapsed ? <hr className="mx-2 mb-2 border-[var(--nav-border)]" /> : g.collapsible
                ? <button type="button" aria-expanded={isOpen} onClick={() => setG(g.label!, !isOpen)} className="ring-inset-focus mb-0.5 flex h-8 w-full items-center justify-between rounded-control px-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--nav-muted)] hover:bg-[var(--nav-hover)] hover:text-[var(--nav-fg-strong)]">{g.label}<ChevronDown className={cn("size-3.5 transition-transform duration-150", !isOpen && "-rotate-90")} aria-hidden /></button>
                : <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--nav-muted)]">{g.label}</p>)}
              <div className="grid transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}><ul className="flex flex-col gap-0.5 overflow-hidden">{g.items.map((it) => renderItem(it))}</ul></div></>); })()}
          </div>))}
      </nav>
      {(footer || onToggle) && <div className="flex flex-col gap-1 border-t border-[var(--nav-border)] p-2">{footer}
        {onToggle && <button type="button" onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className={cn("ring-inset-focus flex h-8 items-center gap-2.5 rounded-control px-2 text-body font-medium text-[var(--nav-fg)] hover:bg-[var(--nav-hover)]", collapsed && "justify-center")}>{collapsed ? <PanelLeftOpen className="size-5" /> : <><PanelLeftClose className="size-5" />Collapse</>}</button>}</div>}
    </aside>);
}
