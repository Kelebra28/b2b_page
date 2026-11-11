// Convierte los SVG de este directorio a .webp (1600x900) en public/img/blog.
import sharp from "sharp";
import { readdirSync } from "node:fs";
for (const f of readdirSync(".").filter((n) => n.endsWith(".svg"))) {
  const out = `../../public/img/blog/${f.replace(".svg", ".webp")}`;
  const info = await sharp(f, { density: 96 }).resize(1600, 900).webp({ quality: 82 }).toFile(out);
  console.log(out, Math.round(info.size / 1024) + " KB");
}
