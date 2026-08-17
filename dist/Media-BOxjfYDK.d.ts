import { t as MediaImage } from "./MediaImage-DRrNT6AL.js";
import { t as MediaVideoYoutube } from "./MediaVideoYoutube-Bp0_URGx.js";
import { ComponentProps } from "react";
//#region src/components/Surface/Media/MediaSVG.d.ts
interface Properties$2 {
  /** The source of the image. */
  src: string;
  /** The alt text of the image. */
  alt: string;
  /** Determines if the image should be loaded as a priority. */
  priority?: boolean;
  /** The class name of the image. */
  className?: string;
}
declare function MediaSVG({ src, alt, priority, className }: Properties$2): import("react").JSX.Element;
//#endregion
//#region src/components/Surface/Media/MediaVideoLocal.d.ts
interface Properties$1 {
  /** The source of the image. */
  src: string;
  /** The source of the poster image. */
  posterSrc?: string | {
    src: string;
  };
  /**
   * Determine if this video will autoplay in background mode.
   *
   * Defaults to `false`.
   */
  background?: boolean;
  /** Determine if this video will be protected from downloading. */
  protect?: boolean;
  /** The class name of the image. */
  className?: string;
}
declare function MediaVideoLocal({ src, posterSrc, background, protect, className }: Properties$1): import("react").JSX.Element;
//#endregion
//#region src/supports/MediaSupport.d.ts
declare const imageAllowedExtensions: readonly ["jpg", "jpeg", "png", "webp", "gif"];
declare const svgAllowedExtensions: readonly ["svg"];
declare const videoLocalAllowedExtensions: readonly ["mp4", "webm"];
//#endregion
//#region src/components/Surface/Media/Media.d.ts
type ImageProperties = Omit<ComponentProps<typeof MediaImage>, "src"> & {
  src: `${string}.${(typeof imageAllowedExtensions)[number]}` | (string & {});
};
type StaticImageProperties = Omit<ComponentProps<typeof MediaImage>, "src"> & {
  src: {
    src: string;
  };
};
type SVGProperties = Omit<ComponentProps<typeof MediaSVG>, "src"> & {
  src: `${string}.${(typeof svgAllowedExtensions)[number]}` | (string & {});
};
type VideoLocalProperties = Omit<ComponentProps<typeof MediaVideoLocal>, "src"> & {
  src: `${string}.${(typeof videoLocalAllowedExtensions)[number]}` | (string & {});
};
type VideoYoutubeProperties = Omit<ComponentProps<typeof MediaVideoYoutube>, "id"> & {
  src: string;
};
type Properties = ImageProperties | StaticImageProperties | SVGProperties | VideoLocalProperties | VideoYoutubeProperties;
declare function Media(properties: Properties): import("react").JSX.Element | null;
//#endregion
export { Media as t };