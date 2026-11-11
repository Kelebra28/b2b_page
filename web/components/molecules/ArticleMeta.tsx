import styles from "./ArticleMeta.module.css";

type Props = { author: string; date: string; dateLabel: string; readingMinutes: number; updatedLabel?: string };

/** Molecule: autor, fecha y tiempo de lectura de un artículo. Dumb. */
export function ArticleMeta({ author, date, dateLabel, readingMinutes, updatedLabel }: Props) {
  return (
    <p className={styles.meta}>
      <span>Por {author}</span>
      <time dateTime={date}>{dateLabel}</time>
      {updatedLabel && <span>Actualizado: {updatedLabel}</span>}
      <span>{readingMinutes} min de lectura</span>
    </p>
  );
}
