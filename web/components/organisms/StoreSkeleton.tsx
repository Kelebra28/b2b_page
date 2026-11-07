import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/atoms/Skeleton";
import styles from "./StoreSkeleton.module.css";

/** Organism: esqueleto del listado de la tienda (portada, barra de búsqueda y cuadrícula) mientras llegan los productos. */
export function StoreSkeleton({ cards = 8 }: { cards?: number }) {
  return (
    <div role="status" aria-busy="true" aria-label="Cargando productos">
      <section className={styles.hero}>
        <Container>
          <Skeleton className={styles.eyebrow} />
          <Skeleton className={styles.title} />
          <Skeleton className={styles.text} />
        </Container>
      </section>
      <section className={styles.body}>
        <Container>
          <div className={styles.chips}>
            <Skeleton className={styles.chip} />
            <Skeleton className={styles.chip} />
          </div>
          <Skeleton className={styles.search} />
          <div className={styles.grid}>
            {Array.from({ length: cards }, (_, i) => (
              <div key={i} className={styles.card}>
                <Skeleton className={styles.photo} />
                <Skeleton className={styles.line} />
                <Skeleton className={styles.lineShort} />
                <Skeleton className={styles.button} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
