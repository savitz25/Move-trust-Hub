import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  RETIRED_RADIUS_MODELS,
  GOOGLE_PLACES_REQUESTS,
  CONSUMER_APPROVED_DISCOVERY_BASES,
  FUTURE_UI_COPY,
  DISCOVERY_EVIDENCE_PRECEDENCE,
} from '@/lib/state-hhg/discovery/types';
import {
  classifyAddressQuality,
  addressSupportsHomeCounty,
} from '@/lib/state-hhg/discovery/address-quality';
import {
  getLocalDiscoveryCandidates,
  ORIGIN_DESTINATION_CONTRACT,
} from '@/lib/state-hhg/discovery/query';
import { classifyNewProviderReadiness } from '@/lib/state-hhg/discovery/readiness';
import type { ProviderLocalDiscoveryEvidence } from '@/lib/state-hhg/discovery/types';
import { isFranchiseOrNetworkBrandName } from '@/lib/state-hhg/normalize';

describe('011D.1 conservative local discovery', () => {
  it('retires radius models and keeps Google at 0', () => {
    assert.equal(RETIRED_RADIUS_MODELS.POWER_UNIT_RADIUS, 'NOT_APPROVED');
    assert.equal(RETIRED_RADIUS_MODELS.FIXED_25, 'NOT_APPROVED');
    assert.equal(RETIRED_RADIUS_MODELS.FIXED_40, 'NOT_APPROVED');
    assert.equal(RETIRED_RADIUS_MODELS.FIXED_50, 'NOT_APPROVED');
    assert.equal(RETIRED_RADIUS_MODELS.consumerEnabled, false);
    assert.equal(GOOGLE_PLACES_REQUESTS, 0);
  });

  it('requires physical address; PO box fail-closed for home county', () => {
    assert.equal(classifyAddressQuality('PO Box 123, Miami FL'), 'PO_BOX');
    assert.equal(addressSupportsHomeCounty('PO_BOX'), false);
    assert.equal(addressSupportsHomeCounty('MAILING_ONLY'), false);
    assert.equal(
      classifyAddressQuality('100 Main St, Tampa, FL 33602'),
      'PHYSICAL_OPERATING'
    );
    assert.equal(addressSupportsHomeCounty('PHYSICAL_OPERATING'), true);
    assert.equal(addressSupportsHomeCounty('BUSINESS_ADDRESS'), true);
  });

  it('home county != service claim; unmentioned = UNKNOWN semantics', () => {
    // Semantic contract: home county evidence does not imply exclusive service
    const home: ProviderLocalDiscoveryEvidence = {
      providerId: 'p1',
      stateCode: 'FL',
      countyFips: '12099',
      basis: 'VERIFIED_HOME_COUNTY',
      evidenceSource: 'test',
      sourceUrl: null,
      observedAt: '2026-08-21T00:00:00Z',
      confidence: 'HIGH',
      verificationState: 'VERIFIED',
      consumerEligible: true,
      notes: ['based only'],
    };
    const explicit: ProviderLocalDiscoveryEvidence = {
      ...home,
      countyFips: '12011',
      basis: 'EXPLICIT_SERVICE_AREA',
      notes: ['PARTIAL positive only'],
    };
    // Unmentioned Broward-neighbor is simply absent — UNKNOWN, not negative
    assert.equal(home.basis, 'VERIFIED_HOME_COUNTY');
    assert.equal(explicit.basis, 'EXPLICIT_SERVICE_AREA');
    assert.ok(!CONSUMER_APPROVED_DISCOVERY_BASES.includes('DERIVED_EXPERIMENTAL'));
  });

  it('explicit evidence precedence over home county', () => {
    assert.deepEqual(
      [...DISCOVERY_EVIDENCE_PRECEDENCE],
      [
        'REGULATOR_TERRITORY',
        'EXPLICIT_SERVICE_AREA',
        'CURATED_VERIFIED',
        'VERIFIED_HOME_COUNTY',
      ]
    );
  });

  it('no adjacent / radius inference in query; origin vs destination separate', () => {
    assert.equal(
      ORIGIN_DESTINATION_CONTRACT.localDiscoveryCounty,
      'origin/pickup geography'
    );
    assert.equal(
      ORIGIN_DESTINATION_CONTRACT.stateAuthority,
      'legal same-state transportation eligibility'
    );

    const evidence: ProviderLocalDiscoveryEvidence[] = [
      {
        providerId: 'p1',
        stateCode: 'FL',
        countyFips: '12099',
        basis: 'VERIFIED_HOME_COUNTY',
        evidenceSource: 'test',
        sourceUrl: null,
        observedAt: '2026-08-21T00:00:00Z',
        confidence: 'HIGH',
        verificationState: 'VERIFIED',
        consumerEligible: true,
        notes: [],
      },
      {
        providerId: 'p1',
        stateCode: 'FL',
        countyFips: '12011',
        basis: 'DERIVED_EXPERIMENTAL',
        evidenceSource: 'adjacent_guess',
        sourceUrl: null,
        observedAt: '2026-08-21T00:00:00Z',
        confidence: 'LOW',
        verificationState: 'HISTORICAL',
        consumerEligible: false,
        notes: ['NOT APPROVED'],
      },
    ];

    const candidates = getLocalDiscoveryCandidates({
      state: 'FL',
      originCountyFips: '12011',
      evidence,
      providers: [
        {
          providerId: 'p1',
          canonicalName: 'Acme',
          legalName: 'Acme LLC',
          activeVerifiedAuthority: true,
          roleClass: 'mover',
        },
      ],
      authorities: [
        {
          providerId: 'p1',
          stateCode: 'FL',
          authorityNumber: 'IM1',
          authorityType: 'intrastate_mover_registration',
          status: 'active',
          verificationState: 'VERIFIED',
          roleClass: 'mover',
        },
      ],
    });
    // Adjacent experimental edge must not surface
    assert.equal(candidates.length, 0);

    const homeOnly = getLocalDiscoveryCandidates({
      state: 'FL',
      originCountyFips: '12099',
      evidence,
      providers: [
        {
          providerId: 'p1',
          canonicalName: 'Acme',
          legalName: 'Acme LLC',
          activeVerifiedAuthority: true,
          roleClass: 'mover',
        },
      ],
      authorities: [
        {
          providerId: 'p1',
          stateCode: 'FL',
          authorityNumber: 'IM1',
          authorityType: 'intrastate_mover_registration',
          status: 'active',
          verificationState: 'VERIFIED',
          roleClass: 'mover',
        },
      ],
    });
    assert.equal(homeOnly.length, 1);
    assert.equal(homeOnly[0].discoveryBasis, 'VERIFIED_HOME_COUNTY');
  });

  it('excludes broker-only, review, and unverified authority', () => {
    const evidence: ProviderLocalDiscoveryEvidence[] = [
      {
        providerId: 'broker1',
        stateCode: 'FL',
        countyFips: '12099',
        basis: 'VERIFIED_HOME_COUNTY',
        evidenceSource: 'test',
        sourceUrl: null,
        observedAt: '2026-08-21T00:00:00Z',
        confidence: 'HIGH',
        verificationState: 'VERIFIED',
        consumerEligible: true,
        notes: [],
      },
      {
        providerId: 'review1',
        stateCode: 'FL',
        countyFips: '12099',
        basis: 'VERIFIED_HOME_COUNTY',
        evidenceSource: 'test',
        sourceUrl: null,
        observedAt: '2026-08-21T00:00:00Z',
        confidence: 'HIGH',
        verificationState: 'VERIFIED',
        consumerEligible: true,
        notes: [],
      },
    ];
    const out = getLocalDiscoveryCandidates({
      state: 'FL',
      originCountyFips: '12099',
      evidence,
      providers: [
        {
          providerId: 'broker1',
          canonicalName: 'B',
          legalName: 'B',
          activeVerifiedAuthority: true,
          roleClass: 'broker',
          brokerOnly: true,
        },
        {
          providerId: 'review1',
          canonicalName: 'R',
          legalName: 'R',
          activeVerifiedAuthority: true,
          roleClass: 'mover',
          reviewRequired: true,
        },
      ],
      authorities: [
        {
          providerId: 'broker1',
          stateCode: 'FL',
          authorityNumber: 'X',
          authorityType: 'x',
          status: 'active',
          verificationState: 'VERIFIED',
          roleClass: 'mover',
        },
        {
          providerId: 'review1',
          stateCode: 'FL',
          authorityNumber: 'Y',
          authorityType: 'x',
          status: 'active',
          verificationState: 'VERIFIED',
          roleClass: 'mover',
        },
      ],
    });
    assert.equal(out.length, 0);
  });

  it('prefers EXPLICIT_SERVICE_AREA over VERIFIED_HOME_COUNTY', () => {
    const evidence: ProviderLocalDiscoveryEvidence[] = [
      {
        providerId: 'p1',
        stateCode: 'FL',
        countyFips: '12099',
        basis: 'VERIFIED_HOME_COUNTY',
        evidenceSource: 'home',
        sourceUrl: null,
        observedAt: '2026-08-21T00:00:00Z',
        confidence: 'HIGH',
        verificationState: 'VERIFIED',
        consumerEligible: true,
        notes: [],
      },
      {
        providerId: 'p1',
        stateCode: 'FL',
        countyFips: '12099',
        basis: 'EXPLICIT_SERVICE_AREA',
        evidenceSource: 'website',
        sourceUrl: 'https://example.com',
        observedAt: '2026-08-21T00:00:00Z',
        confidence: 'HIGH',
        verificationState: 'VERIFIED',
        consumerEligible: true,
        notes: [],
      },
    ];
    const out = getLocalDiscoveryCandidates({
      state: 'FL',
      originCountyFips: '12099',
      evidence,
      providers: [
        {
          providerId: 'p1',
          canonicalName: 'Acme',
          legalName: 'Acme',
          activeVerifiedAuthority: true,
          roleClass: 'mover',
        },
      ],
      authorities: [
        {
          providerId: 'p1',
          stateCode: 'FL',
          authorityNumber: 'IM1',
          authorityType: 'intrastate_mover_registration',
          status: 'active',
          verificationState: 'VERIFIED',
          roleClass: 'mover',
        },
      ],
    });
    assert.equal(out[0].discoveryBasis, 'EXPLICIT_SERVICE_AREA');
  });

  it('franchise isolation + new candidates remain non-public by design', () => {
    assert.equal(isFranchiseOrNetworkBrandName('Two Men and a Truck'), true);
    assert.equal(isFranchiseOrNetworkBrandName('College Hunks Hauling Junk'), true);
    assert.equal(isFranchiseOrNetworkBrandName('Good Greek Moving'), true);
    assert.equal(isFranchiseOrNetworkBrandName('Allied Van Lines'), true);

    const row = classifyNewProviderReadiness({
      stagingKey: 'FL:IM999',
      stateCode: 'FL',
      authorityNumber: 'IM999',
      legalName: 'Local Franchise LLC',
      dba: 'Two Men and a Truck of Somewhere',
      disposition: 'NEW_PROVIDER_CANDIDATE',
      statusNormalized: 'active',
      authorityStatus: 'active',
      roleClass: 'mover',
      usdot: null,
      phone: '5615551212',
      email: null,
      physicalAddress: '100 Main St, Boca Raton, FL 33432',
      countyFips: '12099',
      geocodeStatus: 'MATCH',
    });
    assert.equal(row.readiness, 'REVIEW_REQUIRED');
    assert.equal(row.franchiseHold, true);
  });

  it('ready candidate requires physical + resolvable home county', () => {
    const ready = classifyNewProviderReadiness({
      stagingKey: 'FL:IM1',
      stateCode: 'FL',
      authorityNumber: 'IM1',
      legalName: 'Palm Movers LLC',
      dba: null,
      disposition: 'NEW_PROVIDER_CANDIDATE',
      statusNormalized: 'active',
      authorityStatus: 'active',
      roleClass: 'mover',
      usdot: null,
      phone: '5615551212',
      email: 'a@b.com',
      physicalAddress: '100 Main St, West Palm Beach, FL 33401',
      countyFips: '12099',
      geocodeStatus: 'MATCH',
    });
    assert.equal(ready.readiness, 'READY_FOR_CANONICALIZATION');

    const po = classifyNewProviderReadiness({
      stagingKey: 'FL:IM2',
      stateCode: 'FL',
      authorityNumber: 'IM2',
      legalName: 'Mail Movers LLC',
      dba: null,
      disposition: 'NEW_PROVIDER_CANDIDATE',
      statusNormalized: 'active',
      authorityStatus: 'active',
      roleClass: 'mover',
      usdot: null,
      phone: '5615551212',
      email: null,
      physicalAddress: 'PO Box 99, West Palm Beach, FL 33401',
      countyFips: '12099',
      geocodeStatus: 'MATCH',
    });
    assert.equal(po.readiness, 'ADDRESS_UNRESOLVED');
  });

  it('future UI copy avoids unsafe guarantees', () => {
    for (const bad of FUTURE_UI_COPY.forbiddenWithoutEvidence) {
      assert.ok(!FUTURE_UI_COPY.homeCounty.locationLine.includes(bad));
      assert.ok(!FUTURE_UI_COPY.explicitService.line.includes(bad));
    }
    assert.match(FUTURE_UI_COPY.homeCounty.locationLine, /Based in/);
  });
});
