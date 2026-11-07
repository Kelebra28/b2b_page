"use client";

import Image, { type ImageProps } from "next/image";
import styles from "./FadeImage.module.css";

/**
 * Atom (cliente): next/image que muestra un brillo mientras carga y aparece con un fundido.
 * Sin estado de React: marca la imagen con `data-pending` solo si aún no cargó al hidratar.
 * Sin JavaScript (o si la imagen ya estaba lista) se ve normal.
 */
export function FadeImage({ className, ...props }: ImageProps) {
  const done = (e: React.SyntheticEvent<HTMLImageElement>) => e.currentTarget.removeAttribute("data-pending");
  return (
    <span className={styles.frame}>
      <Image
        {...props}
        className={[styles.img, className].filter(Boolean).join(" ")}
        ref={(el) => { if (el && !el.complete) el.setAttribute("data-pending", ""); }}
        onLoad={done}
        onError={done}
      />
    </span>
  );
}
