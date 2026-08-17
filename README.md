# @rentalhost/rheactor-components

React component library used across Rheactor projects.

## Installation

Private package, install from your internal registry or workspace:

```sh
bun install github:@rentalhost/rheactor-components
```

Import the theme styles once, on the application root:

```ts
import "@rentalhost/rheactor-components/theme.css";
```

Peer dependencies: `react` 19, `tailwindcss` 4, `@rheactor/rheactor-core`,
`@rheactor/rheactor-font-awesome`. Heavy dependencies (`swiper`, `next` 16, `@next/third-parties`,
`get-video-id`, `react-style-stringify`, `htmlparser2`, `domhandler`) are optional and only required
by the entry point that uses them.

## Entry points

| Entry point | Import path                                 | Contents                                                                                                                                        |
| ----------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Base        | `@rentalhost/rheactor-components`           | All components, services, and hooks (except Next-dependent)                                                                                     |
| Next        | `@rentalhost/rheactor-components/Next`      | Next-dependent components (requires `next`): `BackButton`, `WhatsappButton`, `LinkOptional`, `Resource`, `ResourceProvider`, `Share`, `VLibras` |
| Slider      | `@rentalhost/rheactor-components/Slider`    | `Slider` (requires `swiper`)                                                                                                                    |
| Third       | `@rentalhost/rheactor-components/Third`     | `AnalyticsProvider`, `useAnalytics` (`@next/third-parties`)                                                                                     |
| Video       | `@rentalhost/rheactor-components/Video`     | `Media`, `getVideoThumbnail` (requires `get-video-id`)                                                                                          |
| Style       | `@rentalhost/rheactor-components/Style`     | `PrintPage` (requires `react-style-stringify`)                                                                                                  |
| Dom         | `@rentalhost/rheactor-components/Dom`       | `HTMLTransformer` (requires `htmlparser2` + `domhandler`)                                                                                       |
| Theme       | `@rentalhost/rheactor-components/theme.css` | Theme CSS, custom TailwindCSS variants                                                                                                          |

# Conventions

Every component follows a consistent data attributes convention that powers the custom TailwindCSS
variants (`theme-solid`, `theme-outline`, `theme-transparent`, `disabled`, `stuck`):

- `data-component="ComponentName"` - component identification.
- `data-theme="solid|outline|transparent"` - theme variant.
- `data-*` state attributes, e.g. `data-focused`, `data-opened`, `data-animated`, `data-stuck`.

**Import from the package root:**

```ts
// Example:
import { Button, useInViewport, listenWindowScroll } from "@rentalhost/rheactor-components";
```

Components that depend on `next` (`BackButton`, `WhatsappButton`, `LinkOptional`, `Resource`,
`ResourceProvider`, `Share`, `VLibras`) are available from the Next entry point:

```ts
// Example:
import { BackButton } from "@rentalhost/rheactor-components/Next";
```

# Form components

Form controls sharing a `Form`/`Label` context.

### Button

```ts
interface ButtonProperties extends ComponentProps<"button"> {
  type?: "button" | "submit" | "reset"; // Defaults to "button".
  fill?: "outline" | "solid" | "transparent"; // Defaults to "solid".
  asChild?: boolean;
}
```

Renders a themed `<button>` with `data-theme` set from `fill`. With `asChild`, the button styles and
behavior are merged into a single child element instead (Radix-style composition).

Use as the primary action control, or to wrap links and custom elements.

```tsx
<Button fill="outline" onClick={handleClick}>Save</Button>

<Button asChild>
  <Link href="/about">About</Link>
</Button>
```

### Form

```ts
Form(props: ComponentProps<"form">)
```

Renders a 12-column CSS grid form and provides a `FormContext` with a `focused` state, reflected as
`data-focused` on the form element. On mobile, the grid collapses to a single column.

Use as the wrapper of any form layout, so inputs and labels can react to focus.

```tsx
<Form onSubmit={handleSubmit}>
  <Input name="email" />
</Form>
```

### Input

```ts
interface InputProperties extends ComponentProps<"input"> {
  type?:
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "month"
    | "time"
    | "week"
    | "file"
    | "hidden"
    | "number"
    | "radio"
    | "range"
    | "email"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "url"; // Defaults to "text".
}
```

Renders a themed `<input>`. Inside a `Label`, the placeholder falls back to the label's
`primaryPlaceholder` while the form is not focused.

Use for all text-like and native inputs.

