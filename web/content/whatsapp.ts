/**
 * Mensajes del botón flotante de WhatsApp según dónde esté el visitante.
 * - Servicios y artículos: el mismo mensaje del botón principal de esa página.
 * - Home: cambia según la sección que se está viendo.
 * - Cualquier otro lugar: mensaje general.
 */
import { blogIndex, posts } from "@/content/blog";
import { laserService, liveEvents, plotterPromo, uvPrinting } from "@/content/home";
import { services } from "@/content/services";

/** Saca el texto (ya codificado para URL) de un enlace wa.me. */
const textOf = (href: string) => /[?&]text=(.*)$/.exec(href)?.[1];

export type WhatsAppMessages = {
  /** Mensaje general. */
  fallback: string;
  /** Por ruta (/subpages/x.html, /blog/y.html). */
  paths: Record<string, string>;
  /** Por id de sección de la home. */
  sections: Record<string, string>;
};

const enc = encodeURIComponent;

export function getWhatsAppMessages(): WhatsAppMessages {
  const paths: Record<string, string> = { "/blog": enc("Hola, leí el blog de Laser Inova y quiero cotizar un proyecto") };
  for (const s of Object.values(services)) {
    const t = textOf(s.hero.primary.href);
    if (t) paths[s.path] = t;
  }
  for (const p of Object.values(posts)) {
    const t = textOf(p.hero.primary.href);
    if (t) paths[p.path] = t;
  }
  void blogIndex;

  const sections: Record<string, string> = {
    [laserService.sectionId]: textOf(laserService.primary.href) ?? "",
    [liveEvents.sectionId]: textOf(liveEvents.primary.href) ?? "",
    [plotterPromo.sectionId]: textOf(plotterPromo.primary.href) ?? "",
    [uvPrinting.sectionId]: textOf(uvPrinting.primary.href) ?? "",
    boutique: enc("Hola, me interesa un regalo personalizado o una pieza grabada"),
    galeria: enc("Hola, vi la galería de productos y quiero cotizar una pieza"),
  };
  for (const k of Object.keys(sections)) if (!sections[k]) delete sections[k];

  return { fallback: "Hola,%20quiero%20informaci%C3%B3n%20de%20Ventas%20Corporativas", paths, sections };
}
