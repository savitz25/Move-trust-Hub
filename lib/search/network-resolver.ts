import { createHash } from 'node:crypto';
import { logger } from '@/lib/logging/logger';
import { boundSearchQuery, normalizeSearchText } from '@/lib/search/normalize';
import { searchMovers } from '@/lib/search/query';
import type { MoverSearchResponse, SearchCompanyHit } from '@/lib/search/types';

export const MOVE_NETWORK_RESOLVER_VERSION = 'move-network-resolver-v1' as const;
export const MOVE_NETWORK_RESOLVER_ENDPOINT = 'https://www.movetrusthub.com/api/network/identity-resolver';
export const MOVE_NETWORK_RESOLVER_TIMEOUT_MS = 10_000;
export const MOVE_NETWORK_RESOLVER_MAX_LIMIT = 8;

const SCHEMA_CANON = JSON.stringify({
  request: ['query', 'contractVersion?', 'intentHint?', 'limit?', 'requestId?'],
  response: ['contractVersion', 'contractFingerprint', 'schemaFingerprint', 'query', 'normalizedQuery', 'resolutionClass', 'results', 'returnedResultCount', 'totalMatchingIdentityCount', 'duplicateNameCount', 'sourceClock', 'limitations', 'trace'],
  result: ['publicDisplayName', 'legalName', 'canonicalSlug', 'canonicalUrl', 'usdot', 'mc', 'role', 'authorityState', 'recordedHq', 'sourceLastChecked', 'matchClass', 'matchReason'],
});
export const MOVE_NETWORK_RESOLVER_SCHEMA_FINGERPRINT = createHash('sha256').update(SCHEMA_CANON).digest('hex');
export const MOVE_NETWORK_RESOLVER_CONTRACT_FINGERPRINT = createHash('sha256').update(`${MOVE_NETWORK_RESOLVER_VERSION}:${MOVE_NETWORK_RESOLVER_SCHEMA_FINGERPRINT}`).digest('hex');

export type MoveNetworkResolutionClass = 'EXACT_IDENTIFIER' | 'EXACT_CANONICAL_NAME' | 'EXACT_PUBLIC_NAME' | 'NORMALIZED_NAME' | 'AMBIGUOUS_NAME' | 'FUZZY_CANDIDATES' | 'NO_CONFIDENT_MATCH';
export type MoveNetworkIntentHint = 'identifier' | 'company_name';
export type MoveNetworkResolverRequest = { query: string; contractVersion?: string; intentHint?: MoveNetworkIntentHint; limit?: number; requestId?: string };
export type MoveNetworkRole = 'Carrier' | 'Broker' | 'Carrier/Broker' | 'Unknown';

export type MoveNetworkIdentity = {
  publicDisplayName: string; legalName: string | null; canonicalSlug: string; canonicalUrl: string;
  usdot: string | null; mc: string | null; role: MoveNetworkRole; authorityState: string | null;
  recordedHq: { raw: string | null; city: string | null; state: string | null; locationMeaning: 'RECORDED_HQ' };
  sourceLastChecked: string | null; matchClass: string; matchReason: string;
};

export type MoveNetworkResolverResponse = {
  contractVersion: typeof MOVE_NETWORK_RESOLVER_VERSION; contractFingerprint: string; schemaFingerprint: string;
  query: string; normalizedQuery: string; resolutionClass: MoveNetworkResolutionClass; results: MoveNetworkIdentity[];
  returnedResultCount: number; totalMatchingIdentityCount: number; duplicateNameCount: number;
  sourceClock: { kind: 'FMCSA_LAST_CHECKED'; latestObserved: string | null; meaning: string };
  limitations: string[];
  trace: { sourceContract: 'move-search-v1'; resolverLatencyMs: number; fallbackPath: 'none'; requestId?: string };
};

