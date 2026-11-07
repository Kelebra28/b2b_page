import { wa } from "@/content/site";

export type NavLinkItem = { label: string; href: string };
export type ServiceGroup = { title: string; links: NavLinkItem[] };
export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  /** Si trae grupos, el item abre un mega menú */
  groups?: ServiceGroup[];
};

/**
 * Servicios agrupados en 5 especialidades (las 19 páginas de servicio).
 * Las URLs conservan el .html del sitio actual (se sirven con rewrites).
 * Agrupación propuesta: ajustar aquí.
 */
export const serviceGroups: ServiceGroup[] = [
  {
    title: "Corte y Maquila",
    links: [
      { label: "Corte láser en metal", href: "/subpages/corte_laser_metal.html" },
      { label: "Maquila de volumen", href: "/subpages/maquila_volumen.html" },
      { label: "Producción para agencias", href: "/subpages/produccion_agencias.html" },
    ],
  },
  {
    title: "Grabado Láser",
    links: [
      { label: "Grabado láser", href: "/subpages/grabado_laser.html" },
      { label: "Grabado en metal", href: "/subpages/grabado_metal.html" },
      { label: "Grabado en madera", href: "/subpages/grabado_madera.html" },
      { label: "Grabado en espejos", href: "/subpages/grabado_espejos.html" },
      { label: "Cuero y plástico", href: "/subpages/grabado_cuero_plastico.html" },
    ],
  },
  {
    title: "Impresión y Gran Formato",
    links: [
      { label: "Impresión cama plana UV", href: "/subpages/impresion_cama_plana_uv.html" },
      { label: "Plotter e impresión", href: "/subpages/plotter_impresion.html" },
      { label: "Lona gran formato", href: "/subpages/lona_gran_formato.html" },
      { label: "Vinil y rotulación", href: "/subpages/vinil_instalacion.html" },
    ],
  },
  {
    title: "Señalética y Displays",
    links: [
      { label: "Señalética para oficinas", href: "/subpages/senaletica_oficinas.html" },
      { label: "Rígidos y señalética industrial", href: "/subpages/rigidos_senaletica.html" },
      { label: "Displays para eventos", href: "/subpages/displays_eventos.html" },
      { label: "Displays y materiales visuales", href: "/subpages/displays_materiales_visuales.html" },
    ],
  },
  {
    title: "Regalos y Promocionales",
    links: [
      { label: "Promocionales premium", href: "/subpages/promocionales_premium.html" },
      { label: "Regalos empresariales", href: "/subpages/regalos_empresariales.html" },
      { label: "Kits de bienvenida", href: "/subpages/kits_bienvenida.html" },
    ],
  },
];

/** Menú principal. Los links con "/#" funcionan desde cualquier página. */
export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#todos-los-servicios", groups: serviceGroups },
  { label: "Tienda", href: "/tienda" },
  { label: "Galería", href: "/#galeria" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/#contacto" },
];

export const whatsappCta = {
  label: "Cotizar",
  href: wa("Hola,%20quiero%20cotizar%20un%20proyecto%20corporativo%20o%20de%20mayoreo"),
};
