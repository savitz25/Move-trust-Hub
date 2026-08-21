/**
 * Task 011D.2B — local publication canary preparation types.
 * publish=false. Google Places requests: 0.
 */

export const GOOGLE_PLACES_REQUESTS = 0 as const;
export const TASK_011D2B = '011D.2B' as const;
export const LOCAL_CANARY_WAVE_ID = 'LOCAL_HHG_FL_WA_2026_08_CANARY_1' as const;

export const CANARY_TARGETS = { FL: 50, WA: 30, total: 80 } as const;

export const FUTURE_PUBLICATION_PLAN = {
  publish: false as const,
  futureTask: '011D.3',
  futureInitialPublicationState: 'PUBLISHABLE' as const,
  futureInitialIndexable: false as const,
  robots: 'noindex, follow' as const,
  sitemapExcluded: true as const,
  waveId: LOCAL_CANARY_WAVE_ID,
} as const;

/** Safe future consumer copy — not wired to production UI in 011D.2B. */
export const FUTURE_CANARY_COPY = {
  homeCounty: {
    locationLine: 'Based in {countyName}',
    authorityFl:
      'Registration verified with the Florida Department of Agriculture and Consumer Services.',
    authorityWa:
      'Household-goods carrier authority verified with the Washington Utilities and Transportation Commission.',
    roleFl: 'Florida intrastate mover',
    roleWa: 'Washington household-goods mover',
    cta: 'Confirm pickup availability for your exact address.',
  },
  explicitService: {
    line: 'Provider identifies {countyName} as a service area.',
  },
  federalAbsent:
    'Federal interstate household-goods authority is not shown for this profile unless independently verified.',
  forbidden: [
    'Guaranteed service',
    'Covers entire county',
    'Serves nearby counties',
    '40-mile service radius',
    'Available statewide',
    'NOT AUTHORIZED', // blanket — must not alarm for state-only when consumer is same-state
  ],
} as const;

export type PublicationReadyProvider = {
  companyId: string;
  slug: string;
  stateCode: 'FL' | 'WA';
  legalName: string;
  displayName: string;
  dba: string | null;
  authorityNumber: string;
  authorityType: string;
  authorityStatus: string;
  regulator: string;
  authoritySource: string;
  authoritySourceUrl: string | null;
  authorityRetrievedAt: string;
  usdot: string | null;
  homeCountyFips: string;
  homeCountyName: string | null;
  discoveryBasis: 'VERIFIED_HOME_COUNTY';
  explicitServiceCounties: Array<{ fips: string; name: string | null }>;
  phone: string | null;
  email: string | null;
  website: string | null;
  physicalAddress: string | null;
  publicationState: 'INGESTED';
  indexable: false;
  hasUsdot: boolean;
  hasDba: boolean;
  nameLength: number;
};

export type CanaryManifestRecord = PublicationReadyProvider & {
  selectionRank: number;
  selectionReason: string;
  currentPublicationState: 'INGESTED';
  targetPublicationState: 'PUBLISHABLE';
  currentIndexable: false;
  targetIndexable: false;
  waveId: typeof LOCAL_CANARY_WAVE_ID;
  publish: false;
  futureTask: '011D.3';
  futureInitialPublicationState: 'PUBLISHABLE';
  futureInitialIndexable: false;
  profileRole: 'state_only_local_mover' | 'dual_state_and_federal';
  copyPreview: {
    roleLine: string;
    authorityLine: string;
    locationLine: string;
    cta: string;
  };
};
