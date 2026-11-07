"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SortMenu.module.css";

type Option<T extends string> = { value: T; label: string };
type Props<T extends string> = { label: string; options: Option<T>[]; value: T; onChange: (value: T) => void };

/** Molecule (cliente): menú desplegable propio (en vez del nativo). Teclado: ↑ ↓ para moverse, Enter elige, Esc cierra. */
export function SortMenu<T extends string>({ label, options, value, onChange }: Props<T>) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const current = options.find((o) => o.value === value) ?? options[0];

  // Cierra al tocar fuera.
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  const items = () => [...(root.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [])];
  const focusSelected = () => queueMicrotask(() => (items().find((b) => b.getAttribute("aria-selected") === "true") ?? items()[0])?.focus());
  const close = () => { setOpen(false); trigger.current?.focus(); };

  const onMenuKey = (e: React.KeyboardEvent) => {
    const list = items();
    const i = list.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") { e.preventDefault(); list[(i + 1) % list.length]?.focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); list[(i - 1 + list.length) % list.length]?.focus(); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Tab") setOpen(false);
  };

  return (
    <div className={styles.root} ref={root}>
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => { setOpen((o) => !o); if (!open) focusSelected(); }}
        onKeyDown={(e) => { if (e.key === "ArrowDown" && !open) { e.preventDefault(); setOpen(true); focusSelected(); } }}
      >
        <span className={styles.label}>{label}</span>
        <strong>{current.label}</strong>
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className={open ? styles.up : undefined}><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox" aria-label={label} onKeyDown={onMenuKey}>
          {options.map((o) => (
            <li key={o.value} role="presentation">
              <button type="button" role="option" aria-selected={o.value === value} className={styles.option} onClick={() => { onChange(o.value); close(); }}>
                {o.label}
                {o.value === value && <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
