import { JsonLd } from "@/components/atoms/JsonLd";
import { Faqs } from "@/components/organisms/Faqs";
import { FinalCta } from "@/components/organisms/FinalCta";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { ServiceHero } from "@/components/organisms/ServiceHero";
import type { faqPage } from "@/content/faq-page";
import { localBusinessLd, siteUrl } from "@/content/site";

/** Template: página de preguntas frecuentes (portada, un bloque por tema, CTA y datos estructurados FAQPage). */
export function FaqPage({ page }: { page: typeof faqPage }) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        url: `${siteUrl}${page.path}`,
        mainEntity: page.groups.flatMap((g) => g.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
      localBusinessLd,
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <ServiceHero hero={page.hero} />
        {page.groups.map((g) => (
          <Faqs key={g.id} sectionId={g.id} id={`${g.id}-title`} group={`faq-${g.id}`} eyebrow={g.eyebrow} title={g.title} items={g.items} />
        ))}
        <FinalCta id="cta-final-title" {...page.cta} />
      </main>
      <Footer />
      <JsonLd data={ld} />
    </>
  );
}
