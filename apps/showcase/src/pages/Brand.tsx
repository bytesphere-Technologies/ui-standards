import { Specimen, Label, cn, Button, StatusPill, Avatar } from "@bytesphere/ui";
import { Logo, BrandMark, BootLoader } from "@bytesphere/ui";
import { Backdrop, SiteFooter } from "@bytesphere/ui";
import { TopBar, SideNav } from "@bytesphere/ui";
import { Mail, Download, X, Check } from "lucide-react";

const Tile = ({ bg, children, label, dark, h = "h-32" }: { bg: string; children: React.ReactNode; label: string; dark?: boolean; h?: string }) => (
  <div><div className={cn("relative grid place-items-center overflow-hidden rounded-card border border-subtle", h)} style={{ background: bg }}>{children}</div><p className="mt-1.5 text-caption text-tertiary">{label}{dark ? "" : ""}</p></div>);

export function BrandPage() {
  return (
    <div className="flex flex-col gap-12">
      <Specimen title="Lockups" note="Four forms, all outlined vector. No font needed." doc="brand.tsx · Logo">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Tile bg="#fff" label="horizontal (default)"><Logo height={56} tone="navy" /></Tile>
          <Tile bg="#fff" label="stacked" h="h-32"><Logo variant="stacked" height={92} tone="navy" /></Tile>
          <Tile bg="#fff" label="mark"><Logo variant="mark" height={64} tone="navy" /></Tile>
          <Tile bg="#fff" label="wordmark"><Logo variant="wordmark" height={56} tone="navy" /></Tile>
        </div>
      </Specimen>

      <Specimen title="Tones on backgrounds" note="Use the tone that holds contrast. Never place color logos on busy or mid-tone areas." doc="brand.tsx · Logo tone">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Tile bg="#FFFFFF" label="white page · tone navy"><Logo tone="navy" height={44} /></Tile>
          <Tile bg="#DBE7F7" label="Pale Blue · tone navy"><Logo tone="navy" height={44} /></Tile>
          <Tile bg="#F7F7F8" label="light gray · auto"><Logo height={44} /></Tile>
          <Tile bg="#21346E" label="Corporate Navy · tone white"><Logo tone="white" height={44} /></Tile>
          <Tile bg="#116CB3" label="Azure Blue · tone white"><Logo tone="white" height={44} /></Tile>
          <Tile bg="#000913" label="Rich Black · tone white"><Logo tone="white" height={44} /></Tile>
          <div data-theme="dark" data-dark="midnight"><Tile bg="var(--t-color-surface-default)" label="Midnight · auto"><Logo height={44} /></Tile></div>
          <div data-theme="dark" data-dark="navy"><Tile bg="var(--t-color-surface-default)" label="Navy mode · auto"><Logo height={44} /></Tile></div>
          <div data-theme="dark" data-dark="slate"><Tile bg="var(--t-color-surface-default)" label="Slate · auto"><Logo height={44} /></Tile></div>
          <Tile bg="#fff" label="one color · black"><Logo tone="black" height={44} /></Tile>
          <Tile bg="#116CB3" label="on brand pattern"><Backdrop variant="rings" /><div className="relative"><Logo tone="white" height={44} /></div></Tile>
          <Tile bg="#fff" label="stacked on dark" dark><div className="grid size-full place-items-center bg-[#21346E]"><Logo variant="stacked" tone="white" height={92} /></div></Tile>
        </div>
      </Specimen>

      <Specimen title="Clear space and size" doc="01-foundations/logo-and-brand-usage.md">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="grid place-items-center rounded-card bg-surface-sunken p-8"><div className="relative border border-dashed border-[var(--color-action-primary)] p-[28px]"><div className="absolute inset-[28px] border border-[var(--color-subtle)]" aria-hidden /><Logo tone="navy" height={72} /><span className="absolute -top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 rounded-tag bg-surface-raised px-1 font-mono text-[10px] text-link">x</span></div></div>
          <ul className="flex flex-col gap-3 text-body text-secondary"><li><b className="font-medium text-primary">Clear space</b> equals half the height of the mark on every side. Nothing enters it.</li><li><b className="font-medium text-primary">Minimum size</b> 24px for the mark, 96px wide for a horizontal lockup, 32px high for the stacked lockup.</li><li><b className="font-medium text-primary">Under 120px wide</b> drop the tagline: use <code className="font-mono text-[13px]">tagline={"{false}"}</code>.</li><li><b className="font-medium text-primary">Under 24px</b> use the mark alone.</li><li><b className="font-medium text-primary">Always</b> link the header logo to the home page and give it an accessible name.</li></ul>
        </div>
        <div className="mt-6 flex flex-wrap items-end gap-8 border-t border-subtle pt-5">{[16, 24, 32, 48, 72].map((s) => <div key={s}><Logo variant="mark" height={s} /><p className="tnum mt-1 text-center text-caption text-tertiary">{s}</p></div>)}<div className="ms-auto flex items-end gap-6"><div><Logo height={24} tagline={false} /><p className="mt-1 text-caption text-tertiary">no tagline</p></div><div><Logo height={36} /><p className="mt-1 text-caption text-tertiary">full</p></div></div></div>
      </Specimen>

      <Specimen title="Never" note="These are rejected in review." doc="01-foundations/logo-and-brand-usage.md">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[["Stretch or squash", <div style={{ transform: "scaleX(1.5)" }}><Logo tone="navy" height={32} /></div>], ["Recolor", <div style={{ filter: "hue-rotate(120deg) saturate(2)" }}><Logo tone="navy" height={36} /></div>], ["Rotate or tilt", <div style={{ transform: "rotate(-12deg)" }}><Logo tone="navy" height={36} /></div>], ["Add effects", <div style={{ filter: "drop-shadow(0 6px 5px rgba(0,0,0,.45))" }}><Logo tone="navy" height={36} /></div>], ["Low-contrast background", <div className="grid size-full place-items-center bg-[#5E9ED0]"><Logo tone="navy" height={36} /></div>], ["Retype the name", <span className="text-h3 font-bold">ByteSphere</span>], ["Crop the mark", <div className="w-16 overflow-hidden"><Logo variant="mark" tone="navy" height={64} className="-ms-6" /></div>], ["Outline or stroke", <div style={{ WebkitTextStroke: "1px red" }}><Logo tone="black" height={36} className="[&_path]:fill-none [&_path]:stroke-[#21346E] [&_path]:stroke-[6]" /></div>]].map(([l, el], i) => <div key={i}><div className="relative grid h-28 place-items-center overflow-hidden rounded-card border border-subtle bg-white">{el as React.ReactNode}<span className="absolute end-2 top-2 grid size-5 place-items-center rounded-round bg-status-danger-solid text-white"><X className="size-3" strokeWidth={3} /></span></div><p className="mt-1.5 text-body-sm text-secondary">{l as string}</p></div>)}
        </div>
      </Specimen>

      <Specimen title="In context" note="Where the name and logo appear across the product." doc="">
        <div className="grid gap-6 lg:grid-cols-2">
          <div><Label>App top bar and sidebar</Label><div className="flex h-56 overflow-hidden rounded-card border border-subtle bg-surface-sunken"><SideNav groups={[{ items: [{ id: "a", label: "Overview" }, { id: "b", label: "Deals" }] }]} current="a" brand={<Logo height={24} tagline={false} />} variant="compact" /><div className="flex-1"><TopBar center={<div className="h-8 rounded-control border border-subtle bg-surface-sunken" />} right={<Avatar id="u1" name="Mia Moreno" />} /></div></div></div>
          <div><Label>Auth card</Label><div className="grid h-56 place-items-center rounded-card border border-subtle bg-surface-sunken"><div className="w-64 rounded-card border border-subtle bg-surface-raised p-5"><Logo height={30} /><p className="mt-4 text-h4 font-semibold">Sign in</p><div className="mt-3 h-8 rounded-control border border-control bg-input" /><Button className="mt-3 w-full" variant="primary">Sign in</Button></div></div></div>
          <div><Label>Email header and invoice</Label><div className="grid gap-3 sm:grid-cols-2"><div className="overflow-hidden rounded-card border border-subtle bg-white text-[#000913]"><div className="flex items-center gap-2 border-b border-[#D7DCE0] p-3"><Logo tone="navy" height={26} /></div><div className="space-y-1.5 p-3"><p className="flex items-center gap-1.5 text-body-sm font-semibold"><Mail className="size-4 text-[#116CB3]" />Your invoice is ready</p><div className="h-1.5 w-4/5 rounded-tag bg-[#ECEDEE]" /><div className="h-1.5 w-3/5 rounded-tag bg-[#ECEDEE]" /></div></div>
            <div className="overflow-hidden rounded-card border border-subtle bg-white p-3 text-[#000913]"><div className="flex items-start justify-between"><Logo tone="navy" variant="wordmark" height={26} tagline={false} /><span className="font-mono text-caption">INV-1042</span></div><div className="mt-3 space-y-1.5"><div className="h-1.5 rounded-tag bg-[#ECEDEE]" /><div className="h-1.5 rounded-tag bg-[#ECEDEE]" /><div className="h-1.5 w-2/3 rounded-tag bg-[#ECEDEE]" /></div></div></div></div>
          <div><Label>App icon, favicon, social avatar</Label><div className="flex flex-wrap items-end gap-5"><div className="grid size-20 place-items-center rounded-[22px] bg-white shadow-raised ring-1 ring-[var(--color-subtle)]"><Logo variant="mark" height={48} tone="navy" /></div><div className="grid size-20 place-items-center rounded-[22px] bg-[#21346E]"><Logo variant="mark" height={48} tone="white" /></div><div className="grid size-12 place-items-center rounded-round bg-white ring-1 ring-[var(--color-subtle)]"><Logo variant="mark" height={30} tone="navy" /></div><div className="flex items-center gap-2 rounded-t-card border border-subtle bg-surface-raised px-3 py-1.5 text-body-sm"><BrandMark size={14} />Overview · ByteSphere</div><div className="tnum text-caption text-tertiary">16 · 32 · 180 · 512</div></div></div>
          <div className="lg:col-span-2"><Label>Loading, footer</Label><div className="grid gap-4 md:grid-cols-2"><div className="overflow-hidden rounded-card border border-subtle bg-surface-raised"><BootLoader text="Preparing your workspace" /></div><div className="overflow-hidden rounded-card border border-subtle"><SiteFooter variant="navy" /></div></div></div>
        </div>
      </Specimen>

      <Specimen title="Files" note="All in public/brand/. SVGs are outlined, no font required." doc="showcase/public/brand" pad={false}>
        <table className="w-full text-body"><thead><tr className="h-9 border-b border-subtle text-body-sm text-secondary"><th className="ps-5 text-start font-medium">File</th><th className="text-start font-medium">Use</th><th className="pe-5 text-end font-medium">Preview</th></tr></thead>
          <tbody>{[["logo-horizontal.svg", "Light backgrounds"], ["logo-horizontal-dark.svg", "Dark surfaces (lightened navy and azure)"], ["logo-horizontal-white.svg", "Navy, Azure and photo backgrounds"], ["logo-stacked.svg / -dark / -white", "Splash, print, auth"], ["logo-mark.svg / -dark / -white", "Favicon source, app icon, avatars"], ["favicon.svg", "Browser tab"], ["logo-icon.png", "Raster fallback"], ["original/*", "Untouched files from the brand folder. Do not use in UI: the horizontal one needs Poppins installed."]].map(([f, u]) => <tr key={f} className="h-11 border-b border-subtle last:border-0"><td className="ps-5 font-mono text-[13px]">{f}</td><td className="text-secondary">{u}</td><td className="pe-5 text-end"><a href={`/brand/${(f as string).split(" ")[0]}`} className="inline-flex items-center gap-1 font-medium text-link hover:underline"><Download className="size-3.5" />Open</a></td></tr>)}</tbody></table>
      </Specimen>
    </div>);
}
