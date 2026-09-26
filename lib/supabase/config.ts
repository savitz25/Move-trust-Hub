/**
 * Shared Supabase environment configuration.
 * Never import service-role keys in client components.
 */
import {
  assertCanonicalSupabaseUrl,
  CANONICAL_SUPABASE_PROJECT_REF,
  CANONICAL_SUPABASE_URL,
  extractSupabaseProjectRef,
  ISOLATED_MOVE_BROWSER_AUTH_APPROVAL_ENV,
  ISOLATED_MOVE_BROWSER_PROJECT_REF,
  ISOLATED_MOVE_BROWSER_SUPABASE_URL,
  isCanonicalSupabaseUrl,
  isForbiddenSupabaseUrl,
} from '@/lib/supabase/canonical-project';
import { readSupabaseKeyClaims } from '@/lib/supabase/key-claims';

function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Reject placeholder / non-URL values so createClient never throws during
 * SSG (e.g. sitemap prerender with a malformed local .env).
 */
export function isValidSupabaseHttpUrl(url: string | undefined): boolean {
  if (!url) return false;
  if (/placeholder|your-project|example\.supabase/i.test(url)) return false;
  // Legacy free project must never be treated as configured in any environment.
  if (isForbiddenSupabaseUrl(url)) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/** Vercel sets VERCEL_ENV on the server. The client build inlines the same value. */
export function deploymentEnv(): string | undefined {
  const value = process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV;
  return value && value.trim() ? value.trim() : undefined;
}

/**
 * Browser Supabase may use the reviewed isolated project only when every
 * gate matches. Approval does not admit any other project.
 */
export function isIsolatedMoveBrowserAuthAdmitted(): boolean {
  if (deploymentEnv() === 'production') return false;
  if (process.env[ISOLATED_MOVE_BROWSER_AUTH_APPROVAL_ENV] !== '1') return false;
  return readEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) === ISOLATED_MOVE_BROWSER_SUPABASE_URL;
}

export function getSupabaseUrl(): string | undefined {
  const url = readEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (!isValidSupabaseHttpUrl(url)) return undefined;

  if (deploymentEnv() === 'production') {
    if (extractSupabaseProjectRef(url) !== CANONICAL_SUPABASE_PROJECT_REF) {
      throw new Error(
        `NEXT_PUBLIC_SUPABASE_URL must be ${CANONICAL_SUPABASE_URL} in production.`
      );
    }
    return url;
  }

  if (isIsolatedMoveBrowserAuthAdmitted()) {
    return ISOLATED_MOVE_BROWSER_SUPABASE_URL;
  }

  if (extractSupabaseProjectRef(url) === ISOLATED_MOVE_BROWSER_PROJECT_REF) {
    return undefined;
  }

  if (deploymentEnv() === 'preview' && !isCanonicalSupabaseUrl(url)) {
    return undefined;
  }

  // Soft assert outside production (throws only when ENFORCE/CI and wrong host).
  try {
    assertCanonicalSupabaseUrl(url);
  } catch (err) {
    if (
      process.env.NODE_ENV === 'production' ||
      process.env.CI === 'true' ||
      process.env.ENFORCE_CANONICAL_SUPABASE === '1'
    ) {
      throw err;
    }
  }
  return url;
}

export function getSupabaseAnonKey(): string | undefined {
  const key = readEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!key) return undefined;
  const claims = readSupabaseKeyClaims(key);
  if (claims?.role === 'service_role') return undefined;
  const urlRef = extractSupabaseProjectRef(readEnv(process.env.NEXT_PUBLIC_SUPABASE_URL));
  if (claims && urlRef && claims.ref !== urlRef) return undefined;
  if (isIsolatedMoveBrowserAuthAdmitted()) {
    if (!claims || claims.ref !== ISOLATED_MOVE_BROWSER_PROJECT_REF || claims.role !== 'anon') {
      return undefined;
    }
  }
  return key;
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return readEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Service-role clients never follow the browser URL.
 * Isolated browser auth builds no service-role client: not the production
 * project, and not an isolated service-role credential.
 * Outside that admission, a production key stays on the production project.
 */
export function getServiceRoleSupabaseTarget(): { url: string; key: string } | null {
  if (isIsolatedMoveBrowserAuthAdmitted()) return null;
  const key = getSupabaseServiceRoleKey();
  if (!key) return null;
  const claims = readSupabaseKeyClaims(key);
  if (claims?.role && claims.role !== 'service_role') return null;
  if (claims?.ref === ISOLATED_MOVE_BROWSER_PROJECT_REF) return null;
  if (claims?.ref && claims.ref !== CANONICAL_SUPABASE_PROJECT_REF) return null;
  if (claims?.ref === CANONICAL_SUPABASE_PROJECT_REF) {
    return { url: CANONICAL_SUPABASE_URL, key };
  }

  const publicRef = extractSupabaseProjectRef(readEnv(process.env.NEXT_PUBLIC_SUPABASE_URL));
  if (publicRef === ISOLATED_MOVE_BROWSER_PROJECT_REF) return null;
  let url: string | undefined;
  try {
    url = getSupabaseUrl();
  } catch {
    return null;
  }
  if (!url || extractSupabaseProjectRef(url) === ISOLATED_MOVE_BROWSER_PROJECT_REF) return null;
  return { url, key };
}

/** True when public (anon) credentials are present — safe for browser + RSC reads. */
export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

/** True when a service-role client can be built without crossing projects. */
export function isSupabaseAdminConfigured(): boolean {
  return getServiceRoleSupabaseTarget() !== null;
}

export function getAdminSecret(): string | undefined {
  return process.env.ADMIN_SECRET?.trim();
}