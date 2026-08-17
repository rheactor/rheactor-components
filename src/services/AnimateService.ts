import { clamp } from "@rheactor/rheactor-core";

import { Timer } from "#/services/classes/Timer";

type EasingFunction = (time: number) => number;

const easings = {
  linear: (input: number) => input,
  "ease-in": (input: number) => input * input,
  "ease-out": (input: number) => 1 - (1 - input) ** 2,
  "ease-in-out": (input: number) =>
    input < 0.5 ? 2 * input * input : 1 - 2 * (1 - input) * (1 - input),
  ease: (input: number) => input * input * (3 - 2 * input),
} satisfies Readonly<Record<string, EasingFunction>>;

export type Easing = EasingFunction | keyof typeof easings;

function calculateProgress(current: number, total: number, easing: Easing = "ease-in-out"): number {
  const easingFunction = typeof easing === "string" ? easings[easing] : easing;

  return easingFunction(clamp(current / total, 0, 1));
}

export function animate(
  duration: number,
  onUpdate: (progress: number) => void,
  easing: Easing = "ease-in-out",
  onComplete?: () => void,
) {
  const start = Date.now();

  const timer = new Timer(() => {
    const progress = calculateProgress(Date.now() - start, duration, easing);

    onUpdate(progress);

    if (progress >= 1) {
      timer.stop();
      onComplete?.();
    }
  }, 33);

  return timer;
}
