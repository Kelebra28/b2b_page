"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { NavItem } from "@/content/navigation";
import styles from "./NavList.module.css";

type Props = { items: NavItem[] };

const idOf = (href: string) => (href.startsWith("/#") ? href.slice(2) : null);

/**
 * Molecule (client): lista de navegación con indicador láser que se desliza,
 * dropdown con línea láser y link activo (scroll-spy en la home, ruta en el resto).
 */
export function NavList({ items }: Props) {
  const pathname = usePathname();
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<(HTMLElement | null)[]>([]);
  const [spyIdx, setSpyIdx] = useState<number | null>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const returningFocus = useRef(false); // el foco que devuelve Esc no debe reabrir el menú
  const [box, setBox] = useState<{ x: number; w: number } | null>(null);

  // Scroll-spy: solo en la home
  useEffect(() => {
    if (pathname !== "/") return;
    const map = new Map<string, number>();
    items.forEach((item, i) => {
      const own = idOf(item.href);
      if (own) map.set(own, i);
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSpyIdx(map.get(e.target.id) ?? null);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    map.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onTop = () => window.scrollY < 120 && setSpyIdx(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [pathname, items]);

  const routeIdx = items.findIndex((i) => !i.external && i.href === pathname);
  const activeIdx = pathname === "/" ? (spyIdx ?? 0) : routeIdx >= 0 ? routeIdx : null;
  const target = hoverIdx ?? activeIdx;

  useLayoutEffect(() => {
    const place = () => {
      const a = target !== null ? linkRefs.current[target] : null;
      const list = listRef.current;
      if (!a || !list) return setBox(null);
      const l = list.getBoundingClientRect();
      const r = a.getBoundingClientRect();
      setBox({ x: r.left - l.left, w: r.width });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [target]);

  return (
    <nav aria-label="Navegación principal">
      <ul
        className={styles.list}
        ref={listRef}
        data-dismissed={dismissed}
        onKeyDown={(e) => {
          // Esc cierra el mega menú y devuelve el foco al enlace "Servicios".
          if (e.key === "Escape" && dismissed === false) {
            setDismissed(true);
            // Enlace de nivel superior (p. ej. "Servicios") que contiene al elemento enfocado.
            const top = Array.from(listRef.current?.children ?? []).find((el) => el.tagName === "LI" && el.contains(document.activeElement));
            const topLink = top?.querySelector<HTMLElement>(":scope > a");
            returningFocus.current = true;
            topLink?.focus();
            returningFocus.current = false;
          }
        }}
        onPointerLeave={() => setHoverIdx(null)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setHoverIdx(null);
        }}
      >
        <span
          className={styles.indicator}
          aria-hidden="true"
          data-on={box !== null}
          style={box ? { width: box.w, transform: `translateX(${box.x}px)` } : undefined}
        />
        {items.map((item, i) => {
          const linkProps = item.external
            ? { target: "_blank", rel: "noopener" }
            : {};
          return (
            <li
              key={item.label}
              className={item.groups ? styles.hasMenu : undefined}
              onPointerEnter={() => {
                setHoverIdx(i);
                setDismissed(false);
              }}
              onFocus={(e) => {
                setHoverIdx(i);
                // Si el foco llega desde fuera del menú o a otro enlace de nivel superior, se vuelve a permitir abrirlo.
                if (!returningFocus.current && e.target === e.currentTarget.querySelector(":scope > a")) setDismissed(false);
              }}
            >
              <Link
                href={item.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                className={styles.link}
                aria-current={i === activeIdx ? "location" : undefined}
                {...linkProps}
              >
                {item.label}
                {item.groups && <span className={styles.chevron} aria-hidden="true" />}
              </Link>
              {item.groups && (
                <div className={styles.mega}>
                  <div className={styles.megaGrid}>
                    {item.groups.map((g, gi) => (
                      <section key={g.title} className={styles.group}>
                        <h3 className={styles.groupTitle}>
                          <span className={styles.groupNum}>{String(gi + 1).padStart(2, "0")}</span>
                          {g.title}
                        </h3>
                        <ul>
                          {g.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className={styles.megaLink}>
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                  <div className={styles.megaFoot}>
                    <span>
                      {item.groups.reduce((n, g) => n + g.links.length, 0)} servicios en{" "}
                      {item.groups.length} especialidades
                    </span>
                    <Link href={item.href} className={styles.megaAll}>
                      Ver directorio completo →
                    </Link>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
