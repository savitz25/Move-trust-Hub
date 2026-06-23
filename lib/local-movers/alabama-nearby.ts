import { generatedCounties } from '@/data/generated/index';
import { applyAlabamaCountyOverrides } from '@/lib/local-movers/geography/alabama-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const alabamaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'alabama')
  .map(applyAlabamaCountyOverrides);
const countyNameBySlug = new Map(alabamaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated AL county pages — expands as counties are researched */
const AL_COUNTY_NEIGHBORS: Record<string, string[]> = {
  jefferson: ['shelby', 'blount', 'walker', 'tuscaloosa', 'bibb', 'st-clair'],
  baldwin: ['mobile', 'escambia', 'conecuh', 'monroe', 'clarke', 'washington'],
  tuscaloosa: ['jefferson', 'bibb', 'hale', 'greene', 'pickens', 'fayette'],
  shelby: ['jefferson', 'chilton', 'coosa', 'talladega', 'st-clair', 'bibb'],
  montgomery: ['elmore', 'autauga', 'lowndes', 'macon', 'bullock', 'crenshaw'],
  lee: ['russell', 'macon', 'chambers', 'tallapoosa', 'elmore', 'bullock'],
  limestone: ['madison', 'morgan', 'lawrence', 'lauderdale', 'jackson', 'cullman'],
  morgan: ['limestone', 'madison', 'marshall', 'cullman', 'blount', 'etowah'],
  calhoun: ['etowah', 'cherokee', 'cleburne', 'talladega', 'st-clair', 'jefferson'],
  houston: ['henry', 'dale', 'coffee', 'geneva', 'barbour', 'covington'],
  etowah: ['calhoun', 'cherokee', 'dekalb', 'marshall', 'blount', 'jefferson'],
  marshall: ['morgan', 'jackson', 'dekalb', 'etowah', 'cullman', 'blount'],
};

export function getAlabamaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = AL_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = alabamaCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}