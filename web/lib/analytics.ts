import { readConsent } from "@/lib/consent";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gaPending?: [string, Params | undefined][];
  }
}

/** Envía un comando a gtag (necesita `arguments`, no un arreglo). */
export function gtagSend(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtag(..._a: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag(...args);
}

/**
 * Registra un evento de Google Analytics SOLO si la persona aceptó las cookies.
 * Si aceptó pero el script aún no carga, el evento espera en cola y sale al cargar.
 */
export function track(name: string, params?: Params) {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") return;
  if (readConsent() !== "granted") return;
  if (window.gtagLoaded) return gtagSend("event", name, params);
  (window.gaPending ??= []).push([name, params]);
}
