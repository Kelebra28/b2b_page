import type { Product } from "@/lib/catalog";
import { useFor, list } from "@/lib/product-copy";
import { materialFamilies, techniqueLabels } from "@/lib/product-format";

/** Nombres cortos de las familias de material para usarlos dentro de una frase. */
const SHORT: Record<string, string> = { "Tela y textil": "tela", "Madera y bambú": "madera", "Vidrio y cerámica": "vidrio", "Cartón y papel": "cartón", "Silicón y goma": "silicón", "Piel sintética": "piel sintética" };
const top = (counts: Map<string, number>, n: number) => [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);

/**
 * Texto propio de cada categoría de la tienda, armado con lo que de verdad tiene (cuántos productos, materiales,
 * técnicas y colores). Así cada categoría dice algo distinto y no solo lista productos.
 */
export function categoryCopy(name: string, products: Product[]): { heading: string; paragraphs: string[] } | null {
  if (products.length === 0) return null;
  const lower = name.toLowerCase();
  const mats = new Map<string, number>();
  const techs = new Map<string, number>();
  const colors = new Set<string>();
  for (const p of products) {
    materialFamilies(p.material).forEach((m) => mats.set(m, (mats.get(m) ?? 0) + 1));
    techniqueLabels(p.printTechniques).forEach((t) => techs.set(t, (techs.get(t) ?? 0) + 1));
    p.colors.forEach((c) => colors.add(c.name.trim().toUpperCase()));
  }
  const n = products.length;
  const materials = top(mats, 3).map((m) => SHORT[m] ?? m.toLowerCase());
  const techniques = top(techs, 3).map((t) => t.toLowerCase());

  const first = `En Laser Inova tenemos ${n} ${n === 1 ? "modelo" : "modelos"} de ${lower} para personalizar con el logotipo de tu empresa. Son una buena opción para ${useFor(name)}.`;
  const detail = [
    materials.length ? `Encuentras opciones en ${list(materials)}${colors.size > 1 ? ` y hasta ${colors.size} colores distintos entre todos los modelos` : ""}.` : "",
    techniques.length ? `Los personalizamos con ${list(techniques)}, según el material y el tamaño de tu logotipo.` : "",
  ].filter(Boolean).join(" ");
  const close = "Producimos en nuestro taller de Azcapotzalco, CDMX. Elige el modelo, dinos cuántas piezas necesitas y te enviamos la cotización por WhatsApp con una muestra digital de tu logotipo.";

  return { heading: `${name} personalizados para empresas en CDMX`, paragraphs: [first, [detail, close].filter(Boolean).join(" ")] };
}
