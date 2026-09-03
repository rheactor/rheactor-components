import Link from "next/link";
import { ComponentProps } from "react";
//#region src/components/Generic/LinkOptional/LinkOptional.d.ts
interface Properties$1 extends Omit<ComponentProps<typeof Link>, "href"> {
  href?: string | null;
}
export declare function LinkOptional({ href, ...properties }: Properties$1): import("react").JSX.Element;
//#endregion
//#region src/components/Generic/WhatsappButton/WhatsappButton.d.ts
interface Properties {
  /** The content class name. */
  contentClassName?: string;
  /**
   * The title.
   *
   * Defaults to "WhatsApp".
   */
  title?: string;
  /** The title class name. */
  titleClassName?: string;
  /** The phone number. */
  phone: string;
  /** The phone number omit prefix. */
  phonePrefix?: string;
  /** The phone number class name. */
  phoneClassName?: string;
  /** The icon class name. */
  iconClassName?: string;
  /** The button class name. */
  className?: string;
}
export declare function WhatsappButton({ contentClassName, title, titleClassName, phone, phonePrefix, phoneClassName, iconClassName, className }: Properties): import("react").JSX.Element;
//#endregion