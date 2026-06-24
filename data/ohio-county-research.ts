import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Ohio county research — grows incrementally per batch */
export const ohioCountyResearch: Record<string, CuratedCountyResearch> = {
  franklin: {
    marketNotes:
      'Franklin County is the core of the Columbus metropolitan area with strong urban, corporate, educational, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Columbus metro urban demand, I-70/I-71 corridor traffic, Ohio State University and corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Columbus and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cuyahoga: {
    marketNotes:
      'Cuyahoga County is the core of the Cleveland metropolitan area with strong urban, corporate, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Cuyahoga County pricing reflects Cleveland metro urban demand, I-77/I-90 corridor traffic, lakefront and corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Cleveland and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hamilton: {
    marketNotes:
      'Hamilton County is the core of the Cincinnati metropolitan area with strong urban, corporate, and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Hamilton County pricing reflects Cincinnati metro urban demand, I-71/I-75 corridor traffic, Ohio River valley corporate relocation volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Cincinnati and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and flood coverage before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is the core of the Dayton metropolitan area with strong industrial, corporate, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects Dayton metro industrial and residential demand, I-75/US-35 corridor traffic, Wright-Patterson AFB area volume, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Dayton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  summit: {
    marketNotes:
      'Summit County is the core of the Akron metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Summit County pricing reflects Akron metro industrial and residential demand, I-77/US-224 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Akron and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lucas: {
    marketNotes:
      'Lucas County is the core of the Toledo metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Lucas County pricing reflects Toledo metro industrial and residential demand, I-75/I-280 corridor traffic, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Toledo and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getOhioCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return ohioCountyResearch[countySlug];
}