# Plan SEO de laserinova.com (nov 2026 – feb 2027)

Objetivo: que Laser Inova aparezca arriba en Google para corte láser, grabado láser, impresión plotter, impresión UV de cama plana y vinil, en CDMX y alrededores.

Punto de partida (Search Console, 10 ago – 9 nov 2026): 1.136 clics, 35,9 mil impresiones, CTR 3,2 %, posición media 11. El sitemap tenía 1.154 URLs y solo 28 estaban indexadas.

## Ya hecho (en `main`)
- Sitemap acotado: `/tienda`, categorías y hasta 100 productos con foto. El resto de fichas lleva `noindex, follow`.
- Titles y descripciones de 6 servicios (grabado_metal, grabado_laser, plotter_impresion, maquila_volumen, corte_laser_metal, kits_bienvenida).
- Páginas nuevas: `marcaje_laser_acero` y `corte_laser_mdf_acrilico`, con enlaces en el menú y la portada.
- Blog: plantilla de artículo editorial, 8 artículos migrados y portadas propias en `.webp`.

## Reglas de contenido (siempre)
- No poner precios, plazos, mínimos, certificaciones ni tolerancias salvo que los confirme Laser Inova.
- Solo afirmar capacidades confirmadas: pruebas previas, números de serie consecutivos, corte y grabado en la misma pieza, UV a color, **DTF UV en formato de hasta 90 × 30 cm**, ayuda con archivos (puede tener costo extra), atención en CDMX y zona metropolitana, y **envíos a todo el país cotizados por FedEx, DHL o Estafeta** (el costo del envío se cotiza aparte).
- Un solo `<h1>` por página, enlaces internos con texto descriptivo, imágenes con `alt` real, `npm run lint:tokens` antes de cada commit.

## Mes 1 (noviembre): publicar y reforzar lo que ya está en página 2
| Tarea | Por qué | Quién |
|---|---|---|
| Reenviar `/sitemap.xml` y pedir indexación de las 2 páginas nuevas y los 8 artículos | Que Google vea los cambios | Usuario (Search Console) |
| Reforzar `grabado_metal` (8.493 impresiones, pos. 12,5): tabla de materiales, FAQ visible, enlaces a marcaje y al blog | Es la página con más demanda | Claude |
| Reforzar `grabado_laser` (6.009 imp., pos. 9,8): subir "grabado láser" (pos. 15) con contenido de apoyo | Consulta genérica de alto volumen | Claude |
| Reforzar `impresion_cama_plana_uv` (929 imp., pos. 12) con contenido propio sobre UV | Servicio con hueco | Claude |
| Reforzar `plotter_impresion` (CTR 0,8 %): enfocarla en lonas y plotter de corte | "plotter de lona" sale en pos. 3-8 con 0 clics | Claude |
| Revisar menú y portada ya publicados | Confirmar que las 2 páginas nuevas se ven | Usuario / Claude |
| **Desbloquear la ficha de Google Business** (apelar la suspensión) y luego completarla: categorías, servicios, fotos reales de `/img/trabajos`, horario, teléfono, enlace | Muchas búsquedas son locales ("cerca de mi", "cdmx"); con la ficha bloqueada no aparecemos en el mapa | Usuario |

## Mes 2 (diciembre): páginas nuevas por servicio y material
Prioridad según búsquedas reales en Search Console:
1. **Grabado en vidrio y copas** ("donde grabar copas de cristal", "grabado en vidrio cdmx").
2. **Corte láser: servicio general en CDMX** ("servicio de corte láser", "maquila corte láser metal").
3. **Impresión en acrílico y MDF con UV** ("impresión en acrílico cdmx", "impresión sobre acrílico df").
4. **Grabado de termos** ("grabado de termos cdmx", "grabado láser en termos cerca de mi") — hoy se cubre dentro de `grabado_metal`.
5. **DTF UV** (confirmado, hasta 90 × 30 cm): crear página propia. En Search Console no apareció demanda de DTF entre las 500 consultas principales, así que es una apuesta de servicio nuevo, no de demanda ya existente: conviene enlazarla desde UV, vidrio, termos y acrílico y medirla a las 6-8 semanas.
6. Páginas por zona (CDMX / Azcapotzalco / Santa Fe) solo si hay contenido propio por zona; no duplicar texto.

Cada página nueva: archivo JSON en `web/content/services/`, registro en `index.ts`, enlace en menú y portada, 2-3 enlaces desde servicios y artículos relacionados.

## Mes 3 (enero): tienda y autoridad
- **Categorías de la tienda:** texto propio en cada una (materiales, técnicas, usos), enlaces a ellas desde los servicios y el blog.
- **Productos:** subir `INDEXABLE_PRODUCTS` (en `web/lib/catalog.ts`) conforme tengan foto y texto propios; no abrir las ~1.100 de golpe.
- **Reseñas:** pedir reseñas en Google a clientes reales y responderlas.
- **Casos reales:** ya hay 18 fotos reales en `web/public/img/trabajos` (`.webp`). Convertir 5-6 en casos con descripción (qué se hizo, material, técnica) y usar esas fotos como portadas de artículos en lugar de las ilustraciones.
- **Enlaces externos:** directorios locales, proveedores y clientes que mencionen el sitio con un enlace.

## Blog (continuo, sin prisa)
- 1 o 2 artículos al mes, solo sobre búsquedas reales. Ideas: qué archivo preparar para corte láser, diferencias entre UV y vinil, cómo elegir material para señalética.
- Actualizar fechas y datos de los artículos existentes cuando cambien.

## Qué medir (Search Console, cada 2 semanas)
| Indicador | Hoy | Meta a 3 meses |
|---|---|---|
| Páginas indexadas | 28 | las del sitemap acotado (~150) |
| Posición de `grabado_metal` | 12,5 | por debajo de 8 |
| Posición de `grabado_laser` | 9,8 | por debajo de 6 |
| CTR medio | 3,2 % | por encima de 4 % |
| Impresiones totales | 35,9 mil | crecimiento sostenido |

## Pendiente de decisión del usuario
1. ~~¿DTF es un servicio?~~ Sí: DTF UV hasta 90 × 30 cm. Falta confirmar qué se imprime y sobre qué superficies (vidrio, metal, acrílico, termos…).
2. ~~¿Envíos?~~ Sí, a todo el país por FedEx, DHL o Estafeta, cotizado aparte.
3. ~~¿Fotos reales?~~ Sí, 18 en `/img/trabajos`.
4. Google Business: el usuario lo gestiona, pero la ficha está bloqueada. Ver el motivo de la suspensión en business.google.com y apelar.
5. ¿Atienden zonas específicas más allá de CDMX y zona metropolitana?
