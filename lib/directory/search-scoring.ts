import type { DirectorySearchScope } from '@/lib/directory/search-scope';
import { companyMatchesSearchScope } from '@/lib/directory/search-scope';
import type { Company } from '@/types';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/** Token-order fuzzy match: every query word appears in the name in order. */
function fuzzyNameScore(name: string, query: string): number {
  const tokens = normalizeText(query).split(' ').filter(Boolean);
  if (!tokens.length) return 0;

  let cursor = 0;
  let matched = 0;

  for (const token of tokens) {
    const index = name.indexOf(token, cursor);
    if (index === -1) {
      const wordHit = name.split(' ').some((word) => word.startsWith(token) || word.includes(token));
      if (!wordHit) return 0;
      matched += 1;
      continue;
    }
    matched += 1;
    cursor = index + token.length;
  }

  return matched === tokens.length ? 120 + matched * 15 : 0;
}

/**
 * Relevance score for directory search. Higher = better match.
 * Returns 0 when the company should be excluded.
 */
function scopeBoost(company: Company, scope?: DirectorySearchScope): number {
  if (!scope) return 0;
  let boost = 0;
  const id = company.id || company.slug;
  if (scope.preferredMoverIds?.includes(id)) boost += 120;
  if (companyMatchesSearchScope(company, scope)) boost += 60;
  return boost;
}

export function scoreCompanySearch(
  company: Company,
  rawQuery: string,
  scope?: DirectorySearchScope
): number {
  const query = rawQuery.trim();
  if (!query) return 1 + scopeBoost(company, scope);

  const qNorm = normalizeText(query);
  const name = normalizeText(company.name ?? '');
  const description = normalizeText(company.shortDescription ?? '');
  const headquarters = normalizeText(company.headquarters ?? '');
  const specialties = (Array.isArray(company.specialties) ? company.specialties : [])
    .map((s) => normalizeText(String(s)))
    .join(' ');

  const parsed = parseCarrierNumber(query);
  if (parsed) {
    const usdot = digitsOnly(company.usdotNumber ?? '');
    const mc = digitsOnly(company.mcNumber ?? '');
    if (parsed.type === 'DOT' && usdot === parsed.value) return 1200 + scopeBoost(company, scope);
    if (parsed.type === 'MC' && mc === parsed.value) return 1200 + scopeBoost(company, scope);
  }

  const queryDigits = digitsOnly(query);
  if (queryDigits.length >= 3) {
    if (digitsOnly(company.usdotNumber ?? '') === queryDigits) return 1100 + scopeBoost(company, scope);
    if (digitsOnly(company.mcNumber ?? '') === queryDigits) return 1100 + scopeBoost(company, scope);
  }

  if (!qNorm) return 0;

  const boost = scopeBoost(company, scope);

  if (name === qNorm) return 1000 + boost;
  if (name.startsWith(qNorm)) return 900 + boost;
  if (name.split(' ').some((word) => word.startsWith(qNorm))) return 820 + boost;

  const fuzzy = fuzzyNameScore(name, qNorm);
  if (fuzzy > 0) return fuzzy + boost;

  if (name.includes(qNorm)) return 600 + boost;

  if (headquarters.includes(qNorm)) return 350 + boost;
  if (specialties.includes(qNorm)) return 320 + boost;
  if (description.includes(qNorm)) return 280 + boost;

  if (qNorm.length === 1 && name.startsWith(qNorm)) return 750;

  const boosted = scopeBoost(company, scope);
  return boosted > 0 ? boosted : 0;
}

export function compareSearchRelevance(a: Company, b: Company, query: string): number {
  return scoreCompanySearch(b, query) - scoreCompanySearch(a, query);
}