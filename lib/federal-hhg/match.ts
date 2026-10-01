import { normalizeMc, normalizeUsdot } from '@/lib/federal-hhg/normalize';
import { FORBIDDEN_COPIED_USDOT_ASSIGNMENTS } from '@/lib/federal-hhg/protected-identities';

/**
 * Identity root cause for the MU-MOVE-001 S1 false-negative class.
 * The Task 003 exact-USDOT pass that wrote the historical 118 `exact USDOT`
 * links ran against a `companies` universe that was almost entirely
 * `legacy_directory_row=true`. Later `usdot-*` spine rows were not in that
 * candidate set, so staging was stamped `no exact USDOT or MC match` (or a
 * name-similarity review) despite digit-for-digit USDOT equality.
 *
 * This code is documentation of that class. It is not a `match_reason` stamp.
 */
export const MATCHER_SCOPE_EXCLUDED_NON_LEGACY_USDOT_SPINE =
  'MATCHER_SCOPE_EXCLUDED_NON_LEGACY_USDOT_SPINE';

export const EXACT_USDOT_REASON = 'exact USDOT';
export const DUPLICATE_USDOT_REASON = 'duplicate USDOT on existing companies';
export const USDOT_MC_DISAGREE_REASON = 'USDOT matches but MC differs';
export const NO_EXACT_USDOT_OR_MC_REASON = 'no exact USDOT or MC match';
export const NAME_SIMILARITY_ONLY_REASON = 'name similarity only — not a canonical match';
/** Backstop if a literal USDOT hit is not resolved by an earlier branch. */
export const LITERAL_USDOT_UNRESOLVED_REASON = 'literal USDOT equality requires review';

/**
 * Multi-company USDOT held for Identity BRANCH/DBA adjudication.
 * Never auto-link, even when the candidate list contains only one of the companies.
 */
export const COLLISION_HOLD_USDOTS: ReadonlySet<string> = new Set(['1398726']);

