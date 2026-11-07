"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./HeaderShell.module.css";

type Props = {
  brand: ReactNode;
  nav: ReactNode;
  cta: ReactNode;
  /** Botón del carrito de cotización (opcional). */
  cart?: ReactNode;
};

/** Luminancia (0-255) del primer fondo no transparente del elemento o sus padres. */
function backgroundLuminance(el: Element | null): number {
  while (el) {
    const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if (m && (m.length < 4 || parseFloat(m[3]) > 0.5)) {
      const [r, g, b] = m.map(Number);
      return 0.299 * r + 0.587 * g + 0.114 * b;
    }
    el = el.parentElement;
  }
  return 0; // el body es oscuro por defecto
}

/**
 * Molecule (client): cáscara de la barra. Maneja
 *  - tema: barra negra sobre secciones claras, blanca sobre oscuras
 *  - estado compacto al hacer scroll
 *  - rayo de progreso de scroll (variable CSS --p)
 *  - menú móvil
 * Recibe marca, navegación y CTA ya renderizados desde el servidor.
 */
export function HeaderShell({ brand, nav, cta, cart }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [bar, setBar] = useState<"black" | "white">("white");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Tema según la sección que queda bajo la barra
  useEffect(() => {
    const sections = document.querySelectorAll("main section, main [data-bar-theme], footer");
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const forced = (entry.target as HTMLElement).dataset.barTheme;
          const dark =
            forced === "dark" ||
            (forced !== "light" &&
              (backgroundLuminance(entry.target) < 128 || entry.target.tagName === "FOOTER"));
          // sección oscura -> barra blanca; sección clara -> barra negra
          setBar(dark ? "white" : "black");
        }
      },
      { rootMargin: "-84px 0px -80% 0px", threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Scroll: compacto + rayo de progreso
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ref.current?.style.setProperty("--p", p.toFixed(4));
      setScrolled(window.scrollY > 16);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Cerrar menú móvil con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      ref={ref}
      className={styles.shell}
      data-bar={bar}
      data-scrolled={scrolled}
      data-open={open}
    >
      <div className={styles.inner}>
        <div className={styles.brand} onClick={() => setOpen(false)}>
          {brand}
        </div>
        <div
          id="site-nav"
          className={styles.nav}
          onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
        >
          {nav}
        </div>
        <div className={styles.cta}>{cart}{cta}</div>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={styles.beam} aria-hidden="true">
        <span className={styles.beamFill} />
      </div>
    </header>
  );
}
