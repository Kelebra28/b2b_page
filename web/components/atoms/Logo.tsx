import Image from "next/image";

type LogoProps = {
  /** "blanco" para fondos oscuros, "negro" para fondos claros */
  variant: "blanco" | "negro";
  width?: number;
  priority?: boolean;
};

/** Atom: logo de Laser Inova (SVG, proporción 273x92). Dumb: solo recibe props. */
export function Logo({ variant, width = 170, priority = false }: LogoProps) {
  return (
    <Image
      src={`/img/logo-inova-${variant}.svg`}
      alt={variant === "blanco" ? "Logo Laser Inova" : ""}
      aria-hidden={variant === "negro" ? true : undefined}
      data-logo={variant}
      width={273}
      height={92}
      style={{ width, height: "auto" }}
      priority={priority}
    />
  );
}
