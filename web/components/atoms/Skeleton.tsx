import styles from "./Skeleton.module.css";

type Props = { className?: string };

/** Atom: bloque gris con brillo mientras carga el contenido. Decorativo (oculto a lectores de pantalla). */
export function Skeleton({ className }: Props) {
  return <span aria-hidden="true" className={[styles.skeleton, className].filter(Boolean).join(" ")} />;
}
