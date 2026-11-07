import { FadeImage } from "@/components/atoms/FadeImage";
import Link from "next/link";
import styles from "./CategoryCard.module.css";

type Props = { href: string; name: string; count: number; image: string | null };

/** Molecule: tarjeta de categoría (foto de muestra, nombre y cuántos productos tiene). Dumb. */
export function CategoryCard({ href, name, count, image }: Props) {
  return (
    <Link href={href} className={styles.card}>
      <span className={styles.media}>
        {image ? (
          <FadeImage src={image} alt="" fill sizes="(max-width: 640px) 45vw, (max-width: 1100px) 22vw, 15vw" />
        ) : (
          <span className={styles.initial} aria-hidden="true">{name.charAt(0)}</span>
        )}
      </span>
      <span className={styles.name}>{name}</span>
      <span className={styles.count}>{count} {count === 1 ? "producto" : "productos"}</span>
    </Link>
  );
}
