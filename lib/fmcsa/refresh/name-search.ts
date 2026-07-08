import { normalizePlace } from '@/lib/fmcsa/refresh/parse-headquarters';
import { FMCSA_REFRESH_CONFIG, sleep } from '@/lib/fmcsa/refresh/rate-limit';

export type FmcsaNameSearchCandidate = {
  dotNumber: string;
  legalName: string;
  dbaName?: string;
  phyCity?: string;
  phyState?: string;
  mcNumber?: string;
  carrier: Record<string, unknown>;
};

export type FmcsaNameMatchResult = {
  query: string;
  candidate: FmcsaNameSearchCandidate;
  confidence: number;
  score: number;
  runnerUpScore: number | null;
};

const CORPORATE_STOP_WORDS = new Set([
  'llc',
  'inc',
  'corp',
  'corporation',
  'co',
  'company',
  'ltd',
  'limited',
  'the',
  'and',
]);

function normalizeCompanyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function nameTokens(name: string): string[] {
  return normalizeCompanyName(name)
    .split(' ')
    .filter((t) => t.length > 1 && !CORPORATE_STOP_WORDS.has(t));
}

function jaccardSimilarity(a: string, b: string): number {
  const ta = new Set(nameTokens(a));
  const tb = new Set(nameTokens(b));
  if (!ta.size || !tb.size) return 0;
  let intersection = 0;
  for (const token of ta) {
    if (tb.has(token)) intersection++;
  }
  const union = new Set([...ta, ...tb]).size;
  return intersection / union;
}

function containsSimilarity(companyName: string, carrierName: string): number {
  const a = normalizeCompanyName(companyName);
  const b = normalizeCompanyName(carrierName);
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.92;
  return 0;
}

function scoreNameAgainstCarrier(companyName: string, legalName?: string, dbaName?: string): number {
  const scores = [legalName, dbaName]
    .filter(Boolean)
    .map((name) =>
      Math.max(
        jaccardSimilarity(companyName, name!),
        containsSimilarity(companyName, name!)
      )
    );
  return scores.length ? Math.max(...scores) : 0;
}

/** Strip franchise city suffixes for cleaner FMCSA name queries. */
export function buildNameSearchQueries(companyName: string): string[] {
  const trimmed = companyName.trim();
  if (!trimmed) return [];

  const queries = new Set<string>();
  queries.add(trimmed);

  const withoutLocation = trimmed
    .replace(/\s[-–—]\s+[A-Za-z][A-Za-z\s.]+$/u, '')
    .replace(
      /\s+(Birmingham|Memphis|Nashville|Knoxville|Detroit|Jackson|Monroe|Charlotte|Fresno|Gainesville|Savannah|Kalamazoo|Lansing|Augusta|Greensboro)\s*$/iu,
      ''
    )
    .trim();

  if (withoutLocation && withoutLocation !== trimmed) {
    queries.add(withoutLocation);
  }

  const tokens = nameTokens(trimmed);
  if (tokens.length >= 4) {
    queries.add(tokens.slice(0, 4).join(' '));
  }

  return [...queries].filter(Boolean);
}

function baseNameScore(
  companyName: string,
  candidate: FmcsaNameSearchCandidate
): number {
  return scoreNameAgainstCarrier(
    companyName,
    candidate.legalName,
    candidate.dbaName
  );
}

