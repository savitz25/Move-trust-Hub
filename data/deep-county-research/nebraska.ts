import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const nebraskaDeepCountyResearch: Record<string, DeepCountyResearch> = {
  douglas: {
    marketNotes:
      'Douglas County is Omaha with Old Market lofts, West Omaha master-planned communities, and Eppley Airfield-adjacent suburbs. Strong insurance and tech employment drives corporate relocations across the Missouri River into Iowa.',
    costs: {
      studioRange: '$540–$1,150',
      familyRange: '$2,050–$5,200',
      avgHourly: '$102–$158/hr for a 2-person crew',
      note: 'Omaha pricing reflects West Omaha HOA move rules, Old Market parking limits, and winter ice on brick streets.',
    },
    tips: [
      'West Omaha gated communities (Elkhorn, Gretna) require vendor registration — complete HOA forms early.',
      'Old Market and Blackstone District moves need tight parking coordination on weekends.',
      'Crossing into Council Bluffs IA is common; confirm bi-state authority and toll-free bridge routing.',
      'College World Series week (June) congests downtown — avoid move days near TD Ameritrade Park.',
      'Winter ice storms can delay moves — confirm reschedule policies before signing.',
    ],
  },
  lancaster: {
    marketNotes:
      'Lancaster County is Lincoln, Nebraska’s capital and University of Nebraska hub, with state-government transfers, student housing turns, and suburban growth in south and east corridors.',
    costs: {
      studioRange: '$520–$1,100',
      familyRange: '$1,950–$4,900',
      avgHourly: '$98–$152/hr for a 2-person crew',
      note: 'Lincoln pricing reflects UNL semester peaks, Haymarket district parking, and state employee fiscal-year moves.',
    },
    tips: [
      'UNL August move-in and May move-out weeks are the tightest — book before spring break.',
      'State government fiscal-year relocations cluster in June — corporate crews fill early.',
      'Haymarket loft buildings need elevator reservations; older Near South homes have narrow stairs.',
      'Lincoln summer heat affects crew pacing — schedule morning loads in July.',
      'Rural Lancaster addresses west of city limits may incur travel fees — confirm mileage charges.',
    ],
  },
};