import styles from "./MaterialCard.module.css";

/** Molecule: grupo de capacidades (título + chips). */
export function MaterialCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.chips}>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </article>
  );
}
