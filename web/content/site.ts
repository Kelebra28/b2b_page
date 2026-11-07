/** Datos de contacto del negocio (fuente única para footer, contacto y schema). */
export const site = {
  name: "Laser Inova",
  tagline:
    "Maquila, grabado corporativo, publicidad gran formato y regalos personalizados en CDMX.",
  phone: { label: "+52 55 7939 8727", href: "tel:+525579398727" },
  email: { label: "informes@laserinova.com", href: "mailto:informes@laserinova.com" },
  location: "Azcapotzalco, CDMX",
  year: 2026,
};

export const siteUrl = "https://www.laserinova.com";

/**
 * Número al que apuntan TODOS los botones de WhatsApp (el bot de ventas).
 * Se puede cambiar sin tocar código con NEXT_PUBLIC_WHATSAPP_NUMBER (p. ej. para volver a 525579398727).
 * El teléfono oficial para llamadas, JSON-LD y Google Business Profile es `site.phone`.
 */
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "525544730004";

/** Enlace de WhatsApp con mensaje precargado (el texto ya viene codificado para URL). */
export const wa = (text: string) => `https://wa.me/${whatsappNumber}?text=${text}`;

/** Cambia el número de cualquier enlace wa.me por el configurado (para contenido en JSON). */
export const toWhatsApp = (href: string) => href.replace(/^(https:\/\/wa\.me\/)\d+/, `$1${whatsappNumber}`);

/** JSON-LD del negocio (el teléfono ahora coincide con el visible: +52 55 7939 8727). */
export const localBusinessLd = {
  "@type": "LocalBusiness",
  name: "Laser Inova",
  image: `${siteUrl}/inova_laser_og_ready.png`,
  url: siteUrl,
  telephone: "+52 55 7939 8727",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cuichapa 223",
    addressLocality: "Ciudad de México",
    addressRegion: "CDMX",
    postalCode: "02480",
    addressCountry: "MX",
  },
  geo: { "@type": "GeoCoordinates", latitude: 19.491835, longitude: -99.191547 },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "11:00", closes: "17:00" },
  ],
  priceRange: "$$",
  sameAs: ["https://www.instagram.com/laserinova23"],
};

/** JSON-LD de la home: negocio + servicio principal (igual que el sitio anterior). */
export const homeLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...localBusinessLd,
      description:
        "Maquila de corte láser, publicidad gran formato, grabado corporativo y regalos personalizados en CDMX para empresas, eventos y proyectos especiales.",
    },
    {
      "@type": "Service",
      name: "Maquila de corte láser y publicidad gran formato",
      serviceType: "Maquila de corte láser, impresión y soluciones visuales para empresas",
      provider: { "@type": "LocalBusiness", name: "Laser Inova" },
      areaServed: { "@type": "City", name: "Ciudad de México" },
      description:
        "Soluciones para empresas, agencias, eventos y producción de volumen en corte láser, impresión, branding y grabado corporativo.",
    },
  ],
};
