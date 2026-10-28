"use client";
import { Copy } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component ContextMenuArea @category overlays @use-when right-click (long-press on touch) should offer actions on an item. Always mirror the actions in a visible menu. */
export function ContextMenuArea({ children, items, className }: { children: React.ReactNode; items: { label: string; icon?: typeof Copy; danger?: boolean; onSelect?: () => void }[]; className?: string }) {
  const [pos, setPos] = React.useState<{ x: number; y: number } | null>(null); const lp = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  React.useEffect(() => { if (!pos) return; const c = () => setPos(null); const k = (e: KeyboardEvent) => e.key === "Escape" && setPos(null); window.addEventListener("click", c); window.addEventListener("keydown", k); return () => { window.removeEventListener("click", c); window.removeEventListener("keydown", k); }; }, [pos]);
  return <div className={className} onContextMenu={(e) => { e.preventDefault(); setPos({ x: e.clientX, y: e.clientY }); }} onTouchStart={(e) => { const t = e.touches[0]; lp.current = setTimeout(() => setPos({ x: t.clientX, y: t.clientY }), 500); }} onTouchEnd={() => clearTimeout(lp.current)}>{children}
    {pos && <ul role="menu" className="m-pop fixed z-[60] min-w-44 rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown" style={{ left: Math.min(pos.x, innerWidth - 190), top: Math.min(pos.y, innerHeight - 40 * items.length - 16) }}>{items.map((it) => <li key={it.label}><button role="menuitem" type="button" onClick={() => it.onSelect?.()} className={cn("flex h-9 w-full items-center gap-2 rounded-control px-3 text-body hover:bg-action-ghost-hover", it.danger && "text-status-danger-fg")}>{it.icon && <it.icon className="size-4" aria-hidden />}{it.label}</button></li>)}</ul>}</div>;
}
