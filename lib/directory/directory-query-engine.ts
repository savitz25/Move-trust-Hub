/**
 * Task 009A.1 — directory query engine selection.
 *
 * Production default remains the legacy unified-directory engine.
 * DB-backed mode is opt-in only (env flag or Preview-only request hint).
 * Task 009A.2 performs production cutover.
 */

export type DirectoryQueryEngine = 'legacy' | 'db';

export function resolveDirectoryQueryEngine(options?: {
  /** Explicit engine hint from SSR/API (ignored on production unless env forces db). */
  requestEngine?: string | null;
}): DirectoryQueryEngine {
  const env = (process.env.DIRECTORY_QUERY_ENGINE ?? '').trim().toLowerCase();
  if (env === 'db' || env === 'legacy') {
    return env;
  }

  const hint = (options?.requestEngine ?? '').trim().toLowerCase();
  if (hint === 'db') {
    // Preview / local only — never honor public engine=db on production hosts.
    const vercelEnv = (process.env.VERCEL_ENV ?? '').trim().toLowerCase();
    const allowPreview =
      vercelEnv === 'preview' ||
      vercelEnv === 'development' ||
      process.env.NODE_ENV !== 'production' ||
      process.env.DIRECTORY_ENGINE_PREVIEW_OPT_IN === '1';
    if (allowPreview) return 'db';
  }

  return 'legacy';
}

export function isDbDirectoryEngineEnabled(options?: {
  requestEngine?: string | null;
}): boolean {
  return resolveDirectoryQueryEngine(options) === 'db';
}
