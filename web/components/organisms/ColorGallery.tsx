"use client";

import { useEffect, useState } from "react";
import { FadeImage } from "@/components/atoms/FadeImage";
import { AddToQuoteButton } from "@/components/molecules/AddToQuoteButton";
import { ColorPicker } from "@/components/molecules/ColorPicker";
import { QuantityInput } from "@/components/molecules/QuantityInput";
import { DEFAULT_QTY } from "@/lib/cart-store";
import type { LiveStock } from "@/lib/catalog";
import { formatPieces } from "@/lib/product-format";
import styles from "./ProductDetail.module.css";

type Props = {
  slug: string;
  model: string;
  category: string;
  /** Enlace para cotizar solo este producto por WhatsApp (sin carrito). */
  whatsappHref: string;
  name: string;
  image: string | null;
  colors: { name: string; image: string | null; stock?: number }[];
  /** Piezas en existencia, todos los colores (si el CRM las publica). */
  stock?: number;
  /** Contenido de la columna de texto antes y después del selector de color (se arma en el servidor). */
  before: React.ReactNode;
  after: React.ReactNode;
};

type Slide = { color: string | null; label: string; image: string };

const pretty = (c: string) => c.charAt(0) + c.slice(1).toLowerCase();

/**
 * Organism (cliente): galería tipo Amazon/Mercado Libre (foto grande + miniaturas + flechas) sincronizada con el
 * selector de color. Las fotos son la general más una por cada color que tenga la suya.
 */
export function ColorGallery({ slug, model, category, whatsappHref, name, image, colors, stock, before, after }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [qty, setQty] = useState(DEFAULT_QTY);
  const [live, setLive] = useState<LiveStock | null>(null);

  // Existencia en vivo: solo cuando una persona abre la ficha (aquí, en el navegador). Si falla, quedan las cifras de la BD.
  useEffect(() => {
    if (stock === undefined) return; // el CRM no publica existencias
    const ac = new AbortController();
    fetch(`/api/tienda/existencia/${slug}`, { signal: ac.signal })
      .then((r) => (r.ok ? (r.json() as Promise<LiveStock>) : null))
      .then((d) => { if (d) setLive(d); })
      .catch(() => {});
    return () => ac.abort();
  }, [slug, stock]);

  const slides: Slide[] = [
    ...(image ? [{ color: null, label: "General", image }] : []),
    ...colors.filter((c): c is { name: string; image: string } => !!c.image).map((c) => ({ color: c.name, label: pretty(c.name), image: c.image })),
  ];
  const stockOf = (c: { name: string; stock?: number }) => live?.colors.find((x) => x.name.toUpperCase() === c.name.toUpperCase())?.stock ?? c.stock;
  const colorsNow = colors.map((c) => ({ ...c, stock: stockOf(c) }));
  const stockNow = live ? live.total : stock;
  const chosen = colorsNow.find((c) => c.name === selected);
  const index = slides.findIndex((s) => s.color === selected);
  const current = index >= 0 ? slides[index] : slides[0]; // un color sin foto propia deja la general
  const reference = !!chosen && !chosen.image;
  const label = chosen ? `${name}, color ${chosen.name.toLowerCase()}` : `${name} para personalizar`;
  const step = (dir: 1 | -1) => setSelected(slides[(Math.max(index, 0) + dir + slides.length) % slides.length].color);
  const gallery = slides.length > 1;
  const available = chosen ? chosen.stock : stockNow; // existencia del color elegido, o el total
  const cartItem = { slug, name, model, category, image: current?.image ?? image, color: selected, stock: available };

  return (
    <div className={styles.grid}>
      <div className={styles.mediaCol}>
        <div className={`${styles.gallery} ${gallery ? styles.withThumbs : ""}`}>
          {gallery && (
            <ul className={styles.thumbs} aria-label="Fotos del producto">
              {slides.map((s) => (
                <li key={s.color ?? "general"}>
                  <button type="button" className={styles.thumb} aria-label={`Ver foto: ${s.label}`} aria-current={current === s ? "true" : undefined} onClick={() => setSelected(s.color)}>
                    <FadeImage src={s.image} alt="" fill sizes="72px" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.media}>
            {current ? (
              <FadeImage src={current.image} alt={label} fill priority sizes="(max-width: 900px) 90vw, 560px" />
            ) : (
              <span className={styles.empty}>Foto próximamente</span>
            )}
            {gallery && (
              <>
                <button type="button" className={`${styles.nav} ${styles.navPrev}`} onClick={() => step(-1)} aria-label="Foto anterior">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" className={`${styles.nav} ${styles.navNext}`} onClick={() => step(1)} aria-label="Foto siguiente">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <span className={styles.counter} aria-hidden="true">{Math.max(index, 0) + 1} / {slides.length}</span>
              </>
            )}
          </div>
        </div>
        <p className={styles.photoNote} aria-live="polite">
          {reference ? `Foto de referencia: no tenemos foto del color ${chosen!.name.toLowerCase()}, pero lo hay disponible.` : " "}
        </p>
      </div>
      <div className={styles.info}>
        {before}
        {colors.length > 0 && (
          <div className={styles.block}>
            <h2 className={styles.sub}>Colores disponibles{selected ? `: ${pretty(selected)}` : ""}</h2>
            <ColorPicker colors={colorsNow} selected={selected} onSelect={setSelected} />
          </div>
        )}
        <div className={styles.actions}>
          {available !== undefined && (
            <p className={styles.stockLine} data-out={available === 0} aria-live="polite">
              {available > 0
                ? `${formatPieces(available)} pzas disponibles${chosen ? ` en ${pretty(chosen.name)}` : colors.length > 1 ? " (todos los colores)" : ""}`
                : `Sin existencia por ahora${chosen ? ` en ${pretty(chosen.name)}` : ""}: consúltanos tiempos de entrega`}
              {live?.live && <span className={styles.liveTag}>en tiempo real</span>}
            </p>
          )}
          <div className={styles.qtyRow}>
            <span className={styles.qtyLabel}>Cantidad</span>
            <QuantityInput value={qty} onChange={setQty} label="Cantidad de piezas" />
          </div>
          <p className={styles.qtyHint}>
            {qty < 1 ? "Indica cuántas piezas necesitas. " : ""}{available !== undefined && available > 0 && qty > available ? "Pides más de las piezas en existencia: confirmamos tiempos de entrega en tu cotización. " : ""}{selected ? `Color: ${pretty(selected)}. ` : colors.length ? "Elige un color arriba (opcional). " : ""}Ventas confirma la cantidad en tu cotización.
          </p>
          <div className={styles.addDesktop}><AddToQuoteButton variant="primary" item={cartItem} qty={qty} openCart disabled={qty < 1} /></div>
          <a className={styles.secondary} href={whatsappHref} target="_blank" rel="noopener">Cotizar solo este por WhatsApp</a>
        </div>
        {after}
      </div>
      <div className={styles.sticky} data-sticky-cta>
        <AddToQuoteButton variant="primary" item={cartItem} qty={qty} openCart disabled={qty < 1} />
      </div>
    </div>
  );
}
