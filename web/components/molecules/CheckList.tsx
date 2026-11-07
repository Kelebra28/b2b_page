import { Icon } from "@/components/atoms/Icon";
import styles from "./CheckList.module.css";

/** Molecule: lista con palomitas láser. `tone` según el fondo de la sección. */
export function CheckList({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  return (
    <ul className={`${styles.list} ${styles[tone]}`}>
      {items.map((t) => (
        <li key={t}>
          <span className={styles.mark}>
            <Icon name="check" size={14} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}
