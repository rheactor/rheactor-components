import { PropsWithChildren } from "react";
//#region src/components/Generic/Resource/ResourceProvider.d.ts
interface ContextProperties {
  domain?: string;
}
declare const ResourceContext: import("react").Context<ContextProperties>;
declare function ResourceProvider({ children }: PropsWithChildren): import("react").JSX.Element;
//#endregion
export { ResourceContext, ResourceProvider };