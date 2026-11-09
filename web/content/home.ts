/** Contenido de la home. Los textos conservan los de laserinova.com (SEO). */
import { wa, whatsappBot, whatsappPerson } from "@/content/site";
import type { IconName } from "@/components/atoms/Icon";

export type RichText = Array<string | { strong: string } | { em: string }>;

export const hero = {
  eyebrow: "Maquila · Mayoreo · Empresas · CDMX",
  /** `highlight` se resalta con el subrayado láser; el texto completo del h1 no cambia. */
  title: "Maquila de Corte Láser y Publicidad Gran Formato en CDMX",
  highlight: "Corte Láser",
  text: [
    "Producción de volumen para ",
    { strong: "empresas, agencias y eventos" },
    ", con ",
    { strong: "corte y grabado láser, impresión UV y gran formato" },
    " hechos en nuestro propio taller de Azcapotzalco.",
  ] as RichText,
  primary: {
    label: "Cotizar por WhatsApp",
    href: wa("Hola,%20quiero%20una%20cotizaci%C3%B3n%20corporativa%20o%20de%20mayoreo"),
  },
  secondary: { label: "Ver regalos personalizados", href: "/#boutique" },
  badges: [
    { icon: "truck", label: "Entrega en 2 días hábiles" },
    { icon: "factory", label: "Producción propia" },
    { icon: "invoice", label: "Facturación" },
  ] as { icon: IconName; label: string }[],
  tags: ["Maquila y producción", "Plotter e impresión", "Grabado corporativo"],
};

export const trust = {
  label: "Indicadores de confianza",
  items: [
    {
      icon: "factory",
      title: "Capacidad Masiva",
      text: "De 100 a 10,000+ piezas para proyectos corporativos y campañas.",
    },
    {
      icon: "truck",
      title: "Entregas Express",
      text: "Operación pensada para cumplir tiempos de entrega y fechas de evento.",
    },
    {
      icon: "tag",
      title: "Precios de Maquila",
      text: "Costos competitivos para mayoreo, repetición de pedidos y volumen.",
    },
  ] as { icon: IconName; title: string; text: string }[],
};

export const process = {
  label: "Tecnología de Producción Inova",
  eyebrow: "Nuestra Planta Industrial",
  title: "Procesos de Producción en Tiempo Real",
  text: "Experimenta de forma interactiva la precisión y velocidad de nuestras principales tecnologías de maquila e impresión.",
  items: [
    { kind: "laser", title: "Corte Láser CNC", detail: "Acrílico y Madera" },
    { kind: "engrave", title: "Grabado de Precisión", detail: "Termos y Artículos" },
    { kind: "uv", title: "Impresión UV Plana", detail: "Maquila Rígida y Relieve" },
    { kind: "plotter", title: "Plotter Gran Formato", detail: "Viniles, Lona y Campañas" },
  ] as { kind: "laser" | "engrave" | "uv" | "plotter"; title: string; detail: string }[],
};

export const socialProof = {
  id: "social-proof-title",
  eyebrow: "Confianza B2B",
  title: "Empresas e industrias que confían en nosotros",
  text: [
    "Trabajamos con proyectos para ",
    { strong: "agencias de publicidad, despachos de arquitectura, restaurantes, oficinas, marcas, eventos y compras corporativas" },
    ".",
  ] as RichText,
  industries: [
    "Agencias de Publicidad",
    "Oficinas y RH",
    "Restaurantes",
    "Eventos Corporativos",
    "Marcas y Retail",
    "Despachos de Arquitectura",
  ],
  testimonials: [
    {
      quote:
        "Nos ayudaron con un proyecto de producción para evento. Cumplieron con los tiempos de entrega y el seguimiento fue muy claro desde la cotización.",
      author: "Cliente corporativo",
    },
    {
      quote:
        "La atención fue formal, hubo respuesta rápida y nos apoyaron con facturación y validación antes de producir el lote completo.",
      author: "Proyecto empresarial",
    },
    {
      quote:
        "Tienen muy buena capacidad para resolver piezas personalizadas y materiales para branding con calidad constante.",
      author: "Cliente de volumen",
    },
  ],
};

