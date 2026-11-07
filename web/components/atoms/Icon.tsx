export type IconName =
  | "phone" | "mail" | "pin" | "factory" | "truck" | "tag"
  | "building" | "invoice" | "boxes" | "arrow" | "printer" | "sign" | "medal" | "gift" | "check" | "display" | "gem" | "bolt" | "briefcase" | "layers" | "window" | "eye" | "clock";

const paths: Record<IconName, string[]> = {
  phone: ["M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"],
  mail: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm18 2-10 7L2 6"],
  pin: ["M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  factory: ["M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z", "M17 18h1", "M12 18h1", "M7 18h1"],
  truck: ["M10 17h4V5H2v12h3", "M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5", "M10 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z", "M20 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"],
  tag: ["M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z", "M7 7h.01"],
  building: ["M3 21h18", "M5 21V7l8-4v18", "M19 21V11l-6-4", "M9 9v.01", "M9 12v.01", "M9 15v.01", "M9 18v.01"],
  invoice: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6", "M16 13H8", "M16 17H8", "M10 9H8"],
  boxes: ["M21 8l-9-5-9 5v8l9 5 9-5z", "M3.3 7L12 12l8.7-5", "M12 22V12"],
  arrow: ["M5 12h14", "M12 5l7 7-7 7"],
  briefcase: ["M2 7h20v14H2z", "M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"],
  layers: ["M12 2L2 7l10 5 10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
  window: ["M3 3h18v18H3z", "M3 12h18", "M12 3v18"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  check: ["M20 6L9 17l-5-5"],
  display: ["M2 4h20v13H2z", "M8 21h8", "M12 17v4"],
  gem: ["M6 3h12l4 6-10 13L2 9z", "M11 3L8 9l4 13 4-13-3-6", "M2 9h20"],
  bolt: ["M13 2L3 14h9l-1 8 10-12h-9z"],
  printer: ["M6 9V2h12v7", "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", "M6 14h12v8H6z"],
  sign: ["M12 22V3", "M4 6h13l3 3-3 3H4z", "M20 14H7l-3 3 3 3h13z"],
  medal: ["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z", "M8.2 13.9L7 23l5-3 5 3-1.2-9.1"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  gift: ["M20 12v10H4V12", "M2 7h20v5H2z", "M12 22V7", "M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z", "M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"],
};

/** Atom: ícono de trazo (hereda el color con currentColor). */
export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
