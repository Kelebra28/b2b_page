import { RichText } from "@/components/atoms/RichText";
import { CheckList } from "@/components/molecules/CheckList";
import type { RichText as RichTextType } from "@/content/home";
import styles from "./TechCard.module.css";

type Props = { title: string; text?: string | RichTextType; items?: string[]; tone: "light" | "dark" };

/** Molecule: ficha técnica (título + texto y/o lista). `tone` según el fondo de la sección. */
export function TechCard({ title, text, items, tone }: Props) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {text && <p className={styles.text}>{typeof text === "string" ? text : <RichText parts={text} />}</p>}
      {items && <CheckList items={items} tone={tone} />}
    </article>
  );
}
