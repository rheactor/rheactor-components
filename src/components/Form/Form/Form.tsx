"use client";

import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { useContext } from "react";
import type { ComponentProps } from "react";

import { FormContext, FormProvider } from "#/components/Form/Form/FormProvider";
import { contextWrapper } from "#/services/ContextService";

export const Form = contextWrapper(
  FormProvider,
  ({ onFocus, className, ...properties }: ComponentProps<"form">) => {
    const { focused, setFocused } = useContext(FormContext);

    return (
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form
        data-component="Form"
        data-focused={focused === true || undefined}
        suppressHydrationWarning
        className={twMerge(
          "max-mobile:[--grid-cols:1] not-max-mobile:grid-cols-12 grid gap-4",
          className,
        )}
        onFocus={(focusEvent) => {
          setFocused?.(true);
          onFocus?.(focusEvent);
        }}
        {...properties}
      />
    );
  },
);
