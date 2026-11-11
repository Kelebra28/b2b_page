import Link from "next/link";
import type { RichText as RichTextType } from "@/content/home";

/** Atom: renderiza texto con partes en <strong>, <em> o enlaces internos (sin HTML crudo). */
export function RichText({ parts }: { parts: RichTextType }) {
  return (
    <>
      {parts.map((p, i) => {
        if (typeof p === "string") return p;
        if ("strong" in p) return <strong key={i}>{p.strong}</strong>;
        if ("em" in p) return <em key={i}>{p.em}</em>;
        return <Link key={i} href={p.href}>{p.link}</Link>;
      })}
    </>
  );
}
