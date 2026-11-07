import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import { socialProof } from "@/content/home";
import styles from "./SocialProof.module.css";

/** Organism: confianza B2B (industrias + testimonios). */
export function SocialProof() {
  return (
    <section className={styles.section} aria-labelledby={socialProof.id}>
      <Container>
        <SectionHeading
          id={socialProof.id}
          eyebrow={socialProof.eyebrow}
          title={socialProof.title}
          text={socialProof.text}
          align="center"
        />
        <ul className={styles.strip}>
          {socialProof.industries.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <div className={styles.grid}>
          {socialProof.testimonials.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
