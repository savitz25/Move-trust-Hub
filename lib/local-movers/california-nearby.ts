import { californiaCounties } from '@/lib/local-movers/geography/california';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Geographic adjacency for internal linking on CA county pages */
const CA_COUNTY_NEIGHBORS: Record<string, string[]> = {
  alameda: ['contra-costa', 'santa-clara', 'san-mateo', 'san-francisco', 'solano', 'stanislaus'],
  alpine: ['amador', 'el-dorado', 'mono', 'tuolumne', 'calaveras'],
  amador: ['alpine', 'calaveras', 'el-dorado', 'sacramento', 'san-joaquin', 'tuolumne'],
  butte: ['glenn', 'colusa', 'yuba', 'sutter', 'plumas', 'tehama'],
  calaveras: ['amador', 'alpine', 'tuolumne', 'san-joaquin', 'stanislaus'],
  colusa: ['glenn', 'yolo', 'sutter', 'butte', 'lake'],
  'contra-costa': ['alameda', 'solano', 'sacramento', 'san-joaquin', 'marin'],
  'del-norte': ['siskiyou', 'humboldt'],
  'el-dorado': ['amador', 'alpine', 'placer', 'sacramento', 'nevada'],
  fresno: ['madera', 'monterey', 'kings', 'tulare', 'inyo', 'san-benito'],
  glenn: ['colusa', 'butte', 'lake', 'tehama'],
  humboldt: ['del-norte', 'trinity', 'mendocino', 'siskiyou'],
  imperial: ['san-diego', 'riverside'],
  inyo: ['mono', 'tulare', 'kern', 'san-bernardino', 'fresno'],
  kern: ['los-angeles', 'ventura', 'san-luis-obispo', 'tulare', 'inyo', 'san-bernardino'],
  kings: ['fresno', 'kern', 'monterey', 'san-luis-obispo'],
  lake: ['colusa', 'glenn', 'napa', 'sonoma', 'mendocino'],
  lassen: ['modoc', 'plumas', 'shasta', 'sierra'],
  'los-angeles': ['ventura', 'kern', 'san-bernardino', 'orange'],
  madera: ['fresno', 'mariposa', 'merced', 'monterey'],
  marin: ['sonoma', 'contra-costa', 'san-francisco', 'napa'],
  mariposa: ['madera', 'merced', 'tuolumne', 'fresno'],
  mendocino: ['lake', 'humboldt', 'trinity', 'sonoma'],
  merced: ['mariposa', 'madera', 'stanislaus', 'santa-clara', 'san-benito'],
  modoc: ['lassen', 'siskiyou', 'shasta'],
  mono: ['alpine', 'inyo', 'tuolumne', 'fresno'],
  monterey: ['san-benito', 'san-luis-obispo', 'fresno', 'kings'],
  napa: ['sonoma', 'lake', 'solano', 'yolo', 'marin'],
  nevada: ['placer', 'yuba', 'sierra', 'plumas', 'el-dorado'],
  orange: ['los-angeles', 'san-bernardino', 'riverside', 'san-diego'],
  placer: ['sacramento', 'el-dorado', 'nevada', 'yuba', 'sutter'],
  plumas: ['lassen', 'butte', 'yuba', 'sierra', 'shasta'],
  riverside: ['orange', 'san-bernardino', 'imperial', 'san-diego'],
  sacramento: ['placer', 'yolo', 'sutter', 'san-joaquin', 'amador', 'el-dorado', 'solano', 'contra-costa'],
  'san-benito': ['monterey', 'merced', 'santa-clara', 'fresno'],
  'san-bernardino': ['los-angeles', 'orange', 'riverside', 'kern', 'inyo'],
  'san-diego': ['orange', 'riverside', 'imperial'],
  'san-francisco': ['san-mateo', 'alameda', 'marin'],
  'san-joaquin': ['contra-costa', 'alameda', 'stanislaus', 'calaveras', 'amador', 'sacramento'],
  'san-luis-obispo': ['monterey', 'kern', 'santa-barbara', 'kings'],
  'san-mateo': ['san-francisco', 'alameda', 'santa-clara', 'santa-cruz'],
  'santa-barbara': ['san-luis-obispo', 'ventura', 'kern'],
  'santa-clara': ['alameda', 'san-mateo', 'santa-cruz', 'stanislaus', 'merced', 'san-benito'],
  'santa-cruz': ['san-mateo', 'santa-clara', 'monterey'],
  shasta: ['tehama', 'trinity', 'modoc', 'lassen', 'plumas'],
  sierra: ['nevada', 'yuba', 'plumas', 'lassen'],
  siskiyou: ['del-norte', 'modoc', 'shasta', 'humboldt'],
  solano: ['napa', 'yolo', 'sacramento', 'contra-costa', 'alameda'],
  sonoma: ['marin', 'napa', 'lake', 'mendocino'],
  stanislaus: ['san-joaquin', 'alameda', 'santa-clara', 'merced', 'calaveras', 'tuolumne'],
  sutter: ['yuba', 'placer', 'yolo', 'butte', 'colusa', 'sacramento'],
  tehama: ['glenn', 'butte', 'shasta', 'trinity'],
  trinity: ['humboldt', 'tehama', 'shasta', 'mendocino'],
  tulare: ['fresno', 'kern', 'inyo', 'kings'],
  tuolumne: ['mariposa', 'mono', 'alpine', 'calaveras', 'amador', 'stanislaus'],
  ventura: ['los-angeles', 'kern', 'santa-barbara'],
  yolo: ['solano', 'napa', 'lake', 'colusa', 'sutter', 'sacramento'],
  yuba: ['sutter', 'placer', 'nevada', 'butte', 'plumas'],
};

const countyNameBySlug = new Map(californiaCounties.map((c) => [c.slug, c.name]));

export function getCaliforniaNearbyCounties(
  countySlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = CA_COUNTY_NEIGHBORS[countySlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const county = californiaCounties.find((c) => c.slug === slug);
      return county
        ? { slug: county.slug, name: county.name, seat: county.seat }
        : { slug, name: countyNameBySlug.get(slug) ?? slug };
    })
    .filter(
      (c) =>
        countyNameBySlug.has(c.slug) ||
        californiaCounties.some((ca) => ca.slug === c.slug)
    );
}