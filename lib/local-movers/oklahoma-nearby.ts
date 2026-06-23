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