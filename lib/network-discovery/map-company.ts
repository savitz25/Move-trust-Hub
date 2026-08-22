/**
 * Map Move provider record → NetworkDiscoveryEntity (read-only projection).
 * ASK-SEARCH-006A.1: physical location ≠ structured service coverage.
 */

import { serviceAreasFromCoverage, stateCodeToSlug } from './geography';
import type {
  DiscoveryServiceArea,
  MoveProviderRecord,
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
 * Never uses display name as identity.
 */
export function buildMoveNetworkId(
  row: Pick<MoveProviderRecord, 'slug' | 'usdot_number'>,
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
export function mapEntityType(row: MoveProviderRecord): {
  entity_type: MoveDiscoveryEntityType;
  categories: string[];
  regulatory_status_summary: string;
} {
  const services = (row.services || []).map((s) => String(s));
  const rawType = (row.entity_type_raw || '').toLowerCase();

  const hasBroker =
    services.some((s) => /^broker$/i.test(s.trim()) || /(^|\s)broker(\s|$)/i.test(s)) ||
    rawType === 'broker';
  const hasCarrier =
    services.some(
      (s) =>
        /^carrier$/i.test(s.trim()) ||
        /full service/i.test(s) ||
        /carrier\s*\/\s*broker/i.test(s) ||
        /^long distance$/i.test(s.trim())
    ) ||
    rawType === 'carrier' ||
    rawType === 'carrier/broker' ||
    rawType === 'carrier-broker';
  const hasMixed =
    services.some((s) => /carrier\s*\/\s*broker|broker\s*\/\s*carrier/i.test(s)) ||
    rawType === 'carrier/broker' ||
    rawType === 'carrier-broker';
  const hasAuto = services.some((s) => /auto transport/i.test(s));
  const isLocal =
    row.is_local_only === true ||
    row.service_scope === 'intrastate' ||
    /local\s*\/\s*in-state/i.test(row.short_description || '');

  const categories: string[] = [];
  if (hasAuto) categories.push('auto_transport');
  if (hasMixed || (hasBroker && hasCarrier)) categories.push('carrier_broker');

  // Broker-only (no carrier / full service / mixed)
  if ((hasBroker || rawType === 'broker') && !hasCarrier && !hasMixed) {
    // Auto broker → auto_transporter with broker category (not moving_broker)
    if (hasAuto) {
      return {
        entity_type: 'auto_transporter',
        categories: ['auto_transport', 'broker'],
        regulatory_status_summary: 'Auto transport broker',
      };
    }
    return {
      entity_type: 'moving_broker',
      categories: [...categories, 'broker'],
      regulatory_status_summary: 'Moving broker',
    };
  }

  // Primary auto transporter when Auto Transport dominates
  if (hasAuto && !hasCarrier && !hasBroker) {
    return {
      entity_type: 'auto_transporter',
      categories: ['auto_transport'],
      regulatory_status_summary: 'Auto transport provider',
    };
  }
  if (hasAuto && (hasBroker || hasCarrier) && !hasMixed && services.every((s) => /auto|broker|carrier/i.test(s))) {
    // Auto + broker already handled; auto + carrier
    if (hasCarrier && !hasBroker) {
      return {
        entity_type: 'auto_transporter',
        categories: ['auto_transport', 'carrier'],
        regulatory_status_summary: 'Auto transport carrier',
      };
    }
  }

  // Intrastate / local (no USDOT interstate authority signal)
  if (isLocal && usdotDigits(row.usdot_number).length < 5) {
    return {
      entity_type: 'intrastate_mover',
      categories: [...new Set(['mover', 'intrastate', ...categories])],
      regulatory_status_summary: 'Local / intrastate mover',
    };
  }

  // USDOT carriers → interstate_mover
  if (usdotDigits(row.usdot_number).length >= 5) {
    categories.push('interstate');
    if (hasCarrier || hasMixed || !hasBroker) categories.push('carrier');
    return {
      entity_type: 'interstate_mover',
      categories: [...new Set(['mover', ...categories])],
      regulatory_status_summary: row.authority_active
        ? 'Federal authority verified'
        : 'USDOT on file — re-check authority on FMCSA SAFER',
    };
  }

  // Local-tagged with Long Distance remap but no USDOT — treat as intrastate when local flag
  if (isLocal) {
    return {
      entity_type: 'intrastate_mover',
      categories: [...new Set(['mover', 'intrastate', ...categories])],
      regulatory_status_summary: 'Local / intrastate mover',
    };
  }

  return {
    entity_type: 'mover',
    categories: [...new Set(['mover', ...categories])],
    regulatory_status_summary: 'Mover listing',
  };
}

export function mapCompanyToDiscovery(
  row: MoveProviderRecord,
  opts?: { sourceVersion?: string; updatedAt?: string; usdotIsUnique?: boolean }
): NetworkDiscoveryEntity {
  const mapped = mapEntityType(row);
  const network_entity_id = buildMoveNetworkId(row, { usdotIsUnique: opts?.usdotIsUnique });
  const source_entity_id = network_entity_id.slice('move:'.length);

  // Physical location (HQ) — never from county coverage alone
  const city = row.physical_city;
  const state = row.physical_state;
  const zip = row.physical_zip;

  // Structured service coverage from assignments / coverageCounties
  const service_areas: DiscoveryServiceArea[] = [...serviceAreasFromCoverage(row.coverage_counties)];

  // Physical city as searchable locality ONLY when we also have state — labeled as city kind
  // but distinct from verified county coverage. Do not treat HQ zip as service zip.
  if (city && state) {
    const already = service_areas.some(
      (a) => a.kind === 'city' && a.city.toLowerCase() === city.toLowerCase() && a.state === state
    );
    if (!already) {
      // Physical HQ city hint for search — not claimed as verified service coverage county
      service_areas.push({ kind: 'city', city, state });
    }
    if (!service_areas.some((a) => a.kind === 'state' && a.state === state)) {
      service_areas.push({ kind: 'state', state });
    }
  }

  if (mapped.entity_type === 'interstate_mover' || mapped.categories.includes('interstate')) {
    if (!service_areas.some((a) => a.kind === 'interstate')) {
      service_areas.push({ kind: 'interstate', label: 'interstate_hhg' });
    }
  }

  if (/all 50 states|nationwide|continental us/i.test(row.coverage || '')) {
    if (!service_areas.some((a) => a.kind === 'nationwide')) {
      service_areas.push({ kind: 'nationwide', label: row.coverage || 'nationwide' });
    }
  }

  const countyTerms = (row.coverage_counties || [])
    .slice(0, 40)
    .map((c) => c.countySlug.replace(/-/g, ' '));

  const search_terms = [
    row.name,
    row.slug.replace(/-/g, ' '),
    mapped.entity_type.replace(/_/g, ' '),
    ...(mapped.categories || []),
    city,
    state,
    ...countyTerms,
  ]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase());

  return {
    network_entity_id,
    hub: 'move',
    source_entity_id,
    entity_type: mapped.entity_type,
    display_name: row.name.trim(),
    city,
    state,
    zip,
    categories: mapped.categories,
    service_areas,
    regulatory_status_summary: mapped.regulatory_status_summary,
    trust_report_available: true,
    canonical_profile_url: buildCanonicalProfileUrl(row.slug),
    canonical_search_url:
      state
        ? `${SITE}/local-movers/${stateCodeToSlug(state)}`
        : `${SITE}/companies`,
    search_terms: [...new Set(search_terms)],
    discovery_status: 'active',
    source_version: opts?.sourceVersion,
    updated_at: opts?.updatedAt,
  };
}
