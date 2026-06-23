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
  union: {
    marketNotes:
      'Union County is a key South Arkansas county with strong energy-industry and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Union County pricing reflects El Dorado energy-sector relocation demand, south Arkansas regional traffic, and cross-county crews from Pine Bluff and Little Rock providers.',
    },
    tips: [
      'Verify coverage for El Dorado and surrounding areas before booking.',
      'Industrial traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'hot-spring': {
    marketNotes:
      'Hot Spring County is a growing county southwest of Little Rock with strong residential and industrial demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Hot Spring County pricing reflects Malvern suburban growth, Little Rock metro traffic, and cross-county crews from Hot Springs and central Arkansas providers.',
    },
    tips: [
      'Verify coverage for Malvern and surrounding areas before booking.',
      'Little Rock-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a scenic county in Northwest Arkansas with strong tourism and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Carroll County pricing reflects Eureka Springs and Berryville tourism demand, Ozark-area traffic, and cross-county crews from Northwest Arkansas providers.',
    },
    tips: [
      'Verify coverage for Eureka Springs, Berryville, and Green Forest areas before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  johnson: {
    marketNotes:
      'Johnson County is a growing county in Northwest Arkansas with residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Johnson County pricing reflects Clarksville regional demand, Ozark foothills traffic, and cross-county crews from Russellville and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Clarksville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  cleburne: {
    marketNotes:
      'Cleburne County is a scenic county with strong lake-area residential and retirement demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Cleburne County pricing reflects Heber Springs lake-area and retirement demand, seasonal tourist traffic, and cross-county crews from Searcy and Conway providers.',
    },
    tips: [
      'Verify coverage for Heber Springs and surrounding areas before booking.',
      'Lake access and seasonal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  poinsett: {
    marketNotes:
      'Poinsett County is a rural Northeast Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Poinsett County pricing reflects Harrisburg rural market rates, northeast Arkansas regional traffic, and cross-county crews from Jonesboro providers.',
    },
    tips: [
      'Verify coverage for Harrisburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  columbia: {
    marketNotes:
      'Columbia County is a key South Arkansas county with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Columbia County pricing reflects Magnolia university-area demand, south Arkansas regional traffic, and cross-county crews from El Dorado and Texarkana providers.',
    },
    tips: [
      'Verify coverage for Magnolia and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  logan: {
    marketNotes:
      'Logan County is a rural county in West Arkansas with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Logan County pricing reflects Paris rural market rates, west Arkansas regional traffic, and cross-county crews from Fort Smith and Russellville providers.',
    },
    tips: [
      'Verify coverage for Paris and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  'st-francis': {
    marketNotes:
      'St. Francis County is a key East Arkansas county with strong logistics and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'St. Francis County pricing reflects Forrest City logistics and interstate demand, east Arkansas regional traffic, and cross-county crews from Memphis and Jonesboro providers.',
    },
    tips: [
      'Verify coverage for Forrest City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  ouachita: {
    marketNotes:
      'Ouachita County is a key South Arkansas county with strong industrial and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Ouachita County pricing reflects Camden industrial and residential demand, south Arkansas regional traffic, and cross-county crews from El Dorado and Pine Bluff providers.',
    },
    tips: [
      'Verify coverage for Camden and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  conway: {
    marketNotes:
      'Conway County is a rural Central Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Conway County pricing reflects Morrilton rural market rates, Arkansas River valley traffic, and cross-county crews from Conway and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Morrilton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County is anchored by Ouachita Baptist University and Henderson State University with strong educational and residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Clark County pricing reflects Arkadelphia university-area demand, south central Arkansas regional traffic, and cross-county crews from Little Rock and Hot Springs providers.',
    },
    tips: [
      'Verify coverage for Arkadelphia and surrounding areas before booking.',
      'University traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  yell: {
    marketNotes:
      'Yell County is a rural Central Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Yell County pricing reflects Danville and Dardanelle rural market rates, Arkansas River valley traffic, and cross-county crews from Russellville and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Danville and Dardanelle areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  polk: {
    marketNotes:
      'Polk County is a rural West Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Polk County pricing reflects Mena rural market rates, Ouachita Mountain access challenges, and cross-county crews from Fort Smith and Texarkana providers.',
    },
    tips: [
      'Verify coverage for Mena and surrounding areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County is a growing suburban county southwest of Little Rock with strong residential demand.',
    costs: {
      studioRange: '$700–$1,450',
      familyRange: '$2,500–$5,600',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Grant County pricing reflects Sheridan suburban growth, Little Rock metro traffic, and cross-county crews from Saline and central Arkansas providers.',
    },
    tips: [
      'Verify coverage for Sheridan and surrounding areas before booking.',
      'Little Rock-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and tornado/flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hempstead: {
    marketNotes:
      'Hempstead County is a key Southwest Arkansas county with strong residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Hempstead County pricing reflects Hope rural market rates, southwest Arkansas regional traffic, and cross-county crews from Texarkana and El Dorado providers.',
    },
    tips: [
      'Verify coverage for Hope and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  randolph: {
    marketNotes:
      'Randolph County is a rural Northeast Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Randolph County pricing reflects Pocahontas rural market rates, northeast Arkansas regional traffic, and cross-county crews from Jonesboro providers.',
    },
    tips: [
      'Verify coverage for Pocahontas and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is a scenic rural county in Northwest Arkansas with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Madison County pricing reflects Huntsville rural market rates, Ozark foothills access, and cross-county crews from Northwest Arkansas providers.',
    },
    tips: [
      'Verify coverage for Huntsville and surrounding areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  sharp: {
    marketNotes:
      'Sharp County is a rural North Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Sharp County pricing reflects Ash Flat rural market rates, north Arkansas regional traffic, and cross-county crews from Batesville and Mountain Home providers.',
    },
    tips: [
      'Verify coverage for Ash Flat and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a rural Northwest Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Ozark rural market rates, Arkansas River valley traffic, and cross-county crews from Fort Smith and Russellville providers.',
    },
    tips: [
      'Verify coverage for Ozark and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  ashley: {
    marketNotes:
      'Ashley County is a rural Southeast Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Ashley County pricing reflects Hamburg rural market rates, southeast Arkansas regional traffic, and cross-county crews from Pine Bluff and El Dorado providers.',
    },
    tips: [
      'Verify coverage for Hamburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a scenic rural county in North Arkansas with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Marion County pricing reflects Yellville rural market rates, Buffalo River area access, and cross-county crews from Mountain Home and Harrison providers.',
    },
    tips: [
      'Verify coverage for Yellville and surrounding areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  drew: {
    marketNotes:
      'Drew County is a rural Southeast Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Drew County pricing reflects Monticello rural market rates, southeast Arkansas regional traffic, and cross-county crews from Pine Bluff and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Monticello and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a rural Northeast Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Newport rural market rates, White River valley traffic, and cross-county crews from Jonesboro providers.',
    },
    tips: [
      'Verify coverage for Newport and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  lawrence: {
    marketNotes:
      'Lawrence County is a rural Northeast Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lawrence County pricing reflects Walnut Ridge rural market rates, northeast Arkansas regional traffic, and cross-county crews from Jonesboro and Paragould providers.',
    },
    tips: [
      'Verify coverage for Walnut Ridge and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  'van-buren': {
    marketNotes:
      'Van Buren County is a scenic rural county in North Central Arkansas with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Van Buren County pricing reflects Clinton rural market rates, Greers Ferry lake-area access, and cross-county crews from Conway and Heber Springs providers.',
    },
    tips: [
      'Verify coverage for Clinton and surrounding areas before booking.',
      'Rural access challenges are common — confirm crew arrival windows and route planning.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  cross: {
    marketNotes:
      'Cross County is a rural East Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Cross County pricing reflects Wynne rural market rates, east Arkansas regional traffic, and cross-county crews from Jonesboro and Forrest City providers.',
    },
    tips: [
      'Verify coverage for Wynne and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  sevier: {
    marketNotes:
      'Sevier County is a rural Southwest Arkansas county with residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Sevier County pricing reflects De Queen rural market rates, southwest Arkansas regional traffic, and cross-county crews from Texarkana and Hope providers.',
    },
    tips: [
      'Verify coverage for De Queen and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  arkansas: {
    marketNotes:
      'Arkansas County is a rural Southeast Arkansas county anchored by DeWitt and Stuttgart, with strong agricultural and Mississippi Delta residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Arkansas County pricing reflects DeWitt and Stuttgart rural market rates, Delta regional traffic, and cross-county crews from Little Rock and Pine Bluff providers.',
    },
    tips: [
      'Verify coverage for DeWitt, Stuttgart, and surrounding areas before booking.',
      'Delta and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  izard: {
    marketNotes:
      'Izard County is a rural North Central Arkansas county with residential demand in the Ozark foothills.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Izard County pricing reflects Melbourne rural demand, limited local crew availability, and cross-coverage from Mountain Home and Batesville providers.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Melbourne before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a rural Northeast Arkansas county with residential demand centered on Corning.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Clay County pricing reflects Corning rural market rates, northeast Arkansas regional traffic, and cross-county crews from Jonesboro and Paragould providers.',
    },
    tips: [
      'Verify coverage for Corning and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  phillips: {
    marketNotes:
      'Phillips County is a Mississippi Delta county anchored by Helena-West Helena with strong residential and historic riverfront demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Phillips County pricing reflects Helena-West Helena Delta market rates, Mississippi River corridor traffic, and cross-county crews from Memphis and Jonesboro providers.',
    },
    tips: [
      'Verify coverage for Helena-West Helena and surrounding areas before booking.',
      'Delta and interstate traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  stone: {
    marketNotes:
      'Stone County is a scenic rural county in the Ozarks anchored by Mountain View, with tourism and retirement relocation demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Stone County pricing reflects Mountain View rural market rates, Ozark foothills access, and cross-county crews from Batesville and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Mountain View and surrounding areas before booking.',
      'Rural access and seasonal tourism traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a rural Southeast Arkansas county with residential demand centered on Star City.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Star City rural market rates, southeast Arkansas regional traffic, and cross-county crews from Pine Bluff and Monticello providers.',
    },
    tips: [
      'Verify coverage for Star City and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  fulton: {
    marketNotes:
      'Fulton County is a rural North Arkansas county in the Ozarks with residential demand centered on Salem.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Fulton County pricing reflects Salem rural demand, limited local crew availability, and cross-coverage from Mountain Home and Jonesboro providers.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Salem before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  howard: {
    marketNotes:
      'Howard County is a rural Southwest Arkansas county with residential demand centered on Nashville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Howard County pricing reflects Nashville rural market rates, southwest Arkansas regional traffic, and cross-county crews from Texarkana and Hope providers.',
    },
    tips: [
      'Verify coverage for Nashville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  'little-river': {
    marketNotes:
      'Little River County is a rural Southwest Arkansas border county anchored by Ashdown with residential demand near Texas and Oklahoma.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Little River County pricing reflects Ashdown rural market rates, tri-state regional traffic, and cross-county crews from Texarkana and Hope providers.',
    },
    tips: [
      'Verify coverage for Ashdown and surrounding areas before booking.',
      'Border and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  perry: {
    marketNotes:
      'Perry County is a rural Central Arkansas county between Little Rock and Hot Springs with residential demand centered on Perryville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Perry County pricing reflects Perryville rural market rates, central Arkansas regional traffic, and cross-county crews from Little Rock and Hot Springs providers.',
    },
    tips: [
      'Verify coverage for Perryville and surrounding areas before booking.',
      'Central Arkansas traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County is a rural Ouachita Mountains county with residential demand centered on Waldron.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Scott County pricing reflects Waldron rural market rates, Ouachita foothills access, and cross-county crews from Fort Smith and Mena providers.',
    },
    tips: [
      'Verify coverage for Waldron and surrounding areas before booking.',
      'Mountain and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  pike: {
    marketNotes:
      'Pike County is a rural Southwest Arkansas county anchored by Murfreesboro near the Crater of Diamonds State Park.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Pike County pricing reflects Murfreesboro rural market rates, southwest Arkansas regional traffic, and cross-county crews from Hot Springs and Hope providers.',
    },
    tips: [
      'Verify coverage for Murfreesboro and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  desha: {
    marketNotes:
      'Desha County is a rural Mississippi Delta county anchored by Arkansas City with strong agricultural residential demand.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Desha County pricing reflects Arkansas City Delta market rates, Mississippi River corridor traffic, and cross-county crews from Pine Bluff and Little Rock providers.',
    },
    tips: [
      'Verify coverage for Arkansas City and surrounding areas before booking.',
      'Delta and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  bradley: {
    marketNotes:
      'Bradley County is a rural South Arkansas county with residential demand centered on Warren.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Bradley County pricing reflects Warren rural market rates, south Arkansas regional traffic, and cross-county crews from El Dorado and Pine Bluff providers.',
    },
    tips: [
      'Verify coverage for Warren and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  chicot: {
    marketNotes:
      'Chicot County is Arkansas’s southernmost county, anchored by Lake Village along the Mississippi River Delta.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Chicot County pricing reflects Lake Village Delta market rates, Mississippi River corridor traffic, and cross-county crews from Pine Bluff and Monticello providers.',
    },
    tips: [
      'Verify coverage for Lake Village and surrounding areas before booking.',
      'Delta and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is a rural Ouachita Mountains county with residential demand centered on Mount Ida.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects Mount Ida rural demand, limited local crew availability, and cross-coverage from Mena and Hot Springs providers.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Mount Ida before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is a rural Mississippi Delta county with residential demand centered on Marianna.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Lee County pricing reflects Marianna Delta demand, limited local crew availability, and cross-coverage from Jonesboro and Helena-West Helena providers.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Marianna before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Confirm insurance for high-value homes and flood coverage before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  prairie: {
    marketNotes:
      'Prairie County is a rural Central Arkansas county along the White River with residential demand centered on Des Arc.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Prairie County pricing reflects Des Arc rural demand, limited local crew availability, and cross-coverage from Little Rock and Lonoke providers.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Des Arc before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nevada: {
    marketNotes:
      'Nevada County is a rural Southwest Arkansas county with residential demand centered on Prescott.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Nevada County pricing reflects Prescott rural demand, limited local crew availability, and cross-coverage from Hope and El Dorado providers.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Prescott before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  searcy: {
    marketNotes:
      'Searcy County is a rural North Arkansas county anchored by Marshall in the Ozarks — distinct from White County’s city of Searcy.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Searcy County pricing reflects Marshall rural demand, Buffalo River area access, and cross-coverage from Harrison and Mountain Home providers.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Marshall before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cleveland: {
    marketNotes:
      'Cleveland County is a small rural Southeast Arkansas county with residential demand centered on Rison.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Cleveland County pricing reflects Rison rural demand, very limited local crew availability, and regional providers serving remote southeast Arkansas properties.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Rison before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Obtain multiple estimates before booking.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  newton: {
    marketNotes:
      'Newton County is a scenic rural county in the Ozarks anchored by Jasper near the Buffalo National River.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Newton County pricing reflects Jasper rural demand, very limited local crew availability, and regional providers serving remote Ozark properties.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Jasper before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Obtain multiple estimates before booking.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a rural East Arkansas county along the White River with residential demand centered on Clarendon.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Monroe County pricing reflects Clarendon rural market rates, White River valley traffic, and cross-county crews from Little Rock and Helena-West Helena providers.',
    },
    tips: [
      'Verify coverage for Clarendon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and flood coverage before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  dallas: {
    marketNotes:
      'Dallas County is a rural South Central Arkansas county with residential demand centered on Fordyce.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Dallas County pricing reflects Fordyce rural market rates, south central Arkansas regional traffic, and cross-county crews from El Dorado and Pine Bluff providers.',
    },
    tips: [
      'Verify coverage for Fordyce and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  lafayette: {
    marketNotes:
      'Lafayette County is a rural Southwest Arkansas county with residential demand centered on Lewisville.',
    costs: {
      studioRange: '$650–$1,350',
      familyRange: '$2,300–$5,200',
      avgHourly: '$105–$155/hr for a 2-person crew',
      note: 'Lafayette County pricing reflects Lewisville rural market rates, southwest Arkansas regional traffic, and cross-county crews from Texarkana and Magnolia providers.',
    },
    tips: [
      'Verify coverage for Lewisville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      'Obtain multiple estimates before booking.',
    ],
  },
  woodruff: {
    marketNotes:
      'Woodruff County is a rural Northeast Arkansas county with residential demand centered on Augusta.',
    costs: {
      studioRange: '$600–$1,250',
      familyRange: '$2,200–$4,900',
      avgHourly: '$100–$150/hr for a 2-person crew',
      note: 'Woodruff County pricing reflects Augusta rural demand, limited local crew availability, and cross-coverage from Jonesboro and Newport providers.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Augusta before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Confirm insurance for high-value homes before booking.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is a small rural South Arkansas county with residential demand centered on Hampton.',
    costs: {
      studioRange: '$550–$1,150',
      familyRange: '$1,900–$4,400',
      avgHourly: '$95–$145/hr for a 2-person crew',
      note: 'Calhoun County pricing reflects Hampton rural demand, very limited local crew availability, and regional providers serving remote south Arkansas properties.',
    },
    tips: [
      'Rural access challenges are common — confirm route feasibility and crew arrival windows before booking.',
      'Verify explicit regional service to Hampton before booking.',
      'Storage is very limited — confirm availability if needed.',
      'Obtain multiple estimates before booking.',
      'Confirm credentials for rural moves before booking.',
    ],
  },
};

export function getArkansasCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return arkansasCountyResearch[countySlug];
}