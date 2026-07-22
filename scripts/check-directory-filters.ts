import {
  companyMatchesCoverageFilter,
  normalizeCoverageFilter,
} from '../lib/directory/coverage-filter';
import { filterCompanies } from '../lib/directory/filter-companies';
import { companyMatchesServiceFilter } from '../lib/directory/service-filter';
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

// Type badge at top of card: USDOT + Full Service only → Carrier (not services array)
const carrierInferred: Company = {
  ...national,
  id: '3',
  slug: 'inferred-carrier',
  name: 'Inferred Carrier',
  usdotNumber: '7654321',
  entityType: null,
  services: ['Full Service'],
  serviceScope: null,
};
assert(
  companyMatchesServiceFilter(carrierInferred, 'Carrier'),
  'Carrier filter matches type badge (USDOT default Carrier)'
);
assert(
  !companyMatchesServiceFilter(carrierInferred, 'Broker'),
  'Broker filter does not match default Carrier badge'
);
assert(
  !companyMatchesServiceFilter(carrierInferred, 'Local Mover'),
  'Local Mover does not match USDOT carrier'
);

const brokerOnly: Company = {
  ...national,
  id: '4',
  slug: 'broker-co',
  entityType: 'Broker',
  services: ['Full Service'],
};
assert(companyMatchesServiceFilter(brokerOnly, 'Broker'), 'Broker badge matches Broker chip');
assert(
  !companyMatchesServiceFilter(brokerOnly, 'Carrier'),
  'Broker is not matched by Carrier chip'
);

const mixed: Company = {
  ...national,
  id: '5',
  slug: 'mixed-co',
  entityType: 'CARRIER/BROKER',
  services: ['Full Service'],
};
assert(
  companyMatchesServiceFilter(mixed, 'Carrier / Broker'),
  'Carrier/Broker badge matches chip'
);
assert(
  !companyMatchesServiceFilter(mixed, 'Carrier'),
  'Carrier/Broker is not pure Carrier'
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

// County filter: national without assignment should NOT flood county results
assert(
  !companyMatchesCoverageFilter(national, {
    mode: 'state',
    stateCode: 'CA',
    countySlugs: ['orange'],
  }),
  'national without county assignment excluded from county filter'
);

const assignedInterstate: Company = {
  ...national,
  id: '6',
  slug: 'assigned-interstate',
  coverageCounties: [{ stateSlug: 'california', countySlug: 'orange' }],
};
assert(
  companyMatchesCoverageFilter(assignedInterstate, {
    mode: 'state',
    stateCode: 'CA',
    countySlugs: ['orange'],
  }),
  'interstate with assignment matches county'
);

const filtered = filterCompanies([local, national], {
  services: ['Local Mover'],
});
assert(filtered.length === 1 && filtered[0]!.slug === 'local-co', 'filter Local Mover only');

// State filter prioritizes locals first
const ranked = filterCompanies([national, local], {
  coverageFilter: { mode: 'state', stateCode: 'CA', countySlugs: [] },
});
assert(
  ranked.length === 2 && ranked[0]!.slug === 'local-co',
  'state filter prioritizes Local Mover first'
);

// Explicit Carrier chip suppresses local boost (and excludes local)
const carrierOnly = filterCompanies([national, local], {
  coverageFilter: { mode: 'state', stateCode: 'CA' },
  services: ['Carrier'],
});
assert(
  carrierOnly.length === 1 && carrierOnly[0]!.slug === 'national-co',
  'Carrier chip on state filter keeps carriers only'
);

const cf = normalizeCoverageFilter({ coverage: 'East Coast' });
assert(cf.mode === 'regional' && cf.region === 'East Coast', 'legacy East Coast → regional');

const fromStateUrl = normalizeCoverageFilter({ state: 'AZ', counties: ['maricopa'] });
assert(
  fromStateUrl.mode === 'state' &&
    fromStateUrl.stateCode === 'AZ' &&
    fromStateUrl.countySlugs?.[0] === 'maricopa',
  'state + counties[] URL shorthand'
);

const fromCoverageState = normalizeCoverageFilter({
  coverage: 'state',
  state: 'AZ',
  counties: ['maricopa'],
});
assert(
  fromCoverageState.mode === 'state' && fromCoverageState.stateCode === 'AZ',
  'coverage=state&state=AZ URL form'
);

if (process.exitCode) process.exit(1);
console.log('\nDirectory filter checks passed.');
