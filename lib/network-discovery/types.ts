/**
 * ASK-SEARCH-006A / 006A.1 — Move → NetworkDiscoveryEntity projection types.
 * Aligns with Ask ASK-SEARCH-005 contract (snake_case field names).
 */

export type MoveDiscoveryEntityType =
  | 'mover'
  | 'interstate_mover'
  | 'intrastate_mover'
  | 'moving_broker'
  | 'auto_transporter';

export type DiscoveryStatus = 'active' | 'held' | 'disabled';

export type DiscoveryServiceArea =
  | { kind: 'city'; city: string; state: string }
  | { kind: 'county'; county: string; state: string }
  | { kind: 'state'; state: string }
  | { kind: 'zip'; zip: string }
  | { kind: 'interstate'; label?: string }
  | { kind: 'nationwide'; label?: string };

export type NetworkDiscoveryEntity = {
  network_entity_id: string;
  hub: 'move';
  source_entity_id: string;
  entity_type: MoveDiscoveryEntityType;
  display_name: string;
  legal_name?: string;
  /** Physical HQ locality (not inferred from service coverage). */
  city?: string;
  county?: string;
  state?: string;
  zip?: string;
  categories?: string[];
  service_areas?: DiscoveryServiceArea[];
  regulatory_status_summary?: string;
  trust_report_available: boolean;
  canonical_profile_url: string;
  canonical_search_url?: string;
  search_terms?: string[];
  discovery_status: DiscoveryStatus;
  source_version?: string;
  updated_at?: string;
};

export type CoverageCountyRef = {
  stateSlug: string;
  countySlug: string;
  name?: string;
};

/**
 * Normalized provider row used by eligibility + mapping.
 * Compatible with legacy snapshot fields plus structured coverage.
 */
export type MoveProviderRecord = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  usdot_number: string | null;
  mc_number: string | null;
  is_verified: boolean;
  out_of_service: boolean;
  authority_active: boolean | null;
  coverage: string | null;
  services: string[] | null;
  specialties: string[] | null;
  overall_rating: number | null;
  review_count: number | null;
  entity_type_raw?: string | null;
  service_scope?: 'interstate' | 'intrastate' | null;
  is_local_only?: boolean;
  short_description?: string | null;
  physical_city?: string;
  physical_state?: string;
  physical_zip?: string;
  coverage_counties?: CoverageCountyRef[];
  source_kind?: 'active_directory' | 'seed_auto_overlay' | 'legacy_snapshot';
};

/** @deprecated Prefer MoveProviderRecord — kept for assert fixtures. */
export type MoveCompanySnapshotRow = MoveProviderRecord;

export type EligibilityFailureReason =
  | 'missing_slug'
  | 'missing_display_name'
  | 'missing_identity'
  | 'missing_usdot'
  | 'out_of_service'
  | 'authority_inactive'
  | 'insufficient_geography'
  | 'unsupported_entity_type'
  | 'invalid_canonical_url';

export type PilotExportManifest = {
  schema_version: 'ask-network-discovery-v1';
  hub: 'move';
  generated_at: string;
  source_version: string;
  source_path: string;
  pilot_label: 'PILOT / NOT YET CONSUMED BY ASK PRODUCTION';
  pilot_artifact: string;
  amendment: 'ASK-SEARCH-006A.1';
  entity_count: number;
  content_fingerprint: string;
  eligibility: {
    considered: number;
    eligible: number;
    ineligible: number;
    ineligible_reasons: Record<string, number>;
    pilot_selected: number;
  };
  entity_type_breakdown: Record<string, number>;
  geography: {
    states: Record<string, number>;
    with_city: number;
    with_zip: number;
    with_county: number;
    with_service_area_county: number;
    with_service_area_state: number;
  };
  query_readiness?: Record<string, unknown>;
  identity_continuity?: {
    baseline_path: string;
    overlapping: number;
    id_matches: number;
    id_mismatches: { slug: string; old_id: string; new_id: string }[];
  };
  entities: NetworkDiscoveryEntity[];
};
