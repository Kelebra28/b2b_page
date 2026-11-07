"use client";

import { MAX_QTY } from "@/lib/cart-store";
import styles from "./QuantityInput.module.css";

type Props = { value: number; onChange: (value: number) => void; label: string; size?: "md" | "sm" };

/** Molecule (cliente): − [cantidad] +. Se puede escribir (se confirma al salir o con Enter) o usar los botones. */
export function QuantityInput({ value, onChange, label, size = "md" }: Props) {
  const commit = (raw: string) => {
    const n = parseInt(raw.replace(/\D/g, ""), 10);
    onChange(Number.isFinite(n) ? Math.min(MAX_QTY, Math.max(0, n)) : value);
  };
  // `key={value}` reinicia el campo cuando el valor cambia desde fuera (botones o carrito).
  return (
    <div className={`${styles.box} ${styles[size]}`} role="group" aria-label={label}>
      <button type="button" className={styles.step} onClick={() => onChange(Math.max(0, value - 1))} disabled={value <= 0} aria-label="Una pieza menos">−</button>
      <input
        key={value}
        className={styles.input}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        defaultValue={value}
        style={{ width: `${Math.max(3, String(value).length) + 1.4}ch` }}
        aria-label={label}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={(e) => commit(e.currentTarget.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); commit(e.currentTarget.value); } }}
      />
      <button type="button" className={styles.step} onClick={() => onChange(Math.min(MAX_QTY, value + 1))} aria-label="Una pieza más">+</button>
    </div>
  );
}
