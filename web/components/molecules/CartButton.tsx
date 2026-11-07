"use client";

import { usePathname } from "next/navigation";
import { cartActions, countPieces, useCartItems } from "@/lib/cart-store";
import styles from "./CartButton.module.css";

/** Molecule (cliente): botón de la cabecera con el contador. Aparece en la tienda o cuando ya hay algo agregado. */
export function CartButton() {
  const items = useCartItems();
  const pathname = usePathname();
  const lines = items.length;
  if (!pathname.startsWith("/tienda") && lines === 0) return null;
  return (
    <button
      type="button"
      className={styles.button}
      onClick={cartActions.openDrawer}
      aria-label={lines ? `Abrir mi cotización: ${lines} ${lines === 1 ? "producto" : "productos"}, ${countPieces(items)} piezas` : "Abrir mi cotización (vacía)"}
      aria-haspopup="dialog"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 8h12l-1 12H7z" />
        <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
      </svg>
      <span className={styles.label}>Mi cotización</span>
      {lines > 0 && <span key={lines} className={styles.badge} aria-hidden="true">{lines}</span>}
    </button>
  );
}
