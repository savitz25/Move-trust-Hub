import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** North Dakota curated county corridor links — 25/53 */
const ND_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  cass: [
    { slug: 'traill', name: 'Traill', seat: 'Hillsboro', href: '/local-movers/north-dakota/traill', displayLabel: 'Traill County, ND' },
    { slug: 'steele', name: 'Steele', seat: 'Finley', href: '/local-movers/north-dakota/steele', displayLabel: 'Steele County, ND' },
    { slug: 'griggs', name: 'Griggs', seat: 'Cooperstown', href: '/local-movers/north-dakota/griggs', displayLabel: 'Griggs County, ND' },
    { slug: 'clay', name: 'Clay', seat: 'Moorhead', href: '/local-movers/minnesota/clay', displayLabel: 'Clay County, MN' },
    { slug: 'otter-tail', name: 'Otter Tail', seat: 'Fergus Falls', href: '/local-movers/minnesota/otter-tail', displayLabel: 'Otter Tail County, MN' },
  ],
  burleigh: [
    { slug: 'morton', name: 'Morton', seat: 'Mandan', href: '/local-movers/north-dakota/morton', displayLabel: 'Morton County, ND' },
    { slug: 'oliver', name: 'Oliver', seat: 'Center', href: '/local-movers/north-dakota/oliver', displayLabel: 'Oliver County, ND' },
    { slug: 'mclean', name: 'McLean', seat: 'Washburn', href: '/local-movers/north-dakota/mclean', displayLabel: 'McLean County, ND' },
    { slug: 'kidder', name: 'Kidder', seat: 'Steele', href: '/local-movers/north-dakota/kidder', displayLabel: 'Kidder County, ND' },
    { slug: 'campbell', name: 'Campbell', seat: 'Mound City', href: '/local-movers/south-dakota/campbell', displayLabel: 'Campbell County, SD' },
  ],
  'grand-forks': [
    { slug: 'walsh', name: 'Walsh', seat: 'Grafton', href: '/local-movers/north-dakota/walsh', displayLabel: 'Walsh County, ND' },
    { slug: 'pembina', name: 'Pembina', seat: 'Cavalier', href: '/local-movers/north-dakota/pembina', displayLabel: 'Pembina County, ND' },
    { slug: 'steele', name: 'Steele', seat: 'Finley', href: '/local-movers/north-dakota/steele', displayLabel: 'Steele County, ND' },
    { slug: 'traill', name: 'Traill', seat: 'Hillsboro', href: '/local-movers/north-dakota/traill', displayLabel: 'Traill County, ND' },
    { slug: 'polk', name: 'Polk', seat: 'Crookston', href: '/local-movers/minnesota/polk', displayLabel: 'Polk County, MN' },
  ],
  ward: [
    { slug: 'pierce', name: 'Pierce', seat: 'Rugby', href: '/local-movers/north-dakota/pierce', displayLabel: 'Pierce County, ND' },
    { slug: 'bottineau', name: 'Bottineau', seat: 'Bottineau', href: '/local-movers/north-dakota/bottineau', displayLabel: 'Bottineau County, ND' },
    { slug: 'mclean', name: 'McLean', seat: 'Washburn', href: '/local-movers/north-dakota/mclean', displayLabel: 'McLean County, ND' },
    { slug: 'mountrail', name: 'Mountrail', seat: 'Stanley', href: '/local-movers/north-dakota/mountrail', displayLabel: 'Mountrail County, ND' },
    { slug: 'mchenry', name: 'McHenry', seat: 'Towner', href: '/local-movers/north-dakota/mchenry', displayLabel: 'McHenry County, ND' },
  ],
  williams: [
    { slug: 'mckenzie', name: 'McKenzie', seat: 'Watford City', href: '/local-movers/north-dakota/mckenzie', displayLabel: 'McKenzie County, ND' },
    { slug: 'mountrail', name: 'Mountrail', seat: 'Stanley', href: '/local-movers/north-dakota/mountrail', displayLabel: 'Mountrail County, ND' },
    { slug: 'burke', name: 'Burke', seat: 'Bowbells', href: '/local-movers/north-dakota/burke', displayLabel: 'Burke County, ND' },
    { slug: 'divide', name: 'Divide', seat: 'Crosby', href: '/local-movers/north-dakota/divide', displayLabel: 'Divide County, ND' },
    { slug: 'richland', name: 'Richland', seat: 'Sidney', href: '/local-movers/montana/richland', displayLabel: 'Richland County, MT' },
  ],
  morton: [
    { slug: 'burleigh', name: 'Burleigh', seat: 'Bismarck', href: '/local-movers/north-dakota/burleigh', displayLabel: 'Burleigh County, ND' },
    { slug: 'mercer', name: 'Mercer', seat: 'Stanton', href: '/local-movers/north-dakota/mercer', displayLabel: 'Mercer County, ND' },
    { slug: 'stark', name: 'Stark', seat: 'Dickinson', href: '/local-movers/north-dakota/stark', displayLabel: 'Stark County, ND' },
    { slug: 'oliver', name: 'Oliver', seat: 'Center', href: '/local-movers/north-dakota/oliver', displayLabel: 'Oliver County, ND' },
    { slug: 'perkins', name: 'Perkins', seat: 'Bison', href: '/local-movers/south-dakota/perkins', displayLabel: 'Perkins County, SD' },
  ],
  stark: [
    { slug: 'dunn', name: 'Dunn', seat: 'Killdeer', href: '/local-movers/north-dakota/dunn', displayLabel: 'Dunn County, ND' },
    { slug: 'morton', name: 'Morton', seat: 'Mandan', href: '/local-movers/north-dakota/morton', displayLabel: 'Morton County, ND' },
    { slug: 'grant', name: 'Grant', seat: 'Carson', href: '/local-movers/north-dakota/grant', displayLabel: 'Grant County, ND' },
    { slug: 'hettinger', name: 'Hettinger', seat: 'Mott', href: '/local-movers/north-dakota/hettinger', displayLabel: 'Hettinger County, ND' },
    { slug: 'harding', name: 'Harding', seat: 'Buffalo', href: '/local-movers/south-dakota/harding', displayLabel: 'Harding County, SD' },
  ],
  stutsman: [
    { slug: 'barnes', name: 'Barnes', seat: 'Valley City', href: '/local-movers/north-dakota/barnes', displayLabel: 'Barnes County, ND' },
    { slug: 'lamoure', name: 'LaMoure', seat: 'LaMoure', href: '/local-movers/north-dakota/lamoure', displayLabel: 'LaMoure County, ND' },
    { slug: 'kidder', name: 'Kidder', seat: 'Steele', href: '/local-movers/north-dakota/kidder', displayLabel: 'Kidder County, ND' },
    { slug: 'foster', name: 'Foster', seat: 'Carrington', href: '/local-movers/north-dakota/foster', displayLabel: 'Foster County, ND' },
    { slug: 'logan', name: 'Logan', seat: 'Napoleon', href: '/local-movers/north-dakota/logan', displayLabel: 'Logan County, ND' },
  ],
  richland: [
    { slug: 'cass', name: 'Cass', seat: 'Fargo', href: '/local-movers/north-dakota/cass', displayLabel: 'Cass County, ND' },
    { slug: 'ransom', name: 'Ransom', seat: 'Lisbon', href: '/local-movers/north-dakota/ransom', displayLabel: 'Ransom County, ND' },
    { slug: 'lamoure', name: 'LaMoure', seat: 'LaMoure', href: '/local-movers/north-dakota/lamoure', displayLabel: 'LaMoure County, ND' },
    { slug: 'sargent', name: 'Sargent', seat: 'Forman', href: '/local-movers/north-dakota/sargent', displayLabel: 'Sargent County, ND' },
    { slug: 'wilkin', name: 'Wilkin', seat: 'Breckenridge', href: '/local-movers/minnesota/wilkin', displayLabel: 'Wilkin County, MN' },
  ],
  mckenzie: [
    { slug: 'williams', name: 'Williams', seat: 'Williston', href: '/local-movers/north-dakota/williams', displayLabel: 'Williams County, ND' },
    { slug: 'mountrail', name: 'Mountrail', seat: 'Stanley', href: '/local-movers/north-dakota/mountrail', displayLabel: 'Mountrail County, ND' },
    { slug: 'dunn', name: 'Dunn', seat: 'Killdeer', href: '/local-movers/north-dakota/dunn', displayLabel: 'Dunn County, ND' },
    { slug: 'mclean', name: 'McLean', seat: 'Washburn', href: '/local-movers/north-dakota/mclean', displayLabel: 'McLean County, ND' },
    { slug: 'billings', name: 'Billings', seat: 'Medora', href: '/local-movers/north-dakota/billings', displayLabel: 'Billings County, ND' },
  ],
  rolette: [
    { slug: 'bottineau', name: 'Bottineau', seat: 'Bottineau', href: '/local-movers/north-dakota/bottineau', displayLabel: 'Bottineau County, ND' },
    { slug: 'pierce', name: 'Pierce', seat: 'Rugby', href: '/local-movers/north-dakota/pierce', displayLabel: 'Pierce County, ND' },
    { slug: 'benson', name: 'Benson', seat: 'Minnewaukan', href: '/local-movers/north-dakota/benson', displayLabel: 'Benson County, ND' },
    { slug: 'towner', name: 'Towner', seat: 'Cando', href: '/local-movers/north-dakota/towner', displayLabel: 'Towner County, ND' },
  ],
  ramsey: [
    { slug: 'benson', name: 'Benson', seat: 'Minnewaukan', href: '/local-movers/north-dakota/benson', displayLabel: 'Benson County, ND' },
    { slug: 'walsh', name: 'Walsh', seat: 'Grafton', href: '/local-movers/north-dakota/walsh', displayLabel: 'Walsh County, ND' },
    { slug: 'pembina', name: 'Pembina', seat: 'Cavalier', href: '/local-movers/north-dakota/pembina', displayLabel: 'Pembina County, ND' },
    { slug: 'nelson', name: 'Nelson', seat: 'Lakota', href: '/local-movers/north-dakota/nelson', displayLabel: 'Nelson County, ND' },
    { slug: 'cavalier', name: 'Cavalier', seat: 'Langdon', href: '/local-movers/north-dakota/cavalier', displayLabel: 'Cavalier County, ND' },
  ],
  barnes: [
    { slug: 'cass', name: 'Cass', seat: 'Fargo', href: '/local-movers/north-dakota/cass', displayLabel: 'Cass County, ND' },
    { slug: 'stutsman', name: 'Stutsman', seat: 'Jamestown', href: '/local-movers/north-dakota/stutsman', displayLabel: 'Stutsman County, ND' },
    { slug: 'ransom', name: 'Ransom', seat: 'Lisbon', href: '/local-movers/north-dakota/ransom', displayLabel: 'Ransom County, ND' },
    { slug: 'steele', name: 'Steele', seat: 'Finley', href: '/local-movers/north-dakota/steele', displayLabel: 'Steele County, ND' },
    { slug: 'griggs', name: 'Griggs', seat: 'Cooperstown', href: '/local-movers/north-dakota/griggs', displayLabel: 'Griggs County, ND' },
  ],
  walsh: [
    { slug: 'pembina', name: 'Pembina', seat: 'Cavalier', href: '/local-movers/north-dakota/pembina', displayLabel: 'Pembina County, ND' },
    { slug: 'grand-forks', name: 'Grand Forks', seat: 'Grand Forks', href: '/local-movers/north-dakota/grand-forks', displayLabel: 'Grand Forks County, ND' },
    { slug: 'ramsey', name: 'Ramsey', seat: 'Devils Lake', href: '/local-movers/north-dakota/ramsey', displayLabel: 'Ramsey County, ND' },
    { slug: 'nelson', name: 'Nelson', seat: 'Lakota', href: '/local-movers/north-dakota/nelson', displayLabel: 'Nelson County, ND' },
    { slug: 'marshall', name: 'Marshall', seat: 'Warren', href: '/local-movers/minnesota/marshall', displayLabel: 'Marshall County, MN' },
  ],
  mclean: [
    { slug: 'burleigh', name: 'Burleigh', seat: 'Bismarck', href: '/local-movers/north-dakota/burleigh', displayLabel: 'Burleigh County, ND' },
    { slug: 'ward', name: 'Ward', seat: 'Minot', href: '/local-movers/north-dakota/ward', displayLabel: 'Ward County, ND' },
    { slug: 'mountrail', name: 'Mountrail', seat: 'Stanley', href: '/local-movers/north-dakota/mountrail', displayLabel: 'Mountrail County, ND' },
    { slug: 'mercer', name: 'Mercer', seat: 'Stanton', href: '/local-movers/north-dakota/mercer', displayLabel: 'Mercer County, ND' },
    { slug: 'mckenzie', name: 'McKenzie', seat: 'Watford City', href: '/local-movers/north-dakota/mckenzie', displayLabel: 'McKenzie County, ND' },
  ],
  mountrail: [
    { slug: 'ward', name: 'Ward', seat: 'Minot', href: '/local-movers/north-dakota/ward', displayLabel: 'Ward County, ND' },
    { slug: 'williams', name: 'Williams', seat: 'Williston', href: '/local-movers/north-dakota/williams', displayLabel: 'Williams County, ND' },
    { slug: 'mckenzie', name: 'McKenzie', seat: 'Watford City', href: '/local-movers/north-dakota/mckenzie', displayLabel: 'McKenzie County, ND' },
    { slug: 'dunn', name: 'Dunn', seat: 'Killdeer', href: '/local-movers/north-dakota/dunn', displayLabel: 'Dunn County, ND' },
    { slug: 'mclean', name: 'McLean', seat: 'Washburn', href: '/local-movers/north-dakota/mclean', displayLabel: 'McLean County, ND' },
  ],
  mercer: [
    { slug: 'morton', name: 'Morton', seat: 'Mandan', href: '/local-movers/north-dakota/morton', displayLabel: 'Morton County, ND' },
    { slug: 'mclean', name: 'McLean', seat: 'Washburn', href: '/local-movers/north-dakota/mclean', displayLabel: 'McLean County, ND' },
    { slug: 'dunn', name: 'Dunn', seat: 'Killdeer', href: '/local-movers/north-dakota/dunn', displayLabel: 'Dunn County, ND' },
    { slug: 'stark', name: 'Stark', seat: 'Dickinson', href: '/local-movers/north-dakota/stark', displayLabel: 'Stark County, ND' },
    { slug: 'oliver', name: 'Oliver', seat: 'Center', href: '/local-movers/north-dakota/oliver', displayLabel: 'Oliver County, ND' },
  ],
  traill: [
    { slug: 'cass', name: 'Cass', seat: 'Fargo', href: '/local-movers/north-dakota/cass', displayLabel: 'Cass County, ND' },
    { slug: 'grand-forks', name: 'Grand Forks', seat: 'Grand Forks', href: '/local-movers/north-dakota/grand-forks', displayLabel: 'Grand Forks County, ND' },
    { slug: 'steele', name: 'Steele', seat: 'Finley', href: '/local-movers/north-dakota/steele', displayLabel: 'Steele County, ND' },
    { slug: 'griggs', name: 'Griggs', seat: 'Cooperstown', href: '/local-movers/north-dakota/griggs', displayLabel: 'Griggs County, ND' },
    { slug: 'norman', name: 'Norman', seat: 'Ada', href: '/local-movers/minnesota/norman', displayLabel: 'Norman County, MN' },
  ],
  pembina: [
    { slug: 'walsh', name: 'Walsh', seat: 'Grafton', href: '/local-movers/north-dakota/walsh', displayLabel: 'Walsh County, ND' },
    { slug: 'cavalier', name: 'Cavalier', seat: 'Langdon', href: '/local-movers/north-dakota/cavalier', displayLabel: 'Cavalier County, ND' },
    { slug: 'ramsey', name: 'Ramsey', seat: 'Devils Lake', href: '/local-movers/north-dakota/ramsey', displayLabel: 'Ramsey County, ND' },
    { slug: 'kittson', name: 'Kittson', seat: 'Hallock', href: '/local-movers/minnesota/kittson', displayLabel: 'Kittson County, MN' },
  ],
  bottineau: [
    { slug: 'pierce', name: 'Pierce', seat: 'Rugby', href: '/local-movers/north-dakota/pierce', displayLabel: 'Pierce County, ND' },
    { slug: 'ward', name: 'Ward', seat: 'Minot', href: '/local-movers/north-dakota/ward', displayLabel: 'Ward County, ND' },
    { slug: 'rolette', name: 'Rolette', seat: 'Rolla', href: '/local-movers/north-dakota/rolette', displayLabel: 'Rolette County, ND' },
    { slug: 'benson', name: 'Benson', seat: 'Minnewaukan', href: '/local-movers/north-dakota/benson', displayLabel: 'Benson County, ND' },
    { slug: 'mchenry', name: 'McHenry', seat: 'Towner', href: '/local-movers/north-dakota/mchenry', displayLabel: 'McHenry County, ND' },
  ],
  benson: [
    { slug: 'ramsey', name: 'Ramsey', seat: 'Devils Lake', href: '/local-movers/north-dakota/ramsey', displayLabel: 'Ramsey County, ND' },
    { slug: 'pierce', name: 'Pierce', seat: 'Rugby', href: '/local-movers/north-dakota/pierce', displayLabel: 'Pierce County, ND' },
    { slug: 'rolette', name: 'Rolette', seat: 'Rolla', href: '/local-movers/north-dakota/rolette', displayLabel: 'Rolette County, ND' },
    { slug: 'nelson', name: 'Nelson', seat: 'Lakota', href: '/local-movers/north-dakota/nelson', displayLabel: 'Nelson County, ND' },
    { slug: 'eddy', name: 'Eddy', seat: 'New Rockford', href: '/local-movers/north-dakota/eddy', displayLabel: 'Eddy County, ND' },
  ],
  ransom: [
    { slug: 'cass', name: 'Cass', seat: 'Fargo', href: '/local-movers/north-dakota/cass', displayLabel: 'Cass County, ND' },
    { slug: 'barnes', name: 'Barnes', seat: 'Valley City', href: '/local-movers/north-dakota/barnes', displayLabel: 'Barnes County, ND' },
    { slug: 'richland', name: 'Richland', seat: 'Wahpeton', href: '/local-movers/north-dakota/richland', displayLabel: 'Richland County, ND' },
    { slug: 'lamoure', name: 'LaMoure', seat: 'LaMoure', href: '/local-movers/north-dakota/lamoure', displayLabel: 'LaMoure County, ND' },
    { slug: 'sargent', name: 'Sargent', seat: 'Forman', href: '/local-movers/north-dakota/sargent', displayLabel: 'Sargent County, ND' },
  ],
  lamoure: [
    { slug: 'ransom', name: 'Ransom', seat: 'Lisbon', href: '/local-movers/north-dakota/ransom', displayLabel: 'Ransom County, ND' },
    { slug: 'richland', name: 'Richland', seat: 'Wahpeton', href: '/local-movers/north-dakota/richland', displayLabel: 'Richland County, ND' },
    { slug: 'stutsman', name: 'Stutsman', seat: 'Jamestown', href: '/local-movers/north-dakota/stutsman', displayLabel: 'Stutsman County, ND' },
    { slug: 'dickey', name: 'Dickey', seat: 'Ellendale', href: '/local-movers/north-dakota/dickey', displayLabel: 'Dickey County, ND' },
    { slug: 'logan', name: 'Logan', seat: 'Napoleon', href: '/local-movers/north-dakota/logan', displayLabel: 'Logan County, ND' },
  ],
  dunn: [
    { slug: 'stark', name: 'Stark', seat: 'Dickinson', href: '/local-movers/north-dakota/stark', displayLabel: 'Stark County, ND' },
    { slug: 'mercer', name: 'Mercer', seat: 'Stanton', href: '/local-movers/north-dakota/mercer', displayLabel: 'Mercer County, ND' },
    { slug: 'mckenzie', name: 'McKenzie', seat: 'Watford City', href: '/local-movers/north-dakota/mckenzie', displayLabel: 'McKenzie County, ND' },
    { slug: 'mountrail', name: 'Mountrail', seat: 'Stanley', href: '/local-movers/north-dakota/mountrail', displayLabel: 'Mountrail County, ND' },
    { slug: 'mclean', name: 'McLean', seat: 'Washburn', href: '/local-movers/north-dakota/mclean', displayLabel: 'McLean County, ND' },
  ],
  pierce: [
    { slug: 'rolette', name: 'Rolette', seat: 'Rolla', href: '/local-movers/north-dakota/rolette', displayLabel: 'Rolette County, ND' },
    { slug: 'benson', name: 'Benson', seat: 'Minnewaukan', href: '/local-movers/north-dakota/benson', displayLabel: 'Benson County, ND' },
    { slug: 'ward', name: 'Ward', seat: 'Minot', href: '/local-movers/north-dakota/ward', displayLabel: 'Ward County, ND' },
    { slug: 'bottineau', name: 'Bottineau', seat: 'Bottineau', href: '/local-movers/north-dakota/bottineau', displayLabel: 'Bottineau County, ND' },
    { slug: 'mchenry', name: 'McHenry', seat: 'Towner', href: '/local-movers/north-dakota/mchenry', displayLabel: 'McHenry County, ND' },
  ],
};

export function getNorthDakotaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return ND_COUNTY_NEIGHBORS[countySlug] ?? [];
}