```tsx
<Input type="email" name="email" placeholder="you@example.com" />
```

### Label

```ts
interface LabelProperties extends PropsWithChildren {
  title?: ReactNode;
  primaryPlaceholder?: string | true;
  required?: boolean; // Defaults to false.
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; // Defaults to 12.
  titleClassName?: string;
  className?: string;
  childrenClassName?: string;
}
```

Renders a `<label>` that spans `size` columns of the `Form` grid and provides `LabelContext` to the
children input: `primaryPlaceholder` is shown as the input placeholder until the form is focused.
With `required`, a red asterisk is appended to the title.

Use to pair a title with an input inside a `Form`.

```tsx
<Label title="Email" primaryPlaceholder size={6} required>
  <Input type="email" name="email" />
</Label>
```

### Select

```ts
interface SelectProperties extends Omit<ComponentProps<"select">, "children"> {
  placeholder?: string;
  options: Array<OptionItem | null>;
  arrowClassName?: string;
}

interface OptionItem {
  title?: string;
  value?: string; // Defaults to title.
  group?: string;
  className?: string;
}
```

Renders a `<select>` with a chevron arrow. Options sharing a `group` are rendered inside a single
`<optgroup>`; a `null` entry forces an empty separator between surrounding options.

Use for dropdowns with grouped options.

```tsx
<Select
  placeholder="Choose a state"
  options={[
    { title: "São Paulo", value: "sp", group: "South" },
    { title: "Rio de Janeiro", value: "rj", group: "South" },
    { title: "Amazonas", value: "am", group: "North" },
  ]}
/>
```

### Textarea

```ts
Textarea(props: ComponentProps<"textarea">)
```

Renders a themed `<textarea>`. Inside a `Label`, the placeholder falls back to the label's
`primaryPlaceholder` while the form is not focused.

Use for multiline text input.

```tsx
<Textarea name="message" rows={5} />
```

# Generic components

Reusable functional components.

### BackButton

```ts
interface BackButtonProperties {
  title?: string; // Defaults to "Back".
  fallbackRoute?: string;
  className?: string;
}
```

Renders a button that navigates back via `history.back()`. When `fallbackRoute` is provided and the
previous entry is not from the current site, it renders a `next/link` to that route instead.

Use for "back" navigation with a safe fallback.

```tsx
<BackButton fallbackRoute="/" />
```

### BackTopButton

```ts
interface BackTopButtonProperties {
  title?: string; // Defaults to "Back to Top".
  className?: string;
}
```

Renders a fixed button at the bottom-right corner that smoothly scrolls the window to the top and
sends a `back_to_top` analytics event when a provider is present.

Use for long pages.

```tsx
<BackTopButton />
```

### InputSearch

```ts
interface InputSearchProperties {
  className?: string;
  formAction?: FormHTMLAttributes<HTMLFormElement>["action"];
  formMethod?: "get" | "post"; // Defaults to "get".
  iconClassName?: string;
  inputName?: string; // Defaults to "search".
  inputDefaultValue?: string;
  inputClassName?: string;
  inputPlaceholder?: string;
  buttonClassName?: string;
  buttonText?: ReactNode; // Defaults to "Search".
}
```

Renders a search form with a magnifier icon, a search input, and a submit button.

Use for native GET-based search forms.

```tsx
<InputSearch formAction="/search" inputPlaceholder="Search..." />
```

### LinkOptional

```ts
interface LinkOptionalProperties extends Omit<ComponentProps<typeof Link>, "href"> {
  href?: string | null;
}
```

Renders a `next/link` when `href` is present; otherwise renders a plain `<a>`.

Use when a link target is optional and a plain anchor is the desired fallback.

```tsx
<LinkOptional href={post.url ?? null}>{post.title}</LinkOptional>
```

### Ready

```ts
Ready(props: PropsWithChildren)
```

Renders its children only after the client has hydrated (`useReady`).

Use to defer hydration-sensitive content to the client.

```tsx
<Ready>
  <ClientOnlyWidget />
</Ready>
```

### Resource

```ts
interface ResourceProperties extends Omit<ComponentProps<"div">, "id"> {
  type?: string; // Defaults to "media".
  id: number;
}
```

Renders an overlay link to the CMS admin edit page for the given resource
(`https://{domain}/admin/{type}/edit/{id}`). The overlay is only interactive when the
`ResourceProvider` is enabled (Ctrl+Shift held) and has a `cms.domain` configured.

