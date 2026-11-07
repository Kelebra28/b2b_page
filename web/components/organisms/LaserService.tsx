import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { CheckList } from "@/components/molecules/CheckList";
import { ProcessCanvas } from "@/components/molecules/ProcessCanvas";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { laserService as d } from "@/content/home";
import styles from "./LaserService.module.css";

/** Organism: maquila de corte y grabado láser (texto + animación con callouts). */
export function LaserService() {
  return (
    <section className={styles.section} id={d.sectionId} aria-labelledby={d.id}>
      <Container>
        <div className={styles.grid}>
          <div>
            <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} text={d.text} />
            <CheckList items={d.features} />
            <div className={styles.actions}>
              <Button href={d.primary.href}>{d.primary.label}</Button>
              <Button href={d.secondary.href} variant="outline">
                {d.secondary.label}
              </Button>
            </div>
          </div>
          <div className={styles.visual}>
            <ProcessCanvas kind="laser" />
            <span className={`${styles.callout} ${styles.top}`}>{d.callouts[1]}</span>
            <span className={`${styles.callout} ${styles.bottom}`}>{d.callouts[0]}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
