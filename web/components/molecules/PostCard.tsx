import Image from "next/image";
import Link from "next/link";
import styles from "./PostCard.module.css";

type Props = {
  href: string;
  title: string;
  excerpt: string;
  badge: string;
  date: string;
  dateLabel: string;
  image: { src: string; alt: string };
  linkLabel: string;
};

/** Molecule: tarjeta de artículo del blog; toda la tarjeta es el enlace. Dumb. */
export function PostCard({ href, title, excerpt, badge, date, dateLabel, image, linkLabel }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 380px" />
        <span className={styles.badge}>{badge}</span>
      </div>
      <div className={styles.body}>
        <time className={styles.date} dateTime={date}>{dateLabel}</time>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>
        <Link href={href} className={styles.link}>{linkLabel}</Link>
      </div>
    </article>
  );
}
