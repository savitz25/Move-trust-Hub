import { createHash } from 'node:crypto';
import type { MoveNetworkMetric, MoveNetworkMetricsV1 } from './move-network-metrics-v1';
import { MOVE_NETWORK_METRICS_VERSION } from './move-network-metrics-v1';

export type MoveNetworkMetricsInput = {
  generatedAt: string;
  publishableProfiles: number;
  indexableProfiles: number;
  authorityActive: number;
  authorityNotCurrent: number;
  authorityUnknown: number;
  carriers: number;
  brokers: number;
  dual: number;
  withMcNumber: number;
  withRefreshDate: number;
  withoutRefreshDate: number;
  latestObservedRefresh: string;
  oldestObservedRefresh: string;
  freshnessBuckets: MoveNetworkMetricsV1['homeProjection']['fmcsaClock']['buckets'];
  flImRegistrations: number;
  flImActive: number;
  flMbActive: number;
  flImVerifiedLinks: number;
  flHqPublishable: number;
  flContactObservations: number;
  flSourceAsOf: string;
  njRosterCoverage: 'SOURCE_AVAILABLE_BY_REQUEST';
  njOsmNovsAcquired: number;
  njHqPublishable: number;
  njSourceAsOf: string;
  caCalTRosterCoverage: 'OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED';
  caCitationRows19237: number;
  caUnlicensedCitationRows: number;
  caExactCalTCitationRows: number;
  caHqPublishable: number;
  caSourceAsOf: string;
  caTariffEffective: string;
  publishedStateIntelligencePaths: string[];
  floridaResearchCountyLandings: number;
  localMoverStateLandings: number;
};

function metric(
  partial: Omit<MoveNetworkMetric, 'unit'> & { generatedAt: string }
): MoveNetworkMetric {
  return { unit: 'count', ...partial };
}

export function assertGrainSafety(input: MoveNetworkMetricsInput): void {
  const unknownEntity = input.publishableProfiles - input.carriers - input.brokers - input.dual;
  if (unknownEntity < 0) {
    throw new Error('carrier/broker/dual exceed publishable directory profiles');
  }
  if (input.authorityActive + input.authorityNotCurrent + input.authorityUnknown !== input.publishableProfiles) {
    throw new Error('authority split must equal publishable directory profiles');
  }
  if (input.authorityActive > input.publishableProfiles) {
    throw new Error('active authority exceeds publishable profiles');
  }
  if (input.indexableProfiles > input.publishableProfiles) {
    throw new Error('indexable profiles cannot exceed publishable profiles');
  }
  if (input.flImActive > input.flImRegistrations) {
    throw new Error('active FDACS IM exceeds all IM registrations');
  }
  if (input.flHqPublishable === input.flImActive && input.flImActive > 0) {
    throw new Error('Florida HQ profiles must not equal FDACS IM active registrations');
  }
  if (input.flHqPublishable === input.publishableProfiles) {
    throw new Error('Florida HQ profiles must not equal the national directory');
  }
  if (
    input.publishableProfiles ===
    input.flImActive + input.njOsmNovsAcquired + input.caCitationRows19237
  ) {
    throw new Error('federal directory must not equal a federal+state mix');
  }
  if (input.caUnlicensedCitationRows + input.caExactCalTCitationRows !== input.caCitationRows19237) {
    throw new Error('CA 19237 unlicensed + exact CAL-T must equal citation rows');
  }
  if (input.caCitationRows19237 === input.caHqPublishable) {
    throw new Error('CA citation rows must not equal CA HQ federal profiles');
  }
  if (input.njOsmNovsAcquired === input.njHqPublishable && input.njOsmNovsAcquired > 0) {
    throw new Error('NJ Safe Move NOVs must not equal NJ HQ federal profiles');
  }
  if (!input.publishedStateIntelligencePaths.includes('/florida')) {
    throw new Error('Florida state intelligence path missing');
  }
  if (!input.publishedStateIntelligencePaths.includes('/new-jersey')) {
    throw new Error('New Jersey state intelligence path missing');
  }
  if (!input.publishedStateIntelligencePaths.includes('/california')) {
    throw new Error('California state intelligence path missing');
  }
  if (input.localMoverStateLandings === input.publishableProfiles) {
    throw new Error('local-mover landings must not be used as mover counts');
  }
  if (input.floridaResearchCountyLandings === input.publishedStateIntelligencePaths.length) {
    throw new Error('county landings must not equal published state pages');
  }
}

