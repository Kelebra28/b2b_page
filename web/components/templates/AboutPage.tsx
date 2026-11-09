import { Fragment } from "react";
import { JsonLd } from "@/components/atoms/JsonLd";
import { FinalCta } from "@/components/organisms/FinalCta";
import { Footer } from "@/components/organisms/Footer";
import { WorkGrid } from "@/components/organisms/WorkGrid";
import { work } from "@/content/work";
import { Header } from "@/components/organisms/Header";
import { ServiceHero } from "@/components/organisms/ServiceHero";
import { ServiceSection } from "@/components/organisms/ServiceSection";
import type { about } from "@/content/about";
import { localBusinessLd, siteUrl } from "@/content/site";

/** Template: página "Nosotros" (portada, secciones y CTA). Recibe todo por props. */
export function AboutPage({ page }: { page: typeof about }) {
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "AboutPage", name: page.meta.title, url: `${siteUrl}${page.path}`, about: { "@type": "LocalBusiness", name: "Laser Inova" } },
      localBusinessLd,
    ],
  };
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <ServiceHero hero={page.hero} />
        {page.sections.map((s, i) => (
          <Fragment key={s.id ?? i}>
            <ServiceSection section={s} index={i} />
            {i === 2 && <WorkGrid {...work} sectionId="trabajos-reales" />}
          </Fragment>
        ))}
        <FinalCta id="cta-final-title" {...page.cta} />
      </main>
      <Footer />
      <JsonLd data={ld} />
    </>
  );
}
