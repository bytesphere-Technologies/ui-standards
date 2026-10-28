"use client";
import { BRAND } from "../../lib/lab-shared";

/** @component ColorSwatchPicker @category forms @use-when choosing one of a small set of colors (labels, tags, calendars). Radio semantics, check mark, not color alone. */
export function ColorSwatchPicker({ value, onChange, colors = BRAND }: { value: string; onChange: (c: string) => void; colors?: string[] }) {
  return <div role="radiogroup" aria-label="Color" className="flex flex-wrap gap-2">{colors.map((c) => <button key={c} type="button" role="radio" aria-checked={value === c} aria-label={c} onClick={() => onChange(c)} className="press relative grid size-9 place-items-center rounded-round border border-black/10 transition-transform hover:scale-110" style={{ background: c }}>{value === c && <svg viewBox="0 0 16 16" className="m-pop size-4" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 8.5 3.2 3L13 4.5" /></svg>}</button>)}</div>;
}
