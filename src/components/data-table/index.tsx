"use client";
import { Search, ArrowUp, ArrowDown, ChevronsUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { cn } from "../../lib/cn";
import { StatePanel } from "../state-panel";

/** @component DataTable @category data @use-when a list of records with search, sort, selection and paging. The reference implementation of table behaviour. */
export interface Col<T> { key: keyof T & string; label: string; numeric?: boolean; render?: (r: T) => React.ReactNode; sortable?: boolean }

export function DataTable<T extends { id: string | number }>({ rows, columns, pageSize = 5, searchKeys, bulk }: { rows: T[]; columns: Col<T>[]; pageSize?: number; searchKeys?: (keyof T & string)[]; bulk?: (ids: (string | number)[], clear: () => void) => React.ReactNode }) {
  const [q, setQ] = React.useState(""); const [sort, setSort] = React.useState<{ k: string; dir: 1 | -1 } | null>(null); const [sel, setSel] = React.useState<(string | number)[]>([]); const [page, setPage] = React.useState(0);
  let list = rows.filter((r) => !q || (searchKeys ?? columns.map((c) => c.key)).some((k) => String(r[k]).toLowerCase().includes(q.toLowerCase())));
  if (sort) list = [...list].sort((a, b) => (a[sort.k as keyof T] > b[sort.k as keyof T] ? 1 : -1) * sort.dir);
  const pages = Math.max(1, Math.ceil(list.length / pageSize)); const cur = Math.min(page, pages - 1); const view = list.slice(cur * pageSize, cur * pageSize + pageSize); const all = view.length > 0 && view.every((r) => sel.includes(r.id));
  return <div className="overflow-hidden rounded-card border border-subtle bg-surface-raised">
    <div className="flex flex-wrap items-center gap-3 border-b border-subtle p-3"><div className="relative w-full sm:w-64"><Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-tertiary" aria-hidden /><input aria-label="Search table" value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search" className="h-(--control-md) w-full rounded-control border border-control bg-input ps-9 pe-3" /></div>
      <div className="ms-auto flex items-center gap-2">{sel.length > 0 ? <><span className="tnum text-body-sm text-secondary">{sel.length} selected</span>{bulk?.(sel, () => setSel([]))}</> : <span className="tnum text-body-sm text-secondary">{list.length} result{list.length === 1 ? "" : "s"}</span>}</div></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[34rem] text-body"><thead className="bg-surface-sunken text-body-sm text-secondary"><tr><th className="w-10 ps-4"><Checkbox id="all" label="Select all rows on this page" hideLabel checked={all} indeterminate={!all && view.some((r) => sel.includes(r.id))} onChange={(v) => setSel(v ? [...new Set([...sel, ...view.map((r) => r.id)])] : sel.filter((s) => !view.some((r) => r.id === s)))} /></th>
      {columns.map((c) => <th key={c.key} scope="col" aria-sort={sort?.k === c.key ? (sort.dir === 1 ? "ascending" : "descending") : "none"} className={cn("h-10 px-3 font-medium", c.numeric ? "text-end" : "text-start")}>{c.sortable !== false ? <button type="button" onClick={() => setSort(sort?.k === c.key ? (sort.dir === 1 ? { k: c.key, dir: -1 } : null) : { k: c.key, dir: 1 })} className="inline-flex items-center gap-1 rounded-tag hover:text-primary">{c.label}{sort?.k === c.key ? (sort.dir === 1 ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />) : <ChevronsUpDown className="size-3.5 opacity-40" />}</button> : c.label}</th>)}</tr></thead>
      <tbody>{view.map((r) => <tr key={r.id} className={cn("h-12 border-t border-subtle transition-colors hover:bg-action-ghost-hover", sel.includes(r.id) && "bg-selected/60")}><td className="ps-4"><Checkbox id={`r${r.id}`} label={`Select row ${r.id}`} hideLabel checked={sel.includes(r.id)} onChange={(v) => setSel(v ? [...sel, r.id] : sel.filter((s) => s !== r.id))} /></td>{columns.map((c) => <td key={c.key} className={cn("px-3", c.numeric && "tnum text-end")}>{c.render ? c.render(r) : String(r[c.key])}</td>)}</tr>)}</tbody></table></div>
    {!view.length && <StatePanel compact title={`No results for “${q}”`} description="Check the spelling or clear the search." action={<Button size="sm" onClick={() => setQ("")}>Clear search</Button>} />}
    <div className="flex items-center justify-between border-t border-subtle px-4 py-2.5 text-body-sm text-secondary"><span className="tnum">{list.length ? `${cur * pageSize + 1} to ${Math.min(list.length, cur * pageSize + pageSize)} of ${list.length}` : "0 of 0"}</span><div className="flex gap-1"><Button size="icon-sm" aria-label="Previous page" disabled={cur === 0} onClick={() => setPage(cur - 1)}><ChevronLeft /></Button><Button size="icon-sm" aria-label="Next page" disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)}><ChevronRight /></Button></div></div></div>;
}
