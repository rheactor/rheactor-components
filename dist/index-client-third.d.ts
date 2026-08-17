import { PropsWithChildren } from "react";
//#region src/components/Analytics/Analytics/AnalyticsProvider.d.ts
interface Properties extends PropsWithChildren {
  gaId?: string;
}
declare function AnalyticsProvider({ gaId, children }: Properties): import("react").JSX.Element;
//#endregion
//#region src/services/hooks/useAnalytics.d.ts
declare function useAnalytics(): {
  sendEvent: ((this: void, name: string, parameters?: Record<string, unknown>) => void) | undefined;
};
//#endregion
export { AnalyticsProvider, useAnalytics };