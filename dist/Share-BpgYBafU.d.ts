import { IconType } from "@rheactor/rheactor-font-awesome";
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
declare function Share({ text, title, url, networks, networkClassName, className, onShare }: Properties): import("react").JSX.Element;
//#endregion
export { Share as t };