import Image from "next/image";
import styles from "./WorkCard.module.css";

type Props = { src: string; alt: string; tag: string; title: string; priority?: boolean };

/** Molecule: foto real de un trabajo con su servicio y título. Dumb. */
export function WorkCard({ src, alt, tag, title, priority }: Props) {
  return (
    <figure className={styles.card}>
      <div className={styles.frame}>
        <Image src={src} alt={alt} width={960} height={1200} sizes="(max-width: 620px) 70vw, (max-width: 1100px) 33vw, 300px" priority={priority} className={styles.img} />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.tag}>{tag}</span>
        <strong className={styles.title}>{title}</strong>
      </figcaption>
    </figure>
  );
}
