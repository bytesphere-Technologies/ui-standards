"use client";
import { StatusPill } from "../status-pill";

export const NotifBadge = ({ n }: { n: number }) => n > 0 ? <StatusPill tone="danger" dot={false} size="sm">{n > 99 ? "99+" : n}</StatusPill> : null;
