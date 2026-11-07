import { NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";
import { interleave, toSearchItem } from "@/lib/search-index";

/** Índice ligero de todo el catálogo para el buscador. Se cachea 10 min igual que el catálogo. */
export async function GET() {
  const products = await getProducts().catch(() => []);
  return NextResponse.json(interleave(products).map(toSearchItem), {
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600" },
  });
}
