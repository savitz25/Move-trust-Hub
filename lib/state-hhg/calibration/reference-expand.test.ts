import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { parseServiceAreaClaims } from '@/lib/state-hhg/calibration/website-evidence';
import { evaluatePartialAware } from '@/lib/state-hhg/calibration/metrics-partial';
import { MODEL_A_BANDS } from '@/lib/state-hhg/calibration/types';
import type { ExpandedReferenceProvider } from '@/lib/state-hhg/calibration/reference-types';
import type {
  FleetObservation,
  OperatingLocationRecord,
} from '@/lib/state-hhg/calibration/types';
import type { CountyCentroid } from '@/lib/state-hhg/calibration/counties';
import { GOOGLE_PLACES_REQUESTS } from '@/lib/state-hhg/calibration/types';

describe('011C.1A reference remediation', () => {
  it('keeps google places at zero', () => {
    assert.equal(GOOGLE_PLACES_REQUESTS, 0);
  });

  it('parses radius-explicit claims', () => {
    const claim = parseServiceAreaClaims(
      'We serve customers within 40 miles of Seattle including Bellevue and Tacoma.',
      'WA'
    );
    assert.equal(claim.completeness, 'RADIUS_EXPLICIT');
    assert.equal(claim.explicitRadiusMiles, 40);
    assert.ok(claim.placeMentions.length >= 1);
  });

  it('treats partial lists as PARTIAL not exhaustive', () => {
    const claim = parseServiceAreaClaims(
      'Proudly serving Broward and Palm Beach County families.',
      'FL'
    );
    assert.equal(claim.completeness, 'PARTIAL');
  });

  it('does not count unmentioned counties as false positives for PARTIAL evidence', () => {
    const centroids: CountyCentroid[] = [
      {
        countyFips: '12011',
        stateFips: '12',
        name: 'Broward',
        lat: 26.1,
        lon: -80.2,
        bboxSpanMiles: 40,
      },
      {
        countyFips: '12099',
        stateFips: '12',
        name: 'Palm Beach',
        lat: 26.7,
        lon: -80.1,
        bboxSpanMiles: 50,
      },
      {
        countyFips: '12086',
        stateFips: '12',
        name: 'Miami-Dade',
        lat: 25.6,
        lon: -80.5,
        bboxSpanMiles: 60,
      },
    ];
    const ref: ExpandedReferenceProvider = {
      providerId: 'p1',
      stateCode: 'FL',
      canonicalName: 'P1',
      legalName: 'P1 LLC',
      sourceUrl: null,
      sourceType: 'home_county_operating_point',
      retrievedAt: '2026-08-21T00:00:00Z',
      evidenceCompleteness: 'PARTIAL',
      positiveCountyFips: ['12011'],
      negativeCountyFips: [],
      unknownCountyFips: ['12099', '12086'],
      originalPlaceStatements: ['Broward'],
      explicitRadiusMiles: null,
      explicitRegionText: null,
      identityConfidence: 'HIGH',
      evidenceQuality: 'HIGH',
      multiLocation: false,
      franchiseSafetyHold: false,
      reviewNotes: [],
      scorableForPrecision: false,
    };
    const loc: OperatingLocationRecord = {
      providerId: 'p1',
      stateCode: 'FL',
      observedAddress: 'x',
      addressType: 'regulator_physical',
      source: 'test',
      retrievedAt: '2026-08-21T00:00:00Z',
      normalizedAddress: 'x',
      city: null,
      postalCode: null,
      geocodeStatus: 'MATCH',
      lat: 26.12,
      lon: -80.14,
      countyFips: '12011',
      geocodeSource: 'census',
      geocodeConfidence: 0.9,
    };
    const fleet: FleetObservation = {
      providerId: 'p1',
      usdot: '1',
      powerUnits: 4,
      drivers: 4,
      mcs150Date: null,
      carrierOperation: null,
      observationDate: '2026-08-21T00:00:00Z',
      source: 'test',
      freshness: 'fresh',
    };
    const metrics = evaluatePartialAware({
      providerIds: ['p1'],
      refs: new Map([['p1', ref]]),
      locations: new Map([['p1', loc]]),
      fleets: new Map([['p1', fleet]]),
      centroids,
      bands: MODEL_A_BANDS,
      fixedRadiusMiles: null,
    });
    // Predicted nearby counties must not become FPs under PARTIAL
    assert.equal(metrics.falsePositives, 0);
    assert.equal(metrics.precision, null); // no exhaustive population
    assert.ok((metrics.recall ?? 0) > 0);
  });
});
