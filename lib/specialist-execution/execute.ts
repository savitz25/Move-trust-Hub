import 'server-only';

import { authorityLabel, researchRole } from '@/lib/company/research-profile';
import { getLastDbDirectoryDiagnostics } from '@/lib/directory/query-db-directory-page';
import { queryDirectoryPage } from '@/lib/directory/query-directory-page';
import { directoryStateName, parseDirectoryResearchQuery } from '@/lib/directory/parse-directory-research-query';
import { extractStateCodeFromHeadquarters } from '@/lib/directory/coverage-filter';
import { resolveMoveNetworkIdentity } from '@/lib/search/network-resolver';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { Company, ServiceType } from '@/types';
import {
  MOVE_SPECIALIST_EXECUTION_CONTRACT,
  MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT,
  MOVE_SPECIALIST_EXECUTION_DEFAULT_LIMIT,
  MOVE_SPECIALIST_EXECUTION_MAX_LIMIT,
  MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT,
  MOVE_SPECIALIST_EXECUTION_VERSION,
  MoveSpecialistExecutionError,
  type MoveSpecialistExecutionRequest,
  type MoveSpecialistExecutionResponse,
  type MoveSpecialistPublicRow,
  type MoveSpecialistRole,
} from './contract';

const COMMON_LIMITATIONS = [
  'Only identities already eligible for the public MoveTrustHub directory are returned.',
  'Recorded headquarters is not service territory, route availability, pickup availability, or delivery availability.',
  'A broker may arrange transportation without physically hauling the shipment.',
  'Authority state is regulatory evidence, not approval, safety, quality, or a recommendation.',
  'Results use neutral source order. Ratings, reputation, paid, claimed, and subscription status do not affect ordering.',
];
const MOVE_SPECIALIST_EXECUTION_TIMEOUT_MS = 12_000;

function stateName(code: string): string {
  return directoryStateName(code) ?? code;
}

function boundedPage(value: unknown): number {
  const page = Number(value ?? 1);
  if (!Number.isInteger(page) || page < 1 || page > 10_000) {
    throw new MoveSpecialistExecutionError('INVALID_QUERY', 'page must be an integer between 1 and 10000', 400, false);
  }
  return page;
}

function boundedLimit(value: unknown): number {
  const limit = Number(value ?? MOVE_SPECIALIST_EXECUTION_DEFAULT_LIMIT);
  if (!Number.isInteger(limit) || limit < 1) {
    throw new MoveSpecialistExecutionError('INVALID_QUERY', 'limit must be a positive integer', 400, false);
  }
  return Math.min(limit, MOVE_SPECIALIST_EXECUTION_MAX_LIMIT);
}

export function validateMoveSpecialistRequest(input: MoveSpecialistExecutionRequest): MoveSpecialistExecutionRequest {
  if (!input || typeof input !== 'object') {
    throw new MoveSpecialistExecutionError('INVALID_QUERY', 'request must be an object', 400, false);
  }
  if (input.contract !== MOVE_SPECIALIST_EXECUTION_CONTRACT) {
    throw new MoveSpecialistExecutionError('INVALID_QUERY', `contract must be ${MOVE_SPECIALIST_EXECUTION_CONTRACT}`, 409, false);
  }
  if (!['cohort', 'identity', 'identifier', 'evidence'].includes(input.queryType)) {
    throw new MoveSpecialistExecutionError('INVALID_QUERY', 'unsupported queryType', 400, false);
  }
  if (!['mover', 'auto_transport'].includes(input.entityClass)) {
    throw new MoveSpecialistExecutionError('INVALID_QUERY', 'unsupported entityClass', 400, false);
  }
  if (input.role && !['Carrier', 'Broker', 'Carrier/Broker'].includes(input.role)) {
    throw new MoveSpecialistExecutionError('INVALID_QUERY', 'unsupported role', 400, false);
  }
  const geography = input.geography;
  if (geography) {
    if (!['RECORDED_HQ', 'SERVICE_TERRITORY', 'ROUTE_AVAILABILITY'].includes(geography.intent)) {
      throw new MoveSpecialistExecutionError('INVALID_QUERY', 'unsupported geography intent', 400, false);
    }
    if (geography.stateCode && !/^[A-Za-z]{2}$/.test(geography.stateCode)) {
      throw new MoveSpecialistExecutionError('INVALID_QUERY', 'stateCode must be a two-letter code', 400, false);
    }
  }
  if (input.queryType === 'identifier') {
    if (!input.identifier || !['USDOT', 'MC'].includes(input.identifier.type) || !/^\d{3,8}$/.test(input.identifier.value)) {
      throw new MoveSpecialistExecutionError('INVALID_QUERY', 'identifier must be a labeled USDOT or MC value', 400, false);
    }
  }
  if (input.queryType === 'identity' && (!input.identityName || input.identityName.trim().length < 2)) {
    throw new MoveSpecialistExecutionError('INVALID_QUERY', 'identityName must contain at least two characters', 400, false);
  }
  return {
    ...input,
    page: boundedPage(input.page),
    limit: boundedLimit(input.limit),
    role: input.role,
    geography: geography
      ? {
          ...geography,
          stateCode: geography.stateCode?.toUpperCase(),
          stateName: geography.stateCode
            ? geography.stateName?.trim() || stateName(geography.stateCode.toUpperCase())
            : geography.stateName?.trim(),
          city: geography.city?.trim().slice(0, 80),
          zip: geography.zip?.trim().slice(0, 10),
        }
      : undefined,
    identityName: input.identityName?.trim().slice(0, 200),
    requestedEvidence: input.requestedEvidence?.slice(0, 20).map((value) => String(value).slice(0, 80)),
    requestId: input.requestId?.slice(0, 80),
  };
}

