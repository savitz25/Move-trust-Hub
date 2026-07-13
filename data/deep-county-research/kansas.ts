import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const kansasDeepCountyResearch: Record<string, DeepCountyResearch> = {
  johnson: {
    marketNotes:
      'Johnson County is the affluent Kansas side of the KC metro — Overland Park, Olathe, Shawnee, and Leawood — with corporate relocations, top school districts, and frequent bi-state moves from Jackson County MO.',
    costs: {
      studioRange: '$620–$1,380',
      familyRange: '$2,500–$6,100',
      avgHourly: '$118–$178/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Leawood estate inventory, OP corporate corridor demand, and cross-state crew travel from Missouri hubs.',
    },
    tips: [
      'Bi-state MO↔KS moves need clear pricing — tolls and travel minimums differ by which side the crew garages.',
      'Leawood and Mission Hills HOAs require mover vendor approval and limited street hours.',
      'Corporate relocations along Corporate Woods drive summer peak demand — book before fiscal Q3.',
      'Tornado season (April–June) can force weather delays — keep flexible lease overlap.',
      'OP and Olathe new construction may have soft driveways — confirm truck weight limits.',
    ],
    faqExtras: [
      {
        question: 'Do Kansas movers charge differently for Johnson County vs Missouri?',
        answer:
          'Many KC metro firms serve both sides, but Johnson County jobs from KS-based crews may avoid MO travel minimums. Always compare total quoted hours including bridge crossings and return travel.',
      },
    ],
  },
  wyandotte: {
    marketNotes:
      'Wyandotte County includes Kansas City KS and Bonner Springs with industrial heritage, Legends entertainment district growth, and KCK urban housing rehab. Pricing sits below Johnson County with distinct urban access issues.',
    costs: {
      studioRange: '$560–$1,220',
      familyRange: '$2,200–$5,500',
      avgHourly: '$108–$165/hr for a 2-person crew',
      note: 'Wyandotte pricing reflects KCK urban street constraints, Legends area weekend traffic, and travel from Johnson County premium crews.',
    },
    tips: [
      'KCK urban blocks may need street parking coordination with the city — confirm permit responsibility.',
      'Legends and Speedway event weekends congest I-70 — avoid major race weekends for moves.',
      'Older KCK homes may have long stair carries without elevators — verify crew size.',
      'Moves into Johnson County suburbs are common; confirm travel fees upfront.',
      'Industrial-area dust near rail corridors — use protective wrapping for upholstered items.',
    ],
  },
  sedgwick: {
    marketNotes:
      'Sedgwick County is Wichita, Kansas’s largest city, with aviation-industry relocations (Spirit, Textron), suburban Andover growth, and tornado-aware residents. Flat terrain helps trucks but summer heat affects crews.',
    costs: {
      studioRange: '$550–$1,200',
      familyRange: '$2,100–$5,300',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Wichita pricing reflects aviation-sector corporate moves, Andover suburban expansion, and summer heat overtime considerations.',
    },
    tips: [
      'Aviation-industry relocations often need tight corporate timelines — confirm weekend crew availability.',
      'Andover and east Wichita new builds may have unfinished landscaping limiting truck access.',
      'Tornado warnings can halt moves mid-day in spring — keep weather-flexible scheduling.',
      'Summer heat above 95°F increases crew fatigue — morning starts reduce overtime risk.',
      'Wichita spans wide ZIP distances; confirm travel fees for Maize vs Derby endpoints.',
    ],
  },
};