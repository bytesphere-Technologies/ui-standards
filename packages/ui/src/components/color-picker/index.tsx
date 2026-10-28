"use client";
import { Copy } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { useToast } from "../toast-provider";

/** @component ColorPicker @category forms @use-when a free color choice (theme editor, label). Hue, saturation, lightness sliders, hex field, copy. */
const hsl2hex = (h: number, s: number, l: number) => { s /= 100; l /= 100; const k = (n: number) => (n + h / 30) % 12; const a = s * Math.min(l, 1 - l); const f = (n: number) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))); return `#${[f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, "0")).join("")}`.toUpperCase(); };

export function ColorPicker({ initial = [205, 82, 39], onChange }: { initial?: [number, number, number]; onChange?: (hex: string) => void }) {
  const [[h, s, l], set] = React.useState(initial); const hex = hsl2hex(h, s, l); const toast = useToast(); React.useEffect(() => onChange?.(hex), [hex]);
  const Sl = ({ label, v, max, i, bg }: { label: string; v: number; max: number; i: 0 | 1 | 2; bg: string }) => <label className="flex items-center gap-3 text-body-sm"><span className="w-20 text-secondary">{label}</span><input type="range" min={0} max={max} value={v} onChange={(e) => { const n: [number, number, number] = [h, s, l]; n[i] = +e.target.value; set(n); }} className="h-2 flex-1 cursor-pointer appearance-none rounded-round" style={{ background: bg }} /><span className="tnum w-9 text-end">{v}</span></label>;
  return <div className="flex flex-col gap-3"><div className="flex items-center gap-3"><span className="size-14 rounded-card border border-black/10 shadow-raised" style={{ background: hex }} aria-hidden /><div><p className="font-mono text-body font-semibold">{hex}</p><Button size="sm" onClick={() => { navigator.clipboard?.writeText(hex); toast({ tone: "info", title: "Copied", description: hex }); }}><Copy />Copy</Button></div></div>
    <Sl label="Hue" v={h} max={360} i={0} bg="linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" /><Sl label="Saturation" v={s} max={100} i={1} bg={`linear-gradient(90deg,${hsl2hex(h, 0, l)},${hsl2hex(h, 100, l)})`} /><Sl label="Lightness" v={l} max={100} i={2} bg={`linear-gradient(90deg,#000,${hsl2hex(h, s, 50)},#fff)`} /></div>;
}
