/**
 * Vercel build guard for NEXT_PUBLIC_SUPABASE_URL.
 * Production accepts only the canonical Move project.
 * Any other Vercel env accepts that project, or the exact reviewed isolated
 * project when NEXT_PUBLIC_MOVE_ISOLATED_AUTH_APPROVED=1 and the anon key
 * claims match. ALLOW_NON_CANONICAL_SUPABASE is not an admission path here.
 */
import {
  assertCanonicalSupabaseUrl,
  FORBIDDEN_SUPABASE_PROJECT_REF,
  ISOLATED_MOVE_BROWSER_AUTH_APPROVAL_ENV,
  ISOLATED_MOVE_BROWSER_PROJECT_REF,
  ISOLATED_MOVE_BROWSER_SUPABASE_URL,
  isForbiddenSupabaseUrl,
} from '../lib/supabase/canonical-project';
import { readSupabaseKeyClaims } from '../lib/supabase/key-claims';

export type SupabaseProjectGuardResult =
  | { ok: true; mode: 'production' | 'vercel-canonical' | 'isolated' | 'local' }
  | { ok: false; message: string };

function fail(message: string): SupabaseProjectGuardResult {
  return { ok: false, message };
}

function requireCanonical(
  url: string,
  mode: 'production' | 'vercel-canonical'
): SupabaseProjectGuardResult {
  try {
    assertCanonicalSupabaseUrl(url, {
      requireCanonical: true,
      allowNonCanonicalEscape: false,
    });
  } catch (err) {
    return fail(err instanceof Error ? err.message : String(err));
  }
  return { ok: true, mode };
}

function admitExactIsolatedProject(): SupabaseProjectGuardResult {
  if (process.env[ISOLATED_MOVE_BROWSER_AUTH_APPROVAL_ENV] !== '1') {
    return fail(
      `isolated project ${ISOLATED_MOVE_BROWSER_PROJECT_REF} requires ${ISOLATED_MOVE_BROWSER_AUTH_APPROVAL_ENV}=1`
    );
  }
  const claims = readSupabaseKeyClaims(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (
    !claims ||
    claims.ref !== ISOLATED_MOVE_BROWSER_PROJECT_REF ||
    claims.role !== 'anon'
  ) {
    return fail(
      `NEXT_PUBLIC_SUPABASE_ANON_KEY must be an anon JWT for ${ISOLATED_MOVE_BROWSER_PROJECT_REF}`
    );
  }
  return { ok: true, mode: 'isolated' };
}

/**
 * Server VERCEL_ENV wins. NEXT_PUBLIC_VERCEL_ENV cannot reclassify a build.
 * Isolated admission is the exact URL https://zvoijbohtyuhqfuvteoy.supabase.co
 * plus approval. Decorated URLs stay on the canonical check and fail it.
 */
export function assessSupabaseProjectGuard(): SupabaseProjectGuardResult {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url) return fail('NEXT_PUBLIC_SUPABASE_URL is not set');
  if (isForbiddenSupabaseUrl(url)) {
    return fail(`URL host contains forbidden project ${FORBIDDEN_SUPABASE_PROJECT_REF}`);
  }

  const vercelEnv = process.env.VERCEL_ENV?.trim();
  if (vercelEnv === 'production') {
    return requireCanonical(url, 'production');
  }

  if (vercelEnv) {
    if (url === ISOLATED_MOVE_BROWSER_SUPABASE_URL) return admitExactIsolatedProject();
    return requireCanonical(url, 'vercel-canonical');
  }

  if (
    url === ISOLATED_MOVE_BROWSER_SUPABASE_URL &&
    process.env[ISOLATED_MOVE_BROWSER_AUTH_APPROVAL_ENV] === '1'
  ) {
    return admitExactIsolatedProject();
  }

  try {
    assertCanonicalSupabaseUrl(url, {
      requireCanonical:
        process.env.NODE_ENV === 'production' ||
        process.env.CI === 'true' ||
        process.env.ENFORCE_CANONICAL_SUPABASE === '1',
    });
  } catch (err) {
    return fail(err instanceof Error ? err.message : String(err));
  }
  return { ok: true, mode: 'local' };
}
