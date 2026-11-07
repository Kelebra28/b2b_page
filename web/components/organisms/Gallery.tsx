import { Container } from "@/components/atoms/Container";
import { GallerySlider } from "@/components/molecules/GallerySlider";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { gallery as d } from "@/content/home";
import styles from "./Gallery.module.css";

/** Organism: galería de productos con filtros y carrusel. */
export function Gallery() {
  return (
    <section className={styles.section} id={d.sectionId} aria-labelledby={d.id}>
      <Container>
        <SectionHeading id={d.id} eyebrow={d.eyebrow} title={d.title} text={d.text} tone="dark" />
        <GallerySlider filters={d.filters} items={d.items} label="Filtrar galería por categoría" />
      </Container>
    </section>
  );
}
