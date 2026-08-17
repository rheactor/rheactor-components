"use client";

import { twMerge } from "@rheactor/rheactor-core";
import Link from "next/link";
import { useContext } from "react";
import type { ComponentProps } from "react";

import { ResourceContext } from "#/components/Generic/Resource/ResourceProvider";

interface Properties extends Omit<ComponentProps<"div">, "id"> {
  /**
   * The type of the resource.
   *
   * Defaults to `media`.
   */
  type?: string;

  /** The ID of the resource. */
  id: number;
}

export function Resource({ type = "media", id, className, children, ...properties }: Properties) {
  const { domain } = useContext(ResourceContext);

  return (
    <div data-component="Resource" className={twMerge("relative", className)} {...properties}>
      {children}

      {domain !== undefined && (
        <Link
          href={`https://${domain}/admin/${type}/edit/${id}`}
          className="absolute inset-0 rounded bg-red-500/25 outline-2 outline-offset-2 outline-red-500 transition group-not-data-enabled/resource:pointer-events-none group-not-data-enabled/resource:opacity-0 hover:bg-red-500/50"
        />
      )}
    </div>
  );
}
