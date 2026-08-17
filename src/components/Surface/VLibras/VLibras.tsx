"use client";

import Script from "next/script";

declare global {
  // oxlint-disable-next-line no-inner-declarations
  var VLibras: {
    Widget: new () => void;
  };
}

export function VLibras() {
  return (
    <>
      {/* @ts-expect-error 2322 */}
      <div vw="" className="enabled">
        <div vw-access-button="" className="active" />

        <div vw-plugin-wrapper="">
          <div className="vw-plugin-top-wrapper" />
        </div>
      </div>

      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="lazyOnload"
        onReady={() => {
          // eslint-disable-next-line no-new
          new globalThis.VLibras.Widget();

          window.onload?.(new Event("load"));
        }}
      />
    </>
  );
}