export const businessLines = {
  id: "negocios-title",
  eyebrow: "Líneas de negocio",
  title: "Servicios principales de Laser Inova",
  // Texto reescrito: el original traía una nota interna ("...que ya te genera flujo").
  text: [
    "Nos especializamos en ",
    { strong: "maquila, producción de volumen e impresión" },
    ", y mantenemos una línea boutique de regalos personalizados para pedidos más pequeños.",
  ] as RichText,
  items: [
    {
      icon: "factory",
      title: "Maquila de Volumen",
      text: "Producción repetible para MDF, acrílico, madera y piezas para empresas o proyectos especiales.",
      link: { label: "Ver corte láser", href: "/subpages/maquila_volumen.html" },
      featured: true,
    },
    {
      icon: "printer",
      title: "Plotter e Impresión",
      text: "Lonas, materiales visuales, branding para eventos y proyectos de publicidad gran formato.",
      link: { label: "Ver soluciones de impresión", href: "/subpages/plotter_impresion.html" },
      featured: true,
    },
    {
      icon: "building",
      title: "Grabado Corporativo",
      text: "Termos, plumas, carpetas, kits y artículos promocionales para empresas y áreas de RH.",
      link: { label: "Ver grabado corporativo", href: "/subpages/promocionales_premium.html" },
      featured: true,
    },
    {
      icon: "sign",
      title: "Señalética y Acrílico",
      text: "Placas, letreros, exhibidores y elementos de identidad visual para oficinas y puntos de venta.",
      link: { label: "Ver señalética", href: "/subpages/senaletica_oficinas.html" },
    },
    {
      icon: "medal",
      title: "Placas y Reconocimientos",
      text: "Soluciones institucionales para premiaciones, entregas, eventos y branding premium.",
      link: { label: "Ver reconocimientos", href: "/subpages/senaletica_oficinas.html" },
    },
    {
      icon: "gift",
      title: "Línea Boutique",
      text: "Regalos personalizados, espejos grabados, madera y piezas especiales con acabados premium.",
      link: { label: "Ver regalos personalizados", href: "/#boutique" },
    },
  ] as {
    icon: IconName;
    title: string;
    text: string;
    link: { label: string; href: string };
    featured?: boolean;
  }[],
};

export const laserService = {
  sectionId: "maquila-corte-laser",
  id: "laser-section-title",
  eyebrow: "Maquila Industrial",
  title: "Corte y Grabado Láser de Precisión",
  text: [
    "Ofrecemos servicio de maquila por volumen con tecnología CNC avanzada. Cortamos y grabamos con absoluta precisión sobre ",
    { strong: "MDF, Madera, Acrílico, Cuero, Cartón y plásticos seleccionados" },
    ". Diseñado para proyectos arquitectónicos, piezas de ingeniería, maquetas, exhibidores y producción industrial repetible.",
  ] as RichText,
  features: [
    "Precisión milimétrica de corte y grabado limpio",
    "Capacidad para planos complejos en vectores (DXF, AI, PDF)",
    "Aprovechamiento máximo de material para reducir costos",
    "Entrega rápida en lotes medianos y grandes maquilas",
  ],
  primary: {
    label: "Cotizar Corte Láser",
    href: wa("Hola,%20busco%20cotizar%20un%20proyecto%20de%20corte%20y%20grabado%20laser"),
  },
  secondary: { label: "Soluciones de Maquila", href: "/subpages/maquila_volumen.html" },
  callouts: ["Corte en Acrílico y Madera", "Tolerancia de 0.1mm"],
};

