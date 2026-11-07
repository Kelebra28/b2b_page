import styles from "./TestimonialCard.module.css";

/** Molecule: testimonio (cita + autor). */
export function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <figure className={styles.card}>
      <blockquote className={styles.quote}>{quote}</blockquote>
      <figcaption className={styles.author}>{author}</figcaption>
    </figure>
  );
}
