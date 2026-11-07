/** Contenido del blog (extraído de blog/*.html con scripts/extract-blog.py y limpiado a mano). */
import type { Cta, Faq, Hero, ServiceSection } from "@/content/services";
import { fixHref, fixLink } from "@/content/services";
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

export type BlogPost = {
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

const fix = (p: BlogPost): BlogPost => ({
  ...p,
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
