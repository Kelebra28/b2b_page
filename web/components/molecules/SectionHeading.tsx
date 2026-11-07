import { RichText } from "@/components/atoms/RichText";
import type { RichText as RichTextType } from "@/content/home";
import styles from "./SectionHeading.module.css";

type Props = {
  id: string;
  eyebrow?: string;
  title: string;
  text?: string | RichTextType;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

/** Molecule: encabezado de sección (eyebrow + h2 + texto). Dumb. */
export function SectionHeading({ id, eyebrow, title, text, tone = "light", align = "left" }: Props) {
  return (
    <header className={`${styles.heading} ${styles[tone]} ${styles[align]}`}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {text && (
        <p className={styles.text}>{typeof text === "string" ? text : <RichText parts={text} />}</p>
      )}
    </header>
  );
}
