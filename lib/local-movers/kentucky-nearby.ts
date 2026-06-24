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
  carter: ['greenup', 'boyd', 'elliott', 'rowan', 'lewis', 'lawrence'],
  lincoln: ['garrard', 'boyle', 'pulaski', 'casey', 'rockcastle', 'madison'],
  anderson: ['franklin', 'shelby', 'woodford', 'spencer', 'nelson', 'mercer'],
  rowan: ['carter', 'lewis', 'elliott', 'fleming', 'morgan', 'menifee'],
  harlan: ['leslie', 'perry', 'letcher', 'bell', 'knox', 'clay'],
  ohio: ['daviess', 'hancock', 'mclean', 'butler', 'grayson', 'breckinridge'],
  mercer: ['boyle', 'anderson', 'woodford', 'garrard', 'washington', 'jessamine'],
  allen: ['simpson', 'warren', 'barren', 'monroe', 'logan', 'edmonson'],
  bell: ['harlan', 'knox', 'whitley', 'leslie', 'clay', 'mccreary'],
  johnson: ['floyd', 'lawrence', 'martin', 'magoffin', 'morgan', 'pike'],
  breckinridge: ['ohio', 'hancock', 'grayson', 'meade', 'hardin', 'larue'],
  spencer: ['shelby', 'bullitt', 'nelson', 'jefferson', 'oldham', 'henry'],
  simpson: ['allen', 'warren', 'logan', 'butler', 'barren', 'edmonson'],
  hart: ['barren', 'edmonson', 'larue', 'hardin', 'green', 'grayson'],
  marion: ['taylor', 'washington', 'boyle', 'casey', 'nelson', 'mercer'],
  bourbon: ['clark', 'fayette', 'montgomery', 'harrison', 'nicholas', 'scott'],
  harrison: ['grant', 'bourbon', 'nicholas', 'pendleton', 'scott', 'owen'],
  letcher: ['harlan', 'perry', 'knott', 'pike', 'floyd', 'johnson'],
  wayne: ['whitley', 'mccreary', 'pulaski', 'russell', 'clinton', 'adair'],
  adair: ['taylor', 'casey', 'russell', 'wayne', 'green', 'cumberland'],
  clay: ['knox', 'harlan', 'leslie', 'perry', 'owsley', 'jackson'],
  russell: ['wayne', 'adair', 'casey', 'pulaski', 'cumberland', 'clinton'],
  garrard: ['lincoln', 'boyle', 'madison', 'fayette', 'mercer', 'rockcastle'],
  mccreary: ['wayne', 'whitley', 'pulaski', 'knox', 'laurel', 'bell'],
  mason: ['bracken', 'fleming', 'robertson', 'lewis', 'greenup', 'harrison'],
  henry: ['shelby', 'oldham', 'spencer', 'jefferson', 'trimble', 'owen'],
  casey: ['taylor', 'adair', 'russell', 'lincoln', 'pulaski', 'marion'],
  rockcastle: ['knox', 'laurel', 'pulaski', 'lincoln', 'garrard', 'madison'],
  fleming: ['mason', 'bracken', 'rowan', 'bath', 'nicholas', 'lewis'],
  lawrence: ['boyd', 'johnson', 'martin', 'floyd', 'morgan', 'carter'],
  larue: ['nelson', 'hardin', 'hart', 'green', 'marion', 'taylor'],
  pendleton: ['harrison', 'grant', 'bracken', 'robertson', 'owen', 'mason'],
  morgan: ['elliott', 'carter', 'rowan', 'wolfe', 'johnson', 'magoffin'],
  trigg: ['calloway', 'marshall', 'lyon', 'caldwell', 'christian', 'todd'],
  estill: ['powell', 'clark', 'madison', 'jackson', 'lee', 'menifee'],
  bath: ['montgomery', 'fleming', 'rowan', 'menifee', 'carter', 'nicholas'],
  jackson: ['rockcastle', 'laurel', 'clay', 'owsley', 'lee', 'estill'],
  knott: ['perry', 'breathitt', 'leslie', 'letcher', 'floyd', 'pike'],
  todd: ['christian', 'logan', 'muhlenberg', 'trigg', 'simpson', 'warren'],
  webster: ['hopkins', 'mclean', 'henderson', 'caldwell', 'crittenden', 'union'],
  lewis: ['mason', 'greenup', 'carter', 'rowan', 'fleming', 'bracken'],
  edmonson: ['warren', 'barren', 'hart', 'butler', 'grayson', 'hardin'],
  powell: ['clark', 'estill', 'menifee', 'wolfe', 'lee', 'montgomery'],
  caldwell: ['lyon', 'crittenden', 'webster', 'hopkins', 'trigg', 'marshall'],
  butler: ['edmonson', 'warren', 'ohio', 'muhlenberg', 'logan', 'simpson'],
  union: ['webster', 'henderson', 'mccracken', 'crittenden', 'livingston', 'hopkins'],
  washington: ['nelson', 'marion', 'mercer', 'boyle', 'larue', 'spencer'],
  breathitt: ['perry', 'knott', 'lee', 'owsley', 'floyd', 'magoffin'],
  green: ['taylor', 'adair', 'hart', 'larue', 'marion', 'metcalfe'],
  owen: ['grant', 'henry', 'franklin', 'pendleton', 'carroll', 'harrison'],
  monroe: ['barren', 'allen', 'simpson', 'cumberland', 'metcalfe', 'warren'],
  carroll: ['henry', 'trimble', 'owen', 'grant', 'jefferson', 'oldham'],
  magoffin: ['morgan', 'floyd', 'johnson', 'martin', 'elliott', 'wolfe'],
  martin: ['lawrence', 'johnson', 'floyd', 'pike', 'magoffin', 'elliott'],
  metcalfe: ['barren', 'green', 'hart', 'monroe', 'cumberland', 'adair'],
  leslie: ['perry', 'harlan', 'clay', 'bell', 'laurel', 'knott'],
  lyon: ['caldwell', 'trigg', 'marshall', 'livingston', 'crittenden', 'hopkins'],
  clinton: ['wayne', 'russell', 'cumberland', 'monroe', 'pulaski', 'mccreary'],
  hancock: ['ohio', 'daviess', 'breckinridge', 'meade', 'henderson', 'mclean'],
  mclean: ['hancock', 'ohio', 'webster', 'hopkins', 'muhlenberg', 'daviess'],
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