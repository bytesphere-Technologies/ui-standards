"use client";
import { Send } from "lucide-react";
import * as React from "react";
import { Avatar } from "../avatar";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { TypingDots } from "../typing-dots";

const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** @component ChatThread @category forms @use-when messaging or an assistant. Composer with Enter to send, Shift+Enter for newline, typing indicator, auto-scroll. */
export function ChatThread({ initial, reply }: { initial: { me?: boolean; text: string; who?: string }[]; reply?: (t: string) => string }) {
  const [msgs, setMsgs] = React.useState(initial); const [t, setT] = React.useState(""); const [typing, setTyping] = React.useState(false); const end = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { end.current?.scrollIntoView({ block: "end", behavior: reduced() ? "auto" : "smooth" }); }, [msgs, typing]);
  const send = () => { const x = t.trim(); if (!x) return; setMsgs((m) => [...m, { me: true, text: x }]); setT(""); if (reply) { setTyping(true); setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { text: reply(x), who: "Kenji" }]); }, 1400); } };
  return <div className="flex h-80 flex-col overflow-hidden rounded-card border border-subtle bg-surface-raised"><div role="log" aria-live="polite" aria-label="Messages" className="flex-1 space-y-2 overflow-y-auto p-4">{msgs.map((m, i) => <div key={i} className={cn("m-rise flex", m.me ? "justify-end" : "justify-start")}>{!m.me && <Avatar id={m.who ?? "k"} name={m.who ?? "Kenji"} size={24} />}<p className={cn("ms-2 max-w-[78%] rounded-[14px] px-3 py-2 text-body", m.me ? "bg-action-primary text-action-primary-fg" : "bg-surface-sunken")}>{m.text}</p></div>)}{typing && <div className="flex items-center"><Avatar id="k" name="Kenji" size={24} /><span className="ms-2"><TypingDots label="Kenji is typing" /></span></div>}<div ref={end} /></div>
    <form className="flex items-end gap-2 border-t border-subtle p-3" onSubmit={(e) => { e.preventDefault(); send(); }}><textarea aria-label="Message" rows={1} value={t} onChange={(e) => setT(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Message. Enter to send." className="max-h-28 min-h-(--control-md) flex-1 resize-none rounded-control border border-control bg-input px-3 py-2 focus:border-action-primary" /><Button type="submit" variant="primary" size="icon" aria-label="Send" disabled={!t.trim()}><Send /></Button></form></div>;
}
