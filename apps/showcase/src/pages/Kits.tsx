import { useState } from "react";
import { Zap, ShieldCheck, Layers, BarChart3, Users, Gauge, Bell, Sparkles, CircleCheck } from "lucide-react";
import { Specimen, Label, Segmented, Button, cn, StatusPill } from "@bytesphere/ui";
import { SurfaceCard, Glass, MediaCard, BannerCard, PortraitCard, HeaderStripCard, IconCard, ActionCard, ListCard, ProfileCard, Backdrop, SiteFooter, type SurfaceVariant, type BackdropVariant, type FooterVariant } from "@bytesphere/ui";
import { StatTile, ProgressBar, ProgressSegmented, ProgressSteps, ProgressStacked, ProgressRing, ProgressHalf, ProgressBullet, ProgressGoal, ProgressBuffer, ProgressIndeterminate, SkeletonKit, Heatmap, Funnel, ColumnBars, StackedBars, type StatStyle, type SkKind, type SkAnim } from "@bytesphere/ui";
import { LineChart } from "@bytesphere/ui";
import { months, revNow, revPrev } from "../data";

export function SurfacesPage() {
  const variants: SurfaceVariant[] = ["flat", "outlined", "raised", "tinted", "brand", "ink", "glass", "dashed"];
  const backs: BackdropVariant[] = ["solid", "tint", "navy", "ink", "brand", "grid", "dots", "lines", "rings", "waves", "stripes", "checks"];
  const [foot, setFoot] = useState<FooterVariant>("columns");
  const note: Record<string, string> = { flat: "Sits on a sunken page. No edge.", outlined: "Default. 1px border.", raised: "Border + level-1 shadow. For linked or draggable cards.", tinted: "Pale Blue. Calls, callouts, selected.", brand: "Corporate Navy. One per view at most.", ink: "Rich Black. Ops, hero stats.", glass: "Overlay only. Needs a backdrop.", dashed: "Add-new and empty slots." };
  return (
    <div className="flex flex-col gap-12">
      <Specimen title="Card surfaces" note="Eight styles. Pick one per layout." doc="surfaces.tsx · SurfaceCard">
        <div className="rounded-card bg-surface-sunken p-5"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{variants.map((v) => <div key={v} className={cn("relative overflow-hidden rounded-card", v === "glass" && "p-3")}>{v === "glass" && <Backdrop variant="rings" className="bg-action-primary" />}<SurfaceCard variant={v} className="relative h-full"><p className="text-body font-semibold capitalize">{v}</p><p className={cn("mt-1 text-body-sm", v === "brand" || v === "ink" ? "opacity-90" : "text-secondary")}>{note[v]}</p></SurfaceCard></div>)}</div></div>
        <p className="mt-3 text-body-sm text-secondary">Glass is the only style with blur and transparency. It is allowed on sticky bars over content, cards over media or a brand backdrop, and nowhere else. Text must hold 4.5:1 on the worst backdrop.</p>
      </Specimen>

      <Specimen title="Glass, in its place" note="Blur and transparency, with guardrails." doc="surfaces.tsx · Glass">
        <div className="grid gap-4 md:grid-cols-3"><Glass over="brand"><p className="text-body font-semibold">Over Azure</p><p className="mt-1 text-body-sm">70% white, 12px blur, Rich Black text: 12.9:1 over Azure Blue, 11.3:1 over Navy, 9.7:1 over Ink.</p></Glass><Glass over="navy"><p className="text-body font-semibold">Over Navy</p><p className="mt-1 text-body-sm">Same card, different backdrop.</p></Glass><Glass over="pattern"><p className="text-body font-semibold">Over a pattern</p><p className="mt-1 text-body-sm">Patterns stay under 16% opacity.</p></Glass></div>
      </Specimen>

      <Specimen title="Rectangle layouts" note="Eight shapes beyond the plain card." doc="surfaces.tsx">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <MediaCard side="left" icon={Zap} title="Faster approvals" meta="Guide · 4 min" body="Route requests by amount and role." action={<Button size="sm">Read</Button>} />
          <MediaCard side="right" icon={ShieldCheck} tone="navy" title="Security checklist" meta="Admin" body="Eight things to turn on this week." />
          <MediaCard side="top" icon={Layers} tone="azure" title="Import from CSV" meta="Setup" body="Bring your deals in two minutes." />
          <HeaderStripCard title="Q1 target" strip="primary">Revenue is at 82% of target with 3 weeks left.</HeaderStripCard>
          <HeaderStripCard title="Payment overdue" strip="danger">Contoso is 12 days late. Send a reminder.</HeaderStripCard>
          <ActionCard title="Add a data source" body="Connect a CRM or upload a file." primary="Connect" secondary="Learn more" />
          <IconCard icon={BarChart3} title="Reports" body="Schedule a weekly summary to your team." href="#" />
          <IconCard icon={Users} title="No icon variant" body="Same card without the icon tile, for denser grids." svg={false} />
          <ListCard title="Top accounts" action="View all" rows={[{ label: "Wingtip", sub: "Business", value: "$103.9K" }, { label: "Contoso", sub: "Team", value: "$48.3K" }, { label: "Proseware", sub: "Team", value: "$18.6K" }]} />
          <ProfileCard id="u5" name="Priya Raghavan" role="Finance operations lead" stats={[["Deals", "42"], ["Won", "31"], ["Rate", "74%"]]} />
          <div className="grid grid-cols-3 gap-3 xl:col-span-2"><PortraitCard title="Receiving" meta="Operations" /><PortraitCard title="Approvals" meta="Finance" tone="azure" /><PortraitCard title="Onboarding" meta="People" tone="tint" /></div>
          <div className="md:col-span-2 xl:col-span-3 grid gap-4 md:grid-cols-3"><BannerCard title="Upgrade to Business" body="SSO, 12-month audit log and 8-hour support." cta="See plans" /><BannerCard tone="brand" title="Scanning is live" body="Receiving and cycle counts on any handheld." cta="Open scanner" /><BannerCard tone="ink" title="Dark by default" body="Ink mode for warehouses and night shifts." cta="Try Ink" /></div>
        </div>
      </Specimen>

      <Specimen title="Backgrounds" note="Solid, tint and brand fills, plus SVG patterns and two CSS-only patterns." doc="surfaces.tsx · Backdrop">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">{backs.map((b) => <div key={b} className="relative h-28 overflow-hidden rounded-card border border-subtle"><Backdrop variant={b} /><span className={cn("relative m-2 inline-block rounded-tag px-1.5 py-0.5 text-caption font-medium", "bg-surface-raised text-primary")}>{b}{["stripes", "checks"].includes(b) ? " · css" : ["solid", "tint", "navy", "ink", "brand"].includes(b) ? "" : " · svg"}</span></div>)}</div>
        <p className="mt-3 text-body-sm text-secondary">Patterns belong on marketing heroes, auth panels, empty states and banners. Never behind a table, a form or a chart.</p>
      </Specimen>

      <Specimen title="Footers" note="Six styles." doc="surfaces.tsx · SiteFooter" pad={false}>
        <div className="border-b border-subtle p-4"><Segmented label="Footer style" items={["columns", "simple", "minimal", "newsletter", "navy", "app"]} value={foot} onChange={(v) => setFoot(v as FooterVariant)} /></div>
        <div className="overflow-hidden rounded-b-card bg-surface-sunken"><div className="h-12" /><SiteFooter variant={foot} /></div>
      </Specimen>
    </div>);
}

