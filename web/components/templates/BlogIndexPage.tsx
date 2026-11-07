import { JsonLd } from "@/components/atoms/JsonLd";
import { FinalCta } from "@/components/organisms/FinalCta";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { PostGrid } from "@/components/organisms/PostGrid";
import { ServiceHero } from "@/components/organisms/ServiceHero";
import { ServiceSection } from "@/components/organisms/ServiceSection";
import type { BlogIndex } from "@/content/blog";
import { localBusinessLd, siteUrl } from "@/content/site";

/** Template: índice del blog (hero, introducción, listado de artículos y CTA). */
export function BlogIndexPage({ blog }: { blog: BlogIndex }) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: "Blog de Laser Inova",
        url: `${siteUrl}/blog`,
        description: "Artículos y contenido sobre corte láser, grabado, señalética, promocionales e impresión en CDMX.",
        publisher: { "@type": "Organization", name: "Laser Inova", logo: { "@type": "ImageObject", url: `${siteUrl}/inova_laser_og_ready.png` } },
      },
      localBusinessLd,
    ],
  };
  // Más recientes primero.
  const posts = [...blog.posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <ServiceHero hero={blog.hero} />
        {blog.sections.map((s, i) => (
          <ServiceSection key={i} section={s} index={i} />
        ))}
        <PostGrid id="articulos-title" sectionId={blog.postsHeading.id} eyebrow={blog.postsHeading.eyebrow} title={blog.postsHeading.title} text={blog.postsHeading.text} posts={posts} />
        {blog.cta && <FinalCta id="cta-final-title" {...blog.cta} />}
      </main>
      <Footer />
      <JsonLd data={ld} />
    </>
  );
}
