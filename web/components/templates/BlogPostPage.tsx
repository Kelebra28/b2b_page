import { JsonLd } from "@/components/atoms/JsonLd";
import { ArticleBody } from "@/components/organisms/ArticleBody";
import { Faqs } from "@/components/organisms/Faqs";
import { FinalCta } from "@/components/organisms/FinalCta";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { ServiceHero } from "@/components/organisms/ServiceHero";
import { ServiceSection } from "@/components/organisms/ServiceSection";
import type { BlogPost } from "@/content/blog";

/**
 * Template: artículo del blog. Si el post trae `article` (formato editorial) se muestra como artículo;
 * si no, usa el formato anterior (hero + secciones de servicio) hasta que se migre.
 */
export function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        {post.article ? (
          <ArticleBody article={post.article} />
        ) : (
          <>
            <ServiceHero hero={post.hero} />
            {post.sections.map((s, i) => (
              <ServiceSection key={i} section={s} index={i} />
            ))}
          </>
        )}
        {post.faqs && <Faqs sectionId="faqs" id="faqs-title" group={`faq-${post.slug}`} {...post.faqs} />}
        {post.cta && <FinalCta id="cta-final-title" {...post.cta} />}
      </main>
      <Footer />
      {post.ld && <JsonLd data={post.ld} />}
    </>
  );
}
