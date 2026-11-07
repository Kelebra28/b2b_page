import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { Container } from "@/components/atoms/Container";
import { RichText } from "@/components/atoms/RichText";
import { CheckList } from "@/components/molecules/CheckList";
import type { Service } from "@/content/services";
import styles from "./ServiceHero.module.css";

/** Organism: portada de una página de servicio (único h1 de la página). */
export function ServiceHero({ hero }: { hero: Service["hero"] }) {
  return (
    <section className={styles.hero} id="hero" aria-labelledby="service-title">
      <Container>
        <div className={styles.grid}>
          <div>
            <span className={styles.eyebrow}>{hero.eyebrow}</span>
            <h1 id="service-title" className={styles.title}>{hero.title}</h1>
            <p className={styles.text}>
              {typeof hero.text === "string" ? hero.text : <RichText parts={hero.text} />}
            </p>
            <div className={styles.actions}>
              <Button href={hero.primary.href}>{hero.primary.label}</Button>
              {hero.secondary && <Button href={hero.secondary.href} variant="ghost">{hero.secondary.label}</Button>}
            </div>
            {hero.badges.length > 0 && <CheckList items={hero.badges} tone="dark" />}
          </div>
          <div className={styles.visual}>
            {hero.card && (
              <div className={styles.card}>
                <strong>{hero.card.title}</strong>
                <span>{hero.card.text}</span>
              </div>
            )}
            {hero.image && (
              <div className={styles.frame}>
                <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(max-width: 960px) 90vw, 520px" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
