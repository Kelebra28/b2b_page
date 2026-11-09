import type { Cta, Hero, ServiceSection } from "@/content/services";
import { wa } from "@/content/site";

/** Contenido de /nosotros. Solo datos confirmados por el negocio: operación desde 2020, Azcapotzalco, horarios y entrega en 2 días hábiles. */
export const about: {
  path: string;
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: Hero;
  sections: ServiceSection[];
  cta: Cta;
} = {
  path: "/nosotros",
  meta: {
    title: "Nosotros | Maquila de corte láser e impresión en CDMX desde 2020 | Laser Inova",
    description:
      "Conoce a Laser Inova: taller de corte láser, grabado e impresión en Azcapotzalco, CDMX, desde 2020. Producción propia, entrega en 2 días hábiles y atención directa.",
    ogTitle: "Nosotros | Laser Inova, maquila láser e impresión en CDMX",
    ogDescription: "Taller propio en Azcapotzalco desde 2020: corte láser, grabado, impresión y regalos personalizados para empresas.",
  },
  hero: {
    eyebrow: "Nosotros · Desde 2020 · Azcapotzalco, CDMX",
    title: "Laser Inova: corte láser, grabado e impresión hechos en nuestro propio taller",
    text: [
      "Somos un taller de maquila en la Ciudad de México que trabaja con empresas, agencias y organizadores de eventos desde 2020. ",
      { strong: "Producimos todo en nuestras instalaciones" },
      " y entregamos en 2 días hábiles, con atención directa de principio a fin.",
    ],
    primary: { label: "Cotizar un proyecto", href: wa("Hola,%20quiero%20cotizar%20un%20proyecto%20con%20Laser%20Inova") },
    secondary: { label: "Ver servicios", href: "/#todos-los-servicios" },
    badges: ["Producción propia", "Entrega en 2 días hábiles", "Trabajos urgentes", "Atención directa"],
    card: { title: "Desde 2020", text: "Taller en Azcapotzalco, CDMX. Lunes a viernes de 9:00 a 19:00 y sábados de 11:00 a 17:00." },
    image: null,
  },
  sections: [
    {
      theme: "light",
      id: "quienes-somos",
      eyebrow: "Quiénes somos",
      title: "Un taller que produce para empresas, agencias y eventos",
      paragraphs: [
        "Laser Inova nació en 2020 en Azcapotzalco, Ciudad de México. Hacemos corte y grabado láser, impresión de cama plana UV, gran formato, señalética, displays y regalos personalizados para quienes necesitan resultados consistentes y tiempos claros.",
        "Trabajamos tanto proyectos de volumen para empresas y campañas como piezas especiales para regalos corporativos. Con archivo del cliente o con apoyo nuestro para prepararlo, cada pieza se produce y se revisa en nuestro taller.",
      ],
    },
    {
      theme: "alt",
      id: "por-que-elegirnos",
      eyebrow: "Por qué elegirnos",
      title: "Lo que nos distingue de otras maquilas",
      benefits: [
        { title: "Producción propia", text: "Cortamos, grabamos e imprimimos en nuestro taller, sin subcontratar. Tú hablas con quien produce tu pedido." },
        { title: "Entrega en 2 días hábiles", text: "Nuestro tiempo estándar es de 2 días hábiles. Al cotizar te confirmamos la fecha según volumen y material." },
        { title: "Trabajos urgentes", text: "Si tienes un evento o una fecha encima, revisamos contigo qué podemos hacer sin comprometer la calidad." },
        { title: "Atención directa y asesoría", text: "Trato con una persona, no solo con un bot. Te ayudamos a preparar el archivo y a elegir material y acabado." },
      ],
    },
    {
      theme: "dark",
      id: "que-hacemos",
      eyebrow: "Qué hacemos",
      title: "Cinco especialidades en un mismo taller",
      cards: [
        { title: "Corte y maquila", text: "Corte láser en metal, acrílico y madera, y maquila de volumen para empresas y agencias." },
        { title: "Grabado láser", text: "Grabado en metal, madera, espejos, cuero y plástico para personalizar piezas y regalos." },
        { title: "Impresión y gran formato", text: "Cama plana UV, plotter, lona y vinil para campañas, puntos de venta y rotulación." },
        { title: "Señalética y displays", text: "Señalética para oficinas e industria, y displays para eventos y exhibición." },
        { title: "Regalos y promocionales", text: "Promocionales, kits de bienvenida y regalos empresariales personalizados." },
      ],
    },
    {
      theme: "light",
      id: "como-trabajamos",
      eyebrow: "Cómo trabajamos",
      title: "Del primer mensaje a la entrega",
      cards: [
        { title: "Cotización", text: "Cuéntanos qué necesitas por WhatsApp, por el formulario o armando tu cotización en la tienda." },
        { title: "Validación", text: "Revisamos tu archivo o una muestra antes de producir el lote completo." },
        { title: "Producción", text: "Fabricamos tu pedido en nuestro taller con seguimiento claro desde la cotización." },
        { title: "Entrega", text: "Entregamos en 2 días hábiles, con entregas locales y coordinación de envíos." },
      ],
    },
    {
      theme: "alt",
      id: "visitanos",
      eyebrow: "Visítanos",
      title: "Nuestro taller en Azcapotzalco",
      paragraphs: ["Puedes visitarnos, escribirnos o llamarnos. Estos son nuestros datos."],
      features: [
        "Cuichapa 223, Colonia Petrolera, Azcapotzalco, 02480 Ciudad de México",
        "Lunes a viernes de 9:00 a 19:00",
        "Sábados de 11:00 a 17:00",
        "Teléfono y WhatsApp: +52 55 7939 8727",
        "Correo: informes@laserinova.com",
      ],
    },
  ],
  cta: {
    eyebrow: "Cotización",
    title: "¿Tienes un proyecto? Cuéntanos y te respondemos",
    text: "Escríbenos con el material, la cantidad y la fecha que necesitas. Si es urgente, dínoslo desde el primer mensaje.",
    primary: { label: "Hablar con Ventas Corporativas", href: wa("Hola,%20quiero%20cotizar%20un%20proyecto%20corporativo%20con%20Laser%20Inova") },
    secondary: { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  },
};
