import { generatedCounties } from '@/data/generated/index';
import { applyMissouriCountyOverrides } from '@/lib/local-movers/geography/missouri-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const missouriCounties = generatedCounties
  .filter((c) => c.stateSlug === 'missouri')
  .map(applyMissouriCountyOverrides);
const countyNameBySlug = new Map(missouriCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated MO county pages — expands as counties are researched */
const MO_COUNTY_NEIGHBORS: Record<string, string[]> = {
  'st-louis': ['st-louis-city', 'st-charles', 'jefferson', 'franklin', 'warren', 'lincoln'],
  jackson: ['clay', 'cass', 'lafayette', 'ray', 'johnson', 'platte'],
  'st-charles': ['st-louis', 'st-louis-city', 'warren', 'lincoln', 'franklin', 'jefferson'],
  greene: ['christian', 'webster', 'polk', 'dallas', 'lawrence'],
  'st-louis-city': ['st-louis', 'st-charles', 'jefferson'],
  clay: ['jackson', 'platte', 'ray', 'clinton', 'lafayette'],
  jefferson: ['st-louis', 'st-louis-city', 'franklin', 'ste-genevieve', 'st-francois', 'washington'],
  boone: ['callaway', 'audrain', 'randolph', 'moniteau', 'cooper', 'howard', 'cole'],
  jasper: ['newton', 'barton', 'cedar', 'dade', 'lawrence'],
  cass: ['jackson', 'johnson', 'bates', 'henry', 'lafayette', 'ray'],
  platte: ['clay', 'jackson', 'buchanan', 'clinton', 'ray'],
  franklin: ['jefferson', 'warren', 'washington', 'gasconade', 'crawford'],
  christian: ['greene', 'webster', 'stone', 'taney', 'lawrence'],
  'cape-girardeau': ['bollinger', 'perry', 'scott', 'stoddard', 'madison'],
  buchanan: ['platte', 'clinton', 'andrew', 'dekalb'],
  cole: ['boone', 'miller', 'callaway', 'moniteau', 'osage'],
  'st-francois': ['jefferson', 'ste-genevieve', 'washington', 'madison', 'perry'],
  lincoln: ['st-charles', 'pike', 'montgomery', 'warren', 'audrain'],
  newton: ['jasper', 'mcdonald', 'lawrence', 'barry', 'barton'],
  johnson: ['lafayette', 'henry', 'pettis', 'cass', 'jackson'],
  taney: ['stone', 'christian', 'ozark', 'douglas', 'boone'],
  pulaski: ['texas', 'laclede', 'camden', 'miller', 'phelps'],
  callaway: ['boone', 'cole', 'audrain', 'osage', 'gasconade'],
  phelps: ['pulaski', 'texas', 'dent', 'crawford', 'maries'],
  pettis: ['johnson', 'saline', 'benton', 'henry', 'phelps'],
  webster: ['greene', 'christian', 'laclede', 'wright', 'douglas'],
  camden: ['miller', 'morgan', 'pulaski', 'laclede', 'benton'],
  butler: ['wayne', 'ripley', 'carter', 'stoddard', 'oregon'],
  howell: ['texas', 'oregon', 'shannon', 'douglas', 'wright'],
  lawrence: ['jasper', 'newton', 'barry', 'christian', 'greene'],
  warren: ['st-charles', 'lincoln', 'montgomery', 'franklin', 'audrain'],
  scott: ['mississippi', 'new-madrid', 'stoddard', 'cape-girardeau', 'butler'],
  laclede: ['pulaski', 'camden', 'webster', 'dallas', 'miller'],
  barry: ['newton', 'mcdonald', 'stone', 'lawrence', 'jasper'],
  polk: ['dallas', 'greene', 'cedar', 'hickory', 'morgan'],
  lafayette: ['jackson', 'ray', 'carroll', 'saline', 'johnson'],
  stone: ['taney', 'christian', 'barry', 'lawrence'],
  marion: ['shelby', 'lewis', 'ralls', 'monroe', 'pike'],
  stoddard: ['scott', 'butler', 'dunklin', 'wayne', 'new-madrid'],
  dunklin: ['stoddard', 'butler', 'pemiscot', 'new-madrid'],
  texas: ['pulaski', 'laclede', 'wright', 'douglas', 'howell'],
  miller: ['camden', 'morgan', 'cole', 'osage', 'pulaski'],
  adair: ['putnam', 'sullivan', 'macon', 'schuyler', 'knox'],
};

export function getMissouriNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = MO_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  const seen = new Set<string>();
  return neighbors
    .filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return countyNameBySlug.has(slug);
    })
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/missouri/${slug}`,
    }));
}