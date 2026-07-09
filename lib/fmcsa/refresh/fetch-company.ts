import {
  fetchFmcsaCarrierSnapshot,
  lookupCarrierByDot,
  snapshotFromResolvedCarrier,
} from '@/lib/fmcsa/refresh/fetch-carrier-core';
import { INACTIVE_DOT_NO_MATCH_REASON } from '@/lib/fmcsa/refresh/inactive-dot';
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
  /** Batch refresh: delete company when inactive DOT has no confident name match. */
  removeCandidate?: boolean;
  removalReason?: string;
  inactiveDot?: string;
  inactiveSaferMessage?: string | null;
  dotCorrected?: boolean;
  previousDot?: string;
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
  meta: FmcsaNameMatchMeta,
  extra?: Record<string, unknown>
): FmcsaCarrierSnapshot {
  return {
    ...snapshot,
    raw: {
      ...snapshot.raw,
      _lookupMeta: {
        method: 'name_search',
        ...meta,
        recoveredAt: new Date().toISOString(),
        ...extra,
      },
    },
  };
}

async function snapshotFromNameMatch(
  match: FmcsaNameMatchMeta & { candidateCarrier: Record<string, unknown> },
  mcNumber?: string | null,
  extraMeta?: Record<string, unknown>
): Promise<FmcsaCarrierSnapshot | null> {
  const webKey = process.env.FMCSA_WEB_KEY?.trim();
  if (!webKey) return null;

  const dot = match.matchedDot;
  const lookup = await lookupCarrierByDot(dot, webKey);
  const carrier = lookup.carrier ?? (match.candidateCarrier as typeof lookup.carrier);

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
  return attachLookupMeta(snapshot, match, extraMeta);
}

async function tryNameSearchFallback(params: {
  companyName: string;
  headquarters?: string | null;
  mcNumber?: string | null;
  previousDot: string;
  inactiveSaferMessage?: string | null;
}): Promise<FmcsaCompanyFetchResult> {
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
      inactiveDot: params.previousDot,
      inactiveSaferMessage: params.inactiveSaferMessage,
      removeCandidate: true,
      removalReason: INACTIVE_DOT_NO_MATCH_REASON,
      error: `${INACTIVE_DOT_NO_MATCH_REASON} (USDOT ${params.previousDot})`,
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

  console.log('[fmcsa-refresh] inactive DOT name search match', {
    company: params.companyName,
    previousDot: params.previousDot,
    query: meta.query,
    matchedDot: meta.matchedDot,
    matchedLegalName: meta.matchedLegalName,
    confidence: meta.confidence.toFixed(3),
  });

  const snapshot = await snapshotFromNameMatch(
    { ...meta, candidateCarrier: nameMatch.candidate.carrier },
    params.mcNumber,
    {
      previousDot: params.previousDot,
      inactiveSaferMessage: params.inactiveSaferMessage,
      dotCorrected: meta.matchedDot !== params.previousDot,
    }
  );

  if (!snapshot) {
    return {
      snapshot: null,
      lookupMethod: 'name_search',
      nameMatch: meta,
      inactiveDot: params.previousDot,
      removeCandidate: true,
      removalReason: INACTIVE_DOT_NO_MATCH_REASON,
      error: `Name match DOT ${meta.matchedDot} could not be enriched`,
    };
  }

  return {
    snapshot,
    lookupMethod: 'name_search',
    nameMatch: meta,
    inactiveDot: params.previousDot,
    inactiveSaferMessage: params.inactiveSaferMessage,
    dotCorrected: meta.matchedDot !== params.previousDot,
    previousDot: params.previousDot,
  };
}

/**
 * Fetch FMCSA data for a directory company: USDOT first, then high-confidence name search.
 * Batch mode: inactive SAFER DOT triggers name search; removes when no confident match.
 */
export async function fetchFmcsaCarrierForCompany(params: {
  usdot: string;
  mcNumber?: string | null;
  companyName: string;
  headquarters?: string | null;
  fmcsaLastChecked?: string | null;
  fmcsaRaw?: Record<string, unknown> | null;
  /** Enables inactive DOT → name search → remove-if-no-match during batch refresh. */
  batchMode?: boolean;
}): Promise<FmcsaCompanyFetchResult> {
  const dot = params.usdot.replace(/\D/g, '');
  if (!dot) {
    return {
      snapshot: null,
      lookupMethod: 'dot',
      error: 'missing USDOT',
    };
  }

  const webKey = process.env.FMCSA_WEB_KEY?.trim();

  if (params.batchMode && webKey) {
    const lookup = await lookupCarrierByDot(dot, webKey);
    if (lookup.inactiveInSafer) {
      return tryNameSearchFallback({
        companyName: params.companyName,
        headquarters: params.headquarters,
        mcNumber: params.mcNumber,
        previousDot: dot,
        inactiveSaferMessage: lookup.saferMessage,
      });
    }

    if (lookup.carrier?.legalName) {
      const mcDigits =
        params.mcNumber?.replace(/\D/g, '') ||
        String(lookup.carrier.docketNumber ?? '').replace(/\D/g, '') ||
        undefined;
      const snapshot = await snapshotFromResolvedCarrier({
        carrier: lookup.carrier,
        dot,
        mcNumber: mcDigits || undefined,
        webKey,
      });
      if (snapshot?.legalName) {
        return { snapshot, lookupMethod: 'dot' };
      }
    }
  }

  const dotSnapshot = await fetchFmcsaCarrierSnapshot(dot, params.mcNumber);
  if (dotSnapshot?.legalName) {
    return { snapshot: dotSnapshot, lookupMethod: 'dot' };
  }

  if (hasGoodExistingFmcsaData(params) && !params.batchMode) {
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
    dotCorrected: meta.matchedDot !== dot,
    previousDot: dot,
  };
}