"use client";

import { GoogleAnalytics, sendGAEvent } from "@next/third-parties/google";
import { useCallback, useMemo } from "react";
import type { PropsWithChildren } from "react";

import { AnalyticsContext } from "#/components/Analytics/Analytics/AnalyticsContext";

interface Properties extends PropsWithChildren {
  gaId?: string;
}

export function AnalyticsProvider({
  gaId = process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"],
  children,
}: Properties) {
  const sendEvent = useCallback((name: string, parameters?: Record<string, unknown>) => {
    sendGAEvent("event", name, parameters ?? {});
  }, []);

  const value = useMemo(() => ({ sendEvent }), [sendEvent]);

  return (
    <AnalyticsContext.Provider value={value}>
      {children}

      {gaId !== undefined && <GoogleAnalytics gaId={gaId} />}
    </AnalyticsContext.Provider>
  );
}
