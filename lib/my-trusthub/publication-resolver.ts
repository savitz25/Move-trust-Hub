import { containsForbiddenMoveTarget } from './reviewed-origins';

export const CERTIFIED_NATIVE_ID = 'usdot-1002530';
export const CERTIFIED_SLUG = 'hindman-isaacs-moving-storage-inc';
export const CERTIFIED_CLASS = 'mover' as const;

export type CertifiedProfile = { hub: 'move'; nativeId: string; profileClass: string };
export type PublicationRow = {
  nativeId: string;
  canonicalSlug: string;
  publicationState: string | null;
  reviewedClass: string | null;
};
export type Publication = {
  identity: { hub: 'move'; nativeId: typeof CERTIFIED_NATIVE_ID; profileClass: typeof CERTIFIED_CLASS };
  canonicalSlug: typeof CERTIFIED_SLUG;
  publicationState: 'PUBLISHABLE';
  reviewedClass: typeof CERTIFIED_CLASS;
  checkedAt: number;
};
export type ExactPublicationReader = (profile: CertifiedProfile) => Promise<PublicationRow | null>;

/** Approval is an operator attestation name, never a project ref or connection URL. */
export function publicationSourceApproved(env: Record<string, string | undefined>): boolean {
  if (env.VERCEL_ENV === 'production' || env.MTH_V23_MOVE_ISOLATED_SOURCE_APPROVED !== 'true') return false;
  const name = env.MTH_V23_MOVE_ISOLATED_SOURCE?.trim() ?? '';
  if (!name || name.length > 80 || /[:/?#@\s]/.test(name) || containsForbiddenMoveTarget(name) || /supabase/i.test(name)) return false;
  return true;
}

/** Exact native ID, slug, PUBLISHABLE state, and reviewed mover class.
 * No name lookup, no production fallback, and no network binding in the result.
 * A missing reader or unapproved source is unavailable.
 */
export async function resolveExactMovePublication(
  env: Record<string, string | undefined>,
  read: ExactPublicationReader | null,
  profile: unknown,
  now = Date.now(),
): Promise<Publication | null> {
  if (!publicationSourceApproved(env) || !read || !profile || typeof profile !== 'object' || Array.isArray(profile)) return null;
  const body = profile as Record<string, unknown>;
  if (Object.keys(body).sort().join() !== 'hub,nativeId,profileClass') return null;
  if (body.hub !== 'move' || body.nativeId !== CERTIFIED_NATIVE_ID || body.profileClass !== CERTIFIED_CLASS) return null;
  const row = await read({ hub: 'move', nativeId: CERTIFIED_NATIVE_ID, profileClass: CERTIFIED_CLASS });
  if (!row || row.nativeId !== CERTIFIED_NATIVE_ID || row.canonicalSlug !== CERTIFIED_SLUG) return null;
  if (row.publicationState !== 'PUBLISHABLE' || row.reviewedClass !== CERTIFIED_CLASS) return null;
  if (!Number.isFinite(now)) return null;
  return {
    identity: { hub: 'move', nativeId: CERTIFIED_NATIVE_ID, profileClass: CERTIFIED_CLASS },
    canonicalSlug: CERTIFIED_SLUG,
    publicationState: 'PUBLISHABLE',
    reviewedClass: CERTIFIED_CLASS,
    checkedAt: now,
  };
}
