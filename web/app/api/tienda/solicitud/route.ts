import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sameOrigin } from "@/lib/request-guard";
import { postQuoteRequest } from "@/lib/quote-request";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const MAX_BODY_BYTES = 30_000;
const MAX_ITEMS = 40;

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

/**
 * Solicitud de cotización del carrito. Hace dos cosas:
 *  1) la registra en el CRM (cliente + cotización en borrador con folio WEB-…), y
 *  2) avisa a ventas por correo (Resend), para que ningún cliente se pierda aunque el CRM falle.
 * Responde ok si al menos una de las dos funcionó.
 */
export async function POST(request: Request) {
  if (!sameOrigin(request)) return Response.json({ ok: false, error: "Solicitud no permitida" }, { status: 403 });

  // 5 solicitudes por IP cada 10 minutos.
  const limit = rateLimit(`solicitud:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return Response.json({ ok: false, error: "Demasiados envíos. Intenta de nuevo en unos minutos." }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return Response.json({ ok: false, error: "Solicitud demasiado grande" }, { status: 413 });
    body = JSON.parse(raw);
    if (typeof body !== "object" || body === null || Array.isArray(body)) throw new Error("formato");
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  // Honeypot anti-spam: si trae texto, finge éxito sin registrar nada.
  if (typeof body.website === "string" && body.website.trim() !== "") return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const company = clean(body.company, 150);
  const email = clean(body.email, 150).toLowerCase();
  const phone = clean(body.phone, 30).replace(/[^\d+()\-\s.]/g, "");
  const notes = clean(body.notes, 600);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneOk = phone.replace(/\D/g, "").length >= 8;

  const rawItems = Array.isArray(body.items) ? (body.items as Record<string, unknown>[]) : [];
  const items = rawItems
    .map((i) => ({
      slug: clean(i?.slug, 80),
      name: clean(i?.name, 160),
      model: clean(i?.model, 60),
      color: i?.color ? clean(i.color, 60) : null,
      qty: Math.floor(Number(i?.qty)),
    }))
    .filter((i) => /^[a-z0-9-]{1,80}$/.test(i.slug) && Number.isFinite(i.qty) && i.qty >= 1 && i.qty <= 1_000_000);

  if (!name || (!emailOk && !phoneOk) || items.length < 1 || items.length > MAX_ITEMS || items.length !== rawItems.length) {
    return Response.json({ ok: false, error: "Datos inválidos" }, { status: 422 });
  }

  // 1) CRM
  const saved = await postQuoteRequest({ name, phone: phoneOk ? phone : "", email: emailOk ? email : "", company, notes, items: items.map(({ slug, color, qty }) => ({ slug, color, qty })) });

  // 2) Aviso por correo a ventas
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  let emailed = false;
  if (RESEND_API_KEY) {
    const lines = items.map((i, n) => `${n + 1}. ${i.name} (Mod. ${i.model})${i.color ? ` — ${i.color}` : ""} — ${i.qty} pzas`);
    const contact = [`Nombre: ${name}`, company && `Empresa: ${company}`, phoneOk && `Teléfono: ${phone}`, emailOk && `Correo: ${email}`].filter(Boolean).join("\n");
    const head = saved ? `Folio en el CRM: ${saved.folio}${saved.assignedTo ? ` · Asignada a: ${saved.assignedTo}` : ""}` : "OJO: no se pudo registrar en el CRM; atender desde este correo.";
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `Laser Inova Web <${CONTACT_FROM ?? "no-reply@laserinova.com"}>`,
          to: [CONTACT_TO ?? "informes@laserinova.com"],
          ...(emailOk ? { reply_to: email } : {}),
          subject: `Solicitud de cotización${saved ? ` ${saved.folio}` : ""} — tienda web`,
          text: `${head}\n\n${contact}\n\nProductos:\n${lines.join("\n")}${notes ? `\n\nComentarios:\n${notes}` : ""}`,
          html: `<h2>Solicitud de cotización desde la tienda</h2><p><strong>${esc(head)}</strong></p><p>${esc(contact).replace(/\n/g, "<br>")}</p><h3>Productos</h3><ol>${items.map((i) => `<li>${esc(i.name)} (Mod. ${esc(i.model)})${i.color ? ` — ${esc(i.color)}` : ""} — <strong>${i.qty} pzas</strong></li>`).join("")}</ol>${notes ? `<h3>Comentarios</h3><p>${esc(notes).replace(/\n/g, "<br>")}</p>` : ""}`,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      emailed = res.ok;
      if (!res.ok) console.error("[solicitud] Resend respondió", res.status);
    } catch (err) {
      console.error("[solicitud] error al enviar el correo", err);
    }
  }

  if (!saved && !emailed) return Response.json({ ok: false, error: "No se pudo enviar" }, { status: 502 });
  return Response.json({ ok: true, folio: saved?.folio ?? null });
}
