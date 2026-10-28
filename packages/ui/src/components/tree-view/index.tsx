"use client";
import { ChevronRight, FolderOpen, Folder, FileText } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component TreeView @category data @use-when nested items: folders, org charts, category pickers. Arrow keys expand, collapse, move; Enter selects. */
export type FileNode = { id: string; label: string; children?: FileNode[] };

export function TreeView({ nodes, onSelect }: { nodes: FileNode[]; onSelect?: (n: FileNode) => void }) {
  const [open, setOpen] = React.useState<Set<string>>(new Set([nodes[0]?.id])); const [sel, setSel] = React.useState<string | null>(null);
  const flat: { n: FileNode; d: number }[] = []; const walk = (ns: FileNode[], d: number) => ns.forEach((n) => { flat.push({ n, d }); if (n.children && open.has(n.id)) walk(n.children, d + 1); }); walk(nodes, 0);
  const toggle = (id: string) => { const s = new Set(open); s.has(id) ? s.delete(id) : s.add(id); setOpen(s); };
  const focus = (i: number) => (document.querySelectorAll<HTMLElement>("[data-tree-item]")[i])?.focus();
  return <ul role="tree" aria-label="Files" className="text-body">{flat.map(({ n, d }, i) => { const isF = !!n.children; const isOpen = open.has(n.id); return <li key={n.id} role="treeitem" aria-expanded={isF ? isOpen : undefined} aria-selected={sel === n.id}>
    <button type="button" data-tree-item tabIndex={sel === n.id || (!sel && i === 0) ? 0 : -1} onClick={() => { setSel(n.id); onSelect?.(n); if (isF) toggle(n.id); }} onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); focus(i + 1); } if (e.key === "ArrowUp") { e.preventDefault(); focus(i - 1); } if (e.key === "ArrowRight" && isF && !isOpen) toggle(n.id); if (e.key === "ArrowLeft" && isF && isOpen) toggle(n.id); }} className={cn("flex h-9 w-full items-center gap-1.5 rounded-control pe-2 text-start hover:bg-action-ghost-hover", sel === n.id && "bg-selected text-link")} style={{ paddingInlineStart: 8 + d * 18 }}>
      {isF ? <ChevronRight className={cn("size-4 shrink-0 text-tertiary transition-transform duration-150", isOpen && "rotate-90")} aria-hidden /> : <span className="size-4 shrink-0" />}{isF ? (isOpen ? <FolderOpen className="size-4 shrink-0 text-link" aria-hidden /> : <Folder className="size-4 shrink-0 text-link" aria-hidden />) : <FileText className="size-4 shrink-0 text-tertiary" aria-hidden />}<span className="truncate">{n.label}</span></button></li>; })}</ul>;
}
