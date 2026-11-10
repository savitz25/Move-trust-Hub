import { hasCountyServiceEvidence, isPublishableCountyCompany } from '@/lib/local-movers/county-evidence';
import { parseHeadquarters } from '@/lib/local-movers/parse-headquarters';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type CountyCatalogPublicationRow = {
  slug: string;
  headquarters: string | null;
  publication_state: string | null;
  out_of_service: boolean | null;
  authority_active: boolean | null;
  service_scope: string | null;
};

/** Fail closed for missing/hidden rows; never guess a link from a seed snapshot. */
export function projectPublishedCatalogMovers(
  movers: LocalMover[],
  county: LocalCounty,
  rows: CountyCatalogPublicationRow[]
): LocalMover[] {
  const live = new Map(rows.map((row) => [row.slug, row]));
  return movers.flatMap<LocalMover>((mover) => {
    const slug = mover.profileSlug;
    if (!slug) return hasCountyServiceEvidence(mover, county)
      ? [{ ...mover, profileLinkAllowed: false }]
      : [];
    const row = live.get(slug);
    if (!row || !isPublishableCountyCompany(row)) return [];
    const hq = parseHeadquarters(row.headquarters);
    const current = { ...mover, city: hq.city, headquartersState: hq.stateCode };
    return hasCountyServiceEvidence(current, county) ? [current] : [];
  });
}
