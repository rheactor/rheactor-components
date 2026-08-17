import { twMerge } from "@rheactor/rheactor-core";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import Link from "next/link";

import type { ShareNetwork } from "#/components/Generic/Share/ShareNetwork";

interface Properties {
  network: ShareNetwork;
  title: string;
  url: string;
  className?: string;
  suppressHydrationWarning?: boolean;
  onClick(this: void): void;
}

const shareNetworkIconClassName = "cursor-pointer rounded-sm p-2 transition hover:scale-105";

export function ShareNetworkIcon({
  network,
  title,
  url,
  className,
  onClick: handleClick,
}: Properties) {
  if (network.url === "native") {
    return (
      <div
        data-component="ShareNetworkIconNative"
        data-network={network.name.toLowerCase()}
        className={twMerge(shareNetworkIconClassName, network.className, className)}
        onClick={() => {
          void navigator.share({ title, url });
          handleClick();
        }}
      >
        <Icon type={network.icon} className="size-full" />
      </div>
    );
  }

  return (
    <Link
      target="_blank"
      href={network.url({ title, url })}
      data-component="ShareNetworkIcon"
      data-network={network.name.toLowerCase()}
      className={twMerge(shareNetworkIconClassName, network.className, className)}
      onClick={handleClick}
    >
      <Icon type={network.icon} className="size-full" />
    </Link>
  );
}
