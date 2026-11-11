/** Contenido de las 21 páginas de servicio (extraído de subpages/*.html con scripts/extract-services.py y limpiado). */
import type { RichText } from "@/content/home";
import { toWhatsApp } from "@/content/site";

import corte_laser_metal from "./corte_laser_metal.json";
import displays_eventos from "./displays_eventos.json";
import displays_materiales_visuales from "./displays_materiales_visuales.json";
import grabado_cuero_plastico from "./grabado_cuero_plastico.json";
import grabado_espejos from "./grabado_espejos.json";
import grabado_laser from "./grabado_laser.json";
import grabado_madera from "./grabado_madera.json";
import grabado_metal from "./grabado_metal.json";
import impresion_cama_plana_uv from "./impresion_cama_plana_uv.json";
import kits_bienvenida from "./kits_bienvenida.json";
import lona_gran_formato from "./lona_gran_formato.json";
import marcaje_laser_acero from "./marcaje_laser_acero.json";
import corte_laser_mdf_acrilico from "./corte_laser_mdf_acrilico.json";
import maquila_volumen from "./maquila_volumen.json";
import plotter_impresion from "./plotter_impresion.json";
import produccion_agencias from "./produccion_agencias.json";
import promocionales_premium from "./promocionales_premium.json";
import regalos_empresariales from "./regalos_empresariales.json";
import rigidos_senaletica from "./rigidos_senaletica.json";
import senaletica_oficinas from "./senaletica_oficinas.json";
import vinil_instalacion from "./vinil_instalacion.json";

type Text = string | RichText;
type Link = { label: string; href: string };
type Img = { src: string; alt: string };

export type ServiceSection = {
  theme: "light" | "alt" | "dark";
  id?: string;
  eyebrow?: string;
  title?: string;
  paragraphs?: Text[];
  features?: string[];
  image?: Img;
  cards?: { title: string; text: string }[];
  benefits?: { title: string; text: string }[];
  tech?: { title: string; text?: Text; items?: string[] }[];
  examples?: (Img & { title: string; text: string; machine: boolean })[];
};

export type Hero = Service["hero"];
export type Cta = Service["cta"];
export type Faq = Service["faqs"];

export type Service = {
  slug: string;
  path: string;
  meta: {
    title: string; description: string; keywords: string; ogTitle: string; ogDescription: string;
    ogImageAlt: string; twitterTitle: string; twitterDescription: string;
  };
  ld: { name: string; serviceType: string; description: string } | null;
  hero: {
    eyebrow: string; title: string; text: Text; primary: Link; secondary: Link | null; badges: string[];
    card: { title: string; text: string } | null; image: Img | null;
  };
  sections: ServiceSection[];
  faqs: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  cta: { eyebrow: string; title: string; text: Text; primary: Link; secondary: Link | null };
};

/** Los links internos del sitio viejo eran absolutos (https://www.laserinova.com/index.html#x): se pasan a rutas canónicas. */
const fixHref = (h: string) => toWhatsApp(h).replace("https://www.laserinova.com/index.html", "/").replace(/^https:\/\/www\.laserinova\.com(?=\/)/, "");
export const fixLink = <T extends Link | null>(l: T): T => (l ? { ...l, href: fixHref(l.href) } : l);
export { fixHref };

const raw = { corte_laser_metal, corte_laser_mdf_acrilico, marcaje_laser_acero, displays_eventos, displays_materiales_visuales, grabado_cuero_plastico, grabado_espejos, grabado_laser, grabado_madera, grabado_metal, impresion_cama_plana_uv, kits_bienvenida, lona_gran_formato, maquila_volumen, plotter_impresion, produccion_agencias, promocionales_premium, regalos_empresariales, rigidos_senaletica, senaletica_oficinas, vinil_instalacion } as unknown as Record<string, Service>;

export const services: Record<string, Service> = Object.fromEntries(
  Object.entries(raw).map(([slug, s]) => [
    slug,
    { ...s, hero: { ...s.hero, primary: fixLink(s.hero.primary), secondary: fixLink(s.hero.secondary) }, cta: { ...s.cta, primary: fixLink(s.cta.primary), secondary: fixLink(s.cta.secondary) } },
  ]),
);

export const serviceSlugs = Object.keys(services);

/** Las URLs públicas conservan el `.html` (p. ej. /subpages/corte_laser_metal.html). */
export const getService = (param: string): Service | undefined => services[param.replace(/\.html$/, "")];
