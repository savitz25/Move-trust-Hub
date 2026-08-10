/**
 * Canonical Move Trust Hub Supabase project (Move DB / network SSO).
 * Production MUST use are only — uvq is the legacy free project and must never ship.
 */
export const CANONICAL_SUPABASE_PROJECT_REF = 'arepfylnilkjmyduhwbz';
export const CANONICAL_SUPABASE_URL = `https://${CANONICAL_SUPABASE_PROJECT_REF}.supabase.co`;
export const FORBIDDEN_SUPABASE_PROJECT_REF = 'uvqkyupfnpswdozmuzih';

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
 * Development may use are only as well (recommended); set ALLOW_NON_CANONICAL_SUPABASE=1
 * only for emergency local debugging against another project.
 */
export function assertCanonicalSupabaseUrl(
  url: string | undefined | null,
  opts: { requireCanonical?: boolean; label?: string } = {}
): void {
  const label = opts.label ?? 'NEXT_PUBLIC_SUPABASE_URL';
  const ref = extractSupabaseProjectRef(url);
  if (isForbiddenSupabaseUrl(url)) {
    throw new Error(
      `${label} points at forbidden legacy project ${FORBIDDEN_SUPABASE_PROJECT_REF}. ` +
        `Use ${CANONICAL_SUPABASE_URL} only.`
    );
  }
  const requireCanonical =
    opts.requireCanonical ??
    (process.env.NODE_ENV === 'production' ||
      process.env.VERCEL_ENV === 'production' ||
      process.env.CI === 'true' ||
      process.env.ENFORCE_CANONICAL_SUPABASE === '1');

  if (requireCanonical && process.env.ALLOW_NON_CANONICAL_SUPABASE !== '1') {
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
