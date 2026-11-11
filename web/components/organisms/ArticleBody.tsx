import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { RichText } from "@/components/atoms/RichText";
import { ArticleMeta } from "@/components/molecules/ArticleMeta";
import { TableOfContents } from "@/components/molecules/TableOfContents";
import type { Article, ArticleBlock } from "@/content/blog";
import styles from "./ArticleBody.module.css";

const text = (t: string | Parameters<typeof RichText>[0]["parts"]) => (typeof t === "string" ? t : <RichText parts={t} />);

function Block({ b }: { b: ArticleBlock }) {
  if (b.type === "h3") return <h3 className={styles.h3}>{b.text}</h3>;
  if ("items" in b) {
    const List = b.type;
    return <List className={styles.list}>{b.items.map((i, k) => <li key={k}>{text(i)}</li>)}</List>;
  }
  return <p className={styles.p}>{text(b.text)}</p>;
}

/** Organism: cuerpo de un artículo del blog (un solo h1, índice, secciones h2/h3 y enlaces a servicios). Dumb. */
export function ArticleBody({ article }: { article: Article }) {
  return (
    <section className={styles.section} aria-labelledby="article-title">
      <Container>
        <article className={styles.article}>
          <nav className={styles.crumbs} aria-label="Migas de pan">
            <Link href="/">Inicio</Link> / <Link href="/blog">Blog</Link>
          </nav>
          <h1 id="article-title" className={styles.title}>{article.title}</h1>
          <p className={styles.dek}>{article.dek}</p>
          <ArticleMeta author={article.author} date={article.date} dateLabel={article.dateLabel} readingMinutes={article.readingMinutes} />
          <div className={styles.photo}>
            <Image src={article.image.src} alt={article.image.alt} fill priority sizes="(max-width: 800px) 92vw, 760px" />
          </div>
          <TableOfContents items={article.sections.map((s) => ({ id: s.id, label: s.heading }))} />
          {article.sections.map((s) => (
            <section key={s.id} id={s.id} className={styles.block} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`} className={styles.h2}>{s.heading}</h2>
              {s.body.map((b, i) => <Block key={i} b={b} />)}
            </section>
          ))}
          <aside className={styles.related} aria-labelledby="related-title">
            <h2 id="related-title" className={styles.relatedTitle}>Servicios relacionados</h2>
            <ul>
              {article.related.map((r) => (
                <li key={r.href}><Link href={r.href}>{r.label}</Link></li>
              ))}
            </ul>
          </aside>
        </article>
      </Container>
    </section>
  );
}
