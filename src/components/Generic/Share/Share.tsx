"use client";

import { twMerge } from "@rheactor/rheactor-core";
import { faShareFromSquare } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { Ready } from "#/components/Generic/Ready/Ready";
import type { ShareNetworkName } from "#/components/Generic/Share/ShareNetwork";
import { networks as allNetworks } from "#/components/Generic/Share/ShareNetwork";
import { ShareNetworkIcon } from "#/components/Generic/Share/ShareNetworkIcon";
import { listenWindowEvent } from "#/services/EventService";
import { listenMutationObserver } from "#/services/MutationService";
import { getSimplifiedUrl } from "#/services/UrlService";

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

const allNetworksKeys = Object.keys(allNetworks) as ShareNetworkName[];

export function Share({
  text = "Share",
  title,
  url,
  networks = allNetworksKeys,
  networkClassName,
  className,
  onShare,
}: Properties) {
  const [documentTitle, setDocumentTitle] = useState<string>(title ?? "");
  const [documentUrl, setDocumentUrl] = useState<string>(url ?? "");

  const [selectedNetworks, setSelectedNetworks] = useState<ShareNetworkName[]>([]);

  const style = useMemo(
    () => ({ "--networks-count": selectedNetworks.length }) as CSSProperties,
    [selectedNetworks.length],
  );

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setSelectedNetworks(
      networks.includes("native") && !("share" in navigator)
        ? [...networks].filter((network) => network !== "native")
        : networks,
    );
  }, [networks]);

  useEffect(() => {
    if (title !== undefined) {
      return;
    }

    return listenMutationObserver(document.querySelector("title"), { childList: true }, () => {
      setDocumentTitle(document.title);
    });
  }, [title]);

  useEffect(() => {
    if (url !== undefined) {
      return;
    }

    return listenWindowEvent("popstate", () => {
      setDocumentUrl(getSimplifiedUrl());
    });
  }, [url]);

  return (
    <Ready>
      <div
        data-component="Share"
        className={twMerge(
          "bg-theme-100 text-theme-500 grid grid-cols-[1fr_auto] justify-between rounded p-2 shadow",
          className,
        )}
      >
        <div className="grid grid-cols-[auto_1fr] items-center">
          <Icon type={faShareFromSquare} className="mx-2 size-5" />

          <p>{text}</p>
        </div>

        <div
          className="grid grid-cols-[repeat(var(--networks-count),1fr)] gap-2 text-white"
          style={style}
          suppressHydrationWarning
        >
          {selectedNetworks.map((network) => (
            <ShareNetworkIcon
              key={network}
              network={allNetworks[network]}
              title={documentTitle}
              url={documentUrl}
              className={networkClassName}
              onClick={() => {
                onShare?.(network, documentUrl, documentTitle);
              }}
            />
          ))}
        </div>
      </div>
    </Ready>
  );
}
