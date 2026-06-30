import { seedCompanies } from '@/data/seed-companies';
import { assessLicense } from '@/lib/trust/license-verification';
import type { LocalMover } from '@/lib/local-movers/types';

/** Existing catalog IDs that already map to interstate directory profiles */
const EXISTING_DIRECTORY_CATALOG_IDS = new Set([
  'amerisafe-van-lines',
  'international-van-lines',
  'american-van-lines',
  'colonial-van-lines',
  'moving-apt',
]);

function mapServices(services: string[]): string[] {
  return services.map((s) => {
    if (s === 'Full Service') return 'Long Distance';
    if (s === 'Carrier') return 'Long Distance';
    return s;
  });
}

/**
 * Verified interstate directory companies as local-mover catalog entries.
 * Enables FMCSA-verified listings on metro counties nationwide.
 */
export const directoryLocalMovers: Record<string, LocalMover> = Object.fromEntries(
  seedCompanies
    .filter(
      (company) =>
        company.isVerified && assessLicense(company.usdotNumber, company.mcNumber).isDisplayable
    )
    .filter((company) => !EXISTING_DIRECTORY_CATALOG_IDS.has(company.slug))
    .map((company) => {
      const id = `directory-${company.slug}`;
      const city = company.headquarters.split(',')[0]?.trim() ?? company.headquarters;
      return [
        id,
        {
          id,
          name: company.name,
          profileSlug: company.slug,
          rating: company.overallRating,
          reviewCount: company.reviewCount,
          shortDescription: company.shortDescription,
          services: mapServices(company.services),
          specialties: company.specialties,
          usdotNumber: company.usdotNumber,
          mcNumber: company.mcNumber,
          fmcsaSafetyRating: company.fmcsaSafetyRating,
          bbbRating: company.bbbRating,
          city,
        } satisfies LocalMover,
      ];
    })
);

export const directoryMoverIdsByReputation: string[] = seedCompanies
  .filter(
    (company) =>
      company.isVerified && assessLicense(company.usdotNumber, company.mcNumber).isDisplayable
  )
  .sort((a, b) => b.reputationScore - a.reputationScore)
  .map((company) =>
    EXISTING_DIRECTORY_CATALOG_IDS.has(company.slug)
      ? company.slug
      : `directory-${company.slug}`
  );