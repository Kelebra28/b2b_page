import { FadeImage } from "@/components/atoms/FadeImage";
import Link from "next/link";
import { ColorSwatches } from "@/components/molecules/ColorSwatches";
import { AddToQuoteButton } from "@/components/molecules/AddToQuoteButton";
import { formatPieces } from "@/lib/product-format";
import styles from "./ProductCard.module.css";

type Props = {
  slug: string;
  href: string;
  name: string;
  model: string;
  category: string;
  colors: string[];
  techniques: string[];
  image: string | null;
  /** Foto principal: se usa si la foto del color pedido no existe. */
  fallbackImage?: string | null;
  priceLabel?: string;
  /** Color elegido por el cliente (filtro o búsqueda): se manda con el producto a la cotización. */
  quoteColor?: string | null;
  /** Piezas en existencia (del color pedido, o el total). Sin dato = no se muestra. */
  stock?: number;
  priority?: boolean;
};

/** Molecule: tarjeta de producto. La tarjeta entera es el enlace; "Cotizar" es una acción rápida aparte. Dumb. */
export function ProductCard({ slug, href, name, model, category, colors, techniques, image, fallbackImage, priceLabel, quoteColor = null, stock, priority }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        {image ? (
          <FadeImage src={image} fallbackSrc={fallbackImage} alt={`${name} para personalizar`} fill priority={priority} sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw" />
        ) : (
          <span className={styles.empty} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="13" r="3.5" /></svg>
            Foto en camino
          </span>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>
          <Link href={href} className={styles.link}>{name}</Link>
        </h3>
        <p className={styles.meta}>
          <span>Mod. {model}</span>
          {techniques.length > 0 && <span className={styles.tech}>{techniques.slice(0, 2).join(" · ")}</span>}
        </p>
        {stock !== undefined && (
          <p className={styles.stock} data-out={stock === 0}>
            {stock > 0 ? `${formatPieces(stock)} pzas disponibles` : "Sin existencia por ahora"}
          </p>
        )}
        <div className={styles.foot}>
          <ColorSwatches colors={colors} />
          {priceLabel && <span className={styles.price}>{priceLabel}</span>}
        </div>
        <AddToQuoteButton item={{ slug, name, model, category, image, color: quoteColor, stock }} />
      </div>
    </article>
  );
}
