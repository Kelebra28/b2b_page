import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import styles from "./StoreHero.module.css";

type Props = { eyebrow: string; title: string; text: string; crumbs?: { label: string; href?: string }[]; children?: React.ReactNode };

/** Organism: portada de la tienda (único h1 de la página). */
export function StoreHero({ eyebrow, title, text, crumbs, children }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="store-title">
      <Container>
        {crumbs && (
          <nav aria-label="Ruta" className={styles.crumbs}>
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                {i < crumbs.length - 1 && " / "}
              </span>
            ))}
          </nav>
        )}
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 id="store-title" className={styles.title}>{title}</h1>
        <p className={styles.text}>{text}</p>
        {children}
      </Container>
    </section>
  );
}
