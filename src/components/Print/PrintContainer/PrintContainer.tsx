import type { PropsWithChildren, ReactNode } from "react";

interface Properties extends PropsWithChildren {
  /** The content of the container. */
  children: ReactNode;
}

/**
 * This component renders a container with some default styles for printing.
 *
 * It should be used as the outermost component when printing.
 */
export function PrintContainer({ children }: Properties) {
  return (
    <div
      data-component="PrintContainer"
      className="flex-col items-center-safe justify-center-safe gap-y-8 not-print:flex not-print:min-h-screen not-print:w-fit not-print:min-w-full not-print:bg-slate-200 not-print:p-8"
    >
      {children}
    </div>
  );
}
