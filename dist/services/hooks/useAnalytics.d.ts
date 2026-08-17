//#region src/services/hooks/useAnalytics.d.ts
declare function useAnalytics(): {
  sendEvent: ((this: void, name: string, parameters?: Record<string, unknown>) => void) | undefined;
};
//#endregion
export { useAnalytics };