import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FloatingWhatsApp } from "@/components/atoms/FloatingWhatsApp";
import { getWhatsAppMessages } from "@/content/whatsapp";
import { whatsappNumber } from "@/content/site";
import { Analytics } from "@/components/atoms/Analytics";
import { CookieBanner } from "@/components/atoms/CookieBanner";
import { CartDrawer } from "@/components/organisms/CartDrawer";
import { HashScroll } from "@/components/atoms/HashScroll";
import "./tokens.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

/** En staging se define SITE_NOINDEX=1 para que Google no indexe la copia de pruebas. */
const noindex = process.env.SITE_NOINDEX === "1";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.laserinova.com"),
  title: "Laser Inova",
  description: "Maquila de corte láser y publicidad gran formato en CDMX",
  verification: { google: "xLexKAFDq-OGWO5uXmbzkCB-yAGpcjUXMTxzucvNEPU" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  ...(noindex ? { robots: { index: false, follow: false } } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={inter.variable}>
      <body>
        {children}
        {!noindex && <Analytics id="G-ET4MM9DNK0" />}
        <CartDrawer />
        <HashScroll />
        <CookieBanner />
        <FloatingWhatsApp label="¿Cotizamos tu proyecto?" number={whatsappNumber} messages={getWhatsAppMessages()} />
      </body>
    </html>
  );
}
