import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterCompanies } from '@/lib/directory/filter-companies';
import type { Company } from '@/types';

function company(partial: Partial<Company>): Company {
  return {
    id: partial.id ?? 'c1',
    slug: partial.slug ?? 'c1',
    name: partial.name ?? 'Example',
    shortDescription: '',
    description: '',
    headquarters: 'Boise, ID',
    website: '',
    usdotNumber: '123',
    mcNumber: '',
    fmcsaSafetyRating: 'Not Rated',
    fmcsaComplaints: 0,
    fmcsaShipments: 0,
    bbbRating: 'NR',
    bbbAccredited: false,
    overallRating: 0,
    reviewCount: 0,
    reputationScore: 0,
    yearsInBusiness: 0,
    avgPricePerMove: 0,
    priceRange: '',
    coverage: 'Interstate household-goods authority — confirm origin and destination with this company',
    services: ['Carrier'],
    specialties: [],
    ratingBreakdown: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    },
    isVerified: true,
    lastUpdated: '2026-08-20',
    authorityActive: true,
    outOfService: false,
    entityType: 'Carrier',
    serviceScope: 'interstate',
    ...partial,
  };
}

test('price-low does not rank unknown prices as cheapest', () => {
  const scored = company({
    id: 'priced',
    slug: 'priced',
    avgPricePerMove: 4200,
    reputationScore: 80,
  });
  const unknown = company({ id: 'unknown', slug: 'unknown', avgPricePerMove: 0 });
  const result = filterCompanies([unknown, scored], { sort: 'price-low' });
  assert.equal(result[0]?.id, 'priced');
});

test('maxPrice filter excludes companies with no observed price', () => {
  const scored = company({ id: 'priced', slug: 'priced', avgPricePerMove: 2000 });
  const unknown = company({ id: 'unknown', slug: 'unknown', avgPricePerMove: 0 });
  const result = filterCompanies([unknown, scored], { maxPrice: 5000 });
  assert.deepEqual(
    result.map((row) => row.id),
    ['priced']
  );
});

test('search mode does not use reputation to break identity ties', () => {
  const highRep = company({
    id: 'z-high',
    slug: 'z-high',
    name: 'TWO MEN AND A TRUCK',
    headquarters: 'Zanesville, OH',
    usdotNumber: '999',
    reputationScore: 99,
  });
  const lowRep = company({
    id: 'a-low',
    slug: 'a-low',
    name: 'TWO MEN AND A TRUCK',
    headquarters: 'Austin, TX',
    usdotNumber: '111',
    reputationScore: 1,
  });
  const result = filterCompanies([highRep, lowRep], {
    search: 'TWO MEN AND A TRUCK',
    sort: 'relevance',
  });
  assert.equal(result[0]?.id, 'a-low');
});

test('complaint sort does not treat missing shipment volume as a perfect record', () => {
  const known = company({
    id: 'known',
    slug: 'known',
    fmcsaComplaints: 2,
    fmcsaShipments: 1000,
  });
  const unknown = company({ id: 'unknown', slug: 'unknown', fmcsaComplaints: 0, fmcsaShipments: 0 });
  const result = filterCompanies([unknown, known], { sort: 'complaints' });
  assert.equal(result[0]?.id, 'known');
});
