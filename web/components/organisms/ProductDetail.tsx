import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { ColorGallery } from "@/components/organisms/ColorGallery";
import styles from "./ProductDetail.module.css";

type Props = {
  slug: string;
  name: string;
  model: string;
  category: string;
  categoryHref: string;
  description: string | null;
  image: string | null;
  colors: { name: string; image: string | null; stock?: number }[];
  stock?: number;
  techniques: string[];
  specs: { label: string; value: string }[];
  priceLabel?: string;
  ctaHref: string;
  /** Texto propio de la ficha (SEO): título y párrafos. */
  copy?: { heading: string; paragraphs: string[] };
};

const STEPS = [
  { t: "Elige tu producto", d: "Dinos el modelo, la cantidad y los colores que te interesan." },
  { t: "Mándanos tu logo", d: "Lo revisamos y te enviamos una muestra digital para que la apruebes." },
  { t: "Lo personalizamos", d: "Producimos y te avisamos cuando tu pedido esté listo." },
];

/** Organism: ficha de producto (foto, colores, técnicas, especificaciones y botón de WhatsApp). */
export function ProductDetail({ slug, name, model, category, categoryHref, description, image, colors, stock, techniques, specs, priceLabel, ctaHref, copy }: Props) {
  return (
    <section className={styles.section} aria-labelledby="product-title">
      <Container>
        <nav aria-label="Ruta" className={styles.crumbs}>
          <Link href="/tienda">Tienda</Link> / <Link href={categoryHref}>{category}</Link> / <span aria-current="page">{name}</span>
        </nav>
        <ColorGallery
          slug={slug}
          model={model}
          category={category}
          whatsappHref={ctaHref}
          name={name}
          image={image}
          colors={colors}
          stock={stock}
          before={
            <>
              <span className={styles.category}>{category}</span>
              <h1 id="product-title" className={styles.title}>{name}</h1>
              <p className={styles.model}>Modelo {model}</p>
              {priceLabel && <p className={styles.price}>{priceLabel}</p>}
              {description && <p className={styles.description}>{description}</p>}
            </>
          }
          after={
            <>
              {techniques.length > 0 && (
                <div className={styles.block}>
                  <h2 className={styles.sub}>Lo personalizamos con</h2>
                  <ul className={styles.tags}>{techniques.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              )}
              {specs.length > 0 && (
                <dl className={styles.specs}>
                  {specs.map((s) => (
                    <div key={s.label}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </>
          }
        />

        {copy && (
          <div className={styles.copy}>
            <h2>{copy.heading}</h2>
            {copy.paragraphs.map((t) => <p key={t}>{t}</p>)}
          </div>
        )}

        <ol className={styles.steps} aria-label="Cómo funciona">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <span className={styles.num}>{i + 1}</span>
              <strong>{s.t}</strong>
              <span>{s.d}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
