import {
  mergeCoverageWithAssignments,
  type AssignmentCounty,
} from '@/lib/directory/coverage-counties-merge';
import { localMoverToCompany } from '@/lib/directory/local-mover-to-company';
import { fullMoversCatalog } from '@/lib/local-movers/catalog';
import { getStaticMoverCountyIndex } from '@/lib/local-movers/static-mover-county-index';
import { isCuratedMover } from '@/lib/trust/curated-listing-policy';
import type { Company } from '@/types';

/** Keys used to join directory companies ↔ county catalog assignment ids. */
export function companyCountyLookupKeys(company: Pick<Company, 'id' | 'slug'>): string[] {
  const keys = new Set<string>();
  for (const raw of [company.slug, company.id]) {
    const k = (raw || '').trim().toLowerCase();
    if (!k) continue;
    keys.add(k);
    const bare = k.replace(/^directory-/, '');
    keys.add(bare);
    if (!k.startsWith('directory-') && bare) keys.add(`directory-${bare}`);
  }
  return [...keys];
}

function lookupStaticCounties(
  byKey: Map<string, AssignmentCounty[]>,
  keys: string[]
): AssignmentCounty[] {
  const out: AssignmentCounty[] = [];
  const seen = new Set<string>();
  for (const key of keys) {
    for (const c of byKey.get(key) ?? []) {
      const id = `${c.stateSlug}/${c.countySlug}`;
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(c);
    }
  }
  return out;
}

/**
 * Attach curated county-page assignments onto directory companies and inject
 * any catalog movers that appear on county pages but are missing from the
 * Supabase/active-directory merge — so State/County filters match county pages.
 */
export function enrichDirectoryWithStaticCountyCoverage(companies: Company[]): Company[] {
  const { byKey, primaryMoverIds } = getStaticMoverCountyIndex();

  const enriched = companies.map((company) => {
    const staticCounties = lookupStaticCounties(byKey, companyCountyLookupKeys(company));
    if (!staticCounties.length) return company;
    return {
      ...company,
      coverageCounties: mergeCoverageWithAssignments(
        company.coverageCounties,
        staticCounties
      ),
    };
  });

  const present = new Set(
    enriched.flatMap((c) => companyCountyLookupKeys(c))
  );

  const injected: Company[] = [];

  for (const moverId of primaryMoverIds) {
    const aliases = companyCountyLookupKeys({ id: moverId, slug: moverId });
    if (aliases.some((k) => present.has(k))) continue;

    const mover = fullMoversCatalog[moverId];
    if (!mover || !isCuratedMover(mover)) continue;

    const company = localMoverToCompany(mover);
    // Re-check after profile slug resolution
    if (companyCountyLookupKeys(company).some((k) => present.has(k))) continue;

    const staticCounties = lookupStaticCounties(
      byKey,
      companyCountyLookupKeys(company).concat(aliases)
    );

    injected.push({
      ...company,
      authorityActive: true,
      outOfService: false,
      usdotStatus: 'ACTIVE',
      isVerified: Boolean(company.usdotNumber) || company.isVerified,
      serviceScope: mover.isLocalOnly ? 'intrastate' : 'interstate',
      coverageCounties: mergeCoverageWithAssignments(
        company.coverageCounties,
        staticCounties
      ),
    });

    for (const k of companyCountyLookupKeys(injected[injected.length - 1]!)) {
      present.add(k);
    }
  }

  return injected.length ? [...enriched, ...injected] : enriched;
}
