import type { IconType } from "@rheactor/rheactor-font-awesome";
import {
  faFacebookF,
  faLinkedinIn,
  faWhatsapp,
  faXTwitter,
} from "@rheactor/rheactor-font-awesome/brands";
import { faShareNodes } from "@rheactor/rheactor-font-awesome/classic-regular";

import { generateQueryString } from "#/services/UrlService";

interface ShareNetworkUrlProperties {
  title: string;
  url: string;
}

export class ShareNetwork {
  public constructor(
    public readonly name: string,
    public readonly icon: IconType,
    public readonly className: string,
    public readonly url: "native" | (({ title, url }: ShareNetworkUrlProperties) => string),
  ) {}
}

export const networks = {
  x: new ShareNetwork(
    "X",
    faXTwitter,
    "bg-neutral-950",
    ({ title, url }) =>
      `https://x.com/intent/tweet${generateQueryString({ text: title === "" ? undefined : `${title}\n\n`, url })}`,
  ),
  facebook: new ShareNetwork(
    "Facebook",
    faFacebookF,
    "bg-[#1374C8]",
    ({ url }) => `https://www.facebook.com/sharer/sharer.php${generateQueryString({ u: url })}`,
  ),
  linkedin: new ShareNetwork(
    "LinkedIn",
    faLinkedinIn,
    "bg-[#3F95E0]",
    ({ url }) => `https://www.linkedin.com/sharing/share-offsite${generateQueryString({ url })}`,
  ),
  whatsapp: new ShareNetwork(
    "WhatsApp",
    faWhatsapp,
    "bg-[#00C04F]",
    ({ title, url }) =>
      `https://api.whatsapp.com/send${generateQueryString({
        text: title === "" ? url : `${title}\n\n${url}`,
      })}`,
  ),
  native: new ShareNetwork("Native", faShareNodes, "bg-neutral-500", "native"),
} satisfies Readonly<Record<string, ShareNetwork>>;

export type ShareNetworkName = keyof typeof networks;
