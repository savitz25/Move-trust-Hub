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
  harvey: ['sedgwick', 'mcpherson', 'reno', 'butler', 'marion', 'cowley'],
  lyon: ['chase', 'greenwood', 'coffey', 'osage', 'morris', 'wabaunsee'],
  mcpherson: ['harvey', 'reno', 'saline', 'rice', 'marion', 'ellsworth'],
  montgomery: ['labette', 'cherokee', 'wilson', 'neosho', 'cowley', 'elk'],
  ellis: ['rush', 'norton', 'trego', 'russell', 'barton', 'phillips'],
  pottawatomie: ['riley', 'jackson', 'wabaunsee', 'shawnee', 'marshall', 'nemaha'],
  franklin: ['johnson', 'miami', 'douglas', 'anderson', 'coffey', 'osage'],
  barton: ['ellsworth', 'rice', 'stafford', 'rush', 'pawnee', 'russell'],
  sumner: ['sedgwick', 'cowley', 'harper', 'kingman', 'butler', 'reno'],
  seward: ['haskell', 'meade', 'stevens', 'grant', 'finney', 'gray'],
  labette: ['montgomery', 'neosho', 'cherokee', 'crawford', 'wilson', 'allen'],
  cherokee: ['crawford', 'labette', 'bourbon', 'neosho', 'wilson', 'montgomery'],
  dickinson: ['geary', 'marion', 'morris', 'clay', 'ottawa', 'saline'],
  jefferson: ['douglas', 'shawnee', 'jackson', 'atchison', 'leavenworth', 'osage'],
  atchison: ['leavenworth', 'jefferson', 'doniphan', 'brown', 'jackson', 'nemaha'],
  neosho: ['allen', 'woodson', 'wilson', 'crawford', 'labette', 'cherokee'],
  osage: ['lyon', 'coffey', 'franklin', 'wabaunsee', 'shawnee', 'douglas'],
  bourbon: ['crawford', 'cherokee', 'linn', 'allen', 'neosho', 'woodson'],
  jackson: ['shawnee', 'jefferson', 'pottawatomie', 'atchison', 'brown', 'wabaunsee'],
  allen: ['neosho', 'wilson', 'woodson', 'bourbon', 'anderson', 'coffey'],
  marion: ['harvey', 'mcpherson', 'butler', 'chase', 'morris', 'dickinson'],
  linn: ['miami', 'anderson', 'bourbon', 'allen', 'johnson', 'franklin'],
  nemaha: ['marshall', 'brown', 'jackson', 'pottawatomie', 'doniphan', 'riley'],
  marshall: ['nemaha', 'washington', 'pottawatomie', 'riley', 'clay', 'brown'],
  rice: ['mcpherson', 'reno', 'ellsworth', 'barton', 'stafford', 'cloud'],
  pratt: ['kingman', 'stafford', 'kiowa', 'edwards', 'barber', 'reno'],
  brown: ['nemaha', 'jackson', 'doniphan', 'atchison', 'jefferson', 'marshall'],
  cloud: ['clay', 'washington', 'republic', 'ottawa', 'mitchell', 'jewell'],
  coffey: ['lyon', 'osage', 'woodson', 'anderson', 'allen', 'greenwood'],
  wilson: ['neosho', 'montgomery', 'elk', 'chautauqua', 'allen', 'woodson'],
  anderson: ['franklin', 'linn', 'allen', 'coffey', 'miami', 'woodson'],
  clay: ['riley', 'washington', 'marshall', 'cloud', 'dickinson', 'geary'],
  thomas: ['sherman', 'sheridan', 'decatur', 'rawlins', 'wallace', 'norton'],
  doniphan: ['atchison', 'brown', 'jackson', 'jefferson', 'nemaha', 'marshall'],
  kingman: ['sedgwick', 'reno', 'pratt', 'sumner', 'harper', 'stafford'],
  grant: ['finney', 'seward', 'haskell', 'stevens', 'stanton', 'morton'],
  wabaunsee: ['shawnee', 'geary', 'pottawatomie', 'riley', 'morris', 'lyon'],
  russell: ['ellis', 'barton', 'ellsworth', 'osborne', 'lincoln', 'smith'],
  ellsworth: ['saline', 'mcpherson', 'rice', 'barton', 'russell', 'lincoln'],
  pawnee: ['barton', 'rush', 'stafford', 'edwards', 'hodgeman', 'ness'],
  greenwood: ['butler', 'lyon', 'chase', 'woodson', 'elk', 'wilson'],
  sherman: ['thomas', 'wallace', 'rawlins', 'decatur', 'sheridan', 'logan'],
  ottawa: ['saline', 'dickinson', 'cloud', 'clay', 'mitchell', 'lincoln'],
  washington: ['marshall', 'clay', 'cloud', 'riley', 'pottawatomie', 'republic'],
  mitchell: ['cloud', 'ottawa', 'lincoln', 'jewell', 'smith', 'osborne'],
  morris: ['geary', 'dickinson', 'lyon', 'wabaunsee', 'chase', 'marion'],
  harper: ['sumner', 'kingman', 'cowley', 'barber', 'pratt', 'reno'],
  norton: ['ellis', 'phillips', 'smith', 'graham', 'decatur', 'rawlins'],
  phillips: ['ellis', 'smith', 'norton', 'jewell', 'mitchell', 'rooks'],
  gray: ['finney', 'ford', 'seward', 'haskell', 'meade', 'scott'],
  stevens: ['seward', 'grant', 'haskell', 'meade', 'morton', 'stanton'],
  scott: ['finney', 'gray', 'lane', 'greeley', 'wallace', 'logan'],
