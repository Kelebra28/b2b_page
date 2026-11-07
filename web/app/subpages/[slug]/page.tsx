import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/templates/ServicePage";
import { getService, serviceSlugs } from "@/content/services";
import { siteUrl } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

/**
 * Todas las URLs se generan en el build con generateStaticParams y el HTML sale completo (prerenderizado).
 * Se desactiva la validación "instant" porque envolver `params` en <Suspense> haría que una URL inexistente
 * respondiera 200 en lugar de 404 (soft-404, malo para SEO).
 */
export const instant = false;

/** Las URLs públicas conservan el `.html`: /subpages/corte_laser_metal.html */
export function generateStaticParams() {
  return serviceSlugs.map((s) => ({ slug: `${s}.html` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const url = `${siteUrl}${s.path}`;
  const image = `${siteUrl}/og-laser-inova.png`;
  return {
    title: s.meta.title,
    description: s.meta.description,
    keywords: s.meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: "Laser Inova",
      url,
      title: s.meta.ogTitle,
      description: s.meta.ogDescription,
      images: [{ url: image, width: 1200, height: 630, alt: s.meta.ogImageAlt, type: "image/png" }],
    },
    twitter: { card: "summary_large_image", title: s.meta.twitterTitle, description: s.meta.twitterDescription, images: [image] },
  };
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || !slug.endsWith(".html")) notFound();
  return <ServicePage service={service} />;
}
