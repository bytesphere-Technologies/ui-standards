import { useState, useRef } from "react";
import { Eye, EyeOff, Check, Mail, ArrowRight, Circle, CircleCheck, Plus } from "lucide-react";
import { Button, Field, Input, Banner, Checkbox, Card, Progress, StatusPill, Select, Switch, Avatar, useToast, cn } from "@bytesphere/ui";
import { Logo, SuccessTick, BrandMark } from "@bytesphere/ui";
import { Stepper, TagInput } from "@bytesphere/ui";

const go = (h: string) => { location.hash = h; };
const Google = () => <svg viewBox="0 0 24 24" className="size-4" aria-hidden><path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z" /><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.2 1-3.8 1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23z" /><path fill="#FBBC05" d="M5.7 14c-.2-.7-.4-1.3-.4-2s.1-1.4.4-2V7.2H2.1a11 11 0 0 0 0 9.6z" /><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.3 1.7l3.1-3.1A11 11 0 0 0 2.1 7.2L5.7 10C6.6 7.4 9.1 5.4 12 5.4z" /></svg>;
const Microsoft = () => <svg viewBox="0 0 24 24" className="size-4" aria-hidden><path fill="#F25022" d="M2 2h9.5v9.5H2z" /><path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" /><path fill="#00A4EF" d="M2 12.5h9.5V22H2z" /><path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" /></svg>;

export function AuthFrame({ title, desc, children, quote = true, footer }: { title: string; desc?: string; children: React.ReactNode; quote?: boolean; footer?: React.ReactNode }) {
  return (
    <div className="mx-auto grid min-h-[min(46rem,calc(100dvh-8rem))] max-w-5xl overflow-hidden rounded-modal border border-subtle bg-surface-raised lg:grid-cols-[1fr_1.05fr]">
      {quote && <div className="relative hidden flex-col justify-between overflow-hidden bg-selected p-10 lg:flex"><Logo height={40} />
        <figure><blockquote className="font-display text-[22px] font-medium leading-8 tracking-[-0.01em] text-primary">“Approvals used to live in six inboxes. Now we close the month two days earlier.”</blockquote><figcaption className="mt-5 flex items-center gap-3"><Avatar id="u5" name="Priya Raghavan" /><span className="text-body"><b className="block font-medium">Priya Raghavan</b><span className="text-secondary">Finance operations lead, Wingtip</span></span></figcaption></figure>
</div>}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12"><div className="mx-auto w-full max-w-[22rem]"><div className="mb-8 lg:hidden"><Logo height={34} /></div>
        <h1 className="text-h2 font-semibold">{title}</h1>{desc && <p className="mt-1 text-body text-secondary">{desc}</p>}<div className="mt-7">{children}</div>{footer && <div className="mt-6 text-center text-body text-secondary">{footer}</div>}</div></div>
    </div>);
}
const A = ({ h, children }: { h: string; children: React.ReactNode }) => <a href={`#/${h}`} className="font-medium text-link hover:underline">{children}</a>;
const Divider = () => <div className="my-5 flex items-center gap-3 text-body-sm text-tertiary"><span className="h-px flex-1 bg-[var(--color-subtle)]" />or<span className="h-px flex-1 bg-[var(--color-subtle)]" /></div>;

export function SignIn() {
  const [show, setShow] = useState(false); const [st, setSt] = useState<"idle" | "loading" | "error">("idle"); const [rem, setRem] = useState(true); const [tries, setTries] = useState(0);
  return (
    <AuthFrame title="Sign in" desc="Welcome back. Use your work account." footer={<>New here? <A h="sign-up">Create an account</A></>}>
      <div className="flex flex-col gap-2.5"><Button size="lg" className="w-full"><Google />Continue with Google</Button><Button size="lg" className="w-full"><Microsoft />Continue with Microsoft</Button><Button size="lg" variant="ghost" className="w-full">Use single sign-on</Button></div><Divider />
      <form className="flex flex-col gap-4" noValidate onSubmit={(e) => { e.preventDefault(); setSt("loading"); setTimeout(() => { setSt("error"); setTries((t) => t + 1); }, 1100); }}>
        {st === "error" && <Banner tone="danger" callout>{tries > 2 ? "Too many attempts. Try again in 5 minutes, or reset your password." : "That email and password don’t match. Try again or reset your password."}</Banner>}
        <Field id="s-e" label="Work email">{(p) => <Input {...p} type="email" autoComplete="email" inputMode="email" defaultValue="mia@northwind.example" />}</Field>
        <Field id="s-p" label="Password">{(p) => <Input {...p} type={show ? "text" : "password"} autoComplete="current-password" end={<button type="button" aria-pressed={show} aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)} className="grid size-7 place-items-center rounded-control hover:bg-action-ghost-hover max-sm:size-10">{show ? <EyeOff /> : <Eye />}</button>} />}</Field>
        <div className="flex items-center justify-between"><Checkbox id="rem" label="Keep me signed in" checked={rem} onChange={setRem} /><A h="forgot-password">Forgot password?</A></div>
        <Button type="submit" size="lg" variant="primary" loading={st === "loading"} className="w-full">{st === "loading" ? "Signing in" : "Sign in"}</Button></form>
    </AuthFrame>);
}

