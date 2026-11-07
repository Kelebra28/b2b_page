import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { SolutionCard } from "@/components/molecules/SolutionCard";
import { solutions as d } from "@/content/home";
import styles from "./Solutions.module.css";

/** Organism: aplicaciones reales para clientes B2B (6 soluciones). */
export function Solutions() {
  return (
    <section className={styles.section} id={d.sectionId} aria-labelledby={d.id}>
      <Container>
        <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} text={d.text} />
        <div className={styles.grid}>
          {d.items.map((item, i) => (
            <SolutionCard key={item.title} index={i} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
