import assert from 'node:assert/strict';
import { test } from 'node:test';
import evidence from '@/data/fmcsa/auto-transport-evidence.json';
import {
  AUTO_TRANSPORT_EVIDENCE_USDOTS,
  getAutoTransportEvidence,
  hasSourceBackedAutoTransportEvidence,
} from '@/lib/directory/auto-transport-evidence';
import { companyMatchesServiceFilter } from '@/lib/directory/service-filter';
import type { Company } from '@/types';

function company(overrides: Partial<Company>): Company {
  return {
    id: 'test', slug: 'test', name: 'Auto Transport Name Is Not Evidence',
    shortDescription: '', description: '', headquarters: 'Ohio', website: '',
    usdotNumber: '', mcNumber: '', fmcsaSafetyRating: 'Not Rated', fmcsaComplaints: 0,
    fmcsaShipments: 0, bbbRating: 'NR', bbbAccredited: false, overallRating: 0,
    reviewCount: 0, reputationScore: 0, yearsInBusiness: 0, avgPricePerMove: 0,
    priceRange: '', coverage: 'National', services: ['Auto Transport'], specialties: [],
    ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
    isVerified: false, lastUpdated: '', authorityActive: true, outOfService: false,
    entityType: 'Carrier', serviceScope: 'interstate', ...overrides,
  };
}

test('artifact contains a unique exact-USDOT source cohort', () => {
  assert.equal(evidence.records.length, 268);
  assert.equal(new Set(AUTO_TRANSPORT_EVIDENCE_USDOTS).size, evidence.records.length);
  assert.ok(evidence.records.every((row) => /^\d+$/.test(row.usdot)));
  assert.ok(evidence.records.every((row) => row.motorVehicles || row.driveawayTowaway));
});

test('Auto Transport classification requires exact source-backed USDOT evidence', () => {
  const source = evidence.records[0];
  assert.ok(source);
  assert.equal(companyMatchesServiceFilter(company({ usdotNumber: source.usdot }), 'Auto Transport'), true);
  assert.equal(companyMatchesServiceFilter(company({ usdotNumber: '' }), 'Auto Transport'), false);
  assert.equal(companyMatchesServiceFilter(company({ usdotNumber: '999999999' }), 'Auto Transport'), false);
});

test('formatting around an exact USDOT is normalized without name matching', () => {
  const source = evidence.records[0];
  assert.ok(source);
  assert.equal(hasSourceBackedAutoTransportEvidence({ usdotNumber: `USDOT ${source.usdot}` }), true);
  assert.deepEqual(getAutoTransportEvidence(source.usdot)?.usdot, source.usdot);
});
