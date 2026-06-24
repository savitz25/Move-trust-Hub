import type { LocalCounty } from '@/lib/local-movers/types';

const DC = 'district-of-columbia';
const CODE = 'DC';

/** District of Columbia — single jurisdiction treated as county-equivalent */
export const districtOfColumbiaCounties: LocalCounty[] = [
  {
    slug: 'district-of-columbia',
    name: 'District of Columbia',
    stateCode: CODE,
    stateSlug: DC,
    metro: 'washington-dc-metro-dc',
    seat: 'Washington',
  },
];