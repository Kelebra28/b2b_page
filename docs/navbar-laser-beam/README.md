# Barra "Laser Beam" (referencia para portar a Next)

Diseño pensado para el Header de la versión Next.js. No está activo en el sitio estático.
Nunca se probó en navegador (se colgó por un ciclo del MutationObserver, ya corregido en navbar.js).

- Rayo de progreso de scroll en el borde inferior, con cabezal en forma de destello.
- Indicador láser que se desliza entre links (hover/foco/sección activa).
- Dropdown con línea láser que se dibuja al abrir y rombo rojo en cada item.
- CTA de WhatsApp con punto verde "en línea" y destello periódico.
- Tema: barra negra sobre secciones claras, blanca sobre oscuras (--track y --ind-bg cambian).
- Respeta prefers-reduced-motion.

Al portar: Header como organismo; Beam, NavIndicator y NavDropdown como componentes; solo el indicador y el rayo necesitan "use client".
