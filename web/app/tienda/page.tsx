import type { Metadata } from "next";
import { StoreHome } from "@/components/templates/StoreHome";
import { siteUrl } from "@/content/site";
import { getCategories, getProducts } from "@/lib/catalog";
import { categoryTiles, interleave } from "@/lib/search-index";

export const instant = false;

const title = "Tienda de productos promocionales personalizados | Laser Inova";
const description = "Termos, mochilas, libretas y más productos promocionales listos para personalizar con grabado láser o impresión UV. Cotiza por WhatsApp.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteUrl}/tienda` },
  // Mientras el catálogo no esté conectado (sin CATALOG_API_URL) la página queda vacía: que Google no la indexe todavía.
  ...(process.env.CATALOG_API_URL ? {} : { robots: { index: false, follow: false } }),
  openGraph: { type: "website", locale: "es_MX", siteName: "Laser Inova", url: `${siteUrl}/tienda`, title, description, images: [{ url: `${siteUrl}/og-laser-inova.png`, width: 1200, height: 630 }] },
};

export default async function TiendaRoute() {
  const [categories, products] = await Promise.all([getCategories().catch(() => []), getProducts().catch(() => [])]);
  return <StoreHome categories={categoryTiles(categories, products)} initial={interleave(products).slice(0, 24)} total={products.length} />;
}
