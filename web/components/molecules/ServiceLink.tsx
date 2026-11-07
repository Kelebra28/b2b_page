import Link from "next/link";
import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./ServiceLink.module.css";

type Props = { icon: IconName; title: string; text: string; href: string };

/** Molecule: servicio como tarjeta enlazada completa. */
export function ServiceLink({ icon, title, text, href }: Props) {
  return (
    <Link href={href} className={styles.item}>
      <span className={styles.icon}>
        <Icon name={icon} size={22} />
      </span>
      <span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </span>
    </Link>
  );
}
