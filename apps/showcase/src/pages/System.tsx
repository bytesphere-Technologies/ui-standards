import { Button, Specimen } from "@bytesphere/ui";
import { Art, BrandMark } from "@bytesphere/ui";
import { CopyButton } from "@bytesphere/ui";
import { Search, WifiOff, RefreshCw } from "lucide-react";
import { useState } from "react";

function ErrorPage({ code, title, body, art, primary, secondary, extra }: { code: string; title: string; body: string; art: React.ReactNode; primary: React.ReactNode; secondary?: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[28rem] max-w-md flex-col items-center justify-center py-12 text-center">
      {art}<p className="mt-4 font-mono text-caption font-medium text-tertiary">{code}</p><h1 className="mt-1 text-h2 font-semibold">{title}</h1><p className="mt-2 text-body text-secondary">{body}</p>
      {extra}<div className="mt-6 flex flex-wrap justify-center gap-2">{primary}{secondary}</div>
    </div>);
}
const ref = (
  <div className="mt-4 flex items-center gap-2 rounded-control bg-surface-sunken py-1 ps-3 pe-1 text-body-sm text-secondary">Reference <code className="font-mono text-primary">8f21-c9a3</code><CopyButton value="8f21-c9a3" /></div>);
export const NotFound = () => <ErrorPage code="404" title="We can’t find that page" body="The link may be broken, or the page was moved or deleted." art={<Art.search />} primary={<Button variant="primary" onClick={() => (location.hash = "/dashboard")}>Go to overview</Button>} secondary={<Button onClick={() => (location.hash = "/search")}><Search />Search</Button>} />;
export const Forbidden = () => { const [req, setReq] = useState(false); return <ErrorPage code="403" title="You don’t have access to Billing" body="Ask Mia Moreno or Kenji Ito, who are owners of this workspace, to give you access." art={<Art.lock />} primary={<Button variant="primary" disabled={req} onClick={() => setReq(true)}>{req ? "Request sent" : "Request access"}</Button>} secondary={<Button onClick={() => (location.hash = "/dashboard")}>Go to overview</Button>} extra={req ? <p className="m-fade mt-3 text-body-sm text-status-success-fg">We’ve notified both owners.</p> : undefined} />; };
export const ServerError = () => <ErrorPage code="500" title="Something broke on our side" body="We’ve been alerted and are looking into it. Try again in a moment. If it keeps happening, contact support and include the reference below." art={<Art.cloud />} extra={ref} primary={<Button variant="primary"><RefreshCw />Try again</Button>} secondary={<Button onClick={() => (location.hash = "/dashboard")}>Go to overview</Button>} />;
export const Maintenance = () => <ErrorPage code="503" title="Down for scheduled maintenance" body="We’re back by 14:00 UTC, in about 25 minutes. Your data is safe and nothing is lost." art={<BrandMark size={72} animate="split" />} primary={<Button variant="primary">View status page</Button>} secondary={<Button>Get updates</Button>} />;
export const Offline = () => <ErrorPage code="Offline" title="You’re offline" body="Changes you make will sync when you reconnect. You can keep reading what’s already loaded." art={<WifiOff className="size-12 text-control" strokeWidth={1.25} />} primary={<Button variant="primary"><RefreshCw />Retry</Button>} />;
export const RateLimited = () => <ErrorPage code="429" title="Too many requests" body="Please wait 30 seconds before trying again." art={<Art.lock />} primary={<Button variant="primary" reason="You can retry in 30 seconds">Try again</Button>} />;

export function StatesGallery() {
  return (
    <div className="flex flex-col gap-10">
      <Specimen title="Illustrations" note="One style: 1.5px line, neutral strokes, one azure tint." doc="01-foundations/imagery-photo-and-assets.md">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-[var(--color-subtle)] sm:grid-cols-4">{Object.entries(Art).map(([k, A]) => <div key={k} className="grid place-items-center gap-1 bg-surface-raised p-5"><A /><span className="font-mono text-caption text-tertiary">Art.{k}</span></div>)}</div>
      </Specimen>
      <Specimen title="Where each state appears" doc="03-components/empty-loading-error-and-partial-states.md" pad={false}>
        <table className="w-full text-body"><thead><tr className="h-9 border-b border-subtle text-body-sm text-secondary"><th className="ps-5 text-start font-medium">State</th><th className="text-start font-medium">Shows</th><th className="pe-5 text-start font-medium">Never</th></tr></thead>
          <tbody>{[["Empty, first run", "What this is, why it matters, one action", "A mascot with no action"], ["Empty, no results", "The query and filters, how to widen them", "Blaming the user"], ["Loading", "A skeleton shaped like the content, after 150ms", "A spinner on shaped content"], ["Error", "What failed, a retry, a reference id", "“Something went wrong” alone"], ["Stale", "The old data plus “Updated 12 min ago · Refresh”", "Silently showing old numbers"], ["No access", "Who can grant it and a request button", "A bare 403"]].map(([a, b, c]) => <tr key={a} className="h-12 border-b border-subtle last:border-0"><td className="ps-5 font-medium">{a}</td><td className="text-secondary">{b}</td><td className="pe-5 text-secondary">{c}</td></tr>)}</tbody></table>
      </Specimen>
    </div>);
}
