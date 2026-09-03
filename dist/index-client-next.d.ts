import { ComponentProps, PropsWithChildren } from "react";
import { IconType } from "@rheactor/rheactor-font-awesome";
//#region src/components/Generic/BackButton/BackButton.d.ts
interface Properties$2 {
  /**
   * The title of the button.
   *
   * Defaults to "Back".
   */
  title?: string;
  /** The route to go back to when location.back() is not the current site. */
  fallbackRoute?: string;
  /** The class name of the button. */
  className?: string;
}
export declare function BackButton({ title, fallbackRoute, className }: Properties$2): import("react").JSX.Element;
//#endregion
//#region src/components/Generic/Resource/Resource.d.ts
interface Properties$1 extends Omit<ComponentProps<"div">, "id"> {
  /**
   * The type of the resource.
   *
   * Defaults to `media`.
   */
  type?: string;
  /** The ID of the resource. */
  id: number;
}
export declare function Resource({ type, id, className, children, ...properties }: Properties$1): import("react").JSX.Element;
//#endregion
//#region src/components/Generic/Resource/ResourceProvider.d.ts
export declare function ResourceProvider({ children }: PropsWithChildren): import("react").JSX.Element;
//#endregion
//#region src/components/Generic/Share/ShareNetwork.d.ts
interface ShareNetworkUrlProperties {
  title: string;
  url: string;
}
declare class ShareNetwork {
  readonly name: string;
  readonly icon: IconType;
  readonly className: string;
  readonly url: "native" | (({ title, url }: ShareNetworkUrlProperties) => string);
  constructor(name: string, icon: IconType, className: string, url: "native" | (({ title, url }: ShareNetworkUrlProperties) => string));
}
declare const networks$1: {
  x: ShareNetwork;
  facebook: ShareNetwork;
  linkedin: ShareNetwork;
  whatsapp: ShareNetwork;
  native: ShareNetwork;
};
type ShareNetworkName = keyof typeof networks$1;
//#endregion
//#region src/components/Generic/Share/Share.d.ts
interface Properties {
  /**
   * Determines the text of the share header title.
   *
   * Defaults to "Share".
   */
  text?: string;
  /**
   * Determines the title of the shared content.
   *
   * Defaults to the window title.
   */
  title?: string;
  /**
   * Determines the URL of the shared content.
   *
   * Defaults to the current URL.
   */
  url?: string;
  /**
   * Determines the networks to display.
   *
   * Defaults to all networks.
   */
  networks?: ShareNetworkName[];
  /** Determines the class name of the network icon. */
  networkClassName?: string;
  /** Determines the class name of the share container. */
  className?: string;
  /** Determines the callback when a network is clicked. */
  onShare?(this: void, network: string, documentUrl: string, documentTitle: string): void;
}
export declare function Share({ text, title, url, networks, networkClassName, className, onShare }: Properties): import("react").JSX.Element;
//#endregion
//#region src/components/Surface/VLibras/VLibras.d.ts
declare global {
  var VLibras: {
    Widget: new () => void;
  };
}
export declare function VLibras(): import("react").JSX.Element;
//#endregion