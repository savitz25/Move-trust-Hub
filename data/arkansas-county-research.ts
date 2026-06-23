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
  garland: {
    marketNotes:
      'Garland County is a major tourism and retirement hub centered on Hot Springs National Park with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Garland County pricing reflects Hot Springs tourism and retirement relocation demand, lake-area traffic, and cross-county crews from Little Rock metro providers.',
    },
    tips: [
      'Verify coverage for Hot Springs and surrounding areas before booking.',
      'Tourist and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood/tornado coverage before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  white: {
    marketNotes:
      'White County is a growing county in Central Arkansas with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'White County pricing reflects Searcy university-area demand, central Arkansas regional traffic, and cross-county crews from Conway and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Searcy and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lonoke: {
    marketNotes:
      'Lonoke County is a rapidly growing suburban county east of Little Rock with strong residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Lonoke County pricing reflects Cabot and Ward suburban growth, Little Rock metro traffic, and cross-county crews from central Arkansas providers.',
    },
    tips: [
      'Verify coverage for Cabot, Ward, and Austin areas before booking.',
      'Little Rock-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pope: {
    marketNotes:
      'Pope County is a key Central Arkansas county with strong educational (Arkansas Tech University) and industrial demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Pope County pricing reflects Russellville university-area demand, regional industrial traffic, and cross-county crews from Conway and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Russellville and surrounding areas before booking.',
      'University and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crawford: {
    marketNotes:
      'Crawford County is a growing county in Northwest Arkansas with strong residential demand adjacent to Fort Smith.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Crawford County pricing reflects Van Buren and Alma suburban growth, Fort Smith metro traffic, and cross-county crews from Northwest Arkansas providers.',
    },
    tips: [
      'Verify coverage for Van Buren and Alma areas before booking.',
      'Fort Smith-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a major county in Southeast Arkansas with strong industrial and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Pine Bluff industrial and residential demand, southeast Arkansas regional traffic, and cross-county crews from Little Rock providers.',
    },
    tips: [
      'Verify coverage for Pine Bluff and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is a growing county in Northeast Arkansas with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Greene County pricing reflects Paragould suburban growth, northeast Arkansas regional traffic, and cross-county crews from Jonesboro providers.',
    },
    tips: [
      'Verify coverage for Paragould and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  crittenden: {
    marketNotes:
      'Crittenden County is a key county in Northeast Arkansas with strong logistics, port, and suburban residential demand adjacent to Memphis.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Crittenden County pricing reflects West Memphis logistics and Memphis-metro cross-border demand, Mississippi River flood-zone considerations, and competition from Tennessee providers.',
    },
    tips: [
      'Verify coverage for West Memphis, Marion, and surrounding areas before booking.',
      'Memphis-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  baxter: {
    marketNotes:
      'Baxter County is a retirement and tourism hub in North Central Arkansas with strong lakeside residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Baxter County pricing reflects Mountain Home retirement and lake-area demand, seasonal tourist traffic, and cross-county crews from Little Rock and Springfield-area providers.',
    },
    tips: [
      'Verify coverage for Mountain Home and surrounding areas before booking.',
      'Lake access and seasonal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  miller: {
    marketNotes:
      'Miller County forms the Arkansas side of the Texarkana metropolitan area with strong cross-border residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Miller County pricing reflects Texarkana cross-border demand, interstate traffic, and cross-county crews from Fort Smith and Shreveport-area providers.',
    },
    tips: [
      'Verify coverage for Texarkana and surrounding areas before booking.',
      'Regional and interstate traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  independence: {
    marketNotes:
      'Independence County is a key North Central Arkansas county with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Independence County pricing reflects Batesville regional demand, White River valley traffic, and cross-county crews from Conway and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Batesville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County is a growing county in North Arkansas with strong tourism and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Boone County pricing reflects Harrison tourism and Ozark-area demand, regional traffic, and cross-county crews from Northwest Arkansas providers.',
    },
    tips: [
      'Verify coverage for Harrison and surrounding areas before booking.',
      'Regional and tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mississippi: {
    marketNotes:
      'Mississippi County is a key Northeast Arkansas county with strong agricultural and industrial demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Mississippi County pricing reflects Blytheville and Osceola industrial demand, northeast Arkansas regional traffic, and cross-county crews from Jonesboro and Memphis providers.',
    },
    tips: [
      'Verify coverage for Blytheville and Osceola areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
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