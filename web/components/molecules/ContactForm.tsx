"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ContactForm.module.css";

type Privacy = { before: string; linkLabel: string; href: string };
type Labels = { name: string; email: string; message: string; submit: string; sending: string; ok: string; error: string; invalid: string; limited: string };
type Status = "idle" | "sending" | "ok" | "error" | "invalid" | "limited";

/** Molecule (client): formulario de contacto. Envía JSON a /api/contacto. Incluye honeypot anti-spam. */
export function ContactForm({ labels, privacy }: { labels: Labels; privacy: Privacy }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 422) {
        setStatus("invalid");
        form.querySelector<HTMLElement>("input[name=name], input[name=email], textarea")?.focus();
        return;
      }
      if (res.status === 429) return setStatus("limited");
      if (!res.ok) return setStatus("error");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  const hasMessage = status === "ok" || status === "error" || status === "invalid" || status === "limited";
  const describedBy = hasMessage ? "contact-status" : undefined;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.srOnly}>{labels.name}</span>
          <input name="name" type="text" aria-invalid={status === "invalid" || undefined} aria-describedby={describedBy} placeholder={labels.name} autoComplete="name" required maxLength={200} />
        </label>
        <label className={styles.field}>
          <span className={styles.srOnly}>{labels.email}</span>
          <input name="email" type="email" aria-invalid={status === "invalid" || undefined} aria-describedby={describedBy} placeholder={labels.email} autoComplete="email" required maxLength={200} />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.srOnly}>{labels.message}</span>
        <textarea name="message" aria-invalid={status === "invalid" || undefined} aria-describedby={describedBy} placeholder={labels.message} rows={6} required maxLength={5000} />
      </label>
      {/* Honeypot: invisible para personas */}
      <input className={styles.trap} name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className={styles.submit} disabled={status === "sending"}>
        {status === "sending" ? labels.sending : labels.submit}
      </button>
      <p className={styles.privacy}>
        {privacy.before} <Link href={privacy.href}>{privacy.linkLabel}</Link>.
      </p>
      <p id="contact-status" className={`${styles.msg} ${status === "ok" ? styles.good : styles.bad}`} role={status === "ok" ? "status" : "alert"} aria-live={status === "ok" ? "polite" : "assertive"}>
        {status === "ok" && labels.ok}
        {status === "error" && labels.error}
        {status === "invalid" && labels.invalid}
        {status === "limited" && labels.limited}
      </p>
    </form>
  );
}
