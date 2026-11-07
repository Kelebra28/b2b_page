/**
 * Límite de peticiones por IP (ventana deslizante en memoria).
 * OJO: en Vercel cada instancia serverless tiene su propia memoria, así que este límite frena ráfagas
 * y bots simples pero NO es global. Para un límite real, añadir además una regla en Vercel Firewall
 * (Rate Limiting) sobre /api/contacto, o migrar a Upstash Ratelimit.
 */
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  // Limpieza ocasional para que el mapa no crezca sin fin.
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return { ok: true, retryAfter: 0 };
}

/**
 * IP del visitante. Se toma la ÚLTIMA entrada de x-forwarded-for: es la que añade nuestro proxy (Vercel o el de Hostinger);
 * las anteriores las puede escribir el propio visitante para esquivar el límite.
 */
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for")?.split(",").map((p) => p.trim()).filter(Boolean);
  return fwd?.length ? fwd[fwd.length - 1] : (request.headers.get("x-real-ip") ?? "desconocida").trim();
}
