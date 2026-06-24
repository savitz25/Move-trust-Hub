import type { LocalCounty } from '@/lib/local-movers/types';

const MD = 'maryland';
const CODE = 'MD';

/** Baltimore City — independent city (county-equivalent), not in generated MD counties */
export const marylandSupplementalCounties: LocalCounty[] = [
  {
    slug: 'baltimore-city',
    name: 'Baltimore City',
    stateCode: CODE,
    stateSlug: MD,
    metro: 'baltimore-city-metro-md',
    seat: 'Baltimore',
  },
];