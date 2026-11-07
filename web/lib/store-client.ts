import type { ProductItem } from "@/components/organisms/StoreBrowser";
import type { SearchItem } from "@/lib/search-index";

let indexPromise: Promise<SearchItem[]> | null = null;

/** Descarga el catálogo completo (versión ligera) una sola vez y lo reutiliza. */
export const loadIndex = () =>
  (indexPromise ??= fetch("/api/tienda/indice")
    .then((r) => (r.ok ? (r.json() as Promise<SearchItem[]>) : []))
    .catch(() => {
      indexPromise = null;
      return [] as SearchItem[];
    }));

/** Producto del índice → producto listo para mostrar. */
export const toProductItem = (p: SearchItem): ProductItem => ({ ...p });
