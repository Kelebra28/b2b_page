import { wa } from "@/content/site";

/** Fotos reales de trabajos del taller (sin nombrar clientes). Archivos en public/img/trabajos. */
export const work = {
  id: "trabajos-title",
  sectionId: "trabajos",
  eyebrow: "Trabajos reales",
  title: "Así se ve lo que producimos en nuestro taller",
  text: "Piezas y máquinas en operación, fotografiadas en Laser Inova: grabado láser, impresión UV y producción para eventos.",
  items: [
    { src: "/img/trabajos/impresion-uv-acrilico.webp", tag: "Impresión UV", title: "Tirada de piezas en acrílico", alt: "Piezas de acrílico con logotipo recién impresas en la cama plana UV del taller de Laser Inova" },
    { src: "/img/trabajos/grabado-vaso-termico.webp", tag: "Grabado láser", title: "Vaso térmico personalizado", alt: "Vaso térmico negro con logotipo grabado con láser sobre el soporte giratorio de la máquina" },
    { src: "/img/trabajos/grabado-placa-acero.webp", tag: "Grabado en metal", title: "Placa de acero grabada", alt: "Placa de acero inoxidable con nombre grabado con láser sobre la mesa de la máquina" },
    { src: "/img/trabajos/grabado-tubo-metal.webp", tag: "Grabado en metal", title: "Logotipo en tubo pintado", alt: "Tubo de metal pintado de negro con logotipo grabado con láser" },
    { src: "/img/trabajos/grabado-taza-ceramica.webp", tag: "Grabado láser", title: "Taza de cerámica", alt: "Taza de cerámica azul con logotipo grabado con láser" },
    { src: "/img/trabajos/impresion-bolsa-evento.webp", tag: "Eventos", title: "Bolsas para un foro empresarial", alt: "Bolsa de tela negra con diseño a color impreso para un evento empresarial" },
    { src: "/img/trabajos/grabado-pluma-evento.webp", tag: "Eventos", title: "Pluma grabada y libretas", alt: "Pluma metálica negra con logotipo grabado con láser frente a libretas impresas del mismo evento" },
    { src: "/img/trabajos/impresion-libreta-evento.webp", tag: "Eventos", title: "Libretas impresas a color", alt: "Libreta de pasta negra con diseño a color impreso, parte de un lote para un evento" },
    { src: "/img/trabajos/grabado-vaso-tapa.webp", tag: "Grabado láser", title: "Vaso con tapa", alt: "Vaso térmico con tapa y logotipo grabado con láser sobre el soporte giratorio de la máquina" },
  ],
  cta: { label: "Cotizar un proyecto similar", href: wa("Hola,%20quiero%20cotizar%20un%20proyecto%20similar%20a%20los%20que%20vi%20en%20su%20sitio") },
};
