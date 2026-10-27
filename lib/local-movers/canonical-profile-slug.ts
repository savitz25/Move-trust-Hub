import type { LocalMover } from '@/lib/local-movers/types';
import { isConsumerVisibleCompany } from '@/lib/provider/publication';
import { normalizeUsdot } from '@/lib/trust/license-verification';

type CompanyIdentity = {
  slug: string;
  usdotNumber?: string | null;
  publicationState?: Parameters<typeof isConsumerVisibleCompany>[0]['publicationState'];
};

/** Final format check for the published slug resolved by the county loader. */
export function canonicalProfileSlugForMover(
  mover: Pick<LocalMover, 'profileSlug'>,
): string | null {
  const slug = mover.profileSlug?.trim();
  if (!slug || !/^[a-z0-9][a-z0-9-]*$/i.test(slug)) return null;
  return slug;
}

/** Resolve a county catalog identity to a currently public company row. */
export function resolvePublishedCompanySlugForMover(
  mover: Pick<LocalMover, 'profileSlug' | 'usdotNumber'>,
  companies: readonly CompanyIdentity[],
): string | null {
  const requestedSlug = mover.profileSlug?.trim();
  const validSlug = (slug: string) => /^[a-z0-9][a-z0-9-]*$/i.test(slug);
  const publicCompanies = companies.filter(isConsumerVisibleCompany);
  const dot = normalizeUsdot(mover.usdotNumber);

  if (dot) {
    const matches = new Map<string, CompanyIdentity>();
    for (const company of publicCompanies) {
      if (normalizeUsdot(company.usdotNumber ?? undefined) === dot && validSlug(company.slug)) {
        matches.set(company.slug.toLowerCase(), company);
      }
    }
    return matches.size === 1 ? [...matches.values()][0]!.slug : null;
  }

  if (!requestedSlug || !validSlug(requestedSlug)) return null;
  const exact = publicCompanies.filter(
    (company) => company.slug.toLowerCase() === requestedSlug.toLowerCase(),
  );
  return exact.length === 1 ? exact[0]!.slug : null;
}