Use to mark content blocks as CMS-editable.

```tsx
<Resource id={42}>
  <Media src={image.src} alt={image.alt} />
</Resource>
```

### ResourceProvider

```ts
ResourceProvider(props: PropsWithChildren)
```

Provides the CMS domain to every `Resource`. The domain is read from the `cms.domain` query
parameter and persisted in `localStorage`; resources are only actionable while Ctrl+Shift is held.

Use at the application root to enable CMS editing overlays.

```tsx
<ResourceProvider>
  <Resource id={42}>...</Resource>
</ResourceProvider>
```

### Share

```ts
type ShareNetworkName = "x" | "facebook" | "linkedin" | "whatsapp" | "native";

interface ShareProperties {
  text?: string; // Defaults to "Share".
  title?: string; // Defaults to the document title.
  url?: string; // Defaults to the current URL.
  networks?: ShareNetworkName[]; // Defaults to all networks.
  networkClassName?: string;
  className?: string;
  onShare?(this: void, network: string, documentUrl: string, documentTitle: string): void;
}
```

Renders a share bar with network icons (X, Facebook, LinkedIn, WhatsApp, and the native share API
when available). The document title and URL are tracked live when not provided.

Use to share the current or a custom URL.

```tsx
<Share networks={["whatsapp", "x"]} onShare={(network) => trackShare(network)} />
```

### TextClamp

```ts
interface TextClampProperties extends PropsWithChildren {
  lines: number;
  className?: string;
}
```

Clamps the content to `lines` lines with an ellipsis via CSS `line-clamp`.

Use to truncate long texts.

```tsx
<TextClamp lines={3}>{description}</TextClamp>
```

### WhatsappButton

```ts
interface WhatsappButtonProperties {
  phone: string;
  phonePrefix?: string;
  title?: string; // Defaults to "WhatsApp".
  contentClassName?: string;
  titleClassName?: string;
  phoneClassName?: string;
  iconClassName?: string;
  className?: string;
}
```

Renders a fixed WhatsApp contact button at the bottom-right corner linking to
`https://wa.me/{digits}`, with a slide-in panel showing the title and phone.

Use for WhatsApp contact entry points.

```tsx
<WhatsappButton phone="11 99999-9999" phonePrefix="+55" title="Talk to us" />
```

# Header components

Navigation header building blocks.

### Header

```ts
interface HeaderProperties extends PropsWithChildren {
  position?: "absolute" | "fixed" | "relative" | "static" | "sticky"; // Defaults to "relative".
  stickAfter?: number; // Defaults to 0.
  className?: string;
}
```

Renders a `<header>` with `data-stuck` set once the page scrolls past `stickAfter` pixels (only for
`fixed` and `sticky` positions). Use the `stuck:` TailwindCSS variant to style the stuck state.

Use for headers that change style on scroll.

```tsx
<Header position="sticky" stickAfter={120} className="stuck:bg-theme-900">
  <HeaderContainer>...</HeaderContainer>
</Header>
```

### HeaderContainer

```ts
HeaderContainer(props: ComponentProps<typeof Container>)
```

Renders a `Container` with a flex `justify-between` layout, tagged
`data-component="HeaderContainer"`.

Use as the inner wrapper of a `Header`.

```tsx
<HeaderContainer>
  <Logo />
  <HeaderNav openedModalContent={(close) => <Menu onClose={close} />}>...</HeaderNav>
</HeaderContainer>
```

### HeaderNav

```ts
interface HeaderNavProperties extends PropsWithChildren {
  navClassName?: string;
  listClassName?: string;
  icon?: IconType; // Defaults to faBars.
  iconClassName?: string;
  closedIcon?: IconType; // Defaults to faXmark.
  closedIconClassName?: string;
  openedModalContent(this: void, closeHandler: () => void): ReactElement;
}
```

Renders a nav that collapses to an icon button when the items overflow the container. On mobile (or
when overflowed), clicking the icon opens the content returned by `openedModalContent` in a portal
overlay; clicking a link inside the overlay closes it.

Use for responsive menus.

```tsx
<HeaderNav openedModalContent={(close) => <MobileMenu onNavigate={close} />}>
  <li>
    <Link href="/">Home</Link>
  </li>
</HeaderNav>
```

# Pagination components

Paged navigation controls.

### Pagination

