import { wa } from "@/content/site";
import type { CartItem } from "@/lib/cart-store";

/** Mensaje de WhatsApp con todo el carrito, listo para que ventas cotice de un solo vistazo. */
export function quoteMessage(items: CartItem[], notes: string) {
  const lines = items.filter((i) => i.qty > 0).map((i, n) => `${n + 1}. ${i.name} (Mod. ${i.model})${i.color ? ` — ${i.color.charAt(0) + i.color.slice(1).toLowerCase()}` : ""} — ${i.qty} pza${i.qty === 1 ? "" : "s"}`);
  const extra = notes.trim() ? `\n\nPersonalización / comentarios:\n${notes.trim()}` : "";
  return `Hola, quiero cotizar estos productos personalizados:\n\n${lines.join("\n")}${extra}\n\n¿Me ayudas con precios y tiempos de entrega?`;
}

export const quoteHref = (items: CartItem[], notes: string) => wa(encodeURIComponent(quoteMessage(items, notes)));
