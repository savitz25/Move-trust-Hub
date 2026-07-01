import { generatedCounties } from '@/data/generated/index';
import { applyMichiganCountyOverrides } from '@/lib/local-movers/geography/michigan-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const michiganCounties = generatedCounties
  .filter((c) => c.stateSlug === 'michigan')
  .map(applyMichiganCountyOverrides);
const countyNameBySlug = new Map(michiganCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated MI county pages */
const MI_COUNTY_NEIGHBORS: Record<string, string[]> = {
  wayne: ['oakland', 'macomb', 'washtenaw', 'monroe'],
  oakland: ['wayne', 'macomb', 'lapeer', 'livingston', 'washtenaw', 'genesee'],
  macomb: ['wayne', 'oakland', 'st-clair', 'lapeer'],
  kent: ['ottawa', 'ionia', 'allegan', 'muskegon', 'barry', 'montcalm'],
  ottawa: ['kent', 'allegan', 'muskegon'],
  genesee: ['oakland', 'lapeer', 'shiawassee', 'saginaw', 'livingston', 'washtenaw'],
  washtenaw: ['wayne', 'oakland', 'livingston', 'jackson', 'lenawee', 'genesee'],
  ingham: ['eaton', 'clinton', 'jackson', 'shiawassee', 'livingston', 'washtenaw'],
  kalamazoo: ['calhoun', 'allegan', 'van-buren', 'barry', 'branch', 'st-joseph'],
  livingston: ['oakland', 'washtenaw', 'ingham', 'jackson', 'genesee', 'shiawassee'],
  saginaw: ['genesee', 'shiawassee', 'gratiot', 'midland', 'bay', 'tuscola'],
  muskegon: ['ottawa', 'kent', 'newaygo', 'oceana', 'mason'],
  'st-clair': ['macomb', 'lapeer', 'sanilac'],
  jackson: ['washtenaw', 'ingham', 'livingston', 'calhoun', 'eaton', 'lenawee'],
  monroe: ['wayne', 'lenawee'],
  berrien: ['van-buren', 'cass', 'kalamazoo'],
  calhoun: ['jackson', 'kalamazoo', 'eaton', 'branch', 'hillsdale', 'barry'],
  allegan: ['ottawa', 'kent', 'kalamazoo', 'van-buren', 'barry'],
  eaton: ['ingham', 'clinton', 'jackson', 'calhoun', 'barry', 'ionia'],
  bay: ['saginaw', 'midland', 'tuscola', 'arenac', 'gladwin'],
  lenawee: ['monroe', 'washtenaw', 'jackson', 'hillsdale'],
  'grand-traverse': ['leelanau', 'benzie', 'kalkaska', 'missaukee', 'wexford', 'manistee'],
  lapeer: ['oakland', 'macomb', 'st-clair', 'genesee', 'livingston', 'sanilac'],
  midland: ['saginaw', 'bay', 'gladwin', 'isabella', 'gratiot', 'clare'],
  clinton: ['ingham', 'eaton', 'shiawassee', 'ionia', 'montcalm', 'gratiot'],
  'van-buren': ['berrien', 'kalamazoo', 'allegan', 'cass'],
  montcalm: ['kent', 'ionia', 'clinton', 'gratiot', 'mecosta', 'newaygo'],
  marquette: ['alger', 'dickinson', 'iron', 'menominee', 'baraga', 'delta'],
  shiawassee: ['clinton', 'ingham', 'livingston', 'genesee', 'saginaw', 'gratiot'],
  ionia: ['kent', 'montcalm', 'clinton', 'eaton', 'barry', 'allegan'],
  isabella: ['midland', 'clare', 'mecosta', 'gratiot', 'clinton', 'osceola'],
  barry: ['kalamazoo', 'allegan', 'eaton', 'ionia', 'calhoun', 'kent'],
  'st-joseph': ['branch', 'cass', 'kalamazoo', 'calhoun', 'berrien', 'van-buren'],
  tuscola: ['saginaw', 'bay', 'sanilac', 'lapeer', 'genesee', 'huron'],
  newaygo: ['muskegon', 'mecosta', 'lake', 'osceola', 'montcalm', 'oceana'],
  cass: ['berrien', 'van-buren', 'st-joseph', 'branch', 'kalamazoo'],
  branch: ['calhoun', 'hillsdale', 'st-joseph', 'jackson', 'lenawee'],
  hillsdale: ['branch', 'lenawee', 'jackson', 'calhoun'],
  mecosta: ['osceola', 'newaygo', 'montcalm', 'isabella', 'lake', 'mason'],
  gratiot: ['clinton', 'montcalm', 'isabella', 'midland', 'saginaw', 'shiawassee'],
  sanilac: ['st-clair', 'lapeer', 'tuscola', 'huron'],
  houghton: ['baraga', 'iron', 'ontonagon', 'keweenaw', 'marquette', 'alger'],
  delta: ['alger', 'schoolcraft', 'menominee', 'marquette', 'dickinson'],
  chippewa: ['mackinac', 'luce', 'alger', 'marquette', 'schoolcraft'],
  wexford: ['missaukee', 'osceola', 'lake', 'manistee', 'grand-traverse', 'kalkaska'],
  emmet: ['charlevoix', 'cheboygan', 'otsego', 'grand-traverse'],
  clare: ['isabella', 'midland', 'gladwin', 'osceola', 'mecosta', 'missaukee'],
  huron: ['tuscola', 'sanilac', 'bay', 'saginaw'],
  mason: ['manistee', 'lake', 'oceana', 'muskegon', 'benzie'],
  alpena: ['montmorency', 'presque-isle', 'alcona', 'iosco', 'cheboygan'],
  oceana: ['muskegon', 'newaygo', 'mason', 'lake', 'manistee'],
  gladwin: ['clare', 'midland', 'arenac', 'osceola', 'bay'],
  otsego: ['cheboygan', 'crawford', 'montmorency', 'charlevoix', 'wexford', 'kalkaska'],
  charlevoix: ['emmet', 'antrim', 'otsego', 'grand-traverse'],
  manistee: ['benzie', 'lake', 'mason', 'wexford', 'grand-traverse'],
  dickinson: ['marquette', 'menominee', 'delta'],
  cheboygan: ['emmet', 'alpena', 'otsego', 'charlevoix'],
  iosco: ['alpena', 'roscommon', 'arenac', 'bay', 'ogemaw'],
  antrim: ['charlevoix', 'otsego', 'kalkaska', 'leelanau'],
  roscommon: ['crawford', 'ogemaw', 'iosco', 'clare', 'missaukee'],
  osceola: ['wexford', 'mecosta', 'isabella', 'clare', 'missaukee', 'newaygo'],
  leelanau: ['grand-traverse', 'benzie', 'antrim'],
  menominee: ['delta', 'marquette', 'dickinson'],
  ogemaw: ['crawford', 'roscommon', 'iosco', 'gladwin', 'clare'],
  kalkaska: ['antrim', 'grand-traverse', 'missaukee', 'wexford', 'crawford', 'otsego'],
  benzie: ['grand-traverse', 'manistee', 'leelanau'],
  missaukee: ['wexford', 'osceola', 'clare', 'kalkaska', 'grand-traverse'],
  arenac: ['bay', 'gladwin', 'ogemaw', 'iosco', 'midland'],
  gogebic: ['dickinson', 'houghton'],
  crawford: ['otsego', 'roscommon', 'kalkaska', 'ogemaw'],
  lake: ['wexford', 'osceola', 'newaygo', 'mecosta', 'mason', 'manistee', 'missaukee'],
  'presque-isle': ['alpena', 'cheboygan', 'montmorency'],
  iron: ['dickinson', 'marquette', 'baraga', 'houghton', 'gogebic'],
  mackinac: ['chippewa', 'emmet', 'cheboygan'],
  alcona: ['iosco', 'oscoda', 'alpena', 'ogemaw'],
  montmorency: ['alpena', 'presque-isle', 'otsego', 'crawford', 'cheboygan'],
  oscoda: ['alcona', 'iosco', 'ogemaw', 'roscommon'],
  alger: ['marquette', 'delta', 'schoolcraft', 'luce', 'mackinac'],
  schoolcraft: ['delta', 'alger', 'menominee', 'mackinac'],
  baraga: ['houghton', 'marquette', 'iron', 'gogebic'],
  luce: ['chippewa', 'alger', 'schoolcraft', 'mackinac'],
  ontonagon: ['gogebic', 'houghton', 'baraga'],
  keweenaw: ['houghton'],
};

/**
 * Cross-border corridor links — Ohio, Indiana, Wisconsin, and Windsor ON context.
 * MI `wayne`, `monroe`, `st-joseph`, `cass`, `iron`, and `marquette` slugs collide
 * with other states; nearby links use displayLabel disambiguation.
 */
const MI_CROSS_BORDER_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  wayne: [
    {
      slug: 'lucas',
      name: 'Lucas',
      seat: 'Toledo',
      href: '/local-movers/ohio/lucas',
      displayLabel: 'Lucas County, OH (Toledo)',
    },
  ],
  monroe: [
    {
      slug: 'lucas',
      name: 'Lucas',
      seat: 'Toledo',
      href: '/local-movers/ohio/lucas',
      displayLabel: 'Lucas County, OH (Toledo)',
    },
    {
      slug: 'wayne',
      name: 'Wayne',
      seat: 'Detroit',
      href: '/local-movers/michigan/wayne',
      displayLabel: 'Wayne County, MI (Detroit / Windsor corridor)',
    },
  ],
  berrien: [
    {
      slug: 'laporte',
      name: 'LaPorte',
      seat: 'La Porte',
      href: '/local-movers/indiana/laporte',
      displayLabel: 'LaPorte County, IN',
    },
    {
      slug: 'st-joseph',
      name: 'St. Joseph',
      seat: 'South Bend',
      href: '/local-movers/indiana/st-joseph',
      displayLabel: 'St. Joseph County, IN (South Bend)',
    },
  ],
  cass: [
    {
      slug: 'st-joseph',
      name: 'St. Joseph',
      seat: 'South Bend',
      href: '/local-movers/indiana/st-joseph',
      displayLabel: 'St. Joseph County, IN (South Bend)',
    },
  ],
  'st-joseph': [
    {
      slug: 'elkhart',
      name: 'Elkhart',
      seat: 'Goshen',
      href: '/local-movers/indiana/elkhart',
      displayLabel: 'Elkhart County, IN',
    },
  ],
  menominee: [
    {
      slug: 'marinette',
      name: 'Marinette',
      seat: 'Marinette',
      href: '/local-movers/wisconsin/marinette',
      displayLabel: 'Marinette County, WI',
    },
  ],
  dickinson: [
    {
      slug: 'marinette',
      name: 'Marinette',
      seat: 'Marinette',
      href: '/local-movers/wisconsin/marinette',
      displayLabel: 'Marinette County, WI',
    },
  ],
  gogebic: [
    {
      slug: 'iron',
      name: 'Iron',
      seat: 'Hurley',
      href: '/local-movers/wisconsin/iron',
      displayLabel: 'Iron County, WI',
    },
  ],
  iron: [
    {
      slug: 'iron',
      name: 'Iron',
      seat: 'Hurley',
      href: '/local-movers/wisconsin/iron',
      displayLabel: 'Iron County, WI',
    },
  ],
  marquette: [
    {
      slug: 'florence',
      name: 'Florence',
      seat: 'Florence',
      href: '/local-movers/wisconsin/florence',
      displayLabel: 'Florence County, WI',
    },
  ],
};

export function getMichiganNearbyCounties(countySlug: string): NearbyCountyLink[] {
  const neighbors = MI_COUNTY_NEIGHBORS[countySlug];
  const crossBorder = MI_CROSS_BORDER_NEIGHBORS[countySlug] ?? [];
  if (!neighbors?.length && !crossBorder.length) return [];

  const seen = new Set<string>();
  const inState: NearbyCountyLink[] = (neighbors ?? [])
    .filter((slug) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return countyNameBySlug.has(slug);
    })
    .map((slug) => ({
      slug,
      name: countyNameBySlug.get(slug)!,
      href: `/local-movers/michigan/${slug}`,
    }));

  const extra = crossBorder.filter((link) => {
    const key = link.href ?? link.slug;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return [...inState, ...extra];
}