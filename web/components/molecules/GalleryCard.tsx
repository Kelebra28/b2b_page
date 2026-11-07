import Image from "next/image";
import styles from "./GalleryCard.module.css";

type Props = { image: string; alt: string; tag: string; title: string; text: string; hidden?: boolean };

/** Molecule: tarjeta de producto de la galería. Dumb. */
export function GalleryCard({ image, alt, tag, title, text, hidden }: Props) {
  return (
    <article className={styles.card} hidden={hidden}>
      <div className={styles.image}>
        <Image src={image} alt={alt} width={700} height={560} sizes="(max-width: 640px) 80vw, 320px" />
      </div>
      <div className={styles.body}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </article>
  );
}
