import Link from "next/link";
import type { NavLinkItem } from "@/content/navigation";
import styles from "./FooterColumn.module.css";

type Props = { title: string; links: NavLinkItem[]; index?: number };

/** Molecule: columna de links del footer (título + lista). Dumb. */
export function FooterColumn({ title, links, index }: Props) {
  return (
    <div className={styles.column}>
      <h3 className={styles.title}>
        {index !== undefined && (
          <span className={styles.num}>{String(index + 1).padStart(2, "0")}</span>
        )}
        {title}
      </h3>
      <ul className={styles.list}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={styles.link}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