export const liveEvents = {
  sectionId: "eventos-vivo",
  id: "eventos-vivo-title",
  eyebrow: "Eventos · Activaciones · Experiencia en vivo",
  title: "Grabado en vivo para eventos, activaciones y experiencias de marca",
  text: [
    "Llevamos la personalización a tu evento con ",
    { strong: "grabado en vivo, activaciones corporativas y experiencias memorables para asistentes, clientes o colaboradores" },
    ". Ideal para marcas, lanzamientos, ferias, congresos, bodas premium y eventos empresariales.",
  ] as RichText,
  features: [
    "Personalización en tiempo real frente al público",
    "Activaciones para marcas, expos y eventos corporativos",
    "Grabado de termos, plumas, placas y productos premium",
    "Experiencia diferenciada para stands, lanzamientos y RH",
  ],
  primary: {
    label: "Cotizar activación en vivo",
    href: wa("Hola,%20quiero%20cotizar%20un%20evento%20con%20grabado%20en%20vivo"),
  },
  // El original decía "Ver mas": ahora describe el destino.
  secondary: { label: "Ver producción para agencias", href: "/subpages/produccion_agencias.html" },
  badge: "Experiencia en vivo",
  cards: [
    { title: "En sitio", text: "Montaje para eventos y activaciones" },
    { title: "Branding", text: "Experiencias memorables para marcas" },
    { title: "Premium", text: "Personalización frente al cliente" },
  ],
};

export const solutions = {
  sectionId: "soluciones",
  id: "soluciones-title",
  eyebrow: "Soluciones para empresas",
  title: "Aplicaciones reales para clientes B2B",
  // Texto reescrito: el original era una nota interna ("el objetivo no es solo vender servicios...").
  text: "Estos son algunos de los proyectos que resolvemos con más frecuencia para empresas, agencias y áreas de recursos humanos.",
  items: [
    {
      icon: "boxes",
      title: "Kits de bienvenida",
      text: "Termos, plumas, folders, placas y artículos corporativos personalizados para RH y onboarding.",
      link: { label: "Explorar kits corporativos", href: "/subpages/kits_bienvenida.html" },
    },
    {
      icon: "sign",
      title: "Señalética para oficinas",
      text: "Placas en acrílico, señalización interior, nombres de sala, branding y displays.",
      link: { label: "Ver señalética en acrílico", href: "/subpages/senaletica_oficinas.html" },
    },
    {
      icon: "factory",
      title: "Producción para agencias",
      text: "Soporte de fabricación para campañas, activaciones, eventos, branding visual y lotes especiales.",
      link: { label: "Ver maquila de corte láser", href: "/subpages/produccion_agencias.html" },
    },
    {
      icon: "gem",
      title: "Promocionales premium",
      text: "Grabado en metal y personalización para termos, botellas, placas y artículos de alto impacto.",
      link: { label: "Ver promocionales premium", href: "/subpages/promocionales_premium.html" },
    },
    {
      icon: "display",
      title: "Displays y materiales visuales",
      text: "Piezas en MDF y acrílico para retail, exhibición, material POP y proyectos especiales.",
      link: { label: "Ver materiales visuales", href: "/subpages/displays_materiales_visuales.html" },
    },
    {
      icon: "gift",
      title: "Regalos empresariales y detalles premium",
      text: "Soluciones boutique para fechas especiales, branding fino y regalos de alto valor percibido.",
      link: { label: "Ver regalos empresariales", href: "/subpages/regalos_empresariales.html" },
    },
  ] as {
    icon: IconName;
    title: string;
    text: string;
    link: { label: string; href: string };
  }[],
};

export const capacity = {
  id: "capacidad-title",
  eyebrow: "Capacidad operativa",
  title: "Un proveedor pensado para producción, no solo para una pieza suelta",
  // Texto reescrito: el original comenzaba con una nota interna ("Tu nuevo home debe transmitir que...").
  text: [
    "Laser Inova opera como proveedor de producción: ",
    { strong: "facturación, lotes, validación previa, trabajo con archivos del cliente, seguimiento comercial y tiempos definidos" },
    ".",
  ] as RichText,
  features: [
    "Producción por volumen y tirajes medianos",
    "Validación de archivo o muestra antes del lote",
    "Trabajo con materiales y productos del cliente",
    "Atención para campañas, eventos y compras corporativas",
    "Entregas locales y coordinación de envíos",
  ],
  stats: [
    { icon: "boxes", value: "100+", label: "Piezas desde lotes cortos" },
    { icon: "factory", value: "10k+", label: "Capacidad en proyectos de volumen" },
    { icon: "bolt", value: "24-48h", label: "En proyectos urgentes seleccionados" },
    { icon: "briefcase", value: "B2B", label: "Atención a empresas, agencias y eventos" },
  ] as { icon: IconName; value: string; label: string }[],
};