```ts
interface PaginationProperties {
  current: number;
  total: number;
  visibleCount?: number; // Defaults to undefined (unlimited).
  spread?: number;
  queryString?: string;
  className?: string;
  pageClassName?: string;
  previousNext?: boolean; // Defaults to true.
  firstLast?: boolean; // Defaults to true.
  forceRender?: boolean; // Defaults to false.
  onClick?(this: void, page: number): void;
}
```

Renders a page-numbered control with optional first/last and previous/next buttons. When
`visibleCount` is set, the page list is windowed around `current` and the extra buttons are hidden
unless `total` exceeds it. `spread` additionally highlights pages around the current one with
`data-active-spread`. With `queryString`, each page links to the current URL plus that parameter.

Use for search or listing pagination.

```tsx
<Pagination current={page} total={totalPages} visibleCount={9} queryString="page" />
```

### PaginationPage

```ts
interface PaginationPageProperties {
  page: number;
  queryString?: string;
  isCurrent?: boolean;
  isSpread?: boolean;
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
  onClick(this: void, page: number): void;
}
```

Renders a single circular page button with `data-active`, `data-active-spread`, and `data-disabled`
states.

Use for individual pagination entries.

```tsx
<PaginationPage page={2} isCurrent onClick={handleClick}>
  2
</PaginationPage>
```

# Primitive components

Base building blocks without dependencies.

### Alert

```ts
interface AlertProperties extends PropsWithChildren {
  title: string;
  variant: "advice" | "critical" | "debug" | "error" | "info" | "success" | "warning";
}
```

Renders a titled alert with a variant icon and a bullet list body, each variant with its own color
scheme.

Use to surface feedback or validation messages.

```tsx
<Alert title="Attention" variant="warning">
  <li>Your session is about to expire.</li>
</Alert>
```

### Container

```ts
interface ContainerProperties extends PropsWithChildren {
  paddingX?: number; // Defaults to 4 (1rem).
  fluid?: boolean; // Defaults to false.
  className?: string;
}
```

Renders a centered, width-constrained container (`max-w-container`). With `fluid`, it takes the full
screen width.

Use to constrain page content.

```tsx
<Container paddingX={6}>...</Container>
```

### Section

```ts
interface SectionProperties extends PropsWithChildren {
  id?: string;
  marginY?: number; // Defaults to 16 (4rem).
  marginTop?: number; // Defaults to marginY.
  marginBottom?: number; // Defaults to marginY.
  className?: string;
}
```

Renders a `<section>` with configurable vertical margins (halved on mobile).

Use as a page section with anchor support.

```tsx
<Section id="about" marginY={8}>
  ...
</Section>
```

# Print components

Layout helpers for printing.

### PrintContainer

```ts
PrintContainer(props: PropsWithChildren)
```

Renders the outermost print layout: a centered flex column on screen, plain flow when printed.

Use as the root of any printable content.

```tsx
<PrintContainer>
  <PrintPage>...</PrintPage>
</PrintContainer>
```

# Surface components

Complex UI components.

### Accordion

```ts
interface AccordionProperties extends PropsWithChildren {
  title: ReactNode;
  titleKind?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // Defaults to "div".
  opened?: boolean; // Defaults to false.
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  iconClassName?: string;
  bodyClassName?: string;
}
```

Renders a collapsible panel with a clickable header, rotating chevron, and `data-opened` state.

Use for FAQ sections or grouped content.

```tsx
<Accordion title="How to install?" titleKind="h3">
  <p>Run bun install...</p>
</Accordion>
```

### Counter

```ts
interface CounterProperties {
  from?: number; // Defaults to 0.
  to: number;
  thousandSeparator?: string;
  decimalSeparator?: string; // Defaults to ".".
  decimals?: number; // Defaults to 0.
  duration?: number; // Defaults to 1000.
  easing?: Easing; // Defaults to "ease-in-out".
  className?: string;
}
```

Animates from `from` to `to` when the element enters the viewport, formatting with the given
separators.

Use for animated statistics.

```tsx
<Counter from={0} to={1234} thousandSeparator="." duration={1500} />
```

### FlipCard

```ts
interface FlipCardProperties {
  contentFront: ReactNode;
  contentBack: ReactNode;
  flipTo?: "left" | "right"; // Defaults to "right".
  axis?: "horizontal" | "vertical"; // Defaults to "horizontal".
  heightController?: "back" | "front"; // Defaults to "front".
  touchIconClassName?: string;
  className?: string;
  onFlip?(this: void, viewpoint: "back" | "front"): void;
}
```

