"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component MentionInput @category forms @use-when a comment box that suggests people after typing @. Arrow keys and Enter select. */
export function MentionInput({ people, placeholder = "Write a comment. Type @ to mention." }: { people: string[]; placeholder?: string }) {
  const [v, setV] = React.useState(""); const [idx, setIdx] = React.useState(0); const m = /@(\w*)$/.exec(v); const list = m ? people.filter((p) => p.toLowerCase().includes(m[1].toLowerCase())).slice(0, 5) : [];
  const pick = (p: string) => { setV(v.replace(/@(\w*)$/, `@${p.split(" ")[0]} `)); setIdx(0); };
  return <div className="relative"><textarea aria-label="Comment" rows={3} value={v} placeholder={placeholder} onChange={(e) => { setV(e.target.value); setIdx(0); }} onKeyDown={(e) => { if (!list.length) return; if (e.key === "ArrowDown") { e.preventDefault(); setIdx((idx + 1) % list.length); } if (e.key === "ArrowUp") { e.preventDefault(); setIdx((idx + list.length - 1) % list.length); } if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); pick(list[idx]); } }} className="w-full resize-none rounded-control border border-control bg-input p-3 text-body focus:border-action-primary" />
    {list.length > 0 && <ul role="listbox" aria-label="People" className="m-pop absolute start-0 top-full z-30 mt-1 w-56 rounded-card border border-subtle bg-surface-overlay p-1 shadow-dropdown">{list.map((p, i) => <li key={p} role="option" aria-selected={i === idx}><button type="button" onMouseDown={(e) => { e.preventDefault(); pick(p); }} className={cn("flex h-9 w-full items-center rounded-control px-3 text-start text-body", i === idx && "bg-selected text-link")}>{p}</button></li>)}</ul>}</div>;
}
