import { TrustItem } from "@/components/molecules/TrustItem";
import { trust } from "@/content/home";
import styles from "./TrustBar.module.css";

/** Organism: franja de indicadores de confianza. */
export function TrustBar() {
  return (
    <section className={styles.bar} aria-label={trust.label}>
      <div className={styles.grid}>
        {trust.items.map((item) => (
          <TrustItem key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
