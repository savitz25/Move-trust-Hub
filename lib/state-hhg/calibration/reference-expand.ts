/**
 * Build expanded FL/WA reference corpus for 011C.1A.
 */
import type pg from 'pg';
import {
  buildCountySlugToFips,
  countiesWithinRadius,
  countiesForState,
  loadFlWaCountyCentroids,
  type CountyCentroid,
} from '@/lib/state-hhg/calibration/counties';
import type { CalibrationCohortMember } from '@/lib/state-hhg/calibration/types';
import type { OperatingLocationRecord } from '@/lib/state-hhg/calibration/types';
import type { ExpandedReferenceProvider } from '@/lib/state-hhg/calibration/reference-types';
import {
  collectProviderWebsiteText,
  parseServiceAreaClaims,
  websiteIdentityOk,
} from '@/lib/state-hhg/calibration/website-evidence';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';
import { loadCuratedDestinationEvidence } from '@/lib/state-hhg/calibration/reference';

function countyNameToFips(
  place: string,
  stateCode: 'FL' | 'WA',
  centroids: readonly CountyCentroid[]
): string | null {
  const stateFips = stateCode === 'FL' ? '12' : '53';
  const cleaned = place
    .replace(/\bcounty\b/i, '')
    .replace(/\./g, '')
    .trim()
    .toLowerCase();
  for (const c of centroids) {
    if (c.stateFips !== stateFips) continue;
    if (c.name.toLowerCase() === cleaned) return c.countyFips;
    if (c.name.toLowerCase().replace(/\s+/g, '') === cleaned.replace(/\s+/g, '')) {
      return c.countyFips;
    }
  }
  // Miami-Dade variants
  if (stateCode === 'FL' && /miami\s*-?\s*dade/.test(cleaned)) {
    const hit = centroids.find((c) => c.stateFips === '12' && /miami/i.test(c.name));
    return hit?.countyFips ?? null;
  }
  return null;
}

