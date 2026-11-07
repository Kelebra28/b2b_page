import { Container } from "@/components/atoms/Container";
import { MaterialCard } from "@/components/molecules/MaterialCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { TechTable } from "@/components/molecules/TechTable";
import { materials as d } from "@/content/home";
import styles from "./Materials.module.css";

/** Organism: materiales, procesos y tabla de capacidades técnicas. */
export function Materials() {
  return (
    <section className={styles.section} aria-labelledby={d.id}>
      <Container>
        <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} />
        <div className={styles.grid}>
          {d.groups.map((g) => (
            <MaterialCard key={g.title} {...g} />
          ))}
        </div>
        <TechTable caption={d.caption} columns={d.columns} rows={d.rows} />
      </Container>
    </section>
  );
}
