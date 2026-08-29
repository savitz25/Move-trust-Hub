import { digitsOnly, normalizeSearchText, searchTokens } from '@/lib/search/normalize';
import type { SearchMatchTier, SearchMatchType } from '@/lib/search/types';
import type { Company } from '@/types';

export type IdentityMatch = {
  type: SearchMatchType;
  tier: SearchMatchTier;
  explanation: string;
  score: number;
};

function legalName(company: Company): string {
  return company.fmcsaLegalName ?? '';
}

export function authorityStatusLabel(company: Company): string | null {
  if (company.authorityActive === true) return 'Current authority recorded';
  if (company.authorityActive === false) return 'Authority not current in this extract';
  return null;
}

export function roleLabel(company: Company): string {
  const entity = (company.entityType ?? '').trim();
  if (/carrier\s*\/\s*broker/i.test(entity) || entity.toLowerCase() === 'carrier/broker') {
    return 'Carrier-Broker';
  }
  if (/^broker$/i.test(entity)) return 'Broker';
  if (/^carrier$/i.test(entity)) return 'Carrier';
  const services = Array.isArray(company.services) ? company.services : [];
  if (services.includes('Carrier / Broker')) return 'Carrier-Broker';
  if (services.includes('Broker') && services.includes('Carrier')) return 'Carrier-Broker';
  if (services.includes('Broker')) return 'Broker';
  if (services.includes('Carrier')) return 'Carrier';
  if (services.includes('Local Mover')) return 'Local Mover';
  return entity || 'Mover';
}

export function explainMatch(type: SearchMatchType): string {
  switch (type) {
    case 'exact_usdot':
      return 'Exact USDOT match';
    case 'exact_mc':
      return 'Exact MC match';
    case 'exact_display_name':
      return 'Exact company-name match';
    case 'exact_legal_name':
      return 'Exact FMCSA legal-name match';
    case 'exact_alias':
      return 'Exact accepted alias match';
    case 'display_prefix':
      return 'Company-name prefix';
    case 'legal_prefix':
      return 'Legal-name prefix';
    case 'token_prefix':
      return 'Company-name token match';
    case 'similar_name':
      return 'Similar company name';
    case 'substring':
      return 'Partial company-name match';
    case 'headquarters_hint':
      return 'Headquarters identity hint';
    case 'local_research':
      return 'Local research match';
    default:
      return 'Identity match';
  }
}

function tokenPrefixHit(name: string, query: string): boolean {
  const qTokens = searchTokens(query);
  if (!qTokens.length) return false;
  const words = searchTokens(name);
  return qTokens.every((token) => words.some((word) => word.startsWith(token) || word === token));
}

function missingWordHit(name: string, query: string): boolean {
  const qTokens = searchTokens(query);
  const words = searchTokens(name);
  if (qTokens.length < 2 || words.length < 2) return false;
  return qTokens.every((token) => words.some((word) => word.startsWith(token) || word.includes(token)));
}

function similarHit(name: string, query: string): boolean {
  const q = normalizeSearchText(query);
  const n = normalizeSearchText(name);
  if (!q || !n || q.length < 4) return false;
  if (n.includes(q) || q.includes(n)) return true;
  const qTokens = searchTokens(query);
  const nTokens = searchTokens(name);
  let matched = 0;
  for (const token of qTokens) {
    if (nTokens.some((word) => word.startsWith(token.slice(0, Math.max(3, token.length - 1))) || levenshteinAtMost(word, token, 2))) {
      matched += 1;
    }
  }
  return matched === qTokens.length && qTokens.length >= 2;
}

function levenshteinAtMost(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  if (a === b) return true;
  const rows = a.length + 1;
  const cols = b.length + 1;
  const dp = Array.from({ length: rows }, () => new Array<number>(cols).fill(0));
  for (let i = 0; i < rows; i += 1) dp[i]![0] = i;
  for (let j = 0; j < cols; j += 1) dp[0]![j] = j;
  for (let i = 1; i < rows; i += 1) {
    let rowMin = dp[i]![0]!;
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i]![j] = Math.min(dp[i - 1]![j]! + 1, dp[i]![j - 1]! + 1, dp[i - 1]![j - 1]! + cost);
      rowMin = Math.min(rowMin, dp[i]![j]!);
    }
    if (rowMin > max) return false;
  }
  return dp[a.length]![b.length]! <= max;
}

