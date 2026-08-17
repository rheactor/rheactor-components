import { twMerge } from "@rheactor/rheactor-core";
import type { ComponentProps } from "react";

import { Container } from "#/components/Primitive/Container/Container";

export function HeaderContainer({ className, ...properties }: ComponentProps<typeof Container>) {
  return (
    <Container
      className={twMerge("flex justify-between gap-x-4", className)}
      {...properties}
      data-component="HeaderContainer"
    />
  );
}
