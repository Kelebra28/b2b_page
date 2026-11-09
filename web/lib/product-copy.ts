import { norm } from "@/lib/product-format";

type Input = {
  slug: string;
  title: string;
  category: string;
  material: string | null;
  measurements: string | null;
  techniques: string[];
};

/** Uso típico según el tipo de producto (primera coincidencia gana). */
export const USES: [RegExp, string][] = [
  [/llavero/, "kits de bienvenida, regalos de fin de año y detalles para clientes"],
  [/termo|vaso|taza|cilindro|botella|tequil|bebida/, "regalos corporativos, onboarding de personal y eventos de marca"],
  [/boligrafo|pluma|lapiz|marcador|resaltador/, "papelería corporativa, congresos, ferias y entregas masivas"],
  [/libreta|libro|agenda|cuaderno|carpeta|portafolio/, "kits ejecutivos, juntas, capacitaciones y regalos para colaboradores"],
  [/mochila|bolsa|maleta|cangurera|portatrajes|lonchera|neceser|cosmetiquera/, "ferias, eventos, kits para empleados y campañas promocionales"],
  [/gorra|playera|camisa|chaleco|textil|sombrero|visera/, "uniformes, eventos, activaciones y campañas de marca"],
  [/usb|power|bocina|audifono|cargador|tecnolog|computo|mouse/, "kits tecnológicos, regalos ejecutivos y programas de reconocimiento"],
  [/paraguas|sombrilla|impermeable|poncho/, "campañas de temporada, eventos al aire libre y regalos de marca"],
  [/reloj|calculadora|escritorio|oficina|set/, "oficinas, regalos ejecutivos y reconocimientos"],
  [/herramienta|navaja|linterna|flexometro|llave/, "regalos para equipos de trabajo, ferias y campañas con clientes industriales"],
  [/cocina|asador|cuchillo|tabla|bar|vino|hielera|copa/, "regalos premium, clientes especiales y fechas conmemorativas"],
];

/** Qué aporta cada técnica (se menciona solo la primera, para que el texto no se alargue). */
const BENEFIT: Record<string, string> = {
  "Grabado láser": "El grabado láser deja una marca permanente y de alta precisión que no se borra con el uso.",
  "Serigrafía": "La serigrafía funciona muy bien con logotipos de colores sólidos en tirajes grandes.",
  "Tampografía": "La tampografía permite imprimir tu logotipo en superficies pequeñas o curvas.",
  "Hot stamping": "El hot stamping da un acabado metálico que le da presencia premium a tu marca.",
  "Grabado en relieve": "El grabado en relieve deja tu logotipo con textura y volumen.",
  "Sublimación": "La sublimación logra imagen a todo color que no se desprende ni se desgasta.",
  "DTF textil": "El DTF textil logra logotipos a todo color con buen detalle sobre tela.",
  "Impresión a todo color": "La impresión a todo color sirve para logotipos con degradados y fotografías.",
};

/** "Acero Inoxidable / Plástico" → "acero inoxidable / plástico" (siglas como PU o ABS se respetan). */
const niceMaterial = (m: string) => m.replace(/\p{L}+/gu, (w) => (w === w.toUpperCase() && w.length <= 4 ? w : w.toLowerCase()));
export const useFor = (key: string) => USES.find(([re]) => re.test(norm(key)))?.[1] ?? "regalos corporativos, eventos y campañas de marca";
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const pick = <T,>(arr: T[], seed: number) => arr[seed % arr.length];
export const list = (a: string[]) => (a.length <= 1 ? a.join("") : `${a.slice(0, -1).join(", ")} y ${a[a.length - 1]}`);

/**
 * Texto propio de cada ficha de producto (no la descripción del proveedor, que repiten todas las tiendas).
 * Se arma con los datos reales del producto y varía la redacción por producto para que las fichas no sean idénticas.
 */
export function productCopy({ slug, title, category, material, measurements, techniques }: Input): { heading: string; paragraphs: string[] } {
  const h = hash(slug);
  const use = useFor(`${title} ${category}`);
  const cat = category.toLowerCase();

  const made = material ? ` Está fabricado en ${niceMaterial(material)}${measurements ? ` y mide ${measurements}` : ""}.` : measurements ? ` Mide ${measurements}.` : "";
  const open = pick(
    [
      `${title} es una opción de nuestra línea de ${cat}, pensada para ${use}.${made}`,
      `Si buscas ${cat} para ${use}, ${title} es una buena alternativa.${made}`,
      `Personalizamos ${title} con el logotipo de tu empresa para ${use}.${made}`,
    ],
    h,
  );

  const how = techniques.length
    ? `Lo personalizamos con ${list(techniques.map((t) => t.toLowerCase()))}. ${BENEFIT[techniques[0]] ?? ""}`.trim()
    : "Te decimos qué técnica de personalización funciona mejor para tu logotipo y la cantidad que necesitas.";

  const close = pick(
    [
      "Producimos en nuestro taller de Azcapotzalco, CDMX, y antes de fabricar te enviamos una muestra digital del logotipo para que la apruebes. Cotiza por WhatsApp con la cantidad y los colores que necesitas.",
      "La producción es propia, en nuestro taller de Azcapotzalco, CDMX. Revisas una muestra digital de tu logotipo antes de producir. Pide tu cotización por WhatsApp con modelo, cantidad y colores.",
      "Lo hacemos en nuestro taller de Azcapotzalco, CDMX, con muestra digital previa para tu aprobación. Escríbenos por WhatsApp con la cantidad y los colores que te interesan y te cotizamos.",
    ],
    h >> 5,
  );

  return { heading: `Personaliza ${title} con tu logotipo`, paragraphs: [open, `${how} ${close}`] };
}
