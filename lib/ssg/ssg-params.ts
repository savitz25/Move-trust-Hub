/**
 * Controls whether marketing routes bulk-prerender thousands of paths at build.
 *
 * Default: empty params → on-demand static generation (dynamicParams).
 * Full prerender (local SEO freeze): BULK_SSG=1 npm run build
 */
export function ssgParams<T>(params: T[]): T[] {
  if (process.env.BULK_SSG === '1') return params;
  return [];
}

/** True while Next is running `next build` production static generation. */
export function isProductionBuildPhase(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build';
}
