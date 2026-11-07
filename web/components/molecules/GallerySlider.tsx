"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { GalleryCard } from "@/components/molecules/GalleryCard";
import type { GalleryItem } from "@/content/home";
import styles from "./GallerySlider.module.css";

type Props = {
  filters: { id: string; label: string }[];
  items: GalleryItem[];
  label: string;
};

/**
 * Molecule (client): filtros + carrusel horizontal de productos.
 * Todas las tarjetas se renderizan en el servidor; el filtro solo las oculta.
 */
export function GallerySlider({ filters, items, label }: Props) {
  const [active, setActive] = useState("all");
  const track = useRef<HTMLDivElement>(null);

  const shown = items.filter((i) => active === "all" || i.categories.includes(active)).length;

  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 300), behavior: "smooth" });
  };

  const choose = (id: string) => {
    setActive(id);
    track.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label={label}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.filter}
              aria-pressed={active === f.id}
              onClick={() => choose(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className={styles.nav}>
          <span className={styles.count} aria-live="polite">
            {shown} {shown === 1 ? "producto" : "productos"}
          </span>
          <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => move(-1)} aria-label="Ver productos anteriores">
            <Icon name="arrow" size={18} />
          </button>
          <button type="button" className={styles.arrow} onClick={() => move(1)} aria-label="Ver productos siguientes">
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
      <div className={styles.track} ref={track} tabIndex={0} aria-label="Productos de la galería">
        {items.map((it) => (
          <GalleryCard
            key={it.image}
            image={`/img/gallery/${it.image}_lrg.jpg`}
            alt={it.alt}
            tag={it.tag}
            title={it.title}
            text={it.text}
            hidden={active !== "all" && !it.categories.includes(active)}
          />
        ))}
      </div>
    </div>
  );
}
