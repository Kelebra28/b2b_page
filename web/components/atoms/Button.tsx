import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
};

/** Atom: botón/enlace. Los links externos (http) abren en pestaña nueva. */
export function Button({ href, children, variant = "primary" }: Props) {
  const external = href.startsWith("http");
  const cls = `${styles.button} ${styles[variant]}`;
  const content = (
    <>
      <span>{children}</span>
      <Icon name="arrow" size={18} />
    </>
  );
  return external ? (
    <a className={cls} href={href} target="_blank" rel="noopener">
      {content}
    </a>
  ) : (
    <Link className={cls} href={href}>
      {content}
    </Link>
  );
}
