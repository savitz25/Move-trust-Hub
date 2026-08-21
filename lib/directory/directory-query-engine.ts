/**
 * Task 009A.2 — directory query engine selection.
 *
 * Production default is the DB-backed engine.
 * Explicit rollback: DIRECTORY_QUERY_ENGINE=legacy
 * Emergency request hint engine=legacy only when DIRECTORY_ENGINE_ALLOW_LEGACY_HINT=1
 */

export type DirectoryQueryEngine = 'legacy' | 'db';

export type DirectoryQueryPath =
  | 'db'
  | 'hybrid'
  | 'legacy'
  | 'legacy_fallback';

/** In-process counters for ops / cutover monitoring (reset per cold start). */
const pathCounts: Record<DirectoryQueryPath, number> = {
  db: 0,
  hybrid: 0,
  legacy: 0,
  legacy_fallback: 0,
};

export function recordDirectoryQueryPath(path: DirectoryQueryPath): void {
  pathCounts[path] += 1;
}

export function getDirectoryQueryPathCounts(): Record<DirectoryQueryPath, number> {
  return { ...pathCounts };
}

export function resetDirectoryQueryPathCounts(): void {
  pathCounts.db = 0;
  pathCounts.hybrid = 0;
  pathCounts.legacy = 0;
  pathCounts.legacy_fallback = 0;
}

/**
 * Whether emergency legacy fallback is allowed when the DB engine hard-fails.
 * Off by default — never silently serve seed / full-hydrate legacy on normal traffic.
 */
export function isLegacyFallbackAllowed(): boolean {
  const v = (process.env.DIRECTORY_ENGINE_LEGACY_FALLBACK ?? '').trim().toLowerCase();
  return v === '1' || v === 'true' || v === 'yes';
}

export function resolveDirectoryQueryEngine(options?: {
  /** Explicit engine hint from SSR/API. */
  requestEngine?: string | null;
}): DirectoryQueryEngine {
  const env = (process.env.DIRECTORY_QUERY_ENGINE ?? '').trim().toLowerCase();
  // Explicit ops rollback / force
  if (env === 'legacy' || env === 'db') {
    return env;
  }

  const hint = (options?.requestEngine ?? '').trim().toLowerCase();
  if (hint === 'legacy') {
    // Emergency/debug only — never honor public engine=legacy on production by default.
    const allowHint =
      process.env.DIRECTORY_ENGINE_ALLOW_LEGACY_HINT === '1' ||
      process.env.NODE_ENV !== 'production' ||
      (process.env.VERCEL_ENV ?? '').trim().toLowerCase() === 'preview' ||
      (process.env.VERCEL_ENV ?? '').trim().toLowerCase() === 'development';
    if (allowHint) return 'legacy';
  }

  // Task 009A.2: DB is the production default.
  return 'db';
}

export function isDbDirectoryEngineEnabled(options?: {
  requestEngine?: string | null;
}): boolean {
  return resolveDirectoryQueryEngine(options) === 'db';
}
