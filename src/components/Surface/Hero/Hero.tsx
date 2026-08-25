import { twMerge } from "@rheactor/rheactor-core/tailwind";
import type { PropsWithChildren, ReactNode } from "react";

import { Section } from "#/components/Primitive/Section/Section";

interface Properties extends PropsWithChildren {
  /** The id of the hero. */
  id?: string;

  /** The class name of the hero. */
  className?: string;

  /** The content of the background. */
  backgroundContent: ReactNode;

  /** The content of the hero. */
  children?: ReactNode;
}

export function Hero({ id, className, backgroundContent, children }: Properties) {
  return (
    <Section marginY={0} id={id} data-component="Hero" className={twMerge("relative", className)}>
      <div role="presentation" className="pointer-events-none absolute inset-0 select-none">
        {backgroundContent}
      </div>

      <div className="relative">{children}</div>
    </Section>
  );
}
