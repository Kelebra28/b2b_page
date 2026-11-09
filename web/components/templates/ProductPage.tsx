import { JsonLd } from "@/components/atoms/JsonLd";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { ProductDetail } from "@/components/organisms/ProductDetail";
import { RelatedProducts } from "@/components/organisms/RelatedProducts";
import { localBusinessLd, siteUrl, wa } from "@/content/site";
import { safeImage, type Product } from "@/lib/catalog";
import { cleanName, formatMXN, techniqueLabels } from "@/lib/product-format";
import { productCopy } from "@/lib/product-copy";

/** Template: ficha de producto. El botón abre WhatsApp con el producto ya escrito. */
export function ProductPage({ product: p, related = [], categoryTotal = 0 }: { product: Product; related?: Product[]; categoryTotal?: number }) {
  const { title, model } = cleanName(p.name, p.model);
  const image = safeImage(p.images[0]);
  const url = `${siteUrl}/tienda/producto/${p.slug}`;
  const specs = [
    { label: "Modelo", value: p.model },
    p.brand && { label: "Marca", value: p.brand },
    p.material && { label: "Material", value: p.material },
    p.measurements && { label: "Medidas", value: p.measurements },
  ].filter(Boolean) as { label: string; value: string }[];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: title,
        description: p.description ?? undefined,
        sku: p.model,
        mpn: p.model,
        category: p.category.name,
        brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
        image: image ?? undefined,
        url,
        offers: p.priceFrom
          ? { "@type": "Offer", priceCurrency: "MXN", price: p.priceFrom, availability: "https://schema.org/InStock", url }
          : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Tienda", item: `${siteUrl}/tienda` },
          { "@type": "ListItem", position: 2, name: p.category.name, item: `${siteUrl}/tienda/${p.category.slug}` },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      },
      localBusinessLd,
    ],
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <ProductDetail
          slug={p.slug}
          name={title}
          model={model}
          categoryHref={`/tienda/${p.category.slug}`}
          techniques={techniqueLabels(p.printTechniques)}
          category={p.category.name}
          description={p.description}
          image={image}
          colors={p.colors.map((c) => ({ name: c.name, image: safeImage(c.image), stock: c.stock }))}
          stock={p.stock}
          specs={specs}
          copy={productCopy({ slug: p.slug, title, category: p.category.name, material: p.material, measurements: p.measurements, techniques: techniqueLabels(p.printTechniques) })}
          priceLabel={p.priceFrom ? `Desde ${formatMXN(p.priceFrom)}` : undefined}
          ctaHref={wa(encodeURIComponent(`Hola, quiero cotizar: ${title} (modelo ${model}). ¿Me ayudas con precio y tiempos de entrega?`))}
        />
        <RelatedProducts
          title={`Más ${p.category.name.toLowerCase()} para personalizar`}
          allHref={`/tienda/${p.category.slug}`}
          allCount={categoryTotal || related.length + 1}
          products={related.map((r) => {
            const c = cleanName(r.name, r.model);
            return {
              slug: r.slug,
              name: c.title,
              model: c.model,
              category: r.category.name,
              colors: r.colors.map((x) => x.name),
              techniques: techniqueLabels(r.printTechniques),
              image: safeImage(r.images[0]),
              priceLabel: r.priceFrom ? `Desde ${formatMXN(r.priceFrom)}` : undefined,
            };
          })}
        />
      </main>
      <Footer />
      <JsonLd data={ld} />
    </>
  );
}
