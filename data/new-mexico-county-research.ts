import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated New Mexico county research — batch 1: 11/33 */
export const newMexicoCountyResearch: Record<string, CuratedCountyResearch> = {
  bernalillo: {
    marketNotes:
      'Bernalillo County is New Mexico’s most populous county with strong urban, suburban, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Bernalillo County pricing reflects Albuquerque metro demand, I-25 and I-40 corridor traffic, and competition among full-service agents serving urban and suburban communities.',
    },
    tips: [
      'Verify coverage for Albuquerque and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'doa-ana': {
    marketNotes:
      'Doña Ana County is New Mexico’s second most populous county with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Doña Ana County pricing reflects Las Cruces metro demand, I-10 and I-25 corridor traffic, and competition among regional agents serving southern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Las Cruces and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sandoval: {
    marketNotes:
      'Sandoval County is a rapidly growing suburban county north of Albuquerque with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Sandoval County pricing reflects Rio Rancho and Albuquerque metro spillover demand, US-550 corridor traffic, and competition among regional agents serving fast-growing suburban communities.',
    },
    tips: [
      'Verify coverage for Rio Rancho and surrounding areas before booking.',
      'Albuquerque metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'santa-fe': {
    marketNotes:
      'Santa Fe County is the state capital county with strong governmental, tourism, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Santa Fe County pricing reflects capital-city and tourism demand, US-84/285 corridor traffic, and competition among regional agents serving historic adobe homes and high-country communities.',
    },
    tips: [
      'Verify coverage for Santa Fe and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Historic adobe and high-value homes may require specialty handling — confirm insurance and experience.',
      'Book early for peak tourist seasons (June–October) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'san-juan': {
    marketNotes:
      'San Juan County is a northwestern New Mexico county with residential demand across the Farmington metro and Four Corners region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'San Juan County pricing reflects Farmington metro demand, US-64 corridor traffic, and competition among regional agents serving northwestern New Mexico and Four Corners communities.',
    },
    tips: [
      'Verify coverage for Farmington and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  valencia: {
    marketNotes:
      'Valencia County is a suburban county south of Albuquerque with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Valencia County pricing reflects Albuquerque metro south-valley spillover demand, I-25 corridor traffic through Los Lunas, and competition among regional agents serving suburban communities.',
    },
    tips: [
      'Verify coverage for Los Lunas and surrounding areas before booking.',
      'Albuquerque metro traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lea: {
    marketNotes:
      'Lea County is a southeastern New Mexico county with residential demand across the Hobbs metro and Permian Basin region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lea County pricing reflects Hobbs metro and energy-sector demand, US-62/180 corridor traffic, and competition among regional agents serving southeastern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Hobbs and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Energy-sector relocations may require flexible scheduling — confirm commercial move experience when needed.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  otero: {
    marketNotes:
      'Otero County is a southern New Mexico county with residential demand across Alamogordo and the White Sands region.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Otero County pricing reflects Alamogordo metro demand, US-54 and US-70 corridor traffic, and competition among regional agents serving southern high-desert communities.',
    },
    tips: [
      'Verify coverage for Alamogordo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Military and federal relocations near Holloman AFB require base access coordination — confirm credentials.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mckinley: {
    marketNotes:
      'McKinley County is a northwestern New Mexico county with residential demand across Gallup and the Route 66 corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'McKinley County pricing reflects Gallup metro demand, I-40 corridor traffic, and competition among regional agents serving northwestern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Gallup and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  eddy: {
    marketNotes:
      'Eddy County is a southeastern New Mexico county with residential demand across Carlsbad and the energy corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Eddy County pricing reflects Carlsbad metro and energy-sector demand, US-285 corridor traffic, and competition among regional agents serving southeastern New Mexico communities.',
    },
    tips: [
      'Verify coverage for Carlsbad and surrounding cities before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Energy-sector relocations may require flexible scheduling — confirm commercial move experience when needed.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chaves: {
    marketNotes:
      'Chaves County is a southeastern New Mexico county with residential demand across Roswell and the Pecos Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Chaves County pricing reflects Roswell metro demand, US-285 and US-70 corridor traffic, and competition among regional agents serving southeastern New Mexico Pecos Valley communities.',
    },
    tips: [
      'Verify coverage for Roswell and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getNewMexicoCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return newMexicoCountyResearch[countySlug];
}