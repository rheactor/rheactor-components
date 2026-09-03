import { ComponentProps, Dispatch, JSX as JSX$1, PropsWithChildren, ReactElement, ReactNode, SetStateAction } from "react";
import { IconType } from "@rheactor/rheactor-font-awesome";
//#region src/components/Analytics/Analytics/AnalyticsViewport.d.ts
interface Properties$13 {
  /** The name of the event to send. */
  eventName: string;
  /** The parameters to send with the event. */
  eventParams?: Record<string, unknown>;
}
export declare function AnalyticsViewport({ eventName, eventParams }: Properties$13): import("react").JSX.Element;
//#endregion
//#region src/services/hooks/useInViewport.d.ts
type Threshold = number | `${number}px`;
export declare function useInViewport(
/**
 * The threshold to consider the element visible. Can be a number (percentual) or a pixel value.
 *
 * Defaults to `25px`.
 */
threshold?: Threshold,
/**
 * Whether to consider the element visible after it leaves the viewport.
 *
 * Defaults to `false`.
 */
shouldConsiderVisibleAfterLeavingViewport?: boolean): {
  readonly ref: (element: Element | null | undefined) => void;
  readonly visible: boolean;
  readonly disconnect: () => void;
};
//#endregion
//#region src/components/Animate/Animate/Animate.d.ts
interface Properties$12 extends PropsWithChildren {
  /**
   * Effect to apply.
   *
   * Defaults to none (respects `fadeEffect`).
   */
  effect?: "fade" | "none" | "slideDown" | "slideLeft" | "slideRight" | "slideUp" | "zoomIn" | "zoomOut";
  /**
   * Animation duration.
   *
   * Defaults to `400` (0.4s).
   */
  duration?: number;
  /**
   * Animation distance.
   *
   * Defaults to `50%`.
   */
  distance?: string;
  /**
   * Animation easing.
   *
   * Defaults to `easeInOut`.
   */
  easing?: "ease-in-out" | "ease-in" | "ease-out" | "ease" | "linear";
  /**
   * Whether to apply the animation always.
   *
   * Defaults to `false`.
   */
  always?: boolean;
  /**
   * Animation threshold.
   *
   * Defaults to `25px`.
   */
  threshold?: Threshold;
  /** Container class name. */
  className?: string;
  /** Container children. */
  children?: ReactNode;
  /** Callback fired when the animation starts. */
  onAnimate?(this: void): void;
}
export declare function Animate({ effect, duration, distance, easing, always, threshold, className, children, onAnimate }: Properties$12): import("react").JSX.Element;
//#endregion
//#region src/components/Form/Form/Form.d.ts
export declare const Form: ({ onFocus, className, ...properties }: ComponentProps<"form">) => import("react").JSX.Element;
//#endregion
//#region src/components/Form/Input/Input.d.ts
type InputCheckbox = "checkbox";
type InputColor = "color";
type InputDate = "date" | "datetime-local" | "month" | "time" | "week";
type InputFile = "file";
type InputHidden = "hidden";
type InputNumber = "number";
type InputRadio = "radio";
type InputRange = "range";
type InputText = "email" | "password" | "search" | "tel" | "text" | "url";
interface InputTextProperties extends ComponentProps<"input"> {
  /** Input type. */
  type?: InputCheckbox | InputColor | InputDate | InputFile | InputHidden | InputNumber | InputRadio | InputRange | InputText;
}
type Properties$11 = InputTextProperties;
export declare function Input({ type, placeholder, className, ...properties }: Properties$11): import("react").JSX.Element;
//#endregion
//#region src/components/Form/Label/Label.d.ts
interface Properties$10 extends PropsWithChildren, Pick<ComponentProps<"label">, "ref"> {
  /** The title of the label. */
  title?: ReactNode;
  /**
   * The primary placeholder of the children input.
   *
   * - If `true`, the primary placeholder will be the title.
   * - If `string`, the primary placeholder will be the string.
   */
  primaryPlaceholder?: string | true;
  /** Whether the label is required. */
  required?: boolean;
  /** The size of the label. */
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** The class name of the title. */
  titleClassName?: string;
  /** The class name of the label. */
  className?: string;
  /** The content of the label. */
  children: ReactNode;
  /** The class name of the children. */
  childrenClassName?: string;
}
export declare function Label({ ref, title, primaryPlaceholder, required, size, titleClassName, className, children, childrenClassName }: Properties$10): import("react").JSX.Element;
//#endregion
//#region src/components/Form/Textarea/Textarea.d.ts
export declare function Textarea({ placeholder, className, ...properties }: ComponentProps<"textarea">): import("react").JSX.Element;
//#endregion
//#region src/components/Generic/BackTopButton/BackTopButton.d.ts
interface Properties$9 {
  /**
   * The title of the button.
   *
   * Defaults to "Back to Top".
   */
  title?: string;
  /** The class name of the button. */
  className?: string;
}
export declare function BackTopButton({ title, className }: Properties$9): import("react").JSX.Element;
//#endregion
//#region src/components/Generic/Ready/Ready.d.ts
export declare function Ready({ children }: PropsWithChildren): Iterable<ReactNode> | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | (string | number | bigint | boolean | Iterable<ReactNode> | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | import("react").ReactPortal | null | undefined);
//#endregion
//#region src/components/Generic/TextClamp/TextClamp.d.ts
interface Properties$8 extends PropsWithChildren {
  /** Number of lines. */
  lines: number;
  /** Class name. */
  className?: string;
  /** Children. */
  children?: ReactNode;
}
export declare function TextClamp({ lines, children, className }: Properties$8): import("react").JSX.Element;
//#endregion
//#region src/components/Header/Header/Header.d.ts
interface Properties$7 extends PropsWithChildren {
  /**
   * Defines the header positioning behavior.
   *
   * - `static`: positioned according to normal document flow, no special behavior.
   * - `relative`: follows normal flow, supports z-index, not sticky or fixed.
   * - `absolute`: removed from flow, positioned relative to nearest positioned ancestor.
   * - `fixed`: fixed to top of viewport, overlays content, removed from flow.
   * - `sticky`: sticks to top during scroll, retains space in layout, only works in scrollable
   *   containers.
   *
   * Elements with `relative` or `absolute` will never trigger `stuck:` state.
   *
   * Default is `relative`.
   */
  position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
  /**
   * Detect stick after this position.
   *
   * Defaults to `0`.
   */
  stickAfter?: number;
  /** Custom class name. */
  className?: string;
  /** Content of the header. */
  children?: ReactNode;
}
export declare function Header({ position, stickAfter, className, children }: Properties$7): import("react").JSX.Element;
//#endregion
//#region src/components/Header/HeaderNav/HeaderNav.d.ts
interface Properties$6 extends PropsWithChildren {
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
export declare function HeaderNav({ navClassName, listClassName, children, icon, iconClassName, closedIcon, closedIconClassName, openedModalContent }: Properties$6): false | import("react").JSX.Element;
//#endregion
//#region src/components/Pagination/Pagination/Pagination.d.ts
interface Properties$5 {
  /** The current page. */
  current: number;
  /** The total number of pages. */
  total: number;
  /**
   * The maximum number of visible pages.
   *
   * Defaults to `undefined` (unlimited).
   */
  visibleCount?: number;
  /** The number of additional active elements after the current page (not inclusive). */
  spread?: number;
  /**
   * The query string to append to the URL.
   *
   * Defaults to `undefined` (no query string).
   */
  queryString?: string;
  /** The class name of the container element. */
  className?: string;
  /** The class name of each page element. */
  pageClassName?: string;
  /**
   * Whether to show the previous/next buttons.
   *
   * Defaults to `true`.
   */
  previousNext?: boolean;
  /**
   * Whether to show the first/last buttons.
   *
   * Defaults to `true`.
   */
  firstLast?: boolean;
  /**
   * Whether to force the component to render when the total not is greater than one page.
   *
   * Defaults to `false`.
   */
  forceRender?: boolean;
  /** The function to call when a page is clicked. */
  onClick?(this: void, page: number): void;
}
export declare function Pagination({ current, total, visibleCount, spread, queryString, className, pageClassName, previousNext, firstLast, forceRender, onClick }: Properties$5): import("react").JSX.Element;
//#endregion
//#region src/components/Surface/Accordion/Accordion.d.ts
interface Properties$4 extends PropsWithChildren {
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
export declare function Accordion({ className, headerClassName, title, titleKind: TitleKind, titleClassName, iconClassName, opened, bodyClassName, children }: Properties$4): import("react").JSX.Element;
//#endregion
//#region src/services/AnimateService.d.ts
type EasingFunction = (time: number) => number;
declare const easings: {
  linear: (input: number) => number;
  "ease-in": (input: number) => number;
  "ease-out": (input: number) => number;
  "ease-in-out": (input: number) => number;
  ease: (input: number) => number;
};
type Easing = EasingFunction | keyof typeof easings;
//#endregion
//#region src/components/Surface/Counter/Counter.d.ts
interface Properties$3 {
  /**
   * Initial value.
   *
   * Defaults to `0`.
   */
  from?: number;
  /** Final value. */
  to: number;
  /** Thousand separator. Defaults to none. */
  thousandSeparator?: string;
  /** Decimal separator. Defaults to `.` */
  decimalSeparator?: string;
  /**
   * Number of decimals.
   *
   * Defaults to `0`.
   */
  decimals?: number;
  /**
   * Animation duration.
   *
   * Defaults to `1000`.
   */
  duration?: number;
  /**
   * Easing function.
   *
   * Defaults to `"ease-in-out"`.
   */
  easing?: Easing;
  /** Class name. */
  className?: string;
}
export declare function Counter({ from, to, thousandSeparator, decimalSeparator, decimals, duration, easing, className }: Properties$3): import("react").JSX.Element;
//#endregion
//#region src/components/Surface/FlipCard/FlipCard.d.ts
interface Properties$2 {
  /** The container class name. */
  className?: string;
  /**
   * The direction-to of the flip.
   *
   * Defaults to `right`.
   */
  flipTo?: "left" | "right";
  /**
   * The axis of the flip.
   *
   * Defaults to `horizontal`.
   */
  axis?: "horizontal" | "vertical";
  /** The content of the front of the flip card. */
  contentFront: ReactNode;
  /** The content of the back of the flip card. */
  contentBack: ReactNode;
  heightController?: "back" | "front";
  /** The class name of the touch icon. */
  touchIconClassName?: string;
  /** The callback when the user flips the card. */
  onFlip?(this: void, viewpoint: "back" | "front"): void;
}
export declare function FlipCard({ className, flipTo, axis, contentFront, contentBack, heightController, touchIconClassName, onFlip }: Properties$2): import("react").JSX.Element;
//#endregion
//#region src/components/Surface/Mosaic/Mosaic.d.ts
interface Properties$1 extends PropsWithChildren {
  /**
   * The duration of mosaic items visibility in ms.
   *
   * Defaults to 5000.
   */
  duration?: number;
  /**
   * Whether to shuffle the items.
   *
   * Defaults to false.
   */
  shuffle?: boolean;
  /** The class name of the mosaic. */
  className?: string;
  /** The content of the mosaic. */
  children?: ReactNode;
}
export declare function Mosaic({ duration, shuffle, className, children }: Properties$1): JSX$1.Element;
//#endregion
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
export declare function ScrollProgress({ className, progressClassName, children, onProgress, onCompleted }: Properties): false | import("react").JSX.Element;
//#endregion
//#region src/services/hooks/useImmediateReference.d.ts
export declare function useImmediateReference<T>(value: T): import("react").RefObject<T>;
//#endregion
//#region src/services/hooks/useLocalStorage.d.ts
export declare function useLocalStorage<T>(key: string, defaultValue?: undefined): readonly [T | undefined, Dispatch<SetStateAction<T>>];
//#endregion
//#region src/services/hooks/useReady.d.ts
export declare function useReady(): boolean;
//#endregion
//#region src/services/PortalService.d.ts
type Resolve<T> = (value: T) => void;
type Resolver<T> = (resolve: Resolve<T>) => ReactElement;
export declare function promisePortal<T>(resolver: Resolver<T>): Promise<void>;
export declare function promiseElement(node: ReactElement): Promise<void>;
//#endregion