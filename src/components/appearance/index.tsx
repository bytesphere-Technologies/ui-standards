"use client";
import { Check } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Segmented } from "../segmented";
import { ThemeSwatch } from "../theme-swatch";

/**
 * @component Appearance (state + panel)
 * @category theming
 * @use-when the user picks a dark mode, corner style, density or navigation style. One source of truth, written to <html data-*>.
 * Attributes set on <html>: data-theme (light|dark) · data-dark · data-light · data-radius · data-density · data-nav.
 */
export type Mode = "system" | "light" | "dark";

export const DARKS = [
  { id: "midnight", label: "Midnight", desc: "Default. Rich Black base with blue-gray layers.", sw: ["#000913", "#0A121C", "#111B27", "#223142"] },
  { id: "navy", label: "Navy", desc: "Corporate Navy tint. Warmer, more brand.", sw: ["#080D22", "#0E1530", "#151E3F", "#2B3A68"] },
  { id: "ink", label: "Ink", desc: "Deepest. For dim rooms, scanners and OLED.", sw: ["#000913", "#03101D", "#071727", "#1A2A3C"] },
  { id: "slate", label: "Slate", desc: "Neutral graphite. Least colorful.", sw: ["#0F1216", "#15191F", "#1C2128", "#2F3741"] },
  { id: "ocean", label: "Ocean", desc: "Azure-teal tint. Calm, data-friendly.", sw: ["#030D14", "#07151E", "#0D2130", "#1F3B50"] },
  { id: "dim", label: "Dim", desc: "Lighter dark. Easiest in bright offices.", sw: ["#171D25", "#1D2530", "#252F3B", "#3B4859"] },
  { id: "cobalt", label: "Cobalt", desc: "Deep azure surfaces. Rich, saturated blue.", sw: ["#040B1E", "#091630", "#102042", "#243E78"] },
  { id: "dusk", label: "Dusk", desc: "Navy-violet, lighter. Soft for long sessions.", sw: ["#0F1428", "#151B38", "#1D2546", "#36427A"] },
] as const;

export const LIGHTS = [{ id: "paper", label: "Paper", desc: "Neutral page behind white cards.", sw: ["#F7F7F8", "#FFFFFF", "#FFFFFF", "#D7DCE0"] }, { id: "mist", label: "Mist", desc: "Pale-blue page. Softer, more brand.", sw: ["#EEF3FB", "#FFFFFF", "#FFFFFF", "#D3DEEE"] }, { id: "sky", label: "Sky", desc: "Azure-tinted page. Fresh, clear.", sw: ["#E8F1FA", "#FFFFFF", "#FFFFFF", "#C9DAEC"] }, { id: "frost", label: "Frost", desc: "Cool gray, stronger edges. Dense data.", sw: ["#F0F3F7", "#FFFFFF", "#FFFFFF", "#CBD3DC"] }] as const;

export const ACCENTS = [{ id: "azure", label: "Azure", desc: "Azure Blue leads. Default.", sw: "#116CB3" }, { id: "navy", label: "Navy", desc: "Corporate Navy leads. Calmer, formal.", sw: "#21346E" }] as const;

export const RADII = [{ id: "sharp", label: "Sharp", px: "2 · 3 · 4 · 6" }, { id: "standard", label: "Standard", px: "4 · 6 · 8 · 12" }, { id: "soft", label: "Soft", px: "6 · 10 · 14 · 20" }, { id: "round", label: "Round", px: "8 · 14 · 20 · 28" }] as const;

export const NAVS = [{ id: "surface", label: "Light", bg: "var(--t-color-surface-default)", fg: "var(--t-color-text-secondary)" }, { id: "tint", label: "Tinted", bg: "#EFF4FB", fg: "#4A555E" }, { id: "navy", label: "Navy", bg: "#21346E", fg: "#D6DDF2" }, { id: "ink", label: "Ink", bg: "#000913", fg: "#D6DDF2" }, { id: "azure", label: "Azure", bg: "#116CB3", fg: "#FFFFFF" }] as const;

export interface Appearance { mode: Mode; dark: (typeof DARKS)[number]["id"]; light: (typeof LIGHTS)[number]["id"]; radius: (typeof RADII)[number]["id"]; density: "comfortable" | "compact"; accent: (typeof ACCENTS)[number]["id"]; nav: (typeof NAVS)[number]["id"] }

const DEFAULT: Appearance = { mode: "system", dark: "midnight", light: "paper", radius: "standard", density: "comfortable", accent: "azure", nav: "surface" };

const KEY = "ui.appearance";

function read(): Appearance {
  let s: Partial<Appearance> = {};
  try { s = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { /* ignore */ }
  const q = new URLSearchParams(location.search);
  const o: Partial<Appearance> = { mode: (q.get("theme") as Mode) || undefined, dark: q.get("dark") as Appearance["dark"] || undefined, light: q.get("light") as Appearance["light"] || undefined, radius: q.get("radius") as Appearance["radius"] || undefined, density: q.get("density") as Appearance["density"] || undefined, accent: q.get("accent") as Appearance["accent"] || undefined, nav: q.get("nav") as Appearance["nav"] || undefined };
  Object.keys(o).forEach((k) => o[k as keyof Appearance] === undefined && delete o[k as keyof Appearance]);
  return { ...DEFAULT, ...s, ...o };
}

function apply(a: Appearance) {
  const r = document.documentElement; const dark = a.mode === "dark" || (a.mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  r.dataset.theme = dark ? "dark" : "light"; r.dataset.dark = a.dark; r.dataset.light = a.light; r.dataset.radius = a.radius; r.dataset.density = a.density; r.dataset.accent = a.accent; r.dataset.nav = a.nav;
}

// Safe on the server (Next.js): nothing touches the browser until it runs in one. The server and the first client render both see DEFAULT, then the stored choice applies.
const isBrowser = typeof window !== "undefined";
let state: Appearance = DEFAULT;
const subs = new Set<() => void>();
if (isBrowser) {
  state = read();
  apply(state);
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => apply(state));
}

export function setAppearance(p: Partial<Appearance>) { state = { ...state, ...p }; apply(state); try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } subs.forEach((f) => f()); }

