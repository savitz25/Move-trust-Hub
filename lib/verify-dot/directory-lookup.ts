import 'server-only';

import { resolveCompanyFromList } from '@/lib/directory/slug-resolution';
import { getCompaniesCached, getCompanyByCarrierFromDb } from '@/lib/supabase/queries/companies';
import { normalizeMc, normalizeUsdot } from '@/lib/trust/license-verification';
import type { FmcsaPreview } from '@/lib/verify-dot/fmcsa';
import type { ParsedCarrierNumber } from '@/lib/verify-dot/schema';
import type { Company } from '@/types';

function companyToPreview(company: Company): FmcsaPreview {
  return {
    legalName: company.name,
    dbaName: company.shortDescription || undefined,
    physicalAddress: company.headquarters || undefined,
    safetyRating: company.fmcsaSafetyRating,
    allowedToOperate: company.isVerified ? 'Y' : undefined,
    usdot: normalizeUsdot(company.usdotNumber) || undefined,
    mcNumber: normalizeMc(company.mcNumber) || undefined,
    source: 'directory',
  };
}

function companyFromListMatch(
  companies: Company[],
  parsed: ParsedCarrierNumber
): Company | undefined {
  const keys =
    parsed.type === 'DOT'
      ? [parsed.value, `dot-${parsed.value}`]
      : [parsed.value, `mc-${parsed.value}`];

  for (const key of keys) {
    const fromList = resolveCompanyFromList(companies, key);
    if (fromList) return fromList;
  }

  return companies.find((company) => {
    if (parsed.type === 'DOT') {
      return normalizeUsdot(company.usdotNumber) === parsed.value;
    }
    return normalizeMc(company.mcNumber) === parsed.value;
  });
}

/**
 * Find an existing directory profile for a USDOT/MC query.
 * DB-first (profile-page resolution), then cached list fallback with normalized matching.
 */
export async function findCompanyByCarrierNumber(
  parsed: ParsedCarrierNumber,
  legalNameHint?: string
): Promise<{
  preview: FmcsaPreview | null;
  slug?: string;
  name?: string;
}> {
  const fromDb = await getCompanyByCarrierFromDb(parsed, legalNameHint);
  if (fromDb) {
    return {
      slug: fromDb.slug,
      name: fromDb.name,
      preview: companyToPreview(fromDb),
    };
  }

  const companies = await getCompaniesCached();
  const fromList = companyFromListMatch(companies, parsed);
  if (!fromList) return { preview: null };

  return {
    slug: fromList.slug,
    name: fromList.name,
    preview: companyToPreview(fromList),
  };
}