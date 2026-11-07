"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartLine } from "@/components/molecules/CartLine";
import { QuoteRequestForm } from "@/components/molecules/QuoteRequestForm";
import { wa } from "@/content/site";
import { cartActions, countPieces, useCartItems, useCartNotes, useCartOpen } from "@/lib/cart-store";
import { quoteHref } from "@/lib/quote-message";
import styles from "./CartDrawer.module.css";

type Step = "cart" | "form" | "done";

const Check = ({ size = 14 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.2A8.5 8.5 0 1 1 20 11.5z" /></svg>
);

/** Indicador de pasos: Tu cotización → Tus datos → Listo. */
function Steps({ step }: { step: Step }) {
  const current = step === "cart" ? 1 : step === "form" ? 2 : 3;
  return (
    <ol className={styles.steps} aria-label="Pasos para solicitar tu cotización">
      {["Tu cotización", "Tus datos", "Listo"].map((label, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "current" : "todo";
        return (
          <li key={label} data-state={state} aria-current={n === current ? "step" : undefined}>
            <span className={styles.stepDot}>{state === "done" ? <Check size={12} /> : n}</span>
            {label}
          </li>
        );
      })}
    </ol>
  );
}

/** Contenido del panel. Se monta cada vez que se abre, así siempre empieza en "Tu cotización". */
function DrawerBody({ close }: { close: () => void }) {
  const items = useCartItems();
  const notes = useCartNotes();
  const [step, setStep] = useState<Step>("cart");
  const [folio, setFolio] = useState<string | null>(null);
  const [notesOpen, setNotesOpen] = useState(() => notes.length > 0);

  const pieces = countPieces(items);
  const missing = items.filter((i) => i.qty < 1).length; // líneas sin cantidad

  if (step === "done") {
    return (
      <>
        <Steps step="done" />
        <div className={styles.scroll}>
          <div className={styles.done}>
            <div className={styles.doneIcon} aria-hidden="true"><Check size={34} /></div>
            <h3 className={styles.doneTitle}>¡Solicitud enviada!</h3>
            {folio && <p className={styles.folio}>Folio <strong>{folio}</strong></p>}
            <ol className={styles.next} aria-label="Qué sigue">
              <li>Nuestro equipo revisa tu solicitud.</li>
              <li>Te contactamos por WhatsApp o correo.</li>
              <li>Recibes tu cotización con precios y tiempos de entrega.</li>
            </ol>
            <a className={styles.waLink} href={wa(encodeURIComponent(folio ? `Hola, acabo de enviar la solicitud de cotización ${folio} desde la tienda.` : "Hola, acabo de enviar una solicitud de cotización desde la tienda."))} target="_blank" rel="noopener">
              <WhatsAppIcon /> ¿Prefieres hablar ya?
            </a>
            <Link href="/tienda" className={styles.browse} onClick={close}>Seguir viendo productos</Link>
          </div>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.scroll}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
          </div>
          <p className={styles.emptyTitle}>Tu cotización está vacía</p>
          <p>Agrega los productos que te gusten, con su color y cantidad, y mándanos todo en una sola solicitud.</p>
          <Link href="/tienda" className={styles.browse} onClick={close}>Ver productos</Link>
        </div>
      </div>
    );
  }

  if (step === "form") {
    return (
      <>
        <Steps step="form" />
        <QuoteRequestForm items={items} notes={notes} onBack={() => setStep("cart")} onSent={(f) => { setFolio(f); cartActions.clear(); setStep("done"); }} />
      </>
    );
  }

  return (
    <>
      <Steps step="cart" />
      <div className={styles.scroll}>
        <ul className={styles.list}>
          {items.map((i) => (
            <CartLine key={i.key} item={i} onQty={(q) => cartActions.setQty(i.key, q)} onRemove={() => cartActions.remove(i.key)} onNavigate={close} />
          ))}
        </ul>
        <details className={styles.notesBox} open={notesOpen} onToggle={(e) => setNotesOpen(e.currentTarget.open)}>
          <summary>Agregar comentarios <small>logotipo, técnica, fecha…</small></summary>
          <textarea value={notes} rows={3} maxLength={600} aria-label="Comentarios para tu cotización" placeholder="Ej.: grabado láser con nuestro logo, lo necesitamos para el 15 de diciembre." onChange={(e) => cartActions.setNotes(e.target.value)} />
        </details>
      </div>
      <footer className={styles.foot}>
        <dl className={styles.totals}>
          <div><dt>{items.length === 1 ? "Producto" : "Productos"}</dt><dd>{items.length}</dd></div>
          <div><dt>{pieces === 1 ? "Pieza" : "Piezas"}</dt><dd>{pieces.toLocaleString("es-MX")}</dd></div>
        </dl>
        {missing > 0 && <p className={styles.warn} role="alert">Indica cuántas piezas necesitas de {missing === 1 ? "1 producto" : `${missing} productos`} para continuar.</p>}
        <button type="button" className={styles.request} disabled={missing > 0} onClick={() => setStep("form")}>
          Solicitar cotización <span aria-hidden="true">→</span>
        </button>
        {missing > 0 ? (
          <span className={`${styles.alt} ${styles.altOff}`} aria-disabled="true"><WhatsAppIcon /> Enviar por WhatsApp</span>
        ) : (
          <a className={styles.alt} href={quoteHref(items, notes)} target="_blank" rel="noopener"><WhatsAppIcon /> Enviar por WhatsApp</a>
        )}
        <p className={styles.assure}><Check size={14} /> Sin compromiso. Te respondemos con precios y tiempos.</p>
        <button type="button" className={styles.clear} onClick={cartActions.clear}>Vaciar cotización</button>
      </footer>
    </>
  );
}

/**
 * Organism (cliente): panel lateral "Mi cotización" en 3 pasos (tu cotización → tus datos → listo).
 * Usa <dialog> modal: foco atrapado, Esc cierra y el fondo se oscurece. Se monta una sola vez en el layout.
 */
export function CartDrawer() {
  const items = useCartItems();
  const open = useCartOpen();
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const close = cartActions.closeDrawer;

  return (
    <dialog
      ref={dialog}
      className={styles.drawer}
      aria-labelledby="cart-title"
      onClose={close}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className={styles.panel}>
        <header className={styles.head}>
          <h2 id="cart-title" className={styles.title}>
            Mi cotización {items.length > 0 && <span className={styles.count}>{items.length}</span>}
          </h2>
          <button type="button" className={styles.close} onClick={close} aria-label="Cerrar mi cotización">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
          </button>
        </header>
        {open && <DrawerBody close={close} />}
      </div>
    </dialog>
  );
}
