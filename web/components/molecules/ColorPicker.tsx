"use client";

import { colorHex, formatPieces } from "@/lib/product-format";
import styles from "./ColorPicker.module.css";

type Props = { colors: { name: string; stock?: number }[]; selected: string | null; onSelect: (name: string | null) => void };

/** Molecule (cliente): elegir un color; volver a tocarlo lo deselecciona. Dumb: el estado vive en quien lo usa. */
export function ColorPicker({ colors, selected, onSelect }: Props) {
  return (
    <div className={styles.group} role="group" aria-label="Elige un color">
      {colors.map((c) => {
        const hex = colorHex(c.name);
        const on = selected === c.name;
        return (
          <button key={c.name} type="button" className={styles.chip} aria-label={c.stock !== undefined ? `${c.name.charAt(0) + c.name.slice(1).toLowerCase()}: ${c.stock > 0 ? `${formatPieces(c.stock)} piezas disponibles` : "sin existencia por ahora"}` : undefined} aria-pressed={on} data-out={c.stock === 0} onClick={() => onSelect(on ? null : c.name)}>
            <span className={styles.dot} style={hex ? { background: hex } : undefined} />
            <span className={styles.text}>
              <span>{c.name.charAt(0) + c.name.slice(1).toLowerCase()}</span>
              {c.stock !== undefined && (
                <small className={styles.qty}>{c.stock > 0 ? `${formatPieces(c.stock)} pzas` : "Sin existencia"}</small>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
