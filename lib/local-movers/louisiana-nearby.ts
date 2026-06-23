import { generatedCounties } from '@/data/generated/index';
import { applyLouisianaCountyOverrides } from '@/lib/local-movers/geography/louisiana-overrides';
import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

const louisianaParishes = generatedCounties
  .filter((c) => c.stateSlug === 'louisiana')
  .map(applyLouisianaCountyOverrides);
const parishNameBySlug = new Map(louisianaParishes.map((c) => [c.slug, c.name]));

/** Geographic adjacency for curated LA parish pages — expands as parishes are researched */
const LA_PARISH_NEIGHBORS: Record<string, string[]> = {
  'east-baton-rouge': [
    'west-baton-rouge',
    'livingston',
    'ascension',
    'iberville',
    'east-feliciana',
    'west-feliciana',
  ],
  jefferson: [
    'orleans',
    'st-bernard',
    'plaquemines',
    'st-charles',
    'st-john-the-baptist',
    'st-tammany',
  ],
  orleans: ['jefferson', 'st-bernard', 'plaquemines', 'st-charles', 'st-john-the-baptist'],
  'st-tammany': [
    'orleans',
    'washington',
    'tangipahoa',
    'st-bernard',
    'jefferson',
    'livingston',
  ],
  lafayette: [
    'vermilion',
    'iberia',
    'acadia',
    'st-martin',
    'st-landry',
    'jefferson-davis',
  ],
  caddo: ['bossier', 'webster', 'de-soto', 'red-river', 'cass', 'bienville'],
  calcasieu: [
    'cameron',
    'jefferson-davis',
    'allen',
    'beauregard',
    'vernon',
    'acadia',
  ],
  ouachita: [
    'morehouse',
    'union',
    'richland',
    'west-carroll',
    'lincoln',
    'caldwell',
  ],
  livingston: [
    'east-baton-rouge',
    'ascension',
    'tangipahoa',
    'st-helena',
    'east-feliciana',
    'st-tammany',
  ],
  tangipahoa: [
    'livingston',
    'st-tammany',
    'washington',
    'st-helena',
    'east-feliciana',
    'ascension',
  ],
  ascension: [
    'east-baton-rouge',
    'livingston',
    'st-james',
    'assumption',
    'iberville',
    'st-john-the-baptist',
  ],
  bossier: ['caddo', 'webster', 'red-river', 'bienville', 'claiborne', 'natchitoches'],
  rapides: ['grant', 'la-salle', 'avoyelles', 'evangeline', 'allen', 'vernon'],
  terrebonne: ['lafourche', 'st-mary', 'assumption', 'st-james', 'jefferson', 'plaquemines'],
  lafourche: ['terrebonne', 'st-mary', 'assumption', 'ascension', 'st-james', 'jefferson'],
  'st-landry': [
    'evangeline',
    'avoyelles',
    'rapides',
    'la-salle',
    'pointe-coupee',
    'iberville',
    'st-martin',
    'lafayette',
    'acadia',
  ],
  iberia: ['st-mary', 'st-martin', 'lafayette', 'vermilion', 'cameron', 'calcasieu'],
  vermilion: ['iberia', 'lafayette', 'acadia', 'jefferson-davis', 'cameron', 'calcasieu'],
  acadia: [
    'vermilion',
    'jefferson-davis',
    'calcasieu',
    'lafayette',
    'st-landry',
    'evangeline',
  ],
  'st-martin': [
    'lafayette',
    'iberia',
    'st-mary',
    'iberville',
    'pointe-coupee',
    'st-landry',
    'assumption',
  ],
  'st-charles': [
    'jefferson',
    'orleans',
    'st-john-the-baptist',
    'ascension',
    'lafourche',
    'st-james',
  ],
  lincoln: ['ouachita', 'jackson', 'claiborne', 'bienville', 'union', 'caldwell'],
  'st-mary': [
    'iberia',
    'terrebonne',
    'lafourche',
    'assumption',
    'st-martin',
    'vermilion',
    'cameron',
  ],
  'st-bernard': [
    'orleans',
    'plaquemines',
    'jefferson',
    'st-charles',
    'st-john-the-baptist',
    'st-tammany',
  ],
  washington: ['st-tammany', 'tangipahoa', 'st-helena', 'livingston', 'east-feliciana', 'jefferson'],
  vernon: ['rapides', 'sabine', 'beauregard', 'allen', 'evangeline', 'natchitoches'],
  'st-john-the-baptist': [
    'ascension',
    'st-charles',
    'jefferson',
    'st-james',
    'lafourche',
    'iberville',
  ],
  avoyelles: [
    'rapides',
    'evangeline',
    'st-landry',
    'pointe-coupee',
    'concordia',
    'la-salle',
  ],
  beauregard: ['calcasieu', 'vernon', 'allen', 'jefferson-davis', 'cameron', 'rapides'],
  natchitoches: [
    'sabine',
    'red-river',
    'de-soto',
    'bienville',
    'bossier',
    'rapides',
    'vernon',
  ],
  webster: ['bossier', 'claiborne', 'bienville', 'red-river', 'caddo', 'natchitoches'],
  evangeline: [
    'acadia',
    'st-landry',
    'avoyelles',
    'rapides',
    'allen',
    'jefferson-davis',
  ],
  'jefferson-davis': [
    'calcasieu',
    'vermilion',
    'acadia',
    'allen',
    'beauregard',
    'cameron',
  ],
  iberville: [
    'west-baton-rouge',
    'east-baton-rouge',
    'ascension',
    'pointe-coupee',
    'st-martin',
    'st-james',
    'assumption',
  ],
  'west-baton-rouge': [
    'east-baton-rouge',
    'iberville',
    'pointe-coupee',
    'west-feliciana',
    'east-feliciana',
    'ascension',
  ],
  'de-soto': ['caddo', 'red-river', 'sabine', 'natchitoches', 'bienville', 'bossier'],
};

export function getLouisianaNearbyCounties(
  parishSlug: string,
  limit = 6
): NearbyCountyLink[] {
  const neighbors = LA_PARISH_NEIGHBORS[parishSlug] ?? [];
  return neighbors
    .slice(0, limit)
    .map((slug) => {
      const parish = louisianaParishes.find((c) => c.slug === slug);
      return parish
        ? { slug: parish.slug, name: parish.name, seat: parish.seat }
        : { slug, name: parishNameBySlug.get(slug) ?? slug };
    });
}