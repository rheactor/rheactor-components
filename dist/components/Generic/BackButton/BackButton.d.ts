//#region src/components/Generic/BackButton/BackButton.d.ts
interface Properties {
  /**
   * The title of the button.
   *
   * Defaults to "Back".
   */
  title?: string;
  /** The route to go back to when location.back() is not the current site. */
  fallbackRoute?: string;
  /** The class name of the button. */
  className?: string;
}
declare function BackButton({ title, fallbackRoute, className }: Properties): import("react").JSX.Element;
//#endregion
export { BackButton };