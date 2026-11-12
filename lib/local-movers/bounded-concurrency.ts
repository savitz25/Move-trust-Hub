/** Run async work with a fixed number of workers. Results keep input order. */
export async function mapWithConcurrency<T, R>(
  items: readonly T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const limit = Math.max(1, Math.floor(concurrency));
  const results = new Array<R>(items.length);
  let next = 0;

  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await fn(items[index]!, index);
    }
  }

  const workers = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

export type SettledDeadline<T> =
  | { status: 'ok'; value: T }
  | { status: 'failed'; reason: 'timeout' | 'error'; message: string };

/**
 * A timeout or rejection is a failed load.
 * It is not an empty successful value, and callers must not cache it as one.
 */
export async function settleWithin<T>(
  work: Promise<T>,
  ms: number
): Promise<SettledDeadline<T>> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const raced = await Promise.race([
      work.then(
        (value) => ({ kind: 'value' as const, value }),
        (err: unknown) => ({ kind: 'error' as const, err })
      ),
      new Promise<{ kind: 'timeout' }>((resolve) => {
        timer = setTimeout(() => resolve({ kind: 'timeout' }), ms);
      }),
    ]);
    if (raced.kind === 'timeout') {
      return { status: 'failed', reason: 'timeout', message: `timed out after ${ms}ms` };
    }
    if (raced.kind === 'error') {
      const message = raced.err instanceof Error ? raced.err.message : String(raced.err);
      return { status: 'failed', reason: 'error', message };
    }
    return { status: 'ok', value: raced.value };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Concurrent callers share one in-flight promise. A rejection is not remembered. */
export function dedupeInflight<T>(
  inflight: Map<string, Promise<T>>,
  key: string,
  start: () => Promise<T>
): Promise<T> {
  const existing = inflight.get(key);
  if (existing) return existing;
  const pending = start().finally(() => {
    if (inflight.get(key) === pending) inflight.delete(key);
  });
  inflight.set(key, pending);
  return pending;
}
