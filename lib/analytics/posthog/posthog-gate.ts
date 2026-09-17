/**
 * Concurrency-safe singleton loader.
 * Callers during initialization await the same in-flight promise.
 */
export function createPosthogClientGate<T>(load: () => Promise<T | null>) {
  let client: T | null = null;
  let inflight: Promise<T | null> | null = null;
  let startCount = 0;

  async function get(): Promise<T | null> {
    if (client) return client;
    if (inflight) return inflight;
    startCount += 1;
    inflight = Promise.resolve()
      .then(load)
      .then((instance) => {
        client = instance ?? null;
        if (!client) inflight = null;
        return client;
      })
      .catch(() => {
        client = null;
        inflight = null;
        return null;
      });
    return inflight;
  }

  function reset(): void {
    client = null;
    inflight = null;
  }

  return {
    get,
    reset,
    getStartCount: () => startCount,
  };
}
