# Plan de pulido (antes y después del corte)

Punto de partida (auditado el 6 nov 2026): contenido migrado (29 URLs), formulario con Resend, botón de WhatsApp contextual.

## Qué aplica y qué no de la lista

| Punto | Estado | Nota |
|---|---|---|
| Esqueletos de carga | N/A casi total | El sitio es estático: no trae datos de un backend. Solo hay datos asíncronos en el formulario (ya tiene estado "Enviando…"). Si el bot/backend se integra al sitio, se agregan. |
| Jerarquía visual / ley de Hick | **Falta** | Hay secciones con título + subtítulo + párrafo largo + lista + 2 botones. |
| Design tokens | **Falta** | Solo 13 variables (colores primitivos). 165 colores hex y 216 `rgba()` escritos a mano en ~40 archivos CSS; 40 tamaños de fuente distintos; sin escala de espaciado/radios/sombras. |
| Accesibilidad | **Bien base, faltan pulidos** | Contraste OK en los textos medidos (4.8–9.8:1); `lang`, skip-link, `<main>`, labels del formulario (ocultos visualmente), `alt` en imágenes y `focus-visible` ya están. Falta auditoría automática (axe), errores del formulario con `aria-describedby`/`role="alert"`, y revisar el menú con teclado. |
| Rate limiting | **Falta** | `/api/contacto` no tiene límite. Único endpoint del sitio. |
| Secretos solo en servidor | **Bien** | `RESEND_API_KEY` solo se lee en el servidor. Lo único público es el número de WhatsApp (debe serlo). |
| Variables de entorno fuera de git | **Bien** | `.env.local` ignorado; ningún `.env`/PHP rastreado; sin secretos en el historial. Pendiente: rotar la contraseña SMTP del PHP viejo (está fuera del repo, en Hostinger). |
| Validación / saneamiento | **Parcial** | Valida nombre/correo/mensaje, recorta longitud y escapa HTML. Falta límite de tamaño del cuerpo y revisar el origen de la petición. |
| RLS / tablas públicas / autenticación | N/A | No hay base de datos ni rutas protegidas. Aplica el día que se agregue una. |
| Errores sin stack trace | **Bien** | Respuestas genéricas ("No se pudo enviar"); el detalle solo va al log del servidor. |
| Endpoints de debug/admin | **Bien** | No existen. El único endpoint es `/api/contacto`. |
| Cabeceras de seguridad | **Falta** | Sin CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-Content-Type-Options. |
| Aviso de privacidad y cookies | **Falta** | Sin páginas legales; GA4 se carga sin consentimiento. |
| `npm audit` | Bien | 0 vulnerabilidades en producción. |

## Fases (orden recomendado)

### A. Seguridad del formulario y del sitio (≈ medio día) — antes del corte
1. Rate limiting en `/api/contacto` (p. ej. 5 envíos por IP cada 10 min). Opciones: Upstash Ratelimit (código, ~gratis) o regla en Vercel Firewall (sin código).
2. Revisar `Origin` de la petición y limitar el tamaño del cuerpo.
3. Cabeceras de seguridad en `next.config.ts`. CSP primero en modo "report-only" (GA4, Resend, mapa de Google y fotos de Unsplash deben quedar permitidos).
4. Rotar la contraseña SMTP del PHP viejo.

### B. Privacidad y cookies (≈ medio día) — antes del corte
1. Página `/aviso-de-privacidad` (LFPDPPP: responsable, datos, finalidades, derechos ARCO, transferencias a Vercel/Resend/Google, contacto).
2. Política de cookies + banner con **Consent Mode v2**: GA4 sin cookies hasta que el visitante acepte.
3. Enlaces en el pie de página y aviso junto al botón "Enviar Solicitud".
- Necesito de ti: nombre o razón social del responsable, domicilio, correo para derechos ARCO, y si hay otros usos de datos (el bot de WhatsApp guarda conversaciones, por ejemplo).
- El texto es un borrador razonable, pero conviene que lo revise un abogado.
- Sobre Google: no penaliza el ranking por no tener banner. Lo que sí exigen los términos de Google Analytics/Ads es tener política de privacidad.

### C. Accesibilidad (≈ 1 día)
1. Auditoría automática con axe sobre las 29 páginas y arreglar lo que salga.
2. Formulario: mensajes de error con `aria-describedby` y `role="alert"`, foco al primer campo con error.
3. Menú (mega menú, móvil) con teclado: Tab, Esc, `aria-expanded`.
4. Numeración decorativa de tarjetas (contraste 1.2:1) con `aria-hidden` ya puesto; confirmar.
5. Pruebas con lector de pantalla (VoiceOver) en home y un servicio.

