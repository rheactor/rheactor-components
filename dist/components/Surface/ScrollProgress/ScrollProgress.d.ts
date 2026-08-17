import { PropsWithChildren } from "react";
//#region src/components/Surface/ScrollProgress/ScrollProgress.d.ts
interface Properties extends PropsWithChildren {
  /** The className of the container. */
  className?: string;
  /** The className of the progress bar. */
  progressClassName?: string;
  /** The callback when the progress is updated. */
  onProgress?(this: void, progress: number): void;
  /** The callback when the progress is completed. */
  onCompleted?(this: void): void;
}
declare function ScrollProgress({ className, progressClassName, children, onProgress, onCompleted }: Properties): false | import("react").JSX.Element;
//#endregion
export { ScrollProgress };