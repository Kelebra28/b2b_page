import { Container } from "@/components/atoms/Container";
import { BoutiqueCard } from "@/components/molecules/BoutiqueCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { boutique as d } from "@/content/home";
import styles from "./Boutique.module.css";

/** Organism: línea boutique (4 tarjetas enlazadas a los servicios de grabado). */
export function Boutique() {
  return (
    <section className={styles.section} id={d.sectionId} aria-labelledby={d.id}>
      <Container>
        <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} text={d.text} />
        <div className={styles.grid}>
          {d.items.map((it, i) => (
            <BoutiqueCard key={it.href} index={i + 1} {...it} />
          ))}
        </div>
      </Container>
    </section>
  );
}
