"use client";
import { ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── CategoryTree ───────── */
export type TreeNode = { label: string; count?: number; children?: TreeNode[] };

export function CategoryTree({ tree, current }: { tree: TreeNode[]; current: string }) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({ Electronics: true });
  const node = (n: TreeNode, depth = 0): React.ReactNode => { const kids = n.children?.length; const on = n.label === current; return (
    <li key={n.label}><div className="flex items-center"><button type="button" aria-expanded={kids ? !!open[n.label] : undefined} onClick={() => kids && setOpen({ ...open, [n.label]: !open[n.label] })} className={cn("ring-inset-focus flex h-8 flex-1 items-center gap-1.5 rounded-control pe-2 text-start text-body hover:bg-action-ghost-hover", on ? "font-semibold text-primary" : "text-secondary")} style={{ paddingInlineStart: 8 + depth * 14 }}>
      {kids ? <ChevronRight className={cn("size-3.5 shrink-0 text-tertiary transition-transform duration-150", open[n.label] && "rotate-90")} aria-hidden /> : <span className="size-3.5 shrink-0" />}<span className="flex-1 truncate">{n.label}</span>{n.count != null && <span className="tnum text-caption text-tertiary">{n.count}</span>}</button></div>
      {kids && <div className="grid transition-[grid-template-rows] duration-200" style={{ gridTemplateRows: open[n.label] ? "1fr" : "0fr" }}><ul className="overflow-hidden">{n.children!.map((c) => node(c, depth + 1))}</ul></div>}</li>); };
  return <nav aria-label="Categories"><ul>{tree.map((n) => node(n))}</ul></nav>;
}
