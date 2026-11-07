#!/usr/bin/env node
/**
 * Regla de design tokens: los CSS de componentes no pueden llevar colores sueltos (#hex, rgb(), rgba(), hsl()).
 * Deben usar los tokens de app/tokens.css (var(--white), var(--white-a12), var(--text-muted)…).
 *
 * Permitido:
 *  - app/tokens.css (ahí viven los valores).
 *  - Declaraciones de variables locales (`--algo: #fff`), que se usan para temas de un componente.
 *  - Archivos de ILUSTRACIÓN (colores de producto, no de interfaz): ver ILLUSTRATIONS.
 *
 * Uso: npm run lint:tokens   (sale con código 1 si hay colores sueltos)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ILLUSTRATIONS = new Set([
  "components/molecules/UvBed.module.css", // maqueta de la cama UV: colores de madera, acrílico, metal y luz UV
  "components/molecules/ProcessCanvas.module.css", // animaciones de los procesos (láser, UV, plotter)
]);
const ROOTS = ["components", "app"];
const COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\([^)]*\)/g;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith(".css")) yield p.replaceAll("\\", "/");
  }
}

let problems = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (file === "app/tokens.css" || ILLUSTRATIONS.has(file)) continue;
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      // quita las variables locales (--x: valor;) antes de buscar colores
      const clean = line.replace(/--[\w-]+\s*:\s*[^;]+;/g, "");
      const hits = clean.match(COLOR);
      if (hits) {
        problems += hits.length;
        console.error(`${file}:${i + 1}  color suelto: ${hits.join(", ")}  → usa un token de app/tokens.css`);
      }
    });
  }
}
if (problems) {
  console.error(`\n✗ ${problems} color(es) suelto(s). Usa los tokens de app/tokens.css.`);
  process.exit(1);
}
console.log("✓ Sin colores sueltos fuera de tokens.css e ilustraciones.");
