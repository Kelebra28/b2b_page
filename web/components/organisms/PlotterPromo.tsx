import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { CheckList } from "@/components/molecules/CheckList";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { ServiceLink } from "@/components/molecules/ServiceLink";
import { plotterPromo as d } from "@/content/home";
import styles from "./PlotterPromo.module.css";

/** Organism: impresión de gran formato (servicios enlazados + tarjeta de branding 360°). */
export function PlotterPromo() {
  return (
    <section className={styles.section} id={d.sectionId} aria-labelledby={d.id}>
      <Container>
        <div className={styles.grid}>
          <div>
            <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} text={d.text} />
            <div className={styles.services}>
              {d.services.map((s) => (
                <ServiceLink key={s.title} {...s} />
              ))}
            </div>
            <div className={styles.actions}>
              <Button href={d.primary.href}>{d.primary.label}</Button>
              <Button href={d.secondary.href} variant="outline">
                {d.secondary.label}
              </Button>
            </div>
          </div>
          <aside className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.cardIcon}>
                <Icon name="eye" size={24} />
              </span>
              <h3>{d.card.title}</h3>
            </div>
            <p>{d.card.text}</p>
            <CheckList items={d.card.specs} tone="dark" />
          </aside>
        </div>
      </Container>
    </section>
  );
}
