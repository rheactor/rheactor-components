"use client";

import { useEffect, useState } from "react";

import { useAnalytics } from "#/services/hooks/useAnalytics";
import { useInViewport } from "#/services/hooks/useInViewport";

interface Properties {
  /** The name of the event to send. */
  eventName: string;

  /** The parameters to send with the event. */
  eventParams?: Record<string, unknown>;
}

export function AnalyticsViewport({ eventName, eventParams }: Properties) {
  const { sendEvent } = useAnalytics();
  const { ref, visible } = useInViewport(0);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted || !visible) {
      return;
    }

    sendEvent?.(eventName, eventParams);
    setSubmitted(true);
  }, [eventName, eventParams, sendEvent, submitted, visible]);

  return <div ref={ref} data-component="AnalyticsViewport" />;
}
