"use client";

import Link from "next/link";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductCard } from "@/components/molecules/ProductCard";
import { SortMenu } from "@/components/molecules/SortMenu";
import { byRelevance, colorHex, materialFamilies, matchesQuery, norm } from "@/lib/product-format";
import { loadIndex, toProductItem } from "@/lib/store-client";
import styles from "./StoreBrowser.module.css";

export type ProductItem = {
  slug: string;
  name: string;
  model: string;
  category: string;
  material: string | null;
  colors: string[];
  /** Foto propia por color (si existe). */
  colorImages?: Record<string, string>;
  /** Piezas en existencia: total y por color (si el CRM las publica). */
  stock?: number;
  colorStock?: Record<string, number>;
  techniques: string[];
  image: string | null;
  price?: number;
  priceLabel?: string;
};
export type CategoryChip = { slug: string; name: string; count: number };

type Props = {
  /** Lo que se ve al cargar (viene ya renderizado del servidor). */
  products: ProductItem[];
  /** En la portada: baja el catálogo completo en segundo plano para buscar en todo. */
  loadAll?: boolean;
  /** Contenido (p. ej. las categorías) que se oculta mientras se busca o filtra. */
  above?: React.ReactNode;
  gridTitle?: string;
  /** Búsquedas sugeridas cuando la barra está vacía. */
  suggestions?: string[];
  /** Fila de categorías para saltar entre ellas (páginas de categoría). */
  categoryNav?: CategoryChip[];
  activeSlug?: string;
  emptyText: string;
  whatsappHref: string;
};

const PAGE_SIZE = 24;

/** Color que el cliente pidió (filtro o palabra buscada) y que este producto sí tiene; null si no pidió ninguno. */
function wantedColor(p: ProductItem, color: string | null, q: string): string | null {
  if (color && p.colors.includes(color)) return color;
  const nq = norm(q);
  const words = nq.split(/\s+/).filter(Boolean);
  if (!words.length) return null;
  return (
    p.colors.find((c) => nq.includes(norm(c))) ??
    p.colors.find((c) => words.includes(norm(c).split(" ")[0])) ??
    null
  );
}

const SORTS = { destacados: "Destacados", nombre: "Nombre A–Z", colores: "Más colores", precio: "Menor precio" } as const;
type Sort = keyof typeof SORTS;

/**
 * Organism (cliente): barra fija de búsqueda/orden/color + cuadrícula que se filtra al escribir.
 * Muestra 24 productos por página con paginación numerada. No cambia de página del sitio para buscar.
 */
