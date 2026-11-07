import { Container } from "@/components/atoms/Container";
import { CategoryCard } from "@/components/molecules/CategoryCard";
import styles from "./CategoryGrid.module.css";

export type CategoryTile = { slug: string; name: string; count: number; image: string | null };
type Props = {
  id: string;
  title: string;
  text?: string;
  categories: CategoryTile[];
  /** Categorías extra que se despliegan con "Ver todas" (siguen siendo enlaces reales en el HTML). */
  more?: CategoryTile[];
  tone?: "light" | "alt";
  /** Sin sección ni contenedor propio: para meterlo dentro de otra sección. */
  bare?: boolean;
};

const tiles = (list: CategoryTile[]) => list.map((c) => <CategoryCard key={c.slug} href={`/tienda/${c.slug}`} name={c.name} count={c.count} image={c.image} />);

/** Organism: cuadrícula de categorías (con un desplegable opcional para el resto). Dumb. */
export function CategoryGrid({ id, title, text, categories, more = [], tone = "light", bare }: Props) {
  if (categories.length === 0) return null;
  const body = (
    <>
      <h2 id={id} className={styles.title}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
      <div className={styles.grid}>{tiles(categories)}</div>
      {more.length > 0 && (
        <details className={styles.more}>
          <summary>Ver las {more.length} categorías restantes</summary>
          <div className={styles.grid}>{tiles(more)}</div>
        </details>
      )}
    </>
  );
  if (bare) return <div className={styles.bare} aria-labelledby={id}>{body}</div>;
  return (
    <section className={`${styles.section} ${styles[tone]}`} aria-labelledby={id}>
      <Container>{body}</Container>
    </section>
  );
}
