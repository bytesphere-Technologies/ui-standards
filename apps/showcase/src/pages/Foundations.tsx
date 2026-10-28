import { ramps, contrast } from "../data";
import { Specimen, Card, Label, cn, Button, Input, StatusPill, Kbd } from "@bytesphere/ui";
import { Logo, BrandMark } from "@bytesphere/ui";
import { Search, Plus, Trash2, Settings, Bell, Download, Check, X } from "lucide-react";

const steps = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] as const;

export function Foundations() {
  return (
    <div className="flex flex-col gap-10">
      <Specimen title="Brand" note="Four colors and one mark. Everything else is derived." doc="01-foundations/color.md">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid grid-cols-4 overflow-hidden rounded-card border border-subtle text-[11px]">
            {[["Azure Blue", "#116CB3", "#fff", "Primary"], ["Corporate Navy", "#21346E", "#fff", "Accent"], ["Pale Blue", "#DBE7F7", "#21346E", "Selected"], ["Rich Black", "#000913", "#fff", "Dark base"]].map(([n, h, c, r]) => (
              <div key={n} className="flex h-32 flex-col justify-between p-3" style={{ background: h, color: c }}><span className="opacity-80">{r}</span><span><b className="block text-[13px] font-semibold">{n}</b><span className="font-mono opacity-80">{h}</span></span></div>))}
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-card bg-white p-5 ring-1 ring-inset ring-[var(--color-subtle)]"><img src="/brand/logo-horizontal.svg" alt="ByteSphere Technologies" className="h-12" /><img src="/brand/logo-stacked.svg" alt="ByteSphere Technologies, stacked" className="h-20" /><img src="/brand/logo-mark.svg" alt="ByteSphere mark" className="size-12" /></div>
        </div>
        <p className="mt-4 text-body-sm text-secondary">Full logo system, tones and backgrounds: <a className="font-medium text-link hover:underline" href="#/brand">Brand and logo</a>.</p>
      </Specimen>

      <Specimen title="Color ramps" note="Eleven steps, hue-shifted neutrals." doc="02-tokens/tokens.primitive.json">
        <div className="flex flex-col gap-3">
          {(Object.keys(ramps) as (keyof typeof ramps)[]).map((name) => (
            <div key={name} className="grid items-center gap-3 md:grid-cols-[6rem_1fr]"><span className="text-body-sm font-medium capitalize text-secondary">{name === "accent" ? "accent (navy)" : name}</span>
              <div className="grid grid-cols-11 overflow-hidden rounded-control">{steps.map((s) => <div key={s} title={`${name}-${s} ${ramps[name][s]}`} className="group relative h-9" style={{ background: ramps[name][s] }}><span className="absolute inset-0 hidden place-items-center text-[10px] font-semibold group-hover:grid" style={{ color: Number(s) < 500 ? "#000913" : "#fff" }}>{s}</span></div>)}</div></div>))}
        </div>
      </Specimen>

      <Specimen title="Contrast" note="Measured, WCAG 2.2. Text needs 4.5:1, UI 3:1." doc="color.md §6" pad={false}>
        <table className="w-full text-body">
          <thead><tr className="h-9 border-b border-subtle text-body-sm text-secondary"><th className="ps-5 text-start font-medium">Pair</th><th className="text-start font-medium">Sample</th><th className="text-end font-medium">Ratio</th><th className="pe-5 text-end font-medium">Result</th></tr></thead>
          <tbody>{contrast.map((c, i) => { const ok = c.ratio >= c.need; return (
            <tr key={i} className="h-10 border-b border-subtle last:border-0"><td className="ps-5 text-primary">{c.fg} <span className="text-tertiary">on</span> {c.bg}</td>
              <td><span className="rounded-control px-2 py-0.5 text-body-sm font-semibold ring-1 ring-inset ring-[var(--color-subtle)]" style={{ color: c.fgHex, background: c.bgHex }}>Aa 123</span></td>
              <td className="tnum text-end">{c.ratio.toFixed(2)}</td><td className="pe-5 text-end"><span className={cn("inline-flex items-center gap-1 font-medium", ok ? "text-status-success-fg" : "text-status-danger-fg")}>{ok ? <Check className="size-4" /> : <X className="size-4" />}{ok ? "Pass" : "Banned pair"}</span></td></tr>); })}</tbody>
        </table>
      </Specimen>

      <Specimen title="Typography" note="Inter for product. Poppins for marketing headlines. Geist Mono for code." doc="01-foundations/typography.md">
        <div className="flex flex-col divide-y divide-[var(--color-subtle)]">
          {([
            ["Display", "font-display text-display font-semibold tracking-[-0.025em]", "Poppins 600 · 48 / 64", "Pricing that fits your team"],
            ["H1", "font-display text-h1 font-semibold tracking-[-0.02em]", "Poppins 600 · 32 / 40", "Quarterly revenue review"],
            ["H2 · page title", "text-h2 font-semibold", "Inter 600 · 24 / 32", "Overdue invoices"],
            ["H3", "text-h3 font-semibold", "Inter 600 · 20 / 28", "Payment methods"],
            ["H4 · card title", "text-h4 font-semibold", "Inter 600 · 16 / 24", "Account details"],
            ["Body", "text-body", "Inter 400 · 14 / 20", "Invoices are generated on the first day of every billing cycle."],
            ["Body small", "text-body-sm text-secondary", "Inter 400 · 13 / 18", "Last synced 12 minutes ago from your billing provider."],
            ["Caption", "text-caption text-tertiary", "Inter 400 · 12 / 16", "Updated 12:04 · Source: Billing"],
          ] as const).map(([n, c, s, sample]) => <div key={n} className="grid items-baseline gap-1 py-3 md:grid-cols-[9rem_1fr_11rem] md:gap-4"><span className="text-body-sm text-tertiary">{n}</span><p className={cn(c, "min-w-0 text-primary")}>{sample}</p><code className="font-mono text-caption text-tertiary">{s}</code></div>)}
          <div className="grid items-baseline gap-1 py-3 md:grid-cols-[9rem_1fr_11rem] md:gap-4"><span className="text-body-sm text-tertiary">Overline</span><p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-tertiary">Billing details</p><code className="font-mono text-caption text-tertiary">Inter 600 · 11 / 16 · +0.06em</code></div>
          <div className="grid items-start gap-3 py-3 md:grid-cols-[9rem_1fr_11rem] md:gap-4"><span className="text-body-sm text-tertiary">Numbers</span>
            <div className="grid max-w-sm grid-cols-2 gap-x-8 text-body"><span className="tnum text-end">1,111.00</span><span className="text-end">1,111.00</span><span className="tnum text-end">8,888.88</span><span className="text-end">8,888.88</span><span className="tnum text-end">−12.50</span><span className="text-end">−12.50</span><span className="text-end text-caption text-tertiary">tabular</span><span className="text-end text-caption text-tertiary">proportional</span></div><code className="font-mono text-caption text-tertiary">tnum in every column</code></div>
          <div className="grid items-baseline gap-1 py-3 md:grid-cols-[9rem_1fr_11rem] md:gap-4"><span className="text-body-sm text-tertiary">Code</span><p className="font-mono text-[13px]">const key = "sk_live_••••4f2a";</p><code className="font-mono text-caption text-tertiary">Geist Mono 400 · 13 / 20</code></div>
        </div>
      </Specimen>

      <Specimen title="Shape" note="Corners, borders and heights by element class. One value per class." doc="01-foundations/shape-and-type-spec.md">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[["Tag", "4px", "rounded-tag", "pills, checkbox, kbd, tooltip"], ["Control", "6px", "rounded-control", "buttons, inputs, menus"], ["Card", "8px", "rounded-card", "cards, popovers, toasts"], ["Modal", "12px", "rounded-modal", "dialogs, sheets, dropzone"], ["Round", "full", "rounded-round", "avatar, dots only"]].map(([n, px, c, u]) => (
              <div key={n} className="flex flex-col gap-2"><div className={cn("size-16 border border-control bg-surface-sunken", c)} /><p className="text-body-sm font-medium">{n} <span className="font-normal text-tertiary">{px}</span></p><p className="text-caption text-tertiary">{u}</p></div>))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[["1px subtle", "border border-subtle", "card edges, dividers"], ["1px control", "border border-control", "inputs, checkboxes"], ["1px strong", "border border-strong", "hover, selected card"], ["2px focus ring", "ring-2 ring-focus ring-offset-2", "every focusable"]].map(([n, c, u]) => (
              <div key={n} className="flex items-center gap-3"><div className={cn("size-12 shrink-0 rounded-control bg-surface-raised", c)} /><div><p className="text-body-sm font-medium">{n}</p><p className="text-caption text-tertiary">{u}</p></div></div>))}
          </div>
        </div>
        <div className="mt-6 grid gap-3 border-t border-subtle pt-5 sm:grid-cols-4">
          {[["Level 0 · in-flow", "border border-subtle"], ["Level 1 · hover", "shadow-raised"], ["Level 2 · menu, toast", "shadow-dropdown"], ["Level 3 · modal", "shadow-modal"]].map(([n, c]) => <div key={n} className="rounded-card bg-surface-sunken p-4"><div className={cn("mb-3 h-14 rounded-card bg-surface-raised", c)} /><p className="text-body-sm font-medium">{n}</p></div>)}
        </div>
      </Specimen>

      <Specimen title="Spacing and size" note="4px base. No arbitrary values." doc="spacing-and-layout.md">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-1.5">{[4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map((n) => <div key={n} className="flex items-center gap-3"><span className="tnum w-8 text-body-sm text-tertiary">{n}</span><div className="h-2.5 rounded-tag bg-action-primary/80" style={{ width: n * 2 }} /></div>)}</div>
          <div className="flex flex-col gap-3">
            <Label>Control heights</Label><div className="flex flex-wrap items-end gap-3"><Button size="sm" variant="primary">32</Button><Button variant="primary">36</Button><Button size="lg" variant="primary">40</Button><Input className="w-32" placeholder="36" /></div>
            <Label>Row heights</Label><div className="flex gap-3 text-body-sm"><div className="flex h-10 w-32 items-center rounded-control border border-subtle px-3">40 comfortable</div><div className="flex h-8 w-32 items-center rounded-control border border-subtle px-3">32 compact</div></div>
          </div>
        </div>
      </Specimen>

      <Specimen title="Icons" note="Lucide. 16 · 20 · 24, stroke 1.75 (1.5 at 24)." doc="iconography.md">
        <div className="flex flex-wrap items-center gap-10">{[16, 20, 24].map((s) => <div key={s} className="flex items-center gap-3 text-secondary">{[Search, Plus, Trash2, Settings, Bell, Download].map((I, i) => <I key={i} size={s} strokeWidth={s === 24 ? 1.5 : 1.75} aria-hidden />)}<code className="ms-2 font-mono text-caption text-tertiary">{s}px</code></div>)}</div>
      </Specimen>

      <Specimen title="Elevation in context" note="Flat surfaces separate with borders. Floating layers lift." doc="radius-borders-elevation.md">
        <div className="flex flex-wrap items-center gap-4 rounded-card bg-surface-sunken p-6">
          <div className="rounded-card border border-subtle bg-surface-raised p-4 text-body-sm">Card · border only</div>
          <div className="rounded-card border border-subtle bg-surface-overlay p-1.5 shadow-dropdown"><div className="flex h-8 items-center gap-2 rounded-[5px] bg-action-ghost-hover px-2 text-body">Menu item <Kbd>⌘D</Kbd></div><div className="flex h-8 items-center px-2 text-body">Another</div></div>
          <StatusPill tone="success">Active</StatusPill><StatusPill tone="danger">Past due</StatusPill>
        </div>
      </Specimen>
    </div>
  );
}
