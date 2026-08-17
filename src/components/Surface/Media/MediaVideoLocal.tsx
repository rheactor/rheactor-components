import { getExtension, twMerge } from "@rheactor/rheactor-core";

interface Properties {
  /** The source of the image. */
  src: string;

  /** The source of the poster image. */
  posterSrc?: string | { src: string };

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

export function MediaVideoLocal({
  src,
  posterSrc,
  background = false,
  protect = false,
  className,
}: Properties) {
  return (
    // oxlint-disable-next-line jsx-a11y/media-has-caption
    <video
      playsInline
      poster={typeof posterSrc === "object" ? posterSrc.src : posterSrc}
      controls={!background}
      controlsList={protect ? "nodownload" : undefined}
      autoPlay={background}
      muted={background}
      loop={background}
      preload={posterSrc === undefined ? "metadata" : "none"}
      data-component="MediaVideoLocal"
      className={twMerge("aspect-video w-full", className)}
    >
      <source src={src} type={`video/${getExtension(src)}`} />
    </video>
  );
}
