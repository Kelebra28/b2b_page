/** Cliente del endpoint del CRM que registra una solicitud de cotización (servidor a servidor, con la misma llave del catálogo). */
export type QuoteRequestPayload = {
  name: string;
  phone: string;
  email: string;
  company: string;
  notes: string;
  items: { slug: string; color: string | null; qty: number }[];
};

/** Devuelve el folio y a quién se asignó, o null si el CRM no pudo registrarla (el llamador avisa por correo). */
export async function postQuoteRequest(payload: QuoteRequestPayload): Promise<{ folio: string; assignedTo: string | null } | null> {
  const base = process.env.CATALOG_API_URL;
  const key = process.env.CATALOG_API_KEY;
  if (!base || !key) return null;
  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/public/v1/quote-requests`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error("[solicitud] el CRM respondió", res.status);
      return null;
    }
    const data = (await res.json()) as { folio?: string; assignedTo?: string };
    return data.folio ? { folio: data.folio, assignedTo: data.assignedTo ?? null } : null;
  } catch (err) {
    console.error("[solicitud] no se pudo contactar al CRM", err);
    return null;
  }
}
