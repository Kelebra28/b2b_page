import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { CookiePreferencesLink } from "@/components/atoms/CookiePreferencesLink";
import { Icon } from "@/components/atoms/Icon";
import { FooterColumn } from "@/components/molecules/FooterColumn";
import { serviceGroups } from "@/content/navigation";
import { cookiesRoute, privacyRoute } from "@/content/legal";
import { site, whatsappBot } from "@/content/site";
import styles from "./Footer.module.css";

/** Organism: pie de página. Server component, datos desde content/. */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Ir al inicio de Laser Inova">
              <Logo variant="blanco" width={190} />
            </Link>
            <p className={styles.tagline}>{site.tagline}</p>
            <ul className={styles.contact}>
              <li>
                <a href={site.phone.href}>
                  <Icon name="phone" />
                  <span>{site.phone.label}</span>
                </a>
              </li>
              <li>
                <a href={whatsappBot.href} target="_blank" rel="noopener">
                  <Icon name="whatsapp" />
                  <span>WhatsApp: {whatsappBot.label}</span>
                </a>
              </li>
              <li>
                <a href={site.email.href}>
                  <Icon name="mail" />
                  <span>{site.email.label}</span>
                </a>
              </li>
              <li>
                <span className={styles.static}>
                  <Icon name="pin" />
                  <span>{site.location}</span>
                </span>
              </li>
            </ul>
          </div>
          {serviceGroups.map((g, i) => (
            <FooterColumn key={g.title} title={g.title} links={g.links} index={i} />
          ))}
        </div>
        <div className={styles.bottom}>
          <p>
            &copy; {site.year} {site.name}. Todos los derechos reservados.
          </p>
          <nav className={styles.legal} aria-label="Legal y blog">
            <Link href="/blog">Blog</Link>
            <Link href={privacyRoute}>Aviso de privacidad</Link>
            <Link href={cookiesRoute}>Política de cookies</Link>
            <CookiePreferencesLink className={styles.linkButton}>Preferencias de cookies</CookiePreferencesLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
