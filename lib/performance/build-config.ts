/**
 * Next.js build + client-router runtime defaults.
 * Imported by next.config.ts only — keep this file Node-safe (no React).
 */

/**
 * Client router cache (seconds).
 * Cap static stale so soft-nav after deploys is less likely to request
 * expired chunk hashes (ChunkLoadError → error shell). Recovery still
 * hard-reloads once via ClientRuntimeGuard.
 */
export const ROUTER_STALE_TIMES = {
  dynamic: 30,
  static: 300,
} as const;

/** Trim serverless trace blobs that pages never import at runtime. */
export const OUTPUT_FILE_TRACING_EXCLUDES: Record<string, string[]> = {
  '*': [
    './data/lender/**',
    './scripts/**',
    './docs/**',
    './lighthouse-*.json',
    './.lh-*.json',
  ],
};