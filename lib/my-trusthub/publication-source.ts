/**
 * Move's real production publication authority for a My TrustHub Save.
 *
 * The source is the same anonymous-readable `public.companies` row that renders
 * /companies/<slug>, judged by the same rules the profile page uses. Nothing is
 * copied, registered or attested separately: there is no My TrustHub mover
 * list. This module only answers one exact question about one mover.
 *
 * Grain: one `companies` row. The stable native identity is the USDOT number
 * (`usdot-<number>`), because row ids are not uniform (some are
 * `usdot-<number>`, some are legacy names) and the Ask network binding is keyed by fmcsa.usdot.
 *
 * Eligible only when ALL hold:
 *   1. exactly one row carries that USDOT number (no duplicate/alias profile);
 *   2. publication_state is explicitly PUBLISHABLE and the row passes the
 *      anonymous public profile rule (a row merely existing is not enough);
 *   3. it is not out of service;
 *   4. the profile page's own classifier gives it a household-goods carrier
 *      capability (class `mover`); broker-only and auto-only rows are not;
 *   5. it has a well-formed canonical slug.
 * Anything else is "not eligible": the device Save stands, account sync does
 * not happen. No name matching, no fuzzy alias resolution, no enumeration.
 */
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';
import type { CertifiedProfile, PublicationRow } from './publication-resolver';

export type CompanyRecord = Record<string, unknown>;
export type CompaniesPort = {
  /** Exact slug equality on public.companies. Never a pattern or alias. */
  bySlug(slug: string): Promise<CompanyRecord[]>;
  /** Exact USDOT number equality on public.companies. */
  byUsdot(usdot: string): Promise<CompanyRecord[]>;
  /** Capabilities from the profile page's classifier over the mapped row. */
  capabilities(row: CompanyRecord): readonly string[];
};
/** One exact publication question, by signed identity or by the profile's slug. */
export type PublicationSource = {
  byIdentity(profile: CertifiedProfile): Promise<PublicationRow | null>;
  bySlug(slug: string): Promise<PublicationRow | null>;
};

export const MOVE_NATIVE_ID = /^usdot-[1-9][0-9]{0,8}$/;
export const MOVE_SLUG = /^[a-z0-9][a-z0-9-]{0,159}$/;
const USDOT = /^[1-9][0-9]{0,8}$/;
/** Household-goods carrier capabilities: the supported `mover` class. */
export const MOVER_CAPABILITIES: readonly string[] = ['hhg_interstate_carrier', 'hhg_intrastate', 'hhg_local'];

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : typeof value === 'number' ? String(value) : '');

/** Judge the rows that carry one USDOT number. Pure; no I/O. */
export function evaluatePublishedMover(rows: readonly CompanyRecord[], usdot: string, capabilities: CompaniesPort['capabilities']): PublicationRow | null {
  if (!USDOT.test(usdot) || rows.length !== 1) return null;
  const row = rows[0]!;
  const slug = text(row.slug);
  if (text(row.usdot_number) !== usdot || !MOVE_SLUG.test(slug)) return null;
  const state = typeof row.publication_state === 'string' ? row.publication_state : null;
  // Explicit affirmative state only. A legacy row without a state renders
  // publicly but is not evidence of publishability for an account Save.
  if (state !== 'PUBLISHABLE' || !isAnonymousPublicProfileAllowed({ publicationState: state as PublicationState })) return null;
  if (row.out_of_service === true) return null;
  let mover = false;
  try { mover = capabilities(row).some(capability => MOVER_CAPABILITIES.includes(capability)); } catch { return null; }
  return { nativeId: 'usdot-' + usdot, canonicalSlug: slug, publicationState: state, reviewedClass: mover ? 'mover' : 'unsupported' };
}

export function publishedMoverSource(port: CompaniesPort): PublicationSource {
  const byUsdot = async (usdot: string) => evaluatePublishedMover(await port.byUsdot(usdot), usdot, port.capabilities);
  return {
    async byIdentity(profile) {
      if (profile.hub !== 'move' || !MOVE_NATIVE_ID.test(profile.nativeId)) return null;
      try { return await byUsdot(profile.nativeId.slice('usdot-'.length)); } catch { return null; }
    },
    async bySlug(slug) {
      if (!MOVE_SLUG.test(slug)) return null;
      try {
        const rows = await port.bySlug(slug);
        if (rows.length !== 1 || text(rows[0]!.slug) !== slug) return null;
        const usdot = text(rows[0]!.usdot_number);
        if (!USDOT.test(usdot)) return null;
        // Judged through the identity path so a duplicate USDOT is seen.
        const row = await byUsdot(usdot);
        return row && row.canonicalSlug === slug ? row : null;
      } catch { return null; }
    },
  };
}
