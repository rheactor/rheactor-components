"use client";

import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { useContext } from "react";
import type { ComponentProps } from "react";

import { inputClassName } from "#/components/fixtures";
import { FormContext } from "#/components/Form/Form/FormProvider";
import { LabelContext } from "#/components/Form/Label/LabelProvider";

export function Textarea({ placeholder, className, ...properties }: ComponentProps<"textarea">) {
  const { focused } = useContext(FormContext);
  const { primaryPlaceholder } = useContext(LabelContext);

  return (
    <textarea
      data-component="Textarea"
      suppressHydrationWarning
      className={twMerge(inputClassName, className)}
      placeholder={
        primaryPlaceholder === undefined || focused === true ? placeholder : primaryPlaceholder
      }
      {...properties}
    />
  );
}
