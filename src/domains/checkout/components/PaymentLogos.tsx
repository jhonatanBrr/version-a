import Image from "next/image";
import type { PaymentLogo } from "../interfaces/checkout";

/** Brand logos on white tiles so they stay legible in dark mode. */
export function PaymentLogos({ logos }: { logos: PaymentLogo[] }) {
  if (logos.length === 0) return null;
  return (
    <span className="flex flex-wrap gap-1.5">
      {logos.map((logo) => (
        <span key={logo.src} className="flex h-8 w-12 items-center justify-center rounded-ds border border-line bg-paper px-1.5">
          <Image src={logo.src} alt={logo.alt} width={32} height={20} unoptimized className="h-5 w-auto" />
        </span>
      ))}
    </span>
  );
}
