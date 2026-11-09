import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { WorkCard } from "@/components/molecules/WorkCard";
import styles from "./WorkGrid.module.css";

type Item = { src: string; alt: string; tag: string; title: string };
type Props = {
  sectionId: string;
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  items: Item[];
  cta: { label: string; href: string };
  /** Muestra solo las primeras N fotos (p. ej. en la home). */
  limit?: number;
};

/** Organism: galería de trabajos reales (carrusel en móvil, cuadrícula en escritorio). Dumb: recibe todo por props. */
export function WorkGrid({ sectionId, id, eyebrow, title, text, items, cta, limit }: Props) {
  return (
    <section className={styles.section} id={sectionId} aria-labelledby={id}>
      <Container>
        <SectionHeading id={id} eyebrow={eyebrow} title={title} text={text} />
        <div className={styles.grid}>
          {items.slice(0, limit).map((w) => (
            <WorkCard key={w.src} {...w} />
          ))}
        </div>
        <div className={styles.cta}>
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      </Container>
    </section>
  );
}