export function requestFromNaturalQuery(raw: string, page = 1, limit = MOVE_SPECIALIST_EXECUTION_DEFAULT_LIMIT): MoveSpecialistExecutionRequest {
  const query = raw.trim().slice(0, 400);
  if (!query) throw new MoveSpecialistExecutionError('INVALID_QUERY', 'q is required', 400, false);
  const plan = parseDirectoryResearchQuery(query);
  if (plan.identifierQuery) {
    const match = plan.identifierQuery.match(/\b(USDOT|DOT|MC)\s*#?\s*(\d{3,8})\b/i);
    if (!match) throw new MoveSpecialistExecutionError('INVALID_QUERY', 'malformed regulatory identifier', 400, false);
    return {
      contract: MOVE_SPECIALIST_EXECUTION_CONTRACT,
      queryType: 'identifier',
      entityClass: 'mover',
      identifier: { type: match[1]!.toUpperCase() === 'MC' ? 'MC' : 'USDOT', value: match[2]! },
      page,
      limit,
    };
  }
  if (plan.researchMode) {
    const role = plan.role === 'Carrier / Broker' ? 'Carrier/Broker' : plan.role;
    const geographyIntent = plan.locationIntent === 'SERVICE_TERRITORY'
      ? 'SERVICE_TERRITORY'
      : plan.locationIntent === 'ROUTE_OR_AVAILABILITY'
        ? 'ROUTE_AVAILABILITY'
        : 'RECORDED_HQ';
    return {
      contract: MOVE_SPECIALIST_EXECUTION_CONTRACT,
      queryType: 'cohort',
      entityClass: plan.entityClass ?? (plan.evidenceClass ? 'auto_transport' : 'mover'),
      role,
      geography: plan.geography || plan.routeStates.length
        ? {
            stateCode: plan.geography?.stateCode ?? plan.routeStates.at(-1),
            stateName: plan.geography?.stateName ?? (plan.routeStates.at(-1) ? stateName(plan.routeStates.at(-1)!) : undefined),
            city: plan.geography?.city,
            intent: geographyIntent,
          }
        : { intent: geographyIntent },
      page,
      limit,
    };
  }
  return {
    contract: MOVE_SPECIALIST_EXECUTION_CONTRACT,
    queryType: 'identity',
    entityClass: 'mover',
    identityName: query,
    page,
    limit,
  };
}

function parsedHq(rawValue: string | null | undefined): MoveSpecialistPublicRow['recordedHq'] {
  const raw = rawValue?.trim() || null;
  if (!raw) return { raw: null, city: null, state: null, locationMeaning: 'RECORDED_HQ' };
  const state = extractStateCodeFromHeadquarters(raw);
  const city = raw.split(',')[0]?.trim() || null;
  return { raw, city, state, locationMeaning: 'RECORDED_HQ' };
}

function publicRole(company: Company): MoveSpecialistPublicRow['role'] {
  const role = researchRole(company);
  return role === 'Carrier / Broker' ? 'Carrier/Broker' : role;
}

function rowFromCompany(company: Company, autoTransport: boolean, stateCode?: string): MoveSpecialistPublicRow {
  const role = publicRole(company);
  const geographyReason = stateCode
    ? `The indexed FMCSA record lists ${stateCode} as the company's recorded headquarters/address state.`
    : 'The identity is in the current public MoveTrustHub directory cohort.';
  return {
    publicDisplayName: company.name,
    legalName: company.fmcsaLegalName?.trim() || null,
    canonicalSlug: company.slug,
    canonicalProfileUrl: `https://www.movetrusthub.com/companies/${encodeURIComponent(company.slug)}`,
    usdot: company.usdotNumber?.trim() || null,
    mc: company.mcNumber?.trim() || null,
    role,
    authorityState: authorityLabel(company),
    recordedHq: parsedHq(company.headquarters),
    sourceLastChecked: company.fmcsaLastChecked ?? null,
    autoTransportEvidence: autoTransport,
    whyMatched: autoTransport
      ? `${geographyReason} Its exact public USDOT is in the source-backed FMCSA Company Census Auto Transport cohort. This is not a recommendation.`
      : `${geographyReason} This is not service-territory evidence or a recommendation.`,
  };
}

function baseResponse(
  request: MoveSpecialistExecutionRequest,
  started: number,
  resultType: MoveSpecialistExecutionResponse['resultType'],
  overrides: Partial<MoveSpecialistExecutionResponse> = {},
): MoveSpecialistExecutionResponse {
  const page = request.page ?? 1;
  const limit = request.limit ?? MOVE_SPECIALIST_EXECUTION_DEFAULT_LIMIT;
  const geography = request.geography ?? null;
  const appliedFilters = [
    `entityClass=${request.entityClass}`,
    request.role ? `role=${request.role}` : '',
    geography?.stateCode && geography.intent === 'RECORDED_HQ' ? `recordedHqState=${geography.stateCode}` : '',
  ].filter(Boolean);
  return {
    contract: MOVE_SPECIALIST_EXECUTION_CONTRACT,
    contractVersion: MOVE_SPECIALIST_EXECUTION_VERSION,
    schemaFingerprint: MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT,
    contractFingerprint: MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT,
    queryInterpretation: {
      queryType: request.queryType,
      entityClass: request.entityClass,
      role: request.role ?? null,
      geography,
      appliedFilters,
    },
    resultType,
    rows: [],
    total: 0,
    pagination: { page, limit, returned: 0, total: 0, hasMore: false },
    availableRefinements: [
      { id: 'role', values: ['Carrier', 'Broker', 'Carrier/Broker'], meaning: 'FMCSA regulatory role; a broker may not physically haul the shipment.' },
      { id: 'recorded_hq_state', values: [], meaning: 'Recorded company headquarters/address state, not service territory.' },
      { id: 'authority_state', values: ['current', 'not_current', 'unknown'], meaning: 'Source-native regulatory evidence, not a recommendation.' },
      { id: 'evidence_class', values: ['auto_transport'], meaning: 'Exact USDOT intersection with FMCSA Company Census cargo evidence.' },
    ],
    provenance: {
      sourceFamily: request.entityClass === 'auto_transport'
        ? 'FMCSA Company Census cargo evidence + public MoveTrustHub directory identities'
        : 'FMCSA public MoveTrustHub directory identities',
      sourceContract: request.entityClass === 'auto_transport' ? 'move-dir-001' : 'move-dir-002',
      queryGrain: request.queryType === 'cohort' ? 'public mover identity cohort' : 'public mover identity',
      geographyMeaning: geography?.intent === 'RECORDED_HQ' && geography.stateCode
        ? `Recorded headquarters/address state = ${geography.stateCode}`
        : geography?.intent ?? 'Not geography-filtered',
      officialAsOf: null,
      generatedAt: new Date().toISOString(),
      publicationSemantics: 'Only identities eligible for the accepted public MoveTrustHub directory are returned.',
    },
    limitations: [...COMMON_LIMITATIONS],
    destinations: {
      research: 'https://www.movetrusthub.com/companies',
      verifyDot: 'https://www.movetrusthub.com/verify-dot',
      profiles: [],
    },
    diagnostics: {
      executionPath: 'none',
      elapsedMs: Date.now() - started,
      rowsFetched: 0,
      rowsReturned: 0,
      requestId: request.requestId,
    },
    ...overrides,
  };
}

function unsupportedResponse(request: MoveSpecialistExecutionRequest, started: number): MoveSpecialistExecutionResponse {
  const intent = request.geography?.intent;
  const limitation = intent === 'ROUTE_AVAILABILITY'
    ? 'MoveTrustHub does not currently have source-backed route, pickup, delivery, or live availability evidence.'
    : 'MoveTrustHub does not currently have source-backed service-territory evidence.';
  const state = request.geography?.stateCode;
  const research = state
    ? `https://www.movetrusthub.com/companies?search=${encodeURIComponent(`${request.entityClass === 'auto_transport' ? 'auto transport companies' : 'movers'} in ${stateName(state)}`)}`
    : 'https://www.movetrusthub.com/companies';
  return baseResponse(request, started, 'UNSUPPORTED_CAPABILITY', {
    limitations: [limitation, ...COMMON_LIMITATIONS],
    destinations: {
      research,
      verifyDot: 'https://www.movetrusthub.com/verify-dot',
      profiles: [],
    },
    diagnostics: {
      executionPath: 'fail-closed-service-geography',
      elapsedMs: Date.now() - started,
      rowsFetched: 0,
      rowsReturned: 0,
      requestId: request.requestId,
    },
  });
}

async function executeIdentity(request: MoveSpecialistExecutionRequest, started: number): Promise<MoveSpecialistExecutionResponse> {
  const query = request.queryType === 'identifier'
    ? `${request.identifier!.type} ${request.identifier!.value}`
    : request.identityName!;
  const resolved = await resolveMoveNetworkIdentity({
    query,
    contractVersion: 'move-network-resolver-v1',
    intentHint: request.queryType === 'identifier' ? 'identifier' : 'company_name',
    limit: request.limit,
    requestId: request.requestId,
  });
  const rows = resolved.results.map((row): MoveSpecialistPublicRow => ({
    publicDisplayName: row.publicDisplayName,
    legalName: row.legalName,
    canonicalSlug: row.canonicalSlug,
    canonicalProfileUrl: row.canonicalUrl,
    usdot: row.usdot,
    mc: row.mc,
    role: row.role,
    authorityState: row.authorityState,
    recordedHq: row.recordedHq,
    sourceLastChecked: row.sourceLastChecked,
    autoTransportEvidence: false,
    whyMatched: row.matchReason,
  }));
  const total = resolved.totalMatchingIdentityCount;
  const result = baseResponse(request, started, rows.length ? 'SUPPORTED_RESULTS' : 'ZERO_MATCHING_ROWS', {
    rows,
    total,
    pagination: {
      page: 1,
      limit: request.limit!,
      returned: rows.length,
      total,
      hasMore: total > rows.length,
    },
    provenance: {
      sourceFamily: 'FMCSA public MoveTrustHub Search V1 identities',
      sourceContract: 'move-network-resolver-v1',
      queryGrain: 'public mover identity resolution',
      geographyMeaning: 'Recorded headquarters is returned only as an identity fact; it is not service territory.',
      officialAsOf: resolved.sourceClock.latestObserved,
      generatedAt: new Date().toISOString(),
      publicationSemantics: 'Only identities eligible for public Move Search V1 are returned.',
    },
    destinations: {
      research: 'https://www.movetrusthub.com/companies',
      verifyDot: 'https://www.movetrusthub.com/verify-dot',
      profiles: rows.map((row) => row.canonicalProfileUrl),
    },
    diagnostics: {
      executionPath: 'move-network-resolver-v1',
      elapsedMs: Date.now() - started,
      rowsFetched: rows.length,
      rowsReturned: rows.length,
      requestId: request.requestId,
    },
  });
  result.queryInterpretation.identityResolutionClass = resolved.resolutionClass;
  return result;
}

export async function executeMoveSpecialist(raw: MoveSpecialistExecutionRequest): Promise<MoveSpecialistExecutionResponse> {
  const started = Date.now();
  const request = validateMoveSpecialistRequest(raw);
  if (request.queryType === 'identity' || request.queryType === 'identifier') {
    return executeIdentity(request, started);
  }
  if (request.queryType === 'evidence') {
    return baseResponse(request, started, 'UNSUPPORTED_CAPABILITY', {
      limitations: ['Evidence-family execution requires an exact identity or supported cohort filter.', ...COMMON_LIMITATIONS],
    });
  }
  if (request.geography && request.geography.intent !== 'RECORDED_HQ') {
    return unsupportedResponse(request, started);
  }
  if (!isSupabaseConfigured()) {
    throw new MoveSpecialistExecutionError('BACKEND_UNAVAILABLE', 'public directory research is temporarily unavailable', 503, true);
  }

  const page = request.page!;
  const limit = request.limit!;
  const offset = (page - 1) * limit;
  const services: ServiceType[] = [];
  if (request.entityClass === 'auto_transport') services.push('Auto Transport');
  if (request.role === 'Carrier/Broker') services.push('Carrier / Broker');
  else if (request.role) services.push(request.role);
  const stateCode = request.geography?.stateCode;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new MoveSpecialistExecutionError('TIMEOUT', 'specialist cohort execution timed out', 504, true)),
      MOVE_SPECIALIST_EXECUTION_TIMEOUT_MS,
    );
  });
  const result = await Promise.race([
    queryDirectoryPage({
      offset,
      limit,
      filters: {
        recordedHqState: stateCode ?? null,
        services,
        sort: 'relevance',
      },
    }),
    timeout,
  ]).finally(() => {
    if (timer) clearTimeout(timer);
  });
  const rows = result.companies.map((company) => rowFromCompany(company, request.entityClass === 'auto_transport', stateCode));
  if (stateCode && rows.some((row) => row.recordedHq.state !== stateCode)) {
    throw new MoveSpecialistExecutionError('BACKEND_UNAVAILABLE', 'recorded-headquarters filter returned an incompatible row', 503, true);
  }
  const diagnostic = getLastDbDirectoryDiagnostics();
  const latestClock = rows.map((row) => row.sourceLastChecked).filter((value): value is string => Boolean(value)).sort().at(-1) ?? null;
  const researchPhrase = `${request.entityClass === 'auto_transport' ? 'auto transport companies' : 'movers'}${stateCode ? ` in ${stateName(stateCode)}` : ''}`;
  const cityLimitation = request.geography?.city
    ? `${request.geography.city} was interpreted as context, but this contract applied only the supported ${stateCode} recorded-headquarters state filter.`
    : null;
  const zeroLimitation = rows.length === 0
    ? result.total > 0
      ? `The requested page is outside the ${result.total}-identity cohort; no rows were returned for this page.`
      : `No public ${request.entityClass === 'auto_transport' ? 'Auto Transport identities' : 'mover identities'} in the current source-backed cohort match the requested${request.role ? ` ${request.role} role and` : ''}${stateCode ? ` recorded ${stateCode} headquarters` : ''} filters. This does not mean none serve that area.`
    : null;
  return baseResponse(request, started, rows.length ? 'SUPPORTED_RESULTS' : 'ZERO_MATCHING_ROWS', {
    rows,
    total: result.total,
    pagination: { page, limit, returned: rows.length, total: result.total, hasMore: result.hasMore },
    provenance: {
      sourceFamily: request.entityClass === 'auto_transport'
        ? 'FMCSA Company Census cargo evidence + public MoveTrustHub directory identities'
        : 'FMCSA public MoveTrustHub directory identities',
      sourceContract: request.entityClass === 'auto_transport' ? 'move-dir-001 + move-dir-002' : 'move-dir-002',
      queryGrain: request.entityClass === 'auto_transport'
        ? 'source-backed Auto Transport public identity cohort'
        : 'public mover identity cohort',
      geographyMeaning: stateCode
        ? `Recorded headquarters/address state = ${stateCode}; headquarters is not service territory.`
        : 'Not geography-filtered',
      officialAsOf: latestClock,
      generatedAt: new Date().toISOString(),
      publicationSemantics: 'Only identities eligible for the accepted public MoveTrustHub directory are returned.',
    },
    limitations: [cityLimitation, zeroLimitation, ...COMMON_LIMITATIONS].filter((value): value is string => Boolean(value)),
    destinations: {
      research: `https://www.movetrusthub.com/companies?search=${encodeURIComponent(researchPhrase)}`,
      verifyDot: 'https://www.movetrusthub.com/verify-dot',
      profiles: rows.map((row) => row.canonicalProfileUrl),
    },
    diagnostics: {
      executionPath: diagnostic?.path ?? 'directory-query-engine',
      elapsedMs: Date.now() - started,
      rowsFetched: diagnostic?.rowsFetched ?? rows.length,
      rowsReturned: rows.length,
      requestId: request.requestId,
    },
  });
}
