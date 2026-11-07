import styles from "./BenefitItem.module.css";

/** Molecule: ventaja con filete láser. Dumb. */
export function BenefitItem({ title, text }: { title: string; text: string }) {
  return (
    <article className={styles.item}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </article>
  );
}
