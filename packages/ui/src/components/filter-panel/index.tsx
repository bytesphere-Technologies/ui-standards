"use client";
import * as React from "react";
import { Checkbox } from "../checkbox";
import { Slider } from "../slider";

export function FilterPanel({ groups, price, onPrice }: { groups: { title: string; options: [string, number][] }[]; price: number; onPrice: (n: number) => void }) {
  const [sel, setSel] = React.useState<Record<string, boolean>>({});
  return (
    <div className="flex flex-col gap-6">{groups.map((g) => <fieldset key={g.title}><legend className="mb-2 text-body font-medium">{g.title}</legend><div className="flex flex-col gap-2">{g.options.map(([o, n]) => <div key={o} className="flex items-center justify-between"><Checkbox id={`${g.title}-${o}`} label={o} checked={!!sel[o]} onChange={(v) => setSel({ ...sel, [o]: v })} /><span className="tnum text-body-sm text-tertiary">{n}</span></div>)}</div></fieldset>)}
      <Slider id="price" label="Max price" value={price} min={20} max={500} onChange={onPrice} unit=" USD" /></div>);
}
