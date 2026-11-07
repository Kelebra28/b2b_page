import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { LegalDocument } from "@/components/organisms/LegalDocument";
import type { LegalDoc } from "@/content/legal";

/** Template: página legal (header + documento + footer). */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
      <Header />
      <main id="main-content">
        <LegalDocument doc={doc} />
      </main>
      <Footer />
    </>
  );
}
