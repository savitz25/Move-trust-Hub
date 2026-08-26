/**
 * Pure County Intelligence payload builder.
 * Living numbers are injected by the snapshot loader. Page copy does not hardcode counts.
 */
import { catalogEntryForCounty } from './county-catalog';
import { COUNTY_MOVE_EDUCATION } from './county-education';
import {
  countyResearchCoverage,
  evaluateEnhancedLocalResearchGate,
  type EnhancedLocalResearchGateInput,
} from './coverage';
import { isPublicReady } from './readiness';
import type { MetricDefinition } from './types';
import type {
  CountyCredentialCensus,
  CountyIntelModuleStatus,
  CountyMoveIntelligencePayload,
  IntelligenceCoverageItem,
  IntelligenceEvidenceSource,
  IntelligenceMetricValue,
} from './payload-types';

export const MTH_FL_COUNTY_INTEL_VERSION = 'mth-fl-county-intel-v1';

const NO_DATASET_NOTE =
  'No county credential dataset is contributing. That is not zero credentials and not zero incidents.';

const CREDENTIAL_ATTRIBUTION =
  'County credential ≠ FDACS registration ≠ FMCSA authority ≠ USDOT/MC ≠ company. Published rows only are public; INTERNAL_ONLY rows are not company claims.';

export type CountyProgramRow = {
  agency_name?: string | null;
  program_name?: string | null;
  credential_type?: string | null;
  source_key?: string | null;
  source_url?: string | null;
  retrieved_at?: string | null;
  county_name?: string | null;
};

export type CountyLiveCounts = {
  published: number | null;
  internalOnly: number | null;
  total: number | null;
  program: CountyProgramRow | null;
};

function metricFromDef(
  def: MetricDefinition,
  value: number | null,
  asOf: string | null,
  geographicScope: IntelligenceMetricValue['geographicScope']
): IntelligenceMetricValue {
  return {
    id: def.id,
    label: def.label,
    value,
    entityCounted: def.entityCounted,
    definition: def.definition,
    querySource: def.source,
    readiness: def.defaultReadiness,
    geographicScope,
    asOf,
    disclosure: def.limitation,
    publicEligibility: def.publicEligibility,
  };
}

