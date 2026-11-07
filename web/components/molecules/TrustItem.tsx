import { Icon, type IconName } from "@/components/atoms/Icon";
import styles from "./TrustItem.module.css";

type Props = { icon: IconName; title: string; text: string };

/** Molecule: indicador de confianza (ícono + título + texto). Dumb. */
export function TrustItem({ icon, title, text }: Props) {
  return (
    <article className={styles.item}>
      <span className={styles.icon}>
        <Icon name={icon} size={26} />
      </span>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
    </article>
  );
}