export type MatchCompany = {
  id: string;
  usdotNumber?: string | null;
  mcNumber?: string | null;
  name?: string | null;
  /**
   * Scope columns confirmed against the Task 003 candidate load.
   * Exact-USDOT matching does not exclude on any of them.
   */
  legacyDirectoryRow?: boolean | null;
  publicationState?: string | null;
  entityType?: string | null;
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

/**
 * Candidate read for `scripts/stage-federal-hhg.ts`.
 *
 * Confirmed filter (there is none on these columns):
 * - `legacy_directory_row` — not a predicate. Legacy directory rows and
 *   non-legacy spine rows are both candidates.
 * - id prefix `usdot-%` — not excluded. Spine ids stay in the set.
 * - `publication_state` — not a predicate.
 * - `entity_type` — not a predicate.
 *
 * Exact USDOT equality uses digit-normalized `companies.usdot_number` only.
 * The `usdot-*` id is not a USDOT substitute when `usdot_number` is empty.
 */
export const FEDERAL_HHG_MATCH_CANDIDATE_SQL = `
  SELECT id, slug, name, usdot_number, mc_number,
         legacy_directory_row, publication_state, entity_type
    FROM public.companies
`;

/**
 * Returns a description of the scope regression, or null when the SQL keeps
 * non-legacy `usdot-*` spine rows in the exact-USDOT candidate universe.
 */
export function federalHhgMatchCandidateSqlScopeIssue(sql: string): string | null {
  const compact = sql.replace(/\s+/g, ' ').trim();
  if (!/from\s+public\.companies\b/i.test(compact)) {
    return 'candidate SQL must read public.companies';
  }
  const whereAt = compact.toLowerCase().indexOf(' where ');
  if (whereAt === -1) return null;
  const whereBody = compact.slice(whereAt);
  if (/legacy_directory_row/i.test(whereBody)) {
    return 'legacy_directory_row predicate excludes part of the USDOT universe';
  }
  if (/not\s+like\s+'usdot-%'/i.test(whereBody)) {
    return 'id NOT LIKE \'usdot-%\' drops the non-legacy USDOT spine';
  }
  if (/publication_state/i.test(whereBody)) {
    return 'publication_state predicate is not an exact-USDOT candidate filter';
  }
  if (/entity_type/i.test(whereBody)) {
    return 'entity_type predicate is not an exact-USDOT candidate filter';
  }
  return null;
}

export function assertFederalHhgMatchCandidateSql(sql: string): void {
  const issue = federalHhgMatchCandidateSqlScopeIssue(sql);
  if (issue) {
    throw new Error(`${MATCHER_SCOPE_EXCLUDED_NON_LEGACY_USDOT_SPINE}: ${issue}`);
  }
}

/**
 * A company is an exact-USDOT candidate when it has a digit USDOT.
 * `legacy_directory_row`, an `usdot-%` id, `publication_state`, and
 * `entity_type` do not exclude it.
 */
export function isExactUsdotMatchCandidate(company: MatchCompany): boolean {
  return normalizeUsdot(company.usdotNumber ?? '') !== '';
}

export function isCollisionHoldUsdot(usdot: string | null | undefined): boolean {
  const digits = normalizeUsdot(usdot ?? '');
  return Boolean(digits) && COLLISION_HOLD_USDOTS.has(digits);
}

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

function exactUsdotHits(usdot: string, companies: readonly MatchCompany[]): MatchCompany[] {
  if (!usdot) return [];
  return companies.filter(
    (company) =>
      isExactUsdotMatchCandidate(company) &&
      normalizeUsdot(company.usdotNumber ?? '') === usdot
  );
}

/** USDOT-only is enough when either side has no MC digits. Both sides must agree. */
function mcAgreesForUsdotLink(stagedMc: string, companyMc: string): boolean {
  if (!stagedMc || !companyMc) return true;
  return stagedMc === companyMc;
}

function resolveExactUsdot(
  usdot: string,
  mc: string,
  hits: readonly MatchCompany[]
): CanonicalMatch | null {
  if (!usdot || hits.length === 0) return null;
  if (isCollisionHoldUsdot(usdot) || hits.length > 1) {
    return {
      disposition: 'IDENTITY_REVIEW_REQUIRED',
      companyId: null,
      reason: DUPLICATE_USDOT_REASON,
    };
  }
  const company = hits[0]!;
  const forbidden = FORBIDDEN_COPIED_USDOT_ASSIGNMENTS.find(
    (item) => item.companyId === company.id && item.forbiddenUsdot === usdot
  );
  if (forbidden) {
    return {
      disposition: 'IDENTITY_REVIEW_REQUIRED',
      companyId: null,
      reason: 'Task 002 forbids reassigning this copied USDOT to the remediated company',
    };
  }
  const companyMc = normalizeMc(company.mcNumber ?? '');
  if (!mcAgreesForUsdotLink(mc, companyMc)) {
    return {
      disposition: 'IDENTITY_REVIEW_REQUIRED',
      companyId: null,
      reason: USDOT_MC_DISAGREE_REASON,
    };
  }
  return {
    disposition: 'MATCHED_EXISTING',
    companyId: company.id,
    reason: EXACT_USDOT_REASON,
  };
}

export function matchStagedToCompanies(
  staged: { usdot: string; mc: string | null; legalName: string },
  companies: readonly MatchCompany[]
): CanonicalMatch {
  const usdot = normalizeUsdot(staged.usdot);
  const mc = normalizeMc(staged.mc ?? '');
  const usdotHits = exactUsdotHits(usdot, companies);

  // Literal USDOT equality is resolved before name similarity and before the
  // "no exact USDOT or MC match" stamp. A 1:1 hit becomes `exact USDOT`.
  const exact = resolveExactUsdot(usdot, mc, usdotHits);
  if (exact) return exact;

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
      if (existingDot && isCollisionHoldUsdot(existingDot)) {
        return {
          disposition: 'IDENTITY_REVIEW_REQUIRED',
          companyId: null,
          reason: DUPLICATE_USDOT_REASON,
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

  if (usdotHits.length > 0) {
    return {
      disposition: 'IDENTITY_REVIEW_REQUIRED',
      companyId: null,
      reason: LITERAL_USDOT_UNRESOLVED_REASON,
    };
  }

  const similar = companies.filter((company) =>
    namesLookSimilar(staged.legalName, company.name ?? '')
  );
  if (similar.length) {
    return {
      disposition: 'IDENTITY_REVIEW_REQUIRED',
      companyId: null,
      reason: NAME_SIMILARITY_ONLY_REASON,
    };
  }

  return {
    disposition: 'NEW_CANONICAL_CANDIDATE',
    companyId: null,
    reason: NO_EXACT_USDOT_OR_MC_REASON,
  };
}
