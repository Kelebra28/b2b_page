"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cookiesRoute, privacyRoute } from "@/content/legal";
import { OPEN_PREFERENCES_EVENT, readConsent, saveConsent } from "@/lib/consent";
import styles from "./CookieBanner.module.css";

/**
 * Atom (client): aviso de cookies. Aparece si el visitante aún no eligió, o cuando pulsa
 * «Preferencias de cookies» en el pie. Aceptar y rechazar tienen el mismo peso visual.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (readConsent() === null) setOpen(true);
    const reopen = () => {
      setOpen(true);
      requestAnimationFrame(() => firstButton.current?.focus());
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (v: "granted" | "denied") => {
    saveConsent(v);
    setOpen(false);
  };

  return (
    <section className={styles.banner} role="region" aria-label="Aviso de cookies">
      <p className={styles.text}>
        Usamos cookies de analítica para mejorar el sitio, solo si las aceptas. Más en nuestra{" "}
        <Link href={cookiesRoute}>política de cookies</Link> y el <Link href={privacyRoute}>aviso de privacidad</Link>.
      </p>
      <div className={styles.actions}>
        <button type="button" ref={firstButton} className={styles.button} onClick={() => choose("denied")}>
          Rechazar
        </button>
        <button type="button" className={styles.button} onClick={() => choose("granted")}>
          Aceptar
        </button>
      </div>
    </section>
  );
}
