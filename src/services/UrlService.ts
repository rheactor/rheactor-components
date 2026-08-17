export function appendQueryString(key: string, value: string) {
  const url = new URL(globalThis.location.href);

  url.searchParams.set(key, value);

  return url.href;
}

export function generateQueryString(parameters: Record<string, string | undefined>) {
  const queryString = new URLSearchParams();

  for (const [key, value] of Object.entries(parameters)) {
    if (value !== undefined) {
      queryString.set(key, value);
    }
  }

  return `?${queryString.toString()}`;
}

export function getSimplifiedUrl() {
  return globalThis.location.origin + globalThis.location.pathname;
}