function countyDefs(countyName: string): Record<string, MetricDefinition> {
  return {
    county_published_credentials: {
      id: 'county_published_credentials',
      label: `Published ${countyName} County credentials`,
      entityCounted: 'county_credential',
      definition:
        'provider_county_credential rows for this county program with evidence_publication_state=PUBLISHED.',
      numerator: 'PUBLISHED county credential rows for the county source_key',
      denominator: 'All county credential rows for the county source_key',
      source: 'provider_county_credential (PUBLISHED gate)',
      geographicSemantics:
        'County credential census. Not headquarters, not service area, not FDACS, not FMCSA.',
      dateSemantics: 'retrieved_at on the credential / program row',
      attribution: CREDENTIAL_ATTRIBUTION,
      publicEligibility: 'public',
      defaultReadiness: 'READY',
      limitation:
        'County credential ≠ FDACS registration. County credential ≠ FMCSA authority. County credential ≠ company. Published rows only.',
    },
    county_internal_credentials: {
      id: 'county_internal_credentials',
      label: `Internal-only ${countyName} County credentials`,
      entityCounted: 'county_credential',
      definition:
        'provider_county_credential rows with evidence_publication_state=INTERNAL_ONLY. Not a public company claim.',
      numerator: 'INTERNAL_ONLY rows',
      denominator: 'All county credential rows for the source_key',
      source: 'provider_county_credential',
      geographicSemantics: 'Internal research hold. Not public.',
      dateSemantics: 'retrieved_at',
      attribution: 'INTERNAL_ONLY ≠ public.',
      publicEligibility: 'internal_only',
      defaultReadiness: 'INTERNAL_ONLY',
      limitation: 'Do not render as published permits or company claims.',
    },
    county_hq_profiles: {
      id: 'county_hq_profiles',
      label: `Directory profiles headquartered in ${countyName} County`,
      entityCounted: 'directory_profile',
      definition:
        'Headquarters is a city/address string. No production headquarters-to-county map exists.',
      numerator: 'n/a',
      denominator: 'n/a',
      source: 'companies.headquarters (not mapped to county)',
      geographicSemantics: 'Headquarters is not service area. County seat is not an HQ map.',
      dateSemantics: 'n/a',
      attribution: 'Unattributed to this county.',
      publicEligibility: 'internal_only',
      defaultReadiness: 'NOT_READY',
      limitation:
        'Do not publish a county HQ count. Headquarters ≠ operating geography.',
    },
    county_fdacs_registrations: {
      id: 'county_fdacs_registrations',
      label: `FDACS registrations in ${countyName} County`,
      entityCounted: 'registration',
      definition:
        'FDACS IM/MB rows are state registrations. No deterministic registration-to-county map is in production.',
      numerator: 'n/a',
      denominator: 'n/a',
      source: 'provider_state_authority (state scope only)',
      geographicSemantics: 'State registration. Not county.',
      dateSemantics: 'n/a',
      attribution: 'State registration ≠ company ≠ county credential.',
      publicEligibility: 'internal_only',
      defaultReadiness: 'NOT_READY',
      limitation: 'Do not subdivide FDACS registrations by county.',
    },
    county_complaints: {
      id: 'county_complaints',
      label: `${countyName} County complaints`,
      entityCounted: 'registration',
      definition: 'County complaint observations. Not loaded.',
      numerator: 'n/a',
      denominator: 'n/a',
      source: 'not acquired',
      geographicSemantics: 'n/a',
      dateSemantics: 'n/a',
      attribution: 'Complaint ≠ finding.',
      publicEligibility: 'internal_only',
      defaultReadiness: 'NOT_READY',
      limitation: 'Do not publish complaint volume. Absence of a dataset is not zero incidents.',
    },
    county_enforcement: {
      id: 'county_enforcement',
      label: `${countyName} County enforcement / final dispositions`,
      entityCounted: 'registration',
      definition: 'Final dispositions. Not loaded.',
      numerator: 'n/a',
      denominator: 'n/a',
      source: 'not acquired',
      geographicSemantics: 'n/a',
      dateSemantics: 'n/a',
      attribution: 'Notice ≠ final order. Investigation ≠ enforcement.',
      publicEligibility: 'internal_only',
      defaultReadiness: 'NOT_READY',
      limitation: 'Do not publish enforcement counts.',
    },
    county_inspections: {
      id: 'county_inspections',
      label: `${countyName} County inspections / out-of-service`,
      entityCounted: 'registration',
      definition: 'Inspection events attributable to this county. Not modeled.',
      numerator: 'n/a',
      denominator: 'n/a',
      source: 'not loaded',
      geographicSemantics: 'n/a',
      dateSemantics: 'n/a',
      attribution: 'n/a',
      publicEligibility: 'internal_only',
      defaultReadiness: 'NOT_READY',
      limitation: 'Inspection volume is not quality. Do not publish zeros.',
    },
    county_operating_geography: {
      id: 'county_operating_geography',
      label: `${countyName} County operating / activity evidence`,
      entityCounted: 'directory_profile',
      definition:
        'Validated operating geography in this county. Directory coverage_counties is a service assignment, not proven activity.',
      numerator: 'n/a',
      denominator: 'n/a',
      source: 'not loaded',
      geographicSemantics: 'Operating geography is not inferred from HQ or county seat.',
      dateSemantics: 'n/a',
      attribution: 'Unproven.',
      publicEligibility: 'internal_only',
      defaultReadiness: 'NOT_READY',
      limitation: 'Blocks Enhanced Local Research until proven.',
    },
    county_contact_observations: {
      id: 'county_contact_observations',
      label: `${countyName} County contact observations`,
      entityCounted: 'contact_observation',
      definition:
        'County-attributed contact observations. Statewide FDACS contacts exist; they are not a county census.',
      numerator: 'n/a',
      denominator: 'n/a',
      source: 'provider_contact_observation (state-scoped)',
      geographicSemantics: 'Tied to a Florida regulatory_id, not this county.',
      dateSemantics: 'n/a',
      attribution: 'Observation, not a county phone book.',
      publicEligibility: 'internal_only',
      defaultReadiness: 'NOT_READY',
      limitation: 'Do not publish statewide contacts as a county figure.',
    },
  };
}

