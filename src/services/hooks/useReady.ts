"use client";

import { useEffect, useState } from "react";

export function useReady() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setIsReady(true);
  }, []);

  return isReady;
}
