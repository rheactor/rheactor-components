"use client";

import { twMerge } from "@rheactor/rheactor-core";
import type { IconType } from "@rheactor/rheactor-font-awesome";
import { faBars, faXmark } from "@rheactor/rheactor-font-awesome/classic-regular";
import { Icon } from "@rheactor/rheactor-font-awesome/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PropsWithChildren, ReactElement, ReactNode } from "react";

import { listenWindowEvent } from "#/services/EventService";
import { useImmediateReference } from "#/services/hooks/useImmediateReference";
import { useReady } from "#/services/hooks/useReady";
import type { Resolve } from "#/services/PortalService";
import { promisePortal } from "#/services/PortalService";

interface Properties extends PropsWithChildren {
  /** The class name of the nav element. */
  navClassName?: string;

  /** The class name of the component. */
  listClassName?: string;

  /** The children of the component. Typically a list of menu items. */
  children?: ReactNode;

  /**
   * The icon to use for open the menu button.
   *
   * Defaults to `<FaBars />`.
   */
  icon?: IconType;

  /** The class name of the icon element. */
  iconClassName?: string;

  /**
   * The icon to use for close the menu button.
   *
   * Defaults to `<FaXmark />`.
   */
  closedIcon?: IconType;

  /** The class name of the icon element when the menu is closed. */
  closedIconClassName?: string;

  /**
   * The children of the opener icon.
   *
   * @param closeHandler A function to close the menu.
   */
  openedModalContent(this: void, closeHandler: () => void): ReactElement;
}

export function HeaderNav({
  navClassName,
  listClassName,
  children,
  icon = faBars,
  iconClassName,
  closedIcon = faXmark,
  closedIconClassName,
  openedModalContent,
}: Properties) {
  const isReady = useReady();

  const navReference = useRef<HTMLDivElement>(null);

  const [mobileMode, setMobileMode] = useState(true);
  const [opened, setOpened] = useState(false);

  const portalResolver = useRef<Resolve<void>>(null);

  const openedReference = useImmediateReference(opened);

  const closeOverlay = useCallback(() => {
    portalResolver.current?.();
    portalResolver.current = null;
    setOpened(false);
  }, []);

  function close() {
    const shouldOpen = !openedReference.current;

    setOpened(shouldOpen);

    if (shouldOpen) {
      if (portalResolver.current === null) {
        void (async () => {
          // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
          await promisePortal<void>((resolver) => {
            portalResolver.current = resolver;

            return (
              <div className="contents" data-overlay>
                {openedModalContent(resolver)}
              </div>
            );
          });

          closeOverlay();
        })();
      }
    } else {
      closeOverlay();
    }
  }

  const closeReference = useImmediateReference(close);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const unload = listenWindowEvent(["resize", "transitionend"], (windowEvent) => {
      if (windowEvent.type === "resize" && openedReference.current) {
        closeReference.current();
      }

      setMobileMode(navReference.current!.scrollWidth > navReference.current!.clientWidth);
    });

    const unloadClick = listenWindowEvent(
      "click",
      (clickEvent) => {
        if (
          clickEvent.target instanceof Element &&
          clickEvent.target.tagName === "A" &&
          clickEvent.target.closest("[data-overlay]")
        ) {
          closeReference.current();
        }
      },
      false,
    );

    return () => {
      unload();
      unloadClick();
    };
  }, [closeReference, isReady, openedReference]);

  const isIconVisible = useMemo(() => mobileMode || opened, [mobileMode, opened]);

  return (
    isReady && (
      <nav
        ref={navReference}
        data-forcing-overlay={opened || undefined}
        data-component="HeaderNav"
        className={twMerge("relative flex overflow-hidden text-nowrap", navClassName)}
      >
        <ul
          className={twMerge(
            "flex flex-nowrap items-center justify-between gap-x-6 transition",
            isIconVisible && "pointer-events-none opacity-0",
            listClassName,
          )}
        >
          {children}
        </ul>

        <div
          className={twMerge(
            "absolute inset-y-0 right-0 flex items-center justify-center transition select-none",
            !isIconVisible && "pointer-events-none opacity-0",
            iconClassName,
            opened && closedIconClassName,
          )}
          onClick={() => {
            close();
          }}
        >
          <div className="border-theme-200 bg-theme-200/50 active:bg-theme-300/50 hover:border-theme-300 active:border-theme-400 cursor-pointer rounded-full border p-2 transition">
            <Icon type={opened ? closedIcon : icon} />
          </div>
        </div>
      </nav>
    )
  );
}
