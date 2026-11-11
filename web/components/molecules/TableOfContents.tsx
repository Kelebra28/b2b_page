import styles from "./TableOfContents.module.css";

/** Molecule: índice de un artículo con enlaces a sus secciones (anclas). Dumb. */
export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav className={styles.toc} aria-labelledby="toc-title">
      <p id="toc-title" className={styles.title}>En este artículo</p>
      <ol className={styles.list}>
        {items.map((i) => (
          <li key={i.id}><a href={`#${i.id}`}>{i.label}</a></li>
        ))}
      </ol>
    </nav>
  );
}
