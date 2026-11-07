import Link from "next/link";
import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./BusinessCard.module.css";

type Props = {
  icon: IconName;
  title: string;
  text: string;
  link: { label: string; href: string };
  featured?: boolean;
};

/** Molecule: tarjeta de línea de negocio. Las destacadas van en oscuro. */
export function BusinessCard({ icon, title, text, link, featured }: Props) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <span className={styles.icon}>
        <Icon name={icon} size={26} />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      <Link href={link.href} className={styles.link}>
        {link.label}
        <Icon name="arrow" size={16} />
      </Link>
    </article>
  );
}
