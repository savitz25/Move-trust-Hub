/**
 * VERIFIED_HOME_COUNTY semantics — based/registered operating location only.
 * Does NOT claim pickup service throughout the county.
 */
import { loadFlWaCountyCentroids } from '@/lib/state-hhg/calibration/counties';
import type { CalibrationCohortMember } from '@/lib/state-hhg/calibration/types';
import type { OperatingLocationRecord } from '@/lib/state-hhg/calibration/types';
import {
  addressSupportsHomeCounty,
  classifyAddressQuality,
} from '@/lib/state-hhg/discovery/address-quality';
import type {
  HomeCountyAuditRow,
  ProviderLocalDiscoveryEvidence,
} from '@/lib/state-hhg/discovery/types';

const STATE_FIPS = { FL: '12', WA: '53' } as const;

export function buildHomeCountyAudit(input: {
  cohort: readonly CalibrationCohortMember[];
  locations: readonly OperatingLocationRecord[];
  retrievedAt?: string;
}): {
  rows: HomeCountyAuditRow[];
  evidence: ProviderLocalDiscoveryEvidence[];
  summary: {
    flEligible: number;
    flResolved: number;
    waEligible: number;
    waResolved: number;
    unresolved: number;
    byAddressQuality: Record<string, number>;
  };
} {
  const centroids = loadFlWaCountyCentroids();
  const locById = new Map(input.locations.map((l) => [l.providerId, l]));
  const retrievedAt = input.retrievedAt ?? new Date().toISOString();
  const rows: HomeCountyAuditRow[] = [];
  const evidence: ProviderLocalDiscoveryEvidence[] = [];
  const byAddressQuality: Record<string, number> = {};

  for (const m of input.cohort) {
    const loc = locById.get(m.providerId);
    const addressRaw =
      loc?.observedAddress ||
      m.stagingPhysicalAddress ||
      m.canonicalPhysicalAddress ||
      null;
    const quality = classifyAddressQuality(addressRaw);
    byAddressQuality[quality] = (byAddressQuality[quality] ?? 0) + 1;

    let blockReason: string | null = null;
    let homeCountyEligible = false;
    let countyFips: string | null = loc?.countyFips ?? null;
    let countyName: string | null = null;

    if (!addressSupportsHomeCounty(quality)) {
      blockReason = `address_quality_${quality}`;
    } else if (
      !loc ||
      (loc.geocodeStatus !== 'MATCH' && loc.geocodeStatus !== 'TIE') ||
      !loc.countyFips
    ) {
      blockReason = 'geocode_unresolved';
      countyFips = null;
    } else {
      const expected = STATE_FIPS[m.stateCode];
      if (!loc.countyFips.startsWith(expected)) {
        blockReason = 'county_outside_authority_state';
        countyFips = null;
      } else {
        homeCountyEligible = true;
        const c = centroids.find((x) => x.countyFips === loc.countyFips);
        countyName = c?.name ?? null;
      }
    }

    rows.push({
      providerId: m.providerId,
      stateCode: m.stateCode,
      legalName: m.legalName,
      canonicalName: m.canonicalName,
      authorityNumber: m.authorityNumber,
      addressRaw,
      addressQuality: quality,
      countyFips,
      countyName,
      geocodeStatus: loc?.geocodeStatus ?? null,
      homeCountyEligible,
      blockReason,
    });

    if (homeCountyEligible && countyFips) {
      evidence.push({
        providerId: m.providerId,
        stateCode: m.stateCode,
        countyFips,
        basis: 'VERIFIED_HOME_COUNTY',
        evidenceSource: loc?.source ?? 'regulator_operating_address',
        sourceUrl: null,
        observedAt: retrievedAt,
        confidence: 'HIGH',
        verificationState: 'VERIFIED',
        consumerEligible: true,
        notes: [
          'Means: based/registered at operating address in this county',
          'Does NOT mean: guarantees pickup throughout the county',
        ],
      });
    }
  }

  const fl = rows.filter((r) => r.stateCode === 'FL');
  const wa = rows.filter((r) => r.stateCode === 'WA');
  return {
    rows,
    evidence,
    summary: {
      flEligible: fl.length,
      flResolved: fl.filter((r) => r.homeCountyEligible).length,
      waEligible: wa.length,
      waResolved: wa.filter((r) => r.homeCountyEligible).length,
      unresolved: rows.filter((r) => !r.homeCountyEligible).length,
      byAddressQuality,
    },
  };
}

export function countyNameForFips(fips: string): string | null {
  const centroids = loadFlWaCountyCentroids();
  return centroids.find((c) => c.countyFips === fips)?.name ?? null;
}
