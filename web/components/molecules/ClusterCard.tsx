import Link from "next/link";
import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./ClusterCard.module.css";

type Props = { icon: IconName; title: string; text: string; links: { label: string; href: string }[] };

/** Molecule: grupo de especialidades con su lista de enlaces. Dumb. */
export function ClusterCard({ icon, title, text, links }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <span className={styles.icon}>
          <Icon name={icon} size={22} />
        </span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.text}>{text}</p>
      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              {l.label}
              <Icon name="arrow" size={15} />
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