export function StoreBrowser({ products, loadAll, above, gridTitle, suggestions = [], categoryNav, activeSlug, emptyText, whatsappHref }: Props) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("destacados");
  const [color, setColor] = useState<string | null>(null);
  const [material, setMaterial] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [all, setAll] = useState<ProductItem[] | null>(null);
  const deferredQ = useDeferredValue(q);
  const gridTop = useRef<HTMLDivElement>(null);

  // Baja el catálogo completo (una sola vez). Se pide a los 0.8 s de abrir la página o al tocar el buscador.
  const ensureAll = useCallback(() => {
    if (!loadAll) return;
    loadIndex().then((items) => { if (items.length) setAll(items.map(toProductItem)); });
  }, [loadAll]);
  useEffect(() => {
    if (!loadAll) return;
    const t = setTimeout(ensureAll, 800);
    return () => clearTimeout(t);
  }, [loadAll, ensureAll]);

  const source = all ?? products;
  const hasPrices = source.some((p) => p.price);
  const filtering = q.trim() !== "" || color !== null || material !== null;
  const waiting = !!loadAll && !all && filtering; // escribió antes de que llegara el catálogo completo

  const colorOptions = useMemo(() => {
    const n = new Map<string, number>();
    source.forEach((p) => p.colors.forEach((c) => n.set(c, (n.get(c) ?? 0) + 1)));
    return [...n.entries()].filter(([c]) => colorHex(c)).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([c]) => c);
  }, [source]);

  const materialOptions = useMemo(() => {
    const n = new Map<string, number>();
    source.forEach((p) => materialFamilies(p.material).forEach((m) => n.set(m, (n.get(m) ?? 0) + 1)));
    return [...n.entries()].sort((a, b) => b[1] - a[1]);
  }, [source]);

  const results = useMemo(() => {
    let list = source.filter((p) => (!color || p.colors.includes(color)) && (!material || materialFamilies(p.material).includes(material)) && matchesQuery(p, deferredQ));
    if (sort === "destacados") list = byRelevance(list, deferredQ);
    if (sort === "nombre") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "es"));
    if (sort === "colores") list = [...list].sort((a, b) => b.colors.length - a.colors.length);
    if (sort === "precio") list = [...list].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    return list;
  }, [source, color, material, deferredQ, sort]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const from = (current - 1) * PAGE_SIZE;
  const visible = results.slice(from, from + PAGE_SIZE);
  const total = loadAll && !all ? null : results.length;

  const reset = () => { setQ(""); setColor(null); setMaterial(null); setPage(1); };
  const change = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(1); };
  const goTo = (p: number) => {
    setPage(p);
    gridTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={styles.section} aria-labelledby="productos-title">
      <Container>
        <h2 id="productos-title" className={styles.visuallyHidden}>Productos</h2>

        {categoryNav && (
          <nav aria-label="Categorías" className={styles.cats}>
            <Link href="/tienda">← Todas</Link>
            {categoryNav.map((c) => (
              <Link key={c.slug} href={`/tienda/${c.slug}`} aria-current={c.slug === activeSlug ? "page" : undefined}>
                {c.name} <small>{c.count}</small>
              </Link>
            ))}
          </nav>
        )}

        <div className={styles.bar}>
          <div className={styles.toolbar} role="search">
            <label className={styles.search}>
              <span className={styles.visuallyHidden}>Buscar productos</span>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              <input type="search" value={q} onFocus={ensureAll} placeholder="Buscar producto…" autoComplete="off" onChange={(e) => change(setQ)(e.target.value)} />
            </label>
            <SortMenu
              label="Ordenar"
              value={sort}
              onChange={change(setSort)}
              options={(Object.keys(SORTS) as Sort[]).filter((k) => k !== "precio" || hasPrices).map((k) => ({ value: k, label: SORTS[k] }))}
            />
          </div>
        </div>

        {suggestions.length > 0 && !filtering && (
          <div className={styles.suggest} aria-label="Búsquedas sugeridas">
            <span>Prueba con:</span>
            {suggestions.map((s) => <button key={s} type="button" onClick={() => change(setQ)(s)}>{s}</button>)}
          </div>
        )}

        {colorOptions.length > 0 && (
          <div className={styles.colors} role="group" aria-label="Filtrar por color">
            <span className={styles.colorsLabel}>Color</span>
            {colorOptions.map((c) => (
              <button key={c} type="button" className={styles.swatch} aria-pressed={color === c} aria-label={c.charAt(0) + c.slice(1).toLowerCase()} title={c.charAt(0) + c.slice(1).toLowerCase()} onClick={() => change(setColor)(color === c ? null : c)}>
                <span style={{ background: colorHex(c) ?? undefined }} />
              </button>
            ))}
          </div>
        )}

        {materialOptions.length > 0 && (
          <div className={styles.materials} role="group" aria-label="Filtrar por material">
            <span className={styles.colorsLabel}>Material</span>
            {materialOptions.map(([m, n]) => (
              <button key={m} type="button" className={styles.chip} aria-pressed={material === m} onClick={() => change(setMaterial)(material === m ? null : m)}>
                {m} <small>{n}</small>
              </button>
            ))}
          </div>
        )}

        {!filtering && above}

        <div ref={gridTop} className={styles.anchor} aria-hidden="true" />
        {!filtering && gridTitle && <h2 className={styles.gridTitle}>{gridTitle}</h2>}

        {(total !== null || filtering) && (
          <p className={styles.count} aria-live="polite">
            {waiting ? "Buscando en todo el catálogo…" : `${total} ${total === 1 ? "producto" : "productos"}${q.trim() ? ` para “${q.trim()}”` : ""}`}
            {filtering && <button type="button" className={styles.clear} onClick={reset}>Limpiar</button>}
          </p>
        )}

        {source.length === 0 ? (
          <p className={styles.empty}>{emptyText}</p>
        ) : waiting ? (
          <div className={styles.grid} aria-busy="true">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className={styles.skelCard}><Skeleton className={styles.skelPhoto} /><Skeleton className={styles.skelLine} /><Skeleton className={styles.skelLineShort} /></div>
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className={styles.none}>
            <p>No encontramos “{q.trim() || color || material}”.</p>
            <p>Prueba con otra palabra o cuéntanos qué buscas y te lo conseguimos.</p>
            <div className={styles.noneActions}>
              <button type="button" className={styles.clear} onClick={reset}>Ver todo el catálogo</button>
              <a href={whatsappHref} target="_blank" rel="noopener" className={styles.wa}>Pedir por WhatsApp</a>
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            {visible.map((p, i) => {
              const { price, material, colorImages, colorStock, stock, image, ...card } = p;
              void price; void material;
              const wanted = wantedColor(p, color, deferredQ);
              const photo = (wanted && colorImages?.[wanted]) || image;
              return <ProductCard key={p.slug} href={`/tienda/producto/${p.slug}`} priority={i < 4} image={photo} fallbackImage={image} quoteColor={wanted} stock={wanted && colorStock ? colorStock[wanted] ?? stock : stock} {...card} />;
            })}
          </div>
        )}

        {!waiting && total !== null && results.length > 0 && (
          <>
            <Pagination page={current} pages={pages} onChange={goTo} />
            <p className={styles.range}>Mostrando {from + 1}–{from + visible.length} de {results.length}</p>
          </>
        )}
      </Container>
    </section>
  );
}
