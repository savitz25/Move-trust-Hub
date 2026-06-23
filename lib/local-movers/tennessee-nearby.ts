import { tennesseeCounties } from '@/data/generated/states/tennessee';
import { applyTennesseeCountyOverrides } from '@/lib/local-movers/geography/tennessee-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const tnCounties = tennesseeCounties.map(applyTennesseeCountyOverrides);
const countyNameBySlug = new Map(tnCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for internal linking on TN county pages */
const TN_COUNTY_NEIGHBORS: Record<string, string[]> = {
  shelby: ['fayette', 'tipton', 'haywood', 'hardeman', 'lauderdale', 'crockett'],
  davidson: ['williamson', 'sumner', 'wilson', 'rutherford', 'robertson', 'cheatham'],
  knox: ['anderson', 'blount', 'loudon', 'union', 'grainger', 'sevier'],
  hamilton: ['bradley', 'marion', 'sequatchie', 'bledsoe', 'rhea', 'meigs'],
  rutherford: ['davidson', 'williamson', 'wilson', 'cannon', 'bedford', 'marshall'],
  williamson: ['davidson', 'rutherford', 'maury', 'marshall', 'cheatham', 'hickman'],
  montgomery: ['stewart', 'houston', 'dickson', 'robertson', 'cheatham', 'davidson'],
  sumner: ['davidson', 'wilson', 'robertson', 'macon', 'smith', 'trousdale'],
  wilson: ['sumner', 'davidson', 'rutherford', 'smith', 'dekalb', 'cannon'],
  sullivan: ['hawkins', 'washington', 'carter', 'johnson', 'unicoi', 'greene'],
  blount: ['knox', 'loudon', 'monroe', 'sevier', 'grainger', 'anderson'],
};

export function getTennesseeNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = TN_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = tnCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}