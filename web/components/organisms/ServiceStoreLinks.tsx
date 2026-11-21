import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { StoreLinks } from "@/content/services";
import styles from "./ServiceStoreLinks.module.css";

/** Organism: enlaces de una página de servicio a categorías de la tienda (piezas listas para personalizar). Dumb. */
export function ServiceStoreLinks({ id, title, text, links }: StoreLinks & { id: string }) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <Container>
        <SectionHeading id={id} eyebrow="Tienda" title={title} text={text} />
        <ul className={styles.list}>
          {links.map((l) => (
            <li key={l.href}>
              <Link className={styles.link} href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
