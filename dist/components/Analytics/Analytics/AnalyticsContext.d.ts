//#region src/components/Analytics/Analytics/AnalyticsContext.d.ts
interface AnalyticsContextProperties {
  sendEvent?(this: void, name: string, parameters?: Record<string, unknown>): void;
}
declare const AnalyticsContext: import("react").Context<AnalyticsContextProperties>;
//#endregion
export { AnalyticsContext, AnalyticsContextProperties };