function scoreCandidate(params: {
  companyName: string;
  candidate: FmcsaNameSearchCandidate;
  city?: string | null;
  state?: string | null;
  mcNumber?: string | null;
}): { total: number; base: number } {
  const { candidate, companyName, city, state, mcNumber } = params;
  const base = baseNameScore(companyName, candidate);
  let total = base;

  if (
    state &&
    candidate.phyState &&
    state.toUpperCase() === candidate.phyState.toUpperCase()
  ) {
    total += 0.18;
  }

  if (city && candidate.phyCity) {
    const want = normalizePlace(city);
    const got = normalizePlace(candidate.phyCity);
    if (want && got && (want === got || got.includes(want) || want.includes(got))) {
      total += 0.12;
    }
  }

  const mcDigits = mcNumber?.replace(/\D/g, '') ?? '';
  const candidateMc = candidate.mcNumber?.replace(/\D/g, '') ?? '';
  if (mcDigits && candidateMc && mcDigits === candidateMc) {
    total += 0.2;
  }

  return { total, base };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fetchNameSearchPage(
  query: string,
  webKey: string,
  start: number,
  size: number
): Promise<FmcsaNameSearchCandidate[]> {
  const base = 'https://mobile.fmcsa.dot.gov/qc/services/carriers/name';
  const url = `${base}/${encodeURIComponent(query)}?webKey=${encodeURIComponent(webKey)}&start=${start}&size=${size}`;
  const json = await fetchJson<{
    content?: Array<{ carrier?: Record<string, unknown> }>;
  }>(url);

  const rows = json?.content ?? [];
  const candidates: FmcsaNameSearchCandidate[] = [];

  for (const row of rows) {
    const carrier = row.carrier;
    if (!carrier || typeof carrier !== 'object') continue;
    const legalName = String(carrier.legalName ?? '').trim();
    if (!legalName) continue;
    const dot = String(carrier.dotNumber ?? '').replace(/\D/g, '');
    if (!dot) continue;

    candidates.push({
      dotNumber: dot,
      legalName,
      dbaName: carrier.dbaName ? String(carrier.dbaName) : undefined,
      phyCity: carrier.phyCity ? String(carrier.phyCity) : undefined,
      phyState: carrier.phyState ? String(carrier.phyState) : undefined,
      mcNumber: carrier.docketNumber ? String(carrier.docketNumber) : undefined,
      carrier: carrier as Record<string, unknown>,
    });
  }

  return candidates;
}

async function collectCandidatesForQuery(
  query: string,
  webKey: string
): Promise<FmcsaNameSearchCandidate[]> {
  const seen = new Set<string>();
  const all: FmcsaNameSearchCandidate[] = [];
  const pageSize = FMCSA_REFRESH_CONFIG.nameSearchPageSize;
  const maxPages = FMCSA_REFRESH_CONFIG.nameSearchMaxPages;

  for (let page = 0; page < maxPages; page++) {
    const start = page * pageSize;
    const pageResults = await fetchNameSearchPage(query, webKey, start, pageSize);
    await sleep(FMCSA_REFRESH_CONFIG.requestDelayMs);

    if (!pageResults.length) break;

    for (const candidate of pageResults) {
      if (seen.has(candidate.dotNumber)) continue;
      seen.add(candidate.dotNumber);
      all.push(candidate);
    }

    if (pageResults.length < pageSize) break;
  }

  return all;
}

export function pickBestNameMatch(params: {
  companyName: string;
  candidates: FmcsaNameSearchCandidate[];
  city?: string | null;
  state?: string | null;
  mcNumber?: string | null;
}): { candidate: FmcsaNameSearchCandidate; confidence: number; score: number; runnerUpScore: number | null } | null {
  if (!params.candidates.length) return null;

  const scored = params.candidates
    .map((candidate) => {
      const { total, base } = scoreCandidate({ ...params, candidate });
      return { candidate, score: total, base };
    })
    .sort((a, b) => b.score - a.score || b.base - a.base);

  const best = scored[0]!;
  const runnerUp = scored[1];
  const runnerUpScore = runnerUp?.score ?? null;

  const minConfidence = FMCSA_REFRESH_CONFIG.nameSearchMinConfidence;
  const minGap = FMCSA_REFRESH_CONFIG.nameSearchMinGap;
  const minBaseName = 0.55;

  if (best.base < minBaseName) return null;
  if (best.score < minConfidence) return null;
  if (runnerUpScore !== null && best.score - runnerUpScore < minGap) return null;

  return {
    candidate: best.candidate,
    confidence: Math.min(best.score, 1),
    score: best.score,
    runnerUpScore,
  };
}

/** Search FMCSA by company name with pagination and fuzzy match selection. */
export async function searchFmcsaCarrierByName(params: {
  companyName: string;
  city?: string | null;
  state?: string | null;
  mcNumber?: string | null;
  webKey?: string;
}): Promise<FmcsaNameMatchResult | null> {
  const webKey = params.webKey?.trim() || process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey || !params.companyName.trim()) return null;

  const queries = buildNameSearchQueries(params.companyName);

  for (const query of queries) {
    const candidates = await collectCandidatesForQuery(query, webKey);
    const picked = pickBestNameMatch({
      companyName: params.companyName,
      candidates,
      city: params.city,
      state: params.state,
      mcNumber: params.mcNumber,
    });

    if (picked) {
      return {
        query,
        candidate: picked.candidate,
        confidence: picked.confidence,
        score: picked.score,
        runnerUpScore: picked.runnerUpScore,
      };
    }
  }

  return null;
}

export type VerifyDotNameCandidate = {
  dotNumber: string;
  mcNumber: string | null;
  legalName: string;
  dbaName: string | null;
  city: string | null;
  state: string | null;
  relevanceScore: number;
};

/**
 * Return FMCSA carriers matching company name within a required state (for verify-dot picker).
 * Does not auto-pick — caller shows all matches above minimum relevance.
 */
export async function searchFmcsaCarriersByNameAndStateForVerify(params: {
  companyName: string;
  state: string;
  limit?: number;
  minBaseRelevance?: number;
}): Promise<VerifyDotNameCandidate[]> {
  const webKey = process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey || !params.companyName.trim()) return [];

  const state = params.state.trim().toUpperCase();
  if (!state) return [];

  const limit = params.limit ?? 25;
  const minBase = params.minBaseRelevance ?? 0.35;
  const seen = new Set<string>();
  const merged: FmcsaNameSearchCandidate[] = [];

  for (const query of buildNameSearchQueries(params.companyName)) {
    const batch = await collectCandidatesForQuery(query, webKey);
    for (const candidate of batch) {
      if (seen.has(candidate.dotNumber)) continue;
      if ((candidate.phyState ?? '').toUpperCase() !== state) continue;
      seen.add(candidate.dotNumber);
      merged.push(candidate);
    }
  }

  const scored = merged
    .map((candidate) => {
      const { total, base } = scoreCandidate({
        companyName: params.companyName,
        candidate,
        state,
      });
      return { candidate, total, base };
    })
    .filter((row) => row.base >= minBase)
    .sort((a, b) => b.total - a.total || b.base - a.base)
    .slice(0, limit);

  return scored.map(({ candidate, total }) => {
    const mcDigits = candidate.mcNumber?.replace(/\D/g, '') ?? '';
    return {
      dotNumber: candidate.dotNumber,
      mcNumber: mcDigits || null,
      legalName: candidate.legalName,
      dbaName: candidate.dbaName ?? null,
      city: candidate.phyCity ?? null,
      state: candidate.phyState ?? null,
      relevanceScore: Math.round(total * 100) / 100,
    };
  });
}