export const materials = {
  id: "materiales-title",
  eyebrow: "Materiales y procesos",
  title: "Capacidades técnicas para proyectos de diseño, ingeniería y branding",
  groups: [
    {
      title: "Materiales",
      items: ["Acrílico", "MDF y Madera", "Metal", "Plástico (PETG, PVC, Estireno)", "Cuero y Piel sintética", "Espejo y Vidrio", "Vinil y Lona"],
    },
    {
      title: "Procesos",
      items: [
        "Corte láser CO₂ y Corte de Metal",
        "Grabado láser (fibra y CO₂)",
        "Grabado profundo y superficial",
        "Impresión en Cama Plana (UV)",
        "Plotter e impresión gran formato",
        "Señalética y armado de exhibidores",
      ],
    },
  ],
  // Texto reescrito: el original era "...orientadas a búsquedas B2B y proyectos específicos".
  caption: "Capacidades técnicas por proceso y material",
  columns: ["Proceso", "Material", "Capacidad / Aplicación"],
  rows: [
    ["Corte láser", "Acrílico", "Hasta 12 mm para señalética, displays y piezas técnicas"],
    ["Corte láser", "MDF", "Producción de maquetas, cajas, exhibidores y elementos visuales"],
    ["Grabado con fibra", "Acero inoxidable", "Personalización premium para promocionales, placas y branding"],
    ["Grabado láser", "Madera", "Cajas, menús, branding, decoración y empaque personalizado"],
    ["Grabado decorativo", "Espejo / vidrio", "Regalos premium, eventos y aplicaciones especiales"],
    ["Impresión Cama Plana UV", "Acrílico / Madera / Metal", "Impresión fotográfica directa con tinta blanca y barniz 3D."],
    // En el original esta fila tenía una celda de menos (faltaba el proceso).
    ["Impresión gran formato", "Lona / vinil", "Publicidad gran formato, eventos, campañas y puntos de venta"],
  ] as string[][],
};

export const plotterPromo = {
  sectionId: "promocionales",
  id: "promocionales-title",
  eyebrow: "Plotter de Alta Resolución",
  title: "Impresión de Gran Formato y Soluciones Publicitarias",
  text: [
    "Potencia la presencia de tu marca con impresión de alta resolución y materiales de grado industrial. En ",
    { strong: "Laser Inova" },
    " somos especialistas en soluciones integrales de plotter: desde lonas monumentales hasta rotulación de espacios y viniles decorativos premium.",
  ] as RichText,
  services: [
    { icon: "layers", title: "Lona Gran Formato", text: "Frontlit, Mesh y Backlit con sellado térmico y refuerzos.", href: "/subpages/lona_gran_formato.html" },
    { icon: "window", title: "Vinil e Instalación", text: "Microperforado, decorativo y rotulación vehicular profesional.", href: "/subpages/vinil_instalacion.html" },
    { icon: "sign", title: "Rígidos y Señalética", text: "Impresión directa y rotulado sobre Acrílico, PVC y Estireno.", href: "/subpages/rigidos_senaletica.html" },
    { icon: "display", title: "Displays y Eventos", text: "Backdrops, X-banners y displays publicitarios de alto impacto.", href: "/subpages/displays_eventos.html" },
  ] as { icon: IconName; title: string; text: string; href: string }[],
  primary: {
    label: "Cotizar Proyecto de Impresión",
    href: wa("Hola,%20busco%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n%20en%20lona%20o%20vinil"),
  },
  secondary: { label: "Soluciones Detalladas", href: "/subpages/plotter_impresion.html" },
  card: {
    title: "Branding Visual 360°",
    text: "Transformamos tus unidades, oficinas y fachadas en herramientas de venta activas las 24 horas. Máximo impacto visual con tintas con protección UV y acabados de precisión industrial.",
    specs: [
      "Alta Resolución 1440 DPI",
      "Tintas Eco-Solventes y UV",
      "Ancho hasta 3.20m",
      "Instalación en CDMX y EdoMex",
    ],
  },
};

