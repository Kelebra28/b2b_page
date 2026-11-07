import styles from "./FaqItem.module.css";

/** Molecule: pregunta/respuesta con <details> nativo (sin JS; la respuesta está siempre en el HTML). */
export function FaqItem({ question, answer, group }: { question: string; answer: string; group: string }) {
  return (
    <details className={styles.item} name={group}>
      <summary className={styles.question}>
        <span>{question}</span>
        <span className={styles.plus} aria-hidden="true" />
      </summary>
      <p className={styles.answer}>{answer}</p>
    </details>
  );
}
