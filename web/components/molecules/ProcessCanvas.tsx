import styles from "./ProcessCanvas.module.css";

type Kind = "laser" | "engrave" | "uv" | "plotter";

/** Molecule: mini animación (SVG + CSS) de cada proceso de la planta. Decorativa. */
export function ProcessCanvas({ kind }: { kind: Kind }) {
  return (
    <div className={`${styles.canvas} ${styles[kind]}`} aria-hidden="true">
      {kind === "laser" && (
        <>
          <svg viewBox="0 0 200 140" className={styles.svg}>
            <circle cx="100" cy="76" r="34" className={styles.guide} />
            <circle cx="100" cy="76" r="34" className={styles.cut} pathLength={100} />
            <circle r="3.6" className={styles.spark} />
          </svg>
        </>
      )}
      {kind === "engrave" && (
        <svg viewBox="0 0 200 140" className={styles.svg}>
          <defs>
            <linearGradient id="tumbler" x1="0" x2="1">
              <stop offset="0" stopColor="#1b1b20" />
              <stop offset="0.45" stopColor="#52525c" />
              <stop offset="1" stopColor="#151518" />
            </linearGradient>
          </defs>
          <rect x="62" y="22" width="76" height="96" rx="14" fill="url(#tumbler)" />
          <path d="M78 52h44" className={`${styles.line} ${styles.l1}`} pathLength={100} />
          <path d="M78 68h44" className={`${styles.line} ${styles.l2}`} pathLength={100} />
          <path d="M78 84h30" className={`${styles.line} ${styles.l3}`} pathLength={100} />
          <circle r="3.2" className={styles.dot} />
        </svg>
      )}
      {kind === "uv" && (
        <>
          <div className={styles.plate}>
            <div className={styles.print} />
          </div>
          <div className={styles.gantry} />
        </>
      )}
      {kind === "plotter" && (
        <>
          <div className={styles.roll}>
            <div className={styles.band} />
          </div>
          <div className={styles.head} />
        </>
      )}
    </div>
  );
}
