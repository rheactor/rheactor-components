import { PropsWithChildren, ReactElement, ReactNode } from "react";
import { IconType } from "@rheactor/rheactor-font-awesome";
//#region src/components/Header/HeaderNav/HeaderNav.d.ts
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
declare function HeaderNav({ navClassName, listClassName, children, icon, iconClassName, closedIcon, closedIconClassName, openedModalContent }: Properties): false | import("react").JSX.Element;
//#endregion
export { HeaderNav };