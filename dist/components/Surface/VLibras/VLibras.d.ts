//#region src/components/Surface/VLibras/VLibras.d.ts
declare global {
  var VLibras: {
    Widget: new () => void;
  };
}
declare function VLibrasComponent(): import("react").JSX.Element;
//#endregion
export { VLibrasComponent as VLibras };