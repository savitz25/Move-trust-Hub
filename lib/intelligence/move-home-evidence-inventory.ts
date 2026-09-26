import network from '@/data/home/move-network-metrics-v1.json';
import type { MoveNetworkMetric,MoveNetworkMetricsV1,PublicationStatus } from '@/lib/metrics/move-network-metrics-v1';
export const MOVE_EVIDENCE_FAMILY_LABELS = {
  MOVER_IDENTITY: 'Mover & transport identity',
  FEDERAL_AUTHORITY: 'Federal registration & authority',
  OPERATING_ROLE: 'Carrier & broker roles',
  STATE_AUTHORITY: 'State household-goods authority',
  SAFETY_INSPECTION: 'Safety & inspection evidence',
  REGULATORY: 'Complaints & regulatory evidence',
  BUSINESS_EVIDENCE: 'Business, contact & geography',
  CONSUMER_RULES: 'Consumer rules & moving process',
  PUBLIC_SURFACES: 'Public research surfaces',
} as const;

export type MoveEvidenceFamily = keyof typeof MOVE_EVIDENCE_FAMILY_LABELS;
export type MoveHomepageMeasure = MoveNetworkMetric & {
  family: MoveEvidenceFamily;
  entityClass: string;
  destination: string;
  acceptedArtifact: string;
};