export const uvPrinting = {
  sectionId: "cama-plana-uv",
  id: "uv-title",
  eyebrow: "Impresión Industrial",
  title: "Impresión en Cama Plana UV",
  text: [
    "Impresión directa de alta resolución sobre ",
    { strong: "Acrílico, Madera, Vidrio, Metal, PVC y Plástico" },
    ". Nuestra tecnología cuenta con tinta blanca y barniz sectorizado, logrando colores brillantes, efectos 3D y acabados de calidad fotográfica sobre casi cualquier superficie.",
  ] as RichText,
  features: [
    "Secado instantáneo con luz UV",
    "Tinta Blanca para fondos transparentes y oscuros",
    "Barniz sectorizado (Efecto relieve/3D)",
    "Ideal para promocionales premium y señalética rígida",
  ],
  primary: {
    label: "Cotizar Impresión UV",
    href: wa("Hola,%20busco%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n%20UV"),
  },
  secondary: { label: "Ver Detalles", href: "/subpages/impresion_cama_plana_uv.html" },
  plates: ["Madera Barnizada", "Acrílico Relieve", "Metal Grabado"],
  callouts: ["Tinta Blanca 100% Opaca", "Barniz 3D Brillante"],
};

export const boutique = {
  sectionId: "boutique",
  id: "boutique-title",
  eyebrow: "Línea boutique",
  title: "Regalos personalizados y piezas especiales",
  // Texto reescrito: el original decía "Esta sección se mantiene visible porque... deja de ser el centro del home".
  text: "Detalles que se regalan y se recuerdan: bodas, aniversarios, branding fino y piezas únicas grabadas con láser.",
  items: [
    {
      title: "Grabado en espejos",
      text: "Detalles premium para bodas, aniversarios, branding fino y decoración personalizada.",
      linkLabel: "Ver espejos grabados",
      href: "/subpages/grabado_espejos.html",
    },
    {
      title: "Grabado en madera",
      text: "Menús, cajas, placas, recuerdos y objetos decorativos con identidad propia.",
      linkLabel: "Ver grabado en madera",
      href: "/subpages/grabado_madera.html",
    },
    {
      title: "Grabado en metal",
      text: "Termos, plumas y artículos premium que también funcionan para regalo o corporativo.",
      linkLabel: "Ver grabado en metal",
      href: "/subpages/grabado_metal.html",
    },
    {
      title: "Grabado láser general",
      text: "Explora la línea completa de personalización y proyectos especiales en distintos materiales.",
      linkLabel: "Ver grabado láser",
      href: "/subpages/grabado_laser.html",
    },
  ],
};

export type GalleryItem = {
  image: string;
  alt: string;
  tag: string;
  title: string;
  text: string;
  categories: string[];
};

