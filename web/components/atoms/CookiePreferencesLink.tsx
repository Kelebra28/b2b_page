"use client";

import { OPEN_PREFERENCES_EVENT } from "@/lib/consent";

/** Atom (client): botón con aspecto de enlace que vuelve a abrir el aviso de cookies. */
export function CookiePreferencesLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}>
      {children}
    </button>
  );
}
