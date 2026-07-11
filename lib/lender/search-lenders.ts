import type { Lender, LoanType } from '@/lib/lender/mockData';
import { getCountyFromZip } from '@/lib/lender/lenders';

export type LenderPopularFilter = 'near-me' | 'fha' | 'top-rated';

export interface LenderSearchFilters {
  search?: string;
  popularFilters?: LenderPopularFilter[];
  zip?: string;
}

const LOAN_TYPE_ALIASES: Record<string, LoanType> = {
  conventional: 'Conventional',
  fha: 'FHA',
  va: 'VA',
  usda: 'USDA',
  jumbo: 'Jumbo',
  arm: 'ARM',
  adjustable: 'ARM',
  refinance: 'Refinance',
  refi: 'Refinance',
};

const KEYWORD_LOAN_HINTS: Record<string, LoanType> = {
  veterans: 'VA',
  veteran: 'VA',
  military: 'VA',
};

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function fuzzyTokenScore(haystack: string, query: string): number {
  const tokens = normalizeText(query).split(' ').filter(Boolean);
  if (!tokens.length) return 0;

  let cursor = 0;
  let matched = 0;

  for (const token of tokens) {
    const index = haystack.indexOf(token, cursor);
    if (index === -1) {
      const wordHit = haystack.split(' ').some((word) => word.startsWith(token) || word.includes(token));
      if (!wordHit) return 0;
      matched += 1;
      continue;
    }
    matched += 1;
    cursor = index + token.length;
  }

  return matched === tokens.length ? 100 + matched * 12 : 0;
}

function detectLoanTypesFromQuery(query: string): LoanType[] {
  const normalized = normalizeText(query);
  const tokens = normalized.split(' ').filter(Boolean);
  const found = new Set<LoanType>();

  for (const token of tokens) {
    const alias = LOAN_TYPE_ALIASES[token];
    if (alias) found.add(alias);
    const hint = KEYWORD_LOAN_HINTS[token];
    if (hint) found.add(hint);
  }

  return Array.from(found);
}

function queryImpliesLoanType(query: string): LoanType | null {
  const qNorm = normalizeText(query);
  const tokens = qNorm.split(' ').filter(Boolean);
  for (const token of tokens) {
    if (LOAN_TYPE_ALIASES[token]) return LOAN_TYPE_ALIASES[token];
    if (KEYWORD_LOAN_HINTS[token]) return KEYWORD_LOAN_HINTS[token];
  }
  return null;
}

/** Relevance score for lender text search. Returns 0 when excluded. */
export function scoreLenderSearch(lender: Lender, rawQuery: string): number {
  const query = rawQuery.trim();
  if (!query) return 1;

  const qNorm = normalizeText(query);
  const impliedLoanType = queryImpliesLoanType(query);
  if (impliedLoanType && !lender.loanTypes.includes(impliedLoanType)) return 0;
  const name = normalizeText(lender.name);
  const city = normalizeText(lender.city);
  const state = normalizeText(lender.state);
  const county = normalizeText(lender.county);
  const stateSlug = normalizeText(lender.stateSlug.replace(/-/g, ' '));
  const countySlug = normalizeText(lender.countySlug.replace(/-/g, ' '));
  const description = normalizeText(lender.shortDescription);
  const loanTypes = lender.loanTypes.map((t) => normalizeText(t)).join(' ');
  const specialties = lender.specialties.map((s) => normalizeText(s)).join(' ');
  const nmls = lender.nmlsId.replace(/\D/g, '');
  const queryDigits = query.replace(/\D/g, '');

  if (queryDigits.length >= 4 && nmls === queryDigits) return 1200;
  if (name === qNorm) return 1000;
  if (name.startsWith(qNorm)) return 900;
  if (name.includes(qNorm)) return 800;

  const locationBlob = `${city} ${state} ${county} ${stateSlug} ${countySlug}`;
  if (locationBlob.includes(qNorm)) return 700;

  const fuzzy = fuzzyTokenScore(name, query);
  if (fuzzy > 0) return fuzzy;

  if (loanTypes.includes(qNorm)) return 500;
  if (specialties.includes(qNorm)) return 450;
  if (description.includes(qNorm)) return 350;

  const loanHints = detectLoanTypesFromQuery(query);
  if (loanHints.some((type) => lender.loanTypes.includes(type))) return 320;

  if (qNorm.includes('local') && (city || county)) return 280;
  if ((qNorm.includes('rate') || qNorm.includes('rates')) && lender.trustScore >= 80) return 260;
  if ((qNorm.includes('veteran') || qNorm.includes('military')) && lender.loanTypes.includes('VA')) {
    return 400;
  }

  const tokenHits = qNorm
    .split(' ')
    .filter(Boolean)
    .filter((token) => {
      if (LOAN_TYPE_ALIASES[token] || KEYWORD_LOAN_HINTS[token]) {
        const loanType = LOAN_TYPE_ALIASES[token] ?? KEYWORD_LOAN_HINTS[token];
        return lender.loanTypes.includes(loanType);
      }
      if (token.length <= 2) return false;
      return (
        name.includes(token) ||
        city.includes(token) ||
        state.includes(token) ||
        county.includes(token) ||
        loanTypes.includes(token) ||
        specialties.includes(token) ||
        description.includes(token)
      );
    }).length;

  return tokenHits > 0 ? 80 + tokenHits * 25 : 0;
}