export const gallery = {
  sectionId: "galeria",
  id: "galeria-title",
  eyebrow: "Galería de productos",
  title: "Productos, materiales y proyectos que fabricamos",
  // Texto reescrito: se quitó "Esta galería está pensada para mostrar variedad real de producto sin saturar el home."
  text: [
    "Explora una muestra de ",
    { strong: "termos, plumas, piezas en MDF, acrílico, metal, señalética y regalos personalizados" },
    ". Filtra por material o tipo de proyecto.",
  ] as RichText,
  filters: [
    { id: "all", label: "Todos" },
    { id: "corporativo", label: "Corporativo" },
    { id: "oficina", label: "Oficina" },
    { id: "tecnologia", label: "Tecnología" },
    { id: "metal", label: "Metal" },
    { id: "madera", label: "Madera" },
    { id: "mdf", label: "MDF" },
    { id: "acrilico", label: "Acrílico" },
    { id: "boutique", label: "Boutique" },
  ],
  // Categorías corregidas: en el original "Termos grabados" estaba en MDF y "Botellas" en Acrílico (sin relación con el producto).
  // Los `alt` originales no correspondían al producto (p. ej. "Espejos grabados" en un accesorio de escritorio): ahora describen cada pieza.
  items: [
    { image: "A2331", tag: "Metal", title: "Plumas metálicas promocionales", text: "Bolígrafos grabados para campañas, kits ejecutivos, eventos y regalos corporativos.", categories: ["corporativo", "metal"], alt: "Plumas metálicas grabadas con logotipo para kits ejecutivos" },
    { image: "A2368", tag: "Corporativo", title: "Cilindros promocionales", text: "Botellas personalizadas para activaciones, branding y kits de empresa.", categories: ["corporativo", "metal"], alt: "Cilindros y botellas promocionales personalizados con marca" },
    { image: "A2473", tag: "Metal", title: "Termos grabados", text: "Personalización premium para empresas, RH, eventos y regalos ejecutivos.", categories: ["corporativo", "metal"], alt: "Termos de acero grabados con láser para regalos corporativos" },
    { image: "A2475", tag: "Corporativo", title: "Botellas personalizadas", text: "Artículos promocionales para campañas, eventos y branding funcional.", categories: ["corporativo"], alt: "Botellas personalizadas para campañas y eventos" },
    { image: "A2505", tag: "Oficina", title: "Accesorios de escritorio", text: "Organizadores corporativos con acabado premium para oficina y regalo ejecutivo.", categories: ["boutique", "oficina", "madera"], alt: "Accesorios de escritorio personalizados para oficina" },
    { image: "A2506", tag: "Oficina", title: "Escritorio en madera premium", text: "Piezas funcionales y decorativas con imagen corporativa o branding fino.", categories: ["boutique", "madera", "oficina"], alt: "Piezas de escritorio en madera con branding grabado" },
    { image: "A2516", tag: "Corporativo", title: "Llaveros promocionales", text: "Accesorios compactos para marca, campañas, activaciones y giveaway corporativo.", categories: ["corporativo"], alt: "Llaveros promocionales personalizados con logotipo" },
    { image: "A2538", tag: "Metal", title: "Plumas ejecutivas", text: "Escritura premium para kits empresariales, regalos institucionales y branding.", categories: ["metal", "oficina"], alt: "Plumas ejecutivas de metal para regalos institucionales" },
    { image: "A2571", tag: "Oficina", title: "Libretas personalizadas", text: "Artículos para oficina, congresos, cursos y kits de bienvenida.", categories: ["oficina", "corporativo"], alt: "Libretas personalizadas para congresos y kits de bienvenida" },
    { image: "A2637", tag: "Madera", title: "Llaveros en madera", text: "Piezas grabadas con estética natural para branding boutique y regalo especial.", categories: ["madera", "corporativo"], alt: "Llaveros de madera grabados con láser" },
    { image: "A2698", tag: "Tecnología", title: "Accesorios tecnológicos", text: "Regalos funcionales para campañas, ventas, ejecutivos y kits de marca.", categories: ["corporativo", "tecnologia"], alt: "Accesorios tecnológicos personalizados para kits de marca" },
    { image: "A2733", tag: "Corporativo", title: "Tazas personalizadas", text: "Promocionales útiles para oficina, eventos, campañas y branding cotidiano.", categories: ["boutique", "corporativo"], alt: "Tazas personalizadas con logotipo para oficina y eventos" },
    { image: "A2887", tag: "Tecnología", title: "Accesorios de escritorio y tecnología", text: "Soluciones funcionales para home office, kits corporativos y regalos ejecutivos.", categories: ["tecnologia", "corporativo"], alt: "Accesorios de escritorio y tecnología para home office" },
    { image: "A3018", tag: "Corporativo", title: "Sets ejecutivos", text: "Kits de libreta y pluma para onboarding, congresos y regalo institucional.", categories: ["boutique"], alt: "Set ejecutivo de libreta y pluma personalizado" },
    { image: "A3101", tag: "Boutique", title: "Herramientas promocionales", text: "Regalos funcionales para construcción, industria, ferias y clientes corporativos.", categories: ["boutique", "metal", "madera"], alt: "Herramientas promocionales grabadas para clientes corporativos" },
    { image: "A3087", tag: "Tecnología", title: "Accesorios para celular", text: "Productos de marca para activaciones, retail y regalos promocionales modernos.", categories: ["boutique", "tecnologia"], alt: "Accesorios para celular personalizados con marca" },
    { image: "A3097", tag: "Corporativo", title: "Libretas ejecutivas", text: "Piezas para oficina, eventos, ventas y kits empresariales personalizados.", categories: ["corporativo", "metal"], alt: "Libretas ejecutivas personalizadas para kits empresariales" },
    { image: "A3140", tag: "Tecnología", title: "Power banks promocionales", text: "Tecnología de alto valor percibido para clientes, ejecutivos y campañas premium.", categories: ["boutique"], alt: "Power banks promocionales con logotipo" },
    { image: "A3146", tag: "Boutique", title: "Accesorios para vino", text: "Regalos premium para clientes, eventos especiales y branding de alto nivel.", categories: ["boutique"], alt: "Accesorios para vino personalizados como regalo premium" },
    { image: "A3169", tag: "Boutique", title: "Espejos promocionales", text: "Artículos elegantes para beauty, retail, regalos especiales y branding premium.", categories: ["boutique"], alt: "Espejos promocionales personalizados para beauty y retail" },
    { image: "A3199", tag: "Metal", title: "Llaveros destapador", text: "Promocionales prácticos para campañas, bares, eventos y marcas con alto movimiento.", categories: ["boutique", "metal"], alt: "Llaveros destapador de metal con correa de piel sintética y placa grabada con logotipo" },
    { image: "A2577", tag: "Madera", title: "Tablas portapapeles de MDF", text: "Útiles para oficinas, eventos, escuelas y marcas que buscan un promocional de uso diario.", categories: ["boutique", "madera", "mdf"], alt: "Tabla portapapeles de MDF con clip metálico, lista para grabar con logotipo" },
    { image: "A3144", tag: "Madera", title: "Portarretratos de madera y acrílico", text: "Regalo corporativo con logotipo grabado en la base, ideal para aniversarios, clientes y eventos.", categories: ["boutique", "madera", "acrilico"], alt: "Portarretrato de madera con acrílico y logotipo grabado en la base" },
    { image: "JJ3045", tag: "Metal", title: "Set parrillero personalizado", text: "Kit premium para cocina, parrilladas y regalos corporativos con alto valor percibido.", categories: ["boutique", "metal", "madera"], alt: "Set parrillero personalizado con grabado láser" },
  ] as GalleryItem[],
};

