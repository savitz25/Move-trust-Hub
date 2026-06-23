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