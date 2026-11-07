import styles from "./InfoCard.module.css";

/** Molecule: tarjeta numerada de aplicación/variante. Dumb. */
export function InfoCard({ index, title, text }: { index: number; title: string; text: string }) {
  return (
    <article className={styles.card}>
      <span className={styles.num} aria-hidden="true" data-n={String(index).padStart(2, "0")} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </article>
  );
}
