import { ComponentProps, ElementType, ReactNode } from "react";
//#region src/services/classes/HTMLTransformer.d.ts
type TextReplacerCallback = (text: string) => ReactNode;
type TagReplacerCallback<T extends ElementType> = (properties: ComponentProps<T> & Record<string, unknown>) => ReactNode;
declare class HTMLTransformer {
  private readonly attributes;
  private readonly tags;
  private readonly tagsReplacements;
  private textReplacement;
  static createDefault(): HTMLTransformer;
  allowTag(tagName: string, attributes?: string[]): void;
  allowTags(tagNames: string[]): void;
  allowAttributes(attributes: string[]): void;
  setTextReplacer(replacement: TextReplacerCallback): void;
  setTagReplacer<T extends ElementType & string>(tagName: T, replacement: TagReplacerCallback<T>): void;
  transform(html: string): import("react").FunctionComponentElement<import("react").FragmentProps>[];
  private processAttributes;
  private processChild;
  private processChildren;
}
//#endregion
export { HTMLTransformer };