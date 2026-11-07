"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cartActions, useCartContact, type CartItem } from "@/lib/cart-store";
import styles from "./QuoteRequestForm.module.css";

type Props = { items: CartItem[]; notes: string; onBack: () => void; onSent: (folio: string | null) => void };
type Status = "idle" | "sending" | "invalid" | "limited" | "error";

/** Molecule (cliente): datos de contacto para que ventas dé seguimiento a la cotización. Envía a /api/tienda/solicitud. */
export function QuoteRequestForm({ items, notes, onBack, onSent }: Props) {
  const contact = useCartContact();
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const website = (new FormData(e.currentTarget).get("website") as string) ?? "";
    setStatus("sending");
    try {
      const res = await fetch("/api/tienda/solicitud", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          notes,
          website,
          items: items.map((i) => ({ slug: i.slug, name: i.name, model: i.model, color: i.color, qty: i.qty })),
        }),
      });
      if (res.status === 422) return setStatus("invalid");
      if (res.status === 429) return setStatus("limited");
      if (!res.ok) return setStatus("error");
      const data = (await res.json()) as { folio?: string | null };
      onSent(data.folio ?? null);
    } catch {
      setStatus("error");
    }
  }

  const bad = status === "invalid" || undefined;
  const set = (k: keyof typeof contact) => (e: React.ChangeEvent<HTMLInputElement>) => cartActions.setContact({ [k]: e.target.value });

  const pieces = items.reduce((n, i) => n + i.qty, 0);

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.fields}>
        <button type="button" className={styles.back} onClick={onBack}>← Volver a mi cotización</button>
        <h3 className={styles.title}>¿Dónde te contactamos?</h3>
        <p className={styles.lead}>Te mandamos tu cotización con precios y tiempos de entrega.</p>

        <details className={styles.summary}>
          <summary>
            <span><strong>{items.length} {items.length === 1 ? "producto" : "productos"}</strong> · {pieces.toLocaleString("es-MX")} {pieces === 1 ? "pieza" : "piezas"}</span>
            <span className={styles.see}>Ver</span>
          </summary>
          <ul>
            {items.map((i) => (
              <li key={i.key}>
                <span className={styles.thumb}>{i.image ? <Image src={i.image} alt="" fill sizes="48px" /> : null}</span>
                <span className={styles.info}>
                  <strong>{i.name}</strong>
                  <small>Mod. {i.model}{i.color ? ` · ${i.color.charAt(0) + i.color.slice(1).toLowerCase()}` : ""}</small>
                </span>
                <span className={styles.qty}>{i.qty.toLocaleString("es-MX")} {i.qty === 1 ? "pza" : "pzas"}</span>
              </li>
            ))}
          </ul>
        </details>

        <label className={styles.field}>
          <span>Nombre *</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} value={contact.name} onChange={set("name")} aria-invalid={bad} />
        </label>
        <label className={styles.field}>
          <span>WhatsApp o teléfono *</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} placeholder="55 1234 5678" value={contact.phone} onChange={set("phone")} aria-invalid={bad} />
        </label>
        <label className={styles.field}>
          <span>Correo <small>(recomendado)</small></span>
          <input name="email" type="email" autoComplete="email" maxLength={150} placeholder="tu@empresa.com" value={contact.email} onChange={set("email")} aria-invalid={bad} />
        </label>
        <label className={styles.field}>
          <span>Empresa <small>(opcional)</small></span>
          <input name="company" type="text" autoComplete="organization" maxLength={150} value={contact.company} onChange={set("company")} />
        </label>
        {/* Honeypot: invisible para personas */}
        <input className={styles.trap} name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        {status === "invalid" && <p className={styles.error} role="alert">Revisa tu nombre y escribe un teléfono (8 dígitos o más) o un correo válido.</p>}
        {status === "limited" && <p className={styles.error} role="alert">Demasiados envíos seguidos. Intenta de nuevo en unos minutos.</p>}
        {status === "error" && <p className={styles.error} role="alert">No pudimos enviarla. Intenta otra vez o escríbenos por WhatsApp.</p>}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.send} disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : <>Enviar solicitud <span aria-hidden="true">→</span></>}
        </button>
        <p className={styles.legal}>Basta con teléfono <em>o</em> correo. Al enviar aceptas nuestro <Link href="/aviso-de-privacidad" target="_blank">aviso de privacidad</Link>; usamos tus datos solo para cotizarte.</p>
      </div>
    </form>
  );
}
