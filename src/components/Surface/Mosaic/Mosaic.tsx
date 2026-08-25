"use client";

import { shuffle as arrayShuffle } from "@rheactor/rheactor-core";
import { twMerge } from "@rheactor/rheactor-core/tailwind";
import {
  Children,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties, JSX, PropsWithChildren, ReactNode } from "react";
import { flushSync } from "react-dom";

import { Timer } from "#/services/classes/Timer";
import { useImmediateReference } from "#/services/hooks/useImmediateReference";
import { listenResizeObserver } from "#/services/MutationService";

interface Properties extends PropsWithChildren {
  /**
   * The duration of mosaic items visibility in ms.
   *
   * Defaults to 5000.
   */
  duration?: number;

  /**
   * Whether to shuffle the items.
   *
   * Defaults to false.
   */
  shuffle?: boolean;

  /** The class name of the mosaic. */
  className?: string;

  /** The content of the mosaic. */
  children?: ReactNode;
}

enum AnimationState {
  SETUP = "setup",
  FADE_IN = "fadeIn",
  VISIBLE = "visible",
  FADE_OUT = "fadeOut",
  INVISIBLE = "invisible",
}

export function Mosaic({ duration = 5000, shuffle = false, className, children }: Properties) {
  const reference = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<JSX.Element[]>([]);
  const [columns, setColumns] = useState(0);

  const style = useMemo(() => ({ "--columns": columns }) as CSSProperties, [columns]);

  const [animationState, setAnimationState] = useState(AnimationState.SETUP);
  const animationStateReference = useImmediateReference(animationState);

  const allItems = useMemo(() => {
    // oxlint-disable-next-line react/no-react-children
    const childrenItems = Children.toArray(children).filter((child) => isValidElement(child));

    return shuffle ? arrayShuffle(childrenItems) : childrenItems;
  }, [children, shuffle]);

  const pastItems = useRef(new WeakMap<JSX.Element, number>());
  const pastItemsCounter = useRef(0);

  const pickItems = useCallback(
    (count = columns) =>
      allItems
        .toSorted(
          (itemA, itemB) =>
            (pastItems.current.get(itemA) ?? 0) - (pastItems.current.get(itemB) ?? 0),
        )
        .slice(0, count),
    [allItems, columns],
  );

  const refreshItems = useCallback(
    (shouldMarkPastItems = false) => {
      if (shouldMarkPastItems) {
        for (const item of items) {
          pastItems.current.set(item, ++pastItemsCounter.current);
        }
      }

      setItems(pickItems());
    },
    [items, pickItems],
  );

  const toInvisible = useCallback(() => {
    setAnimationState(AnimationState.FADE_OUT);
  }, []);

  const timer = useRef<Timer>(null);

  useEffect(() => {
    timer.current = new Timer(toInvisible, duration);

    return () => {
      timer.current?.stop();
    };
  }, [duration, toInvisible]);

  const readColumns = useCallback(
    () =>
      reference.current
        ? getComputedStyle(reference.current).gridTemplateColumns.split(" ").length
        : 0,
    [],
  );

  useLayoutEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setColumns(readColumns());
  }, [readColumns]);

  const onResize = useEffectEvent(() => {
    const columnsCount = readColumns();

    if (columnsCount === items.length) {
      return;
    }

    flushSync(() => {
      setColumns(columnsCount);
      setItems(pickItems(columnsCount));
    });

    timer.current?.start();
  });

  useEffect(
    () =>
      listenResizeObserver(reference.current, {}, () => {
        queueMicrotask(onResize);
      }),
    [],
  );

  useEffect(() => {
    if (columns > 0 && items.length === 0) {
      queueMicrotask(() => {
        refreshItems();
        setAnimationState(AnimationState.FADE_IN);
      });
    }
  }, [columns, items.length, refreshItems]);

  useEffect(() => {
    if (animationState === AnimationState.INVISIBLE) {
      queueMicrotask(() => {
        refreshItems(true);
        setAnimationState(AnimationState.FADE_IN);
      });
    }
  }, [animationState, refreshItems]);

  return (
    <div data-component="Mosaic">
      <div
        ref={reference}
        className={twMerge("grid-cols-1", className, "grid max-h-0 overflow-hidden")}
        aria-hidden
      />

      <div
        data-visible={
          animationState === AnimationState.FADE_IN ||
          animationState === AnimationState.VISIBLE ||
          undefined
        }
        className={twMerge(
          "grid grid-cols-[repeat(var(--columns),1fr)]! transition not-data-visible:opacity-0 starting:opacity-0",
          className,
        )}
        style={style}
        onMouseEnter={() => {
          if (animationState === AnimationState.VISIBLE) {
            timer.current?.stop();
          }
        }}
        onMouseLeave={() => {
          if (animationState === AnimationState.VISIBLE) {
            timer.current?.start();
          }
        }}
        onTransitionEnd={() => {
          if (animationStateReference.current === AnimationState.FADE_IN) {
            setAnimationState(AnimationState.VISIBLE);

            timer.current?.start();
          } else if (animationStateReference.current === AnimationState.FADE_OUT) {
            setAnimationState(AnimationState.INVISIBLE);

            timer.current?.stop();
          }
        }}
      >
        {items.map((item, itemIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={itemIndex}>{item}</Fragment>
        ))}
      </div>
    </div>
  );
}
