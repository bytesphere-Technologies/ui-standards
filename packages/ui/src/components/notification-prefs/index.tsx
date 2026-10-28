"use client";
import * as React from "react";
import { NotifKind } from "../../lib/notifications-shared";
import { Switch } from "../switch";

const cats: [NotifKind, string][] = [["mention", "Someone mentions or assigns you"], ["approval", "Approvals and decisions"], ["billing", "Invoices, payments and plan limits"], ["security", "Sign-ins and account security"], ["scan", "Scanning exceptions"], ["system", "Product updates"]];

export function NotificationPrefs() {
  const [m, setM] = React.useState<Record<string, boolean>>(() => Object.fromEntries(cats.flatMap(([k]) => [[`${k}-app`, true], [`${k}-email`, k !== "system"], [`${k}-push`, k === "security" || k === "mention"]])));
  return (
    <div className="overflow-x-auto"><table className="w-full min-w-[30rem] text-body"><thead><tr className="border-b border-subtle text-body-sm text-secondary"><th className="py-2 text-start font-medium">Notify me when</th>{["In app", "Email", "Push"].map((c) => <th key={c} className="w-20 py-2 text-center font-medium">{c}</th>)}</tr></thead>
      <tbody>{cats.map(([k, t]) => <tr key={k} className="border-b border-subtle last:border-0"><th scope="row" className="py-3 pe-4 text-start font-normal">{t}{k === "security" && <span className="block text-body-sm text-secondary">Email can’t be turned off for security alerts.</span>}</th>{(["app", "email", "push"] as const).map((c) => <td key={c} className="py-3 text-center"><span className="inline-block"><Switch id={`${k}${c}`} hideLabel label={`${t}, ${c}`} checked={m[`${k}-${c}`]} onChange={(v) => k === "security" && c === "email" ? null : setM({ ...m, [`${k}-${c}`]: v })} /></span></td>)}</tr>)}</tbody></table></div>);
}
