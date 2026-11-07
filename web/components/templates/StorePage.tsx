import { JsonLd } from "@/components/atoms/JsonLd";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { CategoryGrid, type CategoryTile } from "@/components/organisms/CategoryGrid";
import { StoreBrowser, type CategoryChip } from "@/components/organisms/StoreBrowser";
import { StoreHero } from "@/components/organisms/StoreHero";
import { localBusinessLd, siteUrl, wa } from "@/content/site";
import { safeImage, type Product } from "@/lib/catalog";
import { cleanName, formatMXN, techniqueLabels } from "@/lib/product-format";
import { colorImages, colorStock } from "@/lib/search-index";

type Props = { title: string; text: string; crumbs?: { label: string; href?: string }[]; path: string; categoryName: string; categoryNav: CategoryChip[]; activeSlug: string; others: CategoryTile[]; products: Product[] };

const priceLabel = (p: Product) => (p.priceFrom ? `Desde ${formatMXN(p.priceFrom)}` : undefined);

/** Template: listado de la tienda (todas las categorías o una). */
export function StorePage({ title, text, crumbs, path, categoryName, categoryNav, activeSlug, others, products }: Props) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: title,
        url: `${siteUrl}${path}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: products.slice(0, 30).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${siteUrl}/tienda/producto/${p.slug}`, name: p.name })),
        },
      },
      localBusinessLd,
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <StoreHero eyebrow="Tienda" title={title} text={text} crumbs={crumbs} />
        <StoreBrowser
          categoryNav={categoryNav}
          activeSlug={activeSlug}
          emptyText="Estamos preparando el catálogo. Mientras tanto, escríbenos por WhatsApp y te cotizamos."
          whatsappHref={wa(encodeURIComponent("Hola, busco un producto para personalizar con mi logotipo. ¿Me ayudan?"))}
          products={products.map((p) => {
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
              priceLabel: priceLabel(p),
            };
          })}
        />
        <CategoryGrid id="otras-categorias" title="Explora otras categorías" categories={others} tone="light" />
      </main>
      <Footer />
      <JsonLd data={ld} />
    </>
  );
}
