import { faqs as homeFaqs } from "@/content/home";
import type { Cta, Hero } from "@/content/services";
import { wa } from "@/content/site";

type QA = { q: string; a: string };
const fromHome = (q: string): QA => {
  const item = homeFaqs.items.find((f) => f.q === q);
  if (!item) throw new Error(`FAQ de la home no encontrada: ${q}`);
  return item;
};

/** Contenido de /preguntas-frecuentes. Las respuestas salen de datos ya publicados en el sitio o confirmados por el negocio. */
export const faqPage: {
  path: string;
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: Hero;
  groups: { id: string; eyebrow: string; title: string; items: QA[] }[];
  cta: Cta;
} = {
  path: "/preguntas-frecuentes",
  meta: {
    title: "Preguntas frecuentes | Corte láser, grabado e impresión en CDMX | Laser Inova",
    description:
      "Resuelve tus dudas sobre cotizaciones, mayoreo, tiempos de entrega (2 días hábiles), trabajos urgentes, materiales, archivos y ubicación de Laser Inova en CDMX.",
    ogTitle: "Preguntas frecuentes | Laser Inova",
    ogDescription: "Cotizaciones, mayoreo, entregas en 2 días hábiles, trabajos urgentes, materiales y horarios de Laser Inova.",
  },
  hero: {
    eyebrow: "Preguntas frecuentes",
    title: "Preguntas frecuentes sobre corte láser, grabado e impresión en CDMX",
    text: "Respuestas rápidas sobre cotizaciones, mayoreo, tiempos de entrega, materiales y cómo trabajamos. Si no encuentras la tuya, escríbenos.",
    primary: { label: "Preguntar por WhatsApp", href: wa("Hola,%20tengo%20una%20duda%20sobre%20un%20proyecto") },
    secondary: { label: "Ver servicios", href: "/#todos-los-servicios" },
    badges: [],
    card: { title: "Entrega en 2 días hábiles", text: "También atendemos trabajos urgentes. Lunes a viernes de 9:00 a 19:00 y sábados de 11:00 a 17:00." },
    image: null,
  },
  groups: [
    {
      id: "cotizacion",
      eyebrow: "Cotización y pedidos",
      title: "Cómo cotizar y cuánto pedir",
      items: [
        {
          q: "¿Cómo solicito una cotización?",
          a: "Escríbenos por WhatsApp, llena el formulario de contacto o arma tu cotización en la tienda agregando productos y enviando la solicitud. Ventas te da seguimiento con el detalle y la fecha.",
        },
        fromHome("¿Manejan mayoreo y producción de volumen?"),
        {
          q: "¿Desde cuántas piezas trabajan?",
          a: "En maquila atendemos desde lotes cortos de 100 piezas hasta proyectos de volumen. Para pedidos más pequeños tenemos nuestra línea boutique de regalos personalizados.",
        },
        fromHome("¿Pueden facturar?"),
      ],
    },
    {
      id: "tiempos",
      eyebrow: "Tiempos de entrega",
      title: "Entregas y trabajos urgentes",
      items: [
        {
          q: "¿Cuánto tarda la entrega?",
          a: "Nuestro tiempo de entrega estándar es de 2 días hábiles. Al cotizar te confirmamos la fecha exacta según el volumen, el material y la complejidad.",
        },
        {
          q: "¿Hacen trabajos urgentes?",
          a: "Sí. Si tu proyecto es urgente o tienes una fecha de evento, avísanos desde el primer mensaje y revisamos tiempos reales para no comprometer la calidad.",
        },
        {
          q: "¿Hacen envíos o instalación?",
          a: "Hacemos entregas locales y coordinamos envíos. En proyectos de gran formato ofrecemos instalación en CDMX y Estado de México.",
        },
      ],
    },
    {
      id: "materiales",
      eyebrow: "Materiales y archivos",
      title: "Qué trabajamos y cómo preparar tu archivo",
      items: [
        {
          q: "¿Qué materiales trabajan?",
          a: "Acrílico, MDF y madera, metal, plásticos (PETG, PVC y estireno), cuero y piel sintética, espejo y vidrio, vinil y lona. Según el servicio: corte láser, grabado, impresión UV o gran formato.",
        },
        {
          q: "¿Hasta qué grosor cortan acrílico?",
          a: "Cortamos acrílico de hasta 12 mm, para señalética, displays y piezas técnicas.",
        },
        {
          q: "¿Qué archivo necesito para producir?",
          a: "Para corte y grabado trabajamos planos vectoriales (DXF, AI o PDF). Si no tienes el archivo listo, te ayudamos a prepararlo para producción.",
        },
        fromHome("¿Trabajan con archivos o productos del cliente?"),
        fromHome("¿También hacen regalos personalizados?"),
      ],
    },
    {
      id: "ubicacion",
      eyebrow: "Ubicación y horario",
      title: "Dónde estamos y cuándo atendemos",
      items: [
        {
          q: "¿Dónde están ubicados?",
          a: "Nuestro taller está en Cuichapa 223, Colonia Petrolera, Azcapotzalco, 02480 Ciudad de México.",
        },
        {
          q: "¿Cuál es su horario de atención?",
          a: "Lunes a viernes de 9:00 a 19:00 y sábados de 11:00 a 17:00.",
        },
      ],
    },
  ],
  cta: {
    eyebrow: "¿Sigues con dudas?",
    title: "Cuéntanos tu proyecto y te respondemos",
    text: "Escríbenos con el material, la cantidad y la fecha que necesitas.",
    primary: { label: "Hablar con Ventas Corporativas", href: wa("Hola,%20quiero%20cotizar%20un%20proyecto%20corporativo%20con%20Laser%20Inova") },
    secondary: { label: "Conocer Laser Inova", href: "/nosotros" },
  },
};
