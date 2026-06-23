import { generatedCounties } from '@/data/generated/index';
import { applyMississippiCountyOverrides } from '@/lib/local-movers/geography/mississippi-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const mississippiCounties = generatedCounties
  .filter((c) => c.stateSlug === 'mississippi')
  .map(applyMississippiCountyOverrides);
const countyNameBySlug = new Map(mississippiCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated MS county pages — expands as counties are researched */
const MS_COUNTY_NEIGHBORS: Record<string, string[]> = {
  harrison: ['hancock', 'stone', 'jackson', 'pearl-river', 'greene', 'george'],
  hancock: ['harrison', 'pearl-river', 'stone', 'lamar', 'marion', 'forrest'],
  hinds: ['madison', 'rankin', 'copiah', 'claiborne', 'yazoo', 'warren'],
  warren: ['hinds', 'yazoo', 'madison', 'claiborne', 'jefferson', 'issaquena'],
  desoto: ['marshall', 'tate', 'tunica', 'benton', 'panola', 'quitman'],
  marshall: ['desoto', 'benton', 'union', 'lafayette', 'tate', 'panola'],
  panola: ['desoto', 'tate', 'quitman', 'tallahatchie', 'yalobusha', 'lafayette'],
  rankin: ['hinds', 'madison', 'scott', 'smith', 'simpson', 'copiah'],
  jackson: ['harrison', 'stone', 'george', 'greene', 'perry', 'wayne'],
  madison: ['hinds', 'rankin', 'attala', 'holmes', 'yazoo', 'leake'],
  lee: ['pontotoc', 'union', 'itawamba', 'prentiss', 'monroe', 'chickasaw'],
  lafayette: ['pontotoc', 'union', 'marshall', 'benton', 'tate', 'yalobusha'],
  lowndes: ['oktibbeha', 'clay', 'monroe', 'chickasaw', 'noxubee', 'webster'],
  oktibbeha: ['lowndes', 'clay', 'chickasaw', 'webster', 'choctaw', 'montgomery'],
  pontotoc: ['lee', 'union', 'calhoun', 'chickasaw', 'lafayette', 'prentiss'],
  alcorn: ['tippah', 'prentiss', 'tishomingo', 'union', 'lee', 'monroe'],
  monroe: ['lowndes', 'chickasaw', 'clay', 'webster', 'oktibbeha', 'lee'],
  washington: ['sharkey', 'humphreys', 'sunflower', 'bolivar', 'leflore', 'issaquena'],
  pike: ['amite', 'walthall', 'lincoln', 'lawrence', 'jefferson-davis', 'marion'],
  lincoln: ['pike', 'franklin', 'copiah', 'jefferson-davis', 'lawrence', 'amite'],
  forrest: ['lamar', 'perry', 'stone', 'jones', 'covington', 'marion'],
  lauderdale: ['kemper', 'newton', 'clarke', 'wayne', 'jasper', 'neshoba'],
  lamar: ['forrest', 'pearl-river', 'marion', 'jefferson-davis', 'greene', 'hancock'],
  jones: ['forrest', 'jasper', 'smith', 'covington', 'perry', 'wayne'],
  'pearl-river': ['hancock', 'harrison', 'stone', 'lamar', 'marion', 'forrest'],
  adams: ['jefferson', 'franklin', 'wilkinson', 'claiborne', 'copiah', 'amite'],
  tate: ['desoto', 'marshall', 'panola', 'tunica', 'benton', 'lafayette'],
  neshoba: ['lauderdale', 'kemper', 'newton', 'scott', 'leake', 'winston'],
  union: ['lee', 'pontotoc', 'prentiss', 'marshall', 'benton', 'tippah'],
  scott: ['rankin', 'smith', 'leake', 'neshoba', 'newton', 'jasper'],
  bolivar: ['washington', 'sunflower', 'leflore', 'humphreys', 'sharkey', 'issaquena'],
  copiah: ['hinds', 'rankin', 'simpson', 'lincoln', 'jefferson', 'adams'],
  george: ['jackson', 'stone', 'greene', 'perry', 'forrest', 'harrison'],
  simpson: ['rankin', 'copiah', 'jefferson-davis', 'lawrence', 'smith', 'hinds'],
  prentiss: ['tippah', 'alcorn', 'union', 'lee', 'tishomingo', 'itawamba'],
  leflore: ['washington', 'sunflower', 'carroll', 'holmes', 'attala', 'montgomery'],
  itawamba: ['lee', 'prentiss', 'tishomingo', 'monroe', 'choctaw', 'pontotoc'],
  marion: ['lamar', 'pearl-river', 'hancock', 'forrest', 'jefferson-davis', 'lawrence'],
  yazoo: ['hinds', 'madison', 'holmes', 'humphreys', 'sharkey', 'warren'],
  sunflower: ['bolivar', 'leflore', 'washington', 'humphreys', 'montgomery', 'leake'],
  leake: ['madison', 'scott', 'neshoba', 'attala', 'holmes', 'newton'],
  tippah: ['alcorn', 'prentiss', 'union', 'benton', 'marshall', 'lee'],
  newton: ['lauderdale', 'neshoba', 'scott', 'jasper', 'smith', 'clarke'],
  grenada: ['montgomery', 'carroll', 'yalobusha', 'tallahatchie', 'leflore', 'webster'],
  stone: ['harrison', 'pearl-river', 'george', 'forrest', 'jackson', 'greene'],
  wayne: ['clarke', 'jasper', 'jones', 'perry', 'greene', 'lauderdale'],
  coahoma: ['tunica', 'quitman', 'tallahatchie', 'sunflower', 'bolivar', 'panola'],
  tishomingo: ['alcorn', 'prentiss', 'itawamba', 'franklin', 'marion', 'lee'],
  clay: ['lowndes', 'oktibbeha', 'chickasaw', 'monroe', 'webster', 'noxubee'],
  covington: ['jones', 'forrest', 'simpson', 'jefferson-davis', 'smith', 'lamar'],
  winston: ['neshoba', 'attala', 'leake', 'kemper', 'oktibbeha', 'newton'],
  attala: ['madison', 'holmes', 'leake', 'winston', 'neshoba', 'montgomery'],
  chickasaw: ['clay', 'oktibbeha', 'pontotoc', 'calhoun', 'webster', 'monroe'],
  jasper: ['smith', 'newton', 'scott', 'jones', 'wayne', 'clarke'],
  holmes: ['yazoo', 'madison', 'attala', 'humphreys', 'leflore', 'carroll'],
  clarke: ['wayne', 'jasper', 'lauderdale', 'newton', 'jones', 'kemper'],
  walthall: ['pike', 'marion', 'pearl-river', 'lawrence', 'jefferson-davis', 'lincoln'],
  smith: ['rankin', 'scott', 'simpson', 'jones', 'covington', 'jasper'],
  greene: ['perry', 'wayne', 'george', 'stone', 'forrest', 'jackson'],
  calhoun: ['chickasaw', 'pontotoc', 'yalobusha', 'webster', 'grenada', 'lafayette'],
  amite: ['pike', 'walthall', 'lincoln', 'franklin', 'wilkinson', 'adams'],
  yalobusha: ['panola', 'grenada', 'calhoun', 'lafayette', 'tallahatchie', 'quitman'],
  lawrence: ['marion', 'jefferson-davis', 'simpson', 'lamar', 'walthall', 'pike'],
  perry: ['greene', 'wayne', 'stone', 'forrest', 'george', 'jones'],
  'jefferson-davis': ['marion', 'lawrence', 'simpson', 'covington', 'lamar', 'walthall'],
  tallahatchie: ['panola', 'quitman', 'coahoma', 'sunflower', 'leflore', 'yalobusha'],
  webster: ['oktibbeha', 'clay', 'chickasaw', 'calhoun', 'grenada', 'montgomery'],
  noxubee: ['lowndes', 'oktibbeha', 'clay', 'kemper', 'winston', 'choctaw'],
  montgomery: ['attala', 'leflore', 'grenada', 'carroll', 'holmes', 'choctaw'],
  carroll: ['leflore', 'montgomery', 'holmes', 'attala', 'grenada', 'tallahatchie'],
  kemper: ['neshoba', 'lauderdale', 'newton', 'clarke', 'wayne', 'noxubee'],
  tunica: ['desoto', 'tate', 'panola', 'coahoma', 'quitman', 'tallahatchie'],
  claiborne: ['jefferson', 'copiah', 'hinds', 'warren', 'adams', 'wilkinson'],
  choctaw: ['oktibbeha', 'webster', 'montgomery', 'winston', 'attala', 'grenada'],
  franklin: ['adams', 'amite', 'lincoln', 'jefferson', 'wilkinson', 'claiborne'],
  humphreys: ['yazoo', 'holmes', 'leflore', 'sunflower', 'sharkey', 'washington'],
  benton: ['marshall', 'tippah', 'union', 'tate', 'desoto', 'prentiss'],
  wilkinson: ['amite', 'franklin', 'adams', 'claiborne', 'jefferson', 'pike'],
  jefferson: ['adams', 'claiborne', 'copiah', 'franklin', 'wilkinson', 'lincoln'],
  quitman: ['panola', 'coahoma', 'tunica', 'tallahatchie', 'yalobusha', 'desoto'],
  sharkey: ['washington', 'issaquena', 'humphreys', 'yazoo', 'warren', 'bolivar'],
  issaquena: ['sharkey', 'washington', 'warren', 'claiborne', 'bolivar', 'humphreys'],
};

export function getMississippiNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = MS_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = mississippiCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}