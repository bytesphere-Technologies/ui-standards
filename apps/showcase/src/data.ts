// Brand: Azure Blue #116CB3 (primary-600), Corporate Navy #21346E (accent-800), Pale Blue #DBE7F7 (primary-100), Rich Black #000913 (neutral-950). See 01-foundations/color.md
export const ramps = {
 "primary": {
  "50": "#F4F8FA",
  "100": "#DBE7F7",
  "200": "#C3DEF4",
  "300": "#98C7EB",
  "400": "#65ABE2",
  "500": "#318FD8",
  "600": "#116CB3",
  "700": "#1B5B8D",
  "800": "#14456B",
  "900": "#133148",
  "950": "#0C1E2C"
 },
 "accent": {
  "50": "#F5F6F9",
  "100": "#E9EBF2",
  "200": "#CBD3EB",
  "300": "#A6B4DD",
  "400": "#7A8ECD",
  "500": "#4E69BC",
  "600": "#3B539B",
  "700": "#2E417A",
  "800": "#21346E",
  "900": "#1C253F",
  "950": "#111727"
 },
 "neutral": {
  "50": "#F7F7F8",
  "100": "#ECEDEE",
  "200": "#D7DCE0",
  "300": "#BAC3C9",
  "400": "#98A5AE",
  "500": "#768693",
  "600": "#5E6D78",
  "700": "#4A555E",
  "800": "#384147",
  "900": "#292E33",
  "950": "#000913"
 },
 "success": {
  "50": "#F5FAF7",
  "100": "#E8F2ED",
  "200": "#C9EEDB",
  "300": "#A2E2C2",
  "400": "#73D3A3",
  "500": "#45C485",
  "600": "#33A36B",
  "700": "#288054",
  "800": "#1F6140",
  "900": "#1A422E",
  "950": "#10281C"
 },
 "warning": {
  "50": "#FBF8F4",
  "100": "#F6EFE5",
  "200": "#FBE2BC",
  "300": "#F8CD8C",
  "400": "#F4B352",
  "500": "#F09A19",
  "600": "#C97E0D",
  "700": "#9E630A",
  "800": "#784B08",
  "900": "#50350C",
  "950": "#312007"
 },
 "danger": {
  "50": "#FAF5F5",
  "100": "#F3E8E7",
  "200": "#F1C8C5",
  "300": "#E8A19C",
  "400": "#DC726A",
  "500": "#D04339",
  "600": "#AE3229",
  "700": "#882720",
  "800": "#671D18",
  "900": "#461916",
  "950": "#2B0F0D"
 },
 "info": {
  "50": "#F5F8FA",
  "100": "#E7EFF3",
  "200": "#C5E3F1",
  "300": "#9CCEE8",
  "400": "#6AB6DC",
  "500": "#399ED0",
  "600": "#2981AE",
  "700": "#206688",
  "800": "#184D67",
  "900": "#163646",
  "950": "#0D212B"
 }
} as const;

