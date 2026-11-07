import type { RichText as RichTextType } from "@/content/home";

/** Atom: renderiza texto con partes en <strong> (sin HTML crudo). */
export function RichText({ parts }: { parts: RichTextType }) {
  return (
    <>
      {parts.map((p, i) => (typeof p === "string" ? p : "strong" in p ? <strong key={i}>{p.strong}</strong> : <em key={i}>{p.em}</em>))}
    </>
  );
}
