import { PropsWithChildren } from "react";
//#region src/components/Analytics/Analytics/AnalyticsProvider.d.ts
interface Properties extends PropsWithChildren {
  gaId?: string;
}
declare function AnalyticsProvider({ gaId, children }: Properties): import("react").JSX.Element;
//#endregion
export { AnalyticsProvider };