Renders a card that flips on hover (desktop) or tap (touch), with `data-flipped` state and a pointer
hand icon on touch devices.

Use for interactive previews.

```tsx
<FlipCard contentFront={<img src={cover} alt="" />} contentBack={<p>Details</p>} />
```

### Hero

```ts
interface HeroProperties extends PropsWithChildren {
  id?: string;
  backgroundContent: ReactNode;
  className?: string;
}
```

Renders a `Section` with an absolute, non-interactive background layer and a relative content layer
on top.

Use for page heroes with decorative backgrounds.

```tsx
<Hero backgroundContent={<MediaImage src={bg.src} alt="" />}>
  <h1>Welcome</h1>
</Hero>
```

### Mosaic

```ts
interface MosaicProperties extends PropsWithChildren {
  duration?: number; // Defaults to 5000.
  shuffle?: boolean; // Defaults to false.
  className?: string;
}
```

Renders a grid where items rotate in and out of visibility in waves, keeping a random-like, balanced
selection (each item appears at most once per wave). The column count follows the grid CSS, and
hovering pauses the rotation.

Use for gallery mosaics.

```tsx
<Mosaic duration={4000} shuffle className="grid-cols-4">
  <img src={item1.src} alt="" />
  <img src={item2.src} alt="" />
</Mosaic>
```

### ScrollProgress

```ts
interface ScrollProgressProperties extends PropsWithChildren {
  className?: string;
  progressClassName?: string;
  onProgress?(this: void, progress: number): void;
  onCompleted?(this: void): void;
}
```

Renders a fixed progress bar at the top of the viewport tracking the scroll progress through the
component, plus `data-completed` on the container. The bar is portaled to `document.body`.

Use to show reading progress.

```tsx
<ScrollProgress onCompleted={() => markRead()}>
  <article>...</article>
</ScrollProgress>
```

### VLibras

```ts
VLibras(props: {})
```

Embeds the VLibras accessibility widget (Brazilian Sign Language) by loading the vlibras.gov.br
plugin script lazily and instantiating the widget.

Use for accessibility compliance.

```tsx
<VLibras />
```

# Animate components

Scroll-triggered animations.

### Animate

```ts
interface AnimateProperties extends PropsWithChildren {
  effect?:
    "fade" | "none" | "slideDown" | "slideLeft" | "slideRight" | "slideUp" | "zoomIn" | "zoomOut"; // Defaults to "fade".
  duration?: number; // Defaults to 400.
  distance?: string; // Defaults to "50%".
  easing?: "ease-in-out" | "ease-in" | "ease-out" | "ease" | "linear"; // Defaults to "ease-out".
  always?: boolean; // Defaults to false.
  threshold?: Threshold; // Defaults to "25px".
  className?: string;
  onAnimate?(this: void): void;
}
```

Animates its children when they enter the viewport (IntersectionObserver), driven by the
`data-animated` attribute and the `not-data-animated:*` variants. Renders no wrapper element
(`contents`).

Use for scroll-reveal content.

```tsx
<Animate effect="slideUp" duration={600}>
  <Card />
</Animate>
```

# Analytics components

Viewport-based analytics tracking.

### AnalyticsViewport

```ts
interface AnalyticsViewportProperties {
  eventName: string;
  eventParams?: Record<string, unknown>;
}
```

Sends an analytics event once when the component becomes visible in the viewport.

Use to track impressions of sections or banners.

```tsx
<AnalyticsViewport eventName="section_visible" eventParams={{ section: "pricing" }} />
```

### AnalyticsProvider

```ts
interface AnalyticsProviderProperties extends PropsWithChildren {
  gaId?: string; // Defaults to NEXT_PUBLIC_GOOGLE_ANALYTICS_ID.
}
```

Provides `sendEvent` to the component tree via context and renders the Google Analytics script.
Available from the Third entry point.

Use at the application root.

```tsx
<AnalyticsProvider>
  <App />
</AnalyticsProvider>
```

# Theme components

Color variant system.

### Theme

```ts
type Variant =
  | "danger"
  | "debug"
  | "error"
  | "info"
  | "success"
  | "warning"
  | "amber"
  | "blue"
  | "cyan"
  | "emerald"
  | "fuchsia"
  | "gray"
  | "green"
  | "indigo"
  | "lime"
  | "neutral"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "rose"
  | "sky"
  | "slate"
  | "stone"
  | "teal"
  | "violet"
  | "yellow"
  | "zinc";

interface ThemeProperties extends PropsWithChildren {
  variant: Variant | (string & {});
}
```

