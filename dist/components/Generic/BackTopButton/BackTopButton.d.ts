//#region src/components/Generic/BackTopButton/BackTopButton.d.ts
interface Properties {
  /**
   * The title of the button.
   *
   * Defaults to "Back to Top".
   */
  title?: string;
  /** The class name of the button. */
  className?: string;
}
declare function BackTopButton({ title, className }: Properties): import("react").JSX.Element;
//#endregion
export { BackTopButton };