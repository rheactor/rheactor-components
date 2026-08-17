import { ComponentProps } from "react";
//#region src/components/Generic/Resource/Resource.d.ts
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
declare function Resource({ type, id, className, children, ...properties }: Properties): import("react").JSX.Element;
//#endregion
export { Resource };