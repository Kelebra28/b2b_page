import { NextResponse } from "next/server";
import { getLiveStock } from "@/lib/catalog";
import { clientIp, rateLimit } from "@/lib/rate-limit";

/** Existencia de un producto para la ficha (la llama el navegador al abrirla). Con caché corto para no saturar al CRM. */
export async function GET(request: Request, ctx: { params: Promise<{ slug: string }> }) {
  // 120 consultas por IP cada minuto: evita que alguien recorra slugs al azar y sature al CRM.
  const limit = rateLimit(`existencia:${clientIp(request)}`, 120, 60 * 1000);
  if (!limit.ok) return NextResponse.json({ error: "Demasiadas consultas" }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
  const { slug } = await ctx.params;
  const data = await getLiveStock(slug);
  if (!data) return NextResponse.json({ error: "No disponible" }, { status: 404 });
  return NextResponse.json(data, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=240" } });
}
