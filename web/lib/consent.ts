/** Preferencia de cookies del visitante (se guarda solo en su navegador). */
export const CONSENT_KEY = "laserinova-consent";
export type Consent = "granted" | "denied";

export const OPEN_PREFERENCES_EVENT = "open-cookie-preferences";
export const CONSENT_CHANGE_EVENT = "consent-change";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* navegación privada: se ignora */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}
