import { useState } from "react";
import { Plus, Copy, Pencil, Trash2, Share2, ScanLine, FileText, Users, Trophy, Gift, Sparkles } from "lucide-react";
import { Button, Specimen, Card, StatusPill, useToast, Segmented } from "@bytesphere/ui";
import { PageHeader } from "@bytesphere/ui";
import { OtpInput, RatingInput, DateRangePicker, AnimatedNumber, Typewriter, Reveal, TiltCard, SpotlightCard, RippleButton, fireConfetti, Achievement, StreakBadge, SpeedDial, SplitButton, HoverCard, ContextMenuArea, Carousel, LogoMarquee, CompareSlider, SortableList, ReactionBar, FlipCard, ResizableSplit, ColorSwatchPicker, MentionInput, Tour, ScrollProgress } from "@bytesphere/ui";
import { DotsWave, Equalizer, Radar, RingSpin, ShimmerText, TypingDots, GridPulse, DeterminateRing, RotatingMessage } from "@bytesphere/ui";
import { BrandMark } from "@bytesphere/ui";

const Cell = ({ label, children }: { label: string; children: React.ReactNode }) => <div className="flex flex-col items-center gap-3 rounded-card border border-subtle bg-surface-sunken p-5"><div className="flex min-h-14 items-center justify-center">{children}</div><p className="text-body-sm text-secondary">{label}</p></div>;

export function LoadersMore() {
  const [p, setP] = useState(64);
  return (
    <>
      <PageHeader title="More loaders" desc="Nine extra loaders for specific jobs. The brand mark loaders stay the default for page-level waits." />
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Cell label="L-10 Dots wave · inline, buttons"><DotsWave /></Cell><Cell label="L-11 Equalizer · processing, audio"><Equalizer /></Cell><Cell label="L-12 Radar · searching, scanning"><Radar /></Cell><Cell label="L-13 Ring · small spinner"><RingSpin /></Cell>
        <Cell label="L-14 Shimmer text · AI or long task"><ShimmerText>Analyzing your data</ShimmerText></Cell><Cell label="L-15 Typing · chat"><TypingDots /></Cell><Cell label="L-16 Grid pulse · syncing"><GridPulse /></Cell><Cell label="L-17 Rotating message · waits over 5 s"><RotatingMessage messages={["Reading your file", "Matching 1,640 items", "Almost there"]} /></Cell>
        <Cell label="L-18 Determinate ring"><DeterminateRing value={p} /></Cell><Cell label="Brand mark · default"><BrandMark size={36} animate="swirl" /></Cell>        <Cell label="Drive the ring"><Segmented label="Value" items={["0", "35", "64", "100"]} value={String(p)} onChange={(v) => setP(+v)} /></Cell>
      </div>
      <p className="mt-6 max-w-2xl text-body text-secondary">Choosing: under 300 ms show nothing. 300 ms to 2 s a spinner or dots. Over 2 s a skeleton of the real layout. Over 5 s a determinate bar with a message and a cancel. Never two loaders at once.</p>
    </>);
}

