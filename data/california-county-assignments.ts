import { californiaCounties } from '@/lib/local-movers/geography/california';
import { metroMoverPools } from '@/data/local-movers-seed';
import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated lists — Grok-researched counties + high-traffic metros */
const CURATED_CA_COUNTIES: Record<string, string[]> = {
  alameda: [
    'morningstar-moving-alameda',
    'got2move-alameda',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'meathead-movers-california',
    'sunny-moving-company-bay-area',
    'fairprice-movers-bay-area',
    'california-regional-moving',
  ],
  alpine: [
    'mountain-lake-mover-tahoe',
    'tahoe-moving-storage-truckee',
    'mother-lode-van-storage-sacramento',
    'california-capital-movers',
    'california-family-movers',
  ],
  amador: [
    'mother-lode-van-storage-sacramento',
    'california-capital-movers',
    'california-family-movers',
    'california-county-moving-co',
    'ernies-moving-sacramento',
  ],
  butte: [
    'two-men-and-a-truck-chico',
    'dj-professional-movers-chico',
    'california-capital-movers',
    'mother-lode-van-storage-sacramento',
    'california-family-movers',
    'ernies-moving-sacramento',
    'california-county-moving-co',
  ],
  calaveras: [
    'mother-lode-van-storage-sacramento',
    'california-capital-movers',
    'california-family-movers',
    'california-county-moving-co',
    'ernies-moving-sacramento',
  ],
  colusa: [
    'california-capital-movers',
    'california-family-movers',
    'california-county-moving-co',
    'mother-lode-van-storage-sacramento',
    'two-men-and-a-truck-chico',
  ],
  'contra-costa': [
    'morningstar-moving-contracosta',
    'got2move-contracosta',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'meathead-movers-california',
    'sunny-moving-company-bay-area',
    'fairprice-movers-bay-area',
    'california-regional-moving',
  ],
  'del-norte': [
    'humboldt-moving-storage-eureka',
    'meathead-movers-california',
    'california-regional-moving',
    'california-capital-movers',
    'california-family-movers',
  ],
};

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickFromMetroPool(
  metroId: string | undefined,
  countySlug: string,
  targetCount: number
): string[] {
  if (!metroId) return [];
  const pool = metroMoverPools[metroId]?.moverIds ?? [];
  if (!pool.length) return [];

  const offset = hashSlug(countySlug) % pool.length;
  const picked: string[] = [];

  for (let i = 0; picked.length < targetCount && i < pool.length * 2; i++) {
    const id = pool[(offset + i) % pool.length];
    if (!picked.includes(id)) picked.push(id);
  }

  return picked;
}

function moverCountForCounty(countySlug: string): number {
  return 3 + (hashSlug(countySlug) % 3);
}

/** Curated counties get hand-ranked lists; others use metro pool until researched */
export const californiaCountyMoverAssignments: CountyMoverAssignment[] =
  californiaCounties.map((county) => {
    const curated = CURATED_CA_COUNTIES[county.slug];
    if (curated) {
      return {
        stateSlug: 'california',
        countySlug: county.slug,
        moverIds: curated,
      };
    }

    const count = moverCountForCounty(county.slug);
    const moverIds = pickFromMetroPool(county.metro, county.slug, count);

    return {
      stateSlug: 'california',
      countySlug: county.slug,
      moverIds,
    };
  });