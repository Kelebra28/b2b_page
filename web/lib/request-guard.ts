/**
 * Chequeos comunes de los endpoints /api (formulario de contacto, solicitud de cotización, existencias).
 */

/**
 * Acepta solo peticiones del propio sitio (cabecera Origin). `localhost` solo vale en desarrollo:
 * en producción un script externo no debe poder saltarse el chequeo diciendo que viene de localhost.
 */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const host = new URL(origin).host;
    const own = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    if (host === own) return true;
    return process.env.NODE_ENV !== "production" && (host === "localhost" || host.startsWith("localhost:"));
  } catch {
    return false;
  }
}