Applies a color variant to every descendant using the `--theme-*` CSS custom properties (all
`theme-*` utilities like `bg-theme-600` resolve against it). Semantic variants map to colors
(`danger` to red, `success` to green, and so on); custom variant names fall back to a
`.theme-{variant}` class of your own. Renders no wrapper element (`contents`).

Use to scope a color theme to a subtree.

```tsx
<Theme variant="success">
  <Button>Confirmed</Button>
</Theme>
```

# Service functions

Shared client-side services.

### listenEvent

```ts
listenEvent(
  element: EventTarget,
  eventName: Arrayable<keyof WindowEventMap>,
  callback: EventListener,
  shouldImmediate = true,
): () => void
```

Attaches the callback to `element` for each event name. With `shouldImmediate`, the callback is also
fired once with a synthetic `"immediate"` event. Returns an unload function that removes all
listeners.

Use to subscribe to DOM events with cleanup.

```ts
const unload = listenEvent(window, ["keydown", "keyup"], handler);
// Later: unload();
```

### listenScroll

```ts
listenScroll(element: EventTarget, callback: (event: Event, unload: () => void) => void): () => void
```

Attaches the callback to `element`'s `scroll` and `resize` events, debounced through a microtask.
The callback receives the unload function as its second argument. Returns the unload function.

Use to react to scroll with cleanup.

```ts
const unload = listenScroll(element, (event, unload) => { ... });
```

### listenWindowEvent

```ts
listenWindowEvent(
  eventName: Arrayable<keyof WindowEventMap>,
  callback: EventListener,
  shouldImmediate = true,
): () => void
```

Same as `listenEvent`, but always attached to `window`.

```ts
const unload = listenWindowEvent("resize", handleResize);
```

### listenWindowScroll

```ts
listenWindowScroll(callback: (event: Event, unload: () => void) => void): () => void
```

Same as `listenScroll`, but always attached to `window`.

```ts
const unload = listenWindowScroll((event, unload) => { ... });
```

### listenMutationObserver

```ts
listenMutationObserver(
  element: Element | null | undefined,
  options: MutationObserverInit,
  callback: MutationCallback,
  shouldImmediate = true,
): () => void
```

Observes `element` with a `MutationObserver` (no-op when the element is missing). With
`shouldImmediate`, the callback fires once with an empty records array. Returns an unload function
that disconnects the observer.

Use to react to DOM mutations with cleanup.

```ts
const unload = listenMutationObserver(node, { childList: true }, (records) => { ... });
```

### listenResizeObserver

```ts
listenResizeObserver(
  element: Element | null | undefined,
  options: ResizeObserverOptions,
  callback: ResizeObserverCallback,
  shouldImmediate = true,
): () => void
```

Observes `element` with a `ResizeObserver`, mirroring `listenMutationObserver` behavior.

Use to react to element size changes with cleanup.

```ts
const unload = listenResizeObserver(ref.current, {}, (entries) => { ... });
```

### promisePortal

```ts
promisePortal<T>(resolver: (resolve: (value: T) => void) => ReactElement): Promise<T>
```

Renders the element returned by `resolver` into a detached portal appended to `document.body`, and
resolves when the element calls `resolve`. The portal is unmounted and removed on the next idle
callback.

Use to render imperative overlays from async code.

```ts
await promisePortal<void>((resolve) => (
  <Modal onClose={() => resolve()} />
));
```

### promiseElement

```ts
promiseElement(node: ReactElement): Promise<HTMLElement>
```

Renders `node` in a temporary portal and resolves with its DOM element (via ref) on the next
animation frame.

Use to measure or inspect an element before keeping it.

```ts
const element = await promiseElement(<Tooltip>Hello</Tooltip>);
```

### generateQueryString

```ts
generateQueryString(parameters: Record<string, string | undefined>): string
```

Serializes the given parameters into a query string, skipping `undefined` values.

Use to build URLs for share links or filters.

```ts
generateQueryString({ q: "cards", page: "2", sort: undefined }); // "?q=cards&page=2"
```

### contextWrapper

```ts
contextWrapper<Wrapper extends FunctionComponent>(
  Provider: FunctionComponent<PropsWithChildren>,
  Component: Wrapper,
): Wrapper
```

