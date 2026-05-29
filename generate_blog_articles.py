import re

template = """<!DOCTYPE html>
<html lang="es-MX">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>{title} | Blog Laser Inova</title>
  <meta name="description" content="{description}" />
  <meta name="keywords" content="{keywords}" />
  <link rel="canonical" href="https://www.laserinova.com/blog/{filename}" />

  <!-- Open Graph -->
  <meta property="og:locale" content="es_MX" />
  <meta property="og:title" content="{title} | Laser Inova" />
  <meta property="og:description" content="{description}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://www.laserinova.com/blog/{filename}" />
  <meta property="og:site_name" content="Laser Inova" />
  <meta property="og:image" content="https://www.laserinova.com/inova_laser_og_ready.png" />
  
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="icon" href="../favicon_inova_laser.svg" type="image/svg+xml" />
  <link rel="icon" href="../favicon_inova_laser.png" type="image/png" sizes="32x32" />

  <!-- Preconnect origins for FontAwesome -->
    <link rel="preconnect" href="https://kit.fontawesome.com" crossorigin />
    <link rel="preconnect" href="https://ka-f.fontawesome.com" crossorigin />
    <script src="https://kit.fontawesome.com/bebc49f862.js" crossorigin="anonymous" defer></script>

  <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "{title}",
      "description": "{description}",
      "image": "https://www.laserinova.com/inova_laser_og_ready.png",
      "url": "https://www.laserinova.com/blog/{filename}",
      "publisher": {{
        "@type": "Organization",
        "name": "Laser Inova",
        "logo": {{
          "@type": "ImageObject",
          "url": "https://www.laserinova.com/inova_laser_og_ready.png"
        }}
      }}
    }}
  </script>

  <link rel="stylesheet" href="../style.css" />
  <link rel="stylesheet" href="../subpages/subpages.css" />
</head>

<body>
  <a class="skip-link" href="#main-content">Saltar al contenido principal</a>

  <!-- Header -->
  <header class="site-header" id="top">
    <div class="container header-shell">
      <a class="brand" href="../index.html">
        <img src="../assets/img/laser_inova_navbar_mas_grande.png" alt="Logo Laser Inova" width="170" height="170" fetchpriority="high" />
      </a>

      <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span></span><span></span><span></span>
      </button>

      <nav class="site-nav" id="site-nav">
        <ul class="nav-list">
          <li><a href="../index.html#hero">Inicio</a></li>
          <li><a href="../index.html#soluciones">Soluciones Corporativas</a></li>
          <li><a href="../index.html#negocios">Servicios de Maquila</a></li>
          <li><a href="../index.html#promocionales">Plotter e Impresión</a></li>
          <li><a href="../index.html#boutique">Regalos Personalizados</a></li>
          <li><a target="_blank" href="https://tienda.promocionalesweb.com/laserinova">Productos</a></li>
          <li><a href="../index.html#galeria">Galería</a></li>
          <li><a href="./index.html">Blog</a></li>
          <li><a href="../index.html#contacto">Contacto</a></li>
        </ul>
      </nav>

      <a class="header-cta" href="https://wa.me/525579398727?text=Hola,%20busco%20informaci%C3%B3n" target="_blank" rel="noopener">WhatsApp</a>
    </div>
  </header>

  <main id="main-content">
    <section class="subpage-hero" id="hero">
      <div class="subpage-hero-bg"></div>
      <div class="container subpage-hero-grid">
        <div class="subpage-hero-copy">
          <span class="eyebrow">{eyebrow}</span>
          <h1>{h1}</h1>
          <p class="subpage-hero-text">{hero_text}</p>
          <div class="subpage-hero-actions">
            <a class="btn btn-primary" href="https://wa.me/525579398727?text={whatsapp_message}" target="_blank">Escribir por WhatsApp</a>
          </div>
        </div>
        <div class="subpage-hero-visual">
          <div class="subpage-hero-image-frame">
            <!-- Placeholder Image for SEO -->
            <img src="https://via.placeholder.com/600x450.png?text=Placeholder+{image_alt}" alt="{image_alt}" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <section class="section subpage-content">
      <div class="container subpage-intro">
        <h2>{h2_intro}</h2>
        <p>{p_intro}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="subpage-card-grid subpage-card-grid-3">
          {benefits}
        </div>
      </div>
    </section>
  </main>

  <a href="https://wa.me/525579398727?text={whatsapp_message}" class="whatsapp-float" target="_blank" rel="noopener">
    <i class="fa-brands fa-whatsapp"></i><span>Ventas</span>
  </a>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container footer-shell">
      <div class="footer-grid">
        <div class="footer-brand-block">
          <a href="../index.html" class="footer-logo">
            <img src="../assets/img/laser_inova_navbar_mas_grande.png" alt="Logo Laser Inova" width="170" height="170" loading="lazy" decoding="async" />
          </a>
          <p class="footer-brand-text">Maquila, grabado corporativo, publicidad gran formato y regalos en CDMX.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Laser Inova. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>

  <script src="../main.js"></script>
</body>
</html>
"""

