/**
 * Phase 4 profile quality + schema regression.
 * Run: npx tsx scripts/check-phase4-profiles-schema.ts
 */
import { assessProfileQuality } from '../lib/directory/profile-quality';
import { buildCompanyDirectorySchemaGraph } from '../lib/seo/build-company-directory-schema';
import type { Company } from '../types';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

const base = {
  id: 'c1',
  slug: 'acme-movers',
  name: 'Acme Movers',
  shortDescription: 'Interstate household goods research listing.',
  description: 'A longer description for research purposes with enough characters to pass thin checks.',
  foundedYear: 2001,
  headquarters: 'Austin, TX',
  website: 'https://example.com',
  usdotNumber: '1234567',
  mcNumber: 'MC-999999',
  fmcsaSafetyRating: 'Satisfactory' as const,
  fmcsaComplaints: 1,
  fmcsaShipments: 1000,
  bbbRating: 'A' as const,
  bbbAccredited: false,
  overallRating: 4.5,
  reviewCount: 40,
  reputationScore: 82,
  yearsInBusiness: 20,
  avgPricePerMove: 5000,
  priceRange: '$$',
  coverage: 'Continental US' as const,
  services: ['Full Service', 'Carrier'] as Company['services'],
  specialties: ['Military'],
  ratingBreakdown: {
    fiveStar: 20,
    fourStar: 15,
    threeStar: 3,
    twoStar: 1,
    oneStar: 1,
  },
  isVerified: true,
  lastUpdated: '2026-06-01',
  entityType: 'Carrier',
};

const strong = assessProfileQuality(base as Company);
assert(strong.indexable, 'strong profile indexable');

const thin = assessProfileQuality({
  ...(base as Company),
  usdotNumber: '',
  mcNumber: '',
  description: '',
  shortDescription: 'x',
  reviewCount: 0,
  overallRating: 0,
  fmcsaLastChecked: null,
  serviceScope: 'interstate',
});
assert(!thin.indexable, 'thin interstate stub not aggressively indexed');

const graph = buildCompanyDirectorySchemaGraph(base as Company);
const json = JSON.stringify(graph);
assert(!json.includes('"@type":"AggregateRating"'), 'no AggregateRating type in profile schema');
assert(!/"@type"\s*:\s*"Review"/.test(json), 'no Review nodes in profile schema');
assert(json.includes('Move Trust Hub Reputation Score'), 'reputation as PropertyValue');
assert(json.includes('BreadcrumbList'), 'breadcrumbs present');
assert(json.includes('USDOT'), 'USDOT identifier present');

const broker = buildCompanyDirectorySchemaGraph({
  ...(base as Company),
  entityType: 'Broker',
  services: ['Broker'] as Company['services'],
});
const brokerJson = JSON.stringify(broker);
assert(
  brokerJson.toLowerCase().includes('arrang') || brokerJson.includes('broker'),
  'broker role noted in schema description'
);
assert(!brokerJson.includes('MovingCompany') || brokerJson.includes('ProfessionalService'), 'broker not pure MovingCompany-only');

if (process.exitCode) {
  console.error('\nPhase 4 checks failed.');
  process.exit(1);
}
console.log('\nAll Phase 4 profile/schema checks passed.');