export function InteractiveLab() {
  const toast = useToast(); const [rate, setRate] = useState(3); const [tour, setTour] = useState(false); const [color, setColor] = useState("#116CB3"); const [otpOk, setOtpOk] = useState<string | null>(null); const [n, setN] = useState(46231);
  const [items, setItems] = useState([{ id: 1, t: "Plan" }, { id: 2, t: "Build" }, { id: 3, t: "Review" }, { id: 4, t: "Release" }]);
  const art = (c: string, t: string) => <div className="grid h-full place-items-center text-h3 font-semibold text-white" style={{ background: c }}>{t}</div>;
  return (
    <>
      <ScrollProgress />
      <PageHeader title="Interactive lab" desc="Modern interaction components. Each is keyboard accessible, respects reduced motion, and is imported from @/components." actions={<Button onClick={() => setTour(true)}><Sparkles />Take the tour</Button>} />
      <div className="flex flex-col gap-10">
        <Specimen title="Input" note="OtpInput · RatingInput · ColorSwatchPicker · MentionInput · DateRangePicker">
          <div className="grid gap-8 lg:grid-cols-2"><div className="flex flex-col gap-6"><div><p className="mb-2 text-body font-medium">Verification code (try pasting 123456)</p><OtpInput onComplete={(c) => setOtpOk(c)} error={otpOk === "000000"} />{otpOk && <p className="m-fade mt-2 text-body-sm text-secondary">Entered {otpOk}. {otpOk === "000000" ? "That code didn’t work." : ""}</p>}</div>
            <div><p className="mb-1 text-body font-medium">Rating</p><RatingInput value={rate} onChange={setRate} /></div><div><p className="mb-2 text-body font-medium">Label color</p><ColorSwatchPicker value={color} onChange={setColor} /></div><div><p className="mb-2 text-body font-medium">Comment</p><MentionInput people={["Kenji Ito", "Amara Okafor", "Lars Lindqvist", "Priya Raghavan"]} /></div></div>
            <div><p className="mb-2 text-body font-medium">Date range</p><DateRangePicker /></div></div></Specimen>
        <Specimen title="Actions" note="SplitButton · RippleButton · SpeedDial · ContextMenuArea · HoverCard">
          <div className="grid gap-8 md:grid-cols-2"><div className="flex flex-wrap items-center gap-4"><SplitButton label="Save" onClick={() => toast({ tone: "success", title: "Saved" })} options={[{ label: "Save and close" }, { label: "Save as draft" }]} /><RippleButton onClick={() => {}}>Ripple</RippleButton>
            <p className="w-full text-body">Assigned to <HoverCard trigger="Kenji Ito"><span className="flex flex-col gap-1"><b>Kenji Ito</b><span className="text-body-sm text-secondary">Staff engineer · Tokyo</span><span className="text-body-sm">12 open tasks · online</span></span></HoverCard>.</p></div>
            <div className="flex items-start justify-between gap-4"><ContextMenuArea className="flex-1 rounded-card border border-dashed border-strong p-6 text-center text-body text-secondary" items={[{ label: "Copy link", icon: Copy, onSelect: () => toast({ tone: "info", title: "Link copied" }) }, { label: "Rename", icon: Pencil }, { label: "Share", icon: Share2 }, { label: "Delete", icon: Trash2, danger: true }]}>Right-click or long-press here</ContextMenuArea><SpeedDial actions={[{ label: "New deal", icon: FileText }, { label: "Scan item", icon: ScanLine }, { label: "Invite", icon: Users }]} /></div></div></Specimen>
        <Specimen title="Surfaces and motion" note="TiltCard · SpotlightCard · FlipCard · AnimatedNumber · Typewriter · Reveal"><div className="grid gap-4 md:grid-cols-3"><TiltCard><p className="text-body-sm text-secondary">Tilt (marketing)</p><p className="mt-2 text-h4 font-semibold">Move over me</p></TiltCard><SpotlightCard><p className="text-body-sm text-secondary">Spotlight</p><p className="mt-2 text-h4 font-semibold">Follows your cursor</p></SpotlightCard><FlipCard front={<><p className="text-body-sm text-secondary">Tap to flip</p><p className="mt-2 text-h4 font-semibold">Team plan</p></>} back={<><p className="text-body font-semibold">$19 per seat</p><p className="text-body-sm text-secondary">Unlimited projects, 100 GB, Slack and Gmail.</p></>} /></div>
          <div className="mt-6 grid gap-6 md:grid-cols-2"><div><p className="text-body-sm text-secondary">Counts up once</p><p className="text-[40px] font-semibold leading-[3rem] tracking-[-0.03em]"><AnimatedNumber value={n} format={(x) => `$${Math.round(x).toLocaleString("en-US")}`} /></p><Button size="sm" onClick={() => setN(Math.round(20000 + Math.random() * 60000))}>New value</Button></div><div><p className="text-body-sm text-secondary">Typewriter</p><p className="text-h4"><Typewriter text="Hi Mia. Three deals need you today." /></p></div></div>
          <Reveal className="mt-6"><Card>Scroll reveal: this card fades and rises once as it enters the viewport.</Card></Reveal></Specimen>
        <Specimen title="Layout and media" note="Carousel · LogoMarquee · CompareSlider · ResizableSplit · SortableList">
          <div className="flex flex-col gap-8"><LogoMarquee items={["Northwind", "Contoso", "Fabrikam", "Tailspin", "Wingtip", "Litware", "Proseware"]} /><Carousel slides={[art("#21346E", "One"), art("#116CB3", "Two"), art("#000913", "Three")].map((s, i) => <div key={i} className="h-40 overflow-hidden rounded-card">{s}</div>)} />
            <CompareSlider before={art("#5E6D78", "Before")} after={art("#116CB3", "After")} /><ResizableSplit left={<p className="text-body">Drag the divider or press arrow keys.</p>} right={<p className="text-body text-secondary">Detail pane.</p>} />
            <SortableList items={items} onChange={setItems} render={(t, i) => <span className="text-body"><span className="tnum me-3 text-tertiary">{i + 1}</span>{t.t}</span>} /></div></Specimen>
        <Specimen title="Delight" note="Confetti · Achievement · StreakBadge · ReactionBar. Rare on purpose."><div className="flex flex-col gap-4"><div className="flex flex-wrap items-center gap-3"><Button onClick={(e) => fireConfetti({ x: e.clientX, y: e.clientY })}><Gift />Celebrate</Button><StreakBadge days={7} /><ReactionBar /></div><Achievement title="First deal closed" body="You won D-1042. Nice work." icon={Trophy} /></div></Specimen>
        <span data-tour="status" className="hidden"><StatusPill>x</StatusPill><Plus /></span>
      </div>
      <Tour open={tour} onClose={() => setTour(false)} steps={[{ target: "h1", title: "Welcome to the lab", body: "A tour highlights one thing at a time and can always be skipped." }, { target: "[aria-label='Verification code']", title: "Code entry", body: "Paste a whole code and every box fills." }, { target: "[aria-label='Carousel']", title: "Carousel", body: "Scroll-snap, arrows and dots. It never auto-advances." }]} />
    </>);
}
