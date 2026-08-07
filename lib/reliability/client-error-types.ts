/** Client runtime failure categories for ops visibility. */
export type ClientErrorKind =
  | 'chunk_load'
  | 'hydration'
  | 'uncaught'
  | 'unhandled_rejection'
  | 'react_boundary';

export type ClientErrorPayload = {
  kind: ClientErrorKind;
  message: string;
  stack?: string;
  source?: string;
  pathname?: string;
  userAgent?: string;
  buildId?: string;
  href?: string;
  /** ISO timestamp from the client */
  at: string;
  hub?: string;
};

export const CLIENT_ERROR_RELOAD_KEY = 'mth_chunk_reload_v1';

export function isChunkLoadFailure(message: string, name?: string): boolean {
  const m = message.toLowerCase();
  const n = (name ?? '').toLowerCase();
  return (
    n.includes('chunkloaderror') ||
    m.includes('loading chunk') ||
    m.includes('chunkloaderror') ||
    m.includes('failed to fetch dynamically imported module') ||
    m.includes('importing a module script failed') ||
    (m.includes('loading css chunk') && m.includes('failed'))
  );
}

export function isHydrationFailure(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes('hydrat') ||
    m.includes('did not match') ||
    m.includes('minified react error #418') ||
    m.includes('minified react error #423') ||
    m.includes('minified react error #425')
  );
}

export function classifyError(message: string, name?: string): ClientErrorKind {
  if (isChunkLoadFailure(message, name)) return 'chunk_load';
  if (isHydrationFailure(message)) return 'hydration';
  return 'uncaught';
}
