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
    'meathead-movers-eureka',
    'california-regional-moving',
    'california-capital-movers',
    'california-family-movers',
  ],
  'el-dorado': [
    'mother-lode-van-storage-sacramento',
    'mountain-lake-mover-tahoe',
    'tahoe-moving-storage-truckee',
    'california-capital-movers',
    'california-family-movers',
    'ernies-moving-sacramento',
  ],
  fresno: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
    'california-express-movers',
    'california-family-movers',
    'california-capital-movers',
    'california-county-moving-co',
    'ernies-moving-sacramento',
  ],
  glenn: [
    'two-men-and-a-truck-chico',
    'dj-professional-movers-chico',
    'california-capital-movers',
    'california-family-movers',
    'california-county-moving-co',
  ],
  kern: [
    'hills-moving-storage-bakersfield',
    'two-men-and-a-truck-bakersfield',
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
    'california-express-movers',
    'california-family-movers',
    'california-capital-movers',
  ],
  kings: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
    'california-express-movers',
    'california-family-movers',
  ],
  lake: [
    'humboldt-moving-storage-eureka',
    'meathead-movers-eureka',
    'california-regional-moving',
    'california-capital-movers',
    'mother-lode-van-storage-sacramento',
    'two-men-and-a-truck-chico',
  ],
  humboldt: [
    'humboldt-moving-storage-eureka',
    'meathead-movers-eureka',
    'california-regional-moving',
    'california-capital-movers',
    'california-family-movers',
    'california-county-moving-co',
  ],
  imperial: [
    'moving-masters-imperial',
    'california-premier-moving',
    'california-pro-movers',
    'california-local-lines',
    'california-express-movers',
    'california-county-moving-co',
  ],
  inyo: [
    'on-track-moving-bishop',
    'mountain-lake-mover-tahoe',
    'mother-lode-van-storage-sacramento',
    'california-capital-movers',
    'california-family-movers',
  ],
  lassen: [
    'two-men-and-a-truck-chico',
    'dj-professional-movers-chico',
    'mother-lode-van-storage-sacramento',
    'california-capital-movers',
  ],
  'los-angeles': [
    'piece-of-cake-moving-losangeles',
    'booth-movers-losangeles',
    'white-glove-moving-losangeles',
    'zip-to-zip-moving-losangeles',
    'optimum-moving-losangeles',
    'all-my-sons-losangeles',
    'gentle-giant-losangeles',
    'pure-moving-losangeles',
    'meathead-movers-california',
    'la-metro-moving',
  ],
  madera: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
    'california-express-movers',
    'california-family-movers',
    'california-capital-movers',
  ],
  marin: [
    'piece-of-cake-moving-marin',
    'booth-movers-marin',
    'white-glove-moving-marin',
    'zip-to-zip-moving-marin',
    'optimum-moving-marin',
    'all-my-sons-marin',
    'morningstar-moving-marin',
    'prodigy-moving-storage-bay-area',
  ],
  mariposa: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'california-express-movers',
    'california-family-movers',
  ],
  mendocino: [
    'humboldt-moving-storage-eureka',
    'meathead-movers-eureka',
    'california-regional-moving',
    'california-capital-movers',
    'california-family-movers',
    'california-county-moving-co',
  ],
  merced: [
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'meathead-movers-california',
    'california-express-movers',
    'california-family-movers',
    'california-capital-movers',
    'california-county-moving-co',
  ],
  modoc: [
    'two-men-and-a-truck-chico',
    'dj-professional-movers-chico',
    'mother-lode-van-storage-sacramento',
    'california-capital-movers',
  ],
  mono: [
    'on-track-moving-bishop',
    'mountain-lake-mover-tahoe',
    'tahoe-moving-storage-truckee',
    'mother-lode-van-storage-sacramento',
  ],
  monterey: [
    'meathead-movers-california',
    'california-premier-moving',
    'california-pro-movers',
    'california-local-lines',
    'california-regional-moving',
    'meathead-movers-fresno',
    'two-men-and-a-truck-fresno',
    'california-express-movers',
  ],
  napa: [
    'piece-of-cake-moving-marin',
    'booth-movers-marin',
    'morningstar-moving-marin',
    'roadway-moving-bay-area',
    'prodigy-moving-storage-bay-area',
    'meathead-movers-california',
    'california-regional-moving',
  ],
  nevada: [
    'mother-lode-van-storage-sacramento',
    'california-capital-movers',
    'california-family-movers',
    'california-county-moving-co',
    'ernies-moving-sacramento',
    'california-regional-moving',
  ],
  orange: [
    'piece-of-cake-moving-orange-ca',
    'booth-movers-orange-ca',
    'white-glove-moving-orange-ca',
    'zip-to-zip-moving-orange-ca',
    'optimum-moving-orange-ca',
    'all-my-sons-orange-ca',
    'gentle-giant-orange-ca',
    'pure-moving-orange-ca',
    'meathead-movers-california',
    'california-premier-moving',
  ],
  placer: [
    'mother-lode-van-storage-sacramento',
    'mountain-lake-mover-tahoe',
    'tahoe-moving-storage-truckee',
    'california-capital-movers',
    'california-family-movers',
    'ernies-moving-sacramento',
    'california-county-moving-co',
  ],
  plumas: [
    'two-men-and-a-truck-chico',
    'dj-professional-movers-chico',
    'mother-lode-van-storage-sacramento',
    'california-capital-movers',
  ],
  riverside: [
    'california-premier-moving',
    'california-pro-movers',
    'california-local-lines',
    'california-express-movers',
    'meathead-movers-california',
    'piece-of-cake-moving-orange-ca',
    'booth-movers-orange-ca',
    'all-my-sons-orange-ca',
  ],
  sacramento: [
    'mother-lode-van-storage-sacramento',
    'ernies-moving-sacramento',
    'california-capital-movers',
    'california-family-movers',
    'california-county-moving-co',
    'california-regional-moving',
    'california-express-movers',
    'california-local-lines',
  ],
  'san-benito': [
    'fairprice-movers-bay-area',
    'sunny-moving-company-bay-area',
    'meathead-movers-california',
    'california-premier-moving',
    'california-regional-moving',
  ],
  'san-bernardino': [
    'piece-of-cake-moving-sanbernardino',
    'booth-movers-sanbernardino',
    'white-glove-moving-sanbernardino',
    'zip-to-zip-moving-sanbernardino',
    'optimum-moving-sanbernardino',
    'all-my-sons-sanbernardino',
    'california-premier-moving',
    'california-pro-movers',
    'meathead-movers-california',
    'california-express-movers',
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