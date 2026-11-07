"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";

type Props = { label: string; children: React.ReactNode };

/** Molecule (cliente): fila horizontal que se desliza (dedo o flechas). Cada hijo es una "ficha" de ancho fijo. */
export function Carousel({ label, children }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const frame = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, [measure]);

  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.9, behavior: "smooth" });

  return (
    <div className={styles.wrap}>
      <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => go(-1)} disabled={edge.start} aria-label="Ver anteriores">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <div ref={track} className={styles.track} role="region" aria-label={label} tabIndex={0} onScroll={measure}>
        {Children.map(children, (child) => <div className={styles.item}>{child}</div>)}
      </div>
      <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => go(1)} disabled={edge.end} aria-label="Ver más">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}