export const directory = {
  sectionId: "todos-los-servicios",
  id: "servicios-completos-title",
  eyebrow: "Soluciones para empresas y particulares",
  title: "Directorio de Especialidades",
  clusters: [
    {
      icon: "factory",
      title: "Corte y Maquila Industrial",
      text: "Soluciones B2B para producción por lote, maquila de piezas, estructuras y marcaje profundo.",
      links: [
        { label: "Corte láser en metal", href: "/subpages/corte_laser_metal.html" },
        { label: "Maquila de volumen", href: "/subpages/maquila_volumen.html" },
        { label: "Producción para agencias", href: "/subpages/produccion_agencias.html" },
        { label: "Señalética y acrílico", href: "/subpages/senaletica_oficinas.html" },
      ],
    },
    {
      icon: "gift",
      title: "Boutique y Promocionales",
      text: "Detalles premium, regalos empresariales y personalización cuidada en materiales elegantes.",
      links: [
        { label: "Promocionales premium", href: "/subpages/promocionales_premium.html" },
        { label: "Grabado en metal", href: "/subpages/grabado_metal.html" },
        { label: "Grabado en madera", href: "/subpages/grabado_madera.html" },
        { label: "Grabado en espejos", href: "/subpages/grabado_espejos.html" },
        { label: "Regalos empresariales", href: "/subpages/regalos_empresariales.html" },
      ],
    },
    {
      icon: "printer",
      title: "Impresión y Gran Formato",
      text: "Desde lonas monumentales hasta impresión directa sobre rígidos con calidad fotográfica.",
      links: [
        { label: "Impresión Cama Plana UV", href: "/subpages/impresion_cama_plana_uv.html" },
        { label: "Plotter e Impresión", href: "/subpages/plotter_impresion.html" },
        { label: "Lona Gran Formato", href: "/subpages/lona_gran_formato.html" },
        { label: "Vinil e instalación", href: "/subpages/vinil_instalacion.html" },
        { label: "Displays para eventos", href: "/subpages/displays_eventos.html" },
      ],
    },
  ] as { icon: IconName; title: string; text: string; links: { label: string; href: string }[] }[],
};

