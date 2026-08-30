/** move-ask-v1 — structured MoveTrustHub Ask contract. */

export const MOVE_ASK_CONTRACT = 'move-ask-v1' as const;
export const MOVE_ASK_ROUTE = 'https://www.movetrusthub.com/ask';
export const MOVE_ASK_API = 'https://www.movetrusthub.com/api/ask';
export const MOVE_ASK_PAGE_SIZE = 20;

export const MOVE_ASK_CAPABILITY = {
  contract: MOVE_ASK_CONTRACT,
  askStatus: 'live' as const,
  federatedExecution: 'execute' as const,
  askUrl: MOVE_ASK_ROUTE,
  apiUrl: MOVE_ASK_API,
  supportedModes: [
    'entity',
    'identifier',
    'count',
    'aggregate',
    'comparison',
    'evidence',
    'definition',
    'fail_closed',
  ] as const,
  identifiers: ['labeled_usdot', 'labeled_mc'] as const,
  regulatoryRoles: ['carrier', 'broker', 'carrier_broker'] as const,
  geographySemantics:
    'recorded company address / headquarters state ≠ service territory ≠ Florida Intrastate Mover registration',
  floridaCapability:
    'FDACS IM registrations are a registration grain. FMCSA interstate authority is a separate federal grain. Overlap only when a VERIFIED company_id link exists.',
  limitations: [
    'A broker is not the carrier that necessarily transports household goods.',
    'Florida IM registration is not federal interstate household-goods authority.',
    'Headquarters is not service territory.',
    'Active authority is not a recommendation.',
    'Complaint observations are not confirmed wrongdoing.',
    'Missing evidence is not inactive, unauthorized, fraudulent, or clean.',
    'Ask does not rank movers or estimate prices.',
  ],
};

export type MoveAskMode =
  | 'entity'
  | 'identifier'
  | 'count'
  | 'aggregate'
  | 'comparison'
  | 'evidence'
  | 'definition'
  | 'fail_closed';

export type MoveRegulatoryRole = 'carrier' | 'broker' | 'carrier_broker';

export type MoveGeographyMeaning =
  | 'recorded_headquarters_state'
  | 'florida_im_registration'
  | 'service_territory_unsupported';

export type MoveResearchQuery = {
  mode: MoveAskMode;
  role?: MoveRegulatoryRole;
  includeDualRole: boolean;
  identifier?: { type: 'usdot' | 'mc'; value: string };
  jurisdiction?: { state: string; meaning: MoveGeographyMeaning };
  compareJurisdiction?: { state: string; meaning: MoveGeographyMeaning };
  authorityCurrent?: boolean | 'not_current' | 'any';
  floridaIm?: boolean;
  overlapFmcsaFdacs?: boolean;
  nameQuery?: string;
  evidenceFamily?: 'complaint' | 'authority';
  page: number;
  definitionId?: string;
  failReason?: string;
  alternatives?: string[];
  aggregateMetric?: 'entity_count' | 'florida_im_active' | 'role_split';
};

export type InterpretationLine = { label: string; value: string };

export type ParsedMoveAsk = {
  raw: string;
  query: MoveResearchQuery;
  interpretation: InterpretationLine[];
};

export const ASK_DEFINITIONS: Record<string, { title: string; body: string }> = {
  usdot: {
    title: 'USDOT number',
    body: 'A USDOT number is a federal identity assigned by FMCSA. It identifies a company in federal motor-carrier records. It is not an endorsement, a safety rating, or proof of household-goods authority by itself.',
  },
  mc: {
    title: 'MC number',
    body: 'An MC number is an operating-authority docket identifier in FMCSA records. It is not the same as a USDOT number and is not a quality ranking.',
  },
  hhg_carrier: {
    title: 'Household-goods motor carrier',
    body: 'A household-goods motor carrier is authorized to transport household goods under its own operating authority. Carrier identity is not a recommendation and is not the same as a broker.',
  },
  broker: {
    title: 'Moving broker',
    body: 'A broker arranges transportation. A broker is not necessarily the company that physically hauls the shipment. Broker is not worse than carrier.',
  },
  interstate_authority: {
    title: 'Interstate operating authority',
    body: 'Interstate operating authority is a federal FMCSA record. FMCSA stores Common, Contract, and Broker authority separately with source-native statuses such as Active, Inactive, or None. Current authority is not “safe,” “trusted,” or recommended. Missing authority text is not a finding of unauthorized operation.',
  },
  florida_im: {
    title: 'Florida Intrastate Mover registration',
    body: 'A Florida Intrastate Mover (IM) registration is an FDACS state registration. It is not federal interstate household-goods authority and is not headquarters geography or service territory.',
  },
  carrier_vs_broker: {
    title: 'Carrier vs broker',
    body: 'A carrier transports household goods under its own authority. A broker arranges transportation and may not haul the load. Some companies hold both roles. Dual role is not a recommendation. Who will actually move belongings cannot be inferred from broker identity alone.',
  },
  usdot_status: {
    title: 'USDOT status',
    body: 'USDOT / authority status is the source-native FMCSA record as stored. Missing status is not inactive, unauthorized, or fraudulent. Current authority is not a MoveTrustHub endorsement.',
  },
};
