import { cacheLife } from "next/cache";
import { imageHost } from "@/lib/store-photo";

/**
 * Cliente del catálogo. Consume la API pública de solo lectura del CRM (servidor a servidor).
 * Nunca se conecta a la base de datos ni a los proveedores. La llave vive solo en variables de entorno del servidor.
 * Cada consulta se cachea 10 min (stale-while-revalidate) para que los visitantes no peguen al CRM.
 */

export type Product = {
  slug: string;
  model: string;
  name: string;
  brand: string | null;
  category: { name: string; slug: string };
  description: string | null;
  material: string | null;
  measurements: string | null;
  printTechniques: string | null;
  images: string[];
  /** `image`: foto propia de ese color (solo cuando existe). */
  colors: { name: string; sku: string | null; image?: string; /** Piezas en existencia (solo si el CRM las publica). */ stock?: number }[];
  /** Solo si el CRM tiene los precios encendidos. */
  priceFrom?: number;
  /** Piezas en existencia, todos los colores (solo si el CRM las publica). */
  stock?: number;
};
export type Category = { name: string; slug: string };

/** El CRM trae algunas categorías en MAYÚSCULAS ("BEBIDAS"): se muestran como "Bebidas". */
const prettyName = (n: string) => (n === n.toUpperCase() ? n.toLowerCase().replace(/^\p{L}/u, (c) => c.toUpperCase()) : n);
/** El CRM a veces trae el mismo color en dos filas (dos SKU): se junta en uno, conservando la foto si alguna la tiene. */
const uniqueColors = (colors: Product["colors"]): Product["colors"] => {
  const seen = new Map<string, Product["colors"][number]>();
  for (const c of colors) {
    const key = c.name.trim().toUpperCase();
    const prev = seen.get(key);
    if (!prev) seen.set(key, c);
    else seen.set(key, { ...prev, image: prev.image ?? c.image, ...(prev.stock !== undefined || c.stock !== undefined ? { stock: (prev.stock ?? 0) + (c.stock ?? 0) } : {}) });
  }
  return [...seen.values()];
};
const prettyProduct = (p: Product): Product => ({ ...p, colors: uniqueColors(p.colors), category: { ...p.category, name: prettyName(p.category.name) } });

async function get<T>(path: string): Promise<T | null> {
  const base = process.env.CATALOG_API_URL;
  const key = process.env.CATALOG_API_KEY;
  if (!base || !key) return null; // tienda sin configurar: las páginas muestran "próximamente"
  // Al construir el sitio se piden muchas páginas a la vez y el CRM puede responder 429 (o 5xx): se reintenta con espera.
  const maxAttempts = 6;
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/public/v1${path}`, {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(10_000),
    });
    if (res.status === 404) return null;
    if (res.ok) return res.json() as Promise<T>;
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt >= maxAttempts) throw new Error(`Catálogo: ${res.status}`);
    const retryAfter = Number(res.headers.get("retry-after"));
    const wait = Math.min(15_000, (retryAfter > 0 ? retryAfter * 1000 : 500 * 2 ** attempt) + Math.random() * 500);
    await new Promise((r) => setTimeout(r, wait));
  }
}

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 });
  const data = await get<{ categories: Category[] }>("/categories");
  // Con la tienda configurada, una lista vacía es una falla del CRM: que no se guarde (ni se publiquen páginas 404 en el build).
  if (data && !data.categories.length) throw new Error("Catálogo: categorías vacías");
  // "- ninguna subfamilia -" es un comodín del proveedor, no una categoría para el público.
  return (data?.categories ?? []).filter((c) => c.slug !== "-ninguna-subfamilia-").map((c) => ({ ...c, name: prettyName(c.name) }));
}

/** Todos los productos (de una categoría, o de todas las publicadas). */
export async function getProducts(category?: string): Promise<Product[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 });
  const fetchPage = (page: number) => {
    const q = new URLSearchParams({ limit: "60", page: String(page) });
    if (category) q.set("category", category);
    return get<{ products: Product[]; total: number }>(`/products?${q}`);
  };
  // La primera página dice cuántas hay en total; las demás se piden TODAS A LA VEZ (en frío, de ~11 s a ~1 s).
  const first = await fetchPage(1);
  if (!first) return [];
  const pages = Math.min(50, Math.ceil(first.total / 60));
  const rest = await Promise.all(Array.from({ length: Math.max(0, pages - 1) }, (_, i) => fetchPage(i + 2)));
  return [first, ...rest].flatMap((d) => d?.products ?? []).map(prettyProduct);
}

export const countBy = (products: Product[]) =>
  products.reduce<Record<string, number>>((n, p) => ((n[p.category.slug] = (n[p.category.slug] ?? 0) + 1), n), {});

export async function getProduct(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 600, expire: 86400 });
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  const p = (await get<{ product: Product }>(`/products/${slug}`))?.product;
  return p ? prettyProduct(p) : null;
}

/** Las fotos solo se aceptan de nuestro propio dominio de imágenes (nunca del proveedor). */
export { imageHost };
export const safeImage = (src?: string) => {
  try {
    if (!src) return null;
    const u = new URL(src);
    if (u.host !== imageHost) return null;
    // Solo desarrollo: img.laserinova.com aún no existe, las fotos se leen de public/catalog-preview.
    if (process.env.NODE_ENV === "development") return `/catalog-preview${u.pathname}`;
    return src;
  } catch {
    return null;
  }
};

/** Existencia de un producto, en vivo cuando el CRM puede (solo Doble Vela); si no, la de la BD con `live: false`. */
export type LiveStock = { live: boolean; total: number; colors: { name: string; stock: number }[] };

/**
 * Se pide SOLO cuando alguien abre la ficha (desde el navegador, nunca al construir ni en el sitemap) y se guarda
 * 2 min, para que muchas visitas al mismo producto sean una sola consulta al CRM (y este, una a Doble Vela cada 5 min).
 */
export async function getLiveStock(slug: string): Promise<LiveStock | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 120, expire: 600 });
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  try {
    return await get<LiveStock>(`/products/${slug}/stock`);
  } catch {
    return null;
  }
}
