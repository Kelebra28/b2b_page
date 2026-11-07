# Plan de migración a Next.js (laserinova.com)

Meta: mismo sitio, mismas URLs (`.html` vía rewrites), en Next.js, sin perder indexación. Las mejoras van después.

## Fase 0: Arreglos rápidos en el sitio actual
- [x] Quitar nota interna visible en la home ("Esta parte ayuda tanto a la conversión…").
- [ ] Llaveros destapador (3 tarjetas, fotos distintas, mismo texto): darles nombre propio viendo las fotos A3199, A2577, A3144.
- [ ] NO subir los cambios de `seo_script.js` (links absolutos con `/index.html#…`).
- [ ] Confirmar si el formulario funciona (`/api/contacto.php` da 404 en producción).

## Fase 1: Inventario
- Script `scripts/inventory.js`: lee el sitemap en vivo y guarda status, title, description, canonical, H1, JSON-LD y redirects por URL en `inventory/live.json`.
- Export de Search Console (páginas indexadas y consultas) para priorizar.

## Fase 2: Construir en Next.js (App Router, estático)
- Atomic Design: atoms, molecules, organisms, y templates solo para servicios (18) y blog (8).
- Contenido copiado tal cual a `content/`.
- Metadata API (title, description, canonical, OG, Twitter), JSON-LD LocalBusiness, GA `G-ET4MM9DNK0`, verificación de Search Console.
- `next/image`, formulario como API route.

## Fase 3: Conservar URLs
- `rewrites` para cada `/subpages/*.html` y `/blog/*.html`.
- 301: los 7 del `.htaccess` (a la URL final), `/index.html` → `/`, `/blog/index.html` y `/blog.html` → `/blog`.
- `sitemap.ts` y `robots.ts` con URLs canónicas.

## Fase 4: Pruebas
- Comparar las 29 URLs viejo vs nuevo (status, title, canonical, H1). Sin cadenas de redirects. Deploy de prueba con `noindex`.

## Fase 5: Corte
- Hosting (Vercel por defecto), bajar TTL, cambiar DNS, quitar `noindex`, subir sitemap.

## Fase 6: Vigilancia (2–4 semanas) en Search Console.

## Fase 7: Mejoras (después)
- Tienda en `/tienda`, `alt` de galería, textos "Ver más", meta descriptions largas, rediseño, URLs limpias con 301.

## Hallazgos (carpeta del sitio viejo: `../page/`)
- `page/api/main.php` es el PHP del formulario (PHPMailer + SMTP de Hostinger), pero el HTML llama a `/api/contacto.php` → por eso da 404. Contiene credenciales: NO subirlas al repo; usar variables de entorno en Next.
- `googlef58879b8f42117df.html` es una verificación de Search Console: copiada a `web/public/` (no borrar).
- Proyecto Next.js 16 creado en `web/` (App Router, TypeScript, sin Tailwind). Estructura atomic en `web/components/`.
- Referencia de la barra "Laser Beam": `docs/navbar-laser-beam/`.

## Estado (6 nov 2026)
Hecho: home (18 secciones), 19 páginas de servicio, blog (índice + 8 artículos), metadatos/JSON-LD, GA4 diferido, verificación de Search Console, sitemap (29 URLs), robots, 10 redirects, formulario con Resend, modo staging `SITE_NOINDEX=1`.
Comparado contra el sitio vivo: las 29 páginas coinciden en title, description y H1 (único cambio: canonical del blog = `/blog`).

## Despliegue en Vercel (staging)
1. Subir el repo a GitHub (el sitio viejo sigue en la raíz; no estorba).
2. En Vercel: New Project → importar el repo → **Root Directory = `web`** (Framework: Next.js).
3. Variables de entorno (Settings → Environment Variables):
   - `RESEND_API_KEY`, `CONTACT_FROM=no-reply@laserinova.com`, `CONTACT_TO=informes@laserinova.com`
   - **Solo en el entorno de staging/preview:** `SITE_NOINDEX=1` (noindex + robots `Disallow: /`). Quitarla en Production.
4. Probar en la URL `*.vercel.app`: navegación, formulario (correo real), los 10 redirects, móvil, Lighthouse.

## Plan de corte (DNS)
Antes: bajar el TTL del DNS de `laserinova.com` a 300 s (24–48 h antes). Anotar los registros actuales (MX/correo no se tocan).
1. Confirmar que Production NO tiene `SITE_NOINDEX`.
2. En Vercel → Domains: agregar `www.laserinova.com` (principal) y `laserinova.com` (redirige a www, como hacía el .htaccess).
3. En el DNS: `www` CNAME → `cname.vercel-dns.com`; apex `A` → `76.76.21.21` (valores finales: los que muestre Vercel). No tocar registros MX/SPF/DKIM de correo.
4. Verificar HTTPS, `/robots.txt`, `/sitemap.xml`, `/googlef58879b8f42117df.html` y una URL de cada tipo.
5. Search Console: reenviar el sitemap, inspeccionar la home y 2–3 servicios ("Solicitar indexación").
6. Mantener los redirects al menos 1 año.

## Vigilancia (2–4 semanas)
Search Console: Cobertura/Indexación, errores 404, impresiones y clics por página vs. semana previa al corte. Si una URL cae, revisar canonical y status primero.

## Pendientes de contenido
- Confirmar teléfono correcto (+52 56 1995 9385 en JSON-LD vs +52 55 7939 8727 visible) y el WhatsApp +52 55 4761 0609 de un artículo.
- Foto de portada de `grabado_cuero_plastico` (el archivo original no existe).
- Verificar dominio en Resend (en proceso) y probar un envío real.
- Mejoras posteriores: tienda en `/tienda`, ampliar artículos cortos del blog, reemplazar fotos de stock, URLs limpias con 301.
