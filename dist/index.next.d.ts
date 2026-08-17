import { BackButton } from "./components/Generic/BackButton/BackButton.js";
import { Resource } from "./components/Generic/Resource/Resource.js";
import { ResourceProvider } from "./components/Generic/Resource/ResourceProvider.js";
import { t as Share } from "./Share-BpgYBafU.js";
import { VLibras as VLibrasComponent } from "./components/Surface/VLibras/VLibras.js";
import { ComponentProps } from "react";
import Link from "next/link";
//#region src/components/Generic/LinkOptional/LinkOptional.d.ts
interface Properties$1 extends Omit<ComponentProps<typeof Link>, "href"> {
  href?: string | null;
}
declare function LinkOptional({ href, ...properties }: Properties$1): import("react").JSX.Element;
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
declare function WhatsappButton({ contentClassName, title, titleClassName, phone, phonePrefix, phoneClassName, iconClassName, className }: Properties): import("react").JSX.Element;
//#endregion
export { BackButton, LinkOptional, Resource, ResourceProvider, Share, VLibrasComponent as VLibras, WhatsappButton };