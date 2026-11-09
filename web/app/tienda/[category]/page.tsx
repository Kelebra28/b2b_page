import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StorePage } from "@/components/templates/StorePage";
import { siteUrl } from "@/content/site";
import { getCategories, getProducts } from "@/lib/catalog";
import { categoryCopy } from "@/lib/category-copy";
import { categoryTiles, photosFirst } from "@/lib/search-index";

type Props = { params: Promise<{ category: string }> };

export const instant = false;

export async function generateStaticParams() {
  const cats = await getCategories().catch(() => []);
  // Cache Components exige al menos un valor; el marcador responde 404.
  return cats.length ? cats.map((c) => ({ category: c.slug })) : [{ category: "_" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = (await getCategories()).find((c) => c.slug === category);
  if (!cat) return {};
  const title = `${cat.name} para personalizar | Tienda Laser Inova`;
  const description = `${cat.name} promocionales para personalizar con tu logotipo: grabado láser, impresión UV y más. Cotiza por WhatsApp.`;
  const url = `${siteUrl}/tienda/${cat.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "es_MX", siteName: "Laser Inova", url, title, description, images: [{ url: `${siteUrl}/og-laser-inova.png`, width: 1200, height: 630 }] },
  };
}

export default async function CategoryRoute({ params }: Props) {
  const { category } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();
  const [products, all] = await Promise.all([getProducts(cat.slug), getProducts()]);
  const tiles = categoryTiles(categories, all);
  return (
    <StorePage
      title={`${cat.name} para personalizar`}
      text={`${cat.name} listos para llevar tu logotipo. Dinos cantidad y tipo de personalización y te cotizamos por WhatsApp.`}
      crumbs={[{ label: "Tienda", href: "/tienda" }, { label: cat.name }]}
      path={`/tienda/${cat.slug}`}
      categoryName={cat.name}
      categoryNav={tiles.map(({ slug, name, count }) => ({ slug, name, count }))}
      activeSlug={cat.slug}
      others={tiles.filter((c) => c.slug !== cat.slug).slice(0, 12)}
      products={photosFirst(products)}
      copy={categoryCopy(cat.name, products)}
    />
  );
}
