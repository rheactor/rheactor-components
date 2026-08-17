import { ComponentProps, FormHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { Arrayable } from "@rheactor/rheactor-core";
import { JSX as JSX$1 } from "react/jsx-runtime";
//#region src/components/Form/Button/Button.d.ts
interface Properties$8 extends ComponentProps<"button"> {
  /**
   * The type of the button.
   *
   * Defaults to "button".
   */
  type?: ComponentProps<"button">["type"];
  /**
   * Specifies the fill style of the button. Can be "outline", "solid", or "transparent".
   *
   * Defaults to "solid".
   */
  fill?: "outline" | "solid" | "transparent";
  /** The component type. */
  __internalComponentType?: string;
  /** If true, the button will render as a child element. */
  asChild?: boolean;
}
declare function Button({ type, disabled, fill, className, asChild, __internalComponentType, children, ...properties }: Properties$8): JSX$1.Element;
//#endregion
//#region src/components/Form/Select/Select.d.ts
interface Properties$7 extends ComponentProps<"select"> {
  /** The placeholder of the select. */
  placeholder?: string;
  /**
   * The options of the select.
   *
   * A `null` entry forces an empty separator (`<optgroup>`) between the surrounding options, even
   * when the adjacent groups are the same.
   */
  options: Array<OptionItem | null>;
  /** The className of the option. */
  className?: string;
  /** The className of the arrow. */
  arrowClassName?: string;
}
interface OptionItem {
  /** The title of the option. */
  title?: string;
  /**
   * The value of the option.
   *
   * Defaults to same as `title`.
   */
  value?: string;
  /** The className of the option. */
  className?: string;
  /**
   * The group this option belongs to. Options sharing the same group are rendered together inside a
   * single `<optgroup>`, respecting the order of their first appearance. When omitted, the option
   * is rendered at the root of the `<select>`.
   */
  group?: string;
}
declare function Select({ placeholder, options, className, arrowClassName, ...properties }: Properties$7): import("react").JSX.Element;
//#endregion
//#region src/components/Generic/InputSearch/InputSearch.d.ts
interface Properties$6 {
  /** The class name that will be appended to the container element. */
  className?: string;
  /** The URL that the form data will be submitted to. */
  formAction?: FormHTMLAttributes<HTMLFormElement>["action"];
  /**
   * The method in which the form data will be submitted.
   *
   * Defaults to `get`.
   */
  formMethod?: FormHTMLAttributes<HTMLFormElement>["method"];
  /** The class name that will be appended to the search icon. */
  iconClassName?: string;
  /** The name of the search input. */
  inputName?: string;
  /** The default value of the search input. */
  inputDefaultValue?: string;
  /** The class name that will be appended to the search input. */
  inputClassName?: string;
  /** The placeholder text of the search input. */
  inputPlaceholder?: string;
  /** The class name that will be appended to the search button. */
  buttonClassName?: string;
  /** The text of the search button. */
  buttonText?: ReactNode;
}
declare function InputSearch({ className, formAction, formMethod, iconClassName, inputName, inputDefaultValue, inputClassName, inputPlaceholder, buttonClassName, buttonText }: Properties$6): import("react").JSX.Element;
//#endregion
//#region src/components/Primitive/Container/Container.d.ts
interface Properties$5 extends PropsWithChildren {
  /**
   * Determines the horizontal padding of the container.
   *
   * Defaults to `4` (1rem).
   */
  paddingX?: number;
  /**
   * Determines if the container is fluid.
   *
   * It means that the container will take the full width of the screen.
   */
  fluid?: boolean;
  /** Container class name. */
  className?: string;
  /** Container children. */
  children?: ReactNode;
}
declare function Container({ paddingX, fluid, className, children }: Properties$5): import("react").JSX.Element;
//#endregion
//#region src/components/Header/HeaderContainer/HeaderContainer.d.ts
declare function HeaderContainer({ className, ...properties }: ComponentProps<typeof Container>): import("react").JSX.Element;
//#endregion
//#region src/components/Primitive/Alert/Alert.d.ts
interface Properties$4 extends PropsWithChildren {
  /** Title of the alert. */
  title: string;
  /** Variant of the alert. */
  variant: "advice" | "critical" | "debug" | "error" | "info" | "success" | "warning";
}
declare function Alert({ title, variant, children }: Properties$4): import("react").JSX.Element;
//#endregion
//#region src/components/Primitive/Section/Section.d.ts
interface Properties$3 extends PropsWithChildren {
  /** Container id to be used as anchor. */
  id?: string;
  /**
   * Container vertical margin.
   *
   * Default to `16` (4rem).
   */
  marginY?: number;
  /**
   * Container top margin.
   *
   * Default to `marginY`.
   */
  marginTop?: number;
  /**
   * Container bottom margin.
   *
   * Default to `marginY`.
   */
  marginBottom?: number;
  /** Container class name. */
  className?: string;
  /** Container children. */
  children?: ReactNode;
}
declare function Section({ id, marginY, marginTop, marginBottom, className, children }: Properties$3): import("react").JSX.Element;
//#endregion
//#region src/components/Print/PrintContainer/PrintContainer.d.ts
interface Properties$2 extends PropsWithChildren {
  /** The content of the container. */
  children: ReactNode;
}
/**
 * This component renders a container with some default styles for printing.
 *
 * It should be used as the outermost component when printing.
 */
declare function PrintContainer({ children }: Properties$2): import("react").JSX.Element;
//#endregion
//#region src/components/Surface/Hero/Hero.d.ts
interface Properties$1 extends PropsWithChildren {
  /** The id of the hero. */
  id?: string;
  /** The class name of the hero. */
  className?: string;
  /** The content of the background. */
  backgroundContent: ReactNode;
  /** The content of the hero. */
  children?: ReactNode;
}
declare function Hero({ id, className, backgroundContent, children }: Properties$1): import("react").JSX.Element;
//#endregion
//#region src/components/Theme/Theme/Theme.d.ts
interface Properties extends PropsWithChildren {
  /** The variant of the theme. */
  variant: Variant | (string & {});
  /** The content. */
  children: ReactNode;
}
type Variant = VariantSemantic | "amber" | "blue" | "cyan" | "emerald" | "fuchsia" | "gray" | "green" | "indigo" | "lime" | "neutral" | "orange" | "pink" | "purple" | "red" | "rose" | "sky" | "slate" | "stone" | "teal" | "violet" | "yellow" | "zinc";
type VariantSemantic = "danger" | "debug" | "error" | "info" | "success" | "warning";
/** A utility component to change the color of any element based on a variant as theme. */
declare function Theme({ variant, children }: Properties): import("react").JSX.Element;
//#endregion
//#region src/services/EventService.d.ts
type UnloadCallback = () => void;
type Callback = (event: Event, unload: UnloadCallback) => void;
declare function listenEvent(element: EventTarget, eventName: Arrayable<keyof WindowEventMap>, callback: EventListener, shouldImmediate?: boolean): () => void;
declare function listenScroll(element: EventTarget, callback: Callback): () => void;
declare function listenWindowEvent(eventName: Arrayable<keyof WindowEventMap>, callback: EventListener, shouldImmediate?: boolean): () => void;
declare function listenWindowScroll(callback: Callback): () => void;
//#endregion
//#region src/services/MutationService.d.ts
declare function listenMutationObserver(element: Element | null | undefined, options: MutationObserverInit, callback: MutationCallback, shouldImmediate?: boolean): () => void;
declare function listenResizeObserver(element: Element | null | undefined, options: ResizeObserverOptions, callback: ResizeObserverCallback, shouldImmediate?: boolean): () => void;
//#endregion
//#region src/services/UrlService.d.ts
declare function generateQueryString(parameters: Record<string, string | undefined>): string;
//#endregion
export { Alert, Button, Container, HeaderContainer, Hero, InputSearch, PrintContainer, Section, Select, Theme, generateQueryString, listenEvent, listenMutationObserver, listenResizeObserver, listenScroll, listenWindowEvent, listenWindowScroll };