export type MoveNetworkResolverErrorCode = 'INVALID_QUERY' | 'CONTRACT_VERSION_ERROR' | 'BACKEND_UNAVAILABLE' | 'TIMEOUT';
export class MoveNetworkResolverError extends Error {
  constructor(public code: MoveNetworkResolverErrorCode, message: string, public status: number, public retryable: boolean) { super(message); }
}

const LIMITATIONS = [
  'Only identities already eligible for public Search V1 are returned.',
  'Recorded headquarters is not service territory.',
  'A broker is not necessarily the company that transports the shipment.',
  'Authority state is regulatory evidence, not approval, safety, quality, or a recommendation.',
  'Missing source freshness does not imply inactive or unauthorized.',
];

export function validateMoveNetworkRequest(input: MoveNetworkResolverRequest): MoveNetworkResolverRequest {
  if (input.contractVersion && input.contractVersion !== MOVE_NETWORK_RESOLVER_VERSION) {
    throw new MoveNetworkResolverError('CONTRACT_VERSION_ERROR', `unsupported contract version; expected ${MOVE_NETWORK_RESOLVER_VERSION}`, 409, false);
  }
  if (typeof input.query !== 'string') throw new MoveNetworkResolverError('INVALID_QUERY', 'query must be a string', 400, false);
  const query = boundSearchQuery(input.query);
  if (query.length < 2) throw new MoveNetworkResolverError('INVALID_QUERY', 'query must contain at least two characters', 400, false);
  if (/^(?:USDOT|DOT|MC)\b/i.test(query) && !/^(?:(?:USDOT|DOT)[-\s]?\d{3,8}|MC[-\s]?\d{3,8})$/i.test(query)) {
    throw new MoveNetworkResolverError('INVALID_QUERY', 'malformed regulatory identifier', 400, false);
  }
  if (input.intentHint && !['identifier', 'company_name'].includes(input.intentHint)) throw new MoveNetworkResolverError('INVALID_QUERY', 'unsupported intentHint', 400, false);
  if (input.limit !== undefined && !Number.isFinite(input.limit)) throw new MoveNetworkResolverError('INVALID_QUERY', 'limit must be a finite number', 400, false);
  return { query, contractVersion: MOVE_NETWORK_RESOLVER_VERSION, intentHint: input.intentHint, limit: Math.min(Math.max(Math.trunc(input.limit ?? MOVE_NETWORK_RESOLVER_MAX_LIMIT), 1), MOVE_NETWORK_RESOLVER_MAX_LIMIT), requestId: input.requestId?.slice(0, 80) };
}

function publicRole(value: string): MoveNetworkRole {
  if (value === 'Carrier-Broker' || value === 'Carrier / Broker') return 'Carrier/Broker';
  if (value === 'Carrier' || value === 'Broker') return value;
  return 'Unknown';
}

function recordedHq(rawValue: string): MoveNetworkIdentity['recordedHq'] {
  const raw = rawValue.trim() || null;
  if (!raw) return { raw: null, city: null, state: null, locationMeaning: 'RECORDED_HQ' };
  const parts = raw.split(',').map((v) => v.trim()).filter(Boolean);
  const possibleState = parts.at(-1)?.match(/^([A-Z]{2})(?:\s+\d{5}(?:-\d{4})?)?$/i)?.[1]?.toUpperCase() ?? null;
  return { raw, city: parts.length > 1 ? parts.slice(0, -1).join(', ') : raw, state: possibleState, locationMeaning: 'RECORDED_HQ' };
}

function toPublicIdentity(hit: SearchCompanyHit): MoveNetworkIdentity {
  return { publicDisplayName: hit.displayName, legalName: hit.legalName, canonicalSlug: hit.slug, canonicalUrl: `https://www.movetrusthub.com/companies/${encodeURIComponent(hit.slug)}`, usdot: hit.usdot || null, mc: hit.mc || null, role: publicRole(hit.role), authorityState: hit.authorityStatus, recordedHq: recordedHq(hit.headquarters), sourceLastChecked: hit.sourceLastChecked ?? null, matchClass: hit.matchType, matchReason: hit.matchExplanation };
}

