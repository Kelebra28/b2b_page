/** Formato de datos del catálogo para mostrarlos al cliente (funciones puras, sirven en servidor y cliente). */

const SMALL = new Set(["de", "del", "para", "con", "y", "e", "la", "el", "los", "las", "en", "a", "por", "o"]);
const KEEP_UPPER = /^(usb|led|pu|pvc|uv|rpet|eco|xl|xxl|[a-z]?\d+[a-z]*)$/i;

/** "TERMO DOBLE PARED ACERO INOX. TOWER A2136" → { title: "Termo doble pared acero inox. Tower", model: "A2136" } */
export function cleanName(name: string, model: string) {
  const stripped = name.replace(new RegExp(`\\s*\\b${model.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b\\s*$`, "i"), "").trim();
  const words = stripped.toLowerCase().split(/\s+/);
  const title = words
    .map((w, i) => {
      if (KEEP_UPPER.test(w)) return w.toUpperCase();
      if (i > 0 && SMALL.has(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
  return { title, model };
}

/** Códigos de técnica del proveedor → texto claro para el cliente. */
const TECHNIQUES: Record<string, string> = {
  SE: "Serigrafía",
  GL: "Grabado láser",
  TM: "Tampografía",
  DTFT: "DTF textil",
  FC: "Impresión a todo color",
  HS: "Hot stamping",
  GS: "Grabado en relieve",
  SUB: "Sublimación",
};

export function techniqueLabels(codes: string | null): string[] {
  if (!codes) return [];
  return [...new Set(codes.split(/\s+/).filter(Boolean))].map((c) => TECHNIQUES[c.toUpperCase()]).filter(Boolean);
}

/** Color de muestra por nombre (ilustración del producto, no de interfaz). */
const COLORS: Record<string, string> = {
  NEGRO: "#16181d",
  ROJO: "#c62831",
  AZUL: "#2455b8",
  BLANCO: "#ffffff",
  NARANJA: "#f28a1c",
  GRIS: "#8b929c",
  "PALO DE ROSA": "#e3b5b0",
  PLATA: "#c3c8cf",
  "VERDE CLARO": "#8fd06a",
  "AZUL MARINO": "#16264d",
  ROSA: "#ef7fae",
  AMARILLO: "#f4d330",
  BEIGE: "#d8c7a6",
  "AZUL CLARO": "#7fb9e8",
  LILA: "#b79ae0",
  VERDE: "#2f8f4e",
  MORADO: "#6b3fa0",
  TURQUESA: "#22b5ad",
  VINO: "#6d1a2c",
  CAFE: "#6b4429",
  "AZUL COBALTO": "#0d47a1",
  "ORO ROSA": "#d9a28f",
  TRANSPARENTE: "#e6eef3",
  MARMOLEADO: "#b8b8bd",
};

export const colorHex = (name: string) => COLORS[name.toUpperCase()] ?? null;

export const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s)\S/g, (m) => m.toUpperCase());

export const formatMXN = (n: number) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

/** Texto sin acentos y en minúsculas, para comparar búsquedas. */
export const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/**
 * El CRM trae ~300 textos de material distintos ("Plástico ABS", "Acero Inoxidable / Plástico"…).
 * Para filtrar se agrupan en pocas familias; un producto de dos materiales aparece en ambas.
 */
const MATERIAL_FAMILIES: [string, RegExp][] = [
  ["Plástico", /plastico|\b(abs|pp|pet|pvc|tritan|tpu|peva|eva|polipropileno|policarbonato)\b/],
  ["Metal", /aluminio|acero|metal|zinc|cobre|hierro|laton|peltre/],
  ["Tela y textil", /poliester|polialgodon|nylon|algodon|non woven|pongee|policanvas|canvas|microfibra|yute|terciopelo|textil|mesh|spandex|lona/],
  ["Piel sintética", /curpiel|poliuretano|poliuterano|cuero|\bpu\b/],
  ["Vidrio y cerámica", /vidrio|ceramica|borosilicato|piedra/],
  ["Madera y bambú", /madera|bambu|mdf|corcho|trigo/],
  ["Cartón y papel", /carton|papel|kraft/],
  ["Silicón y goma", /silicon|neopreno|hule|rubber|latex|caucho/],
];

/** Familias de material a las que pertenece un producto (vacío si no trae material o no encaja). */
export const materialFamilies = (material: string | null): string[] => {
  if (!material) return [];
  const m = norm(material);
  return MATERIAL_FAMILIES.filter(([, re]) => re.test(m)).map(([name]) => name);
};

type Searchable = { name: string; model: string; category: string; material: string | null; colors: string[]; techniques: string[] };

/** ¿El producto contiene todas las palabras buscadas? */
export const matchesQuery = (p: Searchable, q: string) => {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const hay = norm([p.name, p.model, p.category, p.material ?? "", materialFamilies(p.material).join(" "), p.colors.join(" "), p.techniques.join(" ")].join(" "));
  return terms.every((t) => hay.includes(t));
};

/** Puntos de relevancia: las palabras que aparecen en el nombre o la categoría pesan más que las de color o material. */
export const relevance = (p: Pick<Searchable, "name" | "category">, q: string) => {
  const head = norm(`${p.name} ${p.category}`);
  const name = norm(p.name);
  return norm(q).split(/\s+/).filter(Boolean).reduce((n, t) => n + (head.includes(t) ? 1 : 0) + (name.startsWith(t) ? 1 : 0), 0);
};

/** Ordena de más a menos relevante conservando el orden original en empates (fotos primero). */
export const byRelevance = <T extends Pick<Searchable, "name" | "category">>(list: T[], q: string) =>
  q.trim() ? list.map((p, i) => ({ p, i, s: relevance(p, q) })).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.p) : list;

/** Piezas con separador de miles: 816062 → "816,062". */
export const formatPieces = (n: number) => new Intl.NumberFormat("es-MX").format(n);
