import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { FaqItem } from "@/components/molecules/FaqItem";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import styles from "./Faqs.module.css";

type Props = {
  sectionId: string;
  id: string;
  eyebrow: string;
  title: string;
  items: { q: string; a: string }[];
  group: string;
  /** Enlace opcional a la página completa de preguntas frecuentes. */
  more?: { label: string; href: string };
};

/** Organism: preguntas frecuentes (acordeón nativo, un item abierto a la vez). Dumb: recibe todo por props. */
export function Faqs({ sectionId, id, eyebrow, title, items, group, more }: Props) {
  return (
    <section className={styles.section} id={sectionId} aria-labelledby={id}>
      <Container>
        <div className={styles.grid}>
          <SectionHeading id={id} eyebrow={eyebrow} title={title} />
          <div className={styles.list}>
            {items.map((f) => (
              <FaqItem key={f.q} question={f.q} answer={f.a} group={group} />
            ))}
            {more && (
              <div className={styles.more}>
                <Button href={more.href} variant="outline">{more.label}</Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
