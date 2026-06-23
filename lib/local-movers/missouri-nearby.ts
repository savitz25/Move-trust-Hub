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
  audrain: ['boone', 'callaway', 'monroe', 'randolph', 'pike', 'ralls'],
  randolph: ['boone', 'audrain', 'monroe', 'howard', 'chariton', 'macon'],
  mcdonald: ['newton', 'barry', 'barton', 'jasper', 'lawrence'],
  washington: ['jefferson', 'st-francois', 'ste-genevieve', 'crawford', 'franklin'],
  ray: ['clay', 'jackson', 'lafayette', 'carroll', 'caldwell', 'platte'],
  saline: ['lafayette', 'carroll', 'howard', 'cooper', 'pettis', 'johnson'],
  crawford: ['phelps', 'washington', 'jefferson', 'franklin', 'gasconade', 'dent'],
  henry: ['johnson', 'cass', 'bates', 'benton', 'pettis', 'st-clair'],
  morgan: ['miller', 'camden', 'benton', 'pulaski', 'osage', 'cole'],
  clinton: ['clay', 'platte', 'buchanan', 'dekalb', 'caldwell', 'ray'],
  benton: ['henry', 'morgan', 'camden', 'miller', 'st-clair', 'hickory'],
  vernon: ['bates', 'cass', 'barton', 'cedar', 'st-clair', 'henry'],
  nodaway: ['buchanan', 'andrew', 'dekalb', 'gentry', 'holt', 'atchison'],
  wright: ['douglas', 'texas', 'laclede', 'webster', 'ozark', 'howell'],
  perry: ['cape-girardeau', 'bollinger', 'st-francois', 'madison', 'ste-genevieve'],
  'ste-genevieve': ['jefferson', 'st-francois', 'perry', 'washington', 'franklin'],
  andrew: ['buchanan', 'dekalb', 'nodaway', 'gentry', 'harrison', 'clinton'],
  dallas: ['polk', 'laclede', 'camden', 'webster', 'cedar', 'greene'],
  pike: ['lincoln', 'montgomery', 'audrain', 'ralls', 'marion', 'shelby'],
  cooper: ['boone', 'moniteau', 'morgan', 'osage', 'howard', 'chariton'],
  bates: ['cass', 'henry', 'vernon', 'st-clair', 'cedar', 'johnson'],
  moniteau: ['cole', 'boone', 'cooper', 'miller', 'morgan', 'osage'],
  macon: ['adair', 'sullivan', 'chariton', 'randolph', 'knox', 'linn'],
  'new-madrid': ['scott', 'mississippi', 'pemiscot', 'stoddard', 'dunklin'],
  gasconade: ['franklin', 'crawford', 'phelps', 'osage', 'callaway', 'montgomery'],
  cedar: ['polk', 'dade', 'barton', 'vernon', 'st-clair', 'henry'],
  livingston: ['linn', 'chariton', 'carroll', 'caldwell', 'daviess', 'grundy'],
  dent: ['phelps', 'crawford', 'texas', 'reynolds', 'iron', 'shannon'],
  pemiscot: ['dunklin', 'new-madrid', 'mississippi', 'stoddard', 'butler'],
  osage: ['cole', 'miller', 'morgan', 'gasconade', 'callaway', 'maries'],
  madison: ['st-francois', 'bollinger', 'perry', 'wayne', 'iron', 'jefferson'],
  douglas: ['ozark', 'wright', 'texas', 'howell', 'webster', 'christian'],
  mississippi: ['scott', 'new-madrid', 'pemiscot', 'dunklin', 'stoddard'],
  barton: ['jasper', 'vernon', 'cedar', 'dade', 'henry', 'newton'],
  linn: ['livingston', 'chariton', 'macon', 'sullivan', 'randolph', 'grundy'],
  montgomery: ['audrain', 'pike', 'warren', 'callaway', 'gasconade', 'lincoln'],
  bollinger: ['cape-girardeau', 'madison', 'wayne', 'stoddard', 'perry'],
  ripley: ['butler', 'oregon', 'carter', 'stoddard'],
  wayne: ['butler', 'madison', 'bollinger', 'iron', 'carter', 'reynolds'],
  ralls: ['marion', 'pike', 'audrain', 'shelby', 'monroe', 'lewis'],
  howard: ['boone', 'randolph', 'chariton', 'cooper', 'saline', 'audrain'],
  'st-clair': ['henry', 'benton', 'cedar', 'vernon', 'bates', 'hickory'],
  lewis: ['marion', 'shelby', 'knox', 'clark', 'pike'],
  grundy: ['livingston', 'dekalb', 'daviess', 'mercer', 'linn'],
  dekalb: ['clinton', 'gentry', 'andrew', 'buchanan', 'daviess', 'grundy'],
  ozark: ['douglas', 'wright', 'texas', 'howell', 'marion'],
  iron: ['washington', 'madison', 'wayne', 'reynolds', 'st-francois', 'dent'],
  hickory: ['polk', 'benton', 'st-clair', 'camden', 'morgan', 'dallas'],
  monroe: ['audrain', 'ralls', 'marion', 'shelby', 'randolph', 'lewis'],
  caldwell: ['livingston', 'ray', 'carroll', 'daviess', 'dekalb', 'grundy'],
  oregon: ['howell', 'ripley', 'carter', 'shannon', 'butler', 'douglas'],
  daviess: ['dekalb', 'grundy', 'harrison', 'livingston', 'caldwell', 'gentry'],
  carroll: ['ray', 'lafayette', 'saline', 'chariton', 'livingston', 'caldwell'],
  harrison: ['daviess', 'grundy', 'mercer', 'gentry', 'worth', 'nodaway'],
  maries: ['osage', 'pulaski', 'phelps', 'miller', 'cole', 'gasconade'],
  dade: ['jasper', 'cedar', 'barton', 'lawrence', 'greene', 'polk'],
  chariton: ['linn', 'livingston', 'randolph', 'howard', 'saline', 'macon'],
  shannon: ['carter', 'oregon', 'howell', 'dent', 'reynolds', 'texas'],
  gentry: ['nodaway', 'worth', 'harrison', 'daviess', 'andrew', 'dekalb'],
  clark: ['lewis', 'knox', 'scotland', 'marion', 'shelby', 'adair'],
  reynolds: ['iron', 'wayne', 'dent', 'shannon', 'madison', 'carter'],
  shelby: ['marion', 'monroe', 'knox', 'lewis', 'audrain', 'pike'],
  sullivan: ['putnam', 'adair', 'macon', 'linn', 'chariton', 'randolph'],
  carter: ['oregon', 'shannon', 'ripley', 'wayne', 'butler', 'reynolds'],
  atchison: ['holt', 'nodaway', 'worth', 'gentry', 'buchanan', 'fremont'],
  scotland: ['schuyler', 'knox', 'adair', 'putnam', 'clark', 'lewis'],
  putnam: ['sullivan', 'adair', 'schuyler', 'mercer', 'scotland', 'macon'],
  schuyler: ['scotland', 'putnam', 'adair', 'mercer', 'grundy', 'daviess'],
  mercer: ['grundy', 'harrison', 'putnam', 'schuyler', 'daviess', 'gentry'],
  worth: ['gentry', 'harrison', 'atchison', 'nodaway', 'dekalb', 'daviess'],
  holt: ['atchison', 'nodaway', 'andrew', 'buchanan', 'worth', 'gentry'],
  knox: ['adair', 'lewis', 'clark', 'shelby', 'marion', 'scotland', 'macon'],
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