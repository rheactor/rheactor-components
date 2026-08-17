//#region src/components/Analytics/Analytics/AnalyticsViewport.d.ts
interface Properties {
  /** The name of the event to send. */
  eventName: string;
  /** The parameters to send with the event. */
  eventParams?: Record<string, unknown>;
}
declare function AnalyticsViewport({ eventName, eventParams }: Properties): import("react").JSX.Element;
//#endregion
export { AnalyticsViewport };