---
name: atomic-design
description: Reglas para construir y rediseñar componentes de laserinova.com con Atomic Design (atoms, molecules, organisms, templates) y componentes dumb/presentacionales en Next.js, cuidando el SEO. Usar al crear, mover o refactorizar cualquier componente, sección o página del sitio.
---

# Atomic Design + componentes dumb (laserinova.com)

## Estructura

```
components/
  atoms/        Button, Logo, Icon, Badge, Heading, WhatsAppLink, Tag
  molecules/    ServiceCard, GalleryItem, FormField, NavDropdown, BlogCard, SectionHeading
  organisms/    Header, Footer, Hero, ServiceGrid, Gallery, ContactForm, FAQ
  templates/    HomeTemplate, ServicePageTemplate, BlogPostTemplate
app/            páginas: solo cargan datos de content/ y los pasan a un template
content/        textos, imágenes, metadatos y FAQs de cada servicio/artículo
```

Nivel por tamaño y responsabilidad:
- **Atom:** una pieza mínima, sin depender de otros componentes del proyecto (salvo otros atoms).
- **Molecule:** 2+ atoms con un propósito único (tarjeta, campo de formulario).
- **Organism:** sección completa y autónoma de la página.
- **Template:** estructura de una página; define el orden de los organisms y recibe todo por props.
- Un componente solo importa de su mismo nivel hacia abajo (organism → molecule → atom). Nunca hacia arriba.
- Solo crear un template cuando se repite (servicios: 18 páginas, blog: 8). No inventar niveles de más: con 29 páginas, la sencillez gana.

## Componentes dumb (presentacionales)

- Reciben **todo por props** (texto, imágenes, links, variantes). Sin `fetch`, sin leer `content/` y sin conocer la ruta actual.
- Sin estado propio salvo UI puro y local (abrir/cerrar un menú o un FAQ). Eso va aislado en un componente pequeño con `"use client"`.
- Son **Server Components por defecto**. `"use client"` solo en el componente mínimo que lo necesite (menú móvil, acordeón, filtro de galería, formulario, tema de la barra).
- Los componentes "smart" (los que leen `content/`, deciden qué mostrar o llaman al backend) viven en `app/` o en el template, nunca en atoms/molecules.
- Props tipadas con TypeScript; variantes con una prop (`variant="primary"`), no con clases sueltas.

## Reglas de SEO (no negociables)

- Todo el contenido que Google debe indexar se renderiza en el servidor: nada de texto principal que dependa de JavaScript del cliente.
- Un solo `<h1>` por página, dentro del template. Los atoms/molecules reciben el nivel de heading por prop (`as="h2" | "h3"`).
- Las URLs públicas **no cambian**: se conservan los `.html` con `rewrites` en `next.config`. Ver `MIGRATION_PLAN.md`.
- Los links internos apuntan siempre a la URL canónica (`/` para la home, `/blog` para el blog; nunca `/index.html`).
- Título, description, canonical, Open Graph y JSON-LD salen de `content/` mediante la Metadata API, no de los componentes.
- Imágenes con `next/image`, `alt` descriptivo (nunca genérico o repetido) y `width`/`height` definidos.
- Textos de enlace descriptivos ("Ver servicio de grabado en metal"), no "Ver más".
- Nada de notas internas ni texto para el desarrollador en el contenido visible.

## Estilos y diseño

- **Design tokens** en `web/app/tokens.css` (única fuente de verdad). Capas: paleta → transparencias (`--white-a12`) → semánticos (`--text-muted`, `--line-dark`, `--accent`) → tipografía, radios, sombras y espaciado de sección.
- **Prohibido** escribir colores sueltos (`#hex`, `rgb()`, `rgba()`) en los CSS de componentes: usar tokens. Si falta uno, se agrega a `tokens.css` con nombre, no se escribe inline. Las variables locales de tema de un componente (`--card-bg: var(--white)`) sí se permiten.
- Tamaños de fuente solo de la escala `--fs-*`; radios `--radius-*`; padding vertical de secciones `--section-y` / `--section-y-sm`.
- Excepción: ilustraciones (colores de producto, no de interfaz) listadas en `scripts/check-tokens.mjs`. No agregar archivos a esa lista sin motivo.
- Verificar con `npm run lint:tokens` (falla si hay colores sueltos). Correrlo antes de cada commit.
- Texto sobre fondo oscuro: `--text-on-dark-*` (mín. 4.5:1). Texto sobre claro: `--text-strong/body/muted/subtle`.
- Una sola fuente de verdad para colores, tipografía y espaciados (tokens CSS / variables), usada por los atoms.
- La barra de navegación cambia de tema según la sección: sección clara → barra negra con logo blanco; sección oscura → barra blanca con logo negro. Se decide midiendo el fondo real de la sección.
- Logos y favicon: usar los SVG de `assets/img/` (`logo-inova-blanco.svg`, `logo-inova-negro.svg`) y los favicons de la raíz.
- Mobile first; probar siempre móvil y escritorio.

## Al crear o mover un componente

1. Decide su nivel (atom/molecule/organism/template) y justifícalo en una línea.
2. Define sus props y quita todo texto fijo que pertenezca a `content/`.
3. Verifica que su HTML renderizado coincide con el actual en estructura de headings y links.
4. No cambies contenido y estructura en el mismo paso: primero se migra igual, luego se mejora.
5. Revisa el resultado en el navegador (escritorio y móvil) antes de darlo por terminado.

## Next.js 16 (proyecto en `web/`)

Esta versión de Next trae cambios que pueden no coincidir con lo que se conoce de memoria (Cache Components y Partial Prefetching están activados). Antes de escribir código de rutas, metadata, rewrites/redirects o caché, leer la guía correspondiente en `web/node_modules/next/dist/docs/`.
