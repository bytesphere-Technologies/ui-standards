
export type NotifKind = "mention" | "approval" | "billing" | "security" | "scan" | "system";

export interface Notif { id: number; kind: NotifKind; title: string; body?: string; time: string; unread: boolean; actor?: string; action?: string }
