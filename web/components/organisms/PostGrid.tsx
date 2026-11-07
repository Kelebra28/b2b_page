import { Container } from "@/components/atoms/Container";
import { PostCard } from "@/components/molecules/PostCard";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import type { PostCard as Post } from "@/content/blog";
import styles from "./PostGrid.module.css";

type Props = { id: string; sectionId?: string; eyebrow: string; title: string; text: string; posts: Post[] };

/** Organism: listado de artículos del blog (más recientes primero). */
export function PostGrid({ id, sectionId, eyebrow, title, text, posts }: Props) {
  return (
    <section className={styles.section} id={sectionId} aria-labelledby={id}>
      <Container>
        <SectionHeading id={id} eyebrow={eyebrow} title={title} text={text} />
        <div className={styles.grid}>
          {posts.map((p) => (
            <PostCard key={p.slug} href={`/blog/${p.slug}.html`} {...p} />
          ))}
        </div>
      </Container>
    </section>
  );
}
