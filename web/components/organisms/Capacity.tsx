import { Container } from "@/components/atoms/Container";
import { CheckList } from "@/components/molecules/CheckList";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { StatCard } from "@/components/molecules/StatCard";
import { capacity as d } from "@/content/home";
import styles from "./Capacity.module.css";

/** Organism: capacidad operativa (texto + 4 cifras). */
export function Capacity() {
  return (
    <section className={styles.section} aria-labelledby={d.id}>
      <Container>
        <div className={styles.grid}>
          <div>
            <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} text={d.text} tone="dark" />
            <CheckList items={d.features} tone="dark" />
          </div>
          <div className={styles.stats}>
            {d.stats.map((s) => (
              <StatCard key={s.value} {...s} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
