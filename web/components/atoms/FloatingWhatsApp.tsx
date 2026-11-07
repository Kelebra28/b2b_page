"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./FloatingWhatsApp.module.css";

type Props = {
  label: string;
  /** Número con lada de país, sin "+" (p. ej. 525544730004). */
  number: string;
  messages: {
    fallback: string;
    paths: Record<string, string>;
    sections: Record<string, string>;
  };
};

/**
 * Atom (client): botón flotante de WhatsApp con mensaje según el contexto.
 * - En servicios y artículos usa el mensaje de esa página.
 * - En la home cambia según la sección que se esté viendo.
 * - En cualquier otro lugar usa el mensaje general.
 */
export function FloatingWhatsApp({ label, number, messages }: Props) {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  // En la home: detecta qué sección ocupa el centro de la pantalla.
  useEffect(() => {
    if (pathname !== "/") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection((e.target as HTMLElement).id || null);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      setSection(null);
    };
  }, [pathname]);

  const text =
    messages.paths[pathname] ?? (pathname === "/" && section ? messages.sections[section] : undefined) ?? messages.fallback;
  const href = `https://wa.me/${number}?text=${text}`;

  return (
    <aside aria-label="Contacto por WhatsApp">
    <a className={styles.fab} href={href} target="_blank" rel="noopener" aria-label={`${label} por WhatsApp`}>
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z" />
        <path d="M9 9.2c.3 2.4 2.4 4.6 5.4 5.6l1.1-1.3-1.8-.9-.8.6c-.9-.4-1.7-1.2-2.1-2.1l.6-.8-.9-1.8z" fill="currentColor" stroke="none" />
      </svg>
      <span className={styles.tip} aria-hidden="true">{label}</span>
    </a>
    </aside>
  );
}
