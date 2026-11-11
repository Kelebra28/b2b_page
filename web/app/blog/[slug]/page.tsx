import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/templates/BlogPostPage";
import { getPost, postSlugs } from "@/content/blog";
import { siteUrl } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

/**
 * Todas las URLs se generan en el build con generateStaticParams y el HTML sale completo (prerenderizado).
 * Se desactiva la validación "instant" porque envolver `params` en <Suspense> haría que una URL inexistente
 * respondiera 200 en lugar de 404 (soft-404, malo para SEO).
 */
export const instant = false;

/** Las URLs públicas conservan el `.html`: /blog/impresion-publicidad.html */
export function generateStaticParams() {
  return postSlugs.map((s) => ({ slug: `${s}.html` }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const url = `${siteUrl}${p.path}`;
  // Imagen social: la portada del artículo (en .webp); si no la tiene, la imagen general del sitio.
  const cover = p.article?.image.src;
  const image = cover ? (cover.startsWith("http") ? cover : `${siteUrl}${cover}`) : `${siteUrl}/og-laser-inova.png`;
  return {
    title: p.meta.title,
    description: p.meta.description,
    keywords: p.meta.keywords,
    alternates: { canonical: url },
    openGraph: { type: "article", locale: "es_MX", siteName: "Laser Inova", url, title: p.meta.ogTitle, description: p.meta.ogDescription, images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: p.meta.twitterTitle || p.meta.ogTitle, description: p.meta.twitterDescription || p.meta.ogDescription, images: [image] },
  };
}

export default async function BlogPostRoute({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || !slug.endsWith(".html")) notFound();
  return <BlogPostPage post={post} />;
}
