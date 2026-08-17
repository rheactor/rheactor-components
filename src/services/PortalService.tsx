"use client";

import { cloneElement } from "react";
import type { ReactElement, RefAttributes } from "react";
import { createRoot } from "react-dom/client";

export type Resolve<T> = (value: T) => void;

export type Resolver<T> = (resolve: Resolve<T>) => ReactElement;

export async function promisePortal<T>(resolver: Resolver<T>) {
  const { promise: elementPromise, resolve: elementResolve } = Promise.withResolvers<T>();

  const element = document.createElement("div");
  const elementRoot = createRoot(element);

  elementRoot.render(resolver(elementResolve));

  document.body.append(element);

  await elementPromise;

  requestIdleCallback(() => {
    elementRoot.unmount();
    element.remove();
  });
}

export async function promiseElement(node: ReactElement) {
  return promisePortal<HTMLElement>((resolve) =>
    // oxlint-disable-next-line react/no-clone-element
    cloneElement(node, {
      ref(element: HTMLElement | null) {
        if (element !== null) {
          requestAnimationFrame(() => {
            resolve(element);
          });
        }
      },
    } as RefAttributes<HTMLDivElement>),
  );
}
