import { ReactElement } from "react";
//#region src/services/PortalService.d.ts
type Resolve<T> = (value: T) => void;
type Resolver<T> = (resolve: Resolve<T>) => ReactElement;
declare function promisePortal<T>(resolver: Resolver<T>): Promise<void>;
declare function promiseElement(node: ReactElement): Promise<void>;
//#endregion
export { Resolve, Resolver, promiseElement, promisePortal };