function applyZipFilter(lenders: Lender[], zip: string): Lender[] {
  const trimmed = zip.trim();
  if (!/^\d{5}$/.test(trimmed)) return lenders;

  const county = getCountyFromZip(trimmed);
  if (county) {
    return lenders.filter(
      (l) => l.stateSlug === county.stateSlug && l.countySlug === county.countySlug
    );
  }

  return lenders.filter((l) => l.zipCodes.includes(trimmed));
}

function applyPopularFilters(lenders: Lender[], filters: LenderPopularFilter[]): Lender[] {
  let result = lenders;

  if (filters.includes('fha')) {
    result = result.filter((l) => l.loanTypes.includes('FHA'));
  }

  if (filters.includes('top-rated')) {
    result = result.filter((l) => l.rating >= 4.5 || l.trustScore >= 85);
  }

  return result;
}

function sortLenders(lenders: Lender[], hasSearch: boolean): Lender[] {
  return [...lenders].sort((a, b) => {
    if (hasSearch) {
      const ratingDiff = b.rating - a.rating;
      if (ratingDiff !== 0) return ratingDiff;
    }
    const countyDiff = b.countyExperienceScore - a.countyExperienceScore;
    if (countyDiff !== 0) return countyDiff;
    return b.trustScore - a.trustScore;
  });
}

/** Pure client-safe lender search — no async or enrichment imports. */
export function searchLenders(lenders: Lender[], filters: LenderSearchFilters): Lender[] {
  let result = [...lenders];
  const searchQuery = filters.search?.trim() ?? '';
  const popularFilters = filters.popularFilters ?? [];

  if (popularFilters.includes('near-me') && filters.zip) {
    result = applyZipFilter(result, filters.zip);
  }

  result = applyPopularFilters(result, popularFilters);

  if (searchQuery.length > 0) {
    result = result
      .map((lender) => ({
        lender,
        score: scoreLenderSearch(lender, searchQuery),
      }))
      .filter((row) => row.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const countyDiff = b.lender.countyExperienceScore - a.lender.countyExperienceScore;
        if (countyDiff !== 0) return countyDiff;
        return b.lender.trustScore - a.lender.trustScore;
      })
      .map((row) => row.lender);
  } else {
    result = sortLenders(result, false);
  }

  return result;
}

export function parsePopularFilters(raw: string | null): LenderPopularFilter[] {
  if (!raw) return [];
  const allowed = new Set<LenderPopularFilter>(['near-me', 'fha', 'top-rated']);
  return raw
    .split(',')
    .map((part) => part.trim().toLowerCase())
    .filter((part): part is LenderPopularFilter => allowed.has(part as LenderPopularFilter));
}

export function serializePopularFilters(filters: LenderPopularFilter[]): string | null {
  const unique = Array.from(new Set(filters));
  return unique.length > 0 ? unique.join(',') : null;
}