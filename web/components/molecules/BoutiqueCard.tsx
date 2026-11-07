import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import styles from "./BoutiqueCard.module.css";

type Props = { index: number; title: string; text: string; linkLabel: string; href: string };

/** Molecule: tarjeta de línea boutique; toda la tarjeta es el enlace. */
export function BoutiqueCard({ index, title, text, linkLabel, href }: Props) {
  return (
    <article className={styles.card}>
      <span className={styles.num} aria-hidden="true" data-n={String(index).padStart(2, "0")} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      <Link href={href} className={styles.link}>
        {linkLabel}
        <Icon name="arrow" size={16} />
      </Link>
    </article>
  );
}
