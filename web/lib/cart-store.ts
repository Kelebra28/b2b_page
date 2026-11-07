"use client";

import { useSyncExternalStore } from "react";

/**
 * Carrito de COTIZACIÓN (no hay pago en línea: los precios los confirma ventas).
 * Se guarda en el navegador (localStorage) y se comparte entre pestañas. Es un "store externo" para React:
 * en el servidor siempre está vacío, así que no hay diferencias al hidratar.
 */
export type CartItem = {
  /** slug + color: el mismo producto en otro color es otra línea. */
  key: string;
  slug: string;
  name: string;
  model: string;
  category: string;
  image: string | null;
  color: string | null;
  /** Piezas en existencia cuando se agregó (referencia para avisar si piden de más). */
  stock?: number;
  qty: number;
};
export type NewCartItem = Omit<CartItem, "key" | "qty">;

export type Contact = { name: string; phone: string; email: string; company: string };
const NO_CONTACT: Contact = { name: "", phone: "", email: "", company: "" };

const STORAGE = "inova-quote-v1";
export const MAX_QTY = 1000000;
/** Cantidad inicial: 0. El cliente debe indicar cuántas piezas necesita (no se inventa ninguna). */
export const DEFAULT_QTY = 0;
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let notes = "";
let contact: Contact = NO_CONTACT;
let open = false;
let loaded = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());
const clamp = (n: number) => Math.min(MAX_QTY, Math.max(0, Math.round(Number.isFinite(n) ? n : 0)));
export const lineKey = (slug: string, color: string | null) => `${slug}|${color ?? ""}`;

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE) ?? "null") as { items?: unknown; notes?: unknown; contact?: Partial<Contact> } | null;
    const list = Array.isArray(raw?.items) ? raw.items : [];
    items = list
      .filter((i): i is CartItem => !!i && typeof i.slug === "string" && typeof i.name === "string" && typeof i.qty === "number")
      .map((i) => ({ ...i, key: lineKey(i.slug, i.color ?? null), qty: clamp(i.qty), color: i.color ?? null, image: i.image ?? null, stock: typeof i.stock === "number" ? i.stock : undefined }));
    notes = typeof raw?.notes === "string" ? raw.notes : "";
    const c = raw?.contact;
    contact = c && typeof c === "object" ? { name: String(c.name ?? ""), phone: String(c.phone ?? ""), email: String(c.email ?? ""), company: String(c.company ?? "") } : NO_CONTACT;
  } catch {
    items = EMPTY;
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE, JSON.stringify({ items, notes, contact }));
  } catch {
    /* modo privado o sin espacio: el carrito sigue funcionando en esta visita */
  }
}

function subscribe(cb: () => void) {
  if (!loaded) {
    loaded = true;
    read();
    queueMicrotask(emit);
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE) { read(); emit(); }
    });
  }
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

const set = (next: CartItem[]) => { items = next; persist(); emit(); };

export const cartActions = {
  add(item: NewCartItem, qty: number) {
    const key = lineKey(item.slug, item.color);
    const found = items.find((i) => i.key === key);
    if (found) set(items.map((i) => (i.key === key ? { ...i, qty: clamp(i.qty + qty), stock: item.stock ?? i.stock } : i)));
    else set([{ ...item, key, qty: clamp(qty) }, ...items]);
  },
  setQty: (key: string, qty: number) => set(items.map((i) => (i.key === key ? { ...i, qty: clamp(qty) } : i))),
  remove: (key: string) => set(items.filter((i) => i.key !== key)),
  clear() { notes = ""; set(EMPTY); },
  setNotes(value: string) { notes = value.slice(0, 600); persist(); emit(); },
  setContact(next: Partial<Contact>) { contact = { ...contact, ...next }; persist(); emit(); },
  openDrawer() { open = true; emit(); },
  closeDrawer() { open = false; emit(); },
};

/** Productos del carrito (vacío en el servidor). */
export const useCartItems = () => useSyncExternalStore(subscribe, () => items, () => EMPTY);
export const useCartNotes = () => useSyncExternalStore(subscribe, () => notes, () => "");
export const useCartContact = () => useSyncExternalStore(subscribe, () => contact, () => NO_CONTACT);
export const useCartOpen = () => useSyncExternalStore(subscribe, () => open, () => false);

export const countPieces = (list: CartItem[]) => list.reduce((n, i) => n + i.qty, 0);
