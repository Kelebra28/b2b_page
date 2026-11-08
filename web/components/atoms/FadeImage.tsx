"use client";

import Image, { type ImageProps } from "next/image";
import { isStorePhoto } from "@/lib/store-photo";
import styles from "./FadeImage.module.css";

/**
 * Atom (cliente): next/image que muestra un brillo mientras carga y aparece con un fundido.
 * Sin estado de React: marca la imagen con `data-pending` solo si aún no cargó al hidratar.
 * Sin JavaScript (o si la imagen ya estaba lista) se ve normal.
 */
export function FadeImage({ className, fallbackSrc, ...props }: ImageProps & { fallbackSrc?: string | null }) {
  const done = (e: React.SyntheticEvent<HTMLImageElement>) => e.currentTarget.removeAttribute("data-pending");
  // Si la foto no existe en el CDN (404), se cambia una sola vez por la de respaldo (la foto principal del producto).
  const failed = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (fallbackSrc && !img.dataset.fellBack && !img.src.endsWith(fallbackSrc.replace(/^https?:\/\/[^/]+/, ""))) {
      img.dataset.fellBack = "1";
      img.src = fallbackSrc;
      return;
    }
    done(e);
  };
  return (
    <span className={styles.frame}>
      <Image
        {...props}
        unoptimized={props.unoptimized ?? isStorePhoto(props.src)}
        className={[styles.img, className].filter(Boolean).join(" ")}
        ref={(el) => { if (el && !el.complete) el.setAttribute("data-pending", ""); }}
        onLoad={done}
        onError={failed}
      />
    </span>
  );
}
