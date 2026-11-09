"use client";

import { useEffect } from "react";
import { gtagSend, track } from "@/lib/analytics";
import { CONSENT_CHANGE_EVENT, readConsent, type Consent } from "@/lib/consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtagLoaded?: boolean;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

/**
 * Atom (client): Google Analytics 4 SOLO con consentimiento.
 * - Sin elección o con «rechazar»: no se descarga nada de Google Analytics.
 * - Con «aceptar»: se carga al instante si acaba de aceptar, o en la primera interacción en visitas siguientes.
 * - Si después rechaza: se desactiva el envío y se borran las cookies `_ga*` de este sitio.
 * Solo en producción.
 */
export function Analytics({ id }: { id: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const events = ["scroll", "click", "mousemove", "touchstart"] as const;

    const load = () => {
      if (window.gtagLoaded) return;
      window.gtagLoaded = true;
      events.forEach((e) => document.removeEventListener(e, load));
      window[`ga-disable-${id}`] = false;
      const s = document.createElement("script");
      s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      s.async = true;
      document.head.appendChild(s);
      gtagSend("js", new Date());
      gtagSend("config", id);
      // Eventos que esperaban a que cargara el script (p. ej. el clic que aceptó las cookies).
      (window.gaPending ?? []).splice(0).forEach(([name, params]) => gtagSend("event", name, params));
    };

    const disable = () => {
      window[`ga-disable-${id}`] = true;
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_")) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
        }
      });
    };

    const arm = () => events.forEach((e) => document.addEventListener(e, load, { passive: true, once: true }));
    if (readConsent() === "granted") arm();

    const onChange = (e: Event) => {
      const v = (e as CustomEvent<Consent>).detail;
      if (v === "granted") load();
      else disable();
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);

    // Clics en WhatsApp, teléfono y correo (en cualquier parte del sitio).
    const onLink = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const name = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)
        ? "click_whatsapp"
        : href.startsWith("tel:")
          ? "click_telefono"
          : href.startsWith("mailto:")
            ? "click_correo"
            : null;
      if (name) track(name, { link_url: href.split("?")[0], page_path: location.pathname });
    };
    document.addEventListener("click", onLink, true);
    return () => {
      document.removeEventListener("click", onLink, true);
      window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
      events.forEach((e) => document.removeEventListener(e, load));
    };
  }, [id]);
  return null;
}