export function SignUp() {
  const [pw, setPw] = useState(""); const [show, setShow] = useState(false); const [agree, setAgree] = useState(false); const [err, setErr] = useState(false);
  const rules: [string, boolean][] = [["12 or more characters", pw.length >= 12], ["Not a common password", pw.length > 0 && !/password|123456|qwerty/i.test(pw)]];
  return (
    <AuthFrame title="Create your account" desc="Free for 14 days. No card needed." footer={<>Already have an account? <A h="sign-in">Sign in</A></>}>
      <div className="grid grid-cols-2 gap-2.5"><Button size="lg"><Google />Google</Button><Button size="lg"><Microsoft />Microsoft</Button></div><Divider />
      <form className="flex flex-col gap-4" noValidate onSubmit={(e) => { e.preventDefault(); if (!agree) { setErr(true); return; } go("/verify-email"); }}>
        <div className="grid grid-cols-2 gap-3"><Field id="u-f" label="First name">{(p) => <Input {...p} autoComplete="given-name" />}</Field><Field id="u-l" label="Last name">{(p) => <Input {...p} autoComplete="family-name" />}</Field></div>
        <Field id="u-e" label="Work email">{(p) => <Input {...p} type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" />}</Field>
        <Field id="u-p" label="Password">{(p) => <Input {...p} type={show ? "text" : "password"} autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} end={<button type="button" aria-pressed={show} aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)} className="grid size-7 place-items-center rounded-control hover:bg-action-ghost-hover max-sm:size-10">{show ? <EyeOff /> : <Eye />}</button>} />}</Field>
        <ul className="-mt-1 flex flex-col gap-1 text-body-sm" aria-label="Password rules">{rules.map(([t, ok]) => <li key={t} className={cn("flex items-center gap-1.5 transition-colors", ok ? "text-status-success-fg" : "text-secondary")}>{ok ? <CircleCheck className="size-4" aria-hidden /> : <Circle className="size-4 opacity-40" aria-hidden />}{t}<span className="sr-only">{ok ? ", met" : ", not met"}</span></li>)}</ul>
        <div><Checkbox id="agree" label="I agree to the Terms and Privacy Policy" checked={agree} onChange={(v) => { setAgree(v); setErr(false); }} />{err && <p className="m-shake mt-1.5 text-body-sm text-status-danger-fg">Accept the terms to create your account.</p>}</div>
        <Button type="submit" size="lg" variant="primary" className="w-full">Create account</Button></form>
    </AuthFrame>);
}

export function ForgotPassword() {
  const [sent, setSent] = useState(false); const [busy, setBusy] = useState(false); const [cool, setCool] = useState(0);
  const send = () => { setBusy(true); setTimeout(() => { setBusy(false); setSent(true); setCool(30); const t = setInterval(() => setCool((c) => { if (c <= 1) { clearInterval(t); return 0; } return c - 1; }), 1000); }, 900); };
  return sent ? (
    <AuthFrame title="Check your email" desc="If an account exists for mia@northwind.example, we’ve sent a reset link. It expires in 1 hour." quote={false}>
      <div className="m-fade flex flex-col items-start gap-4"><span className="grid size-12 place-items-center rounded-round bg-selected"><Mail className="size-5 text-link" /></span><Button className="w-full" size="lg" reason={cool ? `You can resend in ${cool}s` : undefined} onClick={send}>{cool ? `Resend in ${cool}s` : "Resend email"}</Button><A h="reset-password">Open the link (demo)</A></div></AuthFrame>
  ) : (
    <AuthFrame title="Reset your password" desc="Enter your email and we’ll send a link." footer={<A h="sign-in">Back to sign in</A>} quote={false}>
      <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); send(); }}><Field id="f-e" label="Work email">{(p) => <Input {...p} type="email" autoComplete="email" defaultValue="mia@northwind.example" />}</Field><Button type="submit" size="lg" variant="primary" loading={busy}>{busy ? "Sending" : "Send reset link"}</Button></form></AuthFrame>);
}

