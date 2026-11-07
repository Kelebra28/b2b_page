import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Carousel } from "@/components/molecules/Carousel";
import { ProductCard } from "@/components/molecules/ProductCard";
import type { ProductItem } from "@/components/organisms/StoreBrowser";
import styles from "./RelatedProducts.module.css";

type Props = {
  title: string;
  products: Omit<ProductItem, "material" | "price">[];
  /** Enlace a la categoría completa y cuántos productos tiene (para "Ver todos"). */
  allHref: string;
  allCount: number;
};

/** Organism: carrusel "Más de este estilo" al final de la ficha: se desliza por todos los de la categoría. Dumb. */
export function RelatedProducts({ title, products, allHref, allCount }: Props) {
  if (products.length === 0) return null;
  return (
    <section className={styles.section} aria-labelledby="related-title">
      <Container>
        <div className={styles.head}>
          <h2 id="related-title" className={styles.title}>{title}</h2>
          <Link href={allHref} className={styles.all}>Ver todos ({allCount}) →</Link>
        </div>
        <Carousel label={title}>
          {[
            ...products.map((p) => {
              const { colorImages, image, ...card } = p;
              void colorImages;
              return <ProductCard key={p.slug} href={`/tienda/producto/${p.slug}`} image={image} {...card} />;
            }),
            <Link key="all" href={allHref} className={styles.allCard}>
              <span className={styles.allNum}>{allCount}</span>
              <span>Ver todos los productos de esta categoría</span>
              <span className={styles.allArrow} aria-hidden="true">→</span>
            </Link>,
          ]}
        </Carousel>
      </Container>
    </section>
  );
}
