import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Arkansas county research — grows incrementally per batch */
export const arkansasCountyResearch: Record<string, CuratedCountyResearch> = {
  pulaski: {
    marketNotes:
      'Pulaski County is Arkansas’s most populous county and the core of the Little Rock metropolitan area, with strong governmental, educational, and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Pulaski County pricing reflects Little Rock metro urban and interstate traffic, state-government relocation demand, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Little Rock, North Little Rock, Sherwood, and Maumelle areas before booking.',
      'Major urban and interstate traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/tornado coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  benton: {
    marketNotes:
      'Benton County is one of Arkansas’s fastest-growing counties and a major hub for corporate headquarters (Walmart) and suburban residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,300',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Benton County pricing reflects Northwest Arkansas corporate relocation demand, suburban growth, and competition among full-service local and regional agents.',
    },
    tips: [
      'Verify coverage for Bentonville, Rogers, Centerton, and Bella Vista areas before booking.',
      'Heavy regional and corporate traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is anchored by the University of Arkansas and is a major growth center in Northwest Arkansas with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,300',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Washington County pricing reflects Fayetteville university-area demand, Northwest Arkansas growth, and cross-county crews from Bentonville and Rogers providers.',
    },
    tips: [
      'Verify coverage for Fayetteville, Springdale, and Johnson areas before booking.',
      'University and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  faulkner: {
    marketNotes:
      'Faulkner County is one of Arkansas’s fastest-growing counties with strong suburban residential demand north of Little Rock.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Faulkner County pricing reflects Conway suburban growth, Little Rock metro traffic, and cross-county crews from central Arkansas providers.',
    },
    tips: [
      'Verify coverage for Conway, Greenbrier, and Mayflower areas before booking.',
      'Little Rock-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  saline: {
    marketNotes:
      'Saline County is a rapidly growing suburban county southwest of Little Rock with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Saline County pricing reflects Benton and Bryant suburban growth, Little Rock metro traffic, and cross-county crews from central Arkansas providers.',
    },
    tips: [
      'Verify coverage for Benton, Bryant, and surrounding areas before booking.',
      'Little Rock-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sebastian: {
    marketNotes:
      'Sebastian County is the core of the Fort Smith metropolitan area with strong industrial, healthcare, and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Sebastian County pricing reflects Fort Smith metro regional demand, industrial-sector relocations, and cross-county crews from Northwest Arkansas providers.',
    },
    tips: [
      'Verify coverage for Fort Smith and surrounding areas before booking.',
      'Regional traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  craighead: {
    marketNotes:
      'Craighead County is the economic center of Northeast Arkansas with strong educational (Arkansas State University) and healthcare demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Craighead County pricing reflects Jonesboro university-area demand, northeast Arkansas regional traffic, and cross-county crews from Memphis and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Jonesboro and surrounding areas before booking.',
      'University and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getArkansasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return arkansasCountyResearch[countySlug];
}