export const contrast: { fg: string; bg: string; fgHex: string; bgHex: string; ratio: number; need: number }[] = [
  { fg: "text-primary", bg: "surface", fgHex: "#292E33", bgHex: "#FFFFFF", ratio: 13.7, need: 4.5 },
  { fg: "text-secondary", bg: "surface", fgHex: "#4A555E", bgHex: "#FFFFFF", ratio: 7.63, need: 4.5 },
  { fg: "text-tertiary", bg: "surface", fgHex: "#5E6D78", bgHex: "#FFFFFF", ratio: 5.34, need: 4.5 },
  { fg: "text-tertiary", bg: "surface-sunken", fgHex: "#5E6D78", bgHex: "#F7F7F8", ratio: 4.99, need: 4.5 },
  { fg: "action-primary-fg", bg: "Azure Blue", fgHex: "#FFFFFF", bgHex: "#116CB3", ratio: 5.5, need: 4.5 },
  { fg: "white", bg: "Corporate Navy", fgHex: "#FFFFFF", bgHex: "#21346E", ratio: 11.79, need: 4.5 },
  { fg: "text-primary", bg: "Pale Blue (selected)", fgHex: "#292E33", bgHex: "#DBE7F7", ratio: 10.95, need: 4.5 },
  { fg: "Azure Blue (link/focus)", bg: "surface", fgHex: "#116CB3", bgHex: "#FFFFFF", ratio: 5.5, need: 3 },
  { fg: "border-control", bg: "surface", fgHex: "#768693", bgHex: "#FFFFFF", ratio: 3.75, need: 3 },
  { fg: "white", bg: "danger-600", fgHex: "#FFFFFF", bgHex: "#AE3229", ratio: 6.39, need: 4.5 },
  { fg: "status-success-fg", bg: "success tint", fgHex: "#1F6140", bgHex: "#E5F7EE", ratio: 6.64, need: 4.5 },
  { fg: "status-warning-fg", bg: "warning tint", fgHex: "#784B08", bgHex: "#FDF1DF", ratio: 6.7, need: 4.5 },
  { fg: "status-danger-fg", bg: "danger tint", fgHex: "#671D18", bgHex: "#F8E5E3", ratio: 9.8, need: 4.5 },
  { fg: "status-info-fg", bg: "info tint", fgHex: "#184D67", bgHex: "#E3F1F8", ratio: 7.93, need: 4.5 },
  { fg: "white", bg: "primary-500 (dark-mode fill, banned)", fgHex: "#FFFFFF", bgHex: "#318FD8", ratio: 3.5, need: 4.5 },
];
export const people = [
  { id: "u1", name: "Mia Moreno", email: "mia@northwind.example" },
  { id: "u2", name: "Kenji Ito", email: "kenji@northwind.example" },
  { id: "u3", name: "Amara Okafor", email: "amara@northwind.example" },
  { id: "u4", name: "Lars Lindqvist", email: "lars@northwind.example" },
  { id: "u5", name: "Priya Raghavan", email: "priya@northwind.example" },
  { id: "u6", name: "Tomás Herrera-Villanueva", email: "tomas@northwind.example" },
];
export type Deal = { id: string; name: string; owner: string; status: "active" | "paused" | "past_due" | "closed"; amount: number; updated: string };
export const deals: Deal[] = [
  { id: "D-1042", name: "Northwind renewal", owner: "u1", status: "active", amount: 12400, updated: "3 days ago" },
  { id: "D-1041", name: "Contoso data migration", owner: "u2", status: "past_due", amount: 48250.5, updated: "Yesterday" },
  { id: "D-1039", name: "Fabrikam onboarding (EMEA, phase 2 of 3)", owner: "u3", status: "active", amount: 7800, updated: "12 Mar" },
  { id: "D-1036", name: "Tailspin pilot", owner: "u4", status: "paused", amount: 0, updated: "9 Mar" },
  { id: "D-1033", name: "Wingtip expansion", owner: "u5", status: "active", amount: 103920, updated: "6 Mar" },
  { id: "D-1029", name: "Adatum audit", owner: "u6", status: "closed", amount: 2150, updated: "1 Mar" },
  { id: "D-1027", name: "Litware seats +25", owner: "u1", status: "past_due", amount: 5400, updated: "27 Feb" },
  { id: "D-1022", name: "Proseware API tier", owner: "u2", status: "active", amount: 18600, updated: "24 Feb" },
];

