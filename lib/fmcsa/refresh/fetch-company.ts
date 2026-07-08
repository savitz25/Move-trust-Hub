import {
  fetchFmcsaCarrierSnapshot,
  snapshotFromResolvedCarrier,
  fetchCarrierByDot,
} from '@/lib/fmcsa/refresh/fetch-carrier-core';
import { searchFmcsaCarrierByName } from '@/lib/fmcsa/refresh/name-search';
import { parseHeadquarters } from '@/lib/fmcsa/refresh/parse-headquarters';
import { FMCSA_REFRESH_CONFIG, sleep } from '@/lib/fmcsa/refresh/rate-limit';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';

export type FmcsaLookupMethod = 'dot' | 'name_search' | 'skipped_existing';

export type FmcsaNameMatchMeta = {
  query: string;
  matchedLegalName: string;
  matchedDbaName?: string;
  matchedDot: string;
  confidence: number;
  score: number;
  runnerUpScore: number | null;
  directoryCity?: string | null;
  directoryState?: string | null;
};

export type FmcsaCompanyFetchResult = {
  snapshot: FmcsaCarrierSnapshot | null;
  lookupMethod: FmcsaLookupMethod;
  nameMatch?: FmcsaNameMatchMeta;
  skippedReason?: string;
  error?: string;
};

function hasGoodExistingFmcsaData(params: {
  fmcsaLastChecked?: string | null;
  fmcsaRaw?: Record<string, unknown> | null;
}): boolean {
  if (!params.fmcsaLastChecked) return false;
  const raw = params.fmcsaRaw;
  if (!raw || typeof raw !== 'object') return false;
  return Boolean(String(raw.legalName ?? '').trim());
}

function attachLookupMeta(
  snapshot: FmcsaCarrierSnapshot,
  meta: FmcsaNameMatchMeta
): FmcsaCarrierSnapshot {
  return {
    ...snapshot,
    raw: {
      ...snapshot.raw,
      _lookupMeta: {
        method: 'name_search',
        ...meta,
        recoveredAt: new Date().toISOString(),
      },
    },
  };
}

async function snapshotFromNameMatch(
  match: FmcsaNameMatchMeta & { candidateCarrier: Record<string, unknown> },
  mcNumber?: string | null
): Promise<FmcsaCarrierSnapshot | null> {
  const webKey = process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey) return null;

  const dot = match.matchedDot;
  const fetched = await fetchCarrierByDot(dot, webKey);
  const carrier = fetched ?? (match.candidateCarrier as typeof fetched);

  if (!carrier?.legalName) return null;

  await sleep(FMCSA_REFRESH_CONFIG.requestDelayMs);

  const mcDigits =
    mcNumber?.replace(/\D/g, '') ||
    String(carrier.docketNumber ?? '').replace(/\D/g, '') ||
    undefined;

  const snapshot = await snapshotFromResolvedCarrier({
    carrier,
    dot,
    mcNumber: mcDigits || undefined,
    webKey,
  });

  if (!snapshot) return null;
  return attachLookupMeta(snapshot, match);
}

/**
 * Fetch FMCSA data for a directory company: USDOT first, then high-confidence name search.
 * Skips when existing FMCSA data is already good (won't overwrite on failed DOT).
 */
export async function fetchFmcsaCarrierForCompany(params: {
  usdot: string;
  mcNumber?: string | null;
  companyName: string;
  headquarters?: string | null;
  fmcsaLastChecked?: string | null;
  fmcsaRaw?: Record<string, unknown> | null;
}): Promise<FmcsaCompanyFetchResult> {
  const dot = params.usdot.replace(/\D/g, '');
  if (!dot) {
    return {
      snapshot: null,
      lookupMethod: 'dot',
      error: 'missing USDOT',
    };
  }

  const dotSnapshot = await fetchFmcsaCarrierSnapshot(dot, params.mcNumber);
  if (dotSnapshot?.legalName) {
    return { snapshot: dotSnapshot, lookupMethod: 'dot' };
  }

  if (hasGoodExistingFmcsaData(params)) {
    return {
      snapshot: null,
      lookupMethod: 'skipped_existing',
      skippedReason: 'USDOT lookup failed but existing FMCSA data preserved',
    };
  }

  const { city, state } = parseHeadquarters(params.headquarters);
  const nameMatch = await searchFmcsaCarrierByName({
    companyName: params.companyName,
    city,
    state,
    mcNumber: params.mcNumber,
  });

  if (!nameMatch) {
    return {
      snapshot: null,
      lookupMethod: 'dot',
      error: `FMCSA lookup failed for DOT ${dot} and no high-confidence name match`,
    };
  }

  const meta: FmcsaNameMatchMeta = {
    query: nameMatch.query,
    matchedLegalName: nameMatch.candidate.legalName,
    matchedDbaName: nameMatch.candidate.dbaName,
    matchedDot: nameMatch.candidate.dotNumber,
    confidence: nameMatch.confidence,
    score: nameMatch.score,
    runnerUpScore: nameMatch.runnerUpScore,
    directoryCity: city,
    directoryState: state,
  };

  console.log('[fmcsa-refresh] name search match', {
    company: params.companyName,
    query: meta.query,
    matchedDot: meta.matchedDot,
    matchedLegalName: meta.matchedLegalName,
    confidence: meta.confidence.toFixed(3),
    runnerUpScore: meta.runnerUpScore?.toFixed(3) ?? null,
    directoryState: meta.directoryState,
    directoryCity: meta.directoryCity,
  });

  const snapshot = await snapshotFromNameMatch(
    { ...meta, candidateCarrier: nameMatch.candidate.carrier },
    params.mcNumber
  );

  if (!snapshot) {
    return {
      snapshot: null,
      lookupMethod: 'name_search',
      nameMatch: meta,
      error: `Name match DOT ${meta.matchedDot} could not be enriched`,
    };
  }

  return {
    snapshot,
    lookupMethod: 'name_search',
    nameMatch: meta,
  };
}