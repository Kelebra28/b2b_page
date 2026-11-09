import type { Metadata } from "next";
import { JsonLd } from "@/components/atoms/JsonLd";
import { homeLd, siteUrl } from "@/content/site";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Hero } from "@/components/organisms/Hero";
import { TrustBar } from "@/components/organisms/TrustBar";
import { ProcessShowcase } from "@/components/organisms/ProcessShowcase";
import { SocialProof } from "@/components/organisms/SocialProof";
import { BusinessLines } from "@/components/organisms/BusinessLines";
import { LaserService } from "@/components/organisms/LaserService";
import { LiveEvents } from "@/components/organisms/LiveEvents";
import { Solutions } from "@/components/organisms/Solutions";
import { Capacity } from "@/components/organisms/Capacity";
import { Materials } from "@/components/organisms/Materials";
import { PlotterPromo } from "@/components/organisms/PlotterPromo";
import { UvPrinting } from "@/components/organisms/UvPrinting";
import { Boutique } from "@/components/organisms/Boutique";
import { Gallery } from "@/components/organisms/Gallery";
import { Directory } from "@/components/organisms/Directory";
import { WorkGrid } from "@/components/organisms/WorkGrid";
import { work } from "@/content/work";
import { Faqs } from "@/components/organisms/Faqs";
import { FinalCta } from "@/components/organisms/FinalCta";
import { faqs, finalCta } from "@/content/home";
import { Contact } from "@/components/organisms/Contact";

const title = "Maquila de Corte Láser y Publicidad Gran Formato en CDMX | Laser Inova";
const image = `${siteUrl}/og-laser-inova.png`;

export const metadata: Metadata = {
  title,
  description:
    "Maquila de corte láser (metal y acrílico), impresión cama plana UV y gran formato, grabado de precisión (cuero, vidrio, plástico) y regalos boutique en CDMX. Soluciones B2B y mayoreo.",
  keywords:
    "maquila de corte láser, corte de metal, impresión cama plana UV, grabado en cuero, grabado en plástico, grabado en vidrio, publicidad gran formato, regalos premium, Laser Inova",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Laser Inova",
    url: siteUrl,
    title,
    description: "Maquila de corte láser, impresión cama plana UV, grabado B2B y regalos premium en CDMX. Soluciones para empresas, agencias y eventos.",
    images: [{ url: image, width: 1200, height: 630, alt: "Laser Inova - Maquila de corte láser, impresión y soluciones corporativas en CDMX", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Soluciones para empresas, agencias, eventos y producción de volumen en CDMX. Maquila, impresión, branding y grabado corporativo.",
    images: [image],
  },
};

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <ProcessShowcase />
        <WorkGrid {...work} />
        <SocialProof />
        <BusinessLines />
        <LaserService />
        <LiveEvents />
        <Solutions />
        <Capacity />
        <Materials />
        <PlotterPromo />
        <UvPrinting />
        <Boutique />
        <Directory />
        <Gallery />
        <Faqs {...faqs} group="faq-home" more={{ label: "Ver todas las preguntas frecuentes", href: "/preguntas-frecuentes" }} />
        <FinalCta {...finalCta} />
        <Contact />
      </main>
      <Footer />
      <JsonLd data={homeLd} />
    </>
  );
}
