import { PropsWithChildren, ReactNode } from "react";
//#region src/components/Surface/Accordion/Accordion.d.ts
interface Properties extends PropsWithChildren {
  /** The class name of the accordion. */
  className?: string;
  /** The class name of the header. */
  headerClassName?: string;
  /** The title of the accordion. */
  title: ReactNode;
  /** The kind of the title. */
  titleKind?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /** The class name of the title. */
  titleClassName?: string;
  /** The class name of the icon. */
  iconClassName?: string;
  /** Whether the accordion is opened initially. */
  opened?: boolean;
  /** The content of the accordion. */
  children: ReactNode;
  /** The class name of the body (children). */
  bodyClassName?: string;
}
declare function Accordion({ className, headerClassName, title, titleKind: TitleKind, titleClassName, iconClassName, opened, bodyClassName, children }: Properties): import("react").JSX.Element;
//#endregion
export { Accordion };