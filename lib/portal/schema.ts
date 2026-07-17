import 'server-only';

import { portalAdmin } from '@/lib/portal/db';

export type PortalTableMode = 'native' | 'fallback';

let cachedMode: PortalTableMode | null = null;
let cacheAt = 0;
const CACHE_MS = 60_000;

export function isMissingRelationError(error: {
  code?: string;
  message?: string;
} | null | undefined): boolean {
  if (!error) return false;
  const code = error.code ?? '';
  const msg = (error.message ?? '').toLowerCase();
  return (
    code === 'PGRST205' ||
    code === '42P01' ||
    (msg.includes('schema cache') && msg.includes('company_')) ||
    msg.includes('does not exist') ||
    msg.includes('could not find the table')
  );
}

/**
 * Detect whether native portal tables (company_claims, company_owners, …) are available.
 * When missing (migration not applied), we fall back to company_suggestions storage.
 */
export async function getPortalTableMode(): Promise<PortalTableMode> {
  const now = Date.now();
  if (cachedMode && now - cacheAt < CACHE_MS) return cachedMode;

  try {
    const admin = portalAdmin();
    const { error } = await admin.from('company_claims').select('id').limit(1);
    if (isMissingRelationError(error)) {
      cachedMode = 'fallback';
    } else if (error) {
      // Other errors (RLS, network) — still try native; insert will surface details
      console.warn('[portal] company_claims probe error', error.code, error.message);
      cachedMode = 'native';
    } else {
      cachedMode = 'native';
    }
  } catch (err) {
    console.error('[portal] schema probe failed', err);
    cachedMode = 'fallback';
  }

  cacheAt = now;
  return cachedMode;
}

export function clearPortalTableModeCache(): void {
  cachedMode = null;
  cacheAt = 0;
}

export function mapClaimDbError(error: {
  code?: string;
  message?: string;
  details?: string;
  hint?: string;
} | null | undefined): string {
  if (!error) {
    return 'Could not submit claim. Please try again.';
  }

  const code = error.code ?? '';
  const msg = error.message ?? '';
  const lower = msg.toLowerCase();

  if (isMissingRelationError(error)) {
    return 'Portal claim tables are not set up yet. Please try again in a few minutes, or email info@movetrusthub.com with your company name and USDOT.';
  }

  if (code === '23505' || lower.includes('duplicate') || lower.includes('unique')) {
    return 'A claim is already pending for this company or USDOT. We will email you when it is reviewed.';
  }

  if (code === '23503' || lower.includes('foreign key')) {
    return 'This company profile is missing from the claim database. Email info@movetrusthub.com with the listing URL and USDOT.';
  }

  if (code === '42501' || lower.includes('permission') || lower.includes('row-level security')) {
    return 'Claim service permission error. Please contact info@movetrusthub.com.';
  }

  if (lower.includes('rate') || lower.includes('too many')) {
    return 'Too many claim attempts. Please try again later.';
  }

  return `Could not submit claim (${code || 'error'}). ${msg.slice(0, 160) || 'Please try again.'}`;
}