function modulesFor(datasetPresent: boolean, countyName: string): CountyIntelModuleStatus[] {
  const credNote = datasetPresent
    ? `Published ${countyName} County credentials are in the research graph. INTERNAL_ONLY rows stay internal. This is not Enhanced Local Research.`
    : NO_DATASET_NOTE;
  const notReady = (id: CountyIntelModuleStatus['id'], label: string, note: string): CountyIntelModuleStatus => ({
    id,
    label,
    readiness: 'NOT_READY',
    publicEligibility: 'internal_only',
    note,
  });
  return [
    {
      id: 'county_credentials',
      label: `${countyName} County credentials`,
      readiness: datasetPresent ? 'READY' : 'NOT_READY',
      publicEligibility: datasetPresent ? 'public' : 'internal_only',
      note: credNote,
    },
    {
      id: 'permit_local_credential',
      label: 'Permit / local credential evidence',
      readiness: datasetPresent ? 'READY' : 'NOT_READY',
      publicEligibility: datasetPresent ? 'public' : 'internal_only',
      note: datasetPresent
        ? 'Same census as county credentials for this program. Not FDACS or FMCSA.'
        : NO_DATASET_NOTE,
    },
    notReady(
      'county_complaints',
      'County complaints',
      'Not loaded. Complaint ≠ finding. No dataset ≠ zero incidents.'
    ),
    notReady(
      'enforcement_dispositions',
      'Enforcement / final dispositions',
      'Not loaded. Notice ≠ final order.'
    ),
    notReady(
      'county_consumer_affairs',
      'County consumer-affairs records',
      datasetPresent
        ? 'The credential program may be administered by consumer affairs; complaint/enforcement extracts are not loaded.'
        : 'No contributing consumer-affairs extract.'
    ),
    notReady(
      'civil_public_regulatory',
      'Civil / public regulatory data',
      'Not loaded.'
    ),
    notReady(
      'expanded_contact_observations',
      'Expanded contact observations',
      'Statewide FDACS contacts are not a county census.'
    ),
    notReady(
      'operating_activity_evidence',
      'Operating / activity evidence',
      'Not proven. Headquarters, county seat, and directory coverage assignments are not operating geography. This conjunct keeps coverage at Statewide Research.'
    ),
  ];
}

function coverageItems(datasetPresent: boolean, countyName: string): IntelligenceCoverageItem[] {
  return [
    {
      id: 'county_credentials',
      label: `${countyName} County credentials`,
      status: datasetPresent ? 'included' : 'expanding',
      note: datasetPresent
        ? 'Published credential rows only. INTERNAL_ONLY rows are not public company claims.'
        : NO_DATASET_NOTE,
    },
    {
      id: 'fdacs_state',
      label: 'FDACS state registrations',
      status: 'expanding',
      note: 'Statewide IM/MB research lives on /florida. Not subdivided by county.',
    },
    {
      id: 'hq_county',
      label: 'Headquarters in this county',
      status: 'expanding',
      note: 'Headquarters is a city/address string. No production HQ-to-county map. HQ ≠ service area.',
    },
    {
      id: 'complaints',
      label: 'County complaints',
      status: 'expanding',
      note: 'Not loaded. Complaint ≠ finding. No dataset ≠ zero incidents.',
    },
    {
      id: 'enforcement',
      label: 'Enforcement / final dispositions',
      status: 'expanding',
      note: 'Not loaded.',
    },
    {
      id: 'inspections',
      label: 'Inspections / out-of-service',
      status: 'expanding',
      note: 'Not published. Inspection volume is not quality.',
    },
    {
      id: 'operating',
      label: 'Operating / activity evidence',
      status: 'expanding',
      note: 'Not proven. Blocks Enhanced Local Research.',
    },
  ];
}

