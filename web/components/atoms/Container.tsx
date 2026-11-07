import styles from "./Container.module.css";

/** Atom: contenedor centrado con el ancho máximo del sitio. */
export function Container({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