Wraps `Component` inside `Provider`, returning a component with the same props.

Use to ship a component with its context provider baked in, like `Form` does with `FormProvider`.

```ts
export const Form = contextWrapper(FormProvider, FormContent);
```

# Hook functions

Hydration-aware React hooks.

### useReady

```ts
useReady(): boolean
```

Returns `true` after the client has hydrated (first effect run).

Use to defer client-only rendering.

```ts
const isReady = useReady();
return isReady ? <Widget /> : null;
```

### useInViewport

```ts
type Threshold = number | `${number}px`; // Percentual or pixel bottom margin.

useInViewport(threshold: Threshold = "25px", shouldConsiderVisibleAfterLeavingViewport = false): {
  ref: (element: Element | null | undefined) => void;
  visible: boolean;
  disconnect: () => void;
}
```

Tracks whether the element is visible in the viewport via IntersectionObserver. A number threshold
is a ratio; a pixel threshold is a bottom margin (`0px 0px -{n}px 0px`). With
`shouldConsiderVisibleAfterLeavingViewport`, the element stays visible once scrolled past.

Use to trigger animations or tracking on scroll.

```ts
const { ref, visible } = useInViewport("50px");

return <div ref={ref}>{visible ? "Now visible" : "Scroll down"}</div>;
```

### useLocalStorage

```ts
useLocalStorage<T>(key: string): readonly [T | undefined, Dispatch<SetStateAction<T>>]

useLocalStorage<T>(key: string, defaultValue: T): readonly [T, Dispatch<SetStateAction<T>>]
```

Persists a state value to `localStorage` as JSON on every change, reading the stored value on mount.
`null`/`undefined` values remove the stored entry.

Use for persistent preferences.

```ts
const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
```

### useImmediateReference

```ts
useImmediateReference<T>(value: T): RefObject<T>
```

Keeps a ref in sync with `value`, updated on every render effect.

Use to read the latest value from stable callbacks.

```ts
const onResize = () => console.log(sizeRef.current);
```

### useAnalytics

```ts
useAnalytics(): { sendEvent?: (name: string, parameters?: Record<string, unknown>) => void }
```

Reads `sendEvent` from the `AnalyticsProvider` context. Available from the Third entry point.

Use to send analytics events from any component.

```ts
const { sendEvent } = useAnalytics();
sendEvent?.("cta_click", { label: "buy" });
```

# Slider components

Swiper-based carousel. Import from the Slider entry point:

```ts
// Example:
import { Slider } from "@rentalhost/rheactor-components/Slider";
```

### Slider

```ts
type Breakpoints = Partial<Record<"xs" | "sm" | "md" | "lg" | "xl" | "2xl", number>>;

interface SliderProperties extends PropsWithChildren {
  duration?: number; // Autoplay delay, Defaults to 5000. 0 disables autoplay.
  speed?: number; // Defaults to 300.
  items?: Breakpoints | number; // Defaults to 1.
  gap?: Breakpoints | number; // Defaults to 0.5 (rem).
  infinity?: boolean; // Defaults to true.
  freeFlow?: boolean; // Defaults to false.
  stretch?: boolean; // Defaults to true.
  centered?: boolean; // Defaults to true.
  className?: string;
  arrowsIcon?: IconType; // Defaults to faAngleLeft.
  arrowsStepMode?: "single" | "visible"; // Defaults to "single".
  arrowsClassName?: string;
  arrowsPlacement?: "disabled" | "external" | "internal" | "overlay"; // Defaults to "overlay".
  arrowsPlacementFallback?: "disabled" | "internal" | "overlay"; // Defaults to "overlay".
  pagination?: "after" | "overlay" | false; // Defaults to "after".
  paginationClassName?: string;
  paginationCompressed?: boolean; // Defaults to true.
  paginationLimit?: number;
  onNavigate?(this: void): void;
}
```

Renders a Swiper-based carousel with autoplay, keyboard navigation, arrows, and pagination reusing
the `Pagination` component. `items`/`gap` support per-breakpoint values. Arrows fall back when there
is no window space for an `external` placement; pagination can be compressed to one entry per
visible page.

Use for banners, product carousels, or any slide collection.

```tsx
<Slider items={{ xs: 1, md: 2, lg: 3 }} pagination="overlay">
  <Card title="One" />
  <Card title="Two" />
  <Card title="Three" />
</Slider>
```