export function ResetPassword() {
  const [pw, setPw] = useState(""); const [pw2, setPw2] = useState(""); const [done, setDone] = useState(false);
  const mismatch = pw2 && pw !== pw2 ? "These passwords don’t match." : undefined;
  return done ? (
    <AuthFrame title="Password updated" desc="You’ve been signed out of other devices." quote={false}><div className="m-fade flex flex-col items-start gap-5"><SuccessTick size={48} /><Button size="lg" variant="primary" className="w-full" onClick={() => go("/sign-in")}>Continue to sign in<ArrowRight /></Button></div></AuthFrame>
  ) : (
    <AuthFrame title="Choose a new password" desc="Use at least 12 characters." quote={false}>
      <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); if (pw.length >= 12 && !mismatch) setDone(true); }}><Field id="r1" label="New password" hint="Longer is better. A phrase works well.">{(p) => <Input {...p} type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />}</Field><Field id="r2" label="Confirm password" error={mismatch}>{(p) => <Input {...p} type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} />}</Field><Button type="submit" size="lg" variant="primary" reason={pw.length < 12 ? "Use at least 12 characters" : undefined}>Update password</Button></form></AuthFrame>);
}

export function VerifyEmail() {
  const [d, setD] = useState(["", "", "", "", "", ""]); const refs = useRef<(HTMLInputElement | null)[]>([]); const [st, setSt] = useState<"idle" | "ok" | "bad">("idle");
  const set = (i: number, v: string) => { const n = [...d]; n[i] = v.slice(-1); setD(n); if (v && i < 5) refs.current[i + 1]?.focus(); if (n.every(Boolean)) { setSt(n.join("") === "424242" ? "ok" : "bad"); } else setSt("idle"); };
  return (
    <AuthFrame title="Enter your code" desc="We sent a 6-digit code to mia@northwind.example." quote={false} footer={<>Wrong email? <A h="sign-up">Start over</A></>}>
      <div className="flex flex-col gap-4"><div role="group" aria-label="Verification code" className={cn("flex gap-2", st === "bad" && "m-shake")} onPaste={(e) => { const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6); if (t) { e.preventDefault(); const n = t.split("").concat(Array(6).fill("")).slice(0, 6); setD(n); setSt(t.length === 6 ? (t === "424242" ? "ok" : "bad") : "idle"); } }}>
        {d.map((v, i) => <input key={i} ref={(el) => { refs.current[i] = el; }} value={v} inputMode="numeric" autoComplete={i === 0 ? "one-time-code" : "off"} aria-label={`Digit ${i + 1}`} aria-invalid={st === "bad"} onChange={(e) => set(i, e.target.value.replace(/\D/g, ""))} onKeyDown={(e) => { if (e.key === "Backspace" && !v && i > 0) refs.current[i - 1]?.focus(); }} className="tnum h-12 w-full min-w-0 rounded-control border border-control bg-input text-center text-h3 font-semibold hover:border-secondary focus-visible:border-focus aria-[invalid=true]:border-status-danger-solid" />)}</div>
        <div aria-live="polite" className="min-h-5 text-body-sm">{st === "bad" && <span className="text-status-danger-fg">That code isn’t right. Check the email and try again.</span>}{st === "ok" && <span className="flex items-center gap-1.5 text-status-success-fg"><Check className="size-4" />Verified</span>}</div>
        <Button size="lg" variant="primary" reason={st !== "ok" ? "Enter the 6-digit code" : undefined} onClick={() => go("/onboarding")}>Verify and continue</Button><p className="text-body-sm text-tertiary">Demo code: 424242</p></div></AuthFrame>);
}

export function AcceptInvite() {
  return (
    <AuthFrame title="Join Northwind Traders" desc="Kenji Ito invited you as a Member." footer={<>Already have an account? <A h="sign-in">Sign in</A></>}>
      <div className="mb-6 flex items-center gap-3 rounded-card border border-subtle p-3"><Avatar id="org1" name="Northwind Traders" size={40} square /><div><p className="font-medium">Northwind Traders</p><p className="text-body-sm text-secondary">18 members · Team plan</p></div></div>
      <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); go("/onboarding"); }}><Field id="a-n" label="Your name">{(p) => <Input {...p} autoComplete="name" />}</Field><Field id="a-p" label="Password">{(p) => <Input {...p} type="password" autoComplete="new-password" />}</Field><Button type="submit" size="lg" variant="primary">Join workspace</Button></form></AuthFrame>);
}

