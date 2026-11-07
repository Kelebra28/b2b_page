import { colorHex } from "@/lib/product-format";
import styles from "./ColorSwatches.module.css";

type Props = { colors: string[]; max?: number; size?: "sm" | "lg" };

/** Molecule: círculos de color de un producto (con "+n" cuando hay muchos). Dumb. */
export function ColorSwatches({ colors, max = 5, size = "sm" }: Props) {
  if (colors.length === 0) return null;
  const shown = colors.slice(0, max);
  const rest = colors.length - shown.length;
  return (
    <ul className={`${styles.list} ${styles[size]}`} aria-label={`${colors.length} colores: ${colors.join(", ")}`}>
      {shown.map((c) => {
        const hex = colorHex(c);
        return (
          <li key={c} className={styles.item} title={c}>
            <span className={styles.dot} style={hex ? { background: hex } : undefined} />
            {size === "lg" && <span className={styles.name}>{c.charAt(0) + c.slice(1).toLowerCase()}</span>}
          </li>
        );
      })}
      {rest > 0 && <li className={styles.more}>+{rest}</li>}
    </ul>
  );
}
