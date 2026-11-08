"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Atom (client, sin UI): desplazamiento fiable a anclas (#galeria, #contacto…) y al inicio.
 * - Los enlaces a la misma página se resuelven aquí, sin esperar a la red de Next.
 * - Al llegar desde otra página con #ancla, se desplaza al cargar.
 * - Si el layout cambia mientras se desplaza (imágenes que cargan), re-alinea hasta estabilizarse.
 *   Se cancela en cuanto la persona mueve la rueda, toca la pantalla o usa el teclado.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let timers: number[] = [];
    let cancelled = false;
    const cancel = () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const go = (hash: string, smooth: boolean) => {
      cancel();
      cancelled = false;
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const find = () => (id ? document.getElementById(id) : null);
      // "auto" obedecería el `scroll-behavior: smooth` del CSS: al llegar desde otra página debe ser salto directo ("instant").
      const align = (behavior: ScrollBehavior) => {
        const el = find();
        if (el) el.scrollIntoView({ behavior, block: "start" });
        else if (!id) window.scrollTo({ top: 0, behavior });
      };
      align(smooth && !reduce ? "smooth" : "instant");
      // Correcciones cuando el layout se asienta (imágenes y fuentes).
      const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      for (const ms of [700, 1400, 2400]) {
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            const el = find();
            const off = el ? el.getBoundingClientRect().top - pad : -window.scrollY;
            if (Math.abs(off) > 8) align("instant");
          }, ms),
        );
      }
    };

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.origin !== location.origin || a.pathname !== location.pathname) return;
      if (a.search !== location.search || (!a.hash && a.pathname !== "/")) return;
      e.preventDefault();
      e.stopPropagation(); // que el <Link> de Next no navegue/restaure scroll por su cuenta
      history.pushState(null, "", a.pathname + a.search + a.hash);
      go(a.hash, true);
    };

    const onPop = () => go(location.hash, false);
    const stopEvents = ["wheel", "touchstart", "keydown"] as const;

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    stopEvents.forEach((ev) => window.addEventListener(ev, cancel, { passive: true }));

    if (location.hash) timers.push(window.setTimeout(() => go(location.hash, false), 50));

    return () => {
      cancel();
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      stopEvents.forEach((ev) => window.removeEventListener(ev, cancel));
    };
  }, [pathname]);

  return null;
}
