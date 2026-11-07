import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { CheckList } from "@/components/molecules/CheckList";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { UvBed } from "@/components/molecules/UvBed";
import { uvPrinting as d } from "@/content/home";
import styles from "./UvPrinting.module.css";

/** Organism: impresión en cama plana UV (texto + maqueta animada). */
export function UvPrinting() {
  return (
    <section className={styles.section} id={d.sectionId} aria-labelledby={d.id}>
      <Container>
        <div className={styles.grid}>
          <div>
            <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} text={d.text} tone="dark" />
            <CheckList items={d.features} tone="dark" />
            <div className={styles.actions}>
              <Button href={d.primary.href}>{d.primary.label}</Button>
              <Button href={d.secondary.href} variant="ghost">
                {d.secondary.label}
              </Button>
            </div>
          </div>
          <UvBed plates={d.plates as [string, string, string]} callouts={d.callouts as [string, string]} />
        </div>
      </Container>
    </section>
  );
}
