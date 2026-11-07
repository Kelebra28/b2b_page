import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./StatCard.module.css";

/** Molecule: cifra destacada con ícono (para fondos oscuros). */
export function StatCard({ icon, value, label }: { icon: IconName; value: string; label: string }) {
  return (
    <article className={styles.card}>
      <span className={styles.icon}>
        <Icon name={icon} size={22} />
      </span>
      <strong className={styles.value}>{value}</strong>
      <span className={styles.label}>{label}</span>
    </article>
  );
}
