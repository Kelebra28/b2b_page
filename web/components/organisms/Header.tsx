import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { WhatsAppButton } from "@/components/atoms/WhatsAppButton";
import { CartButton } from "@/components/molecules/CartButton";
import { HeaderShell } from "@/components/molecules/HeaderShell";
import { NavList } from "@/components/molecules/NavList";
import { mainNav, whatsappCta } from "@/content/navigation";

/**
 * Organism: barra de navegación "Laser Beam".
 * Server component: arma las piezas; la interactividad vive en HeaderShell y NavList.
 */
export function Header() {
  return (
    <HeaderShell
      brand={
        <Link href="/" aria-label="Ir al inicio de Laser Inova">
          <Logo variant="blanco" priority />
          <Logo variant="negro" priority />
        </Link>
      }
      nav={<NavList items={mainNav} />}
      cart={<CartButton />}
      cta={<WhatsAppButton {...whatsappCta} />}
    />
  );
}