/* ───────── Onboarding wizard ───────── */
export function Onboarding() {
  const toast = useToast(); const [step, setStep] = useState(0); const [team, setTeam] = useState("Finance"); const [emails, setEmails] = useState<string[]>([]); const [src, setSrc] = useState<string | null>(null);
  const steps = ["Workspace", "Team", "Connect"];
  return (
    <div className="mx-auto max-w-2xl py-4"><div className="mb-8 flex items-center justify-between"><Logo height={34} /><button onClick={() => go("/dashboard")} className="text-body font-medium text-secondary hover:text-primary">Skip setup</button></div>
      <Stepper steps={steps} current={step} />
      <Card className="mt-8 p-8 m-fade" key={step}>
        {step === 0 && <><h1 className="text-h2 font-semibold">Set up your workspace</h1><p className="mt-1 text-body text-secondary">Two questions. You can change both later.</p><div className="mt-6 flex flex-col gap-5"><Field id="o1" label="Workspace name">{(p) => <Input {...p} defaultValue="Northwind Traders" />}</Field><Field id="o2" label="What does your team do?">{(p) => <Select {...p} value={team} onChange={(e) => setTeam(e.target.value)}><option>Finance</option><option>Sales</option><option>Operations</option><option>Engineering</option></Select>}</Field></div></>}
        {step === 1 && <><h1 className="text-h2 font-semibold">Invite your team</h1><p className="mt-1 text-body text-secondary">People you invite can start right away. Skip this and add them later.</p><div className="mt-6"><Field id="o3" label="Email addresses">{(p) => <TagInput id={p.id} label="Email addresses" value={emails} onChange={setEmails} />}</Field></div></>}
        {step === 2 && <><h1 className="text-h2 font-semibold">Bring in your data</h1><p className="mt-1 text-body text-secondary">Pick where your deals live today.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{["Import a CSV", "Connect Salesforce", "Connect HubSpot", "Start from scratch"].map((s) => <button key={s} onClick={() => setSrc(s)} aria-pressed={src === s} className={cn("rounded-card border p-4 text-start text-body font-medium transition-colors", src === s ? "border-action-primary bg-selected ring-1 ring-action-primary" : "border-subtle hover:border-strong")}>{s}</button>)}</div></>}
        <div className="mt-8 flex justify-between border-t border-subtle pt-5">{step === 0 ? <span /> : <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))}>Back</Button>}<div className="flex gap-2">{step > 0 && step < 2 && <Button variant="ghost" onClick={() => setStep(step + 1)}>Skip for now</Button>}<Button variant="primary" onClick={() => step < 2 ? setStep(step + 1) : (toast({ tone: "success", title: "You’re set up" }), go("/dashboard"))}>{step < 2 ? "Continue" : "Finish setup"}</Button></div></div></Card></div>);
}
export function OnboardingChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({ a: true, b: true }); const n = Object.values(done).filter(Boolean).length;
  const tasks = [["a", "Create your first deal", "2 min"], ["b", "Invite a teammate", "1 min"], ["c", "Connect your CRM", "3 min"], ["d", "Add a payment method", "2 min"]] as const;
  return (
    <div className="max-w-2xl"><Card flush><div className="p-5"><div className="flex items-end justify-between"><div><h2 className="text-h4 font-semibold">Get started</h2><p className="text-body-sm text-secondary">Skip any step and come back later.</p></div><span className="tnum text-body-sm font-medium">{n} of 4</span></div><div className="mt-3"><Progress label="Setup progress" value={n} max={4} valueText={`${n} of 4 complete`} /></div></div>
      <ul>{tasks.map(([k, t, m], i) => { const d = done[k]; const next = !d && tasks.findIndex(([x]) => !done[x]) === i; return <li key={k} className="flex items-center gap-3 border-t border-subtle px-5 py-3.5"><span className={cn("grid size-5 shrink-0 place-items-center rounded-round", d ? "bg-action-primary text-action-primary-fg" : "border border-control")}>{d && <Check className="size-3" strokeWidth={3} />}</span><div className="min-w-0 flex-1"><p className={cn("text-body", d ? "text-secondary" : "font-medium")}>{t}</p>{!d && <p className="text-body-sm text-tertiary">About {m}</p>}</div>{d ? <StatusPill tone="success" size="sm">Done</StatusPill> : <><Button size="sm" variant={next ? "primary" : "secondary"} onClick={() => setDone({ ...done, [k]: true })}>Start</Button><button className="text-body-sm text-secondary hover:text-primary">Skip</button></>}</li>; })}</ul></Card></div>);
}