republic: ['cloud', 'washington', 'marshall', 'jewell', 'smith', 'norton'],
  rooks: ['phillips', 'smith', 'osborne', 'ellis', 'graham', 'jewell'],
  stafford: ['rice', 'barton', 'reno', 'pratt', 'kingman', 'edwards'],
  barber: ['harper', 'kingman', 'pratt', 'kiowa', 'comanche', 'sumner'],
  smith: ['jewell', 'phillips', 'norton', 'republic', 'mitchell', 'osborne'],
  osborne: ['smith', 'mitchell', 'lincoln', 'russell', 'rooks', 'ellis'],
  woodson: ['wilson', 'allen', 'neosho', 'coffey', 'greenwood', 'elk'],
  graham: ['norton', 'decatur', 'rawlins', 'rooks', 'trego', 'ellis'],
  rawlins: ['thomas', 'sherman', 'cheyenne', 'decatur', 'graham', 'norton'],
  sheridan: ['thomas', 'sherman', 'decatur', 'rawlins', 'logan', 'graham'],
  kearny: ['finney', 'grant', 'hamilton', 'wichita', 'haskell', 'lane'],
  meade: ['gray', 'ford', 'clark', 'seward', 'haskell', 'finney'],
  haskell: ['finney', 'seward', 'grant', 'kearny', 'meade', 'gray'],
  chautauqua: ['elk', 'cowley', 'wilson', 'montgomery', 'labette', 'greenwood'],
  rush: ['ellis', 'norton', 'trego', 'pawnee', 'barton', 'ness'],
  lincoln: ['saline', 'ottawa', 'mitchell', 'ellsworth', 'russell', 'osborne'],
  jewell: ['republic', 'cloud', 'mitchell', 'smith', 'phillips', 'washington'],
  trego: ['ellis', 'rush', 'gove', 'ness', 'lane', 'graham'],
  decatur: ['sheridan', 'rawlins', 'norton', 'graham', 'thomas', 'sherman'],
  logan: ['sherman', 'wallace', 'greeley', 'scott', 'thomas', 'rawlins'],
  ness: ['rush', 'trego', 'lane', 'pawnee', 'gove', 'hodgeman'],
  gove: ['trego', 'ness', 'lane', 'scott', 'logan', 'graham'],
  edwards: ['pawnee', 'pratt', 'kiowa', 'barber', 'stafford', 'ness'],
  chase: ['lyon', 'greenwood', 'butler', 'marion', 'morris', 'wabaunsee'],
  clark: ['ford', 'meade', 'gray', 'comanche', 'kiowa', 'edwards'],
  comanche: ['barber', 'kiowa', 'clark', 'edwards', 'pratt', 'harper'],
  elk: ['wilson', 'chautauqua', 'greenwood', 'montgomery', 'cowley', 'woodson'],
  hodgeman: ['pawnee', 'edwards', 'ford', 'gray', 'ness', 'finney'],
  kiowa: ['barber', 'pratt', 'edwards', 'comanche', 'clark', 'kingman'],
  lane: ['finney', 'scott', 'gove', 'ness', 'trego', 'greeley'],
  morton: ['stevens', 'grant', 'stanton', 'seward', 'hamilton', 'haskell'],
  stanton: ['grant', 'stevens', 'morton', 'hamilton', 'seward', 'haskell'],
  cheyenne: ['rawlins', 'sherman', 'wallace', 'logan', 'decatur', 'thomas'],
  greeley: ['wallace', 'logan', 'scott', 'lane', 'wichita', 'hamilton'],
  hamilton: ['kearny', 'grant', 'stanton', 'morton', 'greeley', 'wichita'],
  wallace: ['sherman', 'logan', 'greeley', 'scott', 'thomas', 'cheyenne'],
  wichita: ['hamilton', 'greeley', 'scott', 'kearny', 'lane', 'wallace'],
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