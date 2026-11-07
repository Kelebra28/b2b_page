import styles from "./Pagination.module.css";

type Props = { page: number; pages: number; onChange: (page: number) => void };

const range = (page: number, pages: number): (number | "…")[] => {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const from = Math.max(2, page - 1);
  const to = Math.min(pages - 1, page + 1);
  if (from > 2) out.push("…");
  for (let i = from; i <= to; i++) out.push(i);
  if (to < pages - 1) out.push("…");
  out.push(pages);
  return out;
};

/** Molecule: paginación numerada con anterior/siguiente. Dumb: el estado vive en quien la usa. */
export function Pagination({ page, pages, onChange }: Props) {
  if (pages <= 1) return null;
  return (
    <nav className={styles.nav} aria-label="Páginas de resultados">
      <button type="button" className={`${styles.btn} ${styles.step}`} disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Página anterior">
        <span aria-hidden="true">←</span><span className={styles.stepText}>Anterior</span>
      </button>
      {range(page, pages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className={styles.gap} aria-hidden="true">…</span>
        ) : (
          <button key={p} type="button" className={styles.btn} aria-current={p === page ? "page" : undefined} aria-label={`Página ${p}`} onClick={() => onChange(p)}>
            {p}
          </button>
        ),
      )}
      <button type="button" className={`${styles.btn} ${styles.step}`} disabled={page === pages} onClick={() => onChange(page + 1)} aria-label="Página siguiente">
        <span className={styles.stepText}>Siguiente</span><span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