export function matchCompanyIdentity(
  company: Company,
  query: string,
  options?: { identifierDigits?: string; namespace?: 'DOT' | 'MC' | 'BARE' | null; locationHint?: string | null }
): IdentityMatch | null {
  const qNorm = normalizeSearchText(query);
  const name = normalizeSearchText(company.name ?? '');
  const legal = normalizeSearchText(legalName(company));
  const usdot = digitsOnly(company.usdotNumber ?? '');
  const mc = digitsOnly(company.mcNumber ?? '');
  const digits = options?.identifierDigits || digitsOnly(query);
  const hq = normalizeSearchText(company.headquarters ?? '');

  if (options?.namespace === 'DOT' && digits && usdot === digits) {
    return { type: 'exact_usdot', tier: 1, explanation: explainMatch('exact_usdot'), score: 1200 };
  }
  if (options?.namespace === 'MC' && digits && mc === digits) {
    return { type: 'exact_mc', tier: 2, explanation: explainMatch('exact_mc'), score: 1190 };
  }
  if (options?.namespace === 'BARE' && digits) {
    if (usdot === digits) {
      return { type: 'exact_usdot', tier: 3, explanation: 'Exact USDOT match', score: 1180 };
    }
    if (mc === digits) {
      return { type: 'exact_mc', tier: 3, explanation: 'Exact MC match', score: 1170 };
    }
  }
  if (digits.length >= 3 && usdot === digits) {
    return { type: 'exact_usdot', tier: 3, explanation: explainMatch('exact_usdot'), score: 1160 };
  }
  if (digits.length >= 3 && mc === digits) {
    return { type: 'exact_mc', tier: 3, explanation: explainMatch('exact_mc'), score: 1150 };
  }

  if (!qNorm) return null;

  if (name === qNorm) {
    return { type: 'exact_display_name', tier: 4, explanation: explainMatch('exact_display_name'), score: 1000 };
  }
  if (legal && legal === qNorm) {
    return { type: 'exact_legal_name', tier: 5, explanation: explainMatch('exact_legal_name'), score: 990 };
  }
  if (name.startsWith(qNorm)) {
    return { type: 'display_prefix', tier: 7, explanation: explainMatch('display_prefix'), score: 900 };
  }
  if (legal && legal.startsWith(qNorm)) {
    return { type: 'legal_prefix', tier: 7, explanation: explainMatch('legal_prefix'), score: 890 };
  }
  if (tokenPrefixHit(company.name, query) || (legal && tokenPrefixHit(legalName(company), query))) {
    return { type: 'token_prefix', tier: 8, explanation: explainMatch('token_prefix'), score: 820 };
  }
  if (missingWordHit(company.name, query) || (legal && missingWordHit(legalName(company), query))) {
    return { type: 'token_prefix', tier: 8, explanation: 'Company-name token match', score: 780 };
  }
  if (similarHit(company.name, query) || (legal && similarHit(legalName(company), query))) {
    return { type: 'similar_name', tier: 9, explanation: explainMatch('similar_name'), score: 720 };
  }
  if (name.includes(qNorm) || (legal && legal.includes(qNorm))) {
    return { type: 'substring', tier: 10, explanation: explainMatch('substring'), score: 600 };
  }

  const hint = normalizeSearchText(options?.locationHint ?? '');
  if (hint && hq.includes(hint)) {
    return { type: 'headquarters_hint', tier: 10, explanation: explainMatch('headquarters_hint'), score: 350 };
  }
  return null;
}

export function compareIdentityCompanies(
  a: Company,
  b: Company,
  aMatch: IdentityMatch,
  bMatch: IdentityMatch,
  locationHint?: string | null
): number {
  if (aMatch.tier !== bMatch.tier) return aMatch.tier - bMatch.tier;
  if (bMatch.score !== aMatch.score) return bMatch.score - aMatch.score;

  const hint = normalizeSearchText(locationHint ?? '');
  if (hint) {
    const aHq = normalizeSearchText(a.headquarters ?? '').includes(hint) ? 1 : 0;
    const bHq = normalizeSearchText(b.headquarters ?? '').includes(hint) ? 1 : 0;
    if (aHq !== bHq) return bHq - aHq;
  }

  const nameCmp = normalizeSearchText(a.name).localeCompare(normalizeSearchText(b.name));
  if (nameCmp !== 0) return nameCmp;
  const legalCmp = normalizeSearchText(legalName(a)).localeCompare(normalizeSearchText(legalName(b)));
  if (legalCmp !== 0) return legalCmp;
  const hqCmp = normalizeSearchText(a.headquarters ?? '').localeCompare(normalizeSearchText(b.headquarters ?? ''));
  if (hqCmp !== 0) return hqCmp;
  const usdotCmp = digitsOnly(a.usdotNumber ?? '').localeCompare(digitsOnly(b.usdotNumber ?? ''));
  if (usdotCmp !== 0) return usdotCmp;
  return String(a.id).localeCompare(String(b.id));
}

export function uniqueExactIdentity(matches: Array<{ company: Company; match: IdentityMatch }>): Company | null {
  const exact = matches.filter((row) => row.match.tier <= 5);
  if (exact.length !== 1) return null;
  const tier = exact[0]!.match.tier;
  if (tier <= 3) return exact[0]!.company;
  const name = normalizeSearchText(exact[0]!.company.name);
  const sameName = matches.filter(
    (row) => row.match.tier <= 5 && normalizeSearchText(row.company.name) === name
  );
  if (sameName.length > 1) return null;
  return exact[0]!.company;
}
