/**
 * ASK-SEARCH-006A — Move → NetworkDiscoveryEntity projection types.
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

/** Offline snapshot row shape (scripts/output/active-verified-companies.json). */
export type MoveCompanySnapshotRow = {
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
};

export type EligibilityFailureReason =
  | 'missing_slug'
  | 'missing_display_name'
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
  };
  entities: NetworkDiscoveryEntity[];
};
