import { Container } from "@/components/atoms/Container";
import { ContactForm } from "@/components/molecules/ContactForm";
import { ContactInfoItem } from "@/components/molecules/ContactInfoItem";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { contact as d } from "@/content/home";
import styles from "./Contact.module.css";

/** Organism: contacto (datos, formulario y mapa). */
export function Contact() {
  return (
    <section className={styles.section} id={d.sectionId} aria-labelledby={d.id}>
      <Container>
        <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} text={d.text} tone="dark" align="center" />
        <div className={styles.grid}>
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>{d.infoTitle}</h3>
            <ul className={styles.list}>
              {d.info.map((i) => (
                <ContactInfoItem key={i.label} {...i} />
              ))}
            </ul>
          </div>
          <ContactForm labels={d.form} privacy={d.privacy} />
        </div>
        <iframe className={styles.map} src={d.mapSrc} title={d.mapTitle} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      </Container>
    </section>
  );
}