export const faqs = {
  sectionId: "faqs",
  id: "faqs-title",
  eyebrow: "Preguntas frecuentes",
  title: "Dudas comunes de clientes corporativos y de regalos",
  items: [
    { q: "¿Manejan mayoreo y producción de volumen?", a: "Sí. Atendemos proyectos desde tirajes medianos hasta producción de volumen para empresas, eventos, campañas y compras recurrentes." },
    { q: "¿Pueden facturar?", a: "Sí, trabajamos con clientes empresariales y podemos apoyar procesos formales de cotización, seguimiento y facturación." },
    { q: "¿Trabajan con archivos o productos del cliente?", a: "Sí. Podemos trabajar con archivo proporcionado por el cliente o ayudar a preparar el proyecto para producción, dependiendo del material y del tipo de pieza." },
    // Texto reescrito: el original decía "Aunque el nuevo enfoque del home es más B2B, seguimos realizando...".
    { q: "¿También hacen regalos personalizados?", a: "Sí. Además de los proyectos para empresas, realizamos regalos personalizados, espejos grabados, piezas en madera, metal y proyectos boutique." },
    { q: "¿Pueden atender proyectos urgentes?", a: "Sí, dependiendo del volumen, material y complejidad. Siempre revisamos tiempos de entrega reales para no comprometer calidad ni fechas de evento." },
  ],
};

export const finalCta = {
  id: "cta-final-title",
  eyebrow: "Cotización",
  title: "¿Buscas un proveedor para maquila, grabado corporativo o impresión en CDMX?",
  text: "Cuéntanos si tu proyecto es para empresa, evento, agencia, producción en volumen o regalos personalizados.",
  primary: {
    label: "Hablar con Ventas Corporativas",
    href: wa("Hola,%20quiero%20cotizar%20un%20proyecto%20corporativo%20con%20Laser%20Inova"),
  },
  secondary: { label: "Solicitar cotización", href: "/#contacto" },
};

export const contact = {
  sectionId: "contacto",
  id: "contacto-title",
  eyebrow: "Contacto y Ubicación",
  title: "¿Listo para cotizar tu proyecto?",
  text: "Déjanos tus datos o visítanos en nuestras instalaciones. Atendemos proyectos corporativos, maquila y mayoreo.",
  infoTitle: "Información de Contacto",
  info: [
    { icon: "whatsapp", label: "WhatsApp · asistente virtual", value: whatsappBot.label, href: whatsappBot.href },
    {
      icon: "phone",
      label: "Llamadas o WhatsApp con una persona",
      value: "+52 55 7939 8727",
      href: "tel:+525579398727",
      extra: { label: "Escribir por WhatsApp", href: whatsappPerson.href },
    },
    { icon: "mail", label: "Correo Electrónico", value: "informes@laserinova.com", href: "mailto:informes@laserinova.com" },
    { icon: "pin", label: "Ubicación", value: "Cuichapa 223, Petrolera, Azcapotzalco, 02480 CDMX" },
    { icon: "clock", label: "Horario de Atención", value: "Lunes a Viernes: 09:00 - 19:00\nSábados: 11:00 - 17:00" },
  ] as { icon: IconName; label: string; value: string; href?: string; extra?: { label: string; href: string } }[],
  form: {
    name: "Tu nombre o empresa",
    email: "Tu correo",
    message: "Cuéntanos tu proyecto: volumen, material, tiempos y tipo de servicio",
    submit: "Enviar Solicitud",
    sending: "Enviando…",
    ok: "¡Gracias! Recibimos tu solicitud y te responderemos pronto.",
    error: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp.",
    invalid: "Revisa tu nombre, correo y mensaje.",
    limited: "Enviaste varias solicitudes seguidas. Espera unos minutos o escríbenos por WhatsApp.",
  },
  privacy: { before: "Usamos tus datos solo para responder tu solicitud. Consulta el", linkLabel: "aviso de privacidad", href: "/aviso-de-privacidad" },
  mapTitle: "Mapa de ubicación de Laser Inova",
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.2560389251007!2d-99.20374292381257!3d19.48761718180361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d2028ff506eda3%3A0x46063795f2a37abc!2sCuichapa%20223%2C%20Petrolera%2C%20Azcapotzalco%2C%2002480%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1sen!2smx!4v1747943048535!5m2!1sen!2smx",
};
