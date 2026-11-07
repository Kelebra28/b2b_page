import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { RichText } from "@/components/atoms/RichText";
import type { RichText as RichTextType } from "@/content/home";
import styles from "./FinalCta.module.css";

type Link = { label: string; href: string };
type Props = { id: string; eyebrow?: string; title: string; text: string | RichTextType; primary: Link; secondary?: Link | null };

/** Organism: llamado final a cotizar. Dumb: recibe todo por props. */
export function FinalCta(d: Props) {
  return (
    <section className={styles.section} aria-labelledby={d.id}>
      <Container>
        <div className={styles.shell}>
          <div>
            {d.eyebrow && <span className={styles.eyebrow}>{d.eyebrow}</span>}
            <h2 id={d.id} className={styles.title}>{d.title}</h2>
            {d.text && <p className={styles.text}>{typeof d.text === "string" ? d.text : <RichText parts={d.text} />}</p>}
          </div>
          <div className={styles.actions}>
            <Button href={d.primary.href}>{d.primary.label}</Button>
            {d.secondary && <Button href={d.secondary.href} variant="ghost">{d.secondary.label}</Button>}
          </div>
        </div>
      </Container>
    </section>
  );
}
