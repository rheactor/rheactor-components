import getVideoId from "get-video-id";

export function getVideoYoutubeThumbnail(id: string) {
  return `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`;
}

export function getVideoThumbnail(source: string) {
  const service = getVideoId(source);

  if (service.service === "youtube") {
    return getVideoYoutubeThumbnail(service.id!);
  }

  return null;
}