export function computeMoveNetworkMetrics(input: MoveNetworkMetricsInput): MoveNetworkMetricsV1 {
  assertGrainSafety(input);
  const generatedAt = input.generatedAt;
  const unknownEntity = input.publishableProfiles - input.carriers - input.brokers - input.dual;
  const documentedDates = [input.flSourceAsOf, input.njSourceAsOf, input.caSourceAsOf, input.latestObservedRefresh]
    .filter(Boolean)
    .map((d) => d.slice(0, 10))
    .sort();
  const newestDocumentedSourceAsOf = documentedDates.at(-1) ?? null;

  const commonTrace = (
    counts: string,
    doesNotCount: string,
    systems: string[],
    geo: string,
    sourceDates: string,
    extra?: Partial<MoveNetworkMetric['trace']>
  ) => ({
    counts,
    doesNotCount,
    contributingSourceSystems: systems,
    geographicCoverage: geo,
    sourceDates,
    generationDate: generatedAt.slice(0, 10),
    ...extra,
  });

  const metrics: MoveNetworkMetric[] = [
    metric({
      key: 'federal_publishable_directory_profiles',
      label: 'Publishable interstate research directory profiles',
      value: input.publishableProfiles,
      valueState: 'KNOWN',
      grain: 'directory_profile',
      denominator: 'companies.publication_state = PUBLISHABLE',
      description: 'Consumer-visible MoveTrustHub directory profiles keyed from FMCSA-derived identities. Not a U.S. mover census.',
      coverage: 'National research directory',
      contributingSourceSystems: ['companies', 'fmcsa'],
      sourceAsOf: input.latestObservedRefresh.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'One publishable companies row in the current directory cohort.',
        'Not FDACS IM registrations, not NJ PM/PW/PC licenses, not CAL-T permits, not citations, not headquarters service territory.',
        ['companies', 'fmcsa'],
        'National directory; HQ location is not service territory',
        `Latest observed fmcsa_last_checked ${input.latestObservedRefresh.slice(0, 10)}; not the as-of date for every profile.`,
        { currentActiveRule: 'This metric is all PUBLISHABLE rows, not only authority_active=true.' }
      ),
    }),
    metric({
      key: 'federal_indexable_directory_profiles',
      label: 'Indexable directory profiles',
      value: input.indexableProfiles,
      valueState: 'KNOWN',
      grain: 'indexable_directory_profile',
      denominator: 'PUBLISHABLE companies with indexable=true (SEO/publication cohort)',
      description: 'The actual indexable publication cohort. Not the regulatory universe and not every publishable profile.',
      coverage: 'National research directory',
      contributingSourceSystems: ['companies'],
      sourceAsOf: input.latestObservedRefresh.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'Publishable directory rows currently marked indexable.',
        'Not FMCSA census. Not state authority. A non-indexable publishable row is still a research profile.',
        ['companies'],
        'National directory',
        `Latest observed fmcsa_last_checked ${input.latestObservedRefresh.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'federal_directory_authority_active',
      label: 'Directory profiles with current/active authority flag',
      value: input.authorityActive,
      valueState: 'KNOWN',
      grain: 'directory_profile_authority_active',
      denominator: 'PUBLISHABLE companies with authority_active=true',
      description: 'Subset of the publishable directory whose stored FMCSA-derived authority_active flag is true.',
      coverage: 'National research directory',
      contributingSourceSystems: ['companies', 'fmcsa'],
      sourceAsOf: input.latestObservedRefresh.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'Publishable rows with authority_active true.',
        'Not state intrastate authority. Null authority is unknown, not inactive. Active is not an endorsement.',
        ['companies', 'fmcsa'],
        'National directory',
        `Latest observed fmcsa_last_checked ${input.latestObservedRefresh.slice(0, 10)}`,
        { currentActiveRule: 'authority_active = true on the directory row' }
      ),
    }),
    metric({
      key: 'federal_mc_identities_in_directory',
      label: 'Publishable profiles with an MC number',
      value: input.withMcNumber,
      valueState: 'KNOWN',
      grain: 'federal_mc_identity',
      denominator: 'PUBLISHABLE companies with mc_number present',
      description: 'MC docket presence in the directory. Not USDOT count and not state authority.',
      coverage: 'National research directory',
      contributingSourceSystems: ['companies', 'fmcsa'],
      sourceAsOf: input.latestObservedRefresh.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'Publishable rows that store an MC number.',
        'Not CAL-T. Not a complete FMCSA MC census.',
        ['companies'],
        'National directory',
        `Latest observed fmcsa_last_checked ${input.latestObservedRefresh.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'florida_fdacs_im_registrations',
      label: 'Florida FDACS intrastate mover registrations',
      value: input.flImRegistrations,
      valueState: 'KNOWN',
      grain: 'fdacs_intrastate_mover_registration',
      denominator: 'provider_state_authority state_code=FL authority_type=intrastate_mover_registration',
      description: 'All stored FDACS Intrastate Mover registration rows. Not FMCSA interstate records.',
      coverage: 'Florida',
      contributingSourceSystems: ['provider_state_authority', 'fdacs'],
      sourceAsOf: input.flSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'FDACS IM registration rows currently stored.',
        'Not Florida-HQ federal profiles. Not moving-broker registrations. Not a U.S. mover total.',
        ['fdacs', 'provider_state_authority'],
        'Florida state registration. Headquarters is not service territory.',
        `retrieved_at ${input.flSourceAsOf.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'florida_fdacs_im_active_registrations',
      label: 'Active Florida FDACS IM registrations',
      value: input.flImActive,
      valueState: 'KNOWN',
      grain: 'fdacs_intrastate_mover_registration_active',
      denominator: 'FDACS IM rows with status=active',
      description: 'Active Florida intrastate mover registrations. A federal carrier with Florida HQ is not automatically this population.',
      coverage: 'Florida',
      contributingSourceSystems: ['provider_state_authority', 'fdacs'],
      sourceAsOf: input.flSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'FDACS IM rows with status=active.',
        'Not FMCSA. Not brokers. Not publishable directory profiles.',
        ['fdacs', 'provider_state_authority'],
        'Florida',
        `retrieved_at ${input.flSourceAsOf.slice(0, 10)}`,
        { currentActiveRule: "status = 'active'" }
      ),
    }),
    metric({
      key: 'florida_fdacs_mb_active_registrations',
      label: 'Active Florida moving-broker registrations',
      value: input.flMbActive,
      valueState: 'KNOWN',
      grain: 'fdacs_moving_broker_registration_active',
      denominator: 'provider_state_authority FL authority_type=intrastate_hhg_broker status=active',
      description: 'FDACS Moving Broker registrations currently stored as active.',
      coverage: 'Florida',
      contributingSourceSystems: ['provider_state_authority', 'fdacs'],
      sourceAsOf: input.flSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'Active FDACS MB registration rows.',
        'Not IM movers. Not FMCSA brokers.',
        ['fdacs', 'provider_state_authority'],
        'Florida',
        `retrieved_at ${input.flSourceAsOf.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'florida_hq_publishable_profiles',
      label: 'Publishable federal profiles with Florida headquarters',
      value: input.flHqPublishable,
      valueState: 'KNOWN',
      grain: 'florida_hq_publishable_profile',
      denominator: 'PUBLISHABLE companies whose headquarters string matches Florida',
      description: 'Federal directory profiles with a Florida HQ/business address. Not FDACS authority and not service territory.',
      coverage: 'Florida headquarters in the federal directory',
      contributingSourceSystems: ['companies', 'fmcsa'],
      sourceAsOf: input.latestObservedRefresh.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'Publishable companies with a Florida headquarters string.',
        'Not FDACS IM. Headquarters is not proof of Florida operating authority.',
        ['companies', 'fmcsa'],
        'Florida HQ / business address as stored',
        `Latest observed fmcsa_last_checked ${input.latestObservedRefresh.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'nj_pmw_authority_roster',
      label: 'New Jersey PM/PW/PC statewide mover universe',
      value: null,
      valueState: 'REQUEST_ONLY',
      grain: 'nj_pmw_authority_roster',
      denominator: 'NJ DCA Public Movers and Warehousemen roster — SOURCE_AVAILABLE_BY_REQUEST',
      description: 'The complete NJ PM/PW/PC roster was not bulk-acquired. Statewide mover count is UNKNOWN, not zero.',
      coverage: 'New Jersey',
      contributingSourceSystems: ['nj_dca_pmw'],
      sourceAsOf: input.njSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC_UNKNOWN',
      trace: commonTrace(
        'Nothing numeric is published for the statewide NJ mover universe.',
        'Not Safe Move NOVs. Not federal NJ-HQ profiles. PW-only is not mover authority.',
        ['nj_dca_pmw'],
        'New Jersey',
        `NJ-MOVE snapshot as_of ${input.njSourceAsOf.slice(0, 10)}`,
        {
          whyUnknown:
            'The authoritative PM/PW/PC roster remains request-only / open-search. UNKNOWN must never render as zero.',
        }
      ),
    }),
    metric({
      key: 'nj_operation_safe_move_novs_acquired',
      label: 'New Jersey Operation Safe Move notices of violation (acquired tables)',
      value: input.njOsmNovsAcquired,
      valueState: 'PARTIAL',
      grain: 'nj_operation_safe_move_nov',
      denominator: 'Acquired official OSM respondent tables (2025=11 + 2024=23). Highlight-only years are excluded.',
      description: 'Acquired NOV rows. A Notice of Violation is not a final order. Not a statewide mover count.',
      coverage: 'New Jersey — acquired OSM years only',
      contributingSourceSystems: ['nj_oag_operation_safe_move'],
      sourceAsOf: input.njSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC_PARTIAL',
      trace: commonTrace(
        'Structured NOV respondent rows from acquired 2025 and 2024 official releases.',
        'Not final orders. Not 2023 highlight-only counts. Not licensed mover population.',
        ['nj_oag_operation_safe_move'],
        'New Jersey',
        `NJ-MOVE snapshot as_of ${input.njSourceAsOf.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'ca_cal_t_household_mover_universe',
      label: 'California CAL-T household-mover universe',
      value: null,
      valueState: 'NOT_ACQUIRED',
      grain: 'ca_cal_t_household_mover_permit',
      denominator: 'BHGS Household Mover (CAL-T) roster — OPEN_SEARCH_ONLY / SOURCE_NOT_ACQUIRED',
      description: 'No bulk CAL-T roster was acquired. Complete licensed-mover count is UNKNOWN, not zero.',
      coverage: 'California',
      contributingSourceSystems: ['bhgs'],
      sourceAsOf: input.caSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC_UNKNOWN',
      trace: commonTrace(
        'Nothing numeric is published for the complete CAL-T universe.',
        'Not BHGS citation rows. Not federal CA-HQ profiles. CAL-T is not USDOT.',
        ['bhgs'],
        'California',
        `CA-MOVE snapshot as_of ${input.caSourceAsOf.slice(0, 10)}`,
        {
          whyUnknown:
            'Public verification is search-only at search.dca.ca.gov/hhm_search. Citation rows are enforcement observations, not the licensed universe.',
        }
      ),
    }),
    metric({
      key: 'ca_bhgs_19237_citation_rows',
      label: 'California BHGS household-mover citation rows (BPC 19237)',
      value: input.caCitationRows19237,
      valueState: 'KNOWN',
      grain: 'bhgs_bpc_19237_citation_row',
      denominator: 'Official BHGS citations table rows whose violation section contains 19237',
      description: 'Enforcement observations. Not California movers. A citation is not a revocation. A listed fine is not confirmed paid.',
      coverage: 'California BHGS citations table, filtered to 19237',
      contributingSourceSystems: ['bhgs_citations'],
      sourceAsOf: input.caSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'Official HTML citation rows matching violation section 19237.',
        'Not the CAL-T roster. Not unlicensed=mover. Name-only rows are not profile identities.',
        ['bhgs_citations'],
        'California',
        `CA-MOVE snapshot as_of ${input.caSourceAsOf.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'ca_bhgs_19237_unlicensed_rows',
      label: 'California BHGS 19237 rows marked UNLICENSED',
      value: input.caUnlicensedCitationRows,
      valueState: 'KNOWN',
      grain: 'bhgs_bpc_19237_unlicensed_row',
      denominator: '19237 citation rows marked UNLICENSED',
      description: 'Unlicensed citation observations. Not attached to MoveTrustHub profiles. Not a mover count.',
      coverage: 'California',
      contributingSourceSystems: ['bhgs_citations'],
      sourceAsOf: input.caSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        '19237 citation rows marked UNLICENSED.',
        'Not CAL-T permits. Name-only is UNSAFE for profile attachment.',
        ['bhgs_citations'],
        'California',
        `CA-MOVE snapshot as_of ${input.caSourceAsOf.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'ca_bhgs_19237_exact_cal_t_rows',
      label: 'California BHGS 19237 rows with an exact CAL-T/T identifier',
      value: input.caExactCalTCitationRows,
      valueState: 'KNOWN',
      grain: 'bhgs_bpc_19237_exact_cal_t_row',
      denominator: '19237 citation rows carrying a CAL-T/T number',
      description: 'Citation rows with an exact CAL-T identifier. CAL-T is not USDOT. Citation is not revocation.',
      coverage: 'California',
      contributingSourceSystems: ['bhgs_citations'],
      sourceAsOf: input.caSourceAsOf.slice(0, 10),
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        '19237 citation rows with an exact CAL-T/T identifier.',
        'Not the licensed-mover universe. Fine amount is not confirmed paid.',
        ['bhgs_citations'],
        'California',
        `CA-MOVE snapshot as_of ${input.caSourceAsOf.slice(0, 10)}`
      ),
    }),
    metric({
      key: 'published_state_intelligence_pages',
      label: 'Published state moving-intelligence pages',
      value: input.publishedStateIntelligencePaths.length,
      valueState: 'KNOWN',
      grain: 'published_state_intelligence_page',
      denominator: 'Indexable specialist state intelligence routes currently published',
      description: 'Florida, New Jersey, and California state intelligence pages. Not a count of movers.',
      coverage: input.publishedStateIntelligencePaths.join(', '),
      contributingSourceSystems: ['move-state-intel'],
      sourceAsOf: newestDocumentedSourceAsOf,
      generatedAt,
      publicationStatus: 'PUBLIC',
      trace: commonTrace(
        'Published /florida, /new-jersey, and /california intelligence routes.',
        'Not local-mover landings and not federal directory rows.',
        ['move-state-intel'],
        input.publishedStateIntelligencePaths.join(', '),
        'Publication gates in specialist catalogs'
      ),
    }),
  ];

  const canonical = {
    publishable: input.publishableProfiles,
    indexable: input.indexableProfiles,
    active: input.authorityActive,
    notCurrent: input.authorityNotCurrent,
    unknownAuth: input.authorityUnknown,
    carriers: input.carriers,
    brokers: input.brokers,
    dual: input.dual,
    withMc: input.withMcNumber,
    flIm: input.flImRegistrations,
    flImActive: input.flImActive,
    flMb: input.flMbActive,
    flHq: input.flHqPublishable,
    njRoster: input.njRosterCoverage,
    njOsm: input.njOsmNovsAcquired,
    njHq: input.njHqPublishable,
    caRoster: input.caCalTRosterCoverage,
    caCitations: input.caCitationRows19237,
    caUnlicensed: input.caUnlicensedCitationRows,
    caExact: input.caExactCalTCitationRows,
    caHq: input.caHqPublishable,
    statePages: input.publishedStateIntelligencePaths,
    flCounties: input.floridaResearchCountyLandings,
    landings: input.localMoverStateLandings,
  };

  return {
    schemaVersion: MOVE_NETWORK_METRICS_VERSION,
    generatedAt,
    newestDocumentedSourceAsOf,
    newestDocumentedSourceAsOfNote:
      'Newest documented official source-effective date among metrics that carry a sourceAsOf. Not the as-of date of every federal profile, not Git time, and not deploy time.',
    sourceFingerprint: createHash('sha256').update(JSON.stringify(canonical)).digest('hex'),
    federalDirectory: {
      publishableProfiles: input.publishableProfiles,
      indexableProfiles: input.indexableProfiles,
      authorityActive: input.authorityActive,
      authorityNotCurrent: input.authorityNotCurrent,
      authorityUnknown: input.authorityUnknown,
      carriers: input.carriers,
      brokers: input.brokers,
      dual: input.dual,
      unknownEntityClass: unknownEntity,
      withMcNumber: input.withMcNumber,
      cohortRule: 'companies.publication_state = PUBLISHABLE (consumer-visible research directory, not the FMCSA census)',
      indexableRule: 'PUBLISHABLE and companies.indexable = true',
    },
    florida: {
      imRegistrations: input.flImRegistrations,
      imActive: input.flImActive,
      mbActive: input.flMbActive,
      imVerifiedLinks: input.flImVerifiedLinks,
      hqPublishable: input.flHqPublishable,
      contactObservations: input.flContactObservations,
    },
    newJersey: {
      rosterCoverage: input.njRosterCoverage,
      statewideMoverUniverse: null,
      osmNovsAcquired: input.njOsmNovsAcquired,
      hqPublishable: input.njHqPublishable,
    },
    california: {
      calTRosterCoverage: input.caCalTRosterCoverage,
      licensedMoverUniverse: null,
      citationRows19237: input.caCitationRows19237,
      unlicensedCitationRows: input.caUnlicensedCitationRows,
      exactCalTCitationRows: input.caExactCalTCitationRows,
      hqPublishable: input.caHqPublishable,
      tariffEffective: input.caTariffEffective,
    },
    network: {
      publishedStateIntelligencePages: input.publishedStateIntelligencePaths.length,
      publishedStateIntelligencePaths: input.publishedStateIntelligencePaths,
      floridaResearchCountyLandings: input.floridaResearchCountyLandings,
      localMoverStateLandings: input.localMoverStateLandings,
    },
    homeProjection: {
      publishableProfiles: input.publishableProfiles,
      entityClasses: [
        { class: 'Carrier', count: input.carriers },
        { class: 'Broker', count: input.brokers },
        { class: 'Carrier/Broker', count: input.dual },
        { class: 'Unknown', count: unknownEntity },
      ],
      authority: {
        active: input.authorityActive,
        notCurrent: input.authorityNotCurrent,
        unknown: input.authorityUnknown,
        total: input.publishableProfiles,
      },
      fmcsaClock: {
        latestObservedRefresh: input.latestObservedRefresh,
        oldestObservedRefresh: input.oldestObservedRefresh,
        withRefreshDate: input.withRefreshDate,
        withoutRefreshDate: input.withoutRefreshDate,
        total: input.publishableProfiles,
        buckets: input.freshnessBuckets,
      },
    },
    metrics,
  };
}
