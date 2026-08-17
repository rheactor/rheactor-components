import { Dispatch, SetStateAction } from "react";
//#region src/services/hooks/useLocalStorage.d.ts
declare function useLocalStorage<T>(key: string, defaultValue?: undefined): readonly [T | undefined, Dispatch<SetStateAction<T>>];
//#endregion
export { useLocalStorage };