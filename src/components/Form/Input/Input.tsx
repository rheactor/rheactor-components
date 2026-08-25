"use client";

import { twMerge } from "@rheactor/rheactor-core/tailwind";
import { useContext } from "react";
import type { ComponentProps } from "react";

import { inputClassName } from "#/components/fixtures";
import { FormContext } from "#/components/Form/Form/FormProvider";
import { LabelContext } from "#/components/Form/Label/LabelProvider";

type InputCheckbox = "checkbox";
type InputColor = "color";
type InputDate = "date" | "datetime-local" | "month" | "time" | "week";
type InputFile = "file";
type InputHidden = "hidden";
type InputNumber = "number";
type InputRadio = "radio";
type InputRange = "range";
type InputText = "email" | "password" | "search" | "tel" | "text" | "url";

interface InputTextProperties extends ComponentProps<"input"> {
  /** Input type. */
  type?:
    | InputCheckbox
    | InputColor
    | InputDate
    | InputFile
    | InputHidden
    | InputNumber
    | InputRadio
    | InputRange
    | InputText;
}

type Properties = InputTextProperties;

export function Input({ type = "text", placeholder, className, ...properties }: Properties) {
  const { focused } = useContext(FormContext);
  const { primaryPlaceholder } = useContext(LabelContext);

  return (
    <input
      type={type}
      data-component="Input"
      suppressHydrationWarning
      className={twMerge(inputClassName, className)}
      placeholder={
        primaryPlaceholder === undefined || focused === true ? placeholder : primaryPlaceholder
      }
      {...properties}
    />
  );
}
