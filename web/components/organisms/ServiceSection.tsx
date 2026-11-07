import Image from "next/image";
import { Container } from "@/components/atoms/Container";
import { RichText } from "@/components/atoms/RichText";
import { BenefitItem } from "@/components/molecules/BenefitItem";
import { CheckList } from "@/components/molecules/CheckList";
import { ExampleCard } from "@/components/molecules/ExampleCard";
import { InfoCard } from "@/components/molecules/InfoCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { TechCard } from "@/components/molecules/TechCard";
import type { ServiceSection as Section } from "@/content/services";
import styles from "./ServiceSection.module.css";

/**
 * Organism: bloque genérico de una página de servicio. Según los datos que reciba muestra
 * encabezado, texto, lista + imagen, tarjetas, ventajas, fichas técnicas y/o ejemplos.
 */
export function ServiceSection({ section, index }: { section: Section; index: number }) {
  const s = section;
  const dark = s.theme === "dark";
  const headingId = `service-section-${index}`;
  const split = Boolean(s.features || s.image);
  const paragraphs = (s.paragraphs ?? []).map((p, i) => (
    <p key={i} className={styles.paragraph}>{typeof p === "string" ? p : <RichText parts={p} />}</p>
  ));

  return (
    <section className={`${styles.section} ${styles[s.theme]}`} id={s.id} aria-labelledby={s.title ? headingId : undefined}>
      <Container>
        {split ? (
          <div className={styles.split}>
            <div>
              {s.title && <SectionHeading id={headingId} eyebrow={s.eyebrow ?? ""} title={s.title} tone={dark ? "dark" : "light"} />}
              {paragraphs}
              {s.features && <CheckList items={s.features} tone={dark ? "dark" : "light"} />}
            </div>
            {s.image && (
              <div className={styles.photo}>
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 960px) 90vw, 520px" />
              </div>
            )}
          </div>
        ) : (
          <>
            {s.title && <SectionHeading id={headingId} eyebrow={s.eyebrow ?? ""} title={s.title} tone={dark ? "dark" : "light"} />}
            {paragraphs.length > 0 && <div className={styles.prose}>{paragraphs}</div>}
          </>
        )}
        {s.cards && (
          <div className={`${styles.grid} ${s.cards.length === 4 ? styles.two : styles.three}`}>
            {s.cards.map((c, i) => <InfoCard key={c.title} index={i + 1} {...c} />)}
          </div>
        )}
        {s.benefits && (
          <div className={`${styles.grid} ${styles.four}`}>
            {s.benefits.map((b) => <BenefitItem key={b.title} {...b} />)}
          </div>
        )}
        {s.tech && (
          <div className={`${styles.grid} ${s.tech.length === 3 ? styles.three : styles.two}`}>
            {s.tech.map((t) => <TechCard key={t.title} tone={dark ? "dark" : "light"} {...t} />)}
          </div>
        )}
        {s.examples && (
          <div className={`${styles.grid} ${s.examples.length === 4 ? styles.four : styles.three}`}>
            {s.examples.map((e) => <ExampleCard key={e.src} {...e} />)}
          </div>
        )}
      </Container>
    </section>
  );
}