### D. Design tokens (≈ 1–2 días)
1. Capa de tokens: color semántico (`--surface`, `--surface-alt`, `--text`, `--text-muted`, `--border`, `--accent`…), escala de espaciado, radios, sombras y escala tipográfica de ~8 tamaños (hoy 40).
2. Reemplazar los 165 hex y 216 `rgba()` por tokens en los ~40 CSS; sin cambio visual.
3. Regla de lint (stylelint) que prohíba colores sueltos para que no vuelva a pasar.
4. Actualizar el skill `atomic-design` con las reglas de tokens.

### E. Jerarquía y menos texto (≈ 2–3 días, home primero)
1. Auditoría sección por sección: un título claro, **una** frase de apoyo, un botón principal y uno secundario como máximo.
2. Quitar subtítulos y párrafos repetidos; textos largos a lista corta o a "ver más".
3. Una sola jerarquía tipográfica (h1 > h2 > h3) apoyada en los tokens.
4. **Cuidado SEO:** el h1, los h2 y las palabras clave de cada página ya posicionan. Se recorta lo redundante, no los títulos. En las 19 páginas de servicio y el blog conviene esperar 2–4 semanas tras el corte y decidir con datos de Search Console.

### F. Estados de carga (solo si aplica)
- Hoy no hay datos de backend. Si se integra el bot o un CRM al sitio: `loading.tsx` + esqueletos de la forma exacta del contenido, para no mover el layout.

## Secuencia sugerida
A → B → C (rápido) → corte con staging → D → E (home) → medir → E (servicios/blog).

---
## Avance
- **A. Seguridad — HECHO (6 nov 2026):** límite de 5 envíos/IP cada 10 min (en memoria), verificación de `Origin`, tope de 20 KB en el cuerpo, cabeceras de seguridad (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS) y CSP en modo **report-only**.
  - Pendiente: (1) en staging, revisar la consola por avisos de CSP y cambiar a `Content-Security-Policy`; (2) agregar una regla de Rate Limiting en Vercel Firewall sobre `/api/contacto` (el límite en memoria es por instancia, no global); (3) rotar la contraseña SMTP del PHP viejo en Hostinger.
- **B. Privacidad y cookies — HECHO (borrador):** `/aviso-de-privacidad`, `/politica-de-cookies`, banner con Aceptar/Rechazar, GA4 solo carga con consentimiento (y se desactiva y borra `_ga*` si luego rechaza), enlaces en el pie con «Preferencias de cookies», aviso junto al formulario.
  - Pendiente: confirmar razón social/nombre del responsable (`content/legal.ts`, marcado TODO), si el bot guarda conversaciones, y revisión por un abogado.
- **C. Accesibilidad — HECHO (6 nov 2026):** auditoría automática con axe-core (WCAG 2.0/2.1/2.2 A y AA + buenas prácticas) sobre las 31 páginas: de 2 tipos de problema (contraste de números decorativos y botón de WhatsApp fuera de un landmark) a **0 violaciones**.
  - Corregido: números decorativos de tarjetas generados por CSS; botón de WhatsApp dentro de `<aside aria-label>`; mega menú de escritorio se cierra con **Esc** y devuelve el foco a «Servicios» (WCAG 1.4.13); en móvil/tablet los enlaces del submenú ya no reciben foco ni se leen con el menú cerrado; formulario con `aria-describedby`/`aria-invalid`, mensajes de error como `role="alert"` y foco al primer campo en error.
  - Pendiente (manual, no automatizable): prueba con lector de pantalla (VoiceOver) en home y un servicio; revisar zoom 200 % y `prefers-reduced-motion` en la maqueta UV.
- **D. Design tokens — HECHO (6 nov 2026):** nuevo `web/app/tokens.css` con paleta, escalas de transparencia, colores semánticos, escala tipográfica (47 tamaños → 9 + 4 de titulares), radios (21 → 8), sombras y espaciado de sección. Se migraron 56 CSS (≈ 650 reemplazos). `npm run lint:tokens` (script `scripts/check-tokens.mjs`) falla si aparece un color suelto fuera de tokens e ilustraciones (UvBed y ProcessCanvas).
  - Comprobado con una "foto" de estilos calculados antes/después en 8 páginas (≈ 29 000 propiedades): solo cambian ajustes pequeños de transparencia (p. ej. 0.66→0.70), tamaños de fuente (≤ ~1.6 px) y el espaciado vertical de algunas secciones (80/88 px → 96 px). Sin roturas.
  - Eliminado `app/page.module.css` (plantilla sobrante de Next).
- **E. Jerarquía y menos texto — POSPUESTO (decisión del cliente, 6 nov 2026):** se conserva el texto actual por SEO; se retoma después del corte con datos de Search Console. Medición de partida: home = 2,054 palabras en 18 bloques; la galería aporta 376 (24 tarjetas con descripción); 4 secciones tienen 2 botones del mismo peso. No se modificó ningún texto.
