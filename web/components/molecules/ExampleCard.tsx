import Image from "next/image";
import styles from "./ExampleCard.module.css";

type Props = { src: string; alt: string; title: string; text: string; machine?: boolean };

/** Molecule: ejemplo visual (foto + título + texto). `machine` muestra la foto completa, sin recorte. */
export function ExampleCard({ src, alt, title, text, machine }: Props) {
  return (
    <article className={styles.card}>
      <div className={`${styles.media} ${machine ? styles.contain : ""}`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 360px" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </article>
  );
}
