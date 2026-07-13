import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const missouriDeepCountyResearch: Record<string, DeepCountyResearch> = {
  jackson: {
    marketNotes:
      'Jackson County covers Kansas City, Missouri, with jazz-district lofts, Plaza-adjacent neighborhoods, and eastern suburbs like Independence. Cross-state moves into Johnson County KS are common, requiring clear local vs interstate pricing.',
    costs: {
      studioRange: '$600–$1,350',
      familyRange: '$2,400–$5,900',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Jackson County pricing reflects KC metro cross-river traffic, Plaza area parking limits, and blended MO-KS crew competition.',
    },
    tips: [
      'Crossing into Kansas (Overland Park, Olathe) may change sales tax and crew jurisdiction — clarify MO-only vs bi-state pricing.',
      'West Plaza and Brookside streets are narrow; shuttle trucks are common for older homes.',
      'Independence historic areas have brick streets — confirm truck weight limits.',
      'Summer humidity affects wood furniture — ask about climate-controlled trucks for antiques.',
      'Royals and Chiefs event weekends congest I-70 and downtown — avoid game-day move windows.',
    ],
    faqExtras: [
      {
        question: 'Should I hire a Missouri or Kansas mover for a KC metro move?',
        answer:
          'For Jackson County (MO side) origins, Missouri-licensed local movers are typical, but many firms serve both states. If your destination is Johnson or Wyandotte County KS, confirm bi-state authority and whether tolls or travel minimums apply.',
      },
    ],
  },
  'st-louis': {
    marketNotes:
      'St. Louis City combines brick rowhomes in Soulard and Lafayette Square, Central West End apartments, and Cortex innovation-district relocations. Independent city rules differ from St. Louis County suburbs across the border.',
    costs: {
      studioRange: '$580–$1,280',
      familyRange: '$2,300–$5,700',
      avgHourly: '$110–$168/hr for a 2-person crew',
      note: 'St. Louis city pricing reflects brick-rowhome stair carries, Arch-adjacent parking limits, and Mississippi river humidity considerations.',
    },
    tips: [
      'Brick rowhomes often lack alleys — expect street parking permits and time-limited loading zones.',
      'Central West End high-rises need elevator reservations similar to Chicago mid-rises.',
      'Moves between city and St. Louis County may involve different permit rules — confirm both ends.',
      'Spring flood season along the Mississippi can affect riverfront storage — plan overlap housing carefully.',
      'Cortex and downtown office relocations may need after-hours crews — confirm overtime rates.',
    ],
  },
};