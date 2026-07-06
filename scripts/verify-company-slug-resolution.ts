/**
 * Smoke test for company slug alias resolution.
 * Run: npx tsx scripts/verify-company-slug-resolution.ts
 */
import { resolveCompanyFromList, predictCompanyProfileSlug } from '../lib/directory/slug-resolution';
import type { Company } from '../types';

const sample: Company = {
  id: 'dot-3784776',
  slug: 'dot-3784776',
  name: 'America First Moving',
  shortDescription: 'Test',
  description: 'Test',
  foundedYear: 0,
  headquarters: 'Test, TX',
  website: '',
  usdotNumber: '3784776',
  mcNumber: '',
  fmcsaSafetyRating: 'Not Rated',
  fmcsaComplaints: 0,
  fmcsaShipments: 1000,
  bbbRating: 'NR',
  bbbAccredited: false,
  overallRating: 0,
  reviewCount: 0,
  reputationScore: 0,
  yearsInBusiness: 0,
  avgPricePerMove: 0,
  priceRange: '$$',
  coverage: 'Continental US',
  services: ['Full Service'],
  specialties: [],
  ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
  isVerified: true,
  lastUpdated: '2026-01-01',
};

const aliases = [
  'america-first-moving',
  'americafirstmoving',
  'America First Moving',
  'dot-3784776',
  '3784776',
];

let failed = 0;
for (const alias of aliases) {
  const found = resolveCompanyFromList([sample], alias);
  if (!found || found.name !== sample.name) {
    console.error(`FAIL: "${alias}" did not resolve to ${sample.name}`);
    failed++;
  } else {
    console.log(`OK: "${alias}" -> ${found.slug}`);
  }
}

const predicted = predictCompanyProfileSlug({ name: sample.name, usdot: sample.usdotNumber });
if (predicted !== 'america-first-moving') {
  console.error(`FAIL: predicted slug "${predicted}" expected "america-first-moving"`);
  failed++;
} else {
  console.log(`OK: predictCompanyProfileSlug -> ${predicted}`);
}

if (failed > 0) {
  process.exit(1);
}
console.log('\nAll slug resolution checks passed.');