//#region src/components/Surface/Media/MediaVideoYoutube.d.ts
interface Properties {
  /** The source of the video. */
  id: string;
  /** The title of the video. */
  title?: string;
  /** The class name of the video. */
  className?: string;
  /** The class name of the iframe. */
  iframeClassName?: string;
  /** The class name of the thumbnail. */
  thumbnailClassName?: string;
  /** The class name of the overlay. */
  overlayClassName?: string;
  /** The class name of the play button. */
  playClassName?: string;
  /**
   * The position of the play button.
   *
   * Defaults to `center`.
   */
  playPosition?: "bottom-left" | "bottom-right" | "center" | "top-left" | "top-right" | false;
  /**
   * The opacity of the play button.
   *
   * Defaults to `1`.
   */
  playOpacity?: number;
  /** The callback when the play button is clicked. */
  onPlay?(this: void, id: string): void;
}
declare function MediaVideoYoutube({ id, title, className, iframeClassName, thumbnailClassName, overlayClassName, playClassName, playPosition, playOpacity, onPlay }: Properties): import("react").JSX.Element;
//#endregion
export { MediaVideoYoutube as t };