export function DataKitPage() {
  const stats: StatStyle[] = ["plain", "spark", "icon", "bar", "delta", "split", "ring", "inverse"];
  const kinds: SkKind[] = ["text", "avatar", "card", "table", "chart", "list", "media", "form", "kpi", "profile", "product", "dashboard"];
  const [anim, setAnim] = useState<SkAnim>("pulse"); const [kind, setKind] = useState<SkKind>("card");
  return (
    <div className="flex flex-col gap-12">
      <Specimen title="Stat tiles" note="Eight ways to show one number." doc="data-kit.tsx · StatTile">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((s) => <div key={s}><StatTile style={s} icon={s === "icon" ? Gauge : undefined} label="Net revenue" value="$46.2K" delta="4.2%" data={revNow} pct={72} target="Target $64K" /><p className="mt-1.5 text-center font-mono text-caption text-tertiary">{s}</p></div>)}</div>
      </Specimen>

      <Specimen title="Progress" note="Eleven forms. One per job." doc="data-kit.tsx · Progress*">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          <div><Label>Linear · xs / sm / md / lg</Label><div className="flex flex-col gap-3"><ProgressBar label="xs" size="xs" value={40} /><ProgressBar label="sm" size="sm" value={55} /><ProgressBar label="md" value={70} showValue /><ProgressBar label="lg" size="lg" value={85} showValue tone="navy" /></div></div>
          <div><Label>Tones</Label><div className="flex flex-col gap-3"><ProgressBar label="Primary" value={60} /><ProgressBar label="Success" value={100} tone="success" /><ProgressBar label="Warning" value={86} tone="warning" /><ProgressBar label="Danger" value={104} max={100} tone="danger" /></div></div>
          <div><Label>Segmented · 5 steps</Label><ProgressSegmented label="Setup" value={3} /></div>
          <div><Label>Steps with labels</Label><ProgressSteps steps={["Draft", "Review", "Approve", "Publish"]} current={2} /></div>
          <div><Label>Stacked</Label><ProgressStacked label="Deals by stage" total={50} parts={[{ label: "Proposal", value: 14, color: "var(--color-data-1)" }, { label: "Negotiation", value: 9, color: "var(--color-data-2)" }, { label: "Won", value: 22, color: "var(--color-data-3)" }, { label: "Stalled", value: 5, color: "var(--color-data-6)" }]} /></div>
          <div><Label>Goal with quarter marks</Label><ProgressGoal label="Quarterly revenue" value={412000} goal={500000} unit="" /></div>
          <div><Label>Bullet · value vs target</Label><ProgressBullet label="Accuracy" value={97.4} target={98} bands={[90, 96, 100]} unit="%" /></div>
          <div><Label>Buffer and indeterminate</Label><div className="flex flex-col gap-3"><ProgressBuffer label="Playback" played={34} buffered={62} /><ProgressIndeterminate label="Working" /></div></div>
          <div><Label>Ring</Label><div className="flex items-center gap-5"><ProgressRing value={72} label="Coverage" /><ProgressRing value={100} tone="success" label="Done" center="Done" /><ProgressRing value={38} tone="warning" size={56} stroke={6} label="Storage" /></div></div>
          <div><Label>Half ring · a single KPI only</Label><ProgressHalf value={74} label="Capacity" caption="Warehouse capacity" /></div>
        </div>
      </Specimen>

      <Specimen title="Charts" note="Token colors, tabular numbers, a text alternative." doc="kit.tsx · data-kit.tsx">
        <div className="grid gap-8 lg:grid-cols-2">
          <div><Label>Line with comparison</Label><LineChart labels={months} height={200} yMax={60} yMin={20} unit="K" series={[{ name: "Previous", data: revPrev, color: "var(--color-data-6)", dashed: true }, { name: "This period", data: revNow, color: "var(--color-data-1)" }]} /></div>
          <div><Label>Stacked columns</Label><StackedBars labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]} data={[[12, 6, 3], [14, 7, 3], [13, 9, 4], [17, 8, 5], [18, 10, 4], [21, 11, 6]]} series={[{ name: "Team", color: "var(--color-data-1)" }, { name: "Business", color: "var(--color-data-2)" }, { name: "Enterprise", color: "var(--color-data-3)" }]} /></div>
          <div><Label>Columns with highlight</Label><ColumnBars data={[18, 24, 20, 31, 27, 35, 29]} labels={["M", "T", "W", "T", "F", "S", "S"]} highlight={5} /></div>
          <div><Label>Funnel</Label><Funnel stages={[{ label: "Visited", value: 12400 }, { label: "Signed up", value: 3100 }, { label: "Activated", value: 1480 }, { label: "Paid", value: 410 }]} /></div>
          <div className="lg:col-span-2"><Label>Heatmap · activity by hour</Label><Heatmap label="Activity" rows={["Mon", "Tue", "Wed", "Thu", "Fri"]} cols={["8", "10", "12", "14", "16", "18"]} data={[[2, 8, 6, 9, 7, 2], [3, 9, 7, 10, 8, 3], [4, 10, 8, 9, 9, 4], [3, 8, 6, 8, 7, 2], [2, 6, 5, 6, 4, 1]]} /></div>
        </div>
      </Specimen>

      <Specimen title="Skeletons" note="Twelve shapes, four animations. Pick the animation once per product." doc="data-kit.tsx · SkeletonKit">
        <div className="mb-5 flex flex-wrap items-center gap-4"><div><Label>Animation</Label><Segmented label="Animation" items={["pulse", "wave", "static", "mark"]} value={anim} onChange={(v) => setAnim(v as SkAnim)} /></div><div><Label>Shape</Label><Segmented label="Shape" items={["card", "table", "list", "chart", "product", "dashboard"]} value={["card", "table", "list", "chart", "product", "dashboard"].includes(kind) ? kind : "card"} onChange={(v) => setKind(v as SkKind)} /></div></div>
        <div className="max-w-xl rounded-card bg-surface-sunken p-5"><SkeletonKit kind={kind} anim={anim} /></div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{kinds.map((k) => <div key={k}><p className="mb-1.5 font-mono text-caption text-tertiary">{k}</p><SkeletonKit kind={k} anim={anim} /></div>)}</div>
        <ul className="mt-6 grid gap-2 text-body-sm text-secondary md:grid-cols-2"><li><b className="font-medium text-primary">pulse</b> · default; opacity 1 → .55 over 1.5s</li><li><b className="font-medium text-primary">wave</b> · same pulse, staggered 110ms per block; for long lists</li><li><b className="font-medium text-primary">static</b> · reduced motion, print and low-power</li><li><b className="font-medium text-primary">mark</b> · brand trace loader on top; for full panels</li></ul>
      </Specimen>
    </div>);
}
