import { Container } from "@/components/atoms/Container";
import { Skeleton } from "@/components/atoms/Skeleton";
import styles from "./ProductSkeleton.module.css";

/** Organism: esqueleto de la ficha de producto mientras llegan los datos. */
export function ProductSkeleton() {
  return (
    <section className={styles.section} role="status" aria-busy="true" aria-label="Cargando producto">
      <Container>
        <Skeleton className={styles.crumbs} />
        <div className={styles.grid}>
          <Skeleton className={styles.photo} />
          <div className={styles.info}>
            <Skeleton className={styles.cat} />
            <Skeleton className={styles.title} />
            <Skeleton className={styles.titleShort} />
            <Skeleton className={styles.para} />
            <Skeleton className={styles.para} />
            <div className={styles.chips}>
              <Skeleton className={styles.chip} />
              <Skeleton className={styles.chip} />
              <Skeleton className={styles.chip} />
            </div>
            <Skeleton className={styles.cta} />
          </div>
        </div>
      </Container>
    </section>
  );
}
