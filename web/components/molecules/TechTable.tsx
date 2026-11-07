import styles from "./TechTable.module.css";

type Props = { caption: string; columns: string[]; rows: string[][] };

/** Molecule: tabla técnica. En móvil cada fila se vuelve una tarjeta (usa data-label). */
export function TechTable({ caption, columns, rows }: Props) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <caption className={styles.caption}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, i) => (
                <td key={i} data-label={columns[i]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
