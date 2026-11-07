import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/templates/ProductPage";
import { siteUrl } from "@/content/site";
import { getProduct, getProducts, safeImage } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

/**
 * Solo se pre-generan unas pocas fichas (las que tienen foto, primero). Las demás se generan la primera vez que alguien las
 * abre y quedan en caché. Pre-generar las ~1,000 haría que cada build le pegue al CRM y a la base ~1,000 veces.
 */
const PREBUILT = 30;

export async function generateStaticParams() {
  const products = await getProducts().catch(() => []);
  const withPhoto = products.filter((p) => p.images.length > 0);
  const picked = (withPhoto.length ? withPhoto : products).slice(0, PREBUILT);
  return picked.length ? picked.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  const title = `${p.name} personalizado | Laser Inova`;
  const description = (p.description ?? `${p.name}. Personalización con grabado láser o impresión UV. Cotiza por WhatsApp.`).slice(0, 160);
  const url = `${siteUrl}/tienda/producto/${p.slug}`;
  const image = safeImage(p.images[0]) ?? `${siteUrl}/inova_laser_og_ready.png`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "es_MX", siteName: "Laser Inova", url, title, description, images: [{ url: image }] },
  };
}

export default async function ProductRoute({ params }: Props) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  const sameCategory = await getProducts(p.category.slug).catch(() => []);
  const related = sameCategory.filter((r) => r.slug !== p.slug).slice(0, 30);
  return <ProductPage product={p} related={related} categoryTotal={sameCategory.length} />;
}
