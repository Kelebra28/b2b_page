import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sameOrigin } from "@/lib/request-guard";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const MAX_BODY_BYTES = 20_000;

/** Formulario de contacto (reemplaza api/contacto.php). Envía con la API de Resend; la API key vive solo en variables de entorno. */
export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ ok: false, error: "Solicitud no permitida" }, { status: 403 });
  }

  // 5 envíos por IP cada 10 minutos.
  const limit = rateLimit(`contacto:${clientIp(request)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Demasiados envíos. Intenta de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "Solicitud demasiado grande" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return Response.json({ ok: false, error: "Solicitud demasiado grande" }, { status: 413 });
    }
    body = JSON.parse(raw);
    if (typeof body !== "object" || body === null || Array.isArray(body)) throw new Error("formato");
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  // Honeypot anti-spam: si trae texto, finge éxito sin enviar.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 200);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Datos inválidos" }, { status: 422 });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY) {
    console.error("[contacto] Falta la variable RESEND_API_KEY");
    return Response.json({ ok: false, error: "Servicio de correo no configurado" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `Laser Inova Web <${CONTACT_FROM ?? "no-reply@laserinova.com"}>`,
        to: [CONTACT_TO ?? "informes@laserinova.com"],
        reply_to: email, // al responder, el correo va directo al cliente
        subject: "Nueva solicitud desde la web — Laser Inova",
        text: `Nueva solicitud de contacto\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}\n\nhttps://www.laserinova.com/`,
        html: `<h2>Nueva solicitud de contacto</h2><p><strong>Nombre:</strong> ${esc(name)}</p><p><strong>Email:</strong> ${esc(email)}</p><p><strong>Mensaje:</strong><br>${esc(message).replace(/\n/g, "<br>")}</p><hr><p>Enviada desde https://www.laserinova.com/</p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contacto] Resend respondió", res.status, await res.text());
      return Response.json({ ok: false, error: "No se pudo enviar" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contacto] Error al enviar", err);
    return Response.json({ ok: false, error: "No se pudo enviar" }, { status: 502 });
  }
}
