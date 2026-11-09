import type { MetadataRoute } from "next";
import { postSlugs } from "@/content/blog";
import { serviceSlugs } from "@/content/services";
import { cookiesRoute, privacyRoute } from "@/content/legal";
import { siteUrl } from "@/content/site";
import { getCategories, getProducts } from "@/lib/catalog";

/** URLs canónicas (con .html en servicios). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // La tienda es opcional: si el CRM no responde, el sitemap sigue saliendo sin esas URLs.
  const [categories, products] = await Promise.all([getCategories().catch(() => []), getProducts().catch(() => [])]);
  const store: MetadataRoute.Sitemap = categories.length
    ? [
        { url: `${siteUrl}/tienda`, changeFrequency: "weekly", priority: 0.7 },
        ...categories.map((c) => ({ url: `${siteUrl}/tienda/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
        ...products.map((p) => ({ url: `${siteUrl}/tienda/producto/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.5 })),
      ]
    : [];
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/nosotros`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/preguntas-frecuentes`, changeFrequency: "monthly", priority: 0.7 },
    ...serviceSlugs.map((s) => ({ url: `${siteUrl}/subpages/${s}.html`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${siteUrl}/blog.html`, changeFrequency: "weekly", priority: 0.7 },
    ...postSlugs.map((s) => ({ url: `${siteUrl}/blog/${s}.html`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...store,
    { url: `${siteUrl}${privacyRoute}`, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${siteUrl}${cookiesRoute}`, changeFrequency: "yearly" as const, priority: 0.2 },
  ];
}
