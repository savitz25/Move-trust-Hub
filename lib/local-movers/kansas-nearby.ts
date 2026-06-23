import { generatedCounties } from '@/data/generated/index';
import { applyKansasCountyOverrides } from '@/lib/local-movers/geography/kansas-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const kansasCounties = generatedCounties
  .filter((c) => c.stateSlug === 'kansas')
  .map(applyKansasCountyOverrides);
const countyNameBySlug = new Map(kansasCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated KS county pages — expands as counties are researched */
const KS_COUNTY_NEIGHBORS: Record<string, string[]> = {
  johnson: ['wyandotte', 'leavenworth', 'miami', 'douglas', 'franklin', 'anderson'],
  sedgwick: ['harvey', 'butler', 'sumner', 'reno', 'kingman', 'cowley'],
  shawnee: ['jackson', 'jefferson', 'douglas', 'osage', 'wabaunsee', 'pottawatomie'],
  wyandotte: ['johnson', 'leavenworth', 'douglas', 'miami', 'franklin', 'jefferson'],
  douglas: ['shawnee', 'jefferson', 'johnson', 'franklin', 'osage', 'leavenworth'],
  leavenworth: ['johnson', 'wyandotte', 'jefferson', 'douglas', 'atchison', 'miami'],
  riley: ['geary', 'pottawatomie', 'clay', 'washington', 'marshall', 'wabaunsee'],
  butler: ['sedgwick', 'cowley', 'greenwood', 'chase', 'marion', 'harvey'],
  reno: ['sedgwick', 'rice', 'mcpherson', 'harvey', 'kingman', 'stafford'],
  saline: ['ottawa', 'lincoln', 'ellsworth', 'mcpherson', 'dickinson', 'cloud'],
  crawford: ['cherokee', 'labette', 'bourbon', 'neosho', 'allen', 'wilson'],
  finney: ['gray', 'scott', 'seward', 'haskell', 'lane', 'grant'],
  geary: ['riley', 'morris', 'wabaunsee', 'dickinson', 'clay', 'pottawatomie'],
  miami: ['johnson', 'wyandotte', 'linn', 'anderson', 'franklin', 'douglas'],
  cowley: ['butler', 'sumner', 'chautauqua', 'elk', 'sedgwick', 'harvey'],
  ford: ['hodgeman', 'gray', 'meade', 'clark', 'edwards', 'kiowa'],
};

export function getKansasNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = KS_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = kansasCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}