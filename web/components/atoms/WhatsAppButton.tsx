import styles from "./WhatsAppButton.module.css";

type Props = { label: string; href: string };

/** Atom: botón de cotización por WhatsApp. En pantallas chicas queda solo el ícono. */
export function WhatsAppButton({ label, href }: Props) {
  return (
    <a
      className={styles.button}
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`${label} por WhatsApp`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z" />
        <path d="M9 9.2c.3 2.4 2.4 4.6 5.4 5.6l1.1-1.3-1.8-.9-.8.6c-.9-.4-1.7-1.2-2.1-2.1l.6-.8-.9-1.8z" fill="currentColor" stroke="none" />
      </svg>
      <span className={styles.label}>{label}</span>
    </a>
  );
}
