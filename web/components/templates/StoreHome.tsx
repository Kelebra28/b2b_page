import { JsonLd } from "@/components/atoms/JsonLd";
import { CategoryGrid, type CategoryTile } from "@/components/organisms/CategoryGrid";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { StoreBrowser } from "@/components/organisms/StoreBrowser";
import { StoreHero } from "@/components/organisms/StoreHero";
import { localBusinessLd, siteUrl, wa } from "@/content/site";
import { safeImage, type Product } from "@/lib/catalog";
import { cleanName, formatMXN, techniqueLabels } from "@/lib/product-format";
import { colorImages, colorStock } from "@/lib/search-index";

type Props = { categories: CategoryTile[]; initial: Product[]; total: number };

/** Cuántas categorías se ven grandes en la portada; el resto va en un desplegable. */
const TOP = 12;

/** Template: portada de la tienda = catálogo vivo (búsqueda fija arriba, categorías populares y productos a la vista). */
export function StoreHome({ categories, initial, total }: Props) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Tienda de productos promocionales personalizados",
        url: `${siteUrl}/tienda`,
        mainEntity: { "@type": "ItemList", itemListElement: categories.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${siteUrl}/tienda/${c.slug}`, name: c.name })) },
      },
      localBusinessLd,
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <StoreHero
          eyebrow="Tienda"
          title="Productos para personalizar"
          text={`Más de ${Math.floor(total / 50) * 50} productos listos para llevar tu logotipo: grabado láser, impresión UV o serigrafía. Cotiza por WhatsApp.`}
        />
        <StoreBrowser
          loadAll
          gridTitle="Para empezar"
          suggestions={["Termos", "Mochilas", "Bolígrafos", "Libretas", "Tazas", "Gorras"]}
          emptyText="Estamos preparando el catálogo. Mientras tanto, escríbenos por WhatsApp y te cotizamos."
          whatsappHref={wa(encodeURIComponent("Hola, busco un producto para personalizar con mi logotipo. ¿Me ayudan?"))}
          above={<CategoryGrid bare id="categorias" title="Explora por categoría" categories={categories.slice(0, TOP)} more={categories.slice(TOP)} />}
          products={initial.map((p) => {
            const { title, model } = cleanName(p.name, p.model);
            return {
              slug: p.slug,
              name: title,
              model,
              category: p.category.name,
              material: p.material,
              colors: p.colors.map((c) => c.name),
              colorImages: colorImages(p),
              stock: p.stock,
              colorStock: colorStock(p),
              techniques: techniqueLabels(p.printTechniques),
              image: safeImage(p.images[0]),
              price: p.priceFrom,
              priceLabel: p.priceFrom ? `Desde ${formatMXN(p.priceFrom)}` : undefined,
            };
          })}
        />
      </main>
      <Footer />
      <JsonLd data={ld} />
    </>
  );
}
