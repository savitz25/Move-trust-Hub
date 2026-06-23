import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Kansas counties */
export const kansasCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
  johnson: { seat: 'Olathe', metro: 'kansas-city-metro-ks' },
  sedgwick: { seat: 'Wichita', metro: 'wichita-metro-ks' },
  shawnee: { seat: 'Topeka', metro: 'topeka-metro-ks' },
  wyandotte: { seat: 'Kansas City', metro: 'kansas-city-metro-ks' },
  douglas: { seat: 'Lawrence', metro: 'lawrence-metro-ks' },
  leavenworth: { seat: 'Leavenworth', metro: 'kansas-city-metro-ks' },
  riley: { seat: 'Manhattan', metro: 'manhattan-metro-ks' },
  butler: { seat: 'El Dorado', metro: 'wichita-metro-east-ks' },
  reno: { seat: 'Hutchinson', metro: 'hutchinson-metro-ks' },
  saline: { seat: 'Salina', metro: 'salina-metro-ks' },
  crawford: { seat: 'Girard', metro: 'pittsburg-metro-ks' },
  finney: { seat: 'Garden City', metro: 'garden-city-metro-ks' },
  geary: { seat: 'Junction City', metro: 'junction-city-metro-ks' },
  miami: { seat: 'Paola', metro: 'kansas-city-metro-south-ks' },
  cowley: { seat: 'Winfield', metro: 'winfield-metro-ks' },
  ford: { seat: 'Dodge City', metro: 'dodge-city-metro-ks' },
  harvey: { seat: 'Newton', metro: 'wichita-metro-north-ks' },
  lyon: { seat: 'Emporia', metro: 'emporia-metro-ks' },
  mcpherson: { seat: 'McPherson', metro: 'mcpherson-metro-ks' },
  montgomery: { seat: 'Independence', metro: 'independence-metro-ks' },
  ellis: { seat: 'Hays', metro: 'hays-metro-ks' },
  pottawatomie: { seat: 'Westmoreland', metro: 'manhattan-metro-ks' },
  franklin: { seat: 'Ottawa', metro: 'ottawa-metro-ks' },
  barton: { seat: 'Great Bend', metro: 'great-bend-metro-ks' },
  sumner: { seat: 'Wellington', metro: 'wellington-metro-ks' },
  seward: { seat: 'Liberal', metro: 'liberal-metro-ks' },
  labette: { seat: 'Oswego', metro: 'parsons-metro-ks' },
  cherokee: { seat: 'Columbus', metro: 'columbus-metro-ks' },
  dickinson: { seat: 'Abilene', metro: 'abilene-metro-ks' },
  jefferson: { seat: 'Oskaloosa', metro: 'topeka-metro-northeast-ks' },
  atchison: { seat: 'Atchison', metro: 'atchison-metro-ks' },
  neosho: { seat: 'Erie', metro: 'chanute-metro-ks' },
  osage: { seat: 'Lyndon', metro: 'lyndon-metro-ks' },
  bourbon: { seat: 'Fort Scott', metro: 'fort-scott-metro-ks' },
  jackson: { seat: 'Holton', metro: 'holton-metro-ks' },
  allen: { seat: 'Iola', metro: 'iola-metro-ks' },
  marion: { seat: 'Marion', metro: 'marion-metro-ks' },
  linn: { seat: 'Mound City', metro: 'mound-city-metro-ks' },
  nemaha: { seat: 'Seneca', metro: 'seneca-metro-ks' },
  marshall: { seat: 'Marysville', metro: 'marysville-metro-ks' },
  rice: { seat: 'Lyons', metro: 'lyons-metro-ks' },
  pratt: { seat: 'Pratt', metro: 'pratt-metro-ks' },
  brown: { seat: 'Hiawatha', metro: 'hiawatha-metro-ks' },
  cloud: { seat: 'Concordia', metro: 'concordia-metro-ks' },
  coffey: { seat: 'Burlington', metro: 'burlington-metro-ks' },
  wilson: { seat: 'Fredonia', metro: 'fredonia-metro-ks' },
  anderson: { seat: 'Garnett', metro: 'garnett-metro-ks' },
};

export function applyKansasCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'kansas') return county;
  const override = kansasCountyOverrides[county.slug];
  return override ? { ...county, ...override } : county;
}