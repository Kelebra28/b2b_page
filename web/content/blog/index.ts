/** Contenido del blog (extraído de blog/*.html con scripts/extract-blog.py y limpiado a mano). */
import type { Cta, Faq, Hero, ServiceSection } from "@/content/services";
import { fixHref, fixLink } from "@/content/services";
import type { RichText } from "@/content/home";
import { site, siteUrl } from "@/content/site";
import blogIndexRaw from "./index.json";
import grabado_en_vivo_activaciones from "./grabado-en-vivo-activaciones.json";
import grabado_madera_eventos from "./grabado-madera-eventos.json";
import grabado_metal_volumen from "./grabado-metal-volumen.json";
import impresion_campanas_publicitarias_agencias from "./impresion-campanas-publicitarias-agencias.json";
import impresion_lona_gran_formato from "./impresion-lona-gran-formato.json";
import impresion_publicidad from "./impresion-publicidad.json";
import impresion_vehicular from "./impresion-vehicular.json";
import vinil_impreso_decorativo_comercial from "./vinil-impreso-decorativo-comercial.json";

type Meta = {
  title: string; description: string; keywords: string; canonical: string; ogTitle: string; ogDescription: string;
  ogType: string; twitterTitle: string; twitterDescription: string;
};

type Text = string | RichText;
export type ArticleBlock =
  | { type: "p"; text: Text }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: Text[] };

/** Artículo editorial (formato nuevo): el template lo muestra como artículo y no como landing. */
export type Article = {
  title: string; dek: string; author: string;
  /** ISO (AAAA-MM-DD) y su etiqueta legible. */
  date: string; dateLabel: string; readingMinutes: number;
  image: { src: string; alt: string };
  sections: { id: string; heading: string; body: ArticleBlock[] }[];
  related: { label: string; href: string }[];
};

export type BlogPost = {
  article?: Article;
  slug: string;
  path: string;
  meta: Meta;
  /** JSON-LD BlogPosting original. */
  ld: Record<string, unknown> | null;
  hero: Hero;
  sections: ServiceSection[];
  faqs?: Faq;
  cta?: Cta;
};

export type PostCard = {
  slug: string; title: string; excerpt: string; date: string; dateLabel: string; badge: string;
  image: { src: string; alt: string }; linkLabel: string;
};

export type BlogIndex = BlogPost & { posts: PostCard[]; postsHeading: { id: string; eyebrow: string; title: string; text: string } };

const words = (x: unknown): number => (typeof x === "string" ? x.split(/\s+/).filter(Boolean).length : Array.isArray(x) ? x.reduce<number>((n, y) => n + words(y), 0) : x && typeof x === "object" ? Object.values(x).reduce<number>((n, y) => n + words(y), 0) : 0);

/** Schema BlogPosting + BreadcrumbList de un artículo en formato nuevo (autor, fechas e imagen salen del contenido). */
const articleLd = (p: BlogPost): Record<string, unknown> => {
  const a = p.article!;
  const url = `${siteUrl}${p.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting", headline: a.title, description: p.meta.description, inLanguage: "es-MX",
        datePublished: a.date, dateModified: a.date, mainEntityOfPage: url, url,
        image: `${siteUrl}${a.image.src}`, wordCount: words(a.sections),
        author: { "@type": "Organization", name: a.author, url: siteUrl },
        publisher: { "@type": "Organization", name: site.name, url: siteUrl },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: a.title, item: url },
        ],
      },
    ],
  };
};

const fix = (p: BlogPost): BlogPost => ({
  ...p,
  ld: p.article ? articleLd(p) : p.ld,
  hero: { ...p.hero, primary: fixLink(p.hero.primary), secondary: fixLink(p.hero.secondary) },
  cta: p.cta ? { ...p.cta, primary: fixLink(p.cta.primary), secondary: fixLink(p.cta.secondary) } : undefined,
});

const raw = { "grabado-en-vivo-activaciones": grabado_en_vivo_activaciones, "grabado-madera-eventos": grabado_madera_eventos, "grabado-metal-volumen": grabado_metal_volumen, "impresion-campanas-publicitarias-agencias": impresion_campanas_publicitarias_agencias, "impresion-lona-gran-formato": impresion_lona_gran_formato, "impresion-publicidad": impresion_publicidad, "impresion-vehicular": impresion_vehicular, "vinil-impreso-decorativo-comercial": vinil_impreso_decorativo_comercial } as unknown as Record<string, BlogPost>;

export const posts: Record<string, BlogPost> = Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, fix(v)]));
export const postSlugs = Object.keys(posts);
export const blogIndex = fix(blogIndexRaw as unknown as BlogPost) as BlogIndex;

/** Las URLs públicas conservan el `.html`: /blog/impresion-publicidad.html */
export const getPost = (param: string): BlogPost | undefined => posts[param.replace(/\.html$/, "")];
export { fixHref };
