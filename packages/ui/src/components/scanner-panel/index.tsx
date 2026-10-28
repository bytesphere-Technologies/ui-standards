"use client";
import { ScanLine, CheckCircle2, XCircle, Zap, Pause, Play } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Segmented } from "../segmented";

/**
 * OPERATIONS KIT (scanning and field work)
 * @category operations
 * ScannerPanel   viewfinder with corner brackets and the M-12 scan line. States: idle · scanning · success · error · paused
 * ScanFeed       newest-first list of scans with the Flash recipe on arrival
 * DeviceRow      device name, link state, battery, last seen
 * Scanning surfaces use the Ink dark mode by default: dim rooms, OLED handhelds, high contrast.
 */
export type ScanState = "idle" | "scanning" | "success" | "error" | "paused";

export type Scan = { id: number; code: string; label: string; ok: boolean; zone: string; at: string; fresh?: boolean };

function Code({ kind }: { kind: "barcode" | "qr" }) {
  if (kind === "barcode") { const bars = [3, 1, 2, 1, 4, 1, 1, 2, 3, 1, 2, 2, 1, 3, 1, 1, 4, 2, 1, 1, 3, 1, 2, 1, 2, 3, 1, 1]; let x = 0; return <svg viewBox="0 0 120 56" className="w-40" aria-hidden>{bars.map((w, i) => { const r = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w} height="56" fill="#E8EDF3" /> : null; x += w; return r; })}</svg>; }
  const cells: React.ReactNode[] = []; for (let r = 0; r < 13; r++) for (let c = 0; c < 13; c++) { const finder = (r < 4 && c < 4) || (r < 4 && c > 8) || (r > 8 && c < 4); if (finder ? (r % 3 !== 1 || c % 3 !== 1) && (r === 0 || c === 0 || r === 3 || c === 3 || r === 12 || c === 12 || r === 9 || c === 9) : (r * 7 + c * 13 + r * c) % 3 === 0) cells.push(<rect key={`${r}-${c}`} x={c * 8} y={r * 8} width="7" height="7" fill="#E8EDF3" />); }
  return <svg viewBox="0 0 104 104" className="w-28" aria-hidden>{cells}</svg>;
}

export function ScannerPanel({ state, kind, onKind, onToggle, onSimulate, last, className }: { state: ScanState; kind: "barcode" | "qr"; onKind: (k: "barcode" | "qr") => void; onToggle: () => void; onSimulate: () => void; last?: Scan; className?: string }) {
  const live = state === "scanning" || state === "success" || state === "error";
  const ring = state === "success" ? "var(--color-status-success-solid)" : state === "error" ? "var(--color-status-danger-solid)" : "#65ABE2";
  return (
    <div className={cn("overflow-hidden rounded-card border border-subtle bg-surface-raised", className)}>
      <div className="flex items-center justify-between border-b border-subtle px-4 py-2.5"><div className="flex items-center gap-2 text-body font-medium"><ScanLine className="size-4 text-link" aria-hidden />Scanner</div><Segmented size="sm" label="Code type" items={["Barcode", "QR"]} value={kind === "qr" ? "QR" : "Barcode"} onChange={(v) => onKind(v === "QR" ? "qr" : "barcode")} /></div>
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-[#02070D]" role="img" aria-label={live ? "Camera viewfinder, scanning" : "Camera viewfinder, paused"}>
        <div className={cn("transition-opacity duration-200", live ? "opacity-100" : "opacity-25")}><Code kind={kind} /></div>
        {[["start-6 top-6", "border-s-[3px] border-t-[3px] rounded-ss-md"], ["end-6 top-6", "border-e-[3px] border-t-[3px] rounded-se-md"], ["start-6 bottom-6", "border-s-[3px] border-b-[3px] rounded-es-md"], ["end-6 bottom-6", "border-e-[3px] border-b-[3px] rounded-ee-md"]].map(([pos, b]) => <span key={pos} aria-hidden className={cn("absolute size-9 transition-colors duration-200", pos, b)} style={{ borderColor: ring }} />)}
        {state === "scanning" && <span aria-hidden className="m-scan absolute inset-x-8 h-0.5 rounded-round" style={{ background: "#65ABE2" }} />}
        {state === "paused" && <span className="absolute rounded-control bg-black/60 px-3 py-1.5 text-body-sm font-medium text-white">Paused</span>}
        {(state === "success" || state === "error") && last && <div className="m-pop absolute inset-x-6 bottom-12 flex items-center gap-2 rounded-control bg-black/70 px-3 py-2 text-body text-white">{state === "success" ? <CheckCircle2 className="size-4 text-[#73D3A3]" /> : <XCircle className="size-4 text-[#E8A19C]" />}<span className="min-w-0 flex-1 truncate"><b className="font-medium">{last.label}</b> <span className="font-mono text-caption opacity-80">{last.code}</span></span></div>}
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3"><p className="text-body-sm text-secondary" aria-live="polite">{state === "scanning" ? "Hold the code inside the frame." : state === "paused" ? "Resume to keep scanning." : state === "success" ? "Matched. Ready for the next item." : state === "error" ? "Not found in this order. Check the item." : "Scanner is off."}</p>
        <div className="flex gap-2"><Button size="sm" onClick={onSimulate} disabled={!live}><Zap />Simulate scan</Button><Button size="sm" variant={live ? "secondary" : "primary"} onClick={onToggle}>{live ? <><Pause />Pause</> : <><Play />Start</>}</Button></div></div>
    </div>);
}
