import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./ContactInfoItem.module.css";

/** Molecule: dato de contacto con ícono (el valor puede ser enlace). */
export function ContactInfoItem({ icon, label, value, href, extra }: { icon: IconName; label: string; value: string; href?: string; extra?: { label: string; href: string } }) {
  return (
    <li className={styles.item}>
      <span className={styles.icon}><Icon name={icon} size={20} /></span>
      <div>
        <strong className={styles.label}>{label}</strong>
        {href ? <a className={styles.value} href={href}>{value}</a> : <span className={styles.value}>{value}</span>}
        {extra && <a className={styles.extra} href={extra.href} target="_blank" rel="noopener">{extra.label}</a>}
      </div>
    </li>
  );
}
