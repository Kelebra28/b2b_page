"use client";

import { track } from "@/lib/analytics";
import { useEffect, useRef, useState } from "react";
import { cartActions, DEFAULT_QTY, type NewCartItem } from "@/lib/cart-store";
import styles from "./AddToQuoteButton.module.css";

type Props = {
  item: NewCartItem;
  qty?: number;
  variant?: "card" | "primary";
  /** Sin cantidad no se puede agregar (ficha del producto). */
  disabled?: boolean;
  /** En la ficha del producto: al agregar se abre el carrito para ver el resultado. */
  openCart?: boolean;
};

/** Molecule (cliente): agrega un producto a la cotización y confirma con "✓ Agregado". */
export function AddToQuoteButton({ item, qty = DEFAULT_QTY, variant = "card", openCart, disabled }: Props) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const add = () => {
    if (disabled) return;
    cartActions.add(item, qty);
    track("add_to_cart", { item_id: item.model, item_name: item.name, quantity: qty });
    if (openCart) cartActions.openDrawer();
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1800);
  };

  return (
    <button type="button" className={`${styles.button} ${styles[variant]}`} data-done={done} disabled={disabled} onClick={add} aria-label={`Agregar ${item.name} a mi cotización`}>
      {done ? (
        <>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Agregado
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
          {disabled ? "Indica la cantidad" : variant === "primary" ? "Agregar a mi cotización" : "Agregar a cotización"}
        </>
      )}
      <span className={styles.live} role="status" aria-live="polite">{done ? "Agregado a tu cotización" : ""}</span>
    </button>
  );
}