# Third-party components

Google Analytics integration. Import from the Third entry point:

```ts
// Example:
import { AnalyticsProvider, useAnalytics } from "@rentalhost/rheactor-components/Third";
```

### AnalyticsProvider

```ts
interface AnalyticsProviderProperties extends PropsWithChildren {
  gaId?: string; // Defaults to NEXT_PUBLIC_GOOGLE_ANALYTICS_ID.
}
```

Provides `sendEvent` via context and renders the Google Analytics script through
`@next/third-parties`.

### useAnalytics

```ts
useAnalytics(): { sendEvent?: (name: string, parameters?: Record<string, unknown>) => void }
```

See `useAnalytics` under Base hooks.

# Video components

Media detection and rendering. Import from the Video entry point:

```ts
// Example:
import { Media, getVideoThumbnail } from "@rentalhost/rheactor-components/Video";
```

### Media

```ts
type MediaProperties =
  | ImageProperties // jpg, jpeg, png, webp, gif (next/image based).
  | StaticImageProperties // src: { src: string } (next/image static import).
  | SVGProperties // svg.
  | VideoLocalProperties // mp4, webm.
  | VideoYoutubeProperties; // YouTube URL or id.

interface MediaImageProperties {
  src: string;
  alt: string;
  quality?: number;
  priority?: boolean; // Defaults to false.
  unoptimized?: boolean;
  spot?: { x: number; y: number }; // object-position in percent.
  className?: string;
}
```

Renders the media matching the `src`: raster images via `next/image` with automatic responsive
sizing, SVGs inline, local videos as `<video>`, and YouTube URLs as a lazy embedded player with
thumbnail. Falls back to `null` for unknown sources.

Use to render any media from a URL string.

```tsx
<Media src="https://example.com/photo.jpg" alt="A photo" />
<Media src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="Video" />
```

### getVideoThumbnail

```ts
getVideoThumbnail(source: string): string | null
```

Resolves the thumbnail URL for a YouTube video from its URL or id. Returns `null` for other
services.

```ts
getVideoThumbnail("https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // "https://i.ytimg.com/vi_webp/dQw4w9WgXcQ/sddefault.webp"
```

# Style components

Print page layout. Import from the Style entry point:

```ts
// Example:
import { PrintPage } from "@rentalhost/rheactor-components/Style";
```

### PrintPage

```ts
interface PrintPageProperties {
  size?: "A4" | "Letter" | "Legal" | { width: string; height: string }; // Defaults to "A4".
  orientation?: "landscape" | "portrait"; // Defaults to "portrait".
  margin?: CSSProperties["margin"]; // Defaults to "1cm".
  header?: ReactNode;
  footer?: ReactNode;
  overflowMode?: "allowed" | "warning"; // Defaults to "warning".
  shorten?: boolean; // Defaults to false.
  className?: string;
  children: ReactNode;
}
```

Renders a single print page with `@page` sizing, optional header/footer (fixed on print), and an
on-screen overflow warning when the content exceeds the page height.

Use inside a `PrintContainer` for printable documents.

```tsx
<PrintPage size="A4" header={<InvoiceHeader />} footer={<InvoiceFooter />}>
  <InvoiceBody />
</PrintPage>
```

# Dom functions

HTML transformation to React nodes. Import from the Dom entry point:

```ts
// Example:
import { HTMLTransformer } from "@rentalhost/rheactor-components/Dom";
```

### HTMLTransformer

```ts
class HTMLTransformer {
  static createDefault(): HTMLTransformer;
  allowTag(tagName: string, attributes?: string[]): void;
  allowTags(tagNames: string[]): void;
  allowAttributes(attributes: string[]): void;
  setTextReplacer(replacement: (text: string) => ReactNode): void;
  setTagReplacer<T extends ElementType & string>(
    tagName: T,
    replacement: (properties) => ReactNode,
  ): void;
  transform(html: string): ReactNode;
}
```

Parses an HTML string into React nodes, keeping only allowed tags and attributes (`style` becomes a
React style object, `class` becomes `className`). Disallowed tags and attributes are dropped. Tag
and text replacers allow custom rendering for specific elements.

Use to render sanitized user-provided HTML in React.

```ts
const transformer = HTMLTransformer.createDefault();

transformer.setTagReplacer("a", ({ href, children }) => (
  <Link href={href} className="underline">{children}</Link>
));

return transformer.transform(html);
```
