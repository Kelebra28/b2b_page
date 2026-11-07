import { Container } from "@/components/atoms/Container";
import { BusinessCard } from "@/components/molecules/BusinessCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { businessLines } from "@/content/home";
import styles from "./BusinessLines.module.css";

/** Organism: servicios principales (6 líneas de negocio, las 3 primeras destacadas). */
export function BusinessLines() {
  return (
    <section className={styles.section} id="negocios" aria-labelledby={businessLines.id}>
      <Container>
        <SectionHeading
          id={businessLines.id}
          eyebrow={businessLines.eyebrow}
          title={businessLines.title}
          text={businessLines.text}
        />
        <div className={styles.grid}>
          {businessLines.items.map((item) => (
            <BusinessCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
