import { Container } from "@/components/atoms/Container";
import { ClusterCard } from "@/components/molecules/ClusterCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { directory as d } from "@/content/home";
import styles from "./Directory.module.css";

/** Organism: directorio de especialidades (enlaces internos a todas las páginas de servicio). */
export function Directory() {
  return (
    <section className={styles.section} id={d.sectionId} aria-labelledby={d.id}>
      <Container>
        <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} />
        <div className={styles.grid}>
          {d.clusters.map((c) => (
            <ClusterCard key={c.title} {...c} />
          ))}
        </div>
      </Container>
    </section>
  );
}
