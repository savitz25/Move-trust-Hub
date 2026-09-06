import caSnapshot from '@/lib/california-intelligence/accepted-snapshot.json';
import txSnapshot from '@/lib/texas-intelligence/accepted-snapshot.json';
import waSnapshot from '@/lib/washington-intelligence/accepted-snapshot.json';
import njSnapshot from '@/data/reports/nj-move-002-public-snapshot.json';
import type { MoveNetworkMetric, MoveNetworkMetricsV1, PublicationStatus } from '@/lib/metrics/move-network-metrics-v1';

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
  published_state_intelligence_pages: { family: 'PUBLIC_SURFACES', entityClass: 'Published specialist state page', destination: '#state-intelligence', acceptedArtifact: 'canonical state publication model' },
};

export function buildMoveHomepageEvidenceInventory(metrics: MoveNetworkMetricsV1): MoveHomepageMeasure[] {
  return metrics.metrics.map((measure) => {
    if (!allowed.has(measure.publicationStatus)) throw new Error(`Homepage metric ${measure.key} is not publication eligible`);
    const projection = meta[measure.key];
    if (!projection) throw new Error(`Homepage metric ${measure.key} lacks inventory metadata`);
    return { ...measure, ...projection };
  });
}

export const MOVE_HOMEPAGE_STATE_CARDS = [
  { state: 'Florida', href: '/florida', regulator: 'FDACS', authority: 'Intrastate Mover registration / Moving Broker registration', roster: 'Acquired registration evidence', evidence: 'Registrations, verified identity links, business contacts, and federal HQ overlay', sourceClock: 'State authority retrieval clock is shown per measure.' },
  { state: 'New Jersey', href: '/new-jersey', regulator: 'DCA / Division of Consumer Affairs', authority: 'Public Movers and Warehousemen authority', roster: njSnapshot.authority.rosterCoverage.replaceAll('_', ' '), evidence: 'Authority framework and 34 acquired Operation Safe Move NOV rows', sourceClock: `Accepted snapshot as of ${njSnapshot.asOf}` },
  { state: 'California', href: '/california', regulator: 'BHGS', authority: 'CAL-T household-mover permit', roster: caSnapshot.authority.roster_coverage.replaceAll('_', ' '), evidence: `${caSnapshot.enforcement.rows} BPC 19237 citation rows; exact CAL-T identity retained where printed`, sourceClock: `Accepted snapshot as of ${caSnapshot.as_of}` },
  { state: 'Texas', href: txSnapshot.publication.route, regulator: 'TxDMV', authority: 'Household-goods certificate of registration', roster: txSnapshot.authority.roster_coverage.replaceAll('_', ' '), evidence: 'Authority verification, complaint and insurance-filing paths, contracts, claims, mediation, and tariff rules', sourceClock: `Accepted snapshot as of ${txSnapshot.as_of}` },
  { state: 'Washington', href: waSnapshot.publication.route, regulator: 'Washington UTC', authority: 'Household-goods permit', roster: waSnapshot.bulk.utc_hhg_bulk_roster.replaceAll('_', ' '), evidence: `${waSnapshot.directory.active_result_count} active directory results plus permit, tariff, complaint, and federal-verification paths`, sourceClock: `Directory retrieved ${waSnapshot.directory.retrieved_at.slice(0, 10)}; accepted snapshot as of ${waSnapshot.as_of}` },
] as const;

export const MOVE_CONSUMER_RULES = {
  Texas: txSnapshot.consumer_rules.rules.slice(0, 4),
  Washington: waSnapshot.consumer_rules.rules.slice(0, 4),
};
