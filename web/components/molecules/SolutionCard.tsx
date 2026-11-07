import Link from "next/link";
import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./SolutionCard.module.css";

type Props = {
  index: number;
  icon: IconName;
  title: string;
  text: string;
  link: { label: string; href: string };
};

/** Molecule: aplicación B2B (número, ícono, texto y enlace). */
export function SolutionCard({ index, icon, title, text, link }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.icon}>
          <Icon name={icon} size={24} />
        </span>
        <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      <Link href={link.href} className={styles.link}>
        {link.label}
        <Icon name="arrow" size={16} />
      </Link>
    </article>
  );
}
