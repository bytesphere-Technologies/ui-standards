import { Specimen, Card, StatusPill, Button, Input, Field, Banner, Segmented, cn } from "@bytesphere/ui";
import { AppearancePanel, DARKS, LIGHTS, RADII, NAVS, useAppearance } from "@bytesphere/ui";
import { Logo, BrandMark } from "@bytesphere/ui";
import { StatTile, ProgressBar } from "@bytesphere/ui";
import { LineChart } from "@bytesphere/ui";
import { months, revNow, revPrev } from "../data";
import { Bell, Search } from "lucide-react";

function MiniApp({ theme, variant, radius = "standard", nav = "surface", accent = "azure" }: { theme: "light" | "dark"; variant: string; radius?: string; nav?: string; accent?: string }) {
  const attrs = { "data-theme": theme, ...(theme === "dark" ? { "data-dark": variant } : { "data-light": variant }), "data-radius": radius, "data-nav": nav, "data-accent": accent } as Record<string, string>;
  return (
    <div {...attrs} className="flex h-72 overflow-hidden rounded-card border border-subtle text-primary" style={{ background: "var(--t-color-surface-sunken)" }}>
      <div className="flex w-32 shrink-0 flex-col gap-1 border-e p-2" style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}><div className="mb-2 px-1"><Logo height={18} tagline={false} tone={nav === "navy" || nav === "ink" || theme === "dark" ? "white" : "auto"} /></div>{["Overview", "Deals", "Inbox", "Billing"].map((l, i) => <div key={l} className="rounded-control px-2 py-1 text-[11px] font-medium" style={{ background: i === 1 ? "var(--nav-active-bg)" : "transparent", color: i === 1 ? "var(--nav-active-fg)" : "var(--nav-fg)" }}>{l}</div>)}</div>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3"><div className="flex items-center justify-between"><p className="text-[13px] font-semibold">Overview</p><span className="rounded-control bg-action-primary px-2 py-1 text-[10px] font-medium text-action-primary-fg">New deal</span></div>
        <div className="grid grid-cols-2 gap-2"><div className="rounded-card border border-subtle bg-surface-raised p-2"><p className="text-[10px] text-secondary">Revenue</p><p className="tnum text-[15px] font-semibold">$46.2K</p><p className="text-[10px] text-status-success-fg">▲ 4.2%</p></div><div className="rounded-card border border-subtle bg-surface-raised p-2"><p className="text-[10px] text-secondary">Past due</p><p className="tnum text-[15px] font-semibold">37</p><span className="inline-flex h-4 items-center rounded-tag border border-status-danger-border bg-status-danger-bg px-1 text-[9px] font-semibold text-status-danger-fg">Past due</span></div></div>
        <div className="flex flex-1 flex-col rounded-card border border-subtle bg-surface-raised p-2"><svg viewBox="0 0 100 30" className="h-full min-h-0 w-full flex-1" preserveAspectRatio="none" aria-hidden><path d="M0 24 L14 20 L28 22 L42 14 L56 16 L70 8 L84 10 L100 3" fill="none" stroke="var(--t-color-data-1)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" /><path d="M0 26 L14 24 L28 25 L42 20 L56 21 L70 15 L84 17 L100 12" fill="none" stroke="var(--t-color-data-6)" strokeWidth="1.2" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" /></svg><div className="mt-1.5 flex gap-1"><span className="flex h-5 flex-1 items-center rounded-control border border-control bg-input px-1.5 text-[9px] text-tertiary">Search</span><span className="grid h-5 place-items-center rounded-control border border-action-secondary-border bg-action-secondary px-1.5 text-[9px] font-medium">Filter</span></div></div></div>
    </div>);
}

export function ThemesPage() {
  const [a] = useAppearance();
  return (
    <div className="flex flex-col gap-12">
      <Specimen title="Dark modes" note="Eight named palettes. Everyone picks one and keeps it." doc="01-foundations/themes-and-dark-modes.md">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{DARKS.map((d) => <div key={d.id}><MiniApp theme="dark" variant={d.id} /><div className="mt-2 flex items-center justify-between"><div><p className="text-body font-semibold">{d.label}</p><p className="text-body-sm text-secondary">{d.desc}</p></div>{a.dark === d.id && a.mode !== "light" && <StatusPill tone="info" dot={false}>Active</StatusPill>}</div></div>)}</div>
      </Specimen>
      <Specimen title="Light pages" doc="themes.css · [data-light]">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{LIGHTS.map((d) => <div key={d.id}><MiniApp theme="light" variant={d.id} /><p className="mt-2 text-body font-semibold">{d.label}</p><p className="text-body-sm text-secondary">{d.desc}</p></div>)}</div>
      </Specimen>
      <Specimen title="Accent" note="Which brand color leads: Azure Blue or Corporate Navy. Works in every mode." doc="themes.css · [data-accent]">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{(["light", "dark"] as const).flatMap((th) => ["azure", "navy"].map((ac) => <div key={th + ac}><MiniApp theme={th} variant={th === "dark" ? "navy" : "sky"} accent={ac} /><p className="mt-2 text-body font-semibold capitalize">{ac} accent <span className="font-normal text-secondary">· {th}</span></p></div>))}</div>
        <p className="mt-3 text-body-sm text-secondary">Navy accent: white on Navy is 11.8:1 in light. In dark, actions use Navy 300 `#A6B4DD` with Rich Black text (9.7:1). Links and the focus ring follow.</p>
      </Specimen>
      <Specimen title="Corner styles" note="One switch changes tags, controls, cards and dialogs." doc="themes.css · [data-radius]">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{RADII.map((r) => <div key={r.id} data-radius={r.id} className="flex flex-col gap-3 rounded-card border border-subtle bg-surface-raised p-4"><div className="flex items-center justify-between"><p className="text-body font-semibold">{r.label}</p><span className="tnum text-caption text-tertiary">{r.px}</span></div><div className="flex flex-wrap items-center gap-2"><StatusPill tone="success">Active</StatusPill><Button size="sm" variant="primary">Save</Button><Input aria-label={r.label} className="h-8 w-24" placeholder="Input" /></div><div className="rounded-card border border-subtle p-3 text-body-sm text-secondary">Card</div></div>)}</div>
        <p className="mt-3 text-body-sm text-secondary">Standard is the default. Sharp suits dense data tools. Soft and Round suit consumer products. Avatars, dots and switches stay round in every style.</p>
      </Specimen>
      <Specimen title="Navigation styles" doc="themes.css · [data-nav]">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">{NAVS.map((n) => <div key={n.id}><MiniApp theme="light" variant="paper" nav={n.id} /><p className="mt-2 text-body font-semibold">{n.label}</p></div>)}</div>
      </Specimen>
      <Specimen title="Customize everything" note="The same panel is in the top bar. Choices persist per browser." doc="appearance.tsx · AppearancePanel">
        <div className="max-w-3xl"><AppearancePanel /></div>
      </Specimen>
    </div>);
}
