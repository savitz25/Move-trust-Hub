/**
 * ASK-SEARCH-006A.1 — read-only Move source adapter.
 *
 * Primary: data/active-directory-movers.ts (offline active/displayable snapshot)
 * Coverage: static *-county-assignments via getStaticMoverCountyIndex
 * Overlay: seed companies (HQ / services / entityType) + auto-transport seeds
 *
 * No DB writes, no Places, no enrichment APIs.
 */

import { activeDirectoryMovers } from '@/data/active-directory-movers';
import { seedCompanies } from '@/data/seed-companies';
import { seedAutoTransportCompanies } from '@/data/seed-auto-transport';
import { companyCountyLookupKeys } from '@/lib/directory/enrich-static-county-coverage';
import { getStaticMoverCountyIndex } from '@/lib/local-movers/static-mover-county-index';
import { parseHeadquarters as parseLocalHq } from '@/lib/local-movers/parse-headquarters';
import { looksLikeStreetAddress } from '@/lib/data-quality/location';
import type { MoveProviderRecord, CoverageCountyRef } from './types';

export const CATALOG_SOURCE_LABEL = 'active-directory-movers.ts';

function digits(v: string | null | undefined): string {
  return (v ?? '').replace(/\D/g, '');
}

function normalizeServices(services: string[] | null | undefined): string[] {
  const out: string[] = [];
  for (const raw of services ?? []) {
    const s = String(raw);
    const lower = s.toLowerCase();
    // Rebuild maps Carrier/Full Service → "Long Distance"; restore carrier signal.
    if (lower === 'long distance' || lower.includes('full service')) {
      out.push('Carrier');
      continue;
    }
    out.push(s);
  }
  return out;
}

function seedBySlug(): Map<string, (typeof seedCompanies)[number]> {
  const map = new Map<string, (typeof seedCompanies)[number]>();
  for (const c of seedCompanies) {
    map.set(c.slug.toLowerCase(), c);
  }
  for (const c of seedAutoTransportCompanies) {
    if (!map.has(c.slug.toLowerCase())) map.set(c.slug.toLowerCase(), c);
  }
  return map;
}

function resolvePhysicalLocation(opts: {
  cityField: string;
  headquartersState?: string | null;
  seedHeadquarters?: string | null;
}): { city?: string; state?: string; zip?: string; headquarters: string | null } {
  // Prefer seed HQ when it parses cleanly (City, ST).
  if (opts.seedHeadquarters) {
    const seedParsed = parseLocalHq(opts.seedHeadquarters);
    if (seedParsed.stateCode && !seedParsed.cityQuarantined && seedParsed.city) {
      const zipM = opts.seedHeadquarters.match(/\b(\d{5})(?:-\d{4})?\b/);
      return {
        city: seedParsed.city,
        state: seedParsed.stateCode,
        zip: zipM?.[1],
        headquarters: opts.seedHeadquarters,
      };
    }
  }

  if (opts.headquartersState && opts.cityField && !looksLikeStreetAddress(opts.cityField)) {
    const st = opts.headquartersState.toUpperCase();
    return {
      city: opts.cityField.trim(),
      state: st,
      headquarters: `${opts.cityField.trim()}, ${st}`,
    };
  }

  // Try parsing city field itself when it embeds ", ST"
  if (opts.cityField) {
    const parsed = parseLocalHq(opts.cityField);
    if (parsed.stateCode && !parsed.cityQuarantined && parsed.city) {
      const zipM = opts.cityField.match(/\b(\d{5})(?:-\d{4})?\b/);
      return {
        city: parsed.city,
        state: parsed.stateCode,
        zip: zipM?.[1],
        headquarters: opts.cityField,
      };
    }
  }

  return { headquarters: null };
}

function lookupCoverage(
  byKey: Map<string, CoverageCountyRef[]>,
  id: string,
  slug: string
): CoverageCountyRef[] {
  const keys = companyCountyLookupKeys({ id, slug });
  const out: CoverageCountyRef[] = [];
  const seen = new Set<string>();
  for (const key of keys) {
    for (const c of byKey.get(key) ?? []) {
      const k = `${c.stateSlug}/${c.countySlug}`;
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ stateSlug: c.stateSlug, countySlug: c.countySlug });
    }
  }
  return out;
}

/**
 * Load authoritative offline catalog + structured county coverage + seed overlays.
 * Deterministic: Object.values order of activeDirectoryMovers, then missing auto seeds.
 */
