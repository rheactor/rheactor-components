/* eslint-disable react/iframe-missing-sandbox */
"use client";

import { twMerge } from "@rheactor/rheactor-core";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { YoutubePlay } from "#/components/Surface/Media/fixtures/YoutubePlay";
import { MediaImage } from "#/components/Surface/Media/MediaImage";
import { getVideoYoutubeThumbnail } from "#/services/VideoService";

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

export function MediaVideoYoutube({
  id,
  title = `ID ${id}`,
  className,
  iframeClassName,
  thumbnailClassName,
  overlayClassName,
  playClassName,
  playPosition = "center",
  playOpacity = 1,
  onPlay,
}: Properties) {
  const [play, setPlay] = useState(false);

  const style = useMemo(() => ({ "--opacity": playOpacity }) as CSSProperties, [playOpacity]);

  return (
    <div
      data-component="MediaVideoYoutube"
      className={twMerge(
        "group/thumbnail relative aspect-video w-full overflow-hidden transition",
        !play && "cursor-pointer active:brightness-75",
        className,
      )}
      onClick={() => {
        setPlay((state) => {
          if (!state) {
            onPlay?.(id);
          }

          return true;
        });
      }}
    >
      {play ? (
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={twMerge("absolute size-full", iframeClassName)}
        />
      ) : (
        <>
          <MediaImage
            src={getVideoYoutubeThumbnail(id)}
            alt="thumbnail"
            className={twMerge(
              "absolute size-full object-cover transition group-hover/thumbnail:scale-105",
              thumbnailClassName,
            )}
            unoptimized
          />

          <div
            className={twMerge(
              "from-theme-950/75 to-theme-950/25 group-hover/thumbnail:from-theme-950/25 absolute flex size-full items-center justify-center bg-linear-to-t transition",
              overlayClassName,
            )}
          />

          {playPosition !== false && (
            <YoutubePlay
              style={style}
              className={twMerge(
                "absolute w-16 transition not-hover:opacity-(--opacity) group-hover/thumbnail:scale-115",
                playPosition === "center"
                  ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  : playPosition === "top-right"
                    ? "top-4 right-4"
                    : playPosition === "top-left"
                      ? "top-4 left-4"
                      : playPosition === "bottom-right"
                        ? "right-4 bottom-4"
                        : "bottom-4 left-4",
                playClassName,
              )}
            />
          )}
        </>
      )}
    </div>
  );
}
