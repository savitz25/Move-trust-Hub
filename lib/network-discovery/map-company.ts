/**
 * Map Move company snapshot → NetworkDiscoveryEntity (read-only projection).
 */

import { parseHeadquarters } from './geography';
import type {
  DiscoveryServiceArea,
  MoveCompanySnapshotRow,
  MoveDiscoveryEntityType,
  NetworkDiscoveryEntity,
} from './types';

const SITE = 'https://www.movetrusthub.com';

export function usdotDigits(value: string | null | undefined): string {
  return (value ?? '').replace(/\D/g, '');
}

/**
 * Prefer USDOT when unique; franchise/branch rows that share a USDOT keep USDOT
 * visible but disambiguate with Move's canonical profile slug.
 */
export function buildMoveNetworkId(
  row: MoveCompanySnapshotRow,
  opts?: { usdotIsUnique?: boolean }
): string {
  const usdot = usdotDigits(row.usdot_number);
  const unique = opts?.usdotIsUnique !== false;
  if (usdot.length >= 5 && unique) return `move:usdot-${usdot}`;
  if (usdot.length >= 5 && !unique) return `move:usdot-${usdot}--${row.slug}`;
  return `move:co-${row.slug}`;
}

export function buildCanonicalProfileUrl(slug: string): string {
  return `${SITE}/companies/${encodeURIComponent(slug)}`;
}

/**
 * Map services + signals → Universal Search entity type + categories.
 * Preserves broker ≠ carrier distinction.
 */
export function mapEntityType(row: MoveCompanySnapshotRow): {
  entity_type: MoveDiscoveryEntityType;
  categories: string[];
  regulatory_status_summary: string;
} {
  const services = (row.services || []).map((s) => String(s));
  const hasBroker = services.some((s) => /^broker$/i.test(s.trim()) || /broker/i.test(s));
  const hasCarrier = services.some(
    (s) => /^carrier$/i.test(s.trim()) || /full service/i.test(s) || /carrier\s*\/\s*broker/i.test(s)
  );
  const hasMixed = services.some((s) => /carrier\s*\/\s*broker|broker\s*\/\s*carrier/i.test(s));
  const hasAuto = services.some((s) => /auto transport/i.test(s));

  const categories: string[] = [];
  if (hasAuto) categories.push('auto_transport');
  if (hasMixed || (hasBroker && hasCarrier)) categories.push('carrier_broker');

  // Broker-only (no carrier / full service)
  if (hasBroker && !hasCarrier && !hasMixed) {
    return {
      entity_type: 'moving_broker',
      categories: [...categories, 'broker'],
      regulatory_status_summary: 'Moving broker',
    };
  }

  // Primary auto transporter when Auto Transport is present and HHG carrier signals weak
  if (hasAuto && !hasCarrier && !hasBroker) {
    return {
      entity_type: 'auto_transporter',
      categories: ['auto_transport'],
      regulatory_status_summary: 'Auto transport provider',
    };
  }

  // Default USDOT carriers → interstate_mover (snapshot is USDOT-oriented directory)
  if (usdotDigits(row.usdot_number).length >= 5) {
    categories.push('interstate');
    if (hasCarrier || hasMixed) categories.push('carrier');
    return {
      entity_type: 'interstate_mover',
      categories: [...new Set(['mover', ...categories])],
      regulatory_status_summary: row.authority_active
        ? 'Federal authority verified'
        : 'USDOT on file — re-check authority on FMCSA SAFER',
    };
  }

  return {
    entity_type: 'mover',
    categories: [...new Set(['mover', ...categories])],
    regulatory_status_summary: 'Mover listing',
  };
}

export function mapCompanyToDiscovery(
  row: MoveCompanySnapshotRow,
  opts?: { sourceVersion?: string; updatedAt?: string; usdotIsUnique?: boolean }
): NetworkDiscoveryEntity {
  const geo = parseHeadquarters(row.headquarters);
  const mapped = mapEntityType(row);
  const network_entity_id = buildMoveNetworkId(row, { usdotIsUnique: opts?.usdotIsUnique });
  const source_entity_id = network_entity_id.slice('move:'.length);

  const service_areas: DiscoveryServiceArea[] = [];
  if (geo?.complete && geo.state) {
    service_areas.push({ kind: 'state', state: geo.state });
    if (geo.city) service_areas.push({ kind: 'city', city: geo.city, state: geo.state });
    if (geo.zip) service_areas.push({ kind: 'zip', zip: geo.zip });
  }
  if (mapped.entity_type === 'interstate_mover' || mapped.categories.includes('interstate')) {
    service_areas.push({ kind: 'interstate', label: 'interstate_hhg' });
  }

  const search_terms = [
    row.name,
    row.slug.replace(/-/g, ' '),
    mapped.entity_type.replace(/_/g, ' '),
    ...(mapped.categories || []),
    geo?.city,
    geo?.state,
  ]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase());

  return {
    network_entity_id,
    hub: 'move',
    source_entity_id,
    entity_type: mapped.entity_type,
    display_name: row.name.trim(),
    city: geo?.city,
    state: geo?.complete ? geo.state : undefined,
    zip: geo?.zip,
    categories: mapped.categories,
    service_areas,
    regulatory_status_summary: mapped.regulatory_status_summary,
    trust_report_available: true, // /companies/[slug] is the Trust Report / research profile
    canonical_profile_url: buildCanonicalProfileUrl(row.slug),
    canonical_search_url: geo?.complete && geo.state
      ? `${SITE_SEARCH}/local-movers/${stateSlug(geo.state)}`
      : `${SITE_SEARCH}/companies`,
    search_terms: [...new Set(search_terms)],
    discovery_status: 'active',
    source_version: opts?.sourceVersion,
    updated_at: opts?.updatedAt,
  };
}

const SITE_SEARCH = 'https://www.movetrusthub.com';

function stateSlug(code: string): string {
  const map: Record<string, string> = {
    FL: 'florida',
    NJ: 'new-jersey',
    NY: 'new-york',
    TX: 'texas',
    CA: 'california',
    GA: 'georgia',
    IL: 'illinois',
    NC: 'north-carolina',
    VA: 'virginia',
    MA: 'massachusetts',
    MD: 'maryland',
    MI: 'michigan',
    IN: 'indiana',
    CO: 'colorado',
    NV: 'nevada',
    NM: 'new-mexico',
    AR: 'arkansas',
    HI: 'hawaii',
    RI: 'rhode-island',
  };
  return map[code] || code.toLowerCase();
}
