import { JsonLd } from "@/components/atoms/JsonLd";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { Faqs } from "@/components/organisms/Faqs";
import { FinalCta } from "@/components/organisms/FinalCta";
import { ServiceHero } from "@/components/organisms/ServiceHero";
import { ServiceSection } from "@/components/organisms/ServiceSection";
import type { Service } from "@/content/services";
import { localBusinessLd, siteUrl } from "@/content/site";

/** Template: estructura de una página de servicio. Recibe todo por props. */
export function ServicePage({ service }: { service: Service }) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessLd,
      ...(service.ld
        ? [{ "@type": "Service", ...service.ld, url: `${siteUrl}${service.path}`, provider: { "@type": "LocalBusiness", name: "Laser Inova" }, areaServed: { "@type": "City", name: "Ciudad de México" } }]
        : []),
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <ServiceHero hero={service.hero} />
        {service.sections.map((s, i) => (
          <ServiceSection key={i} section={s} index={i} />
        ))}
        <Faqs sectionId="faqs" id="faqs-title" group={`faq-${service.slug}`} {...service.faqs} more={{ label: "Ver todas las preguntas frecuentes", href: "/preguntas-frecuentes" }} />
        <FinalCta id="cta-final-title" {...service.cta} />
      </main>
      <Footer />
      <JsonLd data={ld} />
    </>
  );
}
