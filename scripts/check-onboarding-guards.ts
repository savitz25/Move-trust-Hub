/**
 * Unit checks for onboarding data-quality guards.
 * Run: npx tsx scripts/check-onboarding-guards.ts
 */
import {
  assertLocalPublishShape,
  computeContactFillSnapshot,
  filterCountiesToState,
  hasMinimumPublishContact,
  isUsablePhone,
  preferGoodContactField,
} from '../lib/suggestions/onboarding-guards';

function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('FAIL:', msg);
    process.exitCode = 1;
  } else {
    console.log('ok:', msg);
  }
}

assert(!isUsablePhone('(555) 555-5555'), 'rejects 555 placeholder');
assert(isUsablePhone('(541) 900-6565'), 'accepts real phone');

assert(
  preferGoodContactField('(541) 900-6565', '', 'phone') === '(541) 900-6565',
  'never overwrite phone with empty'
);
assert(
  preferGoodContactField('(541) 900-6565', '(555) 555-5555', 'phone') ===
    '(541) 900-6565',
  'never overwrite phone with 555'
);
assert(
  preferGoodContactField(null, '(541) 900-6565', 'phone') === '(541) 900-6565',
  'accepts new good phone'
);

assert(
  hasMinimumPublishContact({ phone: '(541) 900-6565' }),
  'min contact with phone'
);
assert(
  hasMinimumPublishContact({ website: 'https://example.com' }),
  'min contact with website'
);
assert(
  !hasMinimumPublishContact({ email: 'a@b.com' }),
  'email alone is not enough for min contact'
);

const mixed = filterCountiesToState(
  [
    { stateSlug: 'oregon', countySlug: 'douglas' },
    { stateSlug: 'minnesota', countySlug: 'hennepin' },
    { stateSlug: 'oregon', countySlug: 'lane' },
  ],
  'OR'
);
assert(mixed.length === 2, 'filters to Oregon counties only');
assert(
  mixed.every((c) => c.stateSlug === 'oregon'),
  'all remaining are oregon'
);

const local = assertLocalPublishShape({
  serviceScope: 'intrastate',
  usdot: '1234567',
});
assert(local.usdot === null, 'local publish nulls usdot');
assert(local.serviceScope === 'intrastate', 'keeps intrastate scope');

const fill = computeContactFillSnapshot({
  name: 'Otterly Elite Movers',
  address: 'Winston, OR',
  phone: '(541) 900-6565',
  email: null,
  website: 'https://otterlyelitemovers.com',
});
assert(fill.fillRate === 80, `fill rate 80% (got ${fill.fillRate})`);
assert(fill.hasPhone && fill.hasWebsite && !fill.hasEmail, 'fill flags');

if (process.exitCode) {
  console.error('\nOnboarding guard checks failed.');
  process.exit(1);
}
console.log('\nAll onboarding guard checks passed.');
