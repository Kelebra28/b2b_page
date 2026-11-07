import type { ProductItem } from "@/components/organisms/StoreBrowser";
import { safeImage, type Product } from "@/lib/catalog";
import { cleanName, techniqueLabels } from "@/lib/product-format";

/** Producto reducido para buscar en el navegador (sin enlaces ni precios: se arman al mostrarlo). */
export type SearchItem = Omit<ProductItem, "price" | "priceLabel"> & { categorySlug: string };

export const toSearchItem = (p: Product): SearchItem => {
  const { title, model } = cleanName(p.name, p.model);
  return {
    slug: p.slug,
    name: title,
    model,
    category: p.category.name,
    categorySlug: p.category.slug,
    material: p.material,
    colors: p.colors.map((c) => c.name),
    colorImages: colorImages(p),
    stock: p.stock,
    colorStock: colorStock(p),
    techniques: techniqueLabels(p.printTechniques),
    image: safeImage(p.images[0]),
  };
};

/** Piezas en existencia por color (solo si el CRM las publica). */
export const colorStock = (p: Product) => {
  const out: Record<string, number> = {};
  for (const c of p.colors) if (c.stock !== undefined) out[c.name] = c.stock;
  return Object.keys(out).length ? out : undefined;
};

/** Foto propia de cada color (solo los que la tienen), para mostrar el color que el cliente busca. */
export const colorImages = (p: Product) => {
  const out: Record<string, string> = {};
  for (const c of p.colors) {
    const img = safeImage(c.image);
    if (img) out[c.name] = img;
  }
  return Object.keys(out).length ? out : undefined;
};

/** Los productos con foto van primero: se ve mejor y vende más. */
export const photosFirst = <T extends { images: string[] }>(list: T[]) =>
  [...list].sort((a, b) => Number(b.images.length > 0) - Number(a.images.length > 0));

/** Categorías con conteo y una foto de muestra (la primera con foto), de mayor a menor número de productos. */
export function categoryTiles(categories: { name: string; slug: string }[], products: Product[]) {
  const by = new Map<string, { count: number; image: string | null }>();
  for (const p of products) {
    const cur = by.get(p.category.slug) ?? { count: 0, image: null };
    cur.count += 1;
    cur.image ??= safeImage(p.images[0]);
    by.set(p.category.slug, cur);
  }
  return categories
    .map((c) => ({ slug: c.slug, name: c.name, count: by.get(c.slug)?.count ?? 0, image: by.get(c.slug)?.image ?? null }))
    .filter((c) => c.count > 0)
    .sort((a, b) => Number(!!b.image) - Number(!!a.image) || b.count - a.count);
}

/**
 * Orden de descubrimiento: reparte las categorías por turnos (un termo, una mochila, una libreta…) en vez de
 * mostrar 58 bolígrafos seguidos, y deja primero los que tienen foto.
 */
export function interleave<T extends { category: { slug: string }; images: string[] }>(list: T[]): T[] {
  const groups = new Map<string, T[]>();
  for (const p of photosFirst(list)) {
    const g = groups.get(p.category.slug);
    if (g) g.push(p);
    else groups.set(p.category.slug, [p]);
  }
  const columns = [...groups.values()].sort((a, b) => b.length - a.length);
  const out: T[] = [];
  for (let i = 0; out.length < list.length; i++) for (const col of columns) if (col[i]) out.push(col[i]);
  return photosFirst(out);
}
