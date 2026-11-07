import Image from "next/image";
import { RichText } from "@/components/atoms/RichText";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { HeroSpotlight } from "@/components/molecules/HeroSpotlight";
import { hero } from "@/content/home";
import styles from "./Hero.module.css";

/** Organism: portada. Un solo <h1>; el resaltado láser no altera el texto. */
export function Hero() {
  const [before, after] = hero.title.split(hero.highlight);
  return (
    <section className={styles.hero} id="hero">
      <Image
        src="/img/hero-laser.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
      />
      <div className={styles.shade} aria-hidden="true" />
      <HeroSpotlight />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1 className={styles.title}>
            {before}
            <span className={styles.hl}>{hero.highlight}</span>
            {after}
          </h1>
          <p className={styles.text}>
            <RichText parts={hero.text} />
          </p>
          <div className={styles.actions}>
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            <Button href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>
          <ul className={styles.badges} aria-label="Beneficios destacados">
            {hero.badges.map((b) => (
              <li key={b.label}>
                <Icon name={b.icon} size={18} />
                {b.label}
              </li>
            ))}
          </ul>
        </div>

        <ul className={styles.tags} aria-hidden="true">
          {hero.tags.map((t, i) => (
            <li key={t} style={{ ["--i" as string]: i }}>
              <span />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
