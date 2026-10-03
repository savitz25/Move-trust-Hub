import { containsForbiddenMoveTarget } from './reviewed-origins';

/** The supported Save class and the exact identity grain. A Move mover is
 * identified by its USDOT number only: `usdot-<number>`. */
export const SUPPORTED_CLASS = 'mover' as const;
const NATIVE_ID = /^usdot-[1-9][0-9]{0,8}$/;
const SLUG = /^[a-z0-9][a-z0-9-]{0,159}$/;

export type CertifiedProfile = { hub: 'move'; nativeId: string; profileClass: string };
export type PublicationRow = {
  nativeId: string;
  canonicalSlug: string;
  publicationState: string | null;
  reviewedClass: string | null;
};
export type Publication = {
  identity: { hub: 'move'; nativeId: string; profileClass: typeof SUPPORTED_CLASS };
  canonicalSlug: string;
  publicationState: 'PUBLISHABLE';
  reviewedClass: typeof SUPPORTED_CLASS;
  checkedAt: number;
};
export type ExactPublicationReader = (profile: CertifiedProfile) => Promise<PublicationRow | null>;

/** Approval is an operator attestation name, never a project ref or connection URL.
 * Production uses its own attestation pair (MTH_V23_MOVE_PRODUCTION_SOURCE[_APPROVED]);
 * the isolated attestation never opens production and vice versa. */
export function publicationSourceApproved(env: Record<string, string | undefined>): boolean {
  const production = env.VERCEL_ENV === 'production';
  if (production ? env.MTH_V23_MOVE_PRODUCTION_SOURCE_APPROVED !== 'true' : env.MTH_V23_MOVE_ISOLATED_SOURCE_APPROVED !== 'true') return false;
  const name = (production ? env.MTH_V23_MOVE_PRODUCTION_SOURCE : env.MTH_V23_MOVE_ISOLATED_SOURCE)?.trim() ?? '';
  if (!name || name.length > 80 || /[:/?#@\s]/.test(name) || containsForbiddenMoveTarget(name) || /supabase/i.test(name)) return false;
  return true;
}

/** Exact identity in, exact publication out. The profile must be the supported
 * grain (hub move, class mover, native id usdot-<number>); the publication
 * source must return the same native id, a well-formed canonical slug, the
 * PUBLISHABLE state and the mover class. No name lookup, no cross-environment
 * fallback, and no network binding in the result. A missing reader or an
 * unapproved source is unavailable.
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
  if (body.hub !== 'move' || typeof body.nativeId !== 'string' || !NATIVE_ID.test(body.nativeId) || body.profileClass !== SUPPORTED_CLASS) return null;
  const nativeId = body.nativeId;
  const row = await read({ hub: 'move', nativeId, profileClass: SUPPORTED_CLASS });
  if (!row || row.nativeId !== nativeId || typeof row.canonicalSlug !== 'string' || !SLUG.test(row.canonicalSlug)) return null;
  if (row.publicationState !== 'PUBLISHABLE' || row.reviewedClass !== SUPPORTED_CLASS) return null;
  if (!Number.isFinite(now)) return null;
  return {
    identity: { hub: 'move', nativeId, profileClass: SUPPORTED_CLASS },
    canonicalSlug: row.canonicalSlug,
    publicationState: 'PUBLISHABLE',
    reviewedClass: SUPPORTED_CLASS,
    checkedAt: now,
  };
}
