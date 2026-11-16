import Image from "next/image";
import { cn } from "../utils/cn";

export interface LogoProps {
  height?: number;
  className?: string;
  /** Empty when the logo sits inside a link that already has a name. */
  alt?: string;
  priority?: boolean;
}

const RATIO = 974 / 300;

/** Brand logo; inverted to white in the dark theme. */
export function Logo({ height = 48, className, alt = "Giunti Psychometrics", priority }: LogoProps) {
  return (
    <Image
      src="/brand/giunti-logo.png"
      alt={alt}
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto shrink-0 object-contain [[data-theme=dark]_&]:brightness-0 [[data-theme=dark]_&]:invert-[.92]", className)}
      style={{ height, width: "auto" }}
    />
  );
}
