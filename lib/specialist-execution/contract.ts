import { createHash } from 'node:crypto';

export const MOVE_SPECIALIST_EXECUTION_CONTRACT = 'trusthub-specialist-execution-v2' as const;
export const MOVE_SPECIALIST_EXECUTION_VERSION = 'trusthub-specialist-execution-v2' as const;
export const MOVE_SPECIALIST_EXECUTION_ROUTE = '/api/specialist-execution/v2' as const;
export const MOVE_SPECIALIST_EXECUTION_MAX_LIMIT = 50;
export const MOVE_SPECIALIST_EXECUTION_DEFAULT_LIMIT = 20;

const SCHEMA_CANON = JSON.stringify({
  request: [
    'contract', 'queryType', 'entityClass', 'role?', 'geography?', 'identifier?',
    'identityName?', 'page?', 'limit?', 'requestedEvidence?', 'requestId?',
  ],
  response: [
    'contract', 'contractVersion', 'schemaFingerprint', 'contractFingerprint',
    'queryInterpretation', 'resultType', 'rows', 'total', 'pagination',
    'availableRefinements', 'provenance', 'limitations', 'destinations', 'diagnostics',
  ],
  row: [
    'publicDisplayName', 'legalName', 'canonicalSlug', 'canonicalProfileUrl',
    'usdot', 'mc', 'role', 'authorityState', 'recordedHq', 'sourceLastChecked',
    'autoTransportEvidence', 'whyMatched',
  ],
});

export const MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT = createHash('sha256')
  .update(SCHEMA_CANON)
  .digest('hex');
export const MOVE_SPECIALIST_EXECUTION_CONTRACT_FINGERPRINT = createHash('sha256')
  .update(`${MOVE_SPECIALIST_EXECUTION_VERSION}:${MOVE_SPECIALIST_EXECUTION_SCHEMA_FINGERPRINT}`)
  .digest('hex');

export type MoveSpecialistQueryType = 'cohort' | 'identity' | 'identifier' | 'evidence';
export type MoveSpecialistEntityClass = 'mover' | 'auto_transport';
export type MoveSpecialistRole = 'Carrier' | 'Broker' | 'Carrier/Broker';
export type MoveSpecialistGeographyIntent = 'RECORDED_HQ' | 'SERVICE_TERRITORY' | 'ROUTE_AVAILABILITY';
export type MoveSpecialistResultType =
  | 'SUPPORTED_RESULTS'
  | 'ZERO_MATCHING_ROWS'
  | 'UNSUPPORTED_CAPABILITY'
  | 'INVALID_QUERY'
  | 'BACKEND_UNAVAILABLE'
  | 'TIMEOUT';

export type MoveSpecialistExecutionRequest = {
  contract: typeof MOVE_SPECIALIST_EXECUTION_CONTRACT;
  queryType: MoveSpecialistQueryType;
  entityClass: MoveSpecialistEntityClass;
  role?: MoveSpecialistRole;
  geography?: {
    stateCode?: string;
    stateName?: string;
    city?: string;
    zip?: string;
    intent: MoveSpecialistGeographyIntent;
  };
  identifier?: { type: 'USDOT' | 'MC'; value: string };
  identityName?: string;
  page?: number;
  limit?: number;
  requestedEvidence?: string[];
  requestId?: string;
};

export type MoveSpecialistPublicRow = {
  publicDisplayName: string;
  legalName: string | null;
  canonicalSlug: string;
  canonicalProfileUrl: string;
  usdot: string | null;
  mc: string | null;
  role: 'Carrier' | 'Broker' | 'Carrier/Broker' | 'Unknown';
  authorityState: string | null;
  recordedHq: {
    raw: string | null;
    city: string | null;
    state: string | null;
    locationMeaning: 'RECORDED_HQ';
  };
  sourceLastChecked: string | null;
  autoTransportEvidence: boolean;
  whyMatched: string;
};

export type MoveSpecialistExecutionResponse = {
  contract: typeof MOVE_SPECIALIST_EXECUTION_CONTRACT;
  contractVersion: typeof MOVE_SPECIALIST_EXECUTION_VERSION;
  schemaFingerprint: string;
  contractFingerprint: string;
  queryInterpretation: {
    queryType: MoveSpecialistQueryType;
    entityClass: MoveSpecialistEntityClass;
    role: MoveSpecialistRole | null;
    geography: MoveSpecialistExecutionRequest['geography'] | null;
    identityResolutionClass?: string;
    appliedFilters: string[];
  };
  resultType: MoveSpecialistResultType;
  rows: MoveSpecialistPublicRow[];
  total: number;
  pagination: { page: number; limit: number; returned: number; total: number; hasMore: boolean };
  availableRefinements: Array<{ id: string; values: string[]; meaning: string }>;
  provenance: {
    sourceFamily: string;
    sourceContract: string;
    queryGrain: string;
    geographyMeaning: string;
    officialAsOf: string | null;
    generatedAt: string;
    publicationSemantics: string;
  };
  limitations: string[];
  destinations: {
    research: string;
    verifyDot: string;
    profiles: string[];
  };
  diagnostics: {
    executionPath: string;
    elapsedMs: number;
    rowsFetched: number;
    rowsReturned: number;
    requestId?: string;
  };
};

export class MoveSpecialistExecutionError extends Error {
  constructor(
    public code: Exclude<MoveSpecialistResultType, 'SUPPORTED_RESULTS' | 'ZERO_MATCHING_ROWS' | 'UNSUPPORTED_CAPABILITY'>,
    message: string,
    public status: number,
    public retryable: boolean,
  ) {
    super(message);
  }
}