export const months = ["1 Mar", "2 Mar", "3 Mar", "4 Mar", "5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar", "10 Mar", "11 Mar", "12 Mar", "13 Mar", "14 Mar", "15 Mar", "16 Mar", "17 Mar", "18 Mar", "19 Mar", "20 Mar"];
export const revNow = [31, 33, 32, 36, 35, 38, 37, 41, 40, 39, 43, 42, 44, 41, 45, 46, 44, 47, 49, 46];
export const revPrev = [28, 29, 31, 30, 32, 31, 33, 34, 33, 35, 36, 35, 37, 36, 38, 37, 39, 40, 41, 40];
export const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const invoices = [
  { id: "INV-1042", date: "1 Mar 2026", desc: "Team · 18 seats · March", amount: 432, status: "paid" as const },
  { id: "INV-1041", date: "1 Feb 2026", desc: "Team · 17 seats · February", amount: 408, status: "paid" as const },
  { id: "INV-1040", date: "1 Jan 2026", desc: "Team · 17 seats · January", amount: 408, status: "paid" as const },
  { id: "INV-1039", date: "1 Dec 2025", desc: "Team · 15 seats · December", amount: 360, status: "refunded" as const },
  { id: "INV-1038", date: "1 Nov 2025", desc: "Team · 15 seats · November", amount: 360, status: "paid" as const },
];

import type { Product } from "@bytesphere/ui";
export const products: Product[] = [
  { id: "p1", name: "Trail 750 insulated bottle", brand: "Northwind Outdoor", price: 34, rating: 4.7, reviews: 1284, kind: "bottle", tone: "tint", badge: "Best seller", colors: ["#21346E", "#116CB3", "#5E6D78"], blurb: "Double-wall steel that keeps drinks cold for 24 hours and hot for 12. Fits standard cup holders." },
  { id: "p2", name: "Studio ANC headphones", brand: "Contoso Audio", price: 189, was: 249, rating: 4.5, reviews: 612, kind: "headphones", tone: "navy", badge: "Sale", colors: ["#000913", "#DBE7F7"], blurb: "Over-ear, 40-hour battery, active noise cancelling and a wired mode for flights." },
  { id: "p3", name: "Alder task chair", brand: "Fabrikam Home", price: 329, rating: 4.3, reviews: 207, kind: "chair", tone: "sunken", colors: ["#384147", "#116CB3"], blurb: "Adjustable lumbar support, breathable mesh back, 5-year warranty." },
  { id: "p4", name: "Arc desk lamp", brand: "Tailspin Lighting", price: 79, rating: 4.6, reviews: 389, kind: "lamp", tone: "azure", badge: "New", colors: ["#FFFFFF", "#21346E"], blurb: "Dimmable LED with a 90 CRI warm-to-cool range and a USB-C port in the base." },
  { id: "p5", name: "Commuter backpack 22L", brand: "Wingtip Gear", price: 96, rating: 4.4, reviews: 540, kind: "bag", tone: "tint", badge: "Low stock", stock: 4, colors: ["#21346E", "#5E6D78", "#116CB3"], blurb: "Water-resistant shell, padded 16-inch laptop sleeve and a hidden passport pocket." },
  { id: "p6", name: "Meridian field watch", brand: "Adatum Time", price: 215, was: 260, rating: 4.8, reviews: 96, kind: "watch", tone: "navy", badge: "Sale", colors: ["#000913", "#98A5AE"], blurb: "Automatic movement, sapphire glass and a 100 m water rating." },
  { id: "p7", name: "Summit 1L bottle", brand: "Northwind Outdoor", price: 28, rating: 4.2, reviews: 301, kind: "bottle", tone: "sunken", colors: ["#116CB3", "#000913"] },
  { id: "p8", name: "Pulse sport earbuds", brand: "Contoso Audio", price: 69, rating: 4.1, reviews: 822, kind: "headphones", tone: "tint", colors: ["#FFFFFF", "#000913"] },
  { id: "p9", name: "Linden side lamp", brand: "Tailspin Lighting", price: 54, rating: 4.0, reviews: 118, kind: "lamp", tone: "sunken" },
  { id: "p10", name: "Daypack 14L", brand: "Wingtip Gear", price: 58, was: 72, rating: 4.4, reviews: 233, kind: "bag", tone: "azure", badge: "Sale" },
  { id: "p11", name: "Nova stool", brand: "Fabrikam Home", price: 119, rating: 4.5, reviews: 74, kind: "chair", tone: "tint", badge: "New" },
  { id: "p12", name: "Harbor dive watch", brand: "Adatum Time", price: 340, rating: 4.9, reviews: 51, kind: "watch", tone: "sunken" },
];
