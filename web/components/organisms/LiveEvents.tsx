import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { Icon } from "@/components/atoms/Icon";
import { CheckList } from "@/components/molecules/CheckList";
import { ProcessCanvas } from "@/components/molecules/ProcessCanvas";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { liveEvents as d } from "@/content/home";
import styles from "./LiveEvents.module.css";

/** Organism: grabado en vivo para eventos y activaciones. */
export function LiveEvents() {
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
          <div className={styles.panel}>
            <span className={styles.badge}>
              <Icon name="bolt" size={16} />
              {d.badge}
            </span>
            <ProcessCanvas kind="engrave" />
            <div className={styles.cards}>
              {d.cards.map((c) => (
                <article key={c.title} className={styles.card}>
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
