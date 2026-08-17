import { Dispatch, PropsWithChildren, SetStateAction } from "react";
//#region src/components/Form/Form/FormProvider.d.ts
interface ContextProperties {
  focused?: boolean;
  setFocused?: Dispatch<SetStateAction<boolean>>;
}
declare const FormContext: import("react").Context<ContextProperties>;
declare function FormProvider({ children }: PropsWithChildren): import("react").JSX.Element;
//#endregion
export { FormContext, FormProvider };