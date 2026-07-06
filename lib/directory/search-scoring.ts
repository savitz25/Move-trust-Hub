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
export function scoreCompanySearch(company: Company, rawQuery: string): number {
  const query = rawQuery.trim();
  if (!query) return 1;

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
    if (parsed.type === 'DOT' && usdot === parsed.value) return 1200;
    if (parsed.type === 'MC' && mc === parsed.value) return 1200;
  }

  const queryDigits = digitsOnly(query);
  if (queryDigits.length >= 3) {
    if (digitsOnly(company.usdotNumber ?? '') === queryDigits) return 1100;
    if (digitsOnly(company.mcNumber ?? '') === queryDigits) return 1100;
  }

  if (!qNorm) return 0;

  if (name === qNorm) return 1000;
  if (name.startsWith(qNorm)) return 900;
  if (name.split(' ').some((word) => word.startsWith(qNorm))) return 820;

  const fuzzy = fuzzyNameScore(name, qNorm);
  if (fuzzy > 0) return fuzzy;

  if (name.includes(qNorm)) return 600;

  if (headquarters.includes(qNorm)) return 350;
  if (specialties.includes(qNorm)) return 320;
  if (description.includes(qNorm)) return 280;

  if (qNorm.length === 1 && name.startsWith(qNorm)) return 750;

  return 0;
}

export function compareSearchRelevance(a: Company, b: Company, query: string): number {
  return scoreCompanySearch(b, query) - scoreCompanySearch(a, query);
}