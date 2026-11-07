import { Container } from "@/components/atoms/Container";
import { ProcessCanvas } from "@/components/molecules/ProcessCanvas";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { process } from "@/content/home";
import styles from "./ProcessShowcase.module.css";

/** Organism: planta industrial, 4 procesos animados. */
export function ProcessShowcase() {
  return (
    <section className={styles.section} aria-labelledby="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow={process.eyebrow}
          title={process.title}
          text={process.text}
          tone="dark"
        />
        <div className={styles.grid}>
          {process.items.map((p) => (
            <article key={p.kind} className={styles.card}>
              <ProcessCanvas kind={p.kind} />
              <h3 className={styles.title}>{p.title}</h3>
              <span className={styles.detail}>{p.detail}</span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
