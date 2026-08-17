import { ReactNode } from "react";
//#region src/components/Pagination/Pagination/PaginationPage.d.ts
interface Properties {
  page: number;
  queryString?: string;
  isCurrent?: boolean;
  isSpread?: boolean;
  isDisabled?: boolean;
  className?: string;
  children: ReactNode;
  onClick(this: void, page: number): void;
}
declare function PaginationPage({ page, queryString, isCurrent, isSpread, isDisabled, children, className, onClick }: Properties): import("react").JSX.Element;
//#endregion
export { PaginationPage };