export function loadMoveDiscoveryCatalog(): {
  rows: MoveProviderRecord[];
  sourceVersion: string;
  sourcePath: string;
  stats: {
    catalog_count: number;
    overlay_added: number;
    with_usdot: number;
    with_coverage_counties: number;
    with_physical_state: number;
  };
} {
  const index = getStaticMoverCountyIndex();
  const seeds = seedBySlug();
  const rows: MoveProviderRecord[] = [];
  const seenSlugs = new Set<string>();

  for (const mover of Object.values(activeDirectoryMovers)) {
    const slug = (mover.profileSlug || mover.id.replace(/^directory-/, '')).trim();
    if (!slug) continue;
    const seed = seeds.get(slug.toLowerCase());
    const physical = resolvePhysicalLocation({
      cityField: mover.city || '',
      headquartersState: mover.headquartersState,
      seedHeadquarters: seed?.headquarters ?? null,
    });

    const services = normalizeServices(
      seed?.services?.length ? seed.services.map(String) : mover.services
    );
    // Ensure auto/broker tags from seed when catalog only has Long Distance
    if (seed?.services) {
      for (const s of seed.services) {
        if (!services.some((x) => x.toLowerCase() === String(s).toLowerCase())) {
          services.push(String(s));
        }
      }
    }

    const coverage_counties = lookupCoverage(index.byKey, mover.id, slug);
    const usdot =
      digits(mover.usdotNumber) || digits(seed?.usdotNumber) || null;
    const usdot_number = usdot && usdot.length >= 5 ? usdot : mover.usdotNumber || seed?.usdotNumber || null;

    const row: MoveProviderRecord = {
      id: mover.id,
      slug,
      name: mover.name,
      headquarters: physical.headquarters,
      usdot_number: usdot_number ? String(usdot_number) : null,
      mc_number: mover.mcNumber || seed?.mcNumber || null,
      is_verified: Boolean(usdot && usdot.length >= 5) || Boolean(seed?.isVerified),
      // Catalog generation criteria: !out_of_service && authority_active !== false
      out_of_service: mover.outOfService === true ? true : false,
      authority_active:
        mover.authorityActive === false
          ? false
          : mover.authorityActive === true
            ? true
            : true,
      coverage: seed?.coverage ? String(seed.coverage) : null,
      services,
      specialties: mover.specialties || seed?.specialties || null,
      overall_rating: null,
      review_count: null,
      entity_type_raw: mover.entityType || seed?.entityType || null,
      service_scope: seed?.serviceScope || (mover.isLocalOnly ? 'intrastate' : null),
      is_local_only: mover.isLocalOnly === true || /local\s*\/\s*in-state/i.test(mover.shortDescription || ''),
      short_description: mover.shortDescription || null,
      physical_city: physical.city,
      physical_state: physical.state,
      physical_zip: physical.zip,
      coverage_counties,
      source_kind: 'active_directory',
    };

    rows.push(row);
    seenSlugs.add(slug.toLowerCase());
  }

  // Deterministic auto-transport overlay for seeds missing from active directory
  let overlay_added = 0;
  const autoSorted = [...seedAutoTransportCompanies].sort((a, b) =>
    a.slug.localeCompare(b.slug)
  );
  for (const company of autoSorted) {
    if (seenSlugs.has(company.slug.toLowerCase())) continue;
    const physical = resolvePhysicalLocation({
      cityField: '',
      seedHeadquarters: company.headquarters,
    });
    const coverage_counties = lookupCoverage(index.byKey, company.id, company.slug);
    rows.push({
      id: company.id,
      slug: company.slug,
      name: company.name,
      headquarters: physical.headquarters || company.headquarters || null,
      usdot_number: company.usdotNumber || null,
      mc_number: company.mcNumber || null,
      is_verified: Boolean(company.isVerified),
      out_of_service: false,
      authority_active: company.authorityActive !== false,
      coverage: company.coverage ? String(company.coverage) : null,
      services: (company.services || []).map(String),
      specialties: company.specialties || null,
      overall_rating: null,
      review_count: null,
      entity_type_raw: company.entityType || null,
      service_scope: company.serviceScope || 'interstate',
      is_local_only: false,
      short_description: company.shortDescription || null,
      physical_city: physical.city,
      physical_state: physical.state,
      physical_zip: physical.zip,
      coverage_counties,
      source_kind: 'seed_auto_overlay',
    });
    seenSlugs.add(company.slug.toLowerCase());
    overlay_added++;
  }

  // Stable order by slug for reproducibility of downstream collision detection
  rows.sort((a, b) => a.slug.localeCompare(b.slug));

  const with_usdot = rows.filter((r) => digits(r.usdot_number).length >= 5).length;
  const with_coverage_counties = rows.filter((r) => (r.coverage_counties?.length || 0) > 0).length;
  const with_physical_state = rows.filter((r) => !!r.physical_state).length;

  const sourceVersion = `${CATALOG_SOURCE_LABEL}#n=${Object.keys(activeDirectoryMovers).length}+auto_overlay=${overlay_added}`;

  return {
    rows,
    sourceVersion,
    sourcePath: `data/${CATALOG_SOURCE_LABEL}`,
    stats: {
      catalog_count: Object.keys(activeDirectoryMovers).length,
      overlay_added,
      with_usdot,
      with_coverage_counties,
      with_physical_state,
    },
  };
}
