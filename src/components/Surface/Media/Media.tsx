"use client";

import { getExtension } from "@rheactor/rheactor-core";
import getVideoId from "get-video-id";
import type { ComponentProps } from "react";

import { MediaImage } from "#/components/Surface/Media/MediaImage";
import { MediaSVG } from "#/components/Surface/Media/MediaSVG";
import { MediaVideoLocal } from "#/components/Surface/Media/MediaVideoLocal";
import { MediaVideoYoutube } from "#/components/Surface/Media/MediaVideoYoutube";
import {
  imageAllowedExtensions,
  svgAllowedExtensions,
  videoLocalAllowedExtensions,
} from "#/supports/MediaSupport";

type ImageProperties = Omit<ComponentProps<typeof MediaImage>, "src"> & {
  src: `${string}.${(typeof imageAllowedExtensions)[number]}` | (string & {});
};

type StaticImageProperties = Omit<ComponentProps<typeof MediaImage>, "src"> & {
  src: { src: string };
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

type Properties =
  | ImageProperties
  | StaticImageProperties
  | SVGProperties
  | VideoLocalProperties
  | VideoYoutubeProperties;

function isStaticImage(properties: Properties): properties is StaticImageProperties {
  return typeof properties.src === "object" && "src" in properties.src;
}

function isExtension<ThenProperties extends Properties>(
  properties: Properties,
  extensions: readonly string[],
): properties is ThenProperties {
  return extensions.includes(getExtension(properties.src as string) ?? "");
}

export function Media(properties: Properties) {
  if (isStaticImage(properties)) {
    return <Media {...properties} src={properties.src.src} />;
  }

  if (isExtension<ImageProperties>(properties, imageAllowedExtensions)) {
    return <MediaImage {...properties} />;
  }

  if (isExtension<ImageProperties>(properties, svgAllowedExtensions)) {
    return <MediaSVG {...properties} />;
  }

  if (isExtension<VideoLocalProperties>(properties, videoLocalAllowedExtensions)) {
    return <MediaVideoLocal {...properties} />;
  }

  const service = getVideoId(properties.src);

  if (service.service === "youtube") {
    return <MediaVideoYoutube id={service.id!} {...properties} />;
  }

  return null;
}