export async function buildExpandedReferenceCorpus(input: {
  client: pg.Client;
  cohort: readonly CalibrationCohortMember[];
  locations: readonly OperatingLocationRecord[];
  websites: Map<
    string,
    { website: string | null; phone: string | null; name: string | null }
  >;
  options?: { scrapeWebsites?: boolean; delayMs?: number; websiteLimit?: number };
}): Promise<ExpandedReferenceProvider[]> {
  const centroids = loadFlWaCountyCentroids();
  const slugToFips = buildCountySlugToFips(centroids);
  const locById = new Map(input.locations.map((l) => [l.providerId, l]));
  const retrievedAt = new Date().toISOString();
  const byProvider = new Map<string, ExpandedReferenceProvider>();

  const ensure = (m: CalibrationCohortMember): ExpandedReferenceProvider => {
    const existing = byProvider.get(m.providerId);
    if (existing) return existing;
    const row: ExpandedReferenceProvider = {
      providerId: m.providerId,
      stateCode: m.stateCode,
      canonicalName: m.canonicalName,
      legalName: m.legalName,
      sourceUrl: null,
      sourceType: 'regulator_physical',
      retrievedAt,
      evidenceCompleteness: 'UNKNOWN_COMPLETENESS',
      positiveCountyFips: [],
      negativeCountyFips: [],
      unknownCountyFips: [],
      originalPlaceStatements: [],
      explicitRadiusMiles: null,
      explicitRegionText: null,
      identityConfidence: 'HIGH',
      evidenceQuality: 'HIGH',
      multiLocation: false,
      franchiseSafetyHold:
        isFranchiseOrNetworkBrandName(m.legalName) ||
        isFranchiseOrNetworkBrandName(m.canonicalName),
      reviewNotes: [],
      scorableForPrecision: false,
    };
    byProvider.set(m.providerId, row);
    return row;
  };

  // 1) Home-county operating point — PARTIAL positive only
  for (const m of input.cohort) {
    const loc = locById.get(m.providerId);
    if (!loc?.countyFips) continue;
    if (loc.geocodeStatus !== 'MATCH' && loc.geocodeStatus !== 'TIE') continue;
    const row = ensure(m);
    if (!row.positiveCountyFips.includes(loc.countyFips)) {
      row.positiveCountyFips.push(loc.countyFips);
    }
    row.originalPlaceStatements.push(
      `operating_point:${loc.observedAddress} → ${loc.countyFips}`
    );
    if (row.evidenceCompleteness === 'UNKNOWN_COMPLETENESS') {
      row.evidenceCompleteness = 'PARTIAL';
    }
    row.sourceType = 'home_county_operating_point';
    row.evidenceQuality = 'HIGH';
    row.reviewNotes.push(
      'Home/operating county is a PARTIAL positive; unmentioned counties remain UNKNOWN'
    );
  }

  // 2) Curated destination assignments
  const curated = await loadCuratedDestinationEvidence(
    input.client,
    input.cohort,
    slugToFips
  );
  const curatedByProvider = new Map<string, string[]>();
  for (const e of curated) {
    const arr = curatedByProvider.get(e.providerId) ?? [];
    arr.push(e.countyFips);
    curatedByProvider.set(e.providerId, arr);
  }
  for (const m of input.cohort) {
    const counties = curatedByProvider.get(m.providerId);
    if (!counties?.length) continue;
    const row = ensure(m);
    for (const fips of counties) {
      if (!row.positiveCountyFips.includes(fips)) row.positiveCountyFips.push(fips);
    }
    row.sourceType = 'curated_destination_assignment';
    row.originalPlaceStatements.push(
      `curated_destinations:${counties.length}_counties`
    );
    if (
      row.evidenceCompleteness === 'UNKNOWN_COMPLETENESS' ||
      row.evidenceCompleteness === 'PARTIAL'
    ) {
      row.evidenceCompleteness = 'PARTIAL';
    }
    row.evidenceQuality = 'HIGH';
  }

  // 3) Website scrape (limited)
  if (input.options?.scrapeWebsites !== false) {
    let scraped = 0;
    const limit = input.options?.websiteLimit ?? 80;
    const delayMs = input.options?.delayMs ?? 250;
    for (const m of input.cohort) {
      if (scraped >= limit) break;
      if (byProvider.get(m.providerId)?.franchiseSafetyHold) {
        const row = ensure(m);
        row.reviewNotes.push('franchise_skipped_website_merge_into_parent');
        continue;
      }
      const site = input.websites.get(m.providerId)?.website;
      if (!site) continue;
      scraped++;
      const { pages, combined } = await collectProviderWebsiteText(site, {
        delayMs,
        maxPages: 4,
      });
      if (!combined || combined.length < 100) continue;
      const identity = websiteIdentityOk({
        website: site,
        legalName: m.legalName,
        canonicalName: m.canonicalName,
        phone: input.websites.get(m.providerId)?.phone ?? null,
        pageText: combined,
      });
      if (identity.confidence === 'UNRESOLVED') {
        const row = ensure(m);
        row.reviewNotes.push('WEBSITE_IDENTITY_UNRESOLVED');
        continue;
      }
      const claims = parseServiceAreaClaims(combined, m.stateCode);
      const row = ensure(m);
      row.sourceUrl = pages[0]?.url ?? site;
      row.sourceType = 'provider_website';
      row.identityConfidence = identity.confidence;
      row.explicitRadiusMiles = claims.explicitRadiusMiles;
      row.explicitRegionText = claims.regionText;
      row.reviewNotes.push(...claims.notes, ...identity.notes);
      row.originalPlaceStatements.push(...claims.placeMentions);

      for (const place of claims.placeMentions) {
        const fips = countyNameToFips(place, m.stateCode, centroids);
        if (fips && !row.positiveCountyFips.includes(fips)) {
          row.positiveCountyFips.push(fips);
        }
      }

      // Upgrade completeness from website claims when stronger
      const rank: Record<string, number> = {
        UNKNOWN_COMPLETENESS: 0,
        PARTIAL: 1,
        REGION_EXPLICIT: 2,
        RADIUS_EXPLICIT: 3,
        EXHAUSTIVE: 4,
      };
      if (rank[claims.completeness] > rank[row.evidenceCompleteness]) {
        row.evidenceCompleteness = claims.completeness;
      }
      if (claims.quality === 'HIGH') row.evidenceQuality = 'HIGH';
      else if (claims.quality === 'MEDIUM' && row.evidenceQuality !== 'HIGH') {
        row.evidenceQuality = 'MEDIUM';
      }

      // RADIUS_EXPLICIT → positives inside radius from operating point; negatives outside
      if (
        claims.explicitRadiusMiles != null &&
        locById.get(m.providerId)?.lat != null &&
        locById.get(m.providerId)?.lon != null
      ) {
        const loc = locById.get(m.providerId)!;
        const stateCounties = countiesForState(centroids, m.stateCode);
        const inside = countiesWithinRadius(
          loc.lat!,
          loc.lon!,
          claims.explicitRadiusMiles,
          stateCounties
        );
        for (const fips of inside) {
          if (!row.positiveCountyFips.includes(fips)) row.positiveCountyFips.push(fips);
        }
        row.negativeCountyFips = stateCounties
          .map((c) => c.countyFips)
          .filter((f) => !inside.includes(f));
        row.evidenceCompleteness = 'RADIUS_EXPLICIT';
        row.scorableForPrecision = true;
        row.reviewNotes.push(
          `RADIUS_EXPLICIT ${claims.explicitRadiusMiles}mi → ${inside.length} positive / ${row.negativeCountyFips.length} negative`
        );
      }

      if (claims.completeness === 'EXHAUSTIVE' && row.positiveCountyFips.length > 0) {
        const stateCounties = countiesForState(centroids, m.stateCode).map(
          (c) => c.countyFips
        );
        row.negativeCountyFips = stateCounties.filter(
          (f) => !row.positiveCountyFips.includes(f)
        );
        row.scorableForPrecision = true;
      }
    }
  }

  // Finalize unknown sets and precision scorability
  for (const row of byProvider.values()) {
    const stateCounties = countiesForState(centroids, row.stateCode).map(
      (c) => c.countyFips
    );
    const known = new Set([...row.positiveCountyFips, ...row.negativeCountyFips]);
    row.unknownCountyFips = stateCounties.filter((f) => !known.has(f));
    row.positiveCountyFips.sort();
    row.negativeCountyFips.sort();
    row.unknownCountyFips.sort();

    if (
      !row.scorableForPrecision &&
      (row.evidenceCompleteness === 'EXHAUSTIVE' ||
        row.evidenceCompleteness === 'RADIUS_EXPLICIT') &&
      row.negativeCountyFips.length > 0
    ) {
      row.scorableForPrecision = true;
    }

    // Franchise: keep home-county only; strip expansive website claims if unsafe
    if (row.franchiseSafetyHold && row.positiveCountyFips.length > 3) {
      const home = locById.get(row.providerId)?.countyFips;
      row.positiveCountyFips = home ? [home] : row.positiveCountyFips.slice(0, 1);
      row.negativeCountyFips = [];
      row.evidenceCompleteness = 'PARTIAL';
      row.scorableForPrecision = false;
      row.reviewNotes.push('franchise_safety_collapsed_to_home_county');
    }
  }

  return [...byProvider.values()].sort((a, b) =>
    a.providerId.localeCompare(b.providerId)
  );
}

