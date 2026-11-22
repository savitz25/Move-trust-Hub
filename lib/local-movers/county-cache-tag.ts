const COUNTY_PATH = /^\/local-movers\/([a-z0-9-]+)\/([a-z0-9-]+)$/;

/** Match the literal path, without decoding or normalizing caller input. */
export function countyCacheTag(path: unknown): string | null {
  if (typeof path !== 'string') return null;
  const match = COUNTY_PATH.exec(path);
  // JS `$` can match before a final newline; require a whole-string match.
  if (!match || match[0] !== path) return null;
  return `county-${match[1]}-${match[2]}`;
}

export function countyRevalidationPaths(body: unknown): string[] | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
  const paths = (body as { paths?: unknown }).paths;
  if (!Array.isArray(paths) || paths.length === 0) return null;
  // Validate the entire batch before the route performs any invalidation.
  if (!paths.every((path) => countyCacheTag(path) !== null)) return null;
  return [...new Set(paths as string[])];
}

/** Response headers only; no TTL, data-cache tag, or page-rendering change. */
export function applyCountyCacheTags(
  responseHeaders: Headers,
  pathname: string,
  request: Pick<Request, 'method' | 'headers'>,
): void {
  if (request.method !== 'GET' && request.method !== 'HEAD') return;
  if (request.headers.get('rsc') === '1') return;
  const tag = countyCacheTag(pathname);
  if (!tag) return;
  responseHeaders.set('Cache-Tag', tag);
  // Vercel consumes this header at the CDN; Cache-Tag remains observable.
  responseHeaders.set('Vercel-Cache-Tag', tag);
}
