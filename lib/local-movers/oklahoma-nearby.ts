import { generatedCounties } from '@/data/generated/index';
import { applyOklahomaCountyOverrides } from '@/lib/local-movers/geography/oklahoma-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const oklahomaCounties = generatedCounties
  .filter((c) => c.stateSlug === 'oklahoma')
  .map(applyOklahomaCountyOverrides);
const countyNameBySlug = new Map(oklahomaCounties.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated OK county pages — expands as counties are researched */
const OK_COUNTY_NEIGHBORS: Record<string, string[]> = {
  oklahoma: ['canadian', 'cleveland', 'pottawatomie', 'mcclain', 'grady', 'logan'],
  tulsa: ['wagoner', 'rogers', 'creek', 'osage', 'pawnee', 'okmulgee'],
  cleveland: ['mcclain', 'pottawatomie', 'oklahoma', 'canadian', 'grady', 'garvin'],
  canadian: ['oklahoma', 'kingfisher', 'blaine', 'caddo', 'grady', 'cleveland'],
  comanche: ['cotton', 'stephens', 'tillman', 'kiowa', 'greer', 'harmon'],
  rogers: ['tulsa', 'wagoner', 'mayes', 'craig', 'nowata', 'washington'],
  wagoner: ['tulsa', 'rogers', 'muskogee', 'cherokee', 'mayes', 'creek'],
  payne: ['noble', 'lincoln', 'pawnee', 'kay', 'logan', 'creek'],
  creek: ['tulsa', 'pawnee', 'osage', 'okfuskee', 'wagoner', 'payne'],
  pottawatomie: ['oklahoma', 'seminole', 'okfuskee', 'mcclain', 'lincoln', 'pontotoc'],
  muskogee: ['wagoner', 'mcintosh', 'sequoyah', 'cherokee', 'haskell', 'okmulgee'],
  garfield: ['alfalfa', 'grant', 'major', 'kay', 'noble', 'kingfisher'],
  grady: ['mcclain', 'caddo', 'comanche', 'stephens', 'garvin', 'oklahoma'],
  logan: ['oklahoma', 'kingfisher', 'payne', 'noble', 'lincoln', 'pawnee'],
  washington: ['osage', 'nowata', 'craig', 'kay', 'tulsa', 'rogers'],
  bryan: ['atoka', 'marshall', 'johnston', 'love', 'carter', 'coal'],
  mcclain: ['grady', 'garvin', 'cleveland', 'pottawatomie', 'oklahoma', 'stephens'],
  'le-flore': ['latimer', 'haskell', 'sequoyah', 'pushmataha', 'mccurtain', 'pittsburg'],
  cherokee: ['adair', 'wagoner', 'mayes', 'delaware', 'sequoyah', 'muskogee'],
  carter: ['love', 'marshall', 'johnston', 'garvin', 'stephens', 'bryan'],
  osage: ['washington', 'pawnee', 'creek', 'tulsa', 'kay', 'noble'],
  stephens: ['carter', 'jefferson', 'grady', 'comanche', 'cotton', 'mcclain'],
  kay: ['osage', 'noble', 'grant', 'garfield', 'pawnee', 'washington'],
  pittsburg: ['hughes', 'coal', 'latimer', 'mccurtain', 'atoka', 'pushmataha'],
  delaware: ['cherokee', 'mayes', 'craig', 'adair', 'wagoner', 'ottawa'],
  sequoyah: ['muskogee', 'haskell', 'le-flore', 'adair', 'cherokee', 'wagoner'],
  mayes: ['rogers', 'craig', 'delaware', 'cherokee', 'wagoner', 'tulsa'],
  pontotoc: ['johnston', 'coal', 'hughes', 'mcclain', 'pottawatomie', 'seminole'],
  okmulgee: ['muskogee', 'okfuskee', 'mcintosh', 'tulsa', 'creek', 'wagoner'],
  lincoln: ['pottawatomie', 'okfuskee', 'seminole', 'logan', 'payne', 'oklahoma'],
  mccurtain: ['le-flore', 'pushmataha', 'choctaw', 'pittsburg', 'atoka', 'coal'],
  ottawa: ['delaware', 'craig', 'mayes', 'cherokee', 'wagoner', 'washington'],
  custer: ['washita', 'dewey', 'blaine', 'caddo', 'roger-mills', 'beckham'],
  garvin: ['mcclain', 'grady', 'murray', 'carter', 'pontotoc', 'stephens'],
  caddo: ['blaine', 'canadian', 'grady', 'comanche', 'washita', 'custer'],
  jackson: ['greer', 'harmon', 'tillman', 'kiowa', 'cotton', 'beckham'],
  seminole: ['pottawatomie', 'okfuskee', 'hughes', 'pontotoc', 'lincoln', 'creek'],
  beckham: ['greer', 'roger-mills', 'custer', 'washita', 'harmon', 'ellis'],
  texas: ['beaver', 'harper', 'ellis', 'cimarron', 'beckham', 'woodward'],
  adair: ['cherokee', 'delaware', 'sequoyah', 'mayes', 'washington', 'ottawa'],
  mcintosh: ['okmulgee', 'muskogee', 'haskell', 'pittsburg', 'hughes', 'okfuskee'],
  woodward: ['ellis', 'dewey', 'major', 'woods', 'alfalfa', 'roger-mills'],
  marshall: ['bryan', 'johnston', 'love', 'carter', 'atoka', 'coal'],
  pawnee: ['osage', 'creek', 'payne', 'noble', 'kay', 'tulsa'],
  kingfisher: ['canadian', 'blaine', 'major', 'garfield', 'logan', 'oklahoma'],
  atoka: ['bryan', 'marshall', 'coal', 'pittsburg', 'pushmataha', 'johnston'],
  craig: ['mayes', 'delaware', 'ottawa', 'nowata', 'rogers', 'wagoner'],
  choctaw: ['pushmataha', 'mccurtain', 'atoka', 'bryan', 'marshall', 'coal'],
  murray: ['garvin', 'carter', 'pontotoc', 'johnston', 'love', 'stephens'],
  hughes: ['okfuskee', 'mcintosh', 'pittsburg', 'seminole', 'pontotoc', 'pottawatomie'],
  haskell: ['le-flore', 'sequoyah', 'muskogee', 'latimer', 'pittsburg', 'mccurtain'],
  okfuskee: ['okmulgee', 'mcintosh', 'hughes', 'seminole', 'lincoln', 'pottawatomie'],
  love: ['carter', 'marshall', 'johnston', 'bryan', 'jefferson', 'garvin'],
  washita: ['custer', 'beckham', 'kiowa', 'greer', 'caddo', 'grady'],
  noble: ['kay', 'pawnee', 'grant', 'garfield', 'payne', 'logan'],
  pushmataha: ['mccurtain', 'choctaw', 'atoka', 'latimer', 'le-flore', 'pittsburg'],
  johnston: ['marshall', 'love', 'carter', 'bryan', 'pontotoc', 'murray'],
  latimer: ['le-flore', 'pushmataha', 'pittsburg', 'haskell', 'coal', 'atoka'],
  nowata: ['craig', 'rogers', 'washington', 'osage', 'tulsa', 'ottawa'],
};

export function getOklahomaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = OK_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = oklahomaCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    });
}