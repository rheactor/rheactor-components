"use client";

import { createContext } from "react";

export interface AnalyticsContextProperties {
  sendEvent?(this: void, name: string, parameters?: Record<string, unknown>): void;
}

export const AnalyticsContext = createContext<AnalyticsContextProperties>({});
