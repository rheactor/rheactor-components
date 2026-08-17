import type { FunctionComponent, JSX, PropsWithChildren } from "react";

export function contextWrapper<Wrapper extends FunctionComponent>(
  Provider: FunctionComponent<PropsWithChildren>,
  Component: Wrapper,
): Wrapper {
  // oxlint-disable-next-line func-names
  return function ({ ...properties }: JSX.LibraryManagedAttributes<Wrapper, object>) {
    return (
      <Provider>
        <Component {...properties} />
      </Provider>
    );
  } as Wrapper;
}