function sourcesFor(
  datasetPresent: boolean,
  credentials: CountyCredentialCensus
): IntelligenceEvidenceSource[] {
  const sources: IntelligenceEvidenceSource[] = [];
  if (datasetPresent && credentials.sourceKey) {
    sources.push({
      id: credentials.sourceKey,
      agency: credentials.agency ?? 'County regulator',
      label: credentials.credentialType ?? 'County credential program',
      whatItContains: `County-issued ${credentials.credentialType ?? 'credential'} rows stored as provider_county_credential. Distinct from FDACS and FMCSA.`,
      coveragePeriod: 'Current program snapshot',
      observationCount: credentials.published,
      attributionStatus: CREDENTIAL_ATTRIBUTION,
      limitation:
        'Published count is the public census. INTERNAL_ONLY rows exist as research holds and are not company claims. Not a service-area list.',
      lastExtractedAt: credentials.asOf,
      sourceUrl: credentials.sourceUrl,
      cadence: 'Controlled county extracts',
    });
  }
  sources.push({
    id: 'fdacs_statewide_context',
    agency: 'Florida Department of Agriculture and Consumer Services',
    label: 'FDACS statewide registrations (context)',
    whatItContains:
      'Florida IM/MB registrations are state-scoped. They are not attributed to this county on this page.',
    coveragePeriod: 'See /florida',
    observationCount: null,
    attributionStatus: 'State registration ≠ county credential ≠ company',
    limitation: 'Do not read statewide IM counts as county movers.',
    lastExtractedAt: null,
    sourceUrl: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
    cadence: 'See Florida State Intelligence',
  });
  if (!datasetPresent) {
    sources.push({
      id: 'county_dataset_gap',
      agency: 'n/a',
      label: 'County local credential dataset',
      whatItContains: 'No contributing county program in production for this county.',
      coveragePeriod: 'n/a',
      observationCount: null,
      attributionStatus: 'Not loaded',
      limitation: NO_DATASET_NOTE,
      lastExtractedAt: null,
      sourceUrl: null,
      cadence: 'Not contributing',
    });
  }
  return sources;
}

function documentedGateInput(datasetPresent: boolean): EnhancedLocalResearchGateInput {
  return {
    countyCredentialCensusValidated: datasetPresent,
    complaintsAttributed: false,
    enforcementFinalDispositionsAttributed: false,
    operatingGeographyProven: false,
    identityReviewed: false,
    publicEligibilityReviewed: datasetPresent,
  };
}

