"use client";

import { useContext } from "react";

import { AnalyticsContext } from "#/components/Analytics/Analytics/AnalyticsContext";

export function useAnalytics() {
  const { sendEvent } = useContext(AnalyticsContext);

  return { sendEvent };
}