articles = [
    {
        "filename": "impresion-publicidad.html",
        "title": "Impresión para publicidad B2B y corporativa",
        "description": "Descubre cómo la impresión en gran formato y soluciones visuales para agencias y empresas mejoran tu impacto. B2B CDMX.",
        "keywords": "impresion para publicidad, impresion gran formato, lonas, vinil publicitario, impresion comercial CDMX",
        "eyebrow": "Publicidad · Impresión · Agencias",
        "h1": "La Impresión para Publicidad y sus Ventajas B2B",
        "hero_text": "En Laser Inova somos especialistas en escalar tus proyectos publicitarios. Ya sea para eventos masivos, puntos de venta o campañas corporativas, la impresión en gran formato entrega resultados consistentes y de alto impacto.",
        "whatsapp_message": "Hola,%20me%20interesa%20la%20impresi%C3%B3n%20para%20publicidad%20y%20agencias",
        "image_alt": "Impresion+Publicidad",
        "h2_intro": "Impacto Visual para Campañas y Marcas",
        "p_intro": "Para las agencias y departamentos de mercadotecnia, contar con un proveedor que resuelva proyectos de lona, vinil de corte y exhibidores en alta resolución es vital. Trabajamos bajo un esquema de producción escalable capaz de atender las métricas corporativas y exigencias de marca más estrictas.",
        "benefits": """
          <article class="subpage-info-card">
            <i class="fa-solid fa-print"></i>
            <h3>Gran Formato</h4>
            <p>Impresión de lonas y materiales para espectaculares garantizando densidad de color y durabilidad.</p>
          </article>
          <article class="subpage-info-card">
            <i class="fa-solid fa-tags"></i>
            <h3>Calidad Comercial</h4>
            <p>Atención enfocada en agencias que buscan resolución en displays, material POP y retail.</p>
          </article>
          <article class="subpage-info-card">
            <i class="fa-solid fa-industry"></i>
            <h3>Tiempos y Maquila</h4>
            <p>Cumplimos con cronogramas exigentes, con validación de arte y pruebas de color opcionales.</p>
          </article>"""
    },
    {
        "filename": "impresion-vehicular.html",
        "title": "Impresión para Publicidad en Autos y Flotillas",
        "description": "Rotulación y publicidad en camionetas corporativas. Lleva tu marca a todas partes con vinil fundido y calidad comercial.",
        "keywords": "impresion publicidad autos, rotulacion flotillas, publicidad vehicular, vinil para vehiculos",
        "eyebrow": "Flotillas · Rotulación · Branding",
        "h1": "Impresión para Publicidad en Autos y Flotillas",
        "hero_text": "Transforma los vehículos de tu empresa en anuncios rodantes 24/7. Un esquema rentable de branding corporativo con viniles de larga duración y resistencia a la intemperie.",
        "whatsapp_message": "Hola,%20me%20interesa%20la%20rotulaci%C3%B3n%20vehicular%20y%20flotillas",
        "image_alt": "Publicidad+Vehiculos",
        "h2_intro": "Lleva la Identidad de tu Empresa a la Calle",
        "p_intro": "Un vehículo sin rotular es un espacio publicitario perdido. Imprimimos el material con tintas optimizadas para resistir lluvia y rayos UV, protegiendo las pinturas originales y cumpliendo especificaciones de identidad.",
        "benefits": """
          <article class="subpage-info-card">
            <i class="fa-solid fa-car"></i>
            <h3>Rotulación Especializada</h3>
            <p>Vinil microperforado para cristales y vinil fundido para carrocerías con adaptabilidad a curvas.</p>
          </article>
                   <article class="subpage-info-card">
            <i class="fa-solid fa-truck"></i>
            <h3>Flotillas y Carga</h3>
            <p>Estandarización de imagen e impresión masiva para cientos de vehículos utilitarios sin perder el tono de marca.</p>
          </article>
                   <article class="subpage-info-card">
            <i class="fa-solid fa-eye"></i>
            <h3>Impacto Masivo</h3>
            <p>Un costo por impresión bajo comparado con otros medios, ideal para logística con rutas establecidas.</p>
          </article>"""
    },
    {
        "filename": "grabado-en-vivo-activaciones.html",
        "title": "Grabado en Vivo para Activaciones y Eventos",
        "description": "Personalización y grabado láser en sitio para activaciones de marca, ferias corporativas y presenciales.",
        "keywords": "grabado en vivo, activaciones de marca, grabado in situ, eventos premium CDMX",
        "eyebrow": "Eventos · Experiencia · Marca",
        "h1": "Grabado en Vivo como Activación de Marca",
        "hero_text": "Eleva la experiencia presencial de tu evento. Llevamos nuestro equipo de grabado directamente a sedes y recintos para personalizar termos, plumas y promocionales frente a los ojos del público.",
        "whatsapp_message": "Hola,%20quiero%20cotizar%20grabado%20en%20vivo%20para%20activaci%C3%B3n",
        "image_alt": "Grabado+Vivo+Eventos",
        "h2_intro": "El Marketing Experiencial a Otro Nivel",
        "p_intro": "Hacer que tus clientes sientan una conexión instantánea con tu marca es posible si ofreces personalización en tiempo real. Esta experiencia crea recuerdos perdurables; el asistente no solo recibe un obsequio, es parte fundamental del proceso de manufactura.",
        "benefits": """
          <article class="subpage-info-card">
            <i class="fa-solid fa-users"></i>
            <h3>Interacción y Engagement</h3>
            <p>Retención visual alta en ferias o stands, logrando que el público espere por su obsequio personalizado con su nombre.</p>
          </article>
          <article class="subpage-info-card">
            <i class="fa-solid fa-gears"></i>
            <h3>Infraestructura Segura</h3>
            <p>Llevamos equipos y un montaje que cumple con especificaciones de instalaciones para hoteles o exposiciones en CDMX.</p>
          </article>
          <article class="subpage-info-card">
            <i class="fa-solid fa-medal"></i>
            <h3>Resultados Premium</h3>
            <p>Agrega alto valor percibido en cuestión de segundos sobre metal, vidrio u otros materiales.</p>
          </article>"""
    },
    {
        "filename": "grabado-metal-volumen.html",
        "title": "Grabado de Metal en Volumen | Maquila Especializada",
        "description": "Trabajamos dijes, plaquitas, llaveros y artículos promocionales de metal en alto volumen. Excelencia B2B.",
        "keywords": "grabado de metal en volumen, dijes grabados, plaquitas para mascotas metal, maquila grabado laser metal",
        "eyebrow": "Maquila · Mayoreo · Volumen",
        "h1": "Grabado de Metal en Volumen",
        "hero_text": "El metal transmite durabilidad, exclusividad y resistencia. Procesamos lotes de cientos a miles de placas pequeñas, dijes corporativos, llaveros ejecutivos y piezas técnicas con extrema precisión por láser.",
        "whatsapp_message": "Hola,%20quiero%20cotizar%20grabado%20de%20metal%20por%20volumen",
        "image_alt": "Grabado+Metal+Mayoristas",
        "h2_intro": "Soluciones Industriales y Promocionales Premium",
        "p_intro": "Nuestro sistema permite manejar matrices para repetir milimétricamente diseños en piezas de escalas menores. Esto es valioso para fabricantes que buscan marcas en sus propias herramientas o agencias de regalos armando kits extensos.",
        "benefits": """
          <article class="subpage-info-card">
            <i class="fa-solid fa-cubes"></i>
            <h3>Maquila Masiva</h3>
            <p>El grabado en fibra óptica garantiza que incluso tipografías diminutas en dijes y piezas B2B resulten 100% legibles en todo el lote.</p>
          </article>
          <article class="subpage-info-card">
            <i class="fa-solid fa-check-double"></i>
            <h3>Marcaje Técnico</h3>
            <p>Números de serie, códigos QR, logotipos de maquinaria e información trazable, con acabados indelebles sobre acero, aluminio y latón.</p>
          </article>
          <article class="subpage-info-card">
            <i class="fa-solid fa-gem"></i>
            <h3>Calidad para Mayoristas</h3>
            <p>Fabricación para revendedores de regalos promocionales. Entregas en plazos pactados y soporte técnico completo.</p>
          </article>"""
    },
    {
        "filename": "grabado-madera-eventos.html",
        "title": "Grabado de Madera para Bodas y Eventos Premium",
        "description": "Toques personalizados y orgánicos para tus celebraciones. Cajas, centros de mesa y recuerdos de madera para eventos.",
        "keywords": "grabado de madera para bodas, recuerdos de madera grabada, eventos premium, madera cortada con laser",
        "eyebrow": "Bodas · Eventos · Boutique",
        "h1": "Grabado de Madera para Eventos y Bodas",
        "hero_text": "Añade un toque cálido y personal a tu ocasión especial. Fabricamos cortes y grabados en madera fina, ideal para centros de mesa, recuerdos de bodas, bautizos, menús premium y recepciones corporativas exclusivas.",
        "whatsapp_message": "Hola,%20quiero%20cotizar%20grabado%20de%20madera%20para%20un%20evento",
        "image_alt": "Grabado+Madera+Eventos",
        "h2_intro": "Diseños Elegantes con Estética Orgánica",
        "p_intro": "La madera es un material sumamente noble que conecta con la sobriedad y la elegancia. Proveemos soluciones completas a Wedding Planners, de forma eficiente e integrada para coordinar colores, tipografías y el estilo integral de todo evento.",
        "benefits": """
          <article class="subpage-info-card">
            <i class="fa-solid fa-heart"></i>
            <h3>Bodas y Recepciones</h3>
            <p>Libros de invitados, números de mesa en madera MDF premium e identificadores cálidos para los invitados.</p>
          </article>
          <article class="subpage-info-card">
            <i class="fa-solid fa-tree"></i>
            <h3>Detalles Finos</h3>
            <p>El láser deja los característicos bordes oscurecidos generando gran contraste visual ideal para decoraciones vintage y rústicas.</p>
          </article>
          <article class="subpage-info-card">
            <i class="fa-solid fa-handshake"></i>
            <h3>Alianza con Organizadores</h3>
            <p>Tratamos directamente con agencias que realizan muchos eventos al año, simplificando su producción y reduciendo costos por pedido.</p>
          </article>"""
    }
]

for art in articles:
    with open(f"blog/{art['filename']}", "w") as f:
        f.write(template.format(**art))

# Also read sitemap and inject new URLs before closing </urlset>
with open("sitemap.xml", "r") as f:
    sitemap = f.read()

sitemap_additions = "\n".join([f"""  <url>
    <loc>https://www.laserinova.com/blog/{a['filename']}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>""" for a in articles])

# Replace old blog.html specifically again, just in case
sitemap = sitemap.replace("<loc>https://www.laserinova.com/blog.html</loc>", "<loc>https://www.laserinova.com/blog/index.html</loc>")

sitemap = sitemap.replace("</urlset>", sitemap_additions + "\n</urlset>")

with open("sitemap.xml", "w") as f:
    f.write(sitemap)
