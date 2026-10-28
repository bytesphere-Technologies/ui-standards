import { ArtKind, ArtTone } from "../components/product-art";

export type Product = { id: string; name: string; brand: string; price: number; was?: number; rating: number; reviews: number; kind: ArtKind; tone: ArtTone; badge?: "New" | "Sale" | "Low stock" | "Best seller"; colors?: string[]; stock?: number; blurb?: string };

export const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
