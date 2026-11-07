import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./ContactInfoItem.module.css";

/** Molecule: dato de contacto con ícono (el valor puede ser enlace). */
export function ContactInfoItem({ icon, label, value, href }: { icon: IconName; label: string; value: string; href?: string }) {
  return (
    <li className={styles.item}>
      <span className={styles.icon}><Icon name={icon} size={20} /></span>
      <div>
        <strong className={styles.label}>{label}</strong>
        {href ? <a className={styles.value} href={href}>{value}</a> : <span className={styles.value}>{value}</span>}
      </div>
    </li>
  );
}
