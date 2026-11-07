/**
 * Textos legales (borrador). Antes de publicar: confirmar razón social, domicilio y que el abogado revise el aviso.
 * Fuente única: los datos del responsable salen de aquí y de `site.ts`.
 */
import { site } from "@/content/site";

export const privacyRoute = "/aviso-de-privacidad";
export const cookiesRoute = "/politica-de-cookies";

export type LegalSection = { title: string; paragraphs?: string[]; items?: string[] };
export type LegalDoc = {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const owner = site.name; // TODO(confirmar): razón social o nombre completo de la persona física responsable.
const address = "Cuichapa 223, Colonia Petrolera, Alcaldía Azcapotzalco, C.P. 02480, Ciudad de México";
const email = site.email.label;

export const privacy: LegalDoc = {
  path: privacyRoute,
  title: "Aviso de privacidad",
  metaTitle: "Aviso de Privacidad | Laser Inova",
  description: "Cómo Laser Inova recaba, usa y protege tus datos personales, y cómo ejercer tus derechos ARCO.",
  updated: "6 de noviembre de 2026",
  intro: `En ${owner} respetamos tu privacidad. Este aviso explica qué datos personales tratamos cuando visitas laserinova.com, nos escribes o nos contactas por WhatsApp, para qué los usamos y cómo puedes ejercer tus derechos, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.`,
  sections: [
    {
      title: "1. Responsable del tratamiento",
      paragraphs: [
        `${owner}, con domicilio en ${address}, es responsable del tratamiento de tus datos personales.`,
        `Puedes contactarnos en ${email} o al teléfono ${site.phone.label}.`,
      ],
    },
    {
      title: "2. Datos personales que recabamos",
      items: [
        "Formulario de contacto: nombre o empresa, correo electrónico y el contenido de tu mensaje.",
        "WhatsApp: si nos escribes (a nuestro asistente automatizado o a nuestro equipo), tratamos tu número de teléfono, el nombre de tu perfil y el contenido de la conversación.",
        "Navegación: solo si aceptas las cookies de analítica, datos de uso del sitio como páginas visitadas, tipo de dispositivo y ubicación aproximada.",
      ],
      paragraphs: ["No recabamos datos personales sensibles ni datos financieros a través del sitio."],
    },
    {
      title: "3. Para qué usamos tus datos",
      paragraphs: ["Finalidades necesarias para atenderte:"],
      items: [
        "Responder tu solicitud y darle seguimiento.",
        "Elaborar y enviarte cotizaciones de tus proyectos.",
        "Contactarte sobre el servicio que solicitaste y, cuando se concrete una compra, gestionar su facturación y entrega.",
      ],
    },
    {
      title: "3.1 Finalidad adicional (opcional)",
      paragraphs: [
        "Elaborar estadísticas del uso del sitio para mejorar su contenido y funcionamiento. Solo se realiza si aceptas las cookies de analítica; si las rechazas, no se tratan tus datos de navegación con esta finalidad y tu solicitud se atiende igual.",
      ],
    },
    {
      title: "4. Con quién compartimos tus datos",
      paragraphs: [
        "No vendemos ni cedemos tus datos personales. Para operar el sitio y atenderte nos apoyamos en proveedores que los tratan por nuestra cuenta:",
      ],
      items: [
        "Vercel: alojamiento del sitio web.",
        "Resend: envío del correo con tu solicitud de contacto.",
        "Meta (WhatsApp): conversaciones que inicies por WhatsApp.",
        "Google: Google Analytics (solo con tu consentimiento) y Google Maps (mapa de ubicación).",
      ],
    },
    {
      title: "5. Conservación",
      paragraphs: [
        "Conservamos tus datos durante el tiempo necesario para atender tu solicitud y cumplir obligaciones legales o fiscales aplicables. Después los eliminamos o los dejamos de tratar.",
      ],
    },
    {
      title: "6. Tus derechos (ARCO) y revocación",
      paragraphs: [
        "Tienes derecho a acceder a tus datos, rectificarlos si son inexactos, cancelarlos u oponerte a su tratamiento, así como a revocar tu consentimiento o limitar el uso de tus datos.",
        `Para ejercerlos escribe a ${email} con el asunto «Derechos ARCO» e incluye: tu nombre, un medio para responderte, la descripción clara de lo que solicitas y un documento que acredite tu identidad. Te responderemos en un máximo de 20 días hábiles a partir de que recibamos tu solicitud.`,
      ],
    },
    {
      title: "7. Seguridad",
      paragraphs: [
        "Aplicamos medidas administrativas, técnicas y físicas razonables para proteger tus datos, como conexión cifrada (HTTPS) y acceso restringido a la información.",
      ],
    },
    {
      title: "8. Cookies",
      paragraphs: ["Información sobre las cookies y tecnologías similares que usamos en nuestra Política de cookies."],
    },
    {
      title: "9. Cambios a este aviso",
      paragraphs: ["Si este aviso cambia, publicaremos la versión actualizada en esta página con su fecha de actualización."],
    },
  ],
};

export const cookies: LegalDoc = {
  path: cookiesRoute,
  title: "Política de cookies",
  metaTitle: "Política de Cookies | Laser Inova",
  description: "Qué cookies y tecnologías similares usa laserinova.com y cómo aceptarlas, rechazarlas o cambiar tu elección.",
  updated: "6 de noviembre de 2026",
  intro:
    "Las cookies son pequeños archivos que un sitio guarda en tu navegador. Usamos las mínimas necesarias y solo activamos las de analítica si tú lo aceptas.",
  sections: [
    {
      title: "Qué usamos",
      items: [
        "Tu elección sobre cookies (almacenamiento local «laserinova-consent»): necesaria. Solo recuerda si aceptaste o rechazaste la analítica. No contiene datos personales.",
        "Google Analytics 4 («_ga» y «_ga_…», hasta 2 años): analítica. Nos dice qué páginas se visitan para mejorar el sitio. Solo se activa si aceptas.",
      ],
    },
    {
      title: "Contenido de terceros",
      paragraphs: [
        "El mapa de ubicación proviene de Google Maps y, al cargarse, Google puede establecer sus propias cookies. Algunos artículos del blog muestran fotos alojadas en Unsplash, y los botones de WhatsApp te llevan a WhatsApp. Estos servicios tienen sus propias políticas de privacidad.",
      ],
    },
    {
      title: "Cómo cambiar tu elección",
      paragraphs: [
        "Puedes cambiar tu decisión en cualquier momento con el botón «Preferencias de cookies» del pie de página. Si ya aceptaste y luego rechazas, dejamos de enviar datos de analítica y eliminamos las cookies de Google Analytics de este sitio.",
        "También puedes borrar o bloquear cookies desde la configuración de tu navegador; algunas funciones de terceros podrían dejar de mostrarse.",
      ],
    },
    {
      title: "Más información",
      paragraphs: [`Para saber cómo tratamos tus datos personales consulta el Aviso de privacidad, o escríbenos a ${email}.`],
    },
  ],
};
