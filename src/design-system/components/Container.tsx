import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";

export interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
}

/** Centered page column with responsive side gutters. */
export function Container({ children, as: Tag = "div", className, id }: ContainerProps) {
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