function resolutionClass(result: MoverSearchResponse): MoveNetworkResolutionClass {
  const first = result.results[0];
  if (!first) return 'NO_CONFIDENT_MATCH';
  if (result.exactNameGroupSize > 1 || (result.ambiguity && first.matchTier <= 5)) return 'AMBIGUOUS_NAME';
  if (['exact_usdot', 'exact_mc'].includes(first.matchType)) return 'EXACT_IDENTIFIER';
  if (first.matchType === 'exact_legal_name') return normalizeSearchText(result.query) === normalizeSearchText(first.legalName ?? '') && result.query.trim().toLowerCase() === (first.legalName ?? '').trim().toLowerCase() ? 'EXACT_CANONICAL_NAME' : 'NORMALIZED_NAME';
  if (first.matchType === 'exact_display_name') return result.query.trim().toLowerCase() === first.displayName.trim().toLowerCase() ? 'EXACT_PUBLIC_NAME' : 'NORMALIZED_NAME';
  return 'FUZZY_CANDIDATES';
}

export function buildMoveNetworkResolverResponse(request: MoveNetworkResolverRequest, search: MoverSearchResponse, elapsedMs = search.latencyMs): MoveNetworkResolverResponse {
  if (search.searchPath === 'none') throw new MoveNetworkResolverError('BACKEND_UNAVAILABLE', 'canonical Search V1 resolver is unavailable', 503, true);
  const klass = resolutionClass(search);
  const results = klass === 'NO_CONFIDENT_MATCH' ? [] : search.results.map(toPublicIdentity);
  const clocks = results.map((r) => r.sourceLastChecked).filter((v): v is string => Boolean(v)).sort();
  return {
    contractVersion: MOVE_NETWORK_RESOLVER_VERSION, contractFingerprint: MOVE_NETWORK_RESOLVER_CONTRACT_FINGERPRINT, schemaFingerprint: MOVE_NETWORK_RESOLVER_SCHEMA_FINGERPRINT,
    query: search.query, normalizedQuery: normalizeSearchText(search.query), resolutionClass: klass, results,
    returnedResultCount: results.length,
    totalMatchingIdentityCount: klass === 'AMBIGUOUS_NAME' ? Math.max(search.exactNameGroupSize, search.resultCount) : search.resultCount,
    duplicateNameCount: search.exactNameGroupSize,
    sourceClock: { kind: 'FMCSA_LAST_CHECKED', latestObserved: clocks.at(-1) ?? null, meaning: 'Latest FMCSA last-checked value among returned identities; missing does not imply inactive.' },
    limitations: LIMITATIONS,
    trace: { sourceContract: 'move-search-v1', resolverLatencyMs: elapsedMs, fallbackPath: 'none', requestId: request.requestId },
  };
}

export async function resolveMoveNetworkIdentity(raw: MoveNetworkResolverRequest): Promise<MoveNetworkResolverResponse> {
  const request = validateMoveNetworkRequest(raw);
  const started = Date.now();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new MoveNetworkResolverError('TIMEOUT', 'canonical resolver timed out', 504, true)), MOVE_NETWORK_RESOLVER_TIMEOUT_MS); });
  const search = await Promise.race([searchMovers(request.query, { limit: request.limit }), timeout]).finally(() => { if (timer) clearTimeout(timer); });
  const response = buildMoveNetworkResolverResponse(request, search, Date.now() - started);
  logger.info('network.identity_resolver', { resolutionClass: response.resolutionClass, resultCount: response.returnedResultCount, duplicateNameCount: response.duplicateNameCount, latencyMs: response.trace.resolverLatencyMs, queryLength: response.query.length, searchPath: search.searchPath });
  return response;
}
