import { Container } from "@/components/atoms/Container";
import type { LegalDoc } from "@/content/legal";
import Link from "next/link";
import { cookiesRoute, privacyRoute } from "@/content/legal";
import styles from "./LegalDocument.module.css";

/** Organism: documento legal (aviso de privacidad, política de cookies). Un solo h1 y secciones con h2. */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  const other = doc.path === privacyRoute ? { href: cookiesRoute, label: "Política de cookies" } : { href: privacyRoute, label: "Aviso de privacidad" };
  return (
    <section className={styles.section} aria-labelledby="legal-title">
      <Container>
        <article className={styles.doc}>
          <h1 id="legal-title" className={styles.title}>{doc.title}</h1>
          <p className={styles.updated}>Última actualización: {doc.updated}</p>
          <p className={styles.intro}>{doc.intro}</p>
          {doc.sections.map((s) => (
            <section key={s.title} className={styles.block}>
              <h2 className={styles.heading}>{s.title}</h2>
              {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {s.items && (
                <ul>
                  {s.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              )}
            </section>
          ))}
          <p className={styles.more}>
            Consulta también: <Link href={other.href}>{other.label}</Link>
          </p>
        </article>
      </Container>
    </section>
  );
}
