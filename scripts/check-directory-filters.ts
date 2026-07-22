import { companyMatchesServiceFilter } from '../lib/fmcsa/derive-directory-services';
import {
  companyMatchesCoverageFilter,
  normalizeCoverageFilter,
} from '../lib/directory/coverage-filter';
import { filterCompanies } from '../lib/directory/filter-companies';
import type { Company } from '../types';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL', msg);
    process.exitCode = 1;
  } else {
    console.log('ok', msg);
  }
}

const local: Company = {
  id: '1',
  slug: 'local-co',
  name: 'Local Co',
  shortDescription: '',
  description: '',
  foundedYear: 0,
  headquarters: 'Irvine, CA',
  website: '',
  usdotNumber: '',
  mcNumber: '',
  fmcsaSafetyRating: 'Not Rated',
  fmcsaComplaints: 0,
  fmcsaShipments: 1,
  bbbRating: 'NR',
  bbbAccredited: false,
  overallRating: 4,
  reviewCount: 10,
  reputationScore: 50,
  yearsInBusiness: 5,
  avgPricePerMove: 2000,
  priceRange: '$$',
  coverage: 'Local / in-state',
  services: ['Full Service'],
  specialties: [],
  ratingBreakdown: { fiveStar: 0, fourStar: 0, threeStar: 0, twoStar: 0, oneStar: 0 },
  isVerified: true,
  lastUpdated: '',
  serviceScope: 'intrastate',
  coverageCounties: [
    { stateSlug: 'california', countySlug: 'orange' },
    { stateSlug: 'california', countySlug: 'los-angeles' },
  ],
};

const national: Company = {
  ...local,
  id: '2',
  slug: 'national-co',
  name: 'National Co',
  usdotNumber: '1234567',
  serviceScope: 'interstate',
  coverage: 'All 50 States',
  services: ['Carrier'],
  entityType: 'Carrier',
  coverageCounties: [],
  headquarters: 'Dallas, TX',
};

assert(
  companyMatchesServiceFilter(local, 'Local Mover'),
  'Local Mover service matches intrastate'
);
assert(
  !companyMatchesServiceFilter(national, 'Local Mover'),
  'Local Mover does not match interstate'
);
assert(
  companyMatchesServiceFilter(national, 'Carrier'),
  'Carrier service matches entity/services'
);

assert(
  companyMatchesCoverageFilter(national, { mode: 'national' }),
  'national coverage matches national company'
);
assert(
  !companyMatchesCoverageFilter(local, { mode: 'national' }),
  'national coverage excludes local'
);
assert(
  companyMatchesCoverageFilter(local, {
    mode: 'state',
    stateCode: 'CA',
    countySlugs: ['orange'],
  }),
  'local matches CA orange county'
);
assert(
  !companyMatchesCoverageFilter(local, {
    mode: 'state',
    stateCode: 'CA',
    countySlugs: ['san-diego'],
  }),
  'local excludes unlisted county'
);
assert(
  companyMatchesCoverageFilter(national, { mode: 'state', stateCode: 'CA' }),
  'national company serves any state'
);

const filtered = filterCompanies([local, national], {
  services: ['Local Mover'],
});
assert(filtered.length === 1 && filtered[0]!.slug === 'local-co', 'filter Local Mover only');

const cf = normalizeCoverageFilter({ coverage: 'East Coast' });
assert(cf.mode === 'regional' && cf.region === 'East Coast', 'legacy East Coast → regional');

if (process.exitCode) process.exit(1);
console.log('\nDirectory filter checks passed.');
