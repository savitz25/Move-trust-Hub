/**
 * Canonical Move Trust Hub Supabase project (Move DB / network SSO).
 * Production MUST use are only — uvq is the legacy free project and must never ship.
 */
export const CANONICAL_SUPABASE_PROJECT_REF = 'arepfylnilkjmyduhwbz';
export const CANONICAL_SUPABASE_URL = `https://${CANONICAL_SUPABASE_PROJECT_REF}.supabase.co`;
export const FORBIDDEN_SUPABASE_PROJECT_REF = 'uvqkyupfnpswdozmuzih';

/** Reviewed V2-3 Move preview branch. Not a general project allowlist. */
export const ISOLATED_MOVE_BROWSER_PROJECT_REF = 'zvoijbohtyuhqfuvteoy';
export const ISOLATED_MOVE_BROWSER_SUPABASE_URL =
  `https://${ISOLATED_MOVE_BROWSER_PROJECT_REF}.supabase.co`;
export const ISOLATED_MOVE_BROWSER_AUTH_APPROVAL_ENV =
  'NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED';
export const ISOLATED_MOVE_BROWSER_AUTH_ORIGIN_ENV =
  'NEXT_PUBLIC_MOVE_ISOLATED_AUTH_ORIGIN';

export function extractSupabaseProjectRef(url: string | undefined | null): string | null {
  if (!url?.trim()) return null;
  try {
    const host = new URL(url.trim()).hostname;
    const m = host.match(/^([a-z0-9]+)\.supabase\.co$/i);
    return m?.[1]?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}

export function isCanonicalSupabaseUrl(url: string | undefined | null): boolean {
  return extractSupabaseProjectRef(url) === CANONICAL_SUPABASE_PROJECT_REF;
}

export function isForbiddenSupabaseUrl(url: string | undefined | null): boolean {
  return extractSupabaseProjectRef(url) === FORBIDDEN_SUPABASE_PROJECT_REF;
}

/**
 * Production / CI: throw if URL points at the legacy free project or is not are.
 *
 * ALLOW_NON_CANONICAL_SUPABASE=1 skips the canonical-ref check only for local
 * and operator runs. It is ignored when VERCEL_ENV=production. The Vercel build
 * guard also ignores it for preview. It never admits a project on a production build.
 */
export function assertCanonicalSupabaseUrl(
  url: string | undefined | null,
  opts: { requireCanonical?: boolean; label?: string; allowNonCanonicalEscape?: boolean } = {}
): void {
  const label = opts.label ?? 'NEXT_PUBLIC_SUPABASE_URL';
  const ref = extractSupabaseProjectRef(url);
  if (isForbiddenSupabaseUrl(url)) {
    throw new Error(
      `${label} points at forbidden legacy project ${FORBIDDEN_SUPABASE_PROJECT_REF}. ` +
        `Use ${CANONICAL_SUPABASE_URL} only.`
    );
  }
  const productionBuild = process.env.VERCEL_ENV?.trim() === 'production';
  const requireCanonical =
    opts.requireCanonical ??
    (process.env.NODE_ENV === 'production' ||
      productionBuild ||
      process.env.CI === 'true' ||
      process.env.ENFORCE_CANONICAL_SUPABASE === '1');
  const allowEscape =
    !productionBuild &&
    opts.allowNonCanonicalEscape !== false &&
    process.env.ALLOW_NON_CANONICAL_SUPABASE === '1';

  if (requireCanonical && !allowEscape) {
    if (!ref) {
      throw new Error(`${label} is missing or not a valid Supabase HTTPS URL.`);
    }
    if (ref !== CANONICAL_SUPABASE_PROJECT_REF) {
      throw new Error(
        `${label} host ref is "${ref}" but must be ${CANONICAL_SUPABASE_PROJECT_REF} (${CANONICAL_SUPABASE_URL}).`
      );
    }
  }
}
