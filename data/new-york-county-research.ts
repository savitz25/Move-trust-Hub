import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Grok Heavy–researched county content overrides templated SEO sections */
export const newYorkCountyResearch: Record<string, CuratedCountyResearch> = {
  albany: {
    marketNotes:
      'Albany County is the core of the Capital District with urban Albany, suburban areas, and government/university activity. Moves often involve residential, corporate, and student relocations with seasonal academic cycles.',
    costs: {
      studioRange: '$450–$950',
      familyRange: '$1,700–$3,600',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Albany, Guilderland, and Colonie moves often reflect elevator reservations, state-government timing, and I-87/I-90 traffic windows.',
    },
    tips: [
      'Government and university moves may require specific timing around academic or legislative calendars.',
      'Urban Albany and high-rises have elevator and parking restrictions.',
      'I-87 and I-90 traffic can impact scheduling.',
      'Obtain multiple estimates in this competitive market.',
      'Verify coverage for Albany, Guilderland, and Colonie.',
    ],
  },
  allegany: {
    marketNotes:
      'Allegany County is one of New York’s most rural counties with small towns and agricultural properties. The moving market is thin; most service is regional from nearby areas like Olean, Hornell, or larger hubs such as Rochester or Buffalo.',
    costs: {
      studioRange: '$400–$850',
      familyRange: '$1,500–$3,200',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Belmont and outlying rural moves often reflect long driveways, travel from Olean or Dunkirk crews, and limited local storage options.',
    },
    tips: [
      'Rural properties often have long or unpaved driveways; confirm truck and equipment needs.',
      'Verify explicit regional service coverage for Belmont and outlying areas.',
      'Storage is limited locally; coordinate with providers in larger nearby towns.',
      'Obtain multiple written estimates due to fewer local operators.',
      'Agricultural timing (harvest seasons) may affect availability; plan accordingly.',
    ],
  },
};

export function getNewYorkCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newYorkCountyResearch[countySlug];
}