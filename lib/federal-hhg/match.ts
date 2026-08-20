import { normalizeMc, normalizeUsdot } from '@/lib/federal-hhg/normalize';
import { FORBIDDEN_COPIED_USDOT_ASSIGNMENTS } from '@/lib/federal-hhg/protected-identities';

export type MatchCompany = {
  id: string;
  usdotNumber?: string | null;
  mcNumber?: string | null;
  name?: string | null;
};

export type StagingDisposition =
  | 'MATCHED_EXISTING'
  | 'NEW_CANONICAL_CANDIDATE'
  | 'IDENTITY_REVIEW_REQUIRED'
  | 'INACTIVE'
  | 'NOT_HHG'
  | 'REJECTED';

export type CanonicalMatch = {
  disposition: StagingDisposition;
  companyId: string | null;
  reason: string;
};

export function nameTokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(
      (token) =>
        token.length > 2 &&
        ![
          'llc',
          'inc',
          'corp',
          'the',
          'and',
          'van',
          'lines',
          'moving',
          'movers',
          'storage',
          'transport',
          'transportation',
          'services',
          'company',
          'co',
        ].includes(token)
    );
}

export function namesLookSimilar(a: string, b: string): boolean {
  const ta = new Set(nameTokens(a));
  const tb = new Set(nameTokens(b));
  if (!ta.size || !tb.size) return false;
  let overlap = 0;
  for (const token of ta) if (tb.has(token)) overlap += 1;
  return overlap >= 1;
}

export function matchStagedToCompanies(
  staged: { usdot: string; mc: string | null; legalName: string },
  companies: readonly MatchCompany[]
): CanonicalMatch {
  const usdot = normalizeUsdot(staged.usdot);
  const mc = normalizeMc(staged.mc ?? '');

  if (usdot) {
    const byDot = companies.filter((company) => normalizeUsdot(company.usdotNumber ?? '') === usdot);
    if (byDot.length === 1) {
      const forbidden = FORBIDDEN_COPIED_USDOT_ASSIGNMENTS.find(
        (item) => item.companyId === byDot[0]!.id && item.forbiddenUsdot === usdot
      );
      if (forbidden) {
        return {
          disposition: 'IDENTITY_REVIEW_REQUIRED',
          companyId: null,
          reason: 'Task 002 forbids reassigning this copied USDOT to the remediated company',
        };
      }
      return {
        disposition: 'MATCHED_EXISTING',
        companyId: byDot[0]!.id,
        reason: 'exact USDOT',
      };
    }
    if (byDot.length > 1) {
      return {
        disposition: 'IDENTITY_REVIEW_REQUIRED',
        companyId: null,
        reason: 'duplicate USDOT on existing companies',
      };
    }
  }

  if (mc) {
    const byMc = companies.filter((company) => normalizeMc(company.mcNumber ?? '') === mc);
    if (byMc.length === 1) {
      const existingDot = normalizeUsdot(byMc[0]!.usdotNumber ?? '');
      if (existingDot && usdot && existingDot !== usdot) {
        return {
          disposition: 'IDENTITY_REVIEW_REQUIRED',
          companyId: null,
          reason: 'MC matches but USDOT differs',
        };
      }
      return {
        disposition: 'MATCHED_EXISTING',
        companyId: byMc[0]!.id,
        reason: 'exact MC',
      };
    }
    if (byMc.length > 1) {
      return {
        disposition: 'IDENTITY_REVIEW_REQUIRED',
        companyId: null,
        reason: 'duplicate MC on existing companies',
      };
    }
  }

  const similar = companies.filter((company) =>
    namesLookSimilar(staged.legalName, company.name ?? '')
  );
  if (similar.length) {
    return {
      disposition: 'IDENTITY_REVIEW_REQUIRED',
      companyId: null,
      reason: 'name similarity only — not a canonical match',
    };
  }

  return {
    disposition: 'NEW_CANONICAL_CANDIDATE',
    companyId: null,
    reason: 'no exact USDOT or MC match',
  };
}
