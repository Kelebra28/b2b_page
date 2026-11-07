import { NextResponse } from "next/server";
import { getLiveStock } from "@/lib/catalog";

/** Existencia de un producto para la ficha (la llama el navegador al abrirla). Con caché corto para no saturar al CRM. */
export async function GET(_request: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const data = await getLiveStock(slug);
  if (!data) return NextResponse.json({ error: "No disponible" }, { status: 404 });
  return NextResponse.json(data, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=240" } });
}
