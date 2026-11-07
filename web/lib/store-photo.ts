/** Dominio de las fotos de la tienda (sin dependencias de servidor: lo usan componentes cliente). */
export const imageHost = "img.laserinova.com";

/**
 * Las fotos de la tienda ya son .webp livianas (6–25 KB) con caché de 7 días en el CDN de Hostinger:
 * se sirven directo, sin pasar por el optimizador de Next (ahorra CPU del servidor y cuota de Vercel).
 */
export const isStorePhoto = (src: unknown): boolean =>
  typeof src === "string" && (src.startsWith(`https://${imageHost}/`) || src.startsWith("/catalog-preview/"));
