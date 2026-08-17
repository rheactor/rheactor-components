import Link from "next/link";
import type { ComponentProps } from "react";

interface Properties extends Omit<ComponentProps<typeof Link>, "href"> {
  href?: string | null;
}

export function LinkOptional({ href, ...properties }: Properties) {
  if (href === undefined || href === null) {
    // oxlint-disable-next-line jsx-a11y/anchor-has-content
    return <a {...properties} />;
  }

  return <Link href={href} {...properties} />;
}
