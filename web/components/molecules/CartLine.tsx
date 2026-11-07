import Image from "next/image";
import Link from "next/link";
import { QuantityInput } from "@/components/molecules/QuantityInput";
import { formatPieces } from "@/lib/product-format";
import type { CartItem } from "@/lib/cart-store";
import styles from "./CartLine.module.css";

type Props = { item: CartItem; onQty: (qty: number) => void; onRemove: () => void; onNavigate: () => void };

/** Molecule: una línea del carrito (foto, nombre, color, cantidad y quitar). */
export function CartLine({ item, onQty, onRemove, onNavigate }: Props) {
  const color = item.color ? item.color.charAt(0) + item.color.slice(1).toLowerCase() : null;
  return (
    <li className={styles.line}>
      <Link href={`/tienda/producto/${item.slug}`} className={styles.thumb} onClick={onNavigate} aria-label={`Ver ${item.name}`}>
        {item.image ? <Image src={item.image} alt="" fill sizes="72px" /> : <span aria-hidden="true">·</span>}
      </Link>
      <div className={styles.body}>
        <Link href={`/tienda/producto/${item.slug}`} className={styles.name} onClick={onNavigate}>{item.name}</Link>
        {item.qty < 1 && <p className={styles.missing} role="alert">Indica cuántas piezas necesitas</p>}
        <p className={styles.meta}>Mod. {item.model}{color ? ` · ${color}` : " · Color por definir"}</p>
        {item.stock !== undefined && (
          <p className={styles.stock} data-over={item.qty > item.stock}>
            {item.qty > item.stock
              ? item.stock > 0
                ? `Piden más de las ${formatPieces(item.stock)} pzas en existencia: ventas confirma tiempos.`
                : "Sin existencia por ahora: ventas confirma tiempos."
              : item.stock > 0 ? `${formatPieces(item.stock)} pzas disponibles` : "Sin existencia por ahora"}
          </p>
        )}
        <div className={styles.actions}>
          <QuantityInput size="sm" value={item.qty} onChange={onQty} label={`Cantidad de ${item.name}`} />
          <button type="button" className={styles.remove} onClick={onRemove} aria-label={`Quitar ${item.name} de la cotización`}>Quitar</button>
        </div>
      </div>
    </li>
  );
}
