/**
 * move-network-metrics-v1
 * Specialist-owned public metric contract. Grains never mix.
 * Missing / unacquired universes stay UNKNOWN — never numeric zero.
 */

export const MOVE_NETWORK_METRICS_VERSION = 'move-network-metrics-v1' as const;

export type MetricValueState =
  | 'KNOWN'
  | 'UNKNOWN'
  | 'NOT_ACQUIRED'
  | 'PARTIAL'
  | 'REQUEST_ONLY';

export type MetricGrain =
  | 'directory_profile'
  | 'indexable_directory_profile'
  | 'directory_profile_authority_active'
  | 'federal_usdot_identity'
  | 'federal_mc_identity'
  | 'directory_profile_authority_not_current'
  | 'directory_profile_authority_unknown'
  | 'directory_profile_carrier'
  | 'directory_profile_broker'
  | 'directory_profile_carrier_broker'
  | 'directory_profile_unknown_role'
  | 'fdacs_intrastate_mover_registration'
  | 'fdacs_intrastate_mover_registration_active'
  | 'fdacs_moving_broker_registration_active'
  | 'fdacs_im_verified_link'
  | 'florida_hq_publishable_profile'
  | 'public_contact_observation'
  | 'nj_pmw_authority_roster'
  | 'nj_operation_safe_move_nov'
  | 'nj_hq_publishable_profile'
  | 'ca_cal_t_household_mover_permit'
  | 'bhgs_bpc_19237_citation_row'
  | 'bhgs_bpc_19237_unlicensed_row'
  | 'bhgs_bpc_19237_exact_cal_t_row'
  | 'ca_hq_publishable_profile'
  | 'txdmv_household_goods_certificate_roster'
  | 'utc_active_household_goods_directory_result'
  | 'utc_household_goods_bulk_roster'
  | 'co_puc_hhg_active_permit_listing'
  | 'co_puc_hhg_revoked_status_observation'
  | 'co_puc_hhg_suspended_status_observation'
  | 'va_dmv_hhg_certificate_listing'
  | 'va_dmv_property_carrier_permit_listing'
  | 'published_state_intelligence_page'
  | 'florida_research_county_landing'
  | 'local_movers_state_landing';

export type PublicationStatus =
  | 'PUBLIC'
  | 'PUBLIC_PARTIAL'
  | 'PUBLIC_UNKNOWN'
  | 'INTERNAL'
  | 'REJECTED';

export type MetricTrace = {
  counts: string;
  doesNotCount: string;
  contributingSourceSystems: string[];
  geographicCoverage: string;
  currentActiveRule?: string;
  sourceDates: string;
  generationDate: string;
  whyUnknown?: string;
};

export type MoveNetworkMetric = {
  key: string;
  label: string;
  value: number | null;
  valueState: MetricValueState;
  unit: 'count';
  grain: MetricGrain;
  denominator: string;
  description: string;
  coverage: string;
  contributingSourceSystems: string[];
  sourceAsOf: string | null;
  generatedAt: string;
  publicationStatus: PublicationStatus;
  trace: MetricTrace;
};

export type MoveNetworkMetricsV1 = {
  schemaVersion: typeof MOVE_NETWORK_METRICS_VERSION;
  generatedAt: string;
  newestDocumentedSourceAsOf: string | null;
  newestDocumentedSourceAsOfNote: string;
  sourceFingerprint: string;
  federalDirectory: {
    publishableProfiles: number;
    indexableProfiles: number;
    authorityActive: number;
    authorityNotCurrent: number;
    authorityUnknown: number;
    carriers: number;
    brokers: number;
    dual: number;
    unknownEntityClass: number;
    withMcNumber: number;
    cohortRule: string;
    indexableRule: string;
  };
  florida: {
    imRegistrations: number;
    imActive: number;
    mbActive: number;
    imVerifiedLinks: number;
    hqPublishable: number;
    contactObservations: number;
  };
  newJersey: {
    rosterCoverage: 'SOURCE_AVAILABLE_BY_REQUEST';
    statewideMoverUniverse: null;
    osmNovsAcquired: number;
    hqPublishable: number;
  };
  california: {
    calTRosterCoverage: 'OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED';
    licensedMoverUniverse: null;
    citationRows19237: number;
    unlicensedCitationRows: number;
    exactCalTCitationRows: number;
    hqPublishable: number;
    tariffEffective: string;
  };
  texas: {
    rosterCoverage: 'OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED';
    currentCertificateUniverse: null;
    complaintBulkCoverage: 'SOURCE_NOT_ACQUIRED';
    statewideExactCrosswalkCoverage: 'SOURCE_NOT_ACQUIRED';
  };
  washington: {
    activeDirectoryResults: number;
    activeDirectoryRetrievedAt: string;
    bulkRosterCoverage: 'SOURCE_NOT_ACQUIRED';
    historicalMoverUniverse: null;
  };
  colorado: {
    activeHhgPermitListings: number;
    revokedHhgListings: number;
    suspendedHhgListings: number;
    sourceAsOf: string;
  };
  virginia: {
    hhgListingRows: number;
    propertyListingRows: number;
    retrievedAt: string;
    sourceAsOf: null;
  };
  newYork: {
    currentHhgRosterCoverage: 'OPEN_SEARCH_ONLY';
    bulletinIssues: number;
    hhgBulletinObservations: number;
  };
  network: {
    publishedStateIntelligencePages: number;
    publishedStateIntelligencePaths: string[];
    floridaResearchCountyLandings: number;
    localMoverStateLandings: number;
  };
  homeProjection: {
    publishableProfiles: number;
    entityClasses: Array<{ class: 'Carrier' | 'Broker' | 'Carrier/Broker' | 'Unknown'; count: number }>;
    authority: { active: number; notCurrent: number; unknown: number; total: number };
    fmcsaClock: {
      latestObservedRefresh: string;
      oldestObservedRefresh: string;
      withRefreshDate: number;
      withoutRefreshDate: number;
      total: number;
      buckets: Array<{
        id: '0-30' | '31-60' | '61-90' | '91-365' | '>365' | 'unknown';
        label: string;
        count: number;
      }>;
    };
  };
  metrics: MoveNetworkMetric[];
};

export function metricByKey(m: MoveNetworkMetricsV1, key: string): MoveNetworkMetric {
  const found = m.metrics.find((row) => row.key === key);
  if (!found) throw new Error(`metric missing: ${key}`);
  return found;
}
