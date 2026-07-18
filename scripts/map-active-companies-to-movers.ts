import { readFileSync, writeFileSync } from 'node:fs';
import { fullMoversCatalog } from '../lib/local-movers/catalog';
import {
  isCuratedMover,
  evaluateCuratedListing,
} from '../lib/trust/curated-listing-policy';
import { companyToLocalMover } from '../lib/local-movers/company-to-local-mover';
import { directoryLocalMovers } from '../data/directory-local-movers';

const EXISTING_IDS = new Set([
  'amerisafe-van-lines',
  'international-van-lines',
  'american-van-lines',
  'colonial-van-lines',
  'moving-apt',
]);

const companies = JSON.parse(
  readFileSync('scripts/output/active-verified-companies.json', 'utf8')
) as Array<{
  slug: string;
  name: string;
  headquarters: string | null;
  usdot_number: string | null;
  mc_number: string | null;
  is_verified: boolean;
  overall_rating: number | null;
  review_count: number | null;
  services: unknown;
  specialties: unknown;
  coverage: string | null;
}>;

console.log('companies', companies.length);
console.log('directoryLocalMovers keys', Object.keys(directoryLocalMovers).length);
console.log('full catalog size', Object.keys(fullMoversCatalog).length);

type Row = {
  slug: string;
  moverId: string;
  curated: boolean;
  reason?: string;
  city: string;
  name: string;
  source: 'catalog' | 'built';
};

const rows: Row[] = [];
let curated = 0;

for (const c of companies) {
  const preferredId = EXISTING_IDS.has(c.slug)
    ? c.slug
    : `directory-${c.slug}`;
  const existing =
    fullMoversCatalog[preferredId] ||
    fullMoversCatalog[`directory-${c.slug}`] ||
    fullMoversCatalog[c.slug];

  if (existing) {
    const ok = isCuratedMover(existing);
    if (ok) curated++;
    rows.push({
      slug: c.slug,
      moverId: existing.id,
      curated: ok,
      city: existing.city,
      name: existing.name,
      source: 'catalog',
      reason: ok ? undefined : evaluateCuratedListing(existing).reason,
    });
    continue;
  }

  const built = companyToLocalMover({
    slug: c.slug,
    name: c.name,
    short_description: null,
    headquarters: c.headquarters,
    usdot_number: c.usdot_number,
    mc_number: c.mc_number,
    fmcsa_safety_rating: null,
    bbb_rating: null,
    overall_rating: c.overall_rating,
    review_count: c.review_count,
    services: c.services,
    specialties: c.specialties,
  });
  const v = evaluateCuratedListing(built);
  if (v.isDisplayable) curated++;
  rows.push({
    slug: c.slug,
    moverId: built.id,
    curated: v.isDisplayable,
    reason: v.reason,
    city: built.city,
    name: built.name,
    source: 'built',
  });
}

console.log({
  total: rows.length,
  curated,
  notCurated: rows.filter((r) => !r.curated).length,
  fromCatalog: rows.filter((r) => r.source === 'catalog').length,
  built: rows.filter((r) => r.source === 'built').length,
});

console.log(
  'not curated reasons',
  Object.entries(
    rows
      .filter((r) => !r.curated)
      .reduce(
        (acc, r) => {
          acc[r.reason || 'unknown'] = (acc[r.reason || 'unknown'] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      )
  )
);

writeFileSync(
  'scripts/output/active-companies-mover-map.json',
  JSON.stringify(rows, null, 2)
);
console.log('wrote scripts/output/active-companies-mover-map.json');
