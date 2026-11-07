import styles from "./UvBed.module.css";

type Props = { plates: [string, string, string]; callouts: [string, string] };

/** Molecule: maqueta animada de la cama plana UV (barra de luz que imprime tres materiales). Dumb, solo CSS. */
export function UvBed({ plates, callouts }: Props) {
  const kinds = ["wood", "acrylic", "metal"] as const;
  return (
    <div className={styles.bed} role="img" aria-label="Ilustración de una cama plana UV imprimiendo sobre madera, acrílico y metal">
      <div className={styles.vacuum} aria-hidden="true" />
      <div className={styles.plates}>
        {plates.map((label, i) => (
          <div key={label} className={`${styles.plate} ${styles[kinds[i]]}`}>
            <span className={styles.label}>{label}</span>
            <div className={styles.print} />
            {kinds[i] === "acrylic" && <div className={styles.glare} />}
          </div>
        ))}
      </div>
      <div className={styles.bar} aria-hidden="true" />
      <div className={`${styles.callout} ${styles.c1}`}>
        <span className={styles.dot} />
        {callouts[0]}
      </div>
      <div className={`${styles.callout} ${styles.c2}`}>
        <span className={styles.dot} />
        {callouts[1]}
      </div>
    </div>
  );
}
