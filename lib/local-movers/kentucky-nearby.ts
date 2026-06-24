import { generatedCounties } from '@/data/generated/index';
import { applyKentuckyCountyOverrides } from '@/lib/local-movers/geography/kentucky-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const kentuckyCounties = generatedCounties
  .filter((c) => c.stateSlug === 'kentucky')
  .map(applyKentuckyCountyOverrides);
const countyNameBySlug = new Map(kentuckyCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated KY county pages — expands as counties are researched */
const KY_COUNTY_NEIGHBORS: Record<string, string[]> = {
  jefferson: ['bullitt', 'oldham', 'shelby', 'spencer', 'nelson', 'hardin'],
  fayette: ['madison', 'clark', 'bourbon', 'woodford', 'jessamine', 'scott'],
  kenton: ['campbell', 'boone', 'grant', 'pendleton', 'bracken', 'gallatin'],
  warren: ['butler', 'edmonson', 'barren', 'simpson', 'allen', 'logan'],
  boone: ['kenton', 'campbell', 'gallatin', 'grant', 'pendleton', 'bracken'],
  hardin: ['jefferson', 'bullitt', 'nelson', 'larue', 'breckinridge', 'meade'],
  daviess: ['hancock', 'mclean', 'ohio', 'muhlenberg', 'henderson', 'webster'],
  madison: ['fayette', 'jackson', 'rockcastle', 'garrard', 'estill', 'clay'],
  campbell: ['boone', 'kenton', 'pendleton', 'bracken', 'mason', 'grant'],
  bullitt: ['jefferson', 'nelson', 'hardin', 'spencer', 'shelby', 'larue'],
  oldham: ['jefferson', 'henry', 'trimble', 'shelby', 'spencer', 'bullitt'],
  christian: ['todd', 'logan', 'simpson', 'trigg', 'muhlenberg', 'caldwell'],
  pulaski: ['laurel', 'mccreary', 'wayne', 'casey', 'russell', 'lincoln'],
  mccracken: ['marshall', 'graves', 'ballard', 'livingston', 'crittenden', 'carlisle'],
  laurel: ['pulaski', 'whitley', 'knox', 'clay', 'jackson', 'rockcastle'],
  scott: ['fayette', 'franklin', 'bourbon', 'woodford', 'harrison', 'grant'],
  jessamine: ['fayette', 'garrard', 'madison', 'woodford', 'mercer', 'anderson'],
  pike: ['floyd', 'martin', 'johnson', 'letcher', 'knott', 'harlan'],
  franklin: ['anderson', 'woodford', 'shelby', 'henry', 'owen', 'scott'],
  shelby: ['jefferson', 'oldham', 'spencer', 'bullitt', 'henry', 'franklin'],
  nelson: ['hardin', 'bullitt', 'larue', 'washington', 'marion', 'spencer'],
  boyd: ['greenup', 'lawrence', 'carter', 'elliott', 'johnson', 'lewis'],
  barren: ['warren', 'hart', 'metcalfe', 'monroe', 'allen', 'edmonson'],
  hopkins: ['christian', 'muhlenberg', 'webster', 'caldwell', 'mclean', 'daviess'],
  henderson: ['daviess', 'webster', 'union', 'mclean', 'hancock', 'hopkins'],
  calloway: ['marshall', 'graves', 'henry', 'trigg', 'lyon', 'mccracken'],
  clark: ['fayette', 'bourbon', 'powell', 'estill', 'madison', 'montgomery'],
  whitley: ['laurel', 'knox', 'bell', 'mccreary', 'wayne', 'clinton'],
  graves: ['mccracken', 'calloway', 'marshall', 'hickman', 'carlisle', 'ballard'],
  greenup: ['boyd', 'carter', 'lewis', 'lawrence', 'elliott', 'rowan'],
  floyd: ['pike', 'johnson', 'martin', 'knott', 'magoffin', 'lawrence'],
  boyle: ['mercer', 'lincoln', 'casey', 'garrard', 'marion', 'taylor'],
  marshall: ['mccracken', 'graves', 'calloway', 'livingston', 'lyon', 'trigg'],
  meade: ['hardin', 'breckinridge', 'hancock', 'bullitt', 'jefferson', 'larue'],
  muhlenberg: ['hopkins', 'christian', 'todd', 'logan', 'butler', 'mclean'],
  knox: ['laurel', 'whitley', 'bell', 'harlan', 'clay', 'rockcastle'],
  logan: ['simpson', 'warren', 'butler', 'muhlenberg', 'todd', 'christian'],
  montgomery: ['clark', 'bourbon', 'bath', 'powell', 'menifee', 'rowan'],
  woodford: ['fayette', 'franklin', 'scott', 'anderson', 'jessamine', 'mercer'],
  grayson: ['hardin', 'breckinridge', 'hancock', 'edmonson', 'hart', 'ohio'],
  taylor: ['marion', 'casey', 'green', 'larue', 'adair', 'russell'],
  grant: ['boone', 'pendleton', 'owen', 'scott', 'harrison', 'kenton'],
  perry: ['knott', 'leslie', 'harlan', 'breathitt', 'clay', 'floyd'],
};

export function getKentuckyNearbyCounties(
  countySlug: string
): NearbyCountyLink[] {
  const neighbors = KY_COUNTY_NEIGHBORS[countySlug];
  if (!neighbors) return [];

  return neighbors
    .map((slug) => {
      const name = countyNameBySlug.get(slug);
      if (!name) return null;
      return { slug, name, stateSlug: 'kentucky' as const };
    })
    .filter((link): link is NearbyCountyLink => link !== null);
}