export function useAppearance() { const a = React.useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => state, () => DEFAULT); return [a, setAppearance] as const; }

export const isDarkNav = (a: Appearance) => a.nav === "navy" || a.nav === "ink" || a.nav === "azure";

function Option({ selected, onSelect, children, label }: { selected: boolean; onSelect: () => void; children: React.ReactNode; label: string }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onSelect} className={cn("press relative rounded-card border p-2 text-start transition-colors duration-100", selected ? "border-action-primary ring-1 ring-action-primary" : "border-subtle hover:border-strong")}>
      {children}{selected && <span className="absolute end-2 top-2 grid size-4 place-items-center rounded-round bg-action-primary text-action-primary-fg"><Check className="size-3" strokeWidth={3} aria-hidden /></span>}<span className="sr-only">{label}</span>
    </button>);
}

const H = ({ children }: { children: React.ReactNode }) => <h3 className="mb-2 text-body font-medium text-primary">{children}</h3>;

export function AppearancePanel({ compact }: { compact?: boolean }) {
  const [a, set] = useAppearance();
  return (
    <div className="flex flex-col gap-6">
      <section><H>Mode</H><Segmented label="Mode" items={["System", "Light", "Dark"]} value={a.mode[0].toUpperCase() + a.mode.slice(1)} onChange={(v) => set({ mode: v.toLowerCase() as Mode })} /></section>
      <section><H>Dark mode</H><div className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3")}>{DARKS.map((d) => (
        <Option key={d.id} label={d.label} selected={a.dark === d.id} onSelect={() => set({ dark: d.id, mode: a.mode === "light" ? "dark" : a.mode })}><ThemeSwatch theme="dark" variant={d.id} /><p className="mt-2 text-body-sm font-medium">{d.label}</p>{!compact && <p className="text-caption text-secondary">{d.desc}</p>}</Option>))}</div></section>
      <section><H>Light page</H><div className="grid grid-cols-2 gap-2">{LIGHTS.map((d) => (
        <Option key={d.id} label={d.label} selected={a.light === d.id} onSelect={() => set({ light: d.id, mode: a.mode === "dark" ? "light" : a.mode })}><ThemeSwatch theme="light" variant={d.id} /><p className="mt-2 text-body-sm font-medium">{d.label}</p>{!compact && <p className="text-caption text-secondary">{d.desc}</p>}</Option>))}</div></section>
      <section><H>Accent</H><div className="grid grid-cols-2 gap-2">{ACCENTS.map((x) => (
        <Option key={x.id} label={x.label} selected={a.accent === x.id} onSelect={() => set({ accent: x.id })}><div className="flex items-center gap-2"><span className="h-8 flex-1 rounded-control" style={{ background: x.sw }} aria-hidden /><span className="inline-flex h-8 items-center rounded-control px-3 text-caption font-semibold text-white" style={{ background: x.sw }} aria-hidden>Button</span></div><p className="mt-2 text-body-sm font-medium">{x.label}</p>{!compact && <p className="text-caption text-secondary">{x.desc}</p>}</Option>))}</div></section>
      <section><H>Corners</H><div className="grid grid-cols-4 gap-2">{RADII.map((r) => (
        <Option key={r.id} label={r.label} selected={a.radius === r.id} onSelect={() => set({ radius: r.id })}><div data-radius={r.id} className="h-10 border-2 border-control bg-surface-sunken" style={{ borderRadius: "var(--t-radius-card)" }} aria-hidden /><p className="mt-2 text-body-sm font-medium">{r.label}</p>{!compact && <p className="tnum text-caption text-tertiary">{r.px}</p>}</Option>))}</div></section>
      <section><H>Navigation style</H><div className="grid grid-cols-5 gap-2">{NAVS.map((n) => (
        <Option key={n.id} label={n.label} selected={a.nav === n.id} onSelect={() => set({ nav: n.id })}><div className="flex h-10 overflow-hidden rounded-control border border-subtle" aria-hidden><div className="w-1/3" style={{ background: n.bg }}><div className="m-1.5 h-1 rounded-tag" style={{ background: n.fg, opacity: .7 }} /><div className="mx-1.5 h-1 rounded-tag" style={{ background: n.fg, opacity: .4 }} /></div><div className="flex-1 bg-surface-sunken" /></div><p className="mt-2 text-body-sm font-medium">{n.label}</p></Option>))}</div></section>
      <section><H>Density</H><Segmented label="Density" items={["Comfortable", "Compact"]} value={a.density === "compact" ? "Compact" : "Comfortable"} onChange={(v) => set({ density: v.toLowerCase() as Appearance["density"] })} /></section>
      <div><Button size="sm" variant="ghost" onClick={() => set(DEFAULT)}>Reset to defaults</Button></div>
    </div>);
}