const allowed = new Set<PublicationStatus>(['PUBLIC', 'PUBLIC_PARTIAL', 'PUBLIC_UNKNOWN']);
const meta: Record<string, Pick<MoveHomepageMeasure, 'family' | 'entityClass' | 'destination' | 'acceptedArtifact'>> = {
  federal_publishable_directory_profiles: { family: 'MOVER_IDENTITY', entityClass: 'Publishable federal research profile', destination: '/companies', acceptedArtifact: 'move-network-metrics-v1' },
  federal_indexable_directory_profiles: { family: 'PUBLIC_SURFACES', entityClass: 'Indexable research profile', destination: '/companies', acceptedArtifact: 'move-network-metrics-v1' },
  federal_directory_authority_active: { family: 'FEDERAL_AUTHORITY', entityClass: 'Directory profile authority flag', destination: '/verify-dot', acceptedArtifact: 'move-network-metrics-v1' },
  federal_directory_authority_not_current: { family: 'FEDERAL_AUTHORITY', entityClass: 'Directory profile authority flag', destination: '/verify-dot', acceptedArtifact: 'move-network-metrics-v1' },
  federal_directory_authority_unknown: { family: 'FEDERAL_AUTHORITY', entityClass: 'Directory profile authority flag', destination: '/verify-dot', acceptedArtifact: 'move-network-metrics-v1' },
  federal_mc_identities_in_directory: { family: 'FEDERAL_AUTHORITY', entityClass: 'MC/docket identity on a profile', destination: '/verify-dot', acceptedArtifact: 'move-network-metrics-v1' },
  federal_directory_carrier_profiles: { family: 'OPERATING_ROLE', entityClass: 'Carrier-classified directory profile', destination: '/companies', acceptedArtifact: 'move-network-metrics-v1' },
  federal_directory_broker_profiles: { family: 'OPERATING_ROLE', entityClass: 'Broker-classified directory profile', destination: '/companies', acceptedArtifact: 'move-network-metrics-v1' },
  federal_directory_carrier_broker_profiles: { family: 'OPERATING_ROLE', entityClass: 'Carrier/broker directory profile', destination: '/companies', acceptedArtifact: 'move-network-metrics-v1' },
  federal_directory_unknown_role_profiles: { family: 'OPERATING_ROLE', entityClass: 'Directory profile with unknown role', destination: '/companies', acceptedArtifact: 'move-network-metrics-v1' },
  florida_fdacs_im_registrations: { family: 'STATE_AUTHORITY', entityClass: 'FDACS IM registration row', destination: '/florida', acceptedArtifact: 'Florida state-authority snapshot' },
  florida_fdacs_im_active_registrations: { family: 'STATE_AUTHORITY', entityClass: 'Active FDACS IM registration row', destination: '/florida', acceptedArtifact: 'Florida state-authority snapshot' },
  florida_fdacs_mb_active_registrations: { family: 'OPERATING_ROLE', entityClass: 'Active FDACS moving-broker registration', destination: '/florida', acceptedArtifact: 'Florida state-authority snapshot' },
  florida_hq_publishable_profiles: { family: 'BUSINESS_EVIDENCE', entityClass: 'Federal profile with Florida HQ', destination: '/companies?state=FL', acceptedArtifact: 'move-network-metrics-v1' },
  florida_fdacs_verified_identity_links: { family: 'MOVER_IDENTITY', entityClass: 'Verified state-to-profile link', destination: '/florida', acceptedArtifact: 'Florida state-authority snapshot' },
  florida_public_contact_observations: { family: 'BUSINESS_EVIDENCE', entityClass: 'Public business-contact observation', destination: '/florida', acceptedArtifact: 'Florida contact-observation snapshot' },
  nj_pmw_authority_roster: { family: 'STATE_AUTHORITY', entityClass: 'NJ PM/PW/PC authority roster', destination: '/new-jersey', acceptedArtifact: 'nj-move-002-public-snapshot' },
  nj_operation_safe_move_novs_acquired: { family: 'REGULATORY', entityClass: 'Notice-of-violation row', destination: '/new-jersey', acceptedArtifact: 'nj-move-002-public-snapshot' },
  nj_hq_publishable_profiles: { family: 'BUSINESS_EVIDENCE', entityClass: 'Federal profile with New Jersey HQ', destination: '/companies?state=NJ', acceptedArtifact: 'move-network-metrics-v1' },
  ca_cal_t_household_mover_universe: { family: 'STATE_AUTHORITY', entityClass: 'CAL-T permit roster', destination: '/california', acceptedArtifact: 'ca-move-001 accepted snapshot' },
  ca_bhgs_19237_citation_rows: { family: 'REGULATORY', entityClass: 'BHGS citation row', destination: '/california', acceptedArtifact: 'ca-move-001 accepted snapshot' },
  ca_bhgs_19237_unlicensed_rows: { family: 'REGULATORY', entityClass: 'BHGS citation row without CAL-T', destination: '/california', acceptedArtifact: 'ca-move-001 accepted snapshot' },
  ca_bhgs_19237_exact_cal_t_rows: { family: 'REGULATORY', entityClass: 'BHGS citation row with exact CAL-T', destination: '/california', acceptedArtifact: 'ca-move-001 accepted snapshot' },
  ca_hq_publishable_profiles: { family: 'BUSINESS_EVIDENCE', entityClass: 'Federal profile with California HQ', destination: '/companies?state=CA', acceptedArtifact: 'move-network-metrics-v1' },
  tx_txdmv_household_goods_mover_universe: { family: 'STATE_AUTHORITY', entityClass: 'TxDMV certificate roster', destination: '/texas', acceptedArtifact: 'move-tx-state-intel-v1' },
  wa_utc_active_household_goods_directory_results: { family: 'STATE_AUTHORITY', entityClass: 'Active UTC HTML directory result', destination: '/washington', acceptedArtifact: 'move-wa-state-intel-v1' },
  wa_utc_household_goods_bulk_roster: { family: 'STATE_AUTHORITY', entityClass: 'UTC downloadable roster', destination: '/washington', acceptedArtifact: 'move-wa-state-intel-v1' },
  co_puc_active_household_goods_permit_listings: { family: 'STATE_AUTHORITY', entityClass: 'Active Colorado PUC HHG permit listing', destination: '/colorado', acceptedArtifact: 'move-co-state-intel-v1' },
  co_puc_revoked_household_goods_permit_listings: { family: 'REGULATORY', entityClass: 'Revoked Colorado PUC HHG listing', destination: '/colorado', acceptedArtifact: 'move-co-state-intel-v1' },
  co_puc_suspended_household_goods_permit_listings: { family: 'REGULATORY', entityClass: 'Suspended Colorado PUC HHG listing', destination: '/colorado', acceptedArtifact: 'move-co-state-intel-v1' },
  va_dmv_household_goods_carrier_listings: { family: 'STATE_AUTHORITY', entityClass: 'Virginia DMV Household Goods Carrier certificate listing', destination: '/virginia', acceptedArtifact: 'move-va-state-intel-v1' },
  va_dmv_property_carrier_listings: { family: 'STATE_AUTHORITY', entityClass: 'Virginia DMV Property Carrier permit listing', destination: '/virginia', acceptedArtifact: 'move-va-state-intel-v1' },
  ny_dot_2026_hhg_bulletin_observations: { family: 'STATE_AUTHORITY', entityClass: 'NYSDOT Weekly Bulletin household-goods application observation', destination: '/new-york', acceptedArtifact: 'move-ny-state-intel-v1' },
  or_odot_authorized_hhg_list_rows: { family: 'STATE_AUTHORITY', entityClass: 'ODOT CCD authorized household-goods list row', destination: '/oregon', acceptedArtifact: 'move-or-state-intel-v1' },
  pa_puc_hhg_operator_list_rows: { family: 'STATE_AUTHORITY', entityClass: 'PA PUC active Household Goods Operators list row', destination: '/pennsylvania', acceptedArtifact: 'move-pa-state-intel-v1' },
  nc_ncuc_hhg_c_number_identities: { family: 'STATE_AUTHORITY', entityClass: 'NCUC household-goods C-number identity', destination: '/north-carolina', acceptedArtifact: 'move-nc-state-intel-v1' },
  oh_puco_hhg_certificate_universe: { family: 'STATE_AUTHORITY', entityClass: 'PUCO household-goods certificate roster', destination: '/ohio', acceptedArtifact: 'move-oh-state-intel-v1' },
  ga_dps_hhg_mca_identities: { family: 'STATE_AUTHORITY', entityClass: 'Georgia DPS household-goods MCA identity', destination: '/georgia', acceptedArtifact: 'move-ga-state-intel-v1' },
  ma_dpu_hhg_certificate_identities: { family: 'STATE_AUTHORITY', entityClass: 'Massachusetts DPU household-goods certificate identity', destination: '/massachusetts', acceptedArtifact: 'move-ma-state-intel-v1' },
  tn_intrastate_authority_universe: { family: 'STATE_AUTHORITY', entityClass: 'Tennessee Intrastate Authority roster', destination: '/tennessee', acceptedArtifact: 'move-tn-state-intel-v1' },
  nv_nta_hhg_cpcn_identities: { family: 'STATE_AUTHORITY', entityClass: 'Nevada NTA household-goods CPCN identity', destination: '/nevada', acceptedArtifact: 'move-nv-state-intel-v1' },
  mn_hhg_permit_universe: { family: 'STATE_AUTHORITY', entityClass: 'Minnesota Household Goods Mover Permit roster', destination: '/minnesota', acceptedArtifact: 'move-mn-state-intel-v1' },
  published_state_intelligence_pages: { family: 'PUBLIC_SURFACES', entityClass: 'Published specialist state page', destination: '#state-intelligence', acceptedArtifact: 'canonical state publication model' },
};

export function buildMoveHomepageEvidenceInventory(metrics: MoveNetworkMetricsV1): MoveHomepageMeasure[] {
  return metrics.metrics.map((measure) => {
    if (!allowed.has(measure.publicationStatus)) throw new Error(`Homepage metric ${measure.key} is not publication eligible`);
    const projection = measure.presentation ?? meta[measure.key];
    if (!projection) throw new Error(`Homepage metric ${measure.key} lacks inventory metadata`);
    return { ...measure, ...projection };
  });
}


export const MOVE_HOMEPAGE_STATE_CARDS = network.homepageStateCards;
export const MOVE_CONSUMER_RULES = network.consumerRules;
