import type { NextConfig } from "next";

/**
 * Política de contenido (CSP). Se despliega en modo "report-only": el navegador avisa en consola de lo que
 * bloquearía, pero no bloquea nada. Cuando no haya avisos en staging, cambiar a `Content-Security-Policy`.
 * Permite: GA4, el mapa de Google, fotos de Unsplash (blog) y los estilos/scripts en línea que Next necesita.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://img.laserinova.com https://www.google-analytics.com https://*.googletagmanager.com https://*.google.com https://*.gstatic.com https://*.googleapis.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // El blog usa fotos de Unsplash (mismas que el sitio anterior). Pendiente: reemplazarlas por fotos propias.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.laserinova.com" }, // fotos de la tienda (disco de Hostinger)
    ],
  },
  partialPrefetching: true,
  /**
   * Redirects permanentes del sitio anterior (los 7 del .htaccess + duplicados de URL + /old_page/ + rutas de imágenes /assets/…).
   * Next responde 308, que Google trata igual que un 301. Mantener al menos 1 año.
   */
  /** Cabeceras de seguridad solo en producción (en desarrollo Next necesita `eval` y WebSockets). */
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/blog/index.html", destination: "/blog", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/grabado_metal.html", destination: "/subpages/grabado_metal.html", permanent: true },
      { source: "/corte_laser.html", destination: "/subpages/maquila_volumen.html", permanent: true },
      { source: "/grabado_madera.html", destination: "/subpages/grabado_madera.html", permanent: true },
      { source: "/grabado_corte_acrilico.html", destination: "/subpages/displays_materiales_visuales.html", permanent: true },
      { source: "/impresion_dft_uv.html", destination: "/subpages/impresion_cama_plana_uv.html", permanent: true },
      { source: "/grabado_corporativo.html", destination: "/subpages/promocionales_premium.html", permanent: true },
      { source: "/blog/grabado_metal.html", destination: "/blog/grabado-metal-volumen.html", permanent: true },

      // Carpeta antigua /old_page/ (hoy responde 200 en el sitio vivo): cada página va a su equivalente actual.
      { source: "/old_page", destination: "/", permanent: true },
      { source: "/old_page/index.html", destination: "/", permanent: true },
      { source: "/old_page/readme.html", destination: "/", permanent: true },
      { source: "/old_page/servicios.html", destination: "/", permanent: true },
      { source: "/old_page/corte_laser.html", destination: "/subpages/maquila_volumen.html", permanent: true },
      { source: "/old_page/grabado_espejos.html", destination: "/subpages/grabado_espejos.html", permanent: true },
      { source: "/old_page/grabado_madera.html", destination: "/subpages/grabado_madera.html", permanent: true },
      { source: "/old_page/grabado_laser.html", destination: "/subpages/grabado_laser.html", permanent: true },
      { source: "/old_page/grabado_metal.html", destination: "/subpages/grabado_metal.html", permanent: true },
      { source: "/old_page/grabado_corporativo.html", destination: "/subpages/promocionales_premium.html", permanent: true },
      { source: "/old_page/grabado_corte_acrilico.html", destination: "/subpages/displays_materiales_visuales.html", permanent: true },
      { source: "/old_page/impresion_dft_uv.html", destination: "/subpages/impresion_cama_plana_uv.html", permanent: true },

      // Imágenes: el sitio viejo las servía desde /assets/…; ahora viven en /img/… (así Google Imágenes no pierde las URLs ya indexadas).
      // Primero los logos, que cambiaron de formato (webp/png → svg) y no tienen el mismo nombre.
      { source: "/assets/img/logo_fondo_negro.webp", destination: "/img/logo-inova-blanco.svg", permanent: true },
      { source: "/assets/img/small_logo_fondo_negro.webp", destination: "/img/logo-inova-blanco.svg", permanent: true },
      { source: "/assets/img/logo_fondo_blanco.webp", destination: "/img/logo-inova-negro.svg", permanent: true },
      { source: "/assets/img/small_logo_fondo_blanco.webp", destination: "/img/logo-inova-negro.svg", permanent: true },
      { source: "/assets/img/laser_inova_navbar_mas_grande.png", destination: "/img/logo-inova-negro.svg", permanent: true },
      { source: "/assets/gallery/:path*", destination: "/img/gallery/:path*", permanent: true },
      { source: "/assets/img/:path*", destination: "/img/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