export function summarizeExpandedReference(
  rows: readonly ExpandedReferenceProvider[]
) {
  const high = (state: 'FL' | 'WA') =>
    rows.filter(
      (r) =>
        r.stateCode === state &&
        r.evidenceQuality === 'HIGH' &&
        r.identityConfidence !== 'UNRESOLVED' &&
        r.positiveCountyFips.length > 0 &&
        !r.franchiseSafetyHold
    );
  const fl = high('FL');
  const wa = high('WA');
  const completeness: Record<string, number> = {};
  for (const r of rows) {
    completeness[r.evidenceCompleteness] =
      (completeness[r.evidenceCompleteness] ?? 0) + 1;
  }
  return {
    flHighConfidence: fl.length,
    waHighConfidence: wa.length,
    flBefore: 20,
    waBefore: 0,
    positiveCountyObservations: rows.reduce(
      (n, r) => n + r.positiveCountyFips.length,
      0
    ),
    negativeCountyObservations: rows.reduce(
      (n, r) => n + r.negativeCountyFips.length,
      0
    ),
    completeness,
    scorableForPrecision: rows.filter((r) => r.scorableForPrecision).length,
    quality: {
      HIGH: rows.filter((r) => r.evidenceQuality === 'HIGH').length,
      MEDIUM: rows.filter((r) => r.evidenceQuality === 'MEDIUM').length,
      LOW: rows.filter((r) => r.evidenceQuality === 'LOW').length,
    },
  };
}
