/**
 * Next.js build + client-router runtime defaults.
 * Imported by next.config.ts only — keep this file Node-safe (no React).
 */

/** Client router cache (seconds) — longer static TTL reduces RSC refetch on back/forward. */
export const ROUTER_STALE_TIMES = {
  dynamic: 30,
  static: 1800,
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