export function buildCountyMoveIntelligencePayload(input: {
  countySlug: string;
  generatedAt: string;
  timedOut: boolean;
  counts: CountyLiveCounts | null;
}): CountyMoveIntelligencePayload {
  const catalog = catalogEntryForCounty(input.countySlug);
  if (!catalog) {
    throw new Error(`Unknown Florida research county: ${input.countySlug}`);
  }

  const coverageLevel = countyResearchCoverage(catalog.slug);
  const counts = input.counts;
  const configuredSource = Boolean(catalog.sourceKey);
  const program = counts?.program ?? null;
  const total = counts?.total ?? null;
  const published = counts?.published ?? null;
  const internalOnly = counts?.internalOnly ?? null;
  const datasetPresent =
    configuredSource &&
    !input.timedOut &&
    (program !== null || (typeof total === 'number' && total > 0));

  const asOf = program?.retrieved_at ?? null;
  const agency = program?.agency_name ?? (datasetPresent ? catalog.fallbackAgency : null);
  const credentialType =
    program?.program_name ||
    (datasetPresent ? catalog.fallbackCredentialType : null) ||
    program?.credential_type ||
    null;
  const sourceUrl = program?.source_url ?? (datasetPresent ? catalog.fallbackSourceUrl : null);

  const credentials: CountyCredentialCensus = {
    datasetPresent,
    agency,
    credentialType,
    sourceKey: datasetPresent ? catalog.sourceKey : null,
    sourceUrl,
    total: datasetPresent ? total : null,
    published: datasetPresent ? published : null,
    internalOnly: datasetPresent ? internalOnly : null,
    asOf: datasetPresent ? asOf : null,
    attribution: datasetPresent ? CREDENTIAL_ATTRIBUTION : NO_DATASET_NOTE,
  };

  const defs = countyDefs(catalog.name);
  const metrics: IntelligenceMetricValue[] = input.timedOut
    ? []
    : [
        metricFromDef(
          {
            ...defs.county_published_credentials,
            defaultReadiness: datasetPresent ? 'READY' : 'NOT_READY',
            publicEligibility: datasetPresent ? 'public' : 'internal_only',
            limitation: datasetPresent
              ? defs.county_published_credentials.limitation
              : NO_DATASET_NOTE,
          },
          datasetPresent ? published : null,
          datasetPresent ? asOf : null,
          datasetPresent ? 'county_credential' : 'unattributed'
        ),
        metricFromDef(
          defs.county_internal_credentials,
          datasetPresent ? internalOnly : null,
          datasetPresent ? asOf : null,
          datasetPresent ? 'county_credential' : 'unattributed'
        ),
        metricFromDef(defs.county_hq_profiles, null, null, 'unattributed'),
        metricFromDef(defs.county_fdacs_registrations, null, null, 'unattributed'),
        metricFromDef(defs.county_complaints, null, null, 'unattributed'),
        metricFromDef(defs.county_enforcement, null, null, 'unattributed'),
        metricFromDef(defs.county_inspections, null, null, 'unattributed'),
        metricFromDef(defs.county_operating_geography, null, null, 'unattributed'),
        metricFromDef(defs.county_contact_observations, null, null, 'unattributed'),
      ];

  const gateInput = documentedGateInput(datasetPresent);
  // Evaluated for documentation only. Coverage stays countyResearchCoverage() (statewide).
  evaluateEnhancedLocalResearchGate(gateInput);

  return {
    state: 'florida',
    countySlug: catalog.slug,
    countyName: catalog.name,
    canonicalPath: catalog.canonicalPath,
    version: MTH_FL_COUNTY_INTEL_VERSION,
    generatedAt: input.generatedAt,
    asOf: credentials.asOf,
    timedOut: input.timedOut,
    coverageLevel,
    enhancedGateDocumented: true,
    enhancedGateActivated: false,
    metrics,
    modules: modulesFor(datasetPresent, catalog.name),
    credentials,
    evidenceSources: sourcesFor(datasetPresent, credentials),
    coverage: coverageItems(datasetPresent, catalog.name),
    education: COUNTY_MOVE_EDUCATION,
    discoveryLinks: [
      {
        id: 'county_listings',
        label: `${catalog.name} County movers`,
        href: `${catalog.canonicalPath}#movers`,
        semantics:
          'This county page lists curated local-mover assignments and regional fallbacks. It is not a headquarters-in-county filter, not a county-credential holder list, and not FDACS-by-county.',
      },
    ],
  };
}

export function publicCountyMetrics(
  payload: CountyMoveIntelligencePayload
): IntelligenceMetricValue[] {
  return payload.metrics.filter(
    (m) => isPublicReady(m.readiness, m.publicEligibility) && m.